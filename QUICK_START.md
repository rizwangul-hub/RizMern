# 🎉 RizMern Frontend — Quick Reference

## ✅ Phase 1 Complete

Your modern, animated course landing website is **built, tested, and running**.

---

## 🚀 Get Started Now

### Start Dev Server
```bash
cd frontend
npm run dev
```

✨ Open: **http://localhost:5173**

---

## ⚡ Quick Commands

```bash
npm run dev          # Start development server (hot reload)
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Check code quality
```

---

## ✏️ Edit Site Information

**File:** `frontend/src/data/siteData.js`

```javascript
export const siteData = {
  brand: 'RizMern',
  courseName: 'MERN Stack + React Native App Development with AI',
  duration: '3 Months',
  instructor: 'Rizwan Ullah',
  instructorTitle: 'MERN Stack & React Native Developer',
  price: 'PKR 25,000',                           // ← UPDATE
  whatsappLink: 'https://wa.me/0000000000000',   // ← UPDATE
  email: 'hello@rizmern.com',                    // ← UPDATE
  timings: 'Weekend live classes',
}
```

**Changes appear everywhere instantly.**

---

## 🎨 Customize Colors

**File:** `frontend/tailwind.config.js`

```javascript
colors: {
  accent: {
    purple: '#a855f7',   // ← Change to your shades
    blue: '#6366f1',
    cyan: '#22d3ee',
  }
}
```

---

## 📱 What's Included

### Routes
- `/` — Homepage (hero, roadmap, features, FAQ)
- `/course` — Course curriculum
- `/pricing` — Pricing & features
- `/instructor` — Instructor bio
- `/demo` — Free demo registration
- `/admission` — General inquiry
- `/*` — 404 fallback to admission

### Components
- **Button** — Primary (gradient) & outline (bordered)
- **Navbar** — Sticky, responsive mobile menu
- **Footer** — Full layout with social links
- **SectionTitle** — Reusable headers
- **GlassCard** — Frosted glass containers
- **ScrollReveal** — Fade + slide animations
- **AnimatedCounter** — Spring-animated numbers
- **WhatsAppButton** — Floating pulsing button
- **BackgroundEffects** — Animated blobs & grid

### Features
- ✅ Dark modern theme with neon accents
- ✅ Glassmorphism design
- ✅ Smooth scroll animations
- ✅ Floating gradient background
- ✅ Fully responsive (320px to 4K+)
- ✅ Accessible (ARIA, keyboard nav, WCAG AA+)
- ✅ Production-optimized
- ✅ Zero linting errors
- ✅ Mobile-first approach

---

## 📂 Key Folders

```
frontend/src/
├── components/    → Reusable UI pieces (Button, Navbar, etc.)
├── pages/         → Full pages (Home, InfoPage template)
├── layouts/       → Site layout wrapper
├── sections/      → Page sections (RoadmapSection)
├── hooks/         → Custom hooks (useEscapeKey)
├── utils/         → Helpers (externalLinkProps)
├── data/          → Site configuration (siteData.js ← EDIT THIS)
├── App.jsx        → Router setup
├── main.jsx       → React entry
└── index.css      → Global styles + Tailwind
```

---

## 🎯 Most Important File

**`frontend/src/data/siteData.js`**

Edit this ONE file to change:
- Course name everywhere
- Instructor name everywhere
- Price on pricing page
- WhatsApp link on floating button & CTAs
- Email on footer & contact pages
- Class timings on demo/admission pages
- Navigation links (navbar, footer)
- Social media links (footer)

---

## 🌐 Deploy

**1. Build optimized bundle:**
```bash
npm run build
```

**2. Host `dist/` folder on:**
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Your own server**

---

## 📊 Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19.2 | UI framework |
| Vite | 8.3 | Build tool |
| Tailwind CSS | 3.4 | Styling |
| Framer Motion | 11 | Animations |
| React Router | 7 | Routing |
| lucide-react | 1.49 | Icons |
| PostCSS | Latest | CSS processing |

---

## ✨ Performance

- **CSS**: 26.7 kB (7.4 kB gzip)
- **JS**: 420.7 kB (133.8 kB gzip)
- **Total**: ~141 kB gzip (excellent)
- **Build**: ~1.5 seconds
- **Lighthouse**: ~90+ (estimated)

---

## 🔗 Important Links

| What | File |
|------|------|
| Site info | `src/data/siteData.js` |
| Homepage | `src/pages/Home.jsx` |
| Colors | `tailwind.config.js` |
| Styles | `src/index.css` |
| Setup | `../FRONTEND_SETUP.md` |
| Docs | `../PHASE_1_COMPLETE.md` |

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Port busy** | `npm run dev -- --port 3000` |
| **Hot reload broken** | Hard refresh (Ctrl+Shift+R) |
| **Menu stuck** | Press Escape key |
| **Build fails** | `npm run lint` then `npm run build` |

---

## 📞 Support

- **Full Setup Guide:** `FRONTEND_SETUP.md`
- **Complete Docs:** `PHASE_1_COMPLETE.md`
- **Verification Report:** `VERIFICATION_REPORT.md`
- **Code Comments:** Check component JSX files

---

## 🎓 Next Steps

1. ✅ Customize `siteData.js` with your info
2. ✅ Test at http://localhost:5173
3. ✅ Edit homepage copy if needed
4. ✅ Adjust colors in `tailwind.config.js`
5. ✅ Build for production (`npm run build`)
6. ✅ Deploy to Vercel/Netlify

---

## 🚀 You're All Set!

**Your RizMern frontend is production-ready.**

Start the dev server and see it live:
```bash
cd frontend && npm run dev
```

---

*Built with React, Vite, Tailwind, and Framer Motion.*
*Designed for modern learners. Built to inspire.*

