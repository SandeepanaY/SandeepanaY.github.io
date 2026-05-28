# Sandeepana Yapa — Portfolio Website

A modern, sakura-themed professional portfolio for a Banking & Finance professional.

## ✨ Features
- 🌸 Animated sakura petal canvas
- 🌙 Dark / Light mode toggle
- 📱 Fully responsive (mobile, tablet, desktop)
- 📦 JSON-driven content — update without touching HTML
- ⚡ Pure vanilla JS, no build step required
- ♿ Accessible (ARIA labels, semantic HTML)
- ⬇️ Download CV button

---

## 🗂 Project Structure

```
sandeepana-portfolio/
├── index.html
├── Sandeepana_Yapa_CV.pdf      ← Place your CV PDF here
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── data/
    ├── profile.json            ← Name, contact, languages
    ├── experience.json         ← Work history
    ├── education.json          ← Academic qualifications
    ├── skills.json             ← Core skills
    └── references.json         ← Professional references
```

---

## 📝 How to Update Content

All major content lives in the `/data/` folder.

### Update contact info
Edit `data/profile.json` → `contact` object.

### Add a new job
Add a new object to `data/experience.json`.

### Add a new skill
Add a new object to `data/skills.json`.

### Update education
Edit `data/education.json`.

No code changes needed for content updates.

---

## 🚀 GitHub Pages Deployment

### Step 1 — Create a GitHub Repository
1. Go to [github.com](https://github.com) and create a new repository.
2. Name it: `sandeepana-yapa-portfolio` (or any name you prefer).
3. Set it to **Public**.

### Step 2 — Upload Files
**Option A — GitHub Web UI:**
1. Click "uploading an existing file"
2. Drag and drop the entire project folder contents
3. Commit the changes

**Option B — Git CLI:**
```bash
cd sandeepana-portfolio
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, select `Deploy from a branch`
3. Select branch: `main`, folder: `/ (root)`
4. Click **Save**
5. Your site will be live at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

### Step 4 — Add Your CV PDF
Place `Sandeepana_Yapa_CV.pdf` in the root of the project (same folder as `index.html`) before deploying. The Download CV buttons will then work automatically.

---

## 🎨 Customisation

### Colors
Edit the CSS variables at the top of `assets/css/style.css`:
```css
:root {
  --sakura-mid:  #c9607a;   /* Change for different accent color */
  --bg-deep:     #0d0d12;   /* Dark background */
}
```

### Fonts
The portfolio uses Google Fonts. To change fonts, edit the `@import` line at the top of `style.css`.

---

## 🛠 Local Development

Since JSON files are fetched with `fetch()`, you need a local server (browsers block local file fetches by default).

**Using VS Code:** Install the **Live Server** extension, right-click `index.html` → Open with Live Server.

**Using Python:**
```bash
cd sandeepana-portfolio
python3 -m http.server 8000
# Visit http://localhost:8000
```

**Using Node.js:**
```bash
npx serve .
```

---

## 📄 License
Personal use only. All content © Sandeepana Yapa.
