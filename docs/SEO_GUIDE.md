# SEO Optimization Guide for Stealth Investor

## 1. Overview

SEO (Search Engine Optimization) is crucial for making your Stealth Investor website discoverable on search engines like Google. This guide covers the essential SEO practices already implemented and additional recommendations.

## 2. Already Implemented

### 2.1 Meta Tags & Metadata
✅ **Title Tags** - Unique, descriptive titles on each page:
- Home: "Stealth Investor - Smart Financial Tools for Investors"
- Calculator: "The Stealth Buy-vs-Rent Index Calculator"
- About: "About - Stealth Investor"
- Pricing: "Pricing - Stealth Investor"
- Blog: "Blog - Stealth Investor"
- Contact: "Contact - Stealth Investor"

✅ **Meta Descriptions** - 150-160 character descriptions on each page

✅ **Open Graph Tags** - Social media sharing optimization in layout.tsx:
- og:title, og:description, og:image, og:url, og:type

✅ **Twitter Card** - Enhanced Twitter sharing with summary_large_image

✅ **Robots Meta** - Search engine indexing enabled (index: true, follow: true)

### 2.2 URL Structure
✅ **Semantic URLs**:
- `/` - Home page
- `/calculator` - Main calculator tool
- `/tools` - Tools hub
- `/about` - About page
- `/pricing` - Pricing page
- `/blog` - Blog listing
- `/contact` - Contact page

✅ **URL Readability** - All URLs are lowercase, hyphenated, and descriptive

## 3. Additional SEO Recommendations

### 3.1 Structured Data (JSON-LD Schema)

Add schema.org structured data to your pages:

```tsx
// Add to app/layout.tsx or individual pages
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Stealth Investor",
  "description": "Investment analysis tools for smart financial decisions",
  "url": "https://stealthinvestor.com",
  "logo": "https://stealthinvestor.com/logo.png",
  "sameAs": [
    "https://twitter.com/stealthinvestor",
    "https://linkedin.com/company/stealthinvestor"
  ]
};

// Or use it in your pages:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
/>
```

### 3.2 Sitemap & Robots.txt

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://stealthinvestor.com</loc>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://stealthinvestor.com/calculator</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://stealthinvestor.com/tools</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://stealthinvestor.com/about</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://stealthinvestor.com/pricing</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://stealthinvestor.com/blog</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://stealthinvestor.com/contact</loc>
    <priority>0.6</priority>
  </url>
</urlset>
```

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /private

Sitemap: https://stealthinvestor.com/sitemap.xml
```

### 3.3 Heading Hierarchy

Ensure proper heading structure (H1 → H2 → H3):
```tsx
<h1>Main Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
```

✅ Already implemented: Each page has a single H1 with appropriate H2/H3 structure.

### 3.4 Alt Text for Images

When adding images, always include descriptive alt text:
```tsx
<img
  src="/calculator-screenshot.png"
  alt="The Stealth Buy-vs-Rent Index calculator interface showing home price and monthly rent inputs"
/>
```

### 3.5 Internal Linking

Create a well-structured internal linking strategy:
- Link from home page to main tools (calculator)
- Link from pricing page to calculator CTA
- Link from blog posts to relevant calculator sections
- Link from calculator to related blog articles

### 3.6 Mobile Optimization

✅ Already responsive with Tailwind CSS
- Test at: https://search.google.com/test/mobile-friendly

### 3.7 Page Speed Optimization

Recommendations:
```bash
# Use Next.js Image optimization
npm install next-image-cloudinary

# Set cache headers for static content
# In next.config.ts:
const nextConfig = {
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  }
};
```

### 3.8 Core Web Vitals

Monitor and optimize:
- **LCP** (Largest Contentful Paint) - < 2.5s target
- **FID** (First Input Delay) - < 100ms target  
- **CLS** (Cumulative Layout Shift) - < 0.1 target

Tools:
- Google PageSpeed Insights: https://pagespeed.web.dev
- Web Vitals Library: `npm install web-vitals`

### 3.9 Accessibility (A11y)

Already implemented:
✅ Semantic HTML structure
✅ ARIA labels for interactive elements (lucide-react icons)
✅ Color contrast (dark theme)
✅ Keyboard navigation support

Enhancements:
```tsx
// Add to interactive elements
<button
  aria-label="Close modal"
  aria-pressed={isOpen}
  onClick={toggleModal}
>
  Close
</button>
```

### 3.10 Content Strategy

Key focus areas for blog content:
1. **"Buy vs Rent" Keywords**:
   - "Should I rent or buy a house"
   - "Buy vs rent calculator 2024"
   - "Financial comparison renting vs buying"
   - "Break-even point buying vs renting"

2. **Long-form Content**:
   - Write 1500+ word articles
   - Include internal links to calculator
   - Target long-tail keywords

3. **Regular Updates**:
   - Publish 2-4 blog posts per month
   - Update existing articles with fresh data
   - Link to new content from home page

4. **User Intent Matching**:
   - Informational: "How does rent affect credit score"
   - Navigational: "Best rent vs buy calculator"
   - Transactional: "Sign up for detailed reports"

### 3.11 Backlink Strategy

Ways to earn backlinks:
1. **Financial Blogs** - Guest post on real estate/finance blogs
2. **Resource Pages** - Get listed on financial tool directories
3. **Press Releases** - Announce new features (e.g., Google OAuth integration)
4. **Local SEO** - Register on local business directories
5. **Partnerships** - Link exchanges with complementary services

### 3.12 Local SEO (if applicable)

If targeting specific regions:
```tsx
// Add to layout or relevant pages
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Stealth Investor",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Your St",
    "addressLocality": "Your City",
    "addressRegion": "ST",
    "postalCode": "12345"
  },
  "telephone": "+1-555-123-4567"
};
```

## 4. Analytics & Monitoring

### 4.1 Google Search Console
1. Go to: https://search.google.com/search-console
2. Add your domain
3. Submit sitemap.xml
4. Monitor: Search queries, impressions, CTR, rankings

### 4.2 Google Analytics 4
```bash
npm install @react-google-analytics/core
```

Add to `app/layout.tsx`:
```tsx
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 4.3 Keyword Tracking
Tools to monitor rankings:
- Semrush: https://semrush.com
- Ahrefs: https://ahrefs.com
- Moz: https://moz.com
- Free: Google Search Console

## 5. SEO Checklist

- [ ] Domain authority building (get backlinks)
- [ ] Monthly blog content (2-4 posts)
- [ ] Search Console monitoring
- [ ] Analytics 4 setup
- [ ] Page Speed Insights > 80
- [ ] Mobile-friendly testing
- [ ] Structured data implementation
- [ ] XML sitemap submission
- [ ] robots.txt optimization
- [ ] Internal linking strategy
- [ ] Alt text on all images
- [ ] Schema markup for key pages
- [ ] Core Web Vitals optimization
- [ ] Social media links in footer
- [ ] Email newsletter signup

## 6. Timeline

**Month 1:**
- Implement structured data (schema.org)
- Set up Google Search Console & Analytics
- Optimize page speed
- Create 4 blog posts

**Month 2-3:**
- Build backlinks (5-10 per month)
- Create pillar content (2000+ words)
- Optimize for featured snippets
- Monitor rankings

**Month 4+:**
- Scale content production
- Optimize high-potential keywords
- Build topical authority
- Ongoing optimization

## 7. Resources

- **Google Search Central:** https://developers.google.com/search
- **Next.js SEO Guide:** https://nextjs.org/learn/seo/introduction-to-seo
- **Schema.org Documentation:** https://schema.org
- **Web Vitals:** https://web.dev/vitals/
- **Marketing Manifesto:** https://www.semrush.com/seo-guide

---

**Note:** SEO is a long-term investment. Expect 3-6 months before seeing significant ranking improvements. Focus on creating valuable content that serves your users first, optimization second.
