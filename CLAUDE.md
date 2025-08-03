# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js website for an event space/Airbnb venue (former stall renovated for events). The site is designed as a single-page scrollable experience with smooth animations and interactive elements, featuring:
- Gallery showcasing the space
- Contact form for inquiries
- History/story of the venue
- Integration with Airbnb reviews (planned)
- Multi-language support (English/Slovak)

## Tech Stack

- **Framework**: Next.js v15.1.0 (App Router)
- **Language**: TypeScript & JavaScript (mixed)
- **Styling**: TailwindCSS v3.4.16
- **Animations**: GSAP v3.12.5, Framer Motion v11.15.0
- **Smooth Scrolling**: Lenis (@studio-freight/lenis v1.0.42)
- **Icons**: React Icons v5.4.0
- **Font**: Playwrite Slovensko Guides (custom font)

## Essential Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run Next.js linting
```

## Development Server Restart Guidelines

ALWAYS inform the user about restarting the development server after making changes:

### Changes that REQUIRE `npm run dev` restart:
- Modifying `package.json` dependencies
- Adding/removing dependencies (`npm install` or `npm uninstall`)
- Changes to config files: `tailwind.config.js`, `next.config.js`, `tsconfig.json`
- Environment variable changes (`.env` files)
- Changes to `src/app/layout.tsx` root layout
- Adding new pages in `src/app/` directory
- Modifying global CSS imports in layout files

### Changes that DO NOT require restart (hot reload works):
- Editing component files (`.js`, `.jsx`, `.ts`, `.tsx`)
- Modifying CSS files and Tailwind classes
- Updating translation files in `public/locales/`
- Changing static assets in `public/` directory
- Editing existing page content and components

**Important**: After any file changes that require a restart, explicitly tell the user:
"🔄 **Restart Required**: Please stop your `npm run dev` server (Ctrl+C) and run `npm run dev` again to see these changes."

For changes that don't require restart, mention:
"✅ **Hot Reload**: These changes will appear automatically without restarting the dev server."

## Architecture & Key Files

### Core Application Structure
- **`src/app/page.js`**: Main entry point, manages language state, Lenis smooth scroll initialization, and handles mobile optimizations
- **`src/app/layout.tsx`**: Root layout with viewport management and global styles
- **`src/components/ImageScroll.js`**: Core scrollable gallery component with sections (home, about, menu, contact, reservation)
- **`src/components/Navigation.js`**: Menu navigation with language switching

### State Management
- Language state managed at the root level in `page.js`
- Passed down via props to components
- No external state management library

### Localization
- **`public/locales/en.ts`**: English translations
- **`public/locales/sk.ts`**: Slovak translations
- Language switching handled via `currentLanguage` prop

### Styling Architecture
- **Global styles**: `src/app/globals.css`
- **Component modules**: `src/styles/modules/*.module.css`
- **Tailwind components**: `src/styles/tailwind/components.css`
- **Config**: `tailwind.config.js` with custom Playwrite font

### Key Implementation Details

1. **Smooth Scrolling**: Lenis is initialized in `page.js` with cleanup on unmount
2. **Mobile Optimization**: 
   - Custom viewport height handling (`--vh` CSS variable)
   - Touch detection and iOS Safari bounce prevention
   - Orientation change handling
3. **Dynamic Imports**: ImageScroll loaded client-side only with loading state
4. **Image Optimization**: All images converted to WebP format in `/images/`

## Development Guidelines

### Component Patterns
- Use TypeScript for new components (`.tsx` files)
- Follow existing mixed JS/TS pattern for consistency
- Components should accept `currentLanguage` prop for i18n

### Styling Conventions
- Use Tailwind classes for utility styling
- CSS modules for component-specific styles
- Maintain the light pink and off-white color scheme
- Ensure responsive design for all new features

### Performance Considerations
- Images must be optimized (WebP format)
- Use Next.js Image component for automatic optimization
- Implement lazy loading for below-fold content
- Maintain smooth 60fps scrolling performance

### Testing Approach
Check the application manually by:
1. Testing smooth scroll on desktop and mobile
2. Verifying language switching works across all components
3. Testing all interactive elements (menu, buttons, forms)
4. Checking responsive behavior at different breakpoints

### Browser Automation
- **Puppeteer**: Available for automated browser testing and website inspection
- Use Puppeteer tools to navigate, screenshot, and interact with the live website
- Helpful for testing responsive behavior and visual regression testing

## Current Development Tasks

From `style.md`, the following tasks are planned:
1. Container component with responsive variants
2. Global styles enhancement with typography scale
3. ImageScroll layout and content refactoring
4. TextBlock component for consistent text styling
5. Navigation styling updates
6. Gallery component for multi-image layouts

## Important Notes

- The site title shows as "Cifer Restaurant" but is being developed as an event space/Airbnb venue
- Airbnb review integration is planned as the final step
- Focus on modern, interactive single-page scroll experience
- Maintain accessibility and mobile-first approach