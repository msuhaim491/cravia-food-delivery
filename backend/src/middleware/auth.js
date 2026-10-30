import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {asyncHandler,error} from '../utils/helpers.js';
export const requireAuth=asyncHandler(async(req,res,next)=>{
 const token=/^Bearer (.+)$/i.exec(req.headers.authorization||'')?.[1];
 if(!token)return error(res,401,'Please sign in first');
 let claims;try{claims=jwt.verify(token,process.env.JWT_SECRET)}catch{return error(res,401,'Your session expired. Sign in again.');}
 const user=await User.findById(claims.sub);if(!user)return error(res,401,'Account not found');req.user=user;next();
});
export const requireAdmin=(req,res,next)=>req.user?.role==='admin'?next():error(res,403,'Admin access required');
