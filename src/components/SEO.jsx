import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  canonical = '/', 
  type = 'website', 
  image = '/owner.jpg',
  schema 
}) {
  const siteUrl = 'https://sandymakeover.vercel.app';
  
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
      <meta name="google-site-verification" content="CiuKqMNOerOqszTdGT0RqFdHvNrL2BLVV3wEPY40pLQ" />
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
      
      {/* Search Engine Directives & Meta Keywords for Rank #1 & AI Overviews */}
      <meta name="keywords" content="Sandy Makeover, Sandy Makeover Chennai, Sandy Makeover bridal makeup, Sandy Makeover hair artist, Sandy Makeover price, Sandy Makeover contact number, bridal makeup artist Chennai, groom styling Chennai, reception makeup, engagement makeup" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content="Sandy Makeover" />
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Chennai" />
      <meta name="geo.position" content="13.0827;80.2707" />
      <meta name="ICBM" content="13.0827, 80.2707" />

      {/* Structured Data (Schema.org JSON-LD Graph) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
