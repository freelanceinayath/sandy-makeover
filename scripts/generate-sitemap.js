import fs from 'fs';
import path from 'path';

const today = new Date().toISOString().split('T')[0];

const routes = [
  { path: '/', priority: '1.0' }
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>https://sandy-makeover.vercel.app${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.resolve('public', 'sitemap.xml'), sitemapContent);
console.log('Sitemap.xml generated successfully in public/ folder!');
