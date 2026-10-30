import mongoose from 'mongoose';
const cartItem=new mongoose.Schema({menuItem:{type:mongoose.Schema.Types.ObjectId,ref:'MenuItem',required:true},quantity:{type:Number,min:1,max:20,required:true}},{_id:false});
const userSchema=new mongoose.Schema({name:{type:String,required:true,trim:true},email:{type:String,required:true,lowercase:true,trim:true,unique:true},passwordHash:{type:String,required:true,select:false},role:{type:String,enum:['customer','admin'],default:'customer'},cart:{type:[cartItem],default:[]}},{timestamps:true});
export default mongoose.models.User || mongoose.model('User',userSchema);
