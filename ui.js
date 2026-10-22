(() => {
  'use strict';

  const menu = document.getElementById('mobile-menu');
  const menuToggle = document.querySelector('.menu-toggle');
  const closeMenu = () => { if (menu.open) menu.close(); };
  menuToggle.addEventListener('click', () => {
    menu.showModal();
    menuToggle.setAttribute('aria-expanded', 'true');
  });
  document.querySelector('.menu-close').addEventListener('click', closeMenu);
  menu.addEventListener('click', event => { if (event.target === menu) closeMenu(); });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  menu.addEventListener('close', () => menuToggle.setAttribute('aria-expanded', 'false'));
  window.matchMedia('(min-width: 681px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });

  // La stessa etichetta resta accessibile; la seconda serve solo al movimento.
  document.querySelectorAll('.button,.desktop-nav a,.text-link').forEach(control => {
    const textNodes = [...control.childNodes].filter(node => node.nodeType === Node.TEXT_NODE);
    const label = textNodes.map(node => node.textContent).join('').trim();
    if (!label) return;
    const clip = document.createElement('span');
    clip.className = 'fx-label';
    const main = document.createElement('span');
    main.className = 'fx-label-main';
    main.textContent = label;
    const alternate = document.createElement('span');
    alternate.className = 'fx-label-alt';
    alternate.setAttribute('aria-hidden', 'true');
    alternate.textContent = label;
    clip.append(main, alternate);
    textNodes.forEach(node => node.remove());
    control.prepend(clip);
    control.classList.add('fx-control');
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
