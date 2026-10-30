import {createContext,useContext,useCallback,useEffect,useMemo,useState} from 'react';
import toast from 'react-hot-toast';import {api,errText} from '../api';import {demoMenu} from '../data/demoMenu';
const C=createContext(null);const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
export function StoreProvider({children}){
 const [items,setItems]=useState(demoMenu),[loading,setLoading]=useState(true),[catalogMode,setCatalogMode]=useState('loading'),[menuNotice,setMenuNotice]=useState(''),[cart,setCart]=useState(()=>read('cravia_cart',{})),[token,setToken]=useState(()=>localStorage.getItem('cravia_token')),[user,setUser]=useState(()=>read('cravia_user',null)),[cartReady,setCartReady]=useState(false);
 const refresh=useCallback(async()=>{
  setLoading(true);
  try {
    const response=await api.get('/menu');
    const remote=Array.isArray(response.data?.items)?response.data.items:[];
    if(remote.length){
      setItems(remote);setCatalogMode('live');setMenuNotice('');
      // Demo preview IDs must never be submitted as real orders.
      setCart(previous=>Object.fromEntries(Object.entries(previous).filter(([id])=>remote.some(item=>item._id===id))));
    } else {
      setItems(demoMenu);setCatalogMode('preview');
      setMenuNotice('No menu items found in MongoDB. Run npm run seed from the project root to load 18 dishes.');
    }
  } catch(e) {
    setItems(demoMenu);setCatalogMode('preview');
    setMenuNotice(`Backend unavailable (${errText(e)}). Displaying sample menu for visual preview. Cart and orders need a working API.`);
  } finally {setLoading(false)}
},[]);
 useEffect(()=>{refresh()},[refresh]);
 useEffect(()=>{let live=true;async function sync(){if(!token){setCartReady(true);return}setCartReady(false);try{const [a,b]=await Promise.all([api.get('/auth/me'),api.get('/cart')]);if(!live)return;setUser(a.data.user);localStorage.setItem('cravia_user',JSON.stringify(a.data.user));setCart(previous=>{const merged={...Object.fromEntries(b.data.items.map(i=>[i.menuItem,i.quantity]))};for(const [id,q] of Object.entries(previous))merged[id]=Math.max(merged[id]||0,q);return merged})}catch{localStorage.removeItem('cravia_token');localStorage.removeItem('cravia_user');if(live){setToken(null);setUser(null)}}finally{if(live)setCartReady(true)}}sync();return()=>{live=false}},[token]);
 useEffect(()=>{localStorage.setItem('cravia_cart',JSON.stringify(cart));if(token&&cartReady){const timer=setTimeout(()=>api.put('/cart',{items:Object.entries(cart).filter(([_,quantity])=>quantity>0).map(([menuItem,quantity])=>({menuItem,quantity}))}).catch(()=>{}),550);return()=>clearTimeout(timer)}},[cart,cartReady,token]);
 const add=(id)=>setCart(prev=>({...prev,[id]:Math.min(20,(prev[id]||0)+1)}));
 const decrease=id=>setCart(prev=>{const next={...prev};if((next[id]||0)<=1)delete next[id];else next[id]--;return next});
 const clear=()=>setCart({});
 const authenticate=({token,user})=>{localStorage.setItem('cravia_token',token);localStorage.setItem('cravia_user',JSON.stringify(user));setUser(user);setCartReady(false);setToken(token)};
 const logout=()=>{localStorage.removeItem('cravia_token');localStorage.removeItem('cravia_user');setToken(null);setUser(null);clear()};
 const lines=useMemo(()=>items.filter(i=>cart[i._id]>0).map(item=>({...item,quantity:cart[item._id]})),[items,cart]);
 const count=Object.values(cart).reduce((a,b)=>a+b,0);const subtotal=lines.reduce((a,b)=>a+b.price*b.quantity,0);
 return <C.Provider value={{items,loading,catalogMode,menuNotice,cart,lines,count,subtotal,add,decrease,clear,user,token,authenticate,logout,refresh}}>{children}</C.Provider>
}
export const useStore=()=>useContext(C);
