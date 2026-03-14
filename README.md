# 🤖 AI Automation Studio — Portfolio

A portfolio website showcasing **AI chatbot demos** and **workflow automation templates** built for businesses across multiple industries. Each demo is a fully functional, embeddable chatbot tailored to a specific use case.

## 🌐 Live Site

Open `index.html` (or `portfolio-site/index.html`) in a browser, or deploy via GitHub Pages to view the full portfolio.

---

## 📁 Repository Structure

```
ai-portfolio/
├── index.html              ← Portfolio website (production copy)
├── deploy.bat              ← Windows deployment script for GitHub Pages
├── portfolio-site/
│   └── index.html          ← Portfolio website source
├── demos/
│   ├── ecommerce-bot/      ← NovaTech – AI Customer Support
│   ├── restaurant-bot/     ← La Maison Dorée – AI Restaurant Assistant
│   ├── healthcare-bot/     ← MedCare Clinic – AI Appointment Assistant
│   ├── realestate-bot/     ← LuxeHomes Realty – AI Property Assistant
│   ├── saas-bot/           ← CloudSync – AI Onboarding Assistant
│   └── education-bot/      ← SkillForge Academy – AI Course Assistant
└── templates/
    ├── chatbot-template/   ← Reusable chatbot template for client delivery
    └── automation-template/← n8n automation workflow templates
```

---

## 🎯 Demo Projects

Each demo in `demos/` is a standalone HTML page with an embedded AI chatbot widget. Open `index.html` inside any demo folder directly in a browser — no server required.

| Demo | Industry | Description |
|------|----------|-------------|
| `ecommerce-bot` | E-commerce | Handles orders, returns, product questions, and recommendations |
| `restaurant-bot` | Food & Beverage | Reservations, menu questions, and table availability |
| `healthcare-bot` | Healthcare | Appointment booking and clinic information |
| `realestate-bot` | Real Estate | Property search assistance and listing enquiries |
| `saas-bot` | SaaS / Tech | User onboarding, feature walkthroughs, and support |
| `education-bot` | Education | Course guidance and learning assistant |

---

## 📦 Templates

### `templates/chatbot-template/`

A ready-to-deliver chatbot kit for client projects.

| File | Purpose |
|------|---------|
| `config.js` | **Edit this** — client business info, brand colors, FAQs |
| `chatbot-engine.js` | Core engine — do not edit |
| `embed.html` | Embed instructions to give to the client |

**Quick start:**
1. Copy the `chatbot-template/` folder.
2. Open `config.js` and fill in `business`, `appearance`, and `knowledgeBase`.
3. Test by opening any HTML page that includes the embed snippet.
4. Deliver `config.js`, `chatbot-engine.js`, and `embed.html` to the client.

**Embed snippet** (add before `</body>`):
```html
<script src="config.js"></script>
<script src="chatbot-engine.js"></script>
```

⏱️ Estimated delivery time: **10–15 minutes**

---

### `templates/automation-template/`

Two pre-built n8n workflow templates:

| File | What it does |
|------|-------------|
| `email-auto-responder.json` | Classifies incoming emails and sends AI-generated replies |
| `lead-capture-crm.json` | Captures leads, scores them, logs to Google Sheets, and notifies via Telegram |

**To deliver:**
1. Import the JSON file into the client's n8n instance.
2. Update branding/contact details inside the relevant nodes.
3. Connect SMTP, Google Sheets, and (optionally) Telegram credentials.
4. Activate the workflow.

⏱️ Estimated delivery time: **15–30 minutes**

---

## 🚀 Deploying to GitHub Pages

Run `deploy.bat` on Windows to push the latest portfolio to the `main` branch for GitHub Pages hosting, or manually:

```bash
# Copy the portfolio source to the root
cp portfolio-site/index.html index.html

# Commit and push
git add index.html
git commit -m "Deploy portfolio"
git push
```

Then enable **GitHub Pages** in your repository settings (Settings → Pages → Source: `main` branch, `/ (root)`).

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML, CSS, and JavaScript — no framework or build step required
- **Fonts:** [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- **Automation:** [n8n](https://n8n.io/) workflow engine
- **Hosting:** GitHub Pages
