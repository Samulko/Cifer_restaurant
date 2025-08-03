# Cifer Event Space Website

A modern, single-page scrollable website for an event space/Airbnb venue. Built with Next.js and featuring smooth animations, responsive design, and multi-language support.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm

### Installation & Development

```bash
# Clone the repository
git clone <your-repo-url>
cd Cifer_restaurant

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with global styles
│   ├── page.js         # Main entry point
│   └── globals.css     # Global styles
├── components/
│   ├── ImageScroll.js  # Core scrollable gallery
│   ├── Navigation.js   # Menu navigation
│   └── ...            # Other components
├── styles/
│   ├── modules/        # CSS modules
│   └── tailwind/       # Tailwind components
└── types/              # TypeScript definitions

public/
├── images/
│   ├── desktop/        # Desktop WebP images (1920px)
│   └── mobile/         # Mobile WebP images (768px)
└── locales/            # Translation files
    ├── en.ts          # English translations
    └── sk.ts          # Slovak translations
```

## 🛠 Tech Stack

- **Framework**: Next.js v15.1.0 (App Router)
- **Language**: TypeScript & JavaScript (mixed)
- **Styling**: TailwindCSS v3.4.16
- **Animations**: GSAP v3.12.5, Framer Motion v11.15.0
- **Smooth Scrolling**: Lenis (@studio-freight/lenis v1.0.42)
- **Icons**: React Icons v5.4.0
- **Font**: Playwrite Slovensko Guides

## 🌐 Features

- **Responsive Design**: Optimized for desktop and mobile
- **Multi-language**: English/Slovak support
- **Smooth Scrolling**: Lenis-powered smooth scroll experience
- **Image Optimization**: WebP format with responsive loading
- **Modern Animations**: GSAP and Framer Motion
- **SEO Optimized**: Next.js App Router with proper meta tags

## 📱 Image System

The website uses optimized WebP images:
- **Desktop**: 1920px width, quality 85 (`public/images/desktop/`)
- **Mobile**: 768px width, quality 80 (`public/images/mobile/`)
- **Automatic switching**: Based on screen size detection

## 🚀 Deployment

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms

The built application in `.next/` folder can be deployed to any Node.js hosting platform.

## 📝 Development Commands

```bash
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local development:

```env
# Add any environment variables here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Tailwind Configuration

Customize design system in `tailwind.config.js`:
- Custom fonts (Playwrite Slovensko Guides)
- Animation keyframes
- Color schemes

## 🎨 Customization

### Adding New Images

1. Add WebP images to:
   - `public/images/desktop/` (1920px width)
   - `public/images/mobile/` (768px width)

2. Update `src/components/ImageScroll.js` to reference new images

### Adding New Languages

1. Create translation file in `public/locales/`
2. Update language switching logic in components

### Modifying Sections

Edit `src/components/ImageScroll.js` to modify:
- Section content
- Image assignments
- Animation timings

## 🐛 Troubleshooting

### Hydration Errors

The app handles server-side rendering properly. If you see hydration errors:
1. Check for client-only code in components
2. Ensure consistent server/client rendering

### Smooth Scrolling Issues

Lenis smooth scrolling is configured for:
- Desktop: Full smooth scrolling
- Mobile: Disabled for better performance

### Image Loading Issues

Ensure WebP images exist in both desktop and mobile directories with proper naming (001.webp, 002.webp, etc.).

## 📄 License

This project is for the Cifer Event Space. All rights reserved.

## 🤝 Contributing

This is a private project for a specific venue. Contact the maintainer for any modifications.