import mongoose from 'mongoose';
let pending;
export async function connectDb(){
  if(!process.env.MONGODB_URI)throw new Error('Missing MONGODB_URI');
  if(mongoose.connection.readyState===1)return;
  if(!pending)pending=mongoose.connect(process.env.MONGODB_URI,{serverSelectionTimeoutMS:12000})
    .then(()=>console.log('MongoDB connected')).catch(e=>{pending=null;throw e});
  return pending;
}
