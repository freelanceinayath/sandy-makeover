import fs from 'fs';
import path from 'path';

const today = new Date().toISOString().split('T')[0];

const routes = [
  { path: '/', priority: '1.0' },
  { path: '/services/shopify', priority: '0.8' },
  { path: '/services/wordpress', priority: '0.8' },
  { path: '/services/erp', priority: '0.8' },
  { path: '/services/ai', priority: '0.8' },
  { path: '/services/portfolio', priority: '0.8' },
  { path: '/services/business', priority: '0.8' },
  { path: '/projects/mor-panthal', priority: '0.9' },
  { path: '/projects/portfolio', priority: '0.9' },
  { path: '/projects/ai-image-generation', priority: '0.9' },
  { path: '/projects/smartcrop-ai', priority: '0.9' },
  { path: '/projects', priority: '0.9' }
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>https://inayathbasha.vercel.app${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.resolve('public', 'sitemap.xml'), sitemapContent);
console.log('Sitemap.xml generated successfully in public/ folder!');
