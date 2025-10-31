# Portfolio Design Specification

## Overview
A modern, dark-themed developer portfolio showcasing Taishi's work as a fullstack developer and solopreneur. The design emphasizes clean minimalism, strong typography, and strategic use of purple accent colors to create visual hierarchy.

---

## Design System

### Color Palette

**Primary Colors:**
- Background: `#0f0b08` (Deep warm black)
- Surface: `#1a1612` (Card backgrounds - warm brown)
- Border: `#2d2620` (Subtle warm borders)
- Border Hover: `#3a332a` (Warm brown hover)

**Text Colors:**
- Primary: `#e8dfd6` (Warm off-white)
- Secondary: `#c4b5a7` (Warm gray)
- Tertiary: `#a89684` (Muted warm)
- Muted: `#877766` (Darker muted warm)
- White: `#faf7f2` (Warm white for headings, emphasis)

**Accent Colors:**
- Primary Terracotta: `#c46846`
- Terracotta Hover: `#d17854`
- Terracotta Light: `#db8f6f`

**Component Backgrounds:**
- Icon background: `#1a1612`
- Tag/Badge background: `#1a1612`

### Typography

**Font Family:**
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
```

**Font Sizes:**
- Section Title: `24px`
- Featured Heading: `32px`
- Card Heading: `18px`
- Body: `16px`
- Small: `14px`
- Tiny: `12px`

**Font Weights:**
- Regular: `400`
- Medium: `500`
- Bold: `700`

**Line Heights:**
- Body: `1.6`
- Bio: `1.8`
- Tight: `1.2`

### Spacing

**Container:**
- Max Width: `1200px`
- Horizontal Padding: `20px`

**Section Padding:**
- Vertical: `60px 0`

**Component Spacing:**
- Gap Small: `8px`
- Gap Medium: `15-20px`
- Gap Large: `30-40px`

### Border Radius
- Small: `4px` (Tags)
- Medium: `6px` (Buttons, icons)
- Large: `8px` (Company logos)
- Extra Large: `12px` (Cards)
- Circle: `50%` (Avatar)

### Transitions
- Standard: `0.3s ease`
- Properties: `color`, `background-color`, `border-color`, `transform`

---

## Component Specifications

### 1. Hero Section

**Layout:**
- Full-width container with bottom border
- Three sub-sections: Avatar + Social, Bio, Navigation

**Avatar + Social Icons:**
- Avatar: 80x80px, circular, 2px terracotta border
- Social icons: 5 icons in a row
  - Size: 36x36px
  - Background: `#1a1612`
  - Border: `1px solid #2d2620`
  - Border radius: `6px`
  - Hover: background `#3a332a`, border terracotta, translateY(-2px)

**Bio Section:**
- Two paragraphs with strong emphasis on name and achievements
- Link with underline decoration
- CTA button: Terracotta background, 8px/16px padding, white text
- Hover effect: Lighter terracotta

**Navigation:**
- Horizontal list with 30px gap
- Top border separator
- Links: Muted gray, hover to white

**Responsive:**
- Mobile: Stack avatar and social icons vertically
- Mobile: Vertical navigation with 15px gap

---

### 2. Project Grid

**Layout:**
- 3-column grid on desktop
- 2-column on tablet
- 1-column on mobile
- 20px gap between cards

**Project Card:**
- Background: `#1a1612`
- Border: `1px solid #2d2620`
- Padding: `24px`
- Border radius: `12px`
- Hover: Terracotta border, translateY(-4px)

**Card Content:**
- Title: 18px, terracotta color
- Tags: Horizontal flex wrap, 8px gap
  - Individual tag: Dark background, 1px border, 4px/10px padding
- Description: 14px, muted color

---

### 3. Work Experience Timeline

**Section:**
- Section title: 24px, white, 30px bottom margin

**Timeline Item:**
- Grid layout: `60px | 1fr | auto`
- Background: `#1a1612`
- Border: `1px solid #2d2620`
- Padding: `20px`
- Gap: `20px`
- Hover: Border color to `#3a332a`

**Company Logo:**
- 40x40px square
- Border radius: `8px`
- Background: `#1a1612`

**Job Details:**
- Company: 18px, white
- Role: 14px, muted gray
- Link (if present): 14px, terracotta

**Dates:**
- Right-aligned
- 14px, darker muted color
- No wrap

**Responsive:**
- Mobile: Single column layout, left-aligned dates

---

### 4. OSS Contributions & Projects

**Layout:**
- 2-column grid on desktop
- 1-column on mobile
- 16px gap

**Card:**
- Background: `#1a1612`
- Border: `1px solid #2d2620`
- Padding: `20px`
- Border radius: `12px`
- Flex layout: space-between, center aligned
- Hover: Border `#3a332a`

**Card Content:**
- Title (for projects): 16px, white
- Description: 14px, muted color
- Pull request text: 14px, muted color

**Responsive:**
- Mobile: Stack content vertically, align start

---

### 5. Footer

**Layout:**
- Center-aligned text
- 40px vertical padding
- Muted gray color
- 14px font size

---

## Interaction Design

### Hover States

**Cards:**
- Border color changes to terracotta or lighter warm gray
- Subtle translateY(-4px) for project cards
- Smooth 0.3s ease transition

**Icons:**
- Background lightens
- Border turns terracotta
- Slight upward movement (translateY(-2px))

**Links:**
- Color shifts from muted to brighter/white
- CTA buttons darken slightly

**Timeline Items:**
- Border color subtly lightens on hover

### Focus States
- All interactive elements should have visible focus states for accessibility
- Focus ring using terracotta accent color with offset

---

## Accessibility Requirements

### ARIA Labels
- Social icons need descriptive aria-labels (e.g., "Twitter", "LinkedIn")
- Navigation links should be semantic `<nav>` elements
- Section headings should use proper hierarchy (h1, h2, h3)

### Contrast Ratios
- Text on `#0f0b08` background meets WCAG AA standards
- Terracotta links (`#c46846`) on dark backgrounds have sufficient contrast
- All interactive elements maintain 4.5:1 contrast ratio minimum

### Keyboard Navigation
- Tab order follows visual flow
- All clickable elements are keyboard accessible
- Focus indicators are clearly visible

### Semantic HTML
- Use `<header>`, `<main>`, `<section>`, `<footer>` appropriately
- Links use `<a>` tags
- Lists use `<ul>` and `<li>` where appropriate

---

## Responsive Breakpoints

### Desktop (Default)
- Container: `max-width: 1200px`
- Project grid: 3 columns
- Work timeline: 3-column grid layout
- OSS grid: 2 columns

### Tablet (max-width: 968px)
- Project grid: 2 columns
- Timeline: Single column
- Featured card (if exists): Single column

### Mobile (max-width: 640px)
- Hero: Vertical stack
- Social icons: Centered
- Project grid: 1 column
- OSS grid: 1 column
- Navigation: Vertical stack
- Cards: Vertical content flow

---

## Animation Guidelines

### Page Load
- Consider subtle fade-in animations for sections (optional)
- Stagger card animations slightly (50-100ms delay between items)

### Scroll
- Optional: Fade-in as sections come into viewport
- Keep animations subtle and performance-optimized

### Micro-interactions
- Hover effects: 300ms ease
- Focus transitions: 200ms ease
- Button press: Slight scale (0.98) on active state

---

## Performance Considerations

### Images
- Avatar: Optimized, consider WebP format
- Company logos: Lazy load, optimize file sizes
- Use `loading="lazy"` for images below the fold

### CSS
- Use CSS custom properties for colors
- Minimize reflows and repaints
- Use `transform` and `opacity` for animations (GPU-accelerated)

### Fonts
- System font stack reduces load time
- No external font loading = faster initial render

---

## Future Enhancements

### Potential Additions
- Dark/light mode toggle (currently dark only)
- Smooth scroll navigation
- Project detail modals
- Blog integration
- Contact form
- Analytics integration

### Interactive Features
- Filter projects by tag
- Search functionality
- Animated statistics/metrics
- Timeline visualization with connecting lines

---

## Design Rationale

### Why Dark Theme?
- Popular among developer audiences
- Reduces eye strain for prolonged viewing
- Creates modern, professional aesthetic
- Purple accents pop more on dark backgrounds

### Why Terracotta/Earthy Tones?
- Differentiates from common blue/purple dev portfolios
- Creates warm, inviting, and sophisticated aesthetic
- Associated with craftsmanship and groundedness
- High contrast against dark background while feeling organic
- Timeless and professional color choice

### Why Minimal?
- Keeps focus on content (projects and experience)
- Fast loading and excellent performance
- Accessible and easy to navigate
- Timeless design that won't feel dated

---

## Technical Implementation Notes

### CSS Architecture
- Mobile-first approach
- Use CSS Grid and Flexbox
- Minimize specificity
- BEM or utility-first naming conventions

### HTML Structure
- Semantic markup
- Proper heading hierarchy
- ARIA labels where needed
- Valid, accessible HTML5

### JavaScript (if needed)
- Progressive enhancement
- Smooth scroll polyfill for older browsers
- Lazy loading for images
- Analytics tracking

---

## Assets Needed

### Images
- Professional headshot/avatar (80x80px minimum, higher for retina)
- Company logos for work experience (40x40px minimum, SVG preferred)
- Optional: Project screenshots/thumbnails

### Content
- Bio text (current placeholder present)
- Social media links (Twitter, Lightning, LinkedIn, Email, Shop)
- Project descriptions and tags
- Work experience details with dates
- OSS contribution links
- Blog content (if implementing blog section)

### Icons
- Social media icons (currently using emojis)
- Consider replacing emojis with proper SVG icons for better consistency

---

## Brand Voice & Tone

**Voice:**
- Professional but approachable
- Technical but not jargon-heavy
- Confident without being arrogant
- Achievement-focused

**Tone Characteristics:**
- Direct and concise
- Results-oriented (e.g., "180+ users", "#1 Product of the day")
- International perspective (Japan/Canada)
- Community-minded (OSS contributions prominent)

---

## Success Metrics

### User Experience Goals
- Clear understanding of skills/expertise within 5 seconds
- Easy navigation to projects and work history
- Fast page load (< 2 seconds on 3G)
- High accessibility score (Lighthouse 90+)

### Design Goals
- Consistent visual language across all sections
- Smooth, performant interactions
- Professional, modern aesthetic
- Mobile-first, responsive design

---

## Version History

- **v1.0** - Initial wireframe implementation (current)
- **v2.0** - Planned production implementation with real content and assets
