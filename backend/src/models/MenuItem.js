import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true},description:{type:String,required:true,trim:true},category:{type:String,enum:['Pizza','Burgers','Bowls','Pasta','Sides','Desserts','Drinks'],required:true},price:{type:Number,required:true,min:1},image:{type:String,required:true},rating:{type:Number,default:4.7,min:0,max:5},popular:{type:Boolean,default:false},vegetarian:{type:Boolean,default:false},active:{type:Boolean,default:true}},{timestamps:true});
export default mongoose.models.MenuItem || mongoose.model('MenuItem',schema);
