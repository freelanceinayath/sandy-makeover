# Inayath Basha | Shopify Developer & Creative Designer Portfolio

This repository contains the high-performance, SEO-optimized personal portfolio of Inayath Basha. Built using React, Vite, Tailwind CSS, and Framer Motion, it features dynamic section animations, a custom interactive before-after slider, and PWA capabilities.

## 🚀 Features & Optimizations

### 1. Search Engine Optimization (SEO)
- **Primary Tags**: Tailored meta descriptions, titles, and keywords matching high-volume search queries for "Shopify Developer", "UI/UX Designer", and "Business Development".
- **Structured Data**: Contains JSON-LD schema (Person and LocalBusiness/Contact Point schema) built directly into the HTML to help Google and AI search bots index the creator.
- **Dynamic Sitemap**: Automatically generates a valid `sitemap.xml` with fresh `lastmod` dates at every production build.
- **Crawling Rules**: Structured `robots.txt` pointing to sitemap, indexable and crawlable for all search agents.

### 2. Performance & Delivery
- **Lazy Loading**: Images configured with `loading="lazy"` and `decoding="async"` (except hero elements which are eager-loaded for faster LCP).
- **Security Headers**: Custom `vercel.json` applying strict security protocols:
  - `Content-Security-Policy`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- **Asset Caching**: Configured `Cache-Control` header settings on Vercel to invalidate sitemaps and manifests immediately while caching static assets efficiently.

### 3. PWA Capabilities
- Integrates a standard PWA manifest (`manifest.json`) in standalone mode for mobile responsiveness and installability.

---

## 🛠️ Local Development

To run the project locally, install dependencies and start the Vite dev server:

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

---

## 📦 Build & Deployment

### 1. Build Compilation
Running the build compiles assets to the `dist` directory and triggers the sitemap generation script:

```bash
npm run build
```

This runs `node scripts/generate-sitemap.js` prior to compiling the assets, updating `public/sitemap.xml` automatically.

### 2. Vercel Deployment
Deploy directly to Vercel production using Vercel CLI:

```bash
# Production Deployment
npx vercel --prod --yes
```

Ensure the following environment variables are set up in your Vercel Dashboard if you wish to hook up analytics:
- `VITE_GA_ID`: Google Analytics 4 Measurement ID (e.g., `G-XXXXXXX`)
- `VITE_CLARITY_ID`: Microsoft Clarity ID
