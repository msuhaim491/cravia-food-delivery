import jwt from 'jsonwebtoken';
export const asyncHandler=fn=>(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
export const safeUser=u=>({_id:String(u._id),name:u.name,email:u.email,role:u.role});
export const signToken=u=>jwt.sign({sub:String(u._id)},process.env.JWT_SECRET,{expiresIn:'7d'});
export const error=(res,status,message)=>res.status(status).json({message});
export const cents=n=>Math.round(Number(n)*100);
