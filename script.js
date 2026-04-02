/* ═══════════════════════════════════════
   AVENUE INSURANCE BROKERS — SHARED JS
   ═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // ── Navbar scroll effect ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ── Mobile menu ──
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll reveal ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  // ── Counter animation ──
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        let current = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current);
        }, 16);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  // ── Back to top ──
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Cookie banner ──
  const cookieBanner = document.querySelector('.cookie-banner');
  if (cookieBanner) {
    if (localStorage.getItem('avenue-cookies-accepted')) {
      cookieBanner.classList.add('hidden');
    }
    const acceptBtn = cookieBanner.querySelector('.cookie-accept');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('avenue-cookies-accepted', 'true');
        cookieBanner.classList.add('hidden');
      });
    }
  }

  // ── Partner logo error fallback ──
  document.querySelectorAll('.partner-item img').forEach(img => {
    img.addEventListener('error', function () {
      const name = this.alt || 'Partner';
      const badge = document.createElement('span');
      badge.className = 'partner-badge';
      badge.textContent = name;
      this.parentNode.replaceChild(badge, this);
    });
  });

  // ── Logo image error fallback ──
  document.querySelectorAll('.navbar-logo img, .footer-logo').forEach(img => {
    img.addEventListener('error', function () {
      const isFooter = this.classList.contains('footer-logo');
      const el = document.createElement('div');
      el.style.cssText = `font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:${isFooter ? '1.25rem' : '1.5rem'};line-height:1.15;color:${isFooter ? '#fff' : '#118ACB'};`;
      el.innerHTML = '<span style="letter-spacing:0.08em;">AVENUE</span><br><span style="font-size:0.55em;font-weight:500;letter-spacing:0.15em;color:' + (isFooter ? 'rgba(255,255,255,0.8)' : '#F15A24') + '">INSURANCE BROKERS</span>';
      this.parentNode.replaceChild(el, this);
    });
  });

  // ── Mobile menu link stagger ──
  document.querySelectorAll('.mobile-menu a').forEach((link, i) => {
    link.style.transitionDelay = `${0.1 + i * 0.08}s`;
  });
});
