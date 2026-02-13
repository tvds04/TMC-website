# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TMC Website is a multi-page static website for the Technology Management Club at Indiana University's Kelley School of Business. The site serves dual purposes: recruiting new members and engaging current members through event information and community content.

**Key Requirements:**
- Professional corporate/consulting firm aesthetic (McKinsey/Deloitte inspired)
- 4-page structure (Home, About, Events, Join)
- Interactive features: event filtering, carousels, form validation, calendar export
- Mobile-responsive design
- WCAG AA accessibility compliance

## Architecture & File Structure

### Pages
- `index.html` - Home page with hero, overview, upcoming events, testimonials, Instagram feed
- `about.html` - Mission/values, activities, executive board
- `events.html` - Upcoming events with filtering, past events gallery with carousel
- `join.html` - Why join section, recruitment process, contact form with validation, FAQ accordion

### Design System
- `css/styles.css` - Single stylesheet containing:
  - CSS variables (colors, typography, spacing on 8px grid, shadows, transitions)
  - Component styles (buttons, cards, forms, carousels, etc.)
  - Responsive breakpoints: mobile <768px, tablet 768-1024px, desktop >1024px
  - Animations (fade-in on scroll via IntersectionObserver)

### JavaScript
- `js/main.js` - Vanilla JS handling:
  - Mobile hamburger menu toggle
  - Testimonial carousel (auto-rotate 6s, pause on hover)
  - Event filtering by type
  - Image gallery carousel with prev/next buttons
  - Contact form validation (name, email, year, major)
  - .ics calendar file generation
  - FAQ accordion
  - Scroll animations via IntersectionObserver
  - Smooth scroll for anchor links

### Assets
- `images/TMC_Logo.png` - Club logo (handshake + circuit board pattern)

## Brand & Design Guidelines

### Colors (CSS Variables)
- Primary Blue: `#01679b` (TMC Blue)
- Secondary Maroon: `#8f0002` (TMC Maroon)
- Neutrals: Professional grays (#212529 to #f8f9fb)

### Typography
- Headings: Playfair Display (serif, distinctive)
- Body: DM Sans (modern sans-serif, professional)
- Imported from Google Fonts in styles.css

### Key Design Patterns
- Spacious white space (8px grid system)
- Card-based components with subtle hover effects
- Gradient backgrounds on hero and banner sections
- Grid patterns as decorative overlays
- Clear visual hierarchy using size and color

## Common Development Tasks

### Adding/Editing Content
All content has `[ADD: ...]` or `[UPDATE: ...]` placeholder comments indicating where user content should be added:
- Event details (dates, times, titles, descriptions)
- Member testimonials (quotes, names, majors, years)
- Executive board (names, titles, photos)
- Past event photos and captions

### Adding Events
In `events.html`, duplicate an event-card block:
```html
<div class="event-card" data-type="speaker">
  <div class="event-card__date">
    <div class="event-card__date-month">JAN</div>
    <div class="event-card__date-day">15</div>
  </div>
  <div class="event-card__content">
    <span class="card__tag card__tag--speaker">Speaker Series</span>
    <h4 class="event-card__title">Event Title</h4>
    <div class="event-card__details">Time | Location</div>
    <p class="event-card__description">Description here</p>
  </div>
</div>
```
Filter tags: `data-type="speaker"`, `"networking"`, `"workshop"`, `"competition"`, `"social"`

### Adding Testimonials
Testimonial carousels appear on Home and Join pages. Find `testimonial-carousel__track` and add:
```html
<div class="testimonial-carousel__slide">
  <div class="testimonial-card" style="max-width: 700px; margin: 0 auto;">
    <p class="testimonial-card__quote">Quote text...</p>
    <div class="testimonial-card__author">
      <div class="testimonial-card__avatar" aria-hidden="true"></div>
      <div>
        <div class="testimonial-card__name">Name</div>
        <div class="testimonial-card__role">Major | Class of YYYY</div>
      </div>
    </div>
  </div>
</div>
```
JavaScript auto-rotates every 6 seconds.

### Replacing Placeholder Images
Search for `<!-- Replace with:` comments or SVG data URIs that serve as placeholders:
- Hero/banner images
- Executive board photos (aspect ratio: 120x120px circles)
- Past event gallery images (aspect ratio: 4:3)
- Instagram feed: Live feed via Elfsight widget (index.html) – configure at elfsight.com

Image optimization tips:
- Use modern formats (WebP with fallback)
- Lazy loading for gallery images
- Compress before uploading

## Interactive Features

### Event Filtering
Filter buttons in `events.html` have `data-filter` attribute. JavaScript toggles event card visibility based on `data-type`.

### Carousels
Three carousel types, all using similar structure:
1. **Testimonial carousels**: Auto-rotate with dot navigation
2. **Image gallery**: Manual navigation with prev/next buttons and dots
All use CSS `transform: translateX()` for smooth transitions.

### Contact Form
- Real-time validation on input
- Shows/hides error messages per field
- Success state replaces form after submission
- Currently client-side only (no backend submission yet)

### Calendar Export
"Add to Calendar" buttons generate .ics files using event data attributes:
- `data-event-title`
- `data-event-date` (YYYYMMDD format)
- `data-event-time` (HHMM format)
- `data-event-location`

## Responsive Breakpoints

All breakpoints defined in `css/styles.css`:
- **Mobile** (<768px): Single column, hamburger menu, adjusted spacing
- **Tablet** (768-1024px): 2-column grids, touch-friendly interactions
- **Desktop** (>1024px): Full 3-4 column layouts, optimized whitespace

Mobile menu uses fixed positioning with overlay backdrop. Test on actual devices.

## Accessibility Considerations

- WCAG AA compliant color contrasts
- Semantic HTML (nav, section, footer, etc.)
- All images have descriptive alt text
- Form labels linked to inputs
- Keyboard-navigable (focus styles, skip-to-content link)
- Reduced motion media query for animations
- Button aria-labels, role attributes where needed

## Performance Notes

- Single CSS file (34KB) - loads once for all pages
- Minimal JavaScript (16KB) - vanilla JS, no frameworks
- Placeholder SVG images - replace with optimized actual images
- External dependencies: Google Fonts, Elfsight (Instagram feed widget on index.html)
- Images should be served from `/images/` directory

## Future Enhancements

- Backend form submission endpoint
- Event management system
- Member login/dashboard
- Blog or news section
- Email newsletter signup
