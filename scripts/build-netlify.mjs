import {spawnSync} from 'node:child_process';import {cpSync,mkdirSync,existsSync} from 'node:fs';import {resolve} from 'node:path';
const npm=process.platform==='win32'?'npm.cmd':'npm';const root=resolve(import.meta.dirname,'..');
function build(name,variables){const r=spawnSync(npm,['run','build','-w',name],{cwd:root,env:{...process.env,VITE_API_URL:'',...variables},stdio:'inherit'});if(r.error)throw r.error;if(r.status!==0)process.exit(r.status||1)}
build('frontend',{VITE_DEMO_ONLY:'true'});build('admin',{VITE_ADMIN_BASE:'/admin/'});
const from=resolve(root,'admin/dist'),to=resolve(root,'frontend/dist/admin');if(!existsSync(from))throw new Error('Missing admin build');mkdirSync(to,{recursive:true});cpSync(from,to,{recursive:true,force:true});console.log('Cravia Netlify bundle ready');
