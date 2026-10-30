import {Router} from 'express';
import {z} from 'zod';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import {asyncHandler,error,safeUser,signToken} from '../utils/helpers.js';
import {requireAuth} from '../middleware/auth.js';
const router=Router();
const register=z.object({name:z.string().trim().min(2).max(70),email:z.string().trim().email().max(250),password:z.string().min(8).max(100)});
const login=z.object({email:z.string().trim().email(),password:z.string().min(1)});
router.post('/register',asyncHandler(async(req,res)=>{
 const parsed=register.safeParse(req.body);if(!parsed.success)return error(res,400,'Enter valid name, email and password (8+ characters)');
 const {name,password}=parsed.data,email=parsed.data.email.toLowerCase();
 if(await User.exists({email}))return error(res,409,'Email already registered');
 const u=await User.create({name,email,passwordHash:await bcrypt.hash(password,12)});
 res.status(201).json({token:signToken(u),user:safeUser(u)});
}));
router.post('/login',asyncHandler(async(req,res)=>{
 const p=login.safeParse(req.body);if(!p.success)return error(res,400,'Invalid login details');
 const u=await User.findOne({email:p.data.email.toLowerCase()}).select('+passwordHash');
 if(!u||!await bcrypt.compare(p.data.password,u.passwordHash))return error(res,401,'Incorrect email or password');
 res.json({token:signToken(u),user:safeUser(u)});
}));
router.get('/me',requireAuth,(req,res)=>res.json({user:safeUser(req.user)}));
export default router;
