import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import {connectDb} from '../src/config/db.js';
import User from '../src/models/User.js';
import {seedDemoMenu} from '../src/data/seedDemoMenu.js';

try {
  await connectDb();
  // Seed sample dishes even if the admin credentials are not yet configured.
  await seedDemoMenu();
  const email=process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const password=process.env.ADMIN_PASSWORD;
  if(!email||!password||password.length<12||password.startsWith('REPLACE_')){
    console.log('Demo dishes are ready. To create the admin account, configure ADMIN_EMAIL and ADMIN_PASSWORD (12+ characters) in backend/.env, then rerun npm run seed.');
  } else {
    const existing=await User.findOne({email});
    if(!existing) await User.create({name:'Cravia Administrator',email,role:'admin',passwordHash:await bcrypt.hash(password,12)});
    else if(existing.role!=='admin')throw new Error('Configured admin email belongs to a customer');
    console.log(`Admin account ready: ${email}`);
  }
} catch(error){
  console.error('CRAVIA seed error:',error.message);
  process.exitCode=1;
} finally {await mongoose.disconnect();}
