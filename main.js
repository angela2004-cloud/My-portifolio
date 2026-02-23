/**
 * UMUBYEYI ANGEL — PORTFOLIO JAVASCRIPT
 * Advanced Web Design & Development – Ass#1
 * INES Ruhengeri · 2025-2026
 *
 * Features:
 *  1. Dark / Light mode toggle
 *  2. Mobile nav toggle
 *  3. GPA Calculator with validation & DOM manipulation
 *  4. Contact form validation
 *  5. Dynamic footer year
 */

'use strict';

/* =============================================
   1. DARK / LIGHT MODE
   ============================================= */
const themeToggle = document.getElementById('themeToggle');
const savedTheme  = localStorage.getItem('portfolio-theme') || 'light';

document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeToggle.textContent = theme === 'dark' ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}


/* =============================================
   2. MOBILE NAVIGATION TOGGLE
   ============================================= */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});


/* =============================================
   3. GPA CALCULATOR (Option A)
   ============================================= */

/** Rwandan/INES GPA scale: marks out of 100 → grade points */
function markToGradePoint(mark) {
  if (mark >= 90) return 4.0;
  if (mark >= 80) return 3.7;
  if (mark >= 75) return 3.3;
  if (mark >= 70) return 3.0;
  if (mark >= 65) return 2.7;
  if (mark >= 60) return 2.3;
  if (mark >= 55) return 2.0;
  if (mark >= 50) return 1.7;
  if (mark >= 45) return 1.3;
  if (mark >= 40) return 1.0;
  return 0.0;
}

function gpaToClassification(gpa) {
  if (gpa >= 3.7) return { label: '🏆 First Class Honours',     color: '#C4410C' };
  if (gpa >= 3.3) return { label: '🥇 Upper Second Class',       color: '#2D7D46' };
  if (gpa >= 2.7) return { label: '🥈 Lower Second Class',       color: '#1A6B9A' };
  if (gpa >= 2.0) return { label: '🥉 Third Class',              color: '#7B5E00' };
  if (gpa >= 1.0) return { label: '⚠ Pass',                     color: '#A05A00' };
  return              { label: '❌ Fail',                        color: '#C00020' };
}

let courseCount = 1;

// Add Course button
document.getElementById('addCourse').addEventListener('click', () => {
  if (courseCount >= 12) {
    showCalcError('Maximum 12 courses allowed.');
    return;
  }
  const idx = courseCount;
  const row = document.createElement('div');
  row.className = 'course-row';
  row.dataset.index = idx;
  row.innerHTML = `
    <input type="text"   id="course${idx}"  name="course${idx}"  placeholder="Course name"     class="course-name"    aria-label="Course ${idx + 1} name" />
    <input type="number" id="mark${idx}"    name="mark${idx}"    placeholder="Mark (0-100)"    class="course-mark"    min="0" max="100" aria-label="Course ${idx + 1} mark" />
    <input type="number" id="credits${idx}" name="credits${idx}" placeholder="Credits"         class="course-credits" min="1" max="10"  aria-label="Course ${idx + 1} credits" />
  `;
  document.getElementById('courseInputs').appendChild(row);
  courseCount++;
  hideCalcError();
});

// Calculate GPA button
document.getElementById('calcGPA').addEventListener('click', () => {
  hideCalcError();

  const rows = document.querySelectorAll('.course-row');
  const courses = [];
  let hasError = false;

  rows.forEach((row, i) => {
    const nameEl    = row.querySelector('.course-name');
    const markEl    = row.querySelector('.course-mark');
    const creditEl  = row.querySelector('.course-credits');

    const name    = nameEl    ? nameEl.value.trim()            : `Course ${i + 1}`;
    const mark    = markEl    ? parseFloat(markEl.value)       : NaN;
    const credits = creditEl  ? parseFloat(creditEl.value)     : NaN;

    // Validation
    if (isNaN(mark) || mark < 0 || mark > 100) {
      showCalcError(`Row ${i + 1}: Mark must be a number between 0 and 100.`);
      hasError = true;
      return;
    }
    if (isNaN(credits) || credits < 1 || credits > 10 || !Number.isInteger(credits)) {
      showCalcError(`Row ${i + 1}: Credits must be a whole number between 1 and 10.`);
      hasError = true;
      return;
    }

    courses.push({ name: name || `Course ${i + 1}`, mark, credits });
  });

  if (hasError) return;
  if (courses.length === 0) {
    showCalcError('Please enter at least one course.');
    return;
  }

  // Weighted GPA calculation
  let totalWeightedPoints = 0;
  let totalCredits        = 0;

  courses.forEach(c => {
    const gp = markToGradePoint(c.mark);
    totalWeightedPoints += gp * c.credits;
    totalCredits        += c.credits;
  });

  const gpa           = totalWeightedPoints / totalCredits;
  const classification = gpaToClassification(gpa);

  // DOM manipulation — update results
  document.getElementById('gpaValue').textContent = gpa.toFixed(2);

  const classEl = document.getElementById('gpaClass');
  classEl.textContent  = classification.label;
  classEl.style.color  = classification.color;

  const breakdownEl = document.getElementById('gpaBreakdown');
  breakdownEl.innerHTML = '';
  const table = document.createElement('table');
  table.style.cssText = 'width:100%;border-collapse:collapse;font-size:.8rem;margin-top:.75rem;';

  // Table header
  const thead = table.createTHead();
  const hr = thead.insertRow();
  ['Course', 'Mark', 'Credits', 'Grade Points'].forEach(h => {
    const th = document.createElement('th');
    th.textContent = h;
    th.style.cssText = 'text-align:left;padding:.4rem .6rem;border-bottom:2px solid var(--clr-border);color:var(--clr-muted);';
    hr.appendChild(th);
  });

  // Table body
  const tbody = table.createTBody();
  courses.forEach(c => {
    const tr = tbody.insertRow();
    tr.style.borderBottom = '1px solid var(--clr-border)';
    const gp = markToGradePoint(c.mark);
    [c.name, `${c.mark}%`, c.credits, gp.toFixed(1)].forEach(val => {
      const td = tr.insertCell();
      td.textContent = val;
      td.style.cssText = 'padding:.4rem .6rem;color:var(--clr-text);';
    });
  });

  // Total row
  const tfoot = table.createTFoot();
  const fr = tfoot.insertRow();
  fr.style.fontWeight = '600';
  [`Total Credits: ${totalCredits}`, '', totalCredits, gpa.toFixed(2)].forEach((val, i) => {
    const td = fr.insertCell();
    td.textContent = val;
    td.style.cssText = 'padding:.4rem .6rem;border-top:2px solid var(--clr-border);color:var(--clr-accent);';
    if (i === 0) td.colSpan = 2;
  });

  breakdownEl.appendChild(table);

  // Show result panel
  const resultEl = document.getElementById('calcResult');
  resultEl.hidden = false;
  resultEl.style.animation = 'none';
  resultEl.offsetHeight; // reflow
  resultEl.style.animation = '';
});

// Reset calculator
document.getElementById('resetCalc').addEventListener('click', () => {
  const container = document.getElementById('courseInputs');
  // Keep only first row, clear its values
  const allRows = container.querySelectorAll('.course-row');
  allRows.forEach((row, i) => {
    if (i === 0) {
      row.querySelectorAll('input').forEach(inp => { inp.value = ''; });
    } else {
      row.remove();
    }
  });
  courseCount = 1;
  document.getElementById('calcResult').hidden = true;
  hideCalcError();
});

function showCalcError(msg) {
  const el = document.getElementById('calcError');
  el.textContent = '⚠ ' + msg;
  el.hidden = false;
}

function hideCalcError() {
  const el = document.getElementById('calcError');
  el.hidden = true;
  el.textContent = '';
}


/* =============================================
   4. CONTACT FORM VALIDATION
   ============================================= */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('contactName');
  const email   = document.getElementById('contactEmail');
  const subject = document.getElementById('contactSubject');
  const message = document.getElementById('contactMessage');

  let isValid = true;

  // Clear previous errors
  ['nameError', 'emailError', 'subjectError', 'messageError'].forEach(id => {
    document.getElementById(id).textContent = '';
  });

  // Name validation
  if (name.value.trim().length < 2) {
    document.getElementById('nameError').textContent = 'Please enter your full name (at least 2 characters).';
    name.focus();
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address.';
    if (isValid) email.focus();
    isValid = false;
  }

  // Subject validation
  if (subject.value.trim().length < 3) {
    document.getElementById('subjectError').textContent = 'Subject must be at least 3 characters.';
    if (isValid) subject.focus();
    isValid = false;
  }

  // Message validation
  if (message.value.trim().length < 10) {
    document.getElementById('messageError').textContent = 'Message must be at least 10 characters.';
    if (isValid) message.focus();
    isValid = false;
  }

  if (isValid) {
    // Simulate form submission (no backend)
    const successEl = document.getElementById('formSuccess');
    successEl.hidden = false;
    contactForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => { successEl.hidden = true; }, 5000);
  }
});


/* =============================================
   5. DYNAMIC FOOTER YEAR
   ============================================= */
document.getElementById('footerYear').textContent = new Date().getFullYear();


/* =============================================
   6. SMOOTH SCROLL OFFSET FOR FIXED NAVBAR
      (Handled via CSS scroll-padding-top)
   ============================================= */

/* =============================================
   7. SCROLL-BASED NAVBAR SHADOW
   ============================================= */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,.12)';
  } else {
    navbar.style.boxShadow = 'none';
  }
}, { passive: true });
