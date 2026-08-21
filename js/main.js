
document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('.site-header');
  const toggle=document.querySelector('.menu-toggle');
  const links=document.querySelector('.nav-links');
  const year=document.querySelectorAll('[data-year]');
  year.forEach(el=>el.textContent=new Date().getFullYear());

  window.addEventListener('scroll',()=>{
    header?.classList.toggle('scrolled',window.scrollY>40);
  },{passive:true});

  toggle?.addEventListener('click',()=>{
    links.classList.toggle('open');
    document.body.classList.toggle('nav-open');
    toggle.textContent=links.classList.contains('open')?'CLOSE':'MENU';
  });

  links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    links.classList.remove('open'); document.body.classList.remove('nav-open');
    if(toggle) toggle.textContent='MENU';
  }));

  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  // Subtle tilt on desktop for video cards
  document.querySelectorAll('.video-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      if(window.innerWidth<900) return;
      const r=card.getBoundingClientRect();
      const x=((e.clientX-r.left)/r.width-.5)*3;
      const y=((e.clientY-r.top)/r.height-.5)*-3;
      card.style.transform=`perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave',()=>card.style.transform='');

    const vid=card.querySelector('.video-file');
    if(vid){
      card.addEventListener('mouseenter',()=>{if(window.innerWidth>=900) vid.play().catch(()=>{});});
      card.addEventListener('mouseleave',()=>vid.pause());
      const dot=card.querySelector('.play-dot');
      dot?.addEventListener('click',e=>{
        e.stopPropagation();
        if(vid.paused){vid.muted=false;vid.play().catch(()=>{});dot.textContent='❚❚';}
        else{vid.pause();dot.textContent='▶';}
      });
    }

    // Mobile: tap toggles overlay off and plays the video
    card.addEventListener('click',()=>{
      if(window.innerWidth>=900) return;
      card.classList.toggle('touched');
      if(card.classList.contains('touched') && vid){vid.muted=false;vid.play().catch(()=>{});}
      else if(vid){vid.pause();}
    });

  // Contact forms: send to Formspree.
  document.querySelectorAll('[data-contact-form]').forEach(form=>{
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const note=form.querySelector('.form-note');
      const btn=form.querySelector('button[type="submit"]');
      if(note) note.textContent='Enviando…';
      if(btn) btn.disabled=true;
      fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}})
        .then(res=>{
          if(res.ok){form.reset();if(note) note.textContent='¡Gracias! Tu mensaje ha sido enviado.';}
          else{if(note) note.textContent='Hubo un problema. Inténtalo de nuevo.';}
        })
        .catch(()=>{if(note) note.textContent='Error de conexión. Inténtalo de nuevo.';})
        .finally(()=>{if(btn) btn.disabled=false;});
    });
  });

  // Portfolio lightbox: open full image on click.
  const cards=document.querySelectorAll('.project-card img');
  if(cards.length){
    const lb=document.createElement('div');
    lb.className='lightbox';
    lb.innerHTML='<span class="lightbox-close">Cerrar</span><img alt="">';
    document.body.appendChild(lb);
    const lbImg=lb.querySelector('img');
    const open=src=>{lbImg.src=src;lb.classList.add('open');document.body.style.overflow='hidden';};
    const close=()=>{lb.classList.remove('open');lbImg.src='';document.body.style.overflow='';};
    cards.forEach(img=>img.addEventListener('click',()=>open(img.currentSrc||img.src)));
    lb.addEventListener('click',close);
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  }
});
