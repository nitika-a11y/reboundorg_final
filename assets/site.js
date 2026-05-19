// Rebound.org — shared site JS

// Mobile menu
(function () {
  const open = document.getElementById('menuOpen');
  const close = document.getElementById('menuClose');
  const menu = document.getElementById('mobileMenu');
  if (!open || !menu) return;
  open.addEventListener('click', () => { menu.classList.add('open'); document.body.style.overflow = 'hidden'; });
  if (close) close.addEventListener('click', () => { menu.classList.remove('open'); document.body.style.overflow = ''; });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); document.body.style.overflow = ''; }));
})();

// FAQ accordion
(function () {
  document.querySelectorAll('.faq-list').forEach(list => {
    list.addEventListener('click', (e) => {
      const q = e.target.closest('.q');
      if (!q) return;
      const qa = q.parentElement;
      qa.classList.toggle('open');
      q.setAttribute('aria-expanded', qa.classList.contains('open'));
    });
  });
})();

// TOC scrollspy
(function () {
  const toc = document.querySelector('.article-toc');
  if (!toc) return;
  const links = [...toc.querySelectorAll('a[href^="#"]')];
  const ids = links.map(a => a.getAttribute('href').slice(1));
  const targets = ids.map(id => document.getElementById(id)).filter(Boolean);
  const onScroll = () => {
    let active = targets[0];
    for (const t of targets) {
      if (t.getBoundingClientRect().top < 140) active = t;
    }
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + active.id));
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Newsletter subscribed state
document.querySelectorAll('form.form-pill').forEach(f => {
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = f.querySelector('input');
    const btn = f.querySelector('button');
    if (input) input.value = '';
    if (btn) btn.textContent = 'Subscribed ✓';
  });
});
