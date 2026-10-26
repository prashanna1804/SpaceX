document.addEventListener('DOMContentLoaded', () => {

  const nav = document.getElementById('siteNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  const navLinks = document.querySelectorAll('.nav-links a[data-target]');
  const sections = Array.from(navLinks)
    .map(l => document.getElementById(l.dataset.target))
    .filter(Boolean);

  function updateActiveNav() {
    let current = sections[0];
    sections.forEach(sec => {
      if (window.scrollY + 120 >= sec.offsetTop) current = sec;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.dataset.target === current.id);
    });
  }
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinksList = document.querySelector('.nav-links');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const open = navLinksList.style.display === 'flex';
      navLinksList.style.cssText = open
        ? ''
        : 'display:flex;flex-direction:column;position:fixed;top:64px;left:0;right:0;background:#000;padding:20px 32px;gap:18px;border-bottom:1px solid #2a2a2e;';
    });
  }

  const tabs = document.querySelectorAll('.vehicle-tab');
  const panels = document.querySelectorAll('.vehicle-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`panel-${tab.dataset.vehicle}`).classList.add('active');
    });
  });

  const target = new Date().getTime() + (7 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000);

  const heroCountdown = document.getElementById('heroCountdown');
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins = document.getElementById('cd-mins');
  const cdSecs = document.getElementById('cd-secs');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tickCountdown() {
    const diff = target - new Date().getTime();
    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    if (heroCountdown) heroCountdown.textContent = `${days}d ${pad(hours)}:${pad(mins)}:${pad(secs)}`;
    if (cdDays) cdDays.textContent = pad(days);
    if (cdHours) cdHours.textContent = pad(hours);
    if (cdMins) cdMins.textContent = pad(mins);
    if (cdSecs) cdSecs.textContent = pad(secs);
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });

  function closeLightbox() { lightbox.classList.remove('open'); }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

});
