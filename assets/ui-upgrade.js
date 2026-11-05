/* ALFA PRINT — улучшения интерфейса без сторонних библиотек */
(()=>{
 'use strict';
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const cards=[...document.querySelectorAll('.work-card')];
 const modal=document.getElementById('workLightbox');
 const imageArea=modal?.querySelector('.lightbox-image-wrap');
 const toast=document.getElementById('toast');
 const dockLinks=[...document.querySelectorAll('.dock-link')];
 let toastTimer;
 function notify(message){
   if(!toast)return;
   clearTimeout(toastTimer);toast.textContent=message;toast.classList.add('on');
   toastTimer=setTimeout(()=>toast.classList.remove('on'),1800);
 }
 document.querySelectorAll('a[href]').forEach(link=>{
   const url=link.getAttribute('href')||'';
   let message='';
   if(url.startsWith('https://wa.me/'))message='Открываем WhatsApp';
   else if(url.includes('t.me/')||url.includes('telegram.me/'))message='Открываем Telegram';
   else if(url.includes('yandex.ru/maps'))message='Открываем Яндекс Карты';
   else if(url.startsWith('tel:'))message='Открываем звонок';
   if(message)link.addEventListener('click',()=>notify(message));
 });
 if(!reduced && 'IntersectionObserver' in window){
   const observer=new IntersectionObserver(entries=>{
     for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('work-in-view');observer.unobserve(entry.target);}}
   },{rootMargin:'0px 0px 110px 0px',threshold:.04});
   cards.forEach(card=>observer.observe(card));
   document.documentElement.classList.add('fx-ready');
 }
 if(imageArea && modal){
   let start=null;
   imageArea.addEventListener('touchstart',e=>{
     if(e.touches.length!==1 || modal.hidden){start=null;return;}
     const t=e.touches[0];start={x:t.clientX,y:t.clientY,time:Date.now()};
   },{passive:true});
   imageArea.addEventListener('touchend',e=>{
     if(!start||modal.hidden||!e.changedTouches.length)return;
     const t=e.changedTouches[0];const dx=t.clientX-start.x,dy=t.clientY-start.y;
     if(Math.abs(dx)>48 && Math.abs(dx)>Math.abs(dy)*1.35 && Date.now()-start.time<1200){
       document.getElementById(dx<0?'lightboxNext':'lightboxPrev')?.click();
     }
     start=null;
   },{passive:true});
 }
 function updateDock(){
   const scrollY=window.scrollY||0;
   const pf=document.getElementById('portfolio');
   const location=document.getElementById('location');
   let current='top';
   if(pf && pf.getBoundingClientRect().top < window.innerHeight*.45)current='portfolio';
   if(location && location.getBoundingClientRect().top < window.innerHeight*.50)current='location';
   if(scrollY<80)current='top';
   for(const link of dockLinks){
     const selected=link.dataset.section===current;
     link.classList.toggle('is-current',selected);
     if(selected)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
   }
 }
 let scheduled=false;
 window.addEventListener('scroll',()=>{
   if(scheduled)return;scheduled=true;
   requestAnimationFrame(()=>{updateDock();scheduled=false;});
 },{passive:true});
 window.addEventListener('resize',updateDock,{passive:true});
 updateDock();
})();
