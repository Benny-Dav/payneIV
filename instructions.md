 S — Situation
You are building a high-end photographer website to showcase a creative's work, promote their brand, and allow clients to book sessions. It must be visually striking, responsive, and functional — blending storytelling, visuals, and elegance.

✅ C — Context
The website should reflect a clean, aesthetic, and premium feel, using elegant typography, smooth animations, and strategic white space. It must include core pages like portfolio, about, services/bookings, and contact — and progressively add more unique, advanced features.
Use 
https://www.pinterest.com/pin/614037730484124718/
https://www.pinterest.com/pin/614037730484124825/
as ui reference for the folder structure and ui layout of the website.
Color theme should be mostly black and white, for a clean minimal look.

Your stack:

React (Vite or Create React App)

Tailwind CSS (for rapid and custom UI)

JavaScript (vanilla for interactivity)

Third-party tools (e.g., Calendly, Cloudinary, Framer Motion)

✅ R — Role
You are the frontend developer and creative technologist. You will:

Architect the structure and visual layout of the site.

Integrate booking and photo gallery features.

Use no-backend tools (Calendly, image hosting).

Make decisions about responsiveness, animation, and performance.

✅ I — Instructions (Phased Development)
🔹 PHASE 1: Basic Site Setup + Layout
Set up React project

Use Vite or CRA.

Install Tailwind CSS.


Set up folder structure: /components, /pages, /assets, /data.

Create basic page routes

/: Home

/portfolio

/about

/services

/contact

(Optional later: /blog)

Layout Component

Create a shared Layout.jsx with nav + footer.

Make it responsive: mobile nav toggle, sticky top.

Apply Global Styles

Tailwind config: Set fonts (Playfair Display + Inter), extend color palette with accent color (e.g., #D4AF37 for gold).

Add utility classes for consistent spacing, font sizing, and breakpoints.

🔹 PHASE 2: Visual Branding + Home Page
Hero Section

Fullscreen high-res image background (bg-cover, h-screen, relative).

Overlay text with tagline + logo.

Add scroll indicator (arrow down with smooth scroll to next section).

Intro Section

Who the photographer is — 2-3 line intro + CTA to portfolio.

Subtle animations

Use Framer Motion or Tailwind's transition, ease, delay classes for fade-ins and slide-ups on scroll.

🔹 PHASE 3: Portfolio / Works Page
Gallery Grid

Masonry or even grid (e.g., grid-cols-3 gap-4) using Tailwind.

Add filtering buttons (categories like "Weddings", "Events", etc.).

Hover effect

Tailwind hover:scale-105, hover:opacity-80, or a caption reveal on hover.

Lightbox

Use react-image-lightbox or yet-another-react-lightbox to show full-size images on click.

Lazy load images

Install and use react-lazyload or native loading="lazy".

🔹 PHASE 4: About + Services + Testimonials
📍 About Page
Full-width section: professional portrait left, bio right.

Below: timeline of experience or awards using flex, gap, border-l style.

📍 Services Page
Grid of services (portrait session, wedding, etc.)

Each card has:

Title

Description

Price range

CTA: "Book Now"

Add testimonials slider:

Use react-slick or custom scrollable div.

Short quote + name + photo.

📍 Bookings
Embed Calendly widget for booking.

Optional toggle: open in modal or navigate to /book.

🔹 PHASE 5: Contact Page + Footer
Form

Inputs: Name, Email, Message.

Use useState to capture inputs.

Can connect to Formspree or Getform for no-backend handling.

Social Links

Icons: Instagram, YouTube, Pinterest.

Use react-icons.

Footer

Basic: Logo, nav links, social links, copyright.

🔹 PHASE 6: Unique Features + Micro-Interactions
Dark/Light Mode Toggle

Use Tailwind's dark mode feature (dark: classes).

Store toggle state in localStorage.

Custom Cursor

Add a small trailing cursor div with position: fixed, pointer-events: none.

Scroll-based Animations

Use Framer Motion or AOS (Animate on Scroll) for elegant reveals.

BTS/Behind the Lens Section

Embed a reel (YouTube/Vimeo or hosted video).

Add a grid of behind-the-scenes stills.

Client Login (Later/Optional)

Use Authless approach:

Create password-protected pages (Netlify Password Protect or Firebase auth).

Embed private Cloudinary albums or folders.

🔹 PHASE 7: SEO Optimization
Meta Tags & Document Structure

Install and implement react-helmet for dynamic meta tags
Set up proper title and meta description for each page
Implement Open Graph and Twitter card meta tags
Use semantic HTML structure (<main>, <section>, <article>, etc.)
Proper heading hierarchy (h1, h2, h3)

Technical SEO

Generate and implement sitemap.xml
Create robots.txt file
Set up Google Search Console integration
Implement schema markup for photographer/local business

URL & Content Structure

Implement SEO-friendly URLs for all pages
Ensure proper alt text for all images
Create descriptive URLs for portfolio categories

Performance Optimization

Monitor and optimize Core Web Vitals
Ensure mobile responsiveness
Implement lazy loading where appropriate

🔹 PHASE 8: Blog (Optional)
Build simple blog cards layout.

Use static markdown or a headless CMS (like Sanity.io or Contentful).

Route to /blog/:slug page for individual posts.

🔹 PHASE 9: Custom Admin Interface for Client Content Management

Overview:
Build a secure, user-friendly admin interface that allows the site owner to visually manage all website content (text, images, links, etc.) without using Contentful's default UI. This interface should reflect the structure and look of the live site, making it easy for the owner to edit, add, or remove content and preview changes.

Steps:

1. **Planning & Structure**
   - Identify all content types and fields the owner should manage (homepage, about, services, portfolio, navbar, contact info, social links, SEO/meta info).
   - Design the admin UI to mirror the website's structure, with clear navigation for each content section.

2. **Admin Route & Layout**
   - Create a protected `/admin` route in the React app.
   - Build a sidebar or dashboard layout for easy navigation between content sections.

3. **Authentication**
   - Implement secure authentication (simple password, or use Auth0/Firebase for more robust security).
   - Ensure only the owner can access the admin area.

4. **Content Management Forms**
   - For each content section, build forms with fields matching the website's content (text, images, links, etc.).
   - Use file upload fields for images, integrating with Cloudinary for storage.
   - Display current content and allow inline editing.
   - Add buttons for adding, editing, and deleting entries where applicable (e.g., services, portfolio items).

5. **Contentful Integration**
   - Use Contentful's Management API to fetch, create, update, and delete content entries based on admin actions.
   - Ensure changes in the admin interface sync with Contentful so the live site updates accordingly.

6. **Cloudinary Integration**
   - Integrate Cloudinary's API for image uploads.
   - Store uploaded image URLs in Contentful entries.

7. **Preview & Feedback**
   - Optionally, provide a preview mode so the owner can see changes before publishing.
   - Show success/error messages for all actions.

8. **Security & Best Practices**
   - Never expose sensitive API keys in the frontend; use a backend proxy if needed for secure operations.
   - Validate all form inputs and handle errors gracefully.
   - Log out/in functionality for the admin.

9. **Polish & Testing**
   - Ensure the admin interface is responsive and matches the site's visual style.
   - Test all CRUD operations and image uploads.
   - Get feedback from the owner and iterate as needed.

End Result:
A custom admin dashboard that empowers the site owner to manage all website content visually and intuitively, without needing to use Contentful's backend directly.

✅ B — Behavior
Throughout development:

Keep UI minimalist, avoid clutter.

Prioritize performance (lazy loading, optimized images).

Use mobile-first design principles.

Ensure consistency in spacing, fonts, interactions.

✅ E — End Result
A polished, creative, and functional photographer website that:

Elevates the photographer's brand and story

Delivers a visual experience with elegant micro-interactions

Converts visitors into booked clients through clean calls to action and seamless booking

