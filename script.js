/* ═══════════════════════════════════════════
   RAGHAV DUA — JAVASCRIPT
   Theme · Scroll reveal · Nav · Hamburger
═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── THEME TOGGLE ─── */
  const html        = document.documentElement;
  const themeBtn    = document.getElementById('theme-btn');
  const savedTheme  = localStorage.getItem('rd-theme') || 'dark';

  html.setAttribute('data-theme', savedTheme);

  themeBtn && themeBtn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('rd-theme', next);
  });


  /* ─── NAV SCROLL BORDER ─── */
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    // Subtle border intensity on scroll
    if (nav) {
      nav.style.borderBottomColor = y > 50
        ? 'var(--border-s)'
        : 'var(--border)';
    }

    lastScroll = y;
  }, { passive: true });


  /* ─── HAMBURGER / MOBILE MENU ─── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }


  /* ─── SMOOTH SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id     = anchor.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 68;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });
  });


  /* ─── SCROLL REVEAL ─── */
  // Elements that should animate in
  const revealSelectors = [
    '.reveal',
    '.glass-card',
    '.section-title',
    '.section-label',
    '.section-sub',
    '.body-text',
    '.about-meta',
    '.social-chips',
    '.hero-facts',
    '.contact-actions',
    '.contact-row',
  ].join(', ');

  const revealEls = document.querySelectorAll(revealSelectors);

  // Intersection Observer for non-hero elements
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -32px 0px' });

  revealEls.forEach(el => {
    // Hero elements handled separately below
    if (el.closest('#hero')) return;
    io.observe(el);
  });

  // Hero — stagger on load
  const heroEls = document.querySelectorAll('#hero .reveal');
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 + i * 90);
  });

  // Stagger cards within grids
  const staggerGroups = [
    { parent: '.projects-list', child: '.proj-card' },
    { parent: '.ach-grid',      child: '.ach-card'  },
    { parent: '.skills-grid',   child: '.skill-card'},
  ];

  staggerGroups.forEach(({ parent, child }) => {
    const container = document.querySelector(parent);
    if (!container) return;
    const cards = container.querySelectorAll(child);

    const groupIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cards.forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), i * 70);
          });
          groupIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });

    groupIO.observe(container);
  });


  /* ─── ACTIVE NAV LINK ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const activeIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${id}`;
          link.style.color = active ? 'var(--text)' : '';
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => activeIO.observe(s));


  /* ─── RESUME DOWNLOAD (placeholder) ─── */
  // Replace '#' in href with actual resume PDF path when you have it
  const resumeBtns = document.querySelectorAll('#resume-dl, #resume-dl2');
  resumeBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      // If no real file linked, show a friendly message
      if (btn.getAttribute('href') === '#') {
        e.preventDefault();
        btn.textContent = 'Resume coming soon';
        btn.style.opacity = '0.5';
        setTimeout(() => {
          btn.textContent = btn.id === 'resume-dl' ? 'Download CV ↓' : 'Download Resume ↓';
          btn.style.opacity = '';
        }, 2000);
      }
    });
  });

})();