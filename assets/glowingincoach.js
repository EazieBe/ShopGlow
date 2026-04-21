/* ==========================================================
   GlowingInCoach Premium Theme JS v2.0
   ========================================================== */
(function(){
'use strict';

function initLoader(){
  var l=document.querySelector('.gic-loader');
  if(!l)return;
  window.addEventListener('load',function(){setTimeout(function(){l.classList.add('hidden');},1800);});
}

function initCursor(){
  if(window.innerWidth<1024)return;
  var c=document.createElement('div');c.className='gic-cursor';
  var d=document.createElement('div');d.className='gic-cursor-dot';
  document.body.appendChild(c);document.body.appendChild(d);
  var mx=0,my=0,cx=0,cy=0;
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;d.style.left=mx+'px';d.style.top=my+'px';});
  function ani(){cx+=(mx-cx)*.12;cy+=(my-cy)*.12;c.style.left=cx+'px';c.style.top=cy+'px';requestAnimationFrame(ani);}
  ani();
  document.querySelectorAll('a,button,.prod-card,.col-card').forEach(function(el){
    el.addEventListener('mouseenter',function(){c.classList.add('hovering');});
    el.addEventListener('mouseleave',function(){c.classList.remove('hovering');});
  });
}

function initNav(){
  var nav=document.querySelector('.gic-nav');
  if(!nav)return;
  window.addEventListener('scroll',function(){nav.classList[window.scrollY>60?'add':'remove']('scrolled');},{passive:true});
  var mb=document.querySelector('.mobile-menu-btn'),mn=document.querySelector('.mobile-nav');
  if(mb&&mn)mb.addEventListener('click',function(){mn.classList.toggle('open');});
}

function initAnnouncement(){
  var btn=document.querySelector('.announcement-close'),bar=document.querySelector('.gic-announcement');
  if(btn&&bar){
    btn.addEventListener('click',function(){
      bar.style.cssText='height:0;padding:0;opacity:0;overflow:hidden;transition:all .3s ease;';
      sessionStorage.setItem('gic-ann','1');
    });
  }
  if(sessionStorage.getItem('gic-ann')&&bar)bar.style.display='none';
}

function initBackToTop(){
  var btn=document.createElement('button');
  btn.className='back-to-top';btn.innerHTML='&#8593;';btn.setAttribute('aria-label','Back to top');
  document.body.appendChild(btn);
  window.addEventListener('scroll',function(){btn.classList[window.scrollY>500?'add':'remove']('visible');},{passive:true});
  btn.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
}

function showToast(msg,icon){
  var t=document.querySelector('.gic-toast');if(t)t.remove();
  t=document.createElement('div');t.className='gic-toast';
  t.innerHTML='<span>'+(icon||'✨')+'</span>&nbsp;'+msg;
  document.body.appendChild(t);
  requestAnimationFrame(function(){requestAnimationFrame(function(){t.classList.add('show');});});
  setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove();},400);},3000);
}

function updateCartCount(){
  fetch('/cart.js').then(function(r){return r.json();}).then(function(c){
    var b=document.querySelector('.cart-count');if(!b)return;
    b.textContent=c.item_count;b.style.display=c.item_count>0?'flex':'none';
  }).catch(function(){});
}

function initCartForms(){
  document.querySelectorAll('form[action*="/cart/add"]').forEach(function(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var btn=form.querySelector('[type="submit"]'),vid=form.querySelector('[name="id"]');
      if(!vid)return;
      if(btn){btn.disabled=true;btn.textContent='Adding...';}
      fetch('/cart/add.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:vid.value,quantity:1})})
      .then(function(r){return r.json();})
      .then(function(){
        updateCartCount();showToast('Added to your cart!','✨');
        if(btn){btn.disabled=false;btn.textContent='Added! ✦';setTimeout(function(){btn.textContent='Add ✦';},2000);}
      }).catch(function(){if(btn){btn.disabled=false;btn.textContent='Add ✦';}showToast('Please try again','⚠️');});
    });
  });
}

function initWishlist(){
  document.querySelectorAll('.pwish,.prod-action-btn').forEach(function(btn){
    btn.addEventListener('click',function(e){
      e.preventDefault();e.stopPropagation();
      var w=btn.classList.toggle('wished');
      btn.textContent=w?'♥':'♡';
      btn.style.color=w?'#C9A84C':'';
      showToast(w?'Saved to wishlist!':'Removed from wishlist',w?'♥':'♡');
    });
  });
}

function initGallery(){
  var thumbs=document.querySelectorAll('.gallery-thumb'),main=document.querySelector('.gallery-main img');
  if(!thumbs.length||!main)return;
  main.style.transition='opacity .2s ease,transform .2s ease';
  thumbs.forEach(function(t){
    t.addEventListener('click',function(){
      var src=t.dataset.src||(t.querySelector('img')&&t.querySelector('img').src);if(!src)return;
      main.style.opacity='0';main.style.transform='scale(.97)';
      setTimeout(function(){main.src=src;main.style.opacity='1';main.style.transform='scale(1)';},200);
      thumbs.forEach(function(x){x.classList.remove('active');});t.classList.add('active');
    });
  });
}

function initTabs(){
  document.querySelectorAll('.tab-btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      var target=btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(function(b){b.classList.remove('active');});
      document.querySelectorAll('.tab-content').forEach(function(c){c.classList.remove('active');});
      btn.classList.add('active');
      var ct=document.querySelector('.tab-content[data-tab="'+target+'"]');
      if(ct){ct.classList.add('active');ct.style.animation='fadeIn .3s ease';}
    });
  });
}

function initCartQty(){
  document.querySelectorAll('.qty-btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      var key=btn.dataset.key,action=btn.dataset.action,num=btn.parentElement.querySelector('.qty-num');
      if(!key||!num)return;
      var curr=parseInt(num.textContent)||1,nq=action==='increase'?curr+1:Math.max(0,curr-1);
      fetch('/cart/change.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:key,quantity:nq})})
      .then(function(r){return r.json();}).then(function(){
        if(nq===0){location.reload();}else{num.textContent=nq;updateCartCount();}
      });
    });
  });
  document.querySelectorAll('.cart-remove').forEach(function(btn){
    btn.addEventListener('click',function(){
      var key=btn.dataset.key;if(!key)return;
      fetch('/cart/change.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:key,quantity:0})}).then(function(){location.reload();});
    });
  });
}

function initScrollReveal(){
  if(!('IntersectionObserver' in window))return;
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){entry.target.style.opacity='1';entry.target.style.transform='translateY(0)';obs.unobserve(entry.target);}
    });
  },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.prod-card,.col-card,.rev-card,.trust-item,.insta-tile').forEach(function(el,i){
    el.style.opacity='0';el.style.transform='translateY(28px)';
    el.style.transition='opacity .55s ease '+(i*.06)+'s,transform .55s ease '+(i*.06)+'s';
    obs.observe(el);
  });
}

function initFilters(){
  document.querySelectorAll('.filter-chip').forEach(function(chip){
    chip.addEventListener('click',function(){
      document.querySelectorAll('.filter-chip').forEach(function(c){c.classList.remove('active');});
      chip.classList.add('active');
      var f=chip.dataset.filter;
      document.querySelectorAll('.prod-card').forEach(function(card){
        card.style.display=(f==='all'||!(card.dataset.tags)||card.dataset.tags.toLowerCase().includes(f))?'':'none';
      });
    });
  });
}

function initHeroParticles(){
  var hero=document.querySelector('.gic-hero');if(!hero)return;
  var particles=[
    {top:'8%',left:'6%'},{top:'12%',right:'10%'},{top:'55%',left:'4%'},
    {bottom:'22%',right:'7%'},{bottom:'12%',left:'18%'},{top:'35%',left:'48%'}
  ];
  var icons=['✦','✨','⭐','💫','✦','✨'],delays=[0,.7,1.4,1,2,.4];
  particles.forEach(function(p,i){
    var el=document.createElement('span');el.className='hero-particle';el.textContent=icons[i];
    Object.entries(p).forEach(function(kv){el.style[kv[0]]=kv[1];});
    el.style.setProperty('--delay',delays[i]+'s');el.style.animationDelay=delays[i]+'s';
    hero.appendChild(el);
  });
}

function initInstagram(){
  var bgs=['linear-gradient(135deg,#FFE8F0,#FFD8A0)','linear-gradient(135deg,#E4FAFF,#D8C8FF)',
    'linear-gradient(135deg,#FFFFF0,#B8FFE8)','linear-gradient(135deg,#FFE8F0,#FFD0C0)',
    'linear-gradient(135deg,#E4F0FF,#E0D4FF)','linear-gradient(135deg,#F0FFE8,#FFE0F8)'];
  var emojis=['👜','👝','💍','👗','✨','💛'];
  document.querySelectorAll('.insta-tile').forEach(function(t,i){
    if(!t.querySelector('img')){
      t.style.background=bgs[i%bgs.length];
      var sp=document.createElement('span');sp.textContent=emojis[i%emojis.length];t.appendChild(sp);
      var ov=document.createElement('div');ov.className='insta-tile-overlay';
      ov.innerHTML='<div class="insta-overlay-icon">📸</div>';t.appendChild(ov);
    }
  });
}

document.addEventListener('DOMContentLoaded',function(){
  initLoader();initCursor();initNav();initAnnouncement();initBackToTop();
  initCartForms();initWishlist();initGallery();initTabs();
  initCartQty();initFilters();initScrollReveal();
  initHeroParticles();initInstagram();updateCartCount();
});

})();
