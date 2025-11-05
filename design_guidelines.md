# Design Guidelines: Siavash's AI Consultant Personal Website

## Design Approach

**Selected Approach:** Reference-Based with Linear + Stripe inspiration, adapted for bilingual content presentation

**Rationale:** This AI consultant portfolio requires a sophisticated, tech-forward aesthetic that balances professionalism with approachability. The bilingual nature demands clear information hierarchy and RTL-aware layouts. Linear's clean, modern interface combined with Stripe's polished professionalism creates the perfect foundation for an AI expert's digital presence.

**Core Principles:**
- Information clarity over decoration
- Smooth, purposeful motion
- Bilingual parity (equal visual weight for both languages)
- Progressive disclosure of content
- Trust-building through polish and attention to detail

## Typography System

**Primary Fonts:**
- English: Inter (via Google Fonts) - weights: 400, 500, 600, 700
- Farsi: Vazirmatn (via Google Fonts) - weights: 400, 500, 600, 700

**Type Scale:**
- Hero headline: text-5xl md:text-6xl lg:text-7xl (font-weight: 700)
- Section titles: text-3xl md:text-4xl lg:text-5xl (font-weight: 600)
- Subsection headings: text-xl md:text-2xl (font-weight: 600)
- Body large: text-lg (font-weight: 400)
- Body default: text-base (font-weight: 400)
- Small text: text-sm (font-weight: 400)
- Captions: text-xs (font-weight: 500)

**RTL Considerations:**
- Implement `dir="rtl"` and `lang="fa"` attributes when Farsi is active
- Mirror all horizontal spacing and alignment
- Maintain consistent line-height: leading-relaxed (1.625) for body text, leading-tight (1.25) for headlines

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistency
- Micro spacing (within components): 2, 4
- Component internal spacing: 6, 8
- Section padding vertical: 16, 20, 24
- Section padding horizontal: 6, 8, 12
- Large gutters: 16, 20

**Grid System:**
- Container: max-w-7xl mx-auto px-6 md:px-8 lg:px-12
- Hero section: Full viewport height with centered content
- Content sections: py-20 md:py-24 lg:py-32
- Two-column layouts: grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16

**Breakpoints Strategy:**
- Mobile-first approach
- Key breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Test RTL at all breakpoints

## Component Library

### Navigation
**Sticky Header:**
- Fixed position with backdrop blur effect
- Logo/name on left (or right in RTL)
- Navigation links center-aligned
- Language toggle + theme toggle on right (or left in RTL)
- Mobile: Hamburger menu with slide-in drawer
- Height: h-16 md:h-20
- Border bottom: border-b with subtle divider

### Hero Section
**Large Hero Image Implementation:**
- Full-width hero section with high-quality background image (min-h-screen)
- Image: AI-themed abstract visualization or modern workspace with technology elements
- Overlay gradient for text readability
- Content: Centered with max-w-4xl
- Primary CTA with blurred background (backdrop-blur-md with semi-transparent background)
- Secondary CTA adjacent
- Scroll indicator at bottom (animated chevron or mouse icon)

### About Section
**Layout:**
- Two-column on desktop: Profile image left, content right (mirror in RTL)
- Profile image: rounded-2xl with subtle shadow, max-w-sm
- Skills showcase: Grid of pills/badges with icons
- Social links: Icon row with hover lift effect

### AI Blog Section
**Card Grid:**
- grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Each card: Thumbnail image (aspect-ratio-video), title, excerpt (3 lines max), metadata row (date, read time), category tag
- Card styling: rounded-xl, border, hover lift (translate-y-1), transition-all duration-300
- Category filters: Horizontal scrollable pill buttons above grid
- Search bar: Full-width with icon, rounded-full

### Podcasts Section
**Episode Cards:**
- grid grid-cols-1 md:grid-cols-2 gap-8
- Large podcast cover art (square, rounded-lg)
- Episode metadata: title, description (4 lines max), duration, date
- Audio player: Custom-styled HTML5 player with progress bar, play/pause, time display
- Platform badges: Row of streaming service icons/links

### Ideas Showcase
**Masonry/Card Layout:**
- grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Each idea card: Icon/illustration header, title, description, "potential impact" indicator
- Cards with varying heights based on content
- Hover effect: Scale up slightly (scale-105), shadow increase

### Buy Me a Coffee CTA Section
**Centered Conversion Design:**
- Max-w-4xl centered
- Two-column layout: Left - service description with checkmarks list, Right - CTA card with pricing/action
- Service list: Each item with icon, title, brief description
- CTA card: Elevated with shadow, rounded-2xl, prominent button
- Alternative contact options below (calendar integration mention, email)

### Footer
**Comprehensive Footer:**
- Three-column grid on desktop: About/Bio, Quick Links, Social + Newsletter
- About: Brief tagline, logo/name
- Quick Links: Section navigation, legal links
- Social + Newsletter: Icon links, email signup form (inline style)
- Copyright notice: Centered, text-sm
- Padding: py-16 md:py-20

## Language Toggle Component
- Pill-style toggle in header
- Two-state button: EN | FA
- Smooth content fade transition when switching (duration-300)
- Maintain scroll position on language change
- Icon indicators: 🌐 or flag icons

## Dark/Light Mode Toggle
- Sun/moon icon toggle in header
- Smooth transitions on all elements (transition-colors duration-300)
- Persistent preference using localStorage
- No jarring flashes on page load

## Animations & Interactions

**Minimal, Purposeful Animations:**
- Hero entrance: Fade in + slight upward movement (duration-700)
- Scroll-triggered: Fade in sections as they enter viewport (Intersection Observer)
- Button hovers: Slight scale (scale-105) + shadow increase
- Card hovers: Lift effect (translate-y-2) + shadow
- Navigation: Smooth scroll behavior
- Loading states: Skeleton screens for blog/podcast content

**Avoid:** Excessive parallax, continuous animations, distracting movements

## Responsive Strategy

**Mobile (< 768px):**
- Single-column layouts
- Stacked navigation
- Full-width cards
- Condensed padding (py-12 instead of py-20)
- Hamburger menu

**Tablet (768px - 1024px):**
- Two-column grids where appropriate
- Balanced spacing
- Hybrid navigation (some items in menu)

**Desktop (> 1024px):**
- Full multi-column layouts
- Generous spacing
- Expanded navigation
- Hover states fully active

## Images Required

1. **Hero Background:** Abstract AI/technology visualization with geometric patterns or neural network aesthetic (1920x1080 min)
2. **Profile Photo:** Professional headshot (500x500)
3. **Blog Thumbnails:** 3-5 AI-related images (800x450)
4. **Podcast Cover Art:** Branded podcast artwork (1400x1400)
5. **Ideas Section Icons:** Modern iconography for each idea concept