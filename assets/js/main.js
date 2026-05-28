/* ============================================
   SANDEEPANA YAPA — Portfolio JS
   ============================================ */

// ── Sakura Petal Canvas ──
const canvas = document.getElementById('sakura-canvas');
const ctx = canvas.getContext('2d');

let petals = [];
const PETAL_COUNT = 55;

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

// SVG-style petal path
function drawPetal(ctx, x, y, size, rotation, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = opacity;

  // Draw a simple 5-petal flower-like shape for each petal
  const colors = ['#f7cdd8', '#e8a0b4', '#f2b5c8', '#fad4e0'];
  ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

  ctx.beginPath();
  ctx.ellipse(0, -size * 0.5, size * 0.32, size * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(size * 0.45, -size * 0.15, size * 0.32, size * 0.55, Math.PI * 0.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(size * 0.28, size * 0.42, size * 0.32, size * 0.55, Math.PI * 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(-size * 0.28, size * 0.42, size * 0.32, size * 0.55, -Math.PI * 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(-size * 0.45, -size * 0.15, size * 0.32, size * 0.55, -Math.PI * 0.6, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function createPetal(initial = false) {
  return {
    x: Math.random() * canvas.width,
    y: initial ? Math.random() * canvas.height : -30,
    size: Math.random() * 8 + 5,
    speedX: (Math.random() - 0.5) * 1.2,
    speedY: Math.random() * 0.8 + 0.3,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.04,
    opacity: Math.random() * 0.55 + 0.2,
    sway: Math.random() * 2,
    swayOffset: Math.random() * Math.PI * 2,
    t: 0,
  };
}

function initPetals() {
  petals = Array.from({ length: PETAL_COUNT }, () => createPetal(true));
}

let animFrame;
function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(p => {
    p.t += 0.016;
    p.x += p.speedX + Math.sin(p.t + p.swayOffset) * p.sway * 0.3;
    p.y += p.speedY;
    p.rotation += p.rotationSpeed;

    if (p.y > canvas.height + 40 || p.x < -60 || p.x > canvas.width + 60) {
      Object.assign(p, createPetal());
    }
    drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.opacity);
  });
  animFrame = requestAnimationFrame(animatePetals);
}

// ── Custom Cursor ──
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
let cursorX = 0, cursorY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  cursorX = e.clientX; cursorY = e.clientY;
  cursor.style.left = cursorX + 'px';
  cursor.style.top  = cursorY + 'px';
});

function animateCursor() {
  ringX += (cursorX - ringX) * 0.15;
  ringY += (cursorY - ringY) * 0.15;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hide cursor on mobile
if (window.matchMedia('(hover: none)').matches) {
  cursor.style.display = 'none';
  cursorRing.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// ── Navigation ──
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

const hamburger = document.querySelector('.nav-hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── Dark / Light Toggle ──
const themeToggle = document.querySelector('.theme-toggle');
let isLight = false;
themeToggle?.addEventListener('click', () => {
  isLight = !isLight;
  document.body.classList.toggle('light', isLight);
  themeToggle.textContent = isLight ? '🌙 Dark' : '☀ Light';
});

// ── Data Loaders ──
async function loadJSON(path) {
  const res = await fetch(path);
  return res.json();
}

// ── Toast ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ── Copy to Clipboard ──
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => showToast('Copied: ' + text));
}

// ── Intersection Observer (scroll reveal) ──
function createObserver(selector, delay = 0) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80 + delay);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(selector).forEach(el => obs.observe(el));
}

// ── Render: Profile / Hero ──
async function renderHero() {
  const p = await loadJSON('data/profile.json');
  document.getElementById('hero-name-first').textContent = p.name.split(' ')[0];
  document.getElementById('hero-name-last').textContent  = p.name.split(' ').slice(1).join(' ');
  document.getElementById('hero-title-text').textContent = p.title;
  document.getElementById('hero-tagline').textContent    = p.tagline;
  document.getElementById('hero-summary').textContent    = p.summary;
  document.title = p.name + ' — Portfolio';
  document.querySelector('.nav-logo').innerHTML = p.name.split(' ')[0] + ' <span>' + p.name.split(' ').slice(1).join(' ') + '</span>';
}

// ── Render: About (reuse profile) ──
async function renderAbout() {
  const p = await loadJSON('data/profile.json');
  document.getElementById('about-summary').textContent = p.summary;
}

// ── Render: Experience ──
async function renderExperience() {
  const data = await loadJSON('data/experience.json');
  const container = document.getElementById('experience-timeline');
  container.innerHTML = data.map((job, i) => `
    <div class="timeline-item" style="transition-delay: ${i * 0.15}s">
      <div class="timeline-dot"></div>
      <div class="exp-card">
        <div class="exp-header">
          <div class="exp-company">${job.icon} ${job.company}</div>
          <span class="exp-duration">${job.duration}</span>
        </div>
        <div class="exp-role">${job.role}</div>
        <ul class="exp-list">
          ${job.responsibilities.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
  createObserver('.timeline-item');
}

// ── Render: Education ──
async function renderEducation() {
  const data = await loadJSON('data/education.json');
  const container = document.getElementById('education-grid');
  container.innerHTML = data.map((edu, i) => `
    <div class="edu-card" style="transition-delay: ${i * 0.1}s">
      <span class="edu-icon">${edu.icon}</span>
      <div class="edu-degree">${edu.degree}</div>
      ${edu.field ? `<div class="edu-field">${edu.field}</div>` : ''}
      <div class="edu-meta">
        ${edu.institution ? `${edu.institution}` : ''}
        ${edu.year ? ` · ${edu.year}` : ''}
      </div>
      ${edu.subjects.length ? `
        <div class="edu-subjects">
          ${edu.subjects.map(s => `
            <div class="subject-chip">
              ${s.name}
              <span class="grade-badge grade-${s.grade}">${s.grade}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `).join('');
  createObserver('.edu-card');
}

// ── Render: Skills ──
async function renderSkills() {
  const data = await loadJSON('data/skills.json');
  const container = document.getElementById('skills-grid');
  container.innerHTML = data.map((s, i) => `
    <div class="skill-card" style="transition-delay: ${i * 0.08}s">
      <span class="skill-icon">${s.icon}</span>
      <div class="skill-name">${s.name}</div>
      <div class="skill-desc">${s.description}</div>
    </div>
  `).join('');
  createObserver('.skill-card');
}

// ── Render: Languages (from profile) ──
async function renderLanguages() {
  const p = await loadJSON('data/profile.json');
  const container = document.getElementById('lang-list');
  container.innerHTML = p.languages.map(l => `
    <div class="lang-item">
      <div class="lang-header">
        <span class="lang-name">${l.name}</span>
        <span class="lang-level">${l.label}</span>
      </div>
      <div class="lang-bar">
        <div class="lang-fill" style="--target-width: ${l.level}%"></div>
      </div>
    </div>
  `).join('');

  // Animate bars when visible
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.lang-fill').forEach(f => f.classList.add('animate'));
      }
    });
  }, { threshold: 0.4 });
  obs.observe(container);
}

// ── Render: Contact ──
async function renderContact() {
  const p = await loadJSON('data/profile.json');
  const { phone, email, address } = p.contact;
  const container = document.getElementById('contact-cards');
  container.innerHTML = `
    <div class="contact-card" onclick="copyText('${phone}')">
      <div class="contact-icon">📞</div>
      <div>
        <div class="contact-label">Phone</div>
        <div class="contact-value">${phone}</div>
      </div>
    </div>
    <a class="contact-card" href="mailto:${email}">
      <div class="contact-icon">✉️</div>
      <div>
        <div class="contact-label">Email</div>
        <div class="contact-value">${email}</div>
      </div>
    </a>
    <div class="contact-card" onclick="copyText('${address}')">
      <div class="contact-icon">📍</div>
      <div>
        <div class="contact-label">Address</div>
        <div class="contact-value">${address}</div>
      </div>
    </div>
  `;
}

// ── Render: References ──
async function renderReferences() {
  // References removed — now showing social links
}

async function renderSocial() {
  const data = await loadJSON('data/social.json');
  const container = document.getElementById('social-links');
  if (!container) return;
  container.innerHTML = data.map(s => `
    <a class="social-link" href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.name}">
      <div class="social-badge">${s.icon}</div>
      <div>
        <div class="social-name">${s.name}</div>
        <div class="social-label">${s.label}</div>
      </div>
    </a>
  `).join('');
}

// ── Init ──
async function init() {
  // Canvas setup
  resize();
  window.addEventListener('resize', () => { resize(); petals = []; initPetals(); });
  initPetals();
  animatePetals();

  // Render all sections
  await Promise.all([
    renderHero(),
    renderAbout(),
    renderExperience(),
    renderEducation(),
    renderSkills(),
    renderLanguages(),
    renderContact(),
    renderSocial(),
  ]);
}

document.addEventListener('DOMContentLoaded', init);
