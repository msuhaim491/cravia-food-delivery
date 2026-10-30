import 'dotenv/config';
import {connectDb} from './config/db.js';

const validJWT=process.env.JWT_SECRET?.length>=32&&!process.env.JWT_SECRET?.startsWith('REPLACE_');
if(!validJWT){
  console.error('CRAVIA API startup blocked: JWT_SECRET is missing or too short.');
  console.error('Fix: copy backend/.env.example to backend/.env, generate a 64+ character JWT_SECRET, then restart.');
  process.exitCode=1;
} else {
  try {
    const {default:app}=await import('./app.js');
    await connectDb();
    if(process.env.NODE_ENV!=='production'&&process.env.AUTO_SEED_MENU!=='false'){
      const {seedDemoMenu}=await import('./data/seedDemoMenu.js');
      await seedDemoMenu();
    }
    const port=Number(process.env.PORT||5000);
    app.listen(port,()=>console.log(`Cravia API listening on http://localhost:${port}`));
  }catch(error){
    console.error('CRAVIA API startup failed:',error.message);
    if(!process.env.MONGODB_URI)console.error('Set MONGODB_URI to MongoDB Atlas or your local MongoDB server in backend/.env.');
    else console.error('Check MongoDB is running, the Atlas database user/password, and network access.');
    process.exitCode=1;
  }
}
