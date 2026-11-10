/* Robin SEO — accessible shared navigation */
(function(){
  'use strict';
  function init(){
    document.body.classList.add('robin-redesign');
    var header=document.querySelector('.robin-global-header');
    if(!header)return;
    var toggle=header.querySelector('.mobile-menu-toggle');
    var nav=header.querySelector('#robin-main-nav');
    var serviceItem=header.querySelector('.robin-services-item');
    var serviceTrigger=header.querySelector('.robin-services-trigger');
    if(toggle&&nav){
      toggle.addEventListener('click',function(){
        var expanded=toggle.getAttribute('aria-expanded')!=='true';
        toggle.setAttribute('aria-expanded',String(expanded));
        toggle.setAttribute('aria-label',expanded?'Close navigation':'Open navigation');
        nav.classList.toggle('is-open',expanded);
        if(!expanded&&serviceItem){
          serviceItem.classList.remove('open');
          if(serviceTrigger)serviceTrigger.setAttribute('aria-expanded','false');
        }
      });
    }
    if(serviceItem&&serviceTrigger){
      serviceTrigger.addEventListener('click',function(event){
        if(window.matchMedia('(max-width: 1000px)').matches){
          event.preventDefault();
          var expanded=serviceItem.classList.toggle('open');
          serviceTrigger.setAttribute('aria-expanded',String(expanded));
        }
      });
      serviceTrigger.addEventListener('keydown',function(event){
        if(event.key==='Escape'){
          serviceItem.classList.remove('open');
          serviceTrigger.setAttribute('aria-expanded','false');
          serviceTrigger.focus();
        }
        if((event.key==='Enter'||event.key===' ')&&window.matchMedia('(min-width: 1001px)').matches){
          serviceItem.classList.add('open');
          serviceTrigger.setAttribute('aria-expanded','true');
        }
      });
    }
    document.addEventListener('click',function(event){
      if(!header.contains(event.target)){
        if(serviceItem)serviceItem.classList.remove('open');
        if(serviceTrigger)serviceTrigger.setAttribute('aria-expanded','false');
        if(nav)nav.classList.remove('is-open');
        if(toggle){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}
      }
    });
    document.addEventListener('keydown',function(event){
      if(event.key==='Escape'){
        if(serviceItem)serviceItem.classList.remove('open');
        if(serviceTrigger)serviceTrigger.setAttribute('aria-expanded','false');
        if(nav)nav.classList.remove('is-open');
        if(toggle){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}
      }
    });
    window.addEventListener('resize',function(){
      if(window.matchMedia('(min-width: 1001px)').matches){
        if(nav)nav.classList.remove('is-open');
        if(toggle){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}
      }
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();