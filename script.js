const b=document.querySelector('.burger'),m=document.querySelector('nav ul');
if(b)b.onclick=()=>m.classList.toggle('open');
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('show')}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const btns=document.querySelectorAll('.filtri button'),items=document.querySelectorAll('.progetto');
function filtra(c){btns.forEach(x=>x.classList.toggle('active',x.dataset.cat===c));
items.forEach(i=>i.classList.toggle('hide',c!=='tutti'&&i.dataset.cat!==c));}
btns.forEach(x=>x.onclick=()=>filtra(x.dataset.cat));
if(btns.length)filtra(new URLSearchParams(location.search).get('cat')||'tutti');
const lb=document.getElementById('lightbox');
if(lb){let imgs=[],i=0;const im=lb.querySelector('img'),cap=lb.querySelector('p');
const show=()=>im.src=imgs[i];
items.forEach(p=>p.onclick=()=>{imgs=p.dataset.imgs.split(/,(?=img\/)/);i=0;cap.textContent=p.querySelector('h3').textContent;show();lb.classList.add('open')});
lb.querySelector('.prev').onclick=e=>{e.stopPropagation();i=(i-1+imgs.length)%imgs.length;show()};
lb.querySelector('.next').onclick=e=>{e.stopPropagation();i=(i+1)%imgs.length;show()};
lb.onclick=()=>lb.classList.remove('open');
document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('open')});}
