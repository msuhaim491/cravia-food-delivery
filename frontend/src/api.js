import axios from 'axios';
export const api=axios.create({baseURL:(import.meta.env.VITE_API_URL??'http://localhost:5000')+'/api',timeout:25000});
api.interceptors.request.use(config=>{const token=localStorage.getItem('cravia_token');if(token)config.headers.Authorization=`Bearer ${token}`;return config});
export const errText=e=>e?.response?.data?.message||e?.message||'Something went wrong';
export const money=n=>'$'+Number(n||0).toFixed(2);
export const categories=['All','Pizza','Burgers','Bowls','Pasta','Sides','Desserts','Drinks'];
