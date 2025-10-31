# Portfolio Implementation Guide

This guide walks you through implementing the portfolio design from wireframe to production-ready application.

---

## Implementation Options

You have three main paths to implement this portfolio:

### Option 1: AI-Assisted Generation (Fastest)
**Tools:** v0.dev, Lovable.ai, Cursor, or similar AI code generators

**Steps:**
1. Copy the entire contents of `docs/ai-ui-prompt.md`
2. Paste into your AI UI generation tool of choice
3. Review and refine the generated code
4. Replace placeholder content with real data
5. Add real images and links
6. Deploy

**Time Estimate:** 2-4 hours (including refinement)

**Pros:**
- Fastest initial implementation
- Gets you 80% of the way there
- Good starting point for customization

**Cons:**
- May need manual adjustments
- Generated code might not match your exact preferences
- Requires reviewing and understanding generated code

---

### Option 2: Component-by-Component Manual Build (Most Control)
**Tools:** Your preferred code editor + React/Next.js

**Steps:**
1. Set up Next.js 14+ project with TypeScript and Tailwind
2. Configure Tailwind theme (see Design System below)
3. Build components in order:
   - Start with Layout/Container components
   - Build HeroSection
   - Build ProjectGrid + ProjectCard
   - Build WorkExperience + TimelineItem
   - Build OSS Contributions grid
   - Build OSS Projects grid
   - Build Footer
4. Assemble components in main page
5. Test responsiveness at all breakpoints
6. Add accessibility features
7. Replace placeholders with real content
8. Optimize and deploy

**Time Estimate:** 8-12 hours

**Pros:**
- Complete control over implementation
- Deeper understanding of codebase
- Easier to customize and extend
- Better code quality (typically)

**Cons:**
- More time-intensive
- Requires more React/Tailwind knowledge
- Manual implementation of all details

---

### Option 3: Hybrid Approach (Recommended)
**Tools:** AI generation + manual refinement

**Steps:**
1. Use AI to generate initial component structure
2. Manually refine each component for quality
3. Implement custom features AI missed
4. Optimize performance
5. Enhance accessibility
6. Add real content incrementally
7. Deploy and iterate

**Time Estimate:** 4-6 hours

**Pros:**
- Balance of speed and control
- Learn from AI-generated code
- Customize what matters most
- Good code quality

**Cons:**
- Still requires code review
- Need to understand generated code

---

## Detailed Implementation Steps

### Phase 1: Project Setup

#### 1.1 Create Next.js Project

```bash
npx create-next-app@latest portfolio --typescript --tailwind --app
cd portfolio
```

Answer prompts:
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ `src/` directory (optional)
- ✅ App Router
- ❌ Customize default import alias (use default @/*)

#### 1.2 Configure Tailwind Theme

Edit `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#111111',
        border: '#1f1f1f',
        'border-hover': '#2a2a2a',
        'text-primary': '#e0e0e0',
        'text-secondary': '#b0b0b0',
        'text-tertiary': '#9ca3af',
        'text-muted': '#6b7280',
        'accent-purple': '#8b5cf6',
        'accent-purple-hover': '#7c3aed',
        'accent-purple-light': '#a78bfa',
        'component-bg': '#1a1a1a',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}
export default config
```

#### 1.3 Set Global Styles

Edit `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-text-primary;
  }
}
```

#### 1.4 Create Folder Structure

```bash
mkdir -p components/{hero,projects,experience,oss}
mkdir -p public/images/{companies,avatar}
mkdir -p types
```

---

### Phase 2: Component Development

#### 2.1 Create Type Definitions

Create `types/index.ts`:

```typescript
export interface Project {
  id: string;
  title: string;
  tags: string[];
  description: string;
  link?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  dates: string;
  logo?: string;
  link?: string;
}

export interface OSSContribution {
  id: string;
  repository: string;
  prNumber: string;
  title?: string;
  link?: string;
}

export interface OSSProject {
  id: string;
  name: string;
  description: string;
  link?: string;
  github?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  ariaLabel: string;
}
```

#### 2.2 Build Container Component

Create `components/Container.tsx`:

```typescript
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`max-w-container mx-auto px-5 ${className}`}>
      {children}
    </div>
  );
};
```

#### 2.3 Build Section Component

Create `components/Section.tsx`:

```typescript
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id
}) => {
  return (
    <section
      id={id}
      className={`py-15 border-b border-border ${className}`}
    >
      {children}
    </section>
  );
};
```

#### 2.4 Build Hero Section

Create `components/hero/HeroSection.tsx`:

```typescript
import React from 'react';
import { Container } from '../Container';
import { SocialLinks } from './SocialLinks';
import { Navigation } from './Navigation';
import type { SocialLink } from '@/types';

interface HeroSectionProps {
  name: string;
  bio: string[];
  avatar: string;
  socialLinks: SocialLink[];
  ctaText: string;
  ctaLink: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  name,
  bio,
  avatar,
  socialLinks,
  ctaText,
  ctaLink,
}) => {
  return (
    <header className="py-15 border-b border-border">
      <Container>
        {/* Avatar and Social Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-8">
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className="w-20 h-20 rounded-full border-2 border-accent-purple"
          />
          <SocialLinks links={socialLinks} />
        </div>

        {/* Bio */}
        <div className="mb-8">
          {bio.map((paragraph, index) => (
            <p
              key={index}
              className="mb-4 text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
          <a
            href={ctaLink}
            className="inline-block mt-2.5 px-4 py-2 bg-accent-purple text-white rounded-md font-medium hover:bg-accent-purple-hover transition-colors duration-300"
          >
            {ctaText}
          </a>
        </div>

        {/* Navigation */}
        <Navigation />
      </Container>
    </header>
  );
};
```

Continue creating components for:
- `components/hero/SocialLinks.tsx`
- `components/hero/Navigation.tsx`
- `components/projects/ProjectGrid.tsx`
- `components/projects/ProjectCard.tsx`
- `components/experience/WorkExperience.tsx`
- `components/experience/TimelineItem.tsx`
- `components/oss/OSSContributions.tsx`
- `components/oss/OSSProjects.tsx`
- `components/Footer.tsx`

*(See the AI prompt for detailed component specifications)*

---

### Phase 3: Data Management

#### 3.1 Create Data Files

Create `data/portfolio.ts`:

```typescript
import type { Project, WorkExperience, OSSContribution, OSSProject, SocialLink } from '@/types';

export const personalInfo = {
  name: 'Taishi',
  title: 'Fullstack Developer & Solopreneur',
  bio: [
    "I'm <strong>Taishi</strong>, a fullstack developer and solofounder based in Japan and Canada.",
    "Previously shipping infrastructure & tools to <strong>180+ users (SaaS/indie hackers/indie winners)</strong>. Two of them were ranked as the <a href='#' class='underline'>#1 Product of the day on Product Hunt</a>."
  ],
  avatar: '/images/avatar/taishi.jpg',
  email: 'taishi@example.com',
};

export const socialLinks: SocialLink[] = [
  { platform: 'Twitter', url: 'https://twitter.com/taishi', icon: '𝕏', ariaLabel: 'Twitter profile' },
  { platform: 'Lightning', url: '#', icon: '⚡', ariaLabel: 'Lightning Network' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/taishi', icon: '💼', ariaLabel: 'LinkedIn profile' },
  { platform: 'Email', url: 'mailto:taishi@example.com', icon: '📧', ariaLabel: 'Email contact' },
  { platform: 'Shop', url: '#', icon: '🛒', ariaLabel: 'Shop' },
];

export const projects: Project[] = [
  {
    id: 'supavec',
    title: 'Supavec',
    tags: ['#ai', '#analytics', '#opensource'],
    description: 'Open-source RAG platform using pgvector',
    link: 'https://github.com/taishi/supavec',
  },
  // ... more projects
];

export const workExperience: WorkExperience[] = [
  {
    id: 'supabase',
    company: 'Supabase',
    role: 'Frontend Developer (contract)',
    location: 'Remote',
    dates: 'Jul 2025 - Sep 2025',
    logo: '/images/companies/supabase.png',
    link: 'https://github.com/supabase/supabase/pulls?q=author%3Ataishi',
  },
  // ... more experiences
];

// ... export contributions and OSS projects
```

---

### Phase 4: Main Page Assembly

Edit `app/page.tsx`:

```typescript
import { HeroSection } from '@/components/hero/HeroSection';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { WorkExperience } from '@/components/experience/WorkExperience';
import { OSSContributions } from '@/components/oss/OSSContributions';
import { OSSProjects } from '@/components/oss/OSSProjects';
import { Footer } from '@/components/Footer';
import { personalInfo, socialLinks, projects, workExperience, ossContributions, ossProjects } from '@/data/portfolio';

export default function Home() {
  return (
    <main>
      <HeroSection
        name={personalInfo.name}
        bio={personalInfo.bio}
        avatar={personalInfo.avatar}
        socialLinks={socialLinks}
        ctaText="Hire me 🚀"
        ctaLink="#contact"
      />

      <ProjectGrid projects={projects} />

      <WorkExperience experiences={workExperience} />

      <OSSContributions contributions={ossContributions} />

      <OSSProjects projects={ossProjects} />

      <Footer name={personalInfo.name} />
    </main>
  );
}
```

---

### Phase 5: Accessibility Enhancement

#### 5.1 Add Metadata

Edit `app/layout.tsx`:

```typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Taishi - Fullstack Developer & Solopreneur',
  description: 'Portfolio of Taishi, a fullstack developer based in Japan and Canada. Showcasing projects, work experience, and open-source contributions.',
  keywords: ['developer', 'fullstack', 'react', 'nextjs', 'portfolio'],
  authors: [{ name: 'Taishi' }],
  openGraph: {
    title: 'Taishi - Fullstack Developer',
    description: 'Fullstack developer and solopreneur portfolio',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

#### 5.2 Accessibility Checklist

- ✅ Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`)
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ ARIA labels on icon-only buttons
- ✅ Alt text on all images
- ✅ Sufficient color contrast (WCAG AA)
- ✅ Keyboard navigation support
- ✅ Focus indicators on interactive elements
- ✅ Skip-to-content link (optional but recommended)

---

### Phase 6: Performance Optimization

#### 6.1 Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src={avatar}
  alt="Taishi's avatar"
  width={80}
  height={80}
  className="rounded-full border-2 border-accent-purple"
  priority
/>
```

#### 6.2 Lazy Loading

Add `loading="lazy"` to images below the fold:

```typescript
<Image
  src={logo}
  alt={company}
  width={40}
  height={40}
  loading="lazy"
/>
```

#### 6.3 Font Optimization

Already optimized by using system fonts (no external font loading).

---

### Phase 7: Testing

#### 7.1 Responsive Testing

Test at these breakpoints:
- 375px (iPhone SE)
- 640px (tablet)
- 768px (iPad)
- 1024px (laptop)
- 1280px (desktop)
- 1920px (large desktop)

#### 7.2 Browser Testing

Test in:
- Chrome/Edge (Chromium)
- Firefox
- Safari (macOS and iOS)

#### 7.3 Accessibility Testing

Run Lighthouse audit:
```bash
npm run build
npm run start
# Open Chrome DevTools > Lighthouse
# Run audit for Accessibility, Performance, Best Practices, SEO
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

#### 7.4 Manual Testing Checklist

- [ ] All links work
- [ ] All images load
- [ ] Hover states work on all interactive elements
- [ ] Focus states visible for keyboard navigation
- [ ] Mobile menu works (if applicable)
- [ ] No console errors
- [ ] No horizontal scroll on any device
- [ ] Touch targets are minimum 44x44px on mobile
- [ ] Text is readable at all sizes
- [ ] Colors have sufficient contrast

---

### Phase 8: Content Population

#### 8.1 Replace Placeholder Images

- Professional headshot/avatar
- Company logos (request from companies or use official brand assets)
- Project screenshots/thumbnails (optional)

#### 8.2 Update Content

- Real bio text
- Actual social media URLs
- Real project links to GitHub/live demos
- Accurate work experience dates and descriptions
- Actual OSS contribution links
- Real project descriptions

#### 8.3 SEO Optimization

- Update page metadata
- Add Open Graph images
- Add structured data (JSON-LD) for better search results
- Create sitemap
- Add robots.txt

---

### Phase 9: Deployment

#### 9.1 Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow prompts:
- Link to GitHub repository
- Select project settings
- Deploy

#### 9.2 Custom Domain (Optional)

1. Purchase domain (e.g., taishi.dev)
2. Add domain in Vercel project settings
3. Update DNS records
4. Wait for SSL certificate generation

#### 9.3 Environment Variables

If you add analytics or forms later:
```
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

---

### Phase 10: Post-Launch

#### 10.1 Analytics Setup

Add Google Analytics or Plausible:

```typescript
// app/layout.tsx
import Script from 'next/script';

// Add in <head>
{process.env.NEXT_PUBLIC_GA_ID && (
  <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
    <Script id="google-analytics">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
      `}
    </Script>
  </>
)}
```

#### 10.2 Monitoring

- Set up Vercel Analytics
- Monitor Web Vitals
- Track error rates

#### 10.3 Iteration

Based on analytics:
- Add most popular projects to featured section
- Update content regularly
- Add blog if relevant
- Improve sections with high bounce rates

---

## Common Issues & Solutions

### Issue 1: Tailwind Classes Not Working
**Solution:** Ensure `tailwind.config.ts` content paths are correct and restart dev server.

### Issue 2: Images Not Loading
**Solution:** Check images are in `public/` directory and paths are correct (no leading `/public/`).

### Issue 3: Build Errors
**Solution:** Run `npm run build` locally first to catch TypeScript/build errors before deploying.

### Issue 4: Slow Performance
**Solution:**
- Use Next.js Image component
- Lazy load images below fold
- Minimize client-side JavaScript
- Check bundle size with `npm run build`

### Issue 5: Accessibility Score Low
**Solution:**
- Add missing ARIA labels
- Fix color contrast issues
- Ensure keyboard navigation works
- Add alt text to images

---

## Maintenance Checklist

### Weekly
- [ ] Check for broken links
- [ ] Update project status if needed

### Monthly
- [ ] Review analytics
- [ ] Update work experience if changed
- [ ] Add new OSS contributions
- [ ] Check for dependency updates

### Quarterly
- [ ] Redesign/refresh if needed
- [ ] Add new features based on feedback
- [ ] SEO audit
- [ ] Performance audit

---

## Future Enhancements

### Potential Features to Add Later

1. **Blog Section**
   - MDX support
   - Syntax highlighting
   - Reading time estimates

2. **Dark/Light Mode Toggle**
   - Currently dark-only
   - Add theme switcher with localStorage persistence

3. **Contact Form**
   - Formspree or similar service
   - Email validation
   - Success/error states

4. **Animations**
   - Framer Motion for page transitions
   - Scroll-triggered animations
   - Parallax effects (subtle)

5. **Project Filters**
   - Filter by technology/tag
   - Search functionality

6. **Testimonials Section**
   - Client/colleague testimonials
   - Carousel component

7. **Case Studies**
   - Detailed project pages
   - Process documentation
   - Results/metrics

8. **Resume Download**
   - PDF generation
   - Printable version

---

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)

### Design Inspiration
- [Dribbble - Developer Portfolios](https://dribbble.com/search/developer-portfolio)
- [Awwwards - Portfolio Sites](https://www.awwwards.com/websites/portfolio/)

### Tools
- [Figma](https://figma.com) - Design mockups
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance/accessibility testing
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Color contrast
- [PageSpeed Insights](https://pagespeed.web.dev/) - Performance analysis

---

## Support

If you encounter issues during implementation:
1. Check the design specification (`docs/design-specification.md`)
2. Review the AI prompt (`docs/ai-ui-prompt.md`) for detailed component specs
3. Consult Next.js/Tailwind documentation
4. Open GitHub issue in your portfolio repository

---

**Good luck with your implementation!** 🚀

Remember: Start simple, iterate based on feedback, and focus on showcasing your best work.
