# 🚀 Quick Start Guide

Get your Partex website running in 5 minutes!

## ⚡ Instant Local Development

```bash
# 1. Navigate to the project
cd /Users/ondrejzraly/clawd/partex-website

# 2. Start development (Convex is already running!)
# Open a new terminal and run:
npm run dev

# 3. Open your browser
# Main site: http://localhost:3000
# Admin panel: http://localhost:3000/admin
```

**That's it!** The database is already seeded with content.

## 📱 What You'll See

### Main Website (http://localhost:3000)

**Header**
- Partex Real logo
- Navigation: Služby | O nás | Ceník | Kontakt
- "Kontaktujte nás" button

**Hero Section** (Purple gradient)
- Title: "Vaše cesta k úspěchu je i naše práce"
- Subtitle: "Pomůžeme vám dosáhnout vašich cílů"
- Call-to-action button
- Illustration

**Services Section** (3 cards)
1. Mzdinář - Payroll services
2. Vedení účetnictví - Accounting
3. Daňové poradenství - Tax consulting

**Newsletter Section** (Purple gradient)
- "Přispívejme na babybox"
- Email subscription form
- Working submit functionality

**Service Details**
- Náhradní plnění info
- Pokročilé poradenství details

**Pricing Section** (Dark background)
- Basic mzdové služby - 60 Kč/měsíc
- Vedení účetnictví - 150 Kč/měsíc
- Feature lists with checkmarks

**About Section**
- Company history and services
- Multi-paragraph content

**Contact Section** (4 cards)
- Address with map icon
- Email with mail icon
- Phone with phone icon
- Hours with clock icon
- Map placeholder

**Footer**
- Company info
- Quick links
- Contact details
- Copyright

### Admin Panel (http://localhost:3000/admin)

**Navigation Tabs**
- Services | Pricing | Contact | Newsletter | About

**Services Management**
- View all services
- Add new service
- Edit existing services
- Delete services
- Set icons (users, calculator, clipboard)
- Configure CTAs
- Order management
- Active/inactive toggle

**Pricing Management**
- Create pricing packages
- Add/remove features dynamically
- Set price, currency, unit
- Order packages
- Toggle visibility

**Contact Management**
- Add contact items
- Types: email, phone, address, hours
- Custom icons
- Order items
- Edit/delete

**Newsletter Settings**
- View current configuration
- (Subscriber management coming soon)

**About Editor**
- Edit title
- Edit full content
- Save changes

## 🎨 Design Features

- **Colors**: Purple/blue gradient (#667eea, #764ba2)
- **Accents**: Green buttons (#10b981)
- **Animations**: Smooth hover effects
- **Responsive**: Mobile-first design
- **Icons**: Lucide React icons throughout
- **Typography**: Inter font (professional)

## 🔄 Making Changes

### Option 1: Via Admin Panel (No Code!)

1. Go to http://localhost:3000/admin
2. Click the tab for what you want to edit
3. Click "Add" or "Edit" buttons
4. Make your changes
5. Click "Save"
6. **Refresh the main site** - changes appear instantly!

### Option 2: Direct Database (Advanced)

```bash
# Run Convex mutations directly
npx convex run content:updateHero --id "xxx" --title "New Title"
```

## 📝 Sample Content Included

The database is pre-populated with:
- 1 hero section
- 3 services
- 1 newsletter config
- 2 service details
- 2 pricing packages
- 1 about section
- 4 contact items
- 2 site settings

**All content is editable via the admin panel!**

## 🌐 Deploy to Production

When ready to go live:

```bash
# 1. Deploy Convex
npx convex deploy

# 2. Go to vercel.com
# 3. Import GitHub repo: mrpajzl/partex-website
# 4. Add environment variable: NEXT_PUBLIC_CONVEX_URL
# 5. Deploy!
```

Full guide: See `DEPLOYMENT.md`

## 🛠️ Common Tasks

### Add a New Service
1. Admin Panel → Services → Add Service
2. Fill in: Title, Description, Icon, CTA
3. Set Order (1, 2, 3...)
4. Save

### Update Pricing
1. Admin Panel → Pricing → Edit package
2. Change price, features, etc.
3. Save

### Change Contact Info
1. Admin Panel → Contact → Edit item
2. Update value
3. Save

### Edit About Section
1. Admin Panel → About → Edit
2. Update content (supports multiple paragraphs)
3. Save

## 🐛 Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### Convex connection issues
```bash
# Restart Convex dev server
# In the terminal where it's running, press Ctrl+C
npx convex dev
```

### Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001
```

### Changes not showing
1. Hard refresh browser (Cmd+Shift+R on Mac)
2. Check Convex is running
3. Check console for errors

## 📚 Learn More

- **Full documentation**: `README.md`
- **Deployment guide**: `DEPLOYMENT.md`
- **Project overview**: `PROJECT_SUMMARY.md`

## 🎯 Next Steps

1. ✅ **Test locally** - Browse the site and admin panel
2. ✅ **Customize content** - Add your real business info
3. ✅ **Add images** - Replace placeholder illustrations
4. ✅ **Deploy** - Follow deployment guide
5. ✅ **Configure domain** - Point your domain to Vercel
6. ✅ **Go live!** - Launch your business website

## 💡 Tips

- **Save often** in the admin panel
- **Test on mobile** - it's fully responsive
- **Check SEO** - Run Lighthouse audit before launch
- **Backup regularly** - Export Convex data periodically

## 🎊 You're All Set!

Your website is ready to use. The code is clean, documented, and production-ready.

**Happy launching!** 🚀

---

Need help? Check the documentation or create an issue on GitHub.
