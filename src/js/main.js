/* ============================================
   MAIN.JS — Portfolio João Victor Conde
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursor();
  initNav();
  initTypewriter();
  initCanvas();
  initProjects();   // must run BEFORE initScrollReveal so dynamic elements exist in DOM
  initFilters();
  initCertificationsCarousel();
  initScrollReveal(); // observes everything including dynamically rendered cards
  initContact();
  initBackToTop();
});

/* ══════════════════════════════════════════
   PRELOADER
══════════════════════════════════════════ */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 1600);
  });
}

/* ══════════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════════ */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth follower
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect on interactive elements
  const hoverEls = document.querySelectorAll('a, button, .skill-item, .project-card, .contact-link');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
      follower.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
      follower.classList.remove('hovering');
    });
  });
}

/* ══════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════ */
function initNav() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks  = document.querySelectorAll('.nav-link');

  // Glassmorphism on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  }, { passive: true });

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active section highlighting
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-section') === current);
    });
  }

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ══════════════════════════════════════════
   TYPEWRITER EFFECT
══════════════════════════════════════════ */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const roles = [
    'Full Stack Developer',
    'Gestão de Projetos',
    'Cibersegurança',
    'React & TypeScript',
    'Node.js & Java',
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const TYPING_SPEED   = 80;
  const DELETING_SPEED = 40;
  const PAUSE_AFTER    = 1800;

  function type() {
    const current = roles[roleIndex];

    if (!isDeleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, PAUSE_AFTER);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(type, isDeleting ? DELETING_SPEED : TYPING_SPEED);
  }

  // Start after preloader
  setTimeout(type, 2000);
}

/* ══════════════════════════════════════════
   HERO CANVAS — Animated Dot Grid
══════════════════════════════════════════ */
function initCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height, dots;
  const DOT_SPACING = 36;
  const DOT_RADIUS  = 1.2;
  const DOT_COLOR   = 'rgba(59, 130, 246, 0.25)';
  const GLOW_RADIUS = 120;

  let mouse = { x: -9999, y: -9999 };

  function resize() {
    width  = canvas.width  = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    buildDots();
  }

  function buildDots() {
    dots = [];
    for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
      for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
        dots.push({ x, y, baseX: x, baseY: y });
      }
    }
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    dots.forEach(dot => {
      const dx   = mouse.x - dot.x;
      const dy   = mouse.y - dot.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / GLOW_RADIUS);

      const alpha  = 0.2 + influence * 0.7;
      const radius = DOT_RADIUS + influence * 2;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  draw();
}

/* ══════════════════════════════════════════
   SCROLL REVEAL (Intersection Observer)
══════════════════════════════════════════ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════
   PROJECTS — Render from data
══════════════════════════════════════════ */
function initProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  if (!PROJECTS || PROJECTS.length === 0) {
    grid.innerHTML = `
      <div class="projects__empty reveal-scale">
        <span class="projects__empty-icon">🚧</span>
        <p class="projects__empty-text">Projetos em breve!</p>
        <p class="projects__empty-sub">// em desenvolvimento</p>
      </div>`;
    return;
  }

  grid.innerHTML = PROJECTS.map(p => createProjectCard(p)).join('');
}

function createProjectCard(p) {
  const stackBadges = p.stack.map(t => `<span class="badge">${t}</span>`).join('');
  const links = [
    p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="project-link">Demo ↗</a>` : '',
    p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener" class="project-link">GitHub ↗</a>` : '',
  ].filter(Boolean).join('');

  return `
    <article class="project-card reveal-scale" data-category="${p.category.join(' ')}">
      <div class="project-card__header">
        <span class="project-card__icon">${p.icon}</span>
      </div>
      <div class="project-card__body">
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.desc}</p>
        <div class="project-card__stack">${stackBadges}</div>
      </div>
      ${links ? `<div class="project-card__footer">${links}</div>` : ''}
    </article>`;
}

/* ══════════════════════════════════════════
   FILTER TABS
══════════════════════════════════════════ */
function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const grid    = document.getElementById('projects-grid');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const cards  = grid ? grid.querySelectorAll('.project-card') : [];

      cards.forEach(card => {
        const cats = card.dataset.category || '';
        const show = filter === 'all' || cats.includes(filter);
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

/* ══════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════ */
function initContact() {
  const form     = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = form.querySelector('#form-name').value.trim();
    const email   = form.querySelector('#form-email').value.trim();
    const message = form.querySelector('#form-message').value.trim();

    if (!name || !email || !message) {
      setFeedback(feedback, '⚠ Preencha todos os campos.', 'warn');
      return;
    }

    const btn = form.querySelector('.form-submit');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: window.__ENV.WEB3FORMS_KEY,
        name,
        email,
        message,
        from_name: 'Portfolio — Contato',
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.success) {
          form.reset();
          setFeedback(feedback, '✓ Mensagem enviada! Retorno em breve.', 'success');
        } else {
          setFeedback(feedback, '✗ Erro ao enviar. Tente novamente.', 'error');
        }
      })
      .catch(() => {
        setFeedback(feedback, '✗ Erro de conexão. Tente novamente.', 'error');
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = 'Enviar Mensagem';
      });
  });
}

function setFeedback(el, msg, type) {
  if (!el) return;
  el.textContent = msg;
  const colors = { success: 'var(--accent)', error: '#ef4444', warn: '#f59e0b' };
  el.style.color = colors[type] || 'var(--muted)';
  setTimeout(() => { el.textContent = ''; }, 5000);
}

/* ══════════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ══════════════════════════════════════
   CERTIFICATIONS — Carousel (ativa com mais de 12 itens)
══════════════════════════════════════ */
function initCertificationsCarousel() {
  const grid = document.querySelector('.certifications__grid');
  if (!grid) return;

  const cards = grid.querySelectorAll('.cert-card');
  if (cards.length <= 12) return;

  const carousel = grid.closest('.certifications__carousel');
  const prev = carousel && carousel.querySelector('.certifications__nav--prev');
  const next = carousel && carousel.querySelector('.certifications__nav--next');
  if (!carousel || !prev || !next) return;

  carousel.classList.add('certifications__carousel--active');

  const step = () => {
    const gap = parseFloat(getComputedStyle(grid).columnGap) || 0;
    return cards[0].offsetWidth + gap;
  };

  prev.addEventListener('click', () => grid.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => grid.scrollBy({ left: step(), behavior: 'smooth' }));
}
