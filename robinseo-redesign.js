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

  function addWhatsAppIcons(){
    var icon='<span class="robin-wa-icon" aria-hidden="true"><svg viewBox="0 0 32 32" focusable="false"><path fill="currentColor" d="M16.04 3C8.9 3 3.08 8.76 3.08 15.84c0 2.27.6 4.49 1.74 6.45L3 29l6.9-1.79a13.1 13.1 0 0 0 6.13 1.52h.01c7.14 0 12.96-5.76 12.96-12.84 0-3.43-1.35-6.65-3.8-9.08A12.9 12.9 0 0 0 16.04 3zm0 23.56h-.01a10.9 10.9 0 0 1-5.55-1.51l-.4-.24-4.1 1.06 1.1-3.97-.26-.41a10.66 10.66 0 0 1-1.65-5.65c0-5.9 4.88-10.7 10.88-10.7 2.9 0 5.63 1.12 7.68 3.16a10.53 10.53 0 0 1 3.18 7.54c0 5.9-4.88 10.72-10.87 10.72zm5.97-8.02c-.33-.16-1.94-.95-2.24-1.06-.3-.11-.52-.16-.74.16-.22.32-.85 1.06-1.04 1.28-.19.22-.38.24-.71.08-.33-.16-1.4-.51-2.66-1.62-.98-.86-1.64-1.92-1.83-2.25-.19-.32-.02-.5.14-.66.15-.14.33-.38.49-.57.16-.19.22-.32.33-.54.11-.22.05-.41-.03-.57-.08-.16-.74-1.75-1.01-2.4-.27-.63-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.32-1.14 1.1-1.14 2.69s1.17 3.12 1.33 3.34c.16.22 2.3 3.47 5.57 4.87.78.33 1.39.53 1.87.68.79.25 1.51.22 2.08.13.63-.1 1.94-.79 2.21-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.63-.38z"/></svg></span>';
    var styleId='robin-whatsapp-icon-style';
    if(!document.getElementById(styleId)){
      var style=document.createElement('style');style.id=styleId;
      style.textContent='.robin-wa-icon{display:inline-flex;align-items:center;justify-content:center;width:1.12em;height:1.12em;vertical-align:-.16em;margin-right:.42em;flex:0 0 auto}.robin-wa-icon svg{display:block;width:100%;height:100%;fill:currentColor}';
      document.head.appendChild(style);
    }
    document.querySelectorAll('a,button').forEach(function(el){
      var href=(el.getAttribute('href')||'').toLowerCase();
      var label=(el.textContent||'').trim();
      var isWhatsApp=href.indexOf('wa.me')!==-1||href.indexOf('whatsapp.com')!==-1||/whatsapp/i.test(label);
      if(!isWhatsApp||el.querySelector('.robin-wa-icon,svg,img'))return;
      el.insertAdjacentHTML('afterbegin',icon);
    });
  }

  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);document.addEventListener('DOMContentLoaded',addWhatsAppIcons);}else{init();addWhatsAppIcons();}
})();