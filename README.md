# Partex Website

A modern business website built with Next.js, Convex, and Tailwind CSS. Features a full admin panel for content management, perfect SEO optimization, and beautiful purple gradient design.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

- ✨ Modern, responsive design with purple gradient theme
- 🎨 Full content management system (CMS) via admin panel
- 🔥 Real-time updates with Convex backend
- 📧 Newsletter subscription functionality
- 🎯 Perfect SEO with meta tags and structured data
- 🚀 Optimized performance with Next.js 16
- 📱 Mobile-first responsive design
- 🎭 Smooth animations with Framer Motion

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Convex (real-time database)
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Convex account (free at [convex.dev](https://convex.dev))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mrpajzl/partex-website.git
cd partex-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up Convex:
```bash
npx convex dev
```

Follow the prompts to:
- Create a new Convex project or link to existing one
- This will create `.env.local` with `NEXT_PUBLIC_CONVEX_URL`

4. Seed initial data:
```bash
npx convex run seed:seedData
```

5. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the website.
Visit [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin panel.

## Project Structure

```
partex-website/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel pages
│   │   ├── layout.tsx     # Admin layout
│   │   └── page.tsx       # Admin dashboard
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   └── ui/               # Reusable UI components
├── convex/               # Convex backend
│   ├── schema.ts         # Database schema
│   ├── content.ts        # Content queries/mutations
│   └── seed.ts           # Initial data seeding
├── lib/                  # Utility functions
│   └── convex.tsx        # Convex client provider
└── public/               # Static assets
```

## Admin Panel

Access the admin panel at `/admin` to manage:

- **Services**: Add, edit, and delete service offerings
- **Pricing**: Manage pricing packages and features
- **Contact**: Update contact information
- **Newsletter**: Configure newsletter settings
- **About**: Edit the about section content

### Admin Features

- ✏️ Full CRUD operations for all content
- 🔄 Real-time updates (changes reflect immediately)
- 🎯 Drag-and-drop ordering (via order field)
- ✅ Active/inactive toggles for content visibility
- 📝 Rich text support for long-form content

## Deployment

### Deploy to Vercel

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Import your repository on [Vercel](https://vercel.com):
   - Connect your GitHub account
   - Import the `partex-website` repository
   - Vercel will auto-detect Next.js

3. Add environment variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_CONVEX_URL` (get from Convex dashboard)

4. Deploy Convex to production:
```bash
npx convex deploy
```

5. Your site will be live at `https://your-project.vercel.app`!

### Custom Domain

1. Go to Vercel Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel

## Environment Variables

Create a `.env.local` file (or use Vercel environment variables):

```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## SEO Optimization

The site includes comprehensive SEO optimization:

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Semantic HTML structure
- ✅ Mobile-responsive design
- ✅ Fast load times with Next.js optimization
- ✅ Structured data support (coming soon)

### Performance Tips

- Images are optimized automatically by Next.js
- CSS is minified and tree-shaken
- JavaScript is code-split by route
- Static assets are cached effectively

## Customization

### Changing Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  primary: {
    // Your purple shades
  },
  accent: {
    // Your accent colors
  }
}
```

### Adding New Content Sections

1. Update `convex/schema.ts` with new table
2. Create queries/mutations in `convex/content.ts`
3. Add admin management in `app/admin/page.tsx`
4. Display content in `app/page.tsx`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue on GitHub
- Email: info@partex.cz
- Visit: [your-website.com](https://your-website.com)

## Acknowledgments

- Built with ❤️ using Next.js and Convex
- Design inspired by modern SaaS websites
- Icons by Lucide Icons

---

**Made with 🤖 by Carl (Clawdbot AI Agent)**
