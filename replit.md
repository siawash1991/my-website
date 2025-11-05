# Siavash's AI Consultant Website

## Project Overview

A modern, bilingual (English/Farsi) personal website for an AI consultant showcasing expertise, blog content, podcasts, innovative ideas, and consultation services. Built with React, TypeScript, and Tailwind CSS with multi-page architecture.

## Key Features

### Bilingual Support
- Full English and Farsi language support with easy toggle
- RTL (right-to-left) layout automatically applied for Farsi
- All content managed through JSON structure in `shared/content.ts`
- Language preference persisted in localStorage

### Dark/Light Mode
- Seamless theme switching with smooth transitions
- Preference persisted in localStorage
- Respects system color scheme preference on first visit
- All colors defined using CSS custom properties in `client/src/index.css`

### Pages
1. **Home (/)** - Hero section, About, and preview of latest content with "View All" buttons
2. **News (/news)** - Full AI articles listing with search and category filtering
3. **Podcasts (/podcasts)** - Complete podcast episodes with collaboration invite
4. **Startups (/startups)** - Startup showcase with detailed info and investment CTA
5. **Consultation Section** - Accessible from Contact button in navigation, scrolls to section on homepage

### Design System
- Purple-blue gradient color scheme (AI/tech theme)
- Smooth scroll animations with intersection observer
- Responsive mobile-first design
- Professional typography with Inter (English) and Vazirmatn (Farsi)
- Shadcn UI components with custom theming

## Technical Architecture

### Frontend Stack
- **React 18** with TypeScript
- **Wouter** for client-side routing
- **TanStack Query** for data management
- **Tailwind CSS** for styling
- **Shadcn UI** for component library
- **Framer Motion** animations (via Tailwind)
- **Lucide React** for icons
- **React Icons** for social media icons

### Multi-Page Architecture
The site uses Wouter for client-side routing with these pages:
- **/** - Homepage (Hero + About + Content Previews)
- **/news** - Full news/articles listing
- **/podcasts** - Complete podcast episodes
- **/startups** - Detailed startup showcase
- Contact button navigates to homepage and scrolls to consultation section

### Project Structure
```
client/
├── src/
│   ├── components/       # Reusable React components
│   │   ├── Header.tsx   # Global navigation with Contact button
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── PodcastsSection.tsx
│   │   ├── IdeasSection.tsx
│   │   ├── ConsultationSection.tsx
│   │   └── Footer.tsx
│   ├── contexts/         # React contexts
│   │   ├── LanguageContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/           # Custom React hooks
│   │   └── useScrollAnimation.ts
│   ├── pages/           # Page components
│   │   ├── home.tsx     # Hero + About + Previews
│   │   ├── news.tsx     # Full news listing
│   │   ├── podcasts.tsx # Full podcast listing
│   │   ├── startups.tsx # Full startup showcase
│   │   └── not-found.tsx
│   ├── App.tsx          # Routing and layout
│   └── index.css        # Global styles and theme
shared/
└── content.ts           # Bilingual content structure
```

### Content Management

All content is stored in `shared/content.ts` with the following structure:

```typescript
export const content = {
  en: {
    nav: { home, news, podcasts, startups, consultation },
    common: { viewAll },
    hero: { ... },
    about: { ... },
    blog: { 
      title, subtitle, searchPlaceholder,
      posts: [...], 
      categories: [...] 
    },
    podcasts: { 
      title, subtitle, collaborate,
      episodes: [...] 
    },
    ideas: { concepts: [...] },
    startups: {
      title, subtitle, collaborateTitle, collaborateDescription,
      items: [...]
    },
    consultation: { ... },
    footer: { ... }
  },
  fa: {
    // Farsi translations mirror English structure
  }
}
```

To update content:
1. Edit `shared/content.ts`
2. Add content in both `en` and `fa` sections
3. Changes appear immediately (no database needed)

### Styling Guidelines

The project uses a custom design system defined in `client/src/index.css`:

- **Colors**: Purple-blue primary (#8B5CF6 range), neutral grays for backgrounds
- **Spacing**: Consistent scale (20px, 24px, 32px for sections)
- **Typography**: Inter for English, Vazirmatn for Farsi
- **Animations**: Fade-in on scroll, smooth transitions
- **Components**: Shadcn UI with custom theme overlay

### Smooth Scroll Animations

The `useScrollAnimation` hook enables fade-in effects as sections enter viewport:

```typescript
// Usage in any section component
const sectionRef = useScrollAnimation();
<section ref={sectionRef} className="fade-in-section">
```

### Adding New Content

**Blog Posts**: Edit `shared/content.ts` and add to `blog.posts` array:
```typescript
{
  id: "4",
  title: "Your Article Title",
  excerpt: "Brief description...",
  category: "AI Strategy", // Must match categories array
  readTime: 10,
  date: "2024-11-02",
  thumbnail: "ai-content" // Maps to image
}
```

**Podcast Episodes**: Add to `podcasts.episodes` array:
```typescript
{
  id: "3",
  title: "Episode Title",
  description: "Episode description...",
  duration: "42:15",
  date: "2024-11-02"
}
```

**Startups**: Add to `startups.items` array:
```typescript
{
  id: "4",
  name: "Startup Name",
  description: "Brief description...",
  status: "Active", // Active, In Development, or Planning
  category: "AI Tools",
  thumbnail: "startup-image"
}
```

Always add corresponding Farsi translations in `fa.*` sections.

### RTL (Right-to-Left) Support

When language is set to Farsi:
- `dir="rtl"` applied to `<html>` element
- Text alignment automatically adjusts
- Flex/grid layouts mirror horizontally
- All spacing and padding maintain visual balance

## Development

### Running Locally
```bash
npm run dev
```

Server runs on port 5000 (configured in Vite).

### Environment Variables
- `SESSION_SECRET`: Session encryption (already configured)

### Key Files
- `client/src/index.css`: Theme colors and custom utilities
- `shared/content.ts`: All bilingual content
- `client/src/contexts/`: Theme and language state management
- `tailwind.config.ts`: Tailwind customization

## User Preferences

The website is designed for easy customization:

### Changing Colors
Edit CSS custom properties in `client/src/index.css`:
- `--primary`: Main brand color
- `--background`: Page background
- `--foreground`: Text color
- Light and dark variants defined separately

### Changing Fonts
Update Google Fonts link in `client/index.html` and font families in `client/src/index.css`:
```css
--font-sans: Inter, Vazirmatn, system-ui, -apple-system, sans-serif;
```

### Modifying Sections
Each section is a standalone component in `client/src/components/`. Edit directly or reorder in `client/src/pages/home.tsx`.

## Future Enhancements

Potential additions for full production deployment:
- Contact form with email integration
- Blog post detail pages
- Podcast audio file hosting
- Analytics integration
- Newsletter subscription backend
- Admin dashboard for content management
- SEO optimizations (meta tags per section)

## Performance

- Lazy loading for images
- Smooth scroll behavior
- Optimized animations (GPU-accelerated)
- No unnecessary re-renders (React Query caching)
- Production build minification via Vite

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Chrome Mobile)
- RTL layout support for Arabic/Persian browsers
