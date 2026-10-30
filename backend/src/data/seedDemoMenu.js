import MenuItem from '../models/MenuItem.js';
import {demoDishes} from './demoDishes.js';

// Only the local development process seeds automatically. Serverless/production
// must use the explicit seed script with a separate demo MongoDB database.
export async function seedDemoMenu(){
  const total=await MenuItem.countDocuments();
  if(total>0)return {inserted:0,total};
  await MenuItem.insertMany(demoDishes);
  console.log(`CRAVIA: seeded ${demoDishes.length} demo dishes into an empty database`);
  return {inserted:demoDishes.length,total:demoDishes.length};
}
