/* Blobatar 2.7.0, MIT, Copyright (c) 2026 Alain. Local classic-script packaging. */
(()=>{
var xe=110,pe=1.6,de=0.55,fe=0.15;var be=0.01,ae=(e)=>e*e*(3-2*e),ce=(e,n,a)=>Math.min(a,Math.max(n,e)),ie=(e,n=110)=>n<=0?1:1-Math.exp(-e/n);function le(e,n){let a=n*(e/100);return a>0?ce(0.15/a,0.002,0.06):0.06}var D=0.97,me=4,oe=(e,n,a)=>{let r=e*e+n*n;if(r<0.000000001)return{sx:1,sy:1,sh:0};let h=Math.max(0,a);return{sx:(h*e*e+n*n)/r,sy:(h*n*n+e*e)/r,sh:(h-1)*e*n/r}};function ue(e,n,a){let r=e.x*e.x+e.y*e.y,h=r>1?1/Math.sqrt(r):1,y=e.x*h,m=e.y*h,E=Math.sqrt(Math.max(0,1-y*y-m*m)),g=Math.cos(n),S=Math.sin(n),f=y*g+E*S,P=E*g-y*S,b=Math.cos(a),i=Math.sin(a),c=m*b+P*i,o=P*b-m*i,s=Math.hypot(f,c),l=o<=0||s>D,M=l?D/(s||1):1,d=f*M,x=c*M,G=l?Math.sqrt(1-D*D):o,u=oe(y,m,E),v=oe(d,x,G);return{dx:d-e.x,dy:x-e.y,sx:Math.min(1,v.sx/(u.sx||1)),sy:Math.min(1,v.sy/(u.sy||1)),t:me*(v.sh-u.sh)}}function he(e){let n=Math.hypot(e.dx,e.dy),a=e.radius>0?ae(Math.min(1,n/(e.radius*0.55))):1,r=(e.gain??1)*a,h=n>0?e.dx/n*r:0,y=n>0?e.dy/n*r:0,m=Math.hypot(h-e.x,y-e.y)>(e.snap??1.6)?1:e.k;return{x:e.x+(h-e.x)*m,y:e.y+(y-e.y)*m,tx:h,ty:y,f:m}}function ye(e){let n=e.querySelector(".mo-bob > g:not(.mo-eyes)"),a=[...e.querySelectorAll(".mo-eye")];if(!n||!a.length)return null;try{let r=n.getBBox(),h=[...n.querySelectorAll("path,circle")],y=r.x+r.width/2,m=r.y+r.height/2,E=(o,s,l)=>h.some((M)=>M.isPointInFill(new DOMPoint(y+o*r.width/2*s,m+o*r.height/2*l))),g=1;for(let o=0;o<16;o++){let s=o/16*Math.PI*2,l=Math.cos(s),M=Math.sin(s);if(E(1,l,M))continue;let d=0,x=1;for(let G=0;G<12;G++){let u=(d+x)/2;if(E(u,l,M))d=u;else x=u}g=Math.min(g,d)}let S=0,f=0,P=a.map((o)=>{let s=o.getBBox();return S=Math.max(S,s.width/2),f=Math.max(f,s.height/2),{x:s.x+s.width/2-y,y:s.y+s.height/2-m}}),b=Math.max(1,r.width/2*g-S),i=Math.max(1,r.height/2*g-f),c=0;for(let o of P)c=Math.max(c,Math.hypot(o.x/b,o.y/i));if(c>0.85)b*=c/0.85,i*=c/0.85;return{marks:P.map((o)=>({x:o.x/b,y:o.y/i})),rx:b,ry:i}}catch{return null}}function Me(e,n={}){let a=matchMedia("(hover: hover) and (pointer: fine)"),r=matchMedia("(prefers-reduced-motion: reduce)"),h=n.settle??110,y=n.snap??1.6,m=0,E=0,g=1,S=1,f=0,P=-1e6,b=-1e6,i=0,c=0,o=0,s=0,l=0,M=0,d=0,x=0,G=!1,u=!1,v=null,k=null,N=!1,B=1,p=e,R=[],_=[],X=50,C=50,Z=0,U=0,Y=()=>{let t=ye(e);if(!t)return;_=t.marks,X=t.rx,C=t.ry},J=()=>{p=e.querySelector(".mo-eyes")??e,R=[...e.querySelectorAll(".mo-eye")],Y()},K=()=>{if(!k)return;let t=k.getBoundingClientRect();v={x:t.left+t.width/2,y:t.top+t.height/2}},j=()=>{K();let t=e.getBoundingClientRect();if(m=t.left+t.width/2,E=t.top+t.height/2,g=Math.max(1,Math.min(t.width,t.height)/2),S=Math.max(1,t.width),f=parseFloat(getComputedStyle(p).getPropertyValue("--mo-track-travel"))||0,!_.length)Y();Z=f/X,U=f/C},Q=(t)=>{x=0;let H=d?Math.min(t-d,64):16;if(d=t,!p.isConnected)J(),j(),o=s=1/0;let re=ie(H,h),L=he({x:i,y:c,dx:N?0:(v?v.x:P)-m,dy:N?0:(v?v.y:b)-E,radius:g,k:re,snap:y});i=L.x,c=L.y;let O=le(S,f),V=!1;if(Math.abs(L.tx-i)<=O&&Math.abs(L.ty-c)<=O)i=L.tx,c=L.ty;else V=!0;if(l+=(B-l)*re,Math.abs(B-l)<=0.01)l=B;else V=!0;if(Math.abs(l-M)>0.01)M=l,e.style.setProperty("--mo-track-hold",l.toFixed(3)),V=!0;if(Math.abs(i-o)>O||Math.abs(c-s)>O){o=i,s=c,p.style.setProperty("--mo-track-x",i.toFixed(3)),p.style.setProperty("--mo-track-y",c.toFixed(3));for(let I=0;I<_.length&&I<R.length;I++){let T=ue(_[I],i*Z,c*U),q=I+1;p.style.setProperty(`--mo-gz-dx${q}`,(T.dx*X).toFixed(3)),p.style.setProperty(`--mo-gz-dy${q}`,(T.dy*C).toFixed(3)),p.style.setProperty(`--mo-gz-sx${q}`,T.sx.toFixed(4)),p.style.setProperty(`--mo-gz-sy${q}`,T.sy.toFixed(4)),p.style.setProperty(`--mo-gz-t${q}`,T.t.toFixed(3))}V=!0}if(V||G)G=!1,x=requestAnimationFrame(Q);else d=0},w=()=>{if(!u)return;if(G=!0,!x)x=requestAnimationFrame(Q)},W=(t)=>{P=t.clientX,b=t.clientY,w()},ee=()=>{P=-1e6,b=-1e6,w()},z=()=>{j(),w()},A=new ResizeObserver(z),se=()=>{if(u)return;if(u=!0,J(),j(),A.observe(e),k)A.observe(k);addEventListener("pointermove",W,{passive:!0}),addEventListener("pointerleave",ee,{passive:!0}),addEventListener("scroll",z,{passive:!0,capture:!0}),addEventListener("resize",z,{passive:!0}),w()},te=()=>{if(!u)return;if(u=!1,A.disconnect(),removeEventListener("pointermove",W),removeEventListener("pointerleave",ee),removeEventListener("scroll",z,{capture:!0}),removeEventListener("resize",z),x)cancelAnimationFrame(x);x=0,d=0,i=c=o=s=l=M=0,p.style.removeProperty("--mo-track-x"),p.style.removeProperty("--mo-track-y");for(let t=1;t<=R.length;t++)for(let H of["dx","dy","sx","sy","t"])p.style.removeProperty(`--mo-gz-${H}${t}`);e.style.removeProperty("--mo-track-hold")},F=()=>a.matches&&!r.matches?se():te();a.addEventListener("change",F),r.addEventListener("change",F),F();let ne=(t)=>{if(k&&u)A.unobserve(k);if(k=v=null,N=t===null||t==="rest",B=t===null?0:1,typeof t!=="object"||!t)return;if("getBoundingClientRect"in t){if(k=t,u)A.observe(t);K();return}v={x:t.x,y:t.y}};return ne(n.target??null),{lookAt:(t)=>{ne(t),w()},remeasure:z,stop:()=>{te(),a.removeEventListener("change",F),r.removeEventListener("change",F)}}}
window.BlobatarGaze={gaze:Me};
})();

;
(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const forcedColors = window.matchMedia('(forced-colors: active)');

  const root = document.documentElement;
  const motionToggle = document.querySelector('.motion-toggle');
  const avatarButton = document.getElementById('avatar-button');
  const avatarSvg = document.getElementById('maiora-avatar');
  const liveAnimations = new Set();
  const entranceAnimations = new Map();
  let userMotion = true;
  let cloudRenderer = null;
  let avatarVisible = false;
  let welcomed = false;
  let gaze = null;
  let gazeTarget = 'pointer';
  let reactionTimeout;
  let greetingTimeout;
  let avatarReactionAnimation = null;
  const canAnimate = () => userMotion && !reducedMotion.matches && !document.hidden;

  function animate(element, frames, options) {
    if (!canAnimate()) return null;
    const animation = element.animate(frames, options);
    liveAnimations.add(animation);
    animation.finished.catch(() => {}).finally(() => liveAnimations.delete(animation));
    return animation;
  }

  function cancelTransientAnimations(keepPrepared = false) {
    const prepared = keepPrepared ? new Set([...entranceAnimations.values()].filter(animation => animation.playState === 'paused')) : new Set();
    liveAnimations.forEach(animation => {
      if (prepared.has(animation)) return;
      animation.cancel();
      liveAnimations.delete(animation);
    });
  }

  function clearAvatarReaction() {
    avatarReactionAnimation?.cancel();
    avatarReactionAnimation = null;
    clearTimeout(reactionTimeout);
    clearTimeout(greetingTimeout);
    avatarButton.classList.remove('greeting');
    gazeTarget = 'pointer';
  }

  function syncAvatar() {
    const running = canAnimate() && avatarVisible;
    avatarButton.classList.toggle('avatar-paused', !running);
    if (!running) {
      clearAvatarReaction();
      gaze?.stop();
      gaze = null;
    } else if (!gaze && window.BlobatarGaze) {
      gaze = window.BlobatarGaze.gaze(avatarSvg, {target:gazeTarget});
    }
  }

  function syncMotion() {
    const enabled = userMotion && !reducedMotion.matches;
    root.dataset.motion = enabled ? 'on' : 'off';
    root.dataset.pageHidden = String(document.hidden);
    motionToggle.hidden = false;
    motionToggle.disabled = reducedMotion.matches;
    motionToggle.setAttribute('aria-pressed', String(enabled));
    motionToggle.title = reducedMotion.matches ? 'Movimento ridotto dalle preferenze del dispositivo' : enabled ? 'Metti in pausa le animazioni' : 'Attiva le animazioni';
    if (!canAnimate()) {
      cancelTransientAnimations(document.hidden && enabled && !forcedColors.matches);
    }
    if (!enabled || forcedColors.matches) entranceAnimations.forEach(animation => animation.cancel());
    syncAvatar();
    cloudRenderer?.sync();
  }

  function greet(manual = false) {
    if (manual) document.getElementById('avatar-hint').textContent = 'Piacere! Guarda cosa possiamo fare insieme.';
    if (!canAnimate() || !avatarVisible) return;
    clearAvatarReaction();
    avatarButton.classList.remove('greeting');
    void avatarButton.offsetWidth;
    avatarButton.classList.add('greeting');
    gaze?.lookAt(document.querySelector('.audience-tabs'));
    greetingTimeout = setTimeout(() => {
      avatarButton.classList.remove('greeting');
      gaze?.lookAt('pointer');
    }, 850);
  }

  function pointAtExample(target) {
    if (!canAnimate() || !avatarVisible) return;
    clearAvatarReaction();
    gazeTarget = target;
    gaze?.lookAt(target);
    avatarReactionAnimation = animate(avatarButton, [{transform:'rotate(0)'},{transform:'rotate(3deg)',offset:.4},{transform:'rotate(0)'}], {duration:520,easing:'cubic-bezier(.2,.8,.2,1)'});
    reactionTimeout = setTimeout(() => {
      gazeTarget = 'pointer';
      gaze?.lookAt('pointer');
    }, 1450);
  }

  motionToggle.addEventListener('click', () => { userMotion = !userMotion; syncMotion(); });
  reducedMotion.addEventListener('change', syncMotion);
  forcedColors.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', syncMotion);
  window.addEventListener('pagehide', () => {
    cloudRenderer?.stop();
    clearAvatarReaction();
    gaze?.stop();
    gaze = null;
    cancelTransientAnimations(userMotion && !reducedMotion.matches && !forcedColors.matches);
  });
  window.addEventListener('pageshow', syncMotion);
  avatarButton.addEventListener('click', () => greet(true));

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      avatarVisible = entries[0].isIntersecting && entries[0].intersectionRatio >= .2;
      syncAvatar();
      if (avatarVisible && !welcomed && canAnimate()) { welcomed = true; greet(); }
    }, {threshold:[0,.2]}).observe(avatarButton);
    const sceneObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { entry.target.dataset.inView = String(entry.isIntersecting); });
      cloudRenderer?.sync();
    });
    document.querySelectorAll('.motion-scene').forEach(scene => sceneObserver.observe(scene));
  } else {
    avatarVisible = true;
  }
  syncMotion();

  // Ogni scena conserva il dipinto originale finché tutti i suoi ritagli sono pronti.
  function prepareLayers(selector, sources) {
    Promise.all(sources.map(src => new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = resolve;
      image.onerror = reject;
      image.src = src;
    }))).then(() => {
      document.querySelector(selector).classList.add('layers-ready');
      cloudRenderer?.sync();
    }).catch(() => {});
  }
  const heroScene = document.querySelector('.hero');
  const skyScenes = [...heroScene.querySelectorAll('.sky-scene')];
  const mobileViewport = window.matchMedia('(max-width: 680px)');
  const cloudImage = new Image();
  const cloudSurfaces = skyScenes.map(scene => {
    const canvas = scene.querySelector('.sky-cloud-canvas');
    const tile = document.createElement('canvas');
    return {scene, canvas, tile, context:canvas.getContext('2d'), tileContext:tile.getContext('2d')};
  });
  let cloudReady = false;
  let cloudFrame = 0;
  let cloudLastTime = null;
  let cloudTime = 12000;

  // Cover is resolved on resize; only pixels inside the small canvas move.
  function alignSkyScenes() {
    const {width, height} = heroScene.getBoundingClientRect();
    cloudSurfaces.forEach(surface => {
      const sceneWidth = surface.scene.closest('.hero-mobile-sky') ? width * 1.55 : width;
      const ratio = window.devicePixelRatio || 1;
      const geometryKey = `${sceneWidth}:${height}:${ratio}:${cloudImage.naturalWidth}:${cloudImage.complete}`;
      if (surface.geometryKey === geometryKey) return;
      surface.geometryKey = geometryKey;
      const scale = Math.max(sceneWidth / 1774, height / 887);
      const x = (sceneWidth - 1774 * scale) / 2;
      const y = (height - 887 * scale) / 2;
      surface.scene.style.setProperty('--sky-scale', String(scale));
      surface.scene.style.setProperty('--sky-x', `${x}px`);
      surface.scene.style.setProperty('--sky-y', `${y}px`);
      const left = Math.floor(x + 720.4 * scale) - 2;
      const top = Math.floor(y + 76.2 * scale) - 2;
      const canvasWidth = Math.ceil(x + 1151.6 * scale) + 2 - left;
      const canvasHeight = Math.ceil(y + 172.5 * scale) + 2 - top;
      Object.assign(surface, {scale, x, y, left, top, width:canvasWidth, height:canvasHeight});
      Object.assign(surface.canvas.style, {left:`${left}px`, top:`${top}px`, width:`${canvasWidth}px`, height:`${canvasHeight}px`});
      surface.canvas.width = Math.ceil(canvasWidth * ratio);
      surface.canvas.height = Math.ceil(canvasHeight * ratio);
      surface.tile.width = Math.ceil(367.2 * scale * ratio);
      surface.tile.height = Math.ceil(96.3 * scale * ratio);
      if (surface.context && surface.tileContext && cloudImage.complete && cloudImage.naturalWidth) {
        surface.tileContext.imageSmoothingQuality = 'high';
        surface.tileContext.drawImage(cloudImage, 30, 90, 2040, 535, 0, 0, surface.tile.width, surface.tile.height);
        paintCloud(surface);
      }
    });
  }

  function paintCloud(surface) {
    const {context, canvas, tile, width, height, scale, x, y, left, top} = surface;
    // One continuous 64-second curve, with zero velocity at both reversals.
    const drift = 2 - 32 * Math.cos(Math.PI * (cloudTime % 64000) / 32000);
    context.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    context.clearRect(0, 0, width, height);
    context.globalAlpha = .82;
    context.imageSmoothingEnabled = true;
    context.drawImage(tile, x + (750.4 + drift) * scale - left, y + 76.2 * scale - top, 367.2 * scale, 96.3 * scale);
  }

  function stopClouds() {
    if (cloudFrame) cancelAnimationFrame(cloudFrame);
    cloudFrame = 0;
    cloudLastTime = null;
  }

  function cloudsCanRun() {
    return cloudReady && canAnimate() && !forcedColors.matches && heroScene.classList.contains('layers-ready') && heroScene.dataset.inView !== 'false';
  }

  function cloudTick(time) {
    cloudFrame = 0;
    if (!cloudsCanRun()) { cloudLastTime = null; return; }
    if (cloudLastTime !== null) cloudTime = (cloudTime + time - cloudLastTime) % 64000;
    cloudLastTime = time;
    paintCloud(cloudSurfaces[mobileViewport.matches ? 1 : 0]);
    cloudFrame = requestAnimationFrame(cloudTick);
  }

  cloudRenderer = {
    stop:stopClouds,
    sync() {
      if (!cloudsCanRun()) stopClouds();
      else if (!cloudFrame) cloudFrame = requestAnimationFrame(cloudTick);
    }
  };
  cloudImage.onload = () => {
    if (!cloudSurfaces.every(surface => surface.context && surface.tileContext)) return;
    alignSkyScenes();
    cloudReady = true;
    heroScene.classList.add('clouds-ready');
    cloudRenderer.sync();
  };
  cloudImage.src = 'assets/28-nuvole.webp';
  alignSkyScenes();
  if ('ResizeObserver' in window) new ResizeObserver(alignSkyScenes).observe(heroScene);
  window.addEventListener('resize', alignSkyScenes);
  let cloudResolution;
  function watchCloudResolution() {
    cloudResolution?.removeEventListener('change', refreshCloudResolution);
    cloudResolution = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
    cloudResolution.addEventListener('change', refreshCloudResolution);
  }
  function refreshCloudResolution() {
    alignSkyScenes();
    watchCloudResolution();
  }
  watchCloudResolution();

  prepareLayers('.hero', ['assets/16-dettagli-animabili.webp','assets/19-papavero-destro.webp','assets/20-papavero-basso.webp','assets/21-fondo-brezza.webp','assets/24-raccordo-stelo.webp','assets/25-bocciolo.webp','assets/26-rametto.webp','assets/27-fondo-bocciolo-rametto.webp','assets/29-bocciolo-alto.webp','assets/30-fondo-cielo-bocciolo-opt.webp','assets/31-papavero-sinistro.webp','assets/33-fondo-papavero-pulito-opt.webp','assets/34-carta-raccordo-papavero-opt.webp','assets/35-bocciolo-sinistro-alto.webp','assets/36-bocciolo-destro-alto.webp','assets/37-fondo-boccioli-alti-opt.webp']);

  prepareLayers('.chapter-paint', ['assets/22-foglia-vite.webp','assets/23-fondo-vite.webp']);
  prepareLayers('.process-art-four', ['assets/14-il-percorso.webp']);
  prepareLayers('.fountain-scene', ['assets/13-estensione-acqua.webp']);
  prepareLayers('.footer-fountain-scene', ['assets/11-giardino-romano.webp']);

  // Section changes are one-time compositions; the painted backgrounds stay fixed.
  function setupSectionEntrances() {
    if (!('IntersectionObserver' in window)) return;
    const specs = new Map();
    const add = (selector, frames, duration = 650, stagger = 0) => {
      document.querySelectorAll(selector).forEach((element, index) => specs.set(element, {frames, duration, delay:index * stagger}));
    };
    const lift = amount => [{opacity:.65,transform:`translateY(${amount}px)`},{opacity:1,transform:'none'}];
    const pigment = [{opacity:.68},{opacity:1}];
    add('.service-copy', pigment, 700);
    add('.service-copy h2', [{transform:'translateY(18px)'},{transform:'none'}]);
    add('.product-stage', [{opacity:.85},{opacity:1}], 800);
    add('.service-choice', pigment, 550, 65);
    add('.assistant-section .section-heading,.method-section .section-heading', lift(16));
    add('.avatar-column,.assistant-demo', [{opacity:.82},{opacity:1}], 750, 90);
    add('.assistant-capabilities>div', lift(12), 600, 70);
    add('.process-art', [{opacity:.15,transform:'scale(.96)'},{opacity:1,transform:'none'}], 800, 90);
    add('.latin-tree', pigment, 650);
    add('.latin-stem', [{transform:'scaleY(0)'},{transform:'scaleY(1)'}], 850);
    add('.great-word', [{opacity:.7,transform:'translateY(18px) scale(.985)'},{opacity:1,transform:'none'}], 850);
    add('.identity-line,.identity>.hand-note', pigment, 650, 80);
    add('.contact-copy', pigment, 650);
    add('.contact-copy h2', [{transform:'translateY(14px)'},{transform:'none'}]);
    add('.contact-sheet', [{opacity:.85},{opacity:1}], 750);
    const initialAnchor = document.getElementById(location.hash.slice(1))?.closest('section');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const element = entry.target;
        if (!entry.isIntersecting) return;
        observer.unobserve(element);
        const animation = entranceAnimations.get(element);
        if (!animation || animation.playState === 'idle') return;
        if (!canAnimate() || forcedColors.matches || element.contains(document.activeElement)) {
          animation.cancel();
        } else {
          animation.play();
        }
      });
    }, {threshold:0, rootMargin:'0px 0px -72px 0px'});
    // Apply the first frame out of sight; keep it paused until it can actually be seen.
    // Measure before writing styles so all entries share the same settled layout.
    const pending = [...specs].filter(([element]) => element.getBoundingClientRect().top > window.innerHeight && element.closest('section') !== initialAnchor && !element.contains(document.activeElement));
    if (canAnimate() && !forcedColors.matches) pending.forEach(([element,{frames,duration,delay}]) => {
      const animation = animate(element, frames, {duration, delay, easing:'cubic-bezier(.22,.75,.25,1)', fill:'backwards'});
      if (!animation) return;
      animation.pause();
      animation.currentTime = 0;
      entranceAnimations.set(element, animation);
      animation.finished.catch(() => {}).finally(() => {
        if (entranceAnimations.get(element) === animation) entranceAnimations.delete(element);
      });
      observer.observe(element);
    });
    const settleFocused = event => entranceAnimations.forEach((animation, element) => {
      if (element.contains(event.target)) animation.cancel();
    });
    document.addEventListener('focusin', settleFocused);
    document.addEventListener('pointerdown', event => {
      // A touch on a heading can begin scrolling: it must not snap the heading to its end.
      if (event.target instanceof Element && event.target.closest('a[href],button,input,select,textarea,summary,[role="button"],[role="tab"],[contenteditable="true"]')) settleFocused(event);
    });
  }
  // Font swaps must finish before preparing the text geometry.
  const startEntrances = () => {
    if (document.hidden) {
      document.addEventListener('visibilitychange', startEntrances, {once:true});
      return;
    }
    setupSectionEntrances();
  };
  if (document.fonts?.ready) document.fonts.ready.then(startEntrances);
  else startEntrances();

  const descriptions = {
    site: 'Dal primo sguardo alla prenotazione: un sito pensato per il tuo ristorante, seguito nel tempo.',
    agenda: 'Una sola agenda per il sito, la chat e le richieste aggiunte da te e dal personale. Tavoli e servizio restano nello stesso posto.',
    assistant: 'Un assistente per le tue attività e uno per i tuoi ospiti. Ognuno lavora con le informazioni e i permessi che gli servono.'
  };
  const productStage = document.querySelector('.product-stage');
  const devices = [...productStage.querySelectorAll('.device')];
  const serviceButtons = [...document.querySelectorAll('[data-service]')];
  serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
      // FLIP: una misura prima/dopo, poi soltanto trasformazioni per fotogramma.
      const mobile = mobileViewport.matches;
      const before = mobile ? [] : devices.map(device => device.getBoundingClientRect());
      devices.forEach(device => device.getAnimations().forEach(animation => animation.cancel()));
      serviceButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      productStage.dataset.focus = button.dataset.service;
      productStage.classList.add('has-selected');
      devices.forEach((device, index) => {
        device.dataset.active = String(device.dataset.device === button.dataset.service);
      });
      const after = mobile ? [] : devices.map(device => device.getBoundingClientRect());
      devices.forEach((device,index) => {
        if (mobile) {
          if (device.dataset.active === 'true') animate(device, [{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}], {duration:320,easing:'cubic-bezier(.2,.8,.2,1)'});
          return;
        }
        const old = before[index], next = after[index];
        animate(device, [
          {transform:`translate(${old.left-next.left}px,${old.top-next.top}px) scale(${old.width/next.width},${old.height/next.height})`},
          {transform:'none'}
        ], {duration:520,easing:'cubic-bezier(.2,.8,.2,1)'});
      });
      document.getElementById('service-detail').textContent = descriptions[button.dataset.service];
      document.getElementById('service-caption').textContent = button.querySelector('strong + span').textContent;
    });
  });

  // Sono esempi locali del percorso: nessuna chiamata a un modello o al prodotto.
  const examples = {
    owner: [
      {label:'Il sito', question:'Vorrei aggiungere il risotto ai funghi al menu.', answer:'Volentieri. Indicami il prezzo; se vuoi, aggiungi una descrizione. Preparo la richiesta, poi potrai controllare l’anteprima prima di approvarla.', outcome:'Una richiesta, poi la tua approvazione.', detail:'La pubblicazione resta una tua scelta.'},
      {label:'La sala', question:'Stasera vorrei chiudere la terrazza. Ci sono prenotazioni da controllare?', answer:'Prima di chiudere la terrazza, ti mostro quali prenotazioni sono coinvolte. Poi decidi se confermare la modifica.', outcome:'Prima il controllo delle prenotazioni.', detail:'Le regole della sala cambiano dopo la tua conferma.'},
      {label:'I dati', question:'Vorrei confrontare questa settimana con la precedente.', answer:'Posso confrontare prenotazioni, coperti e cancellazioni delle due settimane. Ti indico i periodi esatti e segnalo gli eventuali dati mancanti.', outcome:'Le domande partono dai dati del locale.', detail:'Stesse definizioni e stessi periodi dei report nell’app.'},
      {label:'Le novità', question:'Vorrei un menu speciale soltanto per il prossimo fine settimana.', answer:'Dimmi quali piatti vuoi proporre e le date di inizio e fine. Preparo la richiesta: potrai controllare l’anteprima e approvare il menu speciale.', outcome:'Una novità, con il suo periodo.', detail:'Contenuto, anteprima e approvazione restano collegati.'}
    ],
    guest: [
      {label:'Orari e menu', question:'Dove posso trovare il menu e gli orari?', answer:'Certamente. Posso aiutarLa a consultare il menu e gli orari pubblicati dal ristorante. Che cosa vorrebbe sapere in particolare?', outcome:'Una risposta che parte dal ristorante.', detail:'I contenuti pubblicati sono il riferimento dell’assistente.'},
      {label:'Un tavolo', question:'Vorrei prenotare per due persone, sabato alle 20.', answer:'Volentieri. Verifico se c’è posto per due sabato alle 20. Prima di inviare la richiesta, Le mostrerò il riepilogo da confermare.', outcome:'Dalla disponibilità alla conferma.', detail:'L’esito della richiesta viene mostrato solo quando è verificato.'},
      {label:'Un cambio', question:'Posso cambiare l’orario della mia prenotazione?', answer:'Verifico la Sua prenotazione e le alternative disponibili. Le mostrerò il nuovo orario nel riepilogo, prima di chiederLe conferma.', outcome:'Anche le modifiche seguono un percorso chiaro.', detail:'La prenotazione non cambia prima della conferma.'},
      {label:'Una persona', question:'Ho una richiesta particolare. Posso parlare con qualcuno?', answer:'Certamente. Per una richiesta particolare può contattare il personale ai recapiti del ristorante. Vuole sapere dove trovarli?', outcome:'Il contatto umano resta a portata di mano.', detail:'Un recapito chiaro quando la richiesta richiede una persona.'}
    ]
  };
  const audienceTabs = [...document.querySelectorAll('[data-audience]')];
  const choices = document.getElementById('example-choices');
  const conversation = document.getElementById('assistant-conversation');
  let currentAudience = 'owner';

  function showExample(index) {
    const example = examples[currentAudience][index];
    choices.querySelectorAll('button').forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    conversation.querySelector('.conversation-question').textContent = example.question;
    conversation.querySelector('.conversation-answer p').textContent = example.answer;
    document.querySelector('#example-outcome strong').textContent = example.outcome;
    document.querySelector('#example-outcome div>span').textContent = example.detail;
    conversation.querySelectorAll(':scope > *').forEach((element,index) => {
      element.getAnimations().forEach(animation => animation.cancel());
      animate(element, [{opacity:.65,transform:`translateY(${index ? 7 : 4}px)`},{opacity:1,transform:'none'}], {duration:220+index*60,easing:'cubic-bezier(.2,.8,.2,1)'});
    });
    pointAtExample(choices.children[index]);
  }

  function selectAudience(audience, focus = false) {
    currentAudience = audience;
    audienceTabs.forEach(tab => {
      const selected = tab.dataset.audience === audience;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    conversation.setAttribute('aria-labelledby', audience === 'owner' ? 'tab-owner' : 'tab-guest');
    choices.replaceChildren();
    examples[audience].forEach((example, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = example.label;
      button.setAttribute('aria-pressed', String(index === 0));
      button.addEventListener('click', () => showExample(index));
      choices.append(button);
    });
    showExample(0);
  }
  audienceTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectAudience(tab.dataset.audience));
    tab.addEventListener('keydown', event => {
      if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : (index + 1) % 2;
      selectAudience(audienceTabs[next].dataset.audience, true);
    });
  });
  selectAudience('owner');

  document.querySelectorAll('.questions details').forEach(detail => detail.addEventListener('toggle', () => {
    if (detail.open) animate(detail.querySelector('p'), [{opacity:.6,transform:'translateY(-3px)'},{opacity:1,transform:'none'}], {duration:180,easing:'cubic-bezier(.2,.8,.2,1)'});
  }));

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const phone = form.elements.namedItem('phone');
  const requiredText = ['name','restaurant'].map(name => form.elements.namedItem(name));
  const invalidateEmail = () => {
    phone.setCustomValidity('');
    requiredText.forEach(input => input.setCustomValidity(''));
    status.replaceChildren();
    delete status.dataset.state;
  };
  form.addEventListener('input', invalidateEmail);
  form.addEventListener('change', invalidateEmail);
  form.addEventListener('submit', event => {
    event.preventDefault();
    phone.setCustomValidity('');
    const data = Object.fromEntries(['name','restaurant','email','phone','message'].map(key => [key,String(form.elements.namedItem(key).value).trim()]));
    for (const input of requiredText) {
      input.setCustomValidity('');
      if (data[input.name].length < 2) {
        input.setCustomValidity(input.name === 'name' ? 'Inserisci il tuo nome, con almeno due caratteri.' : 'Inserisci il nome del ristorante, con almeno due caratteri.');
        input.reportValidity();
        return;
      }
    }
    if (!data.email && !data.phone) {
      phone.setCustomValidity('Lascia almeno un numero di telefono o un indirizzo email.');
      phone.reportValidity();
      return;
    }
    if (data.phone && (!/^[+\d\s().-]+$/.test(data.phone) || data.phone.replace(/\D/g,'').length < 7 || data.phone.replace(/\D/g,'').length > 25)) {
      phone.setCustomValidity('Controlla il numero di telefono.');
      phone.reportValidity();
      return;
    }
    if (!form.reportValidity()) return;
    const subject = `Parliamo di Maiora — ${data.restaurant}`;
    const body = `Ciao Maiora,\nvorrei conoscere il servizio per il mio ristorante.\n\nNome: ${data.name}\nRistorante: ${data.restaurant}\nTelefono: ${data.phone || 'Non indicato'}\nEmail: ${data.email || 'Non indicata'}\n\n${data.message}`;
    const link = document.createElement('a');
    link.href = `mailto:info@conmaiora.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    link.textContent = 'Apri l’email per inviare la richiesta ↗';
    status.replaceChildren(document.createTextNode('La tua email è pronta. '),link);
    status.dataset.state = 'prepared';
  });
})();
