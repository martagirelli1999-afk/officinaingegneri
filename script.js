const burger=document.querySelector('.burger');
const mobileMenu=document.querySelector('nav ul');
if(burger&&mobileMenu)burger.onclick=()=>mobileMenu.classList.toggle('open');

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting)entry.target.classList.add('show');
  });
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element));

const filterButtons=document.querySelectorAll('.filtri button');
const projects=document.querySelectorAll('.progetto');
function filterProjects(category){
  if(!Array.from(filterButtons).some(button=>button.dataset.cat===category))category='tutti';
  filterButtons.forEach(button=>button.classList.toggle('active',button.dataset.cat===category));
  projects.forEach(project=>project.classList.toggle('hide',category!=='tutti'&&project.dataset.cat!==category));
}
filterButtons.forEach(button=>button.addEventListener('click',()=>filterProjects(button.dataset.cat)));
if(filterButtons.length)filterProjects(new URLSearchParams(location.search).get('cat')||'tutti');

const lightbox=document.getElementById('lightbox');
if(lightbox){
  let images=[];
  let imageIndex=0;
  const image=lightbox.querySelector('img');
  const caption=lightbox.querySelector('p');
  const showImage=()=>{
    image.src=images[imageIndex].src;
    image.alt=images[imageIndex].alt;
    caption.textContent=`${lightbox.dataset.title} (${imageIndex+1}/${images.length})`;
  };

  projects.forEach(project=>project.addEventListener('click',()=>{
    images=Array.from(project.querySelectorAll('.project-gallery img'),photo=>({
      src:photo.src,
      alt:photo.alt
    }));
    if(!images.length)return;
    imageIndex=0;
    lightbox.dataset.title=project.querySelector('h3').textContent;
    showImage();
    lightbox.classList.add('open');
  }));
  lightbox.querySelector('.prev').addEventListener('click',event=>{
    event.stopPropagation();
    imageIndex=(imageIndex-1+images.length)%images.length;
    showImage();
  });
  lightbox.querySelector('.next').addEventListener('click',event=>{
    event.stopPropagation();
    imageIndex=(imageIndex+1)%images.length;
    showImage();
  });
  lightbox.addEventListener('click',event=>{
    if(event.target===lightbox)lightbox.classList.remove('open');
  });
  document.addEventListener('keydown',event=>{
    if(!lightbox.classList.contains('open'))return;
    if(event.key==='Escape')lightbox.classList.remove('open');
    if(event.key==='ArrowLeft')imageIndex=(imageIndex-1+images.length)%images.length;
    if(event.key==='ArrowRight')imageIndex=(imageIndex+1)%images.length;
    if(event.key==='ArrowLeft'||event.key==='ArrowRight')showImage();
  });
}
