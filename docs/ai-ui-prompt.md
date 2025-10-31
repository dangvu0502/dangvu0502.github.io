# AI UI Generation Prompt - Taishi's Portfolio

## Copy this entire prompt to v0, Lovable, or similar AI UI generation tools

---

# CONTEXT: Developer Portfolio for Taishi

I need you to create a modern, dark-themed developer portfolio website. This is for a fullstack developer and solopreneur named Taishi who is based in Japan and Canada. The portfolio showcases projects, work experience, and open-source contributions.

## TECH STACK
- **Framework:** Next.js 14+ with App Router OR React with Vite
- **Styling:** Tailwind CSS 3.x
- **Language:** TypeScript
- **Deployment:** Vercel-ready

---

# HIGH-LEVEL GOAL

Create a fully responsive, accessible, single-page portfolio website with the following sections:
1. Hero section with avatar, bio, and social links
2. Featured projects grid
3. Work experience timeline
4. OSS contributions showcase
5. OSS projects showcase
6. Footer

The design should be mobile-first, dark-themed with purple accents, and emphasize clean minimalism with strong typography.

---

# DETAILED STEP-BY-STEP INSTRUCTIONS

## Part 1: Project Setup & Design System

1. Initialize a Next.js 14+ project with TypeScript and Tailwind CSS (or React with Vite if preferred)
2. Configure Tailwind with the following custom theme in `tailwind.config.js`:

```javascript
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
  },
}
```

3. Set the default background to `#0a0a0a` and text color to `#e0e0e0` in your global CSS

## Part 2: Hero Section Component

4. Create a `HeroSection` component with the following structure:
   - **Avatar and Social Icons Row:**
     - Left: Circular avatar image (80x80px, 2px purple border)
     - Right: 5 social icon buttons in a horizontal row
     - Social icons should be 36x36px, dark background (`#1a1a1a`), 1px border (`#2a2a2a`), 6px border radius
     - On hover: background lightens to `#2a2a2a`, border turns purple, translateY(-2px)

   - **Bio Section:**
     - Two paragraphs describing Taishi:
       - "I'm **Taishi**, a fullstack developer and solofounder based in Japan and Canada."
       - "Previously shipping infrastructure & tools to **180+ users (SaaS/indie hackers/indie winners)**. Two of them were ranked as the **#1 Product of the day on Product Hunt**."
     - Include a purple CTA button with text "Hire me 🚀" (8px/16px padding, `#8b5cf6` background, white text)
     - CTA should darken to `#7c3aed` on hover

   - **Navigation:**
     - Horizontal navigation with links to: "My Work", "Stack", "Blog"
     - Links start as muted gray (`#9ca3af`) and turn white on hover
     - Add a top border separator (`1px solid #1f1f1f`)

5. Make the hero section responsive:
   - Desktop: Avatar and social icons in one row
   - Mobile: Stack avatar above social icons, center the social icons
   - Mobile: Make navigation vertical with 15px gap

## Part 3: Project Grid Component

6. Create a `ProjectGrid` component:
   - Display 3 project cards in a grid (3 columns on desktop, 2 on tablet, 1 on mobile)
   - Grid gap: 20px

7. Each `ProjectCard` should have:
   - Background: `#111`, border: `1px solid #1f1f1f`, padding: `24px`, border radius: `12px`
   - Project title in purple (`#8b5cf6`), 18px font size
   - Tag section with flex wrap (8px gap between tags)
   - Each tag: `#1a1a1a` background, 1px border, 4px/10px padding, 4px border radius, 12px font
   - Description text: 14px, muted color (`#b0b0b0`)
   - On hover: border turns purple, translateY(-4px), smooth 300ms transition

8. Include these three sample projects:
   - **Supavec**: Tags: #ai, #analytics, #opensource | Description: "Open-source RAG platform using pgvector"
   - **MCP Server**: Tags: #mcp, #ai, #openai | Description: "MCP server streaming Supabase-secured RAG data to LLMs"
   - **GitAnalytics**: Tags: #openai, #nextjs | Description: "Supabase hackathon winning AI citation analytics app"

## Part 4: Work Experience Timeline

9. Create a `WorkExperience` component:
   - Section title: "Work Experience" (24px, white, 30px bottom margin)
   - Timeline container with vertical stack of items (20px gap)

10. Each `TimelineItem` should use a grid layout: `60px | 1fr | auto`
    - **Column 1:** Company logo (40x40px, 8px border radius, `#1a1a1a` background)
    - **Column 2:** Job details (company name 18px white, role 14px muted, optional purple link)
    - **Column 3:** Date range (14px, darker muted `#6b7280`, right-aligned, no wrap)
    - Background: `#111`, border: `1px solid #1f1f1f`, padding: `20px`, border radius: `12px`
    - Hover: border lightens to `#2a2a2a`

11. Include these sample work experiences:
    - **Supabase** | Frontend Developer (contract) - Remote | Jul 2025 - Sep 2025 | Link: "Here are my PRs"
    - **Whispirit** | Full Stack Developer (freelance) - Switzerland (Remote) | Aug 2024 - Jan 2025
    - **Semos** | Full Stack 2nd Engineer (full-time) - Vancouver | 2020 - 2023
    - **Yahoo! Japan** | Software Developer (full-time) - Tokyo | 2015 - 2019
    - **Stripe** | Software Developer (intern) - San Francisco | Apr 2021 - Jun 2021

12. Make timeline responsive:
    - Mobile: Convert to single column, left-align dates

## Part 5: OSS Contributions Component

13. Create an `OSSContributions` component:
    - Section title: "OSS Contributions" (24px, white, 30px bottom margin)
    - 2-column grid on desktop, 1 column on mobile, 16px gap

14. Each contribution card:
    - Background: `#111`, border: `1px solid #1f1f1f`, padding: `20px`, border radius: `12px`
    - Text: 14px, muted color (`#b0b0b0`)
    - Hover: border to `#2a2a2a`

15. Include these sample contributions:
    - "Pull Request #1137 · langchain-ai/langchain-community"
    - "Pull Request #130 · verblwala/stripe-docs"
    - "Pull Request #56922 · vercel/next.js"
    - "Pull Request #110009 · supabase/supabase"
    - "Pull Request #140 · mdouk/labs/modal-examples"
    - "Pull Request #1799 · nuxt/docs"
    - "Pull Request #1737 · nuxt/docs"
    - "Pull Request #24583 · nodejs/node"

## Part 6: OSS Projects Component

16. Create an `OSSProjects` component with same grid layout as contributions (2 columns desktop, 1 mobile)

17. Each project card should have:
    - Same styling as contribution cards
    - Project title: 16px, white
    - Description: 14px, muted color

18. Include these sample OSS projects:
    - **Supavec** | "The open source RAG platform"
    - **@supavec/mcp-server** | "MCP server for Supavec"
    - **@supavec/supabase-ai** | "TypeScript SDK for building RAG applications with Supabase + OpenAI"
    - **ChatStage** | "An OSS ChatGPT alternative"
    - **ClickAnalytics** | "Track citations of your website by AI"

## Part 7: Footer Component

19. Create a simple `Footer` component:
    - Center-aligned text
    - 40px vertical padding
    - Text: "Taishi © 2025"
    - Muted gray color (`#6b7280`), 14px font

## Part 8: Main Page Assembly

20. Create the main page that assembles all components in order:
    - HeroSection
    - ProjectGrid
    - WorkExperience
    - OSSContributions
    - OSSProjects
    - Footer

21. Add proper semantic HTML:
    - `<header>` for hero
    - `<main>` wrapping all sections
    - `<section>` for each major content area
    - `<footer>` for footer

22. Set max-width container of 1200px with 20px horizontal padding for all sections

## Part 9: Accessibility & Polish

23. Add ARIA labels to social icons (e.g., aria-label="Twitter", "LinkedIn", etc.)

24. Ensure proper heading hierarchy (h1 for name, h2 for section titles, h3 for card titles)

25. Add focus states to all interactive elements using purple accent color with visible focus ring

26. Use placeholder images (`https://via.placeholder.com/80` for avatar, `/40` for company logos)

27. Make all links clickable with `href="#"` placeholders

---

# CODE EXAMPLES, DATA STRUCTURES & CONSTRAINTS

## Color Variables Usage
Always reference the Tailwind config colors:
- Background: `bg-background`
- Cards: `bg-surface`
- Borders: `border-border`
- Text: `text-text-primary`, `text-text-secondary`, `text-text-muted`
- Accent: `bg-accent-purple`, `text-accent-purple`

## Component Constraints

**DO:**
- Use Tailwind utility classes exclusively for styling
- Make all components responsive using Tailwind breakpoints (`md:`, `lg:`)
- Use TypeScript with proper type definitions
- Add hover and focus states to all interactive elements
- Use semantic HTML elements
- Include proper ARIA labels
- Use CSS Grid and Flexbox for layouts

**DO NOT:**
- Create separate CSS files (use Tailwind utilities only)
- Use external fonts (stick to system font stack)
- Add complex animations (keep it subtle: 300ms ease transitions)
- Add a "confirm password" field or contact form (not in scope)
- Modify Next.js configuration beyond Tailwind setup
- Include actual API integrations (use placeholders)

## Sample Component Structure

```typescript
interface ProjectCardProps {
  title: string;
  tags: string[];
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, tags, description }) => {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 hover:border-accent-purple hover:-translate-y-1 transition-all duration-300">
      <h3 className="text-accent-purple text-lg mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map(tag => (
          <span key={tag} className="bg-component-bg border border-border-hover px-2.5 py-1 rounded text-xs text-text-tertiary">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-text-secondary text-sm">{description}</p>
    </div>
  );
};
```

---

# STRICT SCOPE DEFINITION

## Files You Should Create:
1. `app/page.tsx` (or `src/pages/index.tsx` for Vite) - Main page
2. `components/HeroSection.tsx` - Hero component
3. `components/ProjectGrid.tsx` - Projects showcase
4. `components/ProjectCard.tsx` - Individual project card
5. `components/WorkExperience.tsx` - Work timeline
6. `components/TimelineItem.tsx` - Individual timeline entry
7. `components/OSSContributions.tsx` - OSS contributions grid
8. `components/OSSProjects.tsx` - OSS projects grid
9. `components/Footer.tsx` - Footer component
10. `tailwind.config.js` - Tailwind configuration with custom colors
11. `app/globals.css` (or `src/index.css`) - Global styles

## Files You Should NOT Modify:
- Do NOT create a database or backend
- Do NOT create API routes
- Do NOT modify package.json beyond initial setup
- Do NOT create authentication systems
- Do NOT add state management libraries (use React hooks only)

## Boundaries:
- This is a **static portfolio website** - no backend, no database
- All content is hardcoded/static for now (will be replaced with real data later)
- Focus on UI/UX perfection, not functionality
- Mobile-first, fully responsive design is critical
- Accessibility (WCAG AA compliance) is mandatory

---

# MOBILE-FIRST APPROACH EMPHASIS

## Critical Mobile Considerations:

1. **Start with mobile layout (< 640px):**
   - Single column for all grids
   - Vertical navigation
   - Stacked hero content
   - Centered social icons

2. **Then tablet (640px - 968px):**
   - 2-column project grid
   - 2-column OSS grids
   - Timeline remains single column

3. **Finally desktop (> 968px):**
   - 3-column project grid
   - 3-column timeline layout
   - Horizontal hero layout

## Responsive Testing Checklist:
- Test on iPhone SE (375px)
- Test on iPad (768px)
- Test on desktop (1200px+)
- Ensure no horizontal scroll on any device
- Touch targets minimum 44x44px on mobile

---

# VISUAL STYLE SUMMARY

- **Aesthetic:** Minimalist, modern, professional
- **Color Scheme:** Dark background (`#0a0a0a`) with purple accents (`#8b5cf6`)
- **Typography:** System font stack, strong hierarchy, generous line-height
- **Spacing:** Consistent use of multiples of 4px (Tailwind default)
- **Interactions:** Subtle hover effects, smooth transitions, no animations on load
- **Feel:** Professional developer portfolio with emphasis on achievements and contributions

---

# EXPECTED OUTPUT

Generate the complete file structure with:
1. All TypeScript component files with proper types
2. Tailwind config with custom theme
3. Global CSS setup
4. Main page assembling all components
5. Fully responsive, accessible markup
6. Proper semantic HTML throughout
7. All interactive states (hover, focus) implemented
8. Mobile-first responsive design
9. Production-ready code that can be deployed immediately

---

# IMPORTANT REMINDERS

- This AI-generated code will require **human review and testing** before being production-ready
- Placeholder images and links need to be replaced with real assets
- Content needs to be updated with actual data
- Test thoroughly across different devices and browsers
- Run Lighthouse accessibility audit and aim for 90+ score
- Ensure keyboard navigation works perfectly
- Validate all HTML
- Check color contrast ratios meet WCAG AA standards (4.5:1 minimum)

---

# SUCCESS CRITERIA

The generated portfolio should:
- ✅ Load in under 2 seconds on 3G
- ✅ Score 90+ on Lighthouse accessibility
- ✅ Be fully responsive from 320px to 2560px width
- ✅ Have zero console errors
- ✅ Use only Tailwind utility classes (no custom CSS)
- ✅ Include all specified sections and components
- ✅ Match the dark purple aesthetic exactly
- ✅ Have smooth, polished interactions
- ✅ Be keyboard navigable
- ✅ Use semantic, valid HTML5

---

## Additional Context

This portfolio is for a developer who has worked at major tech companies (Yahoo! Japan, Stripe, Supabase) and is active in the open-source community. The design should reflect technical competence, attention to detail, and a modern aesthetic that appeals to both recruiters and fellow developers.

The purple accent color differentiates this from typical blue/green developer portfolios while maintaining professionalism. The dark theme is popular among developers and reduces eye strain.

**Target Audience:**
- Recruiters at tech companies
- Potential freelance clients
- Fellow developers and open-source contributors
- Tech community members

**Goal:**
Users should immediately understand Taishi's expertise, see proof of work (projects/contributions), and have multiple ways to connect (social links, hire CTA).
