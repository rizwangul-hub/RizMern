# RizMern Frontend — Installation & Getting Started

The **RizMern** frontend is a modern, fully responsive course landing website built with React, Vite, Tailwind CSS, and Framer Motion.

## ✅ What's Included

### ⚙️ Technology Stack
- **React 19** with strict mode for safety
- **Vite** for lightning-fast development and builds
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth scroll reveals and animations
- **React Router** for client-side routing
- **lucide-react** for beautiful, lightweight icons
- **Google Fonts** (Poppins + Inter) for professional typography

### 🎨 Design System
- **Dark modern theme** with depth and sophistication
- **Neon gradient accent** (purple → blue → cyan) throughout
- **Glassmorphism cards** with backdrop blur effects
- **Glowing button states** with smooth hover interactions
- **Lightweight animated background** (floating gradient blobs + subtle grid)
- **Fully responsive** mobile-first layout (320px to 4K+)

### 📦 Core Components
- **Button** — Primary (gradient) and outline (bordered) variants with glow
- **SectionTitle** — Reusable section headers with eyebrow and description
- **GlassCard** — Frosted glass card container
- **AnimatedCounter** — Spring-animated number display on scroll reveal
- **ScrollReveal** — Fade-in + slide-up animation wrapper
- **BackgroundEffects** — Non-blocking animated blobs and grid (respects prefers-reduced-motion)
- **Navbar** — Sticky header with gradient logo, responsive menu, and CTA button
- **Footer** — Full footer with social links, quick nav, and contact info
- **WhatsAppButton** — Floating pulsing WhatsApp button (bottom-right)

### 📄 Pages & Routes
- **`/`** — Homepage with hero, roadmap, features, instructor preview, FAQ, and CTA
- **`/course`** — Course overview with curriculum and benefits
- **`/pricing`** — Pricing page with included features
- **`/instructor`** — Instructor bio and teaching philosophy
- **`/demo`** — Free demo class registration page
- **`/admission`** — General admission inquiry page
- **`/*`** — Fallback to admission page (handles unknown routes gracefully)

### 🎯 Editable Site Data
All course information, contact details, and links are centralized in **`src/data/siteData.js`**:
```javascript
export const siteData = {
  brand: 'RizMern',
  courseName: 'MERN Stack + React Native App Development with AI',
  duration: '3 Months',
  instructor: 'Rizwan Ullah',
  instructorTitle: 'MERN Stack & React Native Developer',
  price: 'PKR 25,000',
  whatsappLink: 'https://wa.me/0000000000000',  // ← Update with your number
  email: 'hello@rizmern.com',                    // ← Update with your email
  timings: 'Weekend live classes',
}
```
**One place to edit.** Changes everywhere.

### 📱 Mobile-First Responsiveness
- **Desktop** (1200px+): Full navigation, side-by-side layouts, large hero
- **Tablet** (760px–1000px): Optimized grids (2 col → 1 col), touch-friendly spacing
- **Mobile** (390px–760px): Hamburger menu, single-column layouts, scaled typography
- **Small phones** (<390px): Compact padding, stacked elements, readable text

### 🚀 Performance
- **Optimized CSS** (~7.4 kB gzipped)
- **Lightweight JS** (~133 kB gzipped, includes full React + animations)
- **Smooth animations** use Framer Motion (respects `prefers-reduced-motion`)
- **No unnecessary re-renders** (React.StrictMode in dev, proper memoization)
- **Accessible** (semantic HTML, ARIA labels, keyboard navigation support)

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (check: `node --version`)
- **npm 9+** (check: `npm --version`)

### Installation

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies** (already done, but safe to re-run):
   ```bash
   npm install
   ```

### Development

**Start the local dev server:**
```bash
npm run dev
```

✅ This will:
- Start Vite on `http://localhost:5173` (default) or `http://127.0.0.1:5173`
- Enable **hot module reload** (HMR) — changes appear instantly
- Serve with source maps for debugging
- Open-ready to test on mobile/tablet via your machine's network IP

🌐 **Open in browser:** http://localhost:5173

### Build for Production

**Create optimized bundle:**
```bash
npm run build
```

✅ Outputs to `dist/` folder:
- Minified HTML, CSS, and JavaScript
- Asset hashing for cache busting
- All routes pre-configured for SPA serving

**Preview production build locally:**
```bash
npm run preview
```

### Linting

**Check code quality:**
```bash
npm run lint
```

✅ Uses **oxlint** (ultra-fast Rust linter):
- No warnings or errors in clean setup
- Run anytime during development

---

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI pieces
│   │   ├── Button.jsx
│   │   ├── SectionTitle.jsx
│   │   ├── GlassCard.jsx
│   │   ├── AnimatedCounter.jsx
│   │   ├── ScrollReveal.jsx
│   │   ├── BackgroundEffects.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── WhatsAppButton.jsx
│   ├── layouts/
│   │   └── SiteLayout.jsx   # Main layout with Nav + Footer
│   ├── pages/
│   │   ├── Home.jsx         # Full landing page
│   │   └── InfoPage.jsx     # Template for Course, Pricing, etc.
│   ├── sections/
│   │   └── RoadmapSection.jsx # Learning roadmap cards
│   ├── hooks/
│   │   └── useEscapeKey.js  # Close mobile menu on Esc
│   ├── utils/
│   │   └── externalLinkProps.js # Reusable external link attrs
│   ├── data/
│   │   └── siteData.js      # ⭐ Centralized site info
│   ├── App.jsx              # Router setup
│   ├── main.jsx             # React entry
│   └── index.css            # Global styles + Tailwind
├── public/                  # Static assets
├── index.html               # HTML entry (pre-configured meta tags)
├── tailwind.config.js       # Design tokens (colors, fonts)
├── postcss.config.js        # Tailwind processing
├── vite.config.js           # Build config
├── package.json             # Dependencies + scripts
└── package-lock.json        # Locked versions
```

---

## 🎨 Customization Guide

### Change Colors
Edit **`tailwind.config.js`** `theme.extend.colors`:
```javascript
accent: {
  purple: '#a855f7',  // Change to your shade
  blue: '#6366f1',
  cyan: '#22d3ee',
}
```

### Change Fonts
Edit **`tailwind.config.js`** `theme.extend.fontFamily`:
```javascript
heading: ['Poppins', 'sans-serif'],
body: ['Inter', 'sans-serif'],
```
(Already loaded in `index.html` from Google Fonts)

### Change Course Info
Edit **`src/data/siteData.js`**:
- Course name, instructor, price, timings, WhatsApp/email links
- Navigation links
- Social media links

### Edit Homepage Sections
Open **`src/pages/Home.jsx`**:
- Hero copy, feature cards, instructor preview, FAQ items
- All data is at the top; text updates are immediate

### Add a New Route
1. Create a new page: `src/pages/YourPage.jsx`
2. Import in `src/App.jsx`
3. Add route:
   ```javascript
   <Route path="your-route" element={<YourPage />} />
   ```
4. Add link in `src/data/siteData.js` `navigationLinks`

---

## 🔗 Important Links

- **Update WhatsApp number:** `src/data/siteData.js` → `whatsappLink`
- **Update email:** `src/data/siteData.js` → `email`
- **Update social links:** `src/data/siteData.js` → `socialLinks`

---

## 🧪 Testing

### Accessibility
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Semantic HTML (headings, nav, main, footer, etc.)
- ✅ ARIA labels (buttons, mobile menu state)
- ✅ Color contrast (text on dark background)

### Mobile
- Test on actual devices or browser DevTools mobile mode
- Responsive breakpoints: **390px**, **760px**, **1000px**, **1200px**

### Performance
Run Lighthouse audit in DevTools → Pages loads in **~1–2 seconds** on modern networks.

---

## 🛠️ Troubleshooting

### Dev server won't start
```bash
npm run dev
```
If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Hot reload not working
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check console for errors
- Restart dev server

### Build fails
```bash
npm run lint          # Check for code issues
npm run build         # See exact error
```

### Mobile menu not closing
- Press **Escape** key (useEscapeKey hook should handle)
- Or click a link (menu auto-closes on navigation)

---

## ✨ Next Steps

1. **Run the dev server:** `npm run dev`
2. **Open browser:** http://localhost:5173
3. **Edit site data:** `src/data/siteData.js`
4. **Customize colors/fonts:** `tailwind.config.js`
5. **Add more content:** Edit homepage sections or create new pages
6. **Deploy:** Run `npm run build`, then host the `dist/` folder

---

## 📞 Support

For questions about setup, components, or customization:
- Check the **code comments** in components (they explain purpose + usage)
- Review **`tailwind.config.js`** and **`index.css`** for styling reference
- Inspect component props in JSX files for quick API reference

---

**Built with care for modern learners.** 🚀

