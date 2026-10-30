import {useEffect,useRef} from 'react';
export default function Reveal({children,as:Tag='div',className='',delay=0}){
  const ref=useRef(null);
  useEffect(()=>{
    const node=ref.current;
    if(!node || typeof IntersectionObserver==='undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    node.style.setProperty('--reveal-delay', `${Math.min(Math.max(delay,0),600)}ms`);
    node.classList.add('reveal-prepared');
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}
    },{threshold:0.1,rootMargin:'0px 0px -24px 0px'});
    observer.observe(node);
    return()=>{observer.disconnect();node.classList.remove('reveal-prepared');node.classList.remove('is-visible')};
  },[delay]);
  return <Tag ref={ref} className={`scroll-reveal ${className}`.trim()}>{children}</Tag>;
}
