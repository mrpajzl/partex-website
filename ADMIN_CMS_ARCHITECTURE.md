# Admin CMS Architecture

## Overview
Comprehensive admin panel system that transforms the Partex website into a fully flexible, section-based CMS with page builder functionality.

## Core Features

### 1. Section Library System
Pre-built, reusable sections that can be added to any page multiple times.

#### Section Types
1. **Hero Sections**
   - Hero with image (left/right)
   - Hero with video background
   - Hero with gradient
   - Hero split (50/50)

2. **Content Sections**
   - Text block (WYSIWYG)
   - Text + Image (left/right variants)
   - Two column text
   - Three column features
   - Image gallery
   - Video embed

3. **Service/Feature Sections**
   - Service grid (2/3/4 columns)
   - Feature list with icons
   - Comparison table
   - Timeline/Process steps

4. **Social Proof**
   - Testimonials (slider/grid)
   - Logos/Partners
   - Stats/Numbers
   - Case studies

5. **CTA Sections**
   - Newsletter signup
   - Contact form
   - Button CTA
   - Split CTA (text + form)

6. **Interactive**
   - FAQ accordion
   - Tabs content
   - Pricing tables
   - Before/After slider

#### Section Properties
- **id**: Unique identifier
- **type**: Section type from library
- **name**: Admin-friendly name
- **order**: Display order
- **pageId**: Which page it belongs to
- **isActive**: Visibility toggle
- **content**: JSON object with section-specific fields
- **style**: Custom styling overrides (background, spacing, etc.)

### 2. Page Management System

#### Page Structure
- **id**: Unique identifier
- **slug**: URL path
- **title**: Page title (SEO)
- **description**: Meta description
- **isActive**: Published status
- **isHomepage**: Home page flag
- **sections**: Array of section IDs (ordered)
- **createdAt**: Timestamp
- **updatedAt**: Timestamp

#### Page Types
- **Homepage**: Special flag, only one allowed
- **Standard Pages**: About, Services, Contact, etc.
- **Custom Pages**: User-created pages

### 3. Navigation Management

#### Navigation Item Structure
- **id**: Unique identifier
- **label**: Display text
- **order**: Menu order
- **parent**: Parent menu item (for dropdowns)
- **type**: "page" | "section" | "external"
- **target**:
  - For page: pageId
  - For section: sectionId (smooth scroll)
  - For external: URL
- **isActive**: Visibility toggle

### 4. Media Library
Centralized image/file management

#### Media Structure
- **id**: Unique identifier
- **filename**: Original filename
- **url**: Convex storage URL
- **storageId**: Convex storage ID
- **type**: "image" | "video" | "document"
- **alt**: Alt text for images
- **size**: File size in bytes
- **uploadedAt**: Timestamp
- **usedIn**: Array of {pageId, sectionId} references

### 5. WYSIWYG Editor
Rich text editing for all text content

#### Features
- Bold, italic, underline
- Headings (H1-H6)
- Lists (ordered/unordered)
- Links
- Images (from media library)
- Alignment
- Colors (from design system)
- Code blocks
- Embeds (YouTube, etc.)

#### Implementation
- **Library**: TipTap or Lexical
- **Storage**: HTML string in section content
- **Sanitization**: DOMPurify on render

## Database Schema

### Tables

#### `pages`
```typescript
{
  slug: string,               // URL path
  title: string,              // Page title
  description: string,        // Meta description
  isActive: boolean,          // Published status
  isHomepage: boolean,        // Home page flag
  createdAt: number,
  updatedAt: number,
}
```
**Indexes**: `by_slug`, `by_homepage`

#### `sections`
```typescript
{
  pageId: Id<"pages">,        // Parent page
  type: string,               // Section type from library
  name: string,               // Admin-friendly name
  order: number,              // Display order
  isActive: boolean,          // Visibility
  content: object,            // Section-specific data (JSON)
  style: object,              // Custom styling
  createdAt: number,
  updatedAt: number,
}
```
**Indexes**: `by_page_and_order`, `by_type`

#### `navigation`
```typescript
{
  label: string,              // Display text
  order: number,              // Menu order
  parentId: Id<"navigation"> | null,  // Parent item
  type: "page" | "section" | "external",
  targetPageId: Id<"pages"> | null,
  targetSectionId: Id<"sections"> | null,
  targetUrl: string | null,
  isActive: boolean,
  openInNewTab: boolean,
}
```
**Indexes**: `by_order`, `by_parent`

#### `media`
```typescript
{
  filename: string,
  storageId: Id<"_storage">,  // Convex storage
  url: string,
  type: "image" | "video" | "document",
  alt: string,
  size: number,
  width: number | null,
  height: number | null,
  uploadedAt: number,
  usedIn: array<{pageId, sectionId}>,
}
```
**Indexes**: `by_type`, `by_uploaded_at`

#### `sectionTemplates`
Pre-defined section templates in the library

```typescript
{
  type: string,               // Unique type identifier
  name: string,               // Display name
  description: string,        // What it's for
  category: string,           // Hero, Content, CTA, etc.
  thumbnail: string,          // Preview image URL
  defaultContent: object,     // Default content structure
  schema: object,             // Field definitions
  order: number,              // Library order
  isActive: boolean,
}
```

## Admin Interface Structure

### Layout
```
/admin
├── /dashboard          # Overview stats
├── /pages              # Page management
│   ├── /               # List all pages
│   ├── /new            # Create new page
│   └── /[id]           # Edit page + sections
├── /sections           # Section library
│   └── /templates      # Manage section templates
├── /navigation         # Menu management
├── /media              # Media library
└── /settings           # Site settings
```

### Page Builder Interface
```
┌─────────────────────────────────────┐
│ Page: About Us              [Save]  │
├─────────────────────────────────────┤
│ Sections:                           │
│  [+] Add Section                    │
│                                     │
│  1. ⋮ Hero Section          [Edit]  │
│     Hero with image right           │
│                                     │
│  2. ⋮ Text Block            [Edit]  │
│     Company story                   │
│                                     │
│  3. ⋮ Team Grid             [Edit]  │
│     Meet the team                   │
│                                     │
│  [+] Add Section                    │
└─────────────────────────────────────┘
```

### Section Editor Modal
```
┌─────────────────────────────────────┐
│ Edit Section: Hero              [×] │
├─────────────────────────────────────┤
│ Section Name: Homepage Hero         │
│                                     │
│ Heading:                            │
│ ┌─────────────────────────────────┐ │
│ │ [B] [I] [U] [Link]               │ │
│ │ Welcome to Partex               │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Subheading:                         │
│ ┌─────────────────────────────────┐ │
│ │ Your trusted business partner   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Image:                              │
│ ┌─────────────────────────────────┐ │
│ │   [Upload] [Media Library]      │ │
│ │                                 │ │
│ │   [Hero Image Preview]          │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Image Position:                     │
│ ● Left   ○ Right                    │
│                                     │
│ CTA Button:                         │
│ Text: [Learn More       ]           │
│ Link: [/about           ]           │
│                                     │
│ Background:                         │
│ ○ Purple Gradient                   │
│ ○ Solid Color [#5865F2]             │
│ ○ Image                             │
│                                     │
│        [Cancel]  [Save Changes]     │
└─────────────────────────────────────┘
```

## Implementation Plan

### Phase 1: Database & Core Structure (Week 1)
1. ✅ Update Convex schema
2. ✅ Create migration script for existing content
3. ✅ Set up section templates system
4. ✅ Build media upload/storage

### Phase 2: Section Library (Week 1-2)
1. ✅ Design section template structure
2. ✅ Build 10-15 pre-made sections
3. ✅ Create section component renderer
4. ✅ Test responsiveness of all sections

### Phase 3: Admin Interface (Week 2-3)
1. ✅ Build page management UI
2. ✅ Create section picker/gallery
3. ✅ Implement drag-and-drop ordering
4. ✅ Build section editor modal

### Phase 4: WYSIWYG & Media (Week 3)
1. ✅ Integrate TipTap editor
2. ✅ Build media library UI
3. ✅ Implement image uploads
4. ✅ Add image picker in section editor

### Phase 5: Navigation & Pages (Week 4)
1. ✅ Build navigation manager
2. ✅ Implement page routing
3. ✅ Add smooth scroll to sections
4. ✅ Handle external links

### Phase 6: Polish & Testing (Week 4)
1. ✅ Mobile responsiveness testing
2. ✅ Performance optimization
3. ✅ SEO metadata per page
4. ✅ Documentation

## Technical Decisions

### WYSIWYG Editor
**Choice**: TipTap (https://tiptap.dev/)
**Reasons**:
- React-first design
- Headless (full control over UI)
- Extensible with custom nodes
- Good TypeScript support
- Active development

### Image Uploads
**Choice**: Convex File Storage
**Reasons**:
- Integrated with backend
- Built-in CDN
- Simple API
- No extra service needed

### Drag & Drop
**Choice**: dnd-kit (https://dndkit.com/)
**Reasons**:
- Modern, performant
- Accessibility built-in
- Works with virtual lists
- TypeScript support

### Section Rendering
**Pattern**: Component mapping with dynamic imports
```typescript
const sectionComponents = {
  'hero-image-right': lazy(() => import('@/components/sections/HeroImageRight')),
  'text-block': lazy(() => import('@/components/sections/TextBlock')),
  // ...
}
```

## Security Considerations

1. **Authentication**: Admin routes protected with session
2. **Authorization**: Role-based access control
3. **Content Sanitization**: DOMPurify for HTML content
4. **File Uploads**: Type validation, size limits
5. **SQL Injection**: N/A (Convex handles this)
6. **XSS**: Sanitize all user input before rendering

## Performance Optimizations

1. **Code Splitting**: Dynamic imports for section components
2. **Image Optimization**: Next.js Image component
3. **Lazy Loading**: Sections below fold
4. **Caching**: Static generation where possible
5. **Bundle Size**: Tree-shaking unused sections

## SEO Considerations

1. **Per-Page Meta**: Custom title/description per page
2. **Semantic HTML**: Proper heading hierarchy
3. **Image Alt Text**: Required field in media library
4. **Structured Data**: JSON-LD for content types
5. **Sitemap**: Auto-generated from active pages
6. **Canonical URLs**: Prevent duplicate content

## Future Enhancements

- Multi-language support
- A/B testing for sections
- Analytics integration
- Version history & rollback
- Section duplication
- Global content blocks
- Advanced permissions
- Workflow/approvals
- Preview mode
- Scheduled publishing

---

**Total Estimated Development Time**: 3-4 weeks
**Priority**: High - Core CMS functionality
**Dependencies**: None (can start immediately)
