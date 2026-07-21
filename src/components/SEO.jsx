import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  canonical = '/', 
  type = 'website', 
  image = '/hero_bride_real.png',
  schema 
}) {
  const siteUrl = 'https://sandy-makeover.vercel.app';
  
  // Clean final metadata values
  const pageTitle = title && title !== 'Sandy Makeover' ? `${title} | Sandy Makeover` : 'Sandy Makeover — Luxury Bridal Makeup & Hair Artistry';
  const pageDesc = description || 'Premium luxury bridal makeup, groom styling, and hair artistry. Timeless beauty crafted for your wedding story. Available citywide with home service.';
  const shareImg = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const canonicalUrl = `${siteUrl}${canonical}`;

  return (
    <Helmet>
      {/* HTML Title & Description */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta name="google-site-verification" content="abcdefghijklmnopqrstuvwxyz1234567890" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph (Facebook, WhatsApp, Instagram, LinkedIn) */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={shareImg} />
      <meta property="og:site_name" content="Sandy Makeover" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={shareImg} />
      
      {/* Structured Data (Schema.org JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
