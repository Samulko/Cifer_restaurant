# @Instructions.md

## Environment
- **Node.js:** LTS (e.g. 18.x)
- **Package Manager:** npm
- **Framework:** Next.js (e.g. v13.x)
- **Styling:** CSS modules or Tailwind CSS
- **Animations and Transitions:** GSAP
- **Smooth Scrolling:** Lenis (e.g. v1.0.42)
- **Server-Side Email Handling:** Nodemailer
- **Protocol:** HTTP/3 if supported by hosting platform

## Platforms and Tools
- **Hosting/Deployment:** Vercel (or similar)
- **IDE Integration:** Compatible with LLM-powered IDEs
- **Image Handling:** Next.js Image component
- **Version Control:** Git and GitHub

## Scrolling Experience
- **Single-Page Scroll:** The site should be a vertical scrolling experience instead of separate pages.
- **Sections:** Instead of navigating with links, each section (e.g. intro, about, menu/events, reservation form, contact) appears as the user scrolls down.
- **Animations:** Use GSAP for smooth section transitions and subtle element animations.
- **Lenis:** Apply Lenis for enhanced scrolling feel.

## Content Structure
- **Introduction Section:** Large hero image and brand name
- **About Section:** Text and images about the restaurant/event space story
- **Menu/Events Section:** Images and short descriptions of offerings
- **Reservation Section:** Simple form (Name, Email, Phone, Date, Time, Guests, Comments) that sends data via the API route using Nodemailer
- **Contact Section:** Address, phone, email, map image
- **Footer:** Basic info and social links

## Components
- **NavBar:** Minimal or fixed icon since scrolling replaces traditional links
- **Footer:** Simple and visible at the end of the scroll
- **ReservationForm:** Basic validation, API route at `/api/reservation` sends email

## Content
- **Images:** In `public/images/`
- **Text:** Clear and short
- **Alt Text:** For all images

## Continuous Editing
- This file can grow as we add new sections or change the scrolling flow.
- Update library versions, styles, or sections as needed.
