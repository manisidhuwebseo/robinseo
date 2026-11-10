/* Robin SEO shared navigation enhancement */
(function(){
  'use strict';
  function init(){
    document.body.classList.add('robin-redesign');
    var toggles=document.querySelectorAll('.mobile-menu-toggle,.menu-toggle');
    toggles.forEach(function(btn){
      var nav=btn.closest('header')?.querySelector('.nav, .navlinks') || document.querySelector('.nav, .navlinks');
      if(!nav)return;
      btn.setAttribute('aria-expanded','false');
      btn.setAttribute('aria-label','Toggle navigation');
      btn.addEventListener('click',function(){
        var open=nav.classList.toggle('is-open');
        nav.classList.toggle('open',open);
        btn.setAttribute('aria-expanded',String(open));
      });
    });
    document.querySelectorAll('.has-dropdown,.nav-dropdown').forEach(function(item){
      var trigger=item.querySelector(':scope > a, :scope > button, :scope > .nav-dropdown-trigger');
      var menu=item.querySelector(':scope > .dropdown, :scope > .nav-dropdown-menu');
      if(!trigger||!menu)return;
      if(trigger.tagName==='A')trigger.setAttribute('aria-haspopup','true');
      trigger.addEventListener('click',function(e){
        if(window.matchMedia('(max-width: 900px)').matches){
          e.preventDefault();
          var open=item.classList.toggle('open');
          trigger.setAttribute('aria-expanded',String(open));
        }
      });
      trigger.addEventListener('keydown',function(e){
        if(e.key==='Escape'){item.classList.remove('open');trigger.setAttribute('aria-expanded','false');trigger.focus();}
      });
    });
    document.addEventListener('click',function(e){
      if(!e.target.closest('.nav,.navlinks,.menu-toggle,.mobile-menu-toggle')){
        document.querySelectorAll('.has-dropdown.open,.nav-dropdown.open').forEach(function(el){el.classList.remove('open');});
      }
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();