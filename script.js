const a11y = document.getElementById('a11y');
const panel = document.getElementById('panel');
const btn = document.getElementById('a11yBtn');
const menu = document.getElementById('menu');
const positionSelect = document.getElementById('positionSelect');
const demoPos = document.getElementById('demoPos');
const closeBtn = document.getElementById('closeMenu');

let menuOpen = false;

function openMenu(keyboard = false) {
  panel.classList.add('show');
  btn.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-hidden', 'false');
  menuOpen = true;
  menu.querySelectorAll('[role="menuitem"]').forEach(mi => mi.tabIndex = 0);
  if (keyboard) {
    menu.querySelector('[role="menuitem"]').focus();
  }
}

function closeMenu() {
  panel.classList.remove('show');
  btn.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
  menuOpen = false;
  menu.querySelectorAll('[role="menuitem"]').forEach(mi => mi.tabIndex = -1);
}

btn.addEventListener('click', e => {
  e.preventDefault();
  menuOpen ? closeMenu() : openMenu(true);
});

panel.addEventListener('mouseenter', () => openMenu(false));
panel.addEventListener('mouseleave', () => {
  if (!menu.contains(document.activeElement)) closeMenu();
});

menu.addEventListener('click', e => {
  const item = e.target.closest('[role="menuitem"]');
  if (!item) return;
  if (item.dataset.action === 'high-contrast') {
    document.body.classList.toggle('high-contrast');
  }
  if (item.dataset.action === 'big-text') {
    document.body.classList.toggle('big-text');
  }
});

closeBtn.addEventListener('click', closeMenu);

document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key.toLowerCase() === 'm') {
    e.preventDefault();
    menuOpen ? closeMenu() : openMenu(true);
  }
  if (e.key === 'Escape' && menuOpen) closeMenu();
});

function setPosition(cls) {
  a11y.classList.remove('pos-bottom-right','pos-bottom-left','pos-top-right','pos-top-left');
  a11y.classList.add(cls);
}

positionSelect.addEventListener('change', e => setPosition(e.target.value));
demoPos.addEventListener('change', e => {
  setPosition(e.target.value);
  positionSelect.value = e.target.value;
});

menu.querySelectorAll('[role="menuitem"]').forEach(mi => mi.tabIndex = -1);
