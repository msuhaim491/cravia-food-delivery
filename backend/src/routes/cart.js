import {Router} from 'express';import {z} from 'zod';import MenuItem from '../models/MenuItem.js';import {requireAuth} from '../middleware/auth.js';import {asyncHandler,error} from '../utils/helpers.js';
const router=Router();router.use(requireAuth);
const schema=z.object({items:z.array(z.object({menuItem:z.string().regex(/^[a-f\d]{24}$/i),quantity:z.number().int().min(1).max(20)})).max(40)});
router.get('/',(req,res)=>res.json({items:req.user.cart.map(i=>({menuItem:String(i.menuItem),quantity:i.quantity}))}));
router.put('/',asyncHandler(async(req,res)=>{const p=schema.safeParse(req.body);if(!p.success)return error(res,400,'Invalid cart');const items=p.data.items;if(new Set(items.map(i=>i.menuItem)).size!==items.length)return error(res,400,'Duplicate cart items');const ids=items.map(i=>i.menuItem);const count=await MenuItem.countDocuments({_id:{$in:ids},active:true});if(count!==ids.length)return error(res,400,'A dish is unavailable');req.user.cart=items;await req.user.save();res.json({items});}));
export default router;
