import serverless from 'serverless-http';import app from '../../backend/src/app.js';import {connectDb} from '../../backend/src/config/db.js';
const serve=serverless(app);
export async function handler(event,context){if(!/\/api\/health\/?$/.test(event.path||''))await connectDb();return serve(event,context)}
