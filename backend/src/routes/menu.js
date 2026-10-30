import {Router} from 'express';import {z} from 'zod';
import MenuItem from '../models/MenuItem.js';import {requireAuth,requireAdmin} from '../middleware/auth.js';import {asyncHandler,error} from '../utils/helpers.js';
const router=Router();
const categories=['Pizza','Burgers','Bowls','Pasta','Sides','Desserts','Drinks'];
const image=z.string().url().refine(v=>/^https:\/\//i.test(v),'Use a secure HTTPS image URL');
const schema=z.object({name:z.string().trim().min(3).max(100),description:z.string().trim().min(8).max(400),category:z.enum(categories),price:z.coerce.number().min(1).max(500),image,vegetarian:z.boolean().default(false),popular:z.boolean().default(false),active:z.boolean().default(true),rating:z.coerce.number().min(0).max(5).default(4.7)});
router.get('/',asyncHandler(async(req,res)=>{
 const filter={active:true};if(categories.includes(req.query.category))filter.category=req.query.category;
 if(req.query.search&&typeof req.query.search==='string')filter.name={$regex:req.query.search.slice(0,70).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),$options:'i'};
 if(req.query.vegetarian==='true')filter.vegetarian=true;
 const sort=req.query.sort==='price-low'?{price:1}:req.query.sort==='price-high'?{price:-1}:{popular:-1,createdAt:-1};
 res.json({items:await MenuItem.find(filter).sort(sort).limit(150).lean(),categories});
}));
router.get('/admin',requireAuth,requireAdmin,asyncHandler(async(req,res)=>res.json({items:await MenuItem.find().sort({createdAt:-1}).lean()})));
router.get('/:id',asyncHandler(async(req,res)=>{if(!/^[a-f\d]{24}$/i.test(req.params.id))return error(res,404,'Dish not found');const item=await MenuItem.findById(req.params.id).lean();if(!item||!item.active)return error(res,404,'Dish not found');res.json({item});}));
router.post('/',requireAuth,requireAdmin,asyncHandler(async(req,res)=>{const p=schema.safeParse(req.body);if(!p.success)return error(res,400,p.error.issues[0].message);res.status(201).json({item:await MenuItem.create(p.data)});}));
router.put('/:id',requireAuth,requireAdmin,asyncHandler(async(req,res)=>{if(!/^[a-f\d]{24}$/i.test(req.params.id))return error(res,404,'Dish not found');const p=schema.safeParse(req.body);if(!p.success)return error(res,400,p.error.issues[0].message);const item=await MenuItem.findByIdAndUpdate(req.params.id,p.data,{new:true,runValidators:true});if(!item)return error(res,404,'Dish not found');res.json({item});}));
router.delete('/:id',requireAuth,requireAdmin,asyncHandler(async(req,res)=>{if(!/^[a-f\d]{24}$/i.test(req.params.id))return error(res,404,'Dish not found');const item=await MenuItem.findByIdAndUpdate(req.params.id,{active:false},{new:true});if(!item)return error(res,404,'Dish not found');res.json({message:'Dish hidden'});}));
export default router;
