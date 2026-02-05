# Partex Website Design System

## Design Philosophy
Modern, professional business website with playful wave transitions and clean card-based layouts. Inspired by contemporary SaaS and service websites.

## Color Palette

### Primary Colors
- **Primary Purple**: `#5865F2` - Main brand color, hero backgrounds
- **Purple Dark**: `#4752C4` - Hover states, accents
- **Purple Light**: `#7983F5` - Light backgrounds

### Secondary Colors
- **Teal/Green**: `#57F287` - CTAs, success states
- **Teal Dark**: `#4ADB7A` - CTA hover
- **Pink/Maroon**: `#5A3A5A` - Footer, dark sections

### Neutral Colors
- **White**: `#FFFFFF` - Backgrounds, text on dark
- **Light Gray**: `#F8F9FA` - Alternate sections
- **Medium Gray**: `#6C757D` - Secondary text
- **Dark Gray**: `#2C3E50` - Primary text

## Typography

### Fonts
- **Primary**: Inter (sans-serif) - Body text, UI elements
- **Headings**: Inter Bold/Semibold

### Scale
- **Hero Title**: 48px / 3rem (bold)
- **Section Title**: 36px / 2.25rem (bold)
- **Card Title**: 24px / 1.5rem (semibold)
- **Body Large**: 18px / 1.125rem
- **Body**: 16px / 1rem
- **Small**: 14px / 0.875rem

### Line Heights
- **Headings**: 1.2
- **Body**: 1.6

## Spacing System
8px base unit

- **XXS**: 4px (0.25rem)
- **XS**: 8px (0.5rem)
- **SM**: 12px (0.75rem)
- **MD**: 16px (1rem)
- **LG**: 24px (1.5rem)
- **XL**: 32px (2rem)
- **2XL**: 48px (3rem)
- **3XL**: 64px (4rem)
- **4XL**: 96px (6rem)

## Components

### Wave Dividers
- **SVG Path**: Diagonal wave cuts between sections
- **Direction**: Alternating (left-to-right, right-to-left)
- **Height**: ~100-150px
- **Color**: Matches adjacent section

### Service Cards
- **Background**: White `#FFFFFF`
- **Border Radius**: 20px
- **Shadow**: `0 4px 20px rgba(0, 0, 0, 0.08)`
- **Hover Shadow**: `0 8px 30px rgba(0, 0, 0, 0.12)`
- **Padding**: 32px
- **Transition**: all 0.3s ease

### Card Icon Containers
- **Size**: 64px × 64px
- **Background**: Purple light `rgba(88, 101, 242, 0.1)`
- **Border Radius**: 16px
- **Icon Size**: 32px
- **Color**: Primary Purple

### Buttons

#### Primary (Green CTA)
- **Background**: `#57F287`
- **Color**: White
- **Padding**: 12px 32px
- **Border Radius**: 25px (fully rounded)
- **Font Weight**: 600
- **Hover**: `#4ADB7A` + slight scale(1.05)

#### Secondary (Purple)
- **Background**: `#5865F2`
- **Color**: White
- **Padding**: 12px 32px
- **Border Radius**: 25px
- **Font Weight**: 600
- **Hover**: `#4752C4`

#### Outline
- **Border**: 2px solid `#5865F2`
- **Color**: `#5865F2`
- **Background**: Transparent
- **Hover**: Background `#5865F2`, Color white

## Layout

### Container
- **Max Width**: 1200px
- **Padding**: 0 24px (mobile), 0 48px (desktop)
- **Margin**: 0 auto

### Grid
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 3 columns (services), 2-4 columns (features)
- **Gap**: 32px

## Sections

### Hero Section
- **Background**: Purple gradient with wave bottom
- **Height**: min-height 600px
- **Padding**: 80px 0
- **Layout**: 2 columns (text left, illustration right)
- **Wave**: Diagonal white wave at bottom

### Services Section
- **Background**: White
- **Padding**: 80px 0
- **Cards**: 3 columns, white with shadow
- **Title**: Centered, "Co nabízíme?"

### Newsletter Section
- **Background**: Purple `#5865F2` with diagonal wave
- **Padding**: 60px 0
- **Form**: Inline email + button
- **Wave**: Diagonal wave top and bottom

### Content Section
- **Background**: White or light gray (alternating)
- **Padding**: 80px 0
- **Max Width**: 800px (content)

### Pricing Section
- **Background**: Dark gradient overlay on image
- **Padding**: 80px 0
- **Cards**: White cards on dark background
- **Layout**: 2-3 columns

### Footer
- **Background**: Dark maroon `#5A3A5A` or `#2C1E2C`
- **Color**: White/light gray
- **Padding**: 60px 0 30px

## Interactions

### Hover States
- **Cards**: Lift effect (translateY(-4px)) + shadow increase
- **Buttons**: Background color change + slight scale
- **Links**: Color change, no underline by default

### Transitions
- **Default**: `all 0.3s ease`
- **Transform**: `transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large**: > 1280px

## Wave SVG Patterns

### Top Wave (Section Entry)
```svg
<svg viewBox="0 0 1440 120" fill="none">
  <path d="M0,64 C360,32 720,96 1440,64 L1440,120 L0,120 Z" fill="currentColor"/>
</svg>
```

### Bottom Wave (Section Exit)
```svg
<svg viewBox="0 0 1440 120" fill="none">
  <path d="M0,0 C360,32 720,-32 1440,0 L1440,120 L0,120 Z" fill="currentColor"/>
</svg>
```

## Accessibility

- **Contrast Ratios**: WCAG AA compliant
- **Focus States**: 2px outline, purple color
- **Alt Text**: All images
- **ARIA Labels**: Interactive elements

## Animation

### Page Load
- **Hero**: Fade in from bottom
- **Cards**: Stagger fade-in (delay: 100ms each)

### Scroll
- **Subtle parallax** on hero illustration
- **Fade in on scroll** for sections

## Icons
- **Library**: Lucide React
- **Style**: Outline, 2px stroke
- **Size**: 24px default, 32px in cards, 16px inline

---

This design system ensures consistency across all pages and components while maintaining the modern, professional aesthetic shown in the reference.
