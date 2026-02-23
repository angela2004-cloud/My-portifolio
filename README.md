# Umubyeyi Angel — Personal Portfolio

> Advanced Web Design and Development — Assignment #1  
> INES Ruhengeri · Department of Computer Science · Year II FEB Day Program · 2025-2026

---

## 🌐 Live Demo

> _[Add GitHub Pages link here once deployed]_

---

## 📁 Project Structure

```
portfolio/
├── index.html          ← Single-page portfolio
├── css/
│   └── styles.css      ← All styles (variables, layout, responsive)
├── js/
│   └── main.js         ← All JavaScript logic
├── assets/
│   ├── images/         ← Profile & project screenshots
│   └── cv/             ← Downloadable CV PDF
└── README.md
```

---

## ✅ Features Implemented

| Feature | Status |
|---|---|
| Semantic HTML5 structure | ✅ |
| CSS Box model | ✅ |
| Flexbox layout | ✅ |
| CSS Grid layout | ✅ |
| Fluid design (clamp, relative units) | ✅ |
| Media queries (mobile/tablet/desktop) | ✅ |
| Hero section | ✅ |
| About Me section | ✅ |
| Technical skills (progress bars) | ✅ |
| Projects section (3 projects) | ✅ |
| GPA Calculator (Option A) with validation | ✅ |
| Downloadable CV section | ✅ |
| Contact section + form validation | ✅ |
| Dark / Light mode toggle | ✅ |
| Mobile menu toggle (hamburger) | ✅ |
| Dynamic footer year | ✅ |
| DOM manipulation | ✅ |
| GitHub repository | ✅ |

---

## 🧮 JavaScript Calculator — Option A: Student GPA Calculator

### How it works
1. Enter each course name, mark (0–100), and credit hours
2. Click **Calculate GPA**
3. Outputs: weighted GPA on a 4.0 scale + academic classification

### GPA Scale (INES standard)
| Mark Range | Grade Points |
|---|---|
| 90–100 | 4.0 |
| 80–89 | 3.7 |
| 75–79 | 3.3 |
| 70–74 | 3.0 |
| 65–69 | 2.7 |
| 60–64 | 2.3 |
| 55–59 | 2.0 |
| 50–54 | 1.7 |
| 45–49 | 1.3 |
| 40–44 | 1.0 |
| < 40   | 0.0 |

### Classifications
- 3.7–4.0 → First Class Honours
- 3.3–3.69 → Upper Second Class
- 2.7–3.29 → Lower Second Class
- 2.0–2.69 → Third Class
- 1.0–1.99 → Pass
- < 1.0 → Fail

---

## 🤖 AI Usage Declaration

**What I asked AI (Claude):**
- How to write a weighted GPA formula in JavaScript
- Best practice for accessible HTML form validation (ARIA live regions)
- Explanation of CSS `clamp()` function for fluid typography
- Git commands cheat sheet: `git add`, `git commit`, `git push`, `git branch`
- Debugging: why `transform: translateY` wasn't working on the nav (answer: parent had `overflow: hidden`)

**What I implemented myself:**
- All HTML structure and content (written from scratch)
- Full CSS design system (variables, layout, dark mode, animations)
- GPA calculator logic and classification scale
- Contact form validation logic
- Mobile hamburger menu toggle
- Dark/light mode persistence with `localStorage`
- All project descriptions and personal content
- Folder structure and file organization

**What I modified from AI suggestions:**
- AI suggested a simpler GPA table — I extended it with a full breakdown table in the DOM
- AI suggested using Bootstrap for the navbar — I wrote it in pure CSS/JS instead
- AI's form validation used `alert()` — I replaced it with inline accessible error messages using ARIA

---

## 🛠 Technologies Used

- **HTML5** — Semantic markup (`header`, `main`, `section`, `article`, `nav`, `footer`)
- **CSS3** — Custom properties, Flexbox, Grid, `clamp()`, Media Queries, Animations
- **Vanilla JavaScript** — DOM manipulation, event listeners, form validation, localStorage
- **Google Fonts** — Playfair Display + DM Sans
- **Git & GitHub** — Version control

---

## 📦 Git Workflow

```bash
# Initialize repo
git init
git remote add origin https://github.com/umubyeyiangel/portfolio.git

# Initial commit
git add .
git commit -m "feat: initial portfolio structure with HTML and CSS"

# Feature commits
git commit -m "feat: add GPA calculator with validation"
git commit -m "feat: implement dark mode toggle with localStorage"
git commit -m "feat: add responsive mobile navigation"
git commit -m "fix: correct media query breakpoints for tablet"
git commit -m "docs: add README with AI usage declaration"
```

---

## 👤 Author

**Umubyeyi Angel**  
Year II Computer Science · INES Ruhengeri  
📧 ange.umubyeyi@ines.ac.rw  
🔗 [GitHub](https://github.com/umubyeyiangel) · [LinkedIn](https://linkedin.com/in/umubyeyiangel)

---

*Submitted: February 2026 — INES Ruhengeri Advanced Web Design & Development Assignment #1*
