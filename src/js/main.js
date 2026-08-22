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
const TECH_ICONS = {
  'React':      'src/assets/icons/tech/React.svg',
  'JavaScript': 'src/assets/icons/tech/JavaScript.svg',
  'TypeScript': 'src/assets/icons/tech/TypeScript.svg',
  'Node.js':    'src/assets/icons/tech/Node.js.svg',
  'Python':     'src/assets/icons/tech/Python.svg',
  'C++':        'src/assets/icons/tech/cplusplus.svg',
  'PostgreSQL': 'src/assets/icons/tech/PostgresSQL.svg',
  'HTML':       'src/assets/icons/tech/HTML5.svg',
  'CSS':        'src/assets/icons/tech/CSS3.svg',
};
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

  // Clique no card → redireciona para repo/demo em nova aba (exceto links do footer)
  grid.addEventListener('click', e => {
    const card = e.target.closest('.project-card');
    if (!card) return;
    if (e.target.closest('.project-link')) return;
    const href = card.dataset.href;
    if (!href) return;
    window.open(href, '_blank', 'noopener,noreferrer');
  });

  // Acessibilidade: Enter/Espaço acionam o redirecionamento via teclado
  grid.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.project-card');
    if (!card || !card.dataset.href) return;
    if (e.target.closest('.project-link')) return;
    e.preventDefault();
    window.open(card.dataset.href, '_blank', 'noopener,noreferrer');
  });
}

function createProjectCard(p) {
  const stackBadges = p.stack.map(t => {
    const icon = TECH_ICONS[t];
    return icon
      ? `<span class="badge badge--icon"><img src="${icon}" alt="${t}" title="${t}" width="16" height="16"><span class="badge__label">${t}</span></span>`
      : `<span class="badge">${t}</span>`;
  }).join('');
  const target = p.repo || p.demo; // prioridade: repo > demo
  const links = [
    p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="project-link">Demo ↗</a>` : '',
    p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener" class="project-link project-link--icon" aria-label="Ver no GitHub"><svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 0 48.9043 0C21.8203 0 0 22.1074 0 49.1914C0 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z" fill="currentColor"/></svg></a>` : '',
  ].filter(Boolean).join('');

  const clickableAttrs = target
    ? ` data-href="${target}" role="link" tabindex="0" aria-label="Abrir ${p.title} no GitHub"`
    : '';

  return `
    <article class="project-card reveal-scale" data-category="${p.category.join(' ')}"${clickableAttrs}>
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
