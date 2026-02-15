# Customization Guide - Feeding Minds Initiative Website

This guide helps you customize the website for your organization while maintaining the premium design aesthetic.

## 1. Organization Name & Branding

### Update Navigation & Branding
**File**: `components/header.tsx`

```tsx
// Change the logo text
<span className="hidden sm:block font-serif font-bold text-lg">FMI</span>

// Update navigation links
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  // Add or remove items as needed
]
```

### Update Footer
**File**: `components/footer.tsx`

```tsx
// Change footer logo and description
<span className="font-serif font-bold text-lg">FMI</span>
<p className="text-primary-foreground/70 text-sm">
  Your organization description here
</p>

// Update footer links
const footerLinks = {
  'Your Section': [
    { label: 'Link Name', href: '/link' },
  ]
}
```

## 2. Color Scheme

### Update Design Tokens
**File**: `app/globals.css`

The color system uses HSL format. Update the `:root` section:

```css
:root {
  /* Light mode colors */
  --background: 48 100% 96.5%;        /* Main background */
  --foreground: 14 8% 12%;            /* Main text */
  --accent: 140 72% 35%;              /* CTA buttons, highlights */
  --primary: 14 8% 12%;               /* Dark backgrounds */
  --secondary: 140 72% 35%;           /* Alternative accent */
}
```

### HSL Color Format
- First number: Hue (0-360)
- Second number: Saturation (0-100%)
- Third number: Lightness (0-100%)

### Quick Color Updates
- **Accent Color** (CTAs, buttons): Change `--accent` and `--secondary`
- **Background**: Change `--background`
- **Text**: Change `--foreground`
- **Dark mode**: Update `.dark` section for dark theme

## 3. Content Updates

### Home Page
**File**: `app/page.tsx`

```tsx
// Update hero section
<h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold">
  Your headline here
</h1>

// Update programs
const programs = [
  {
    title: 'Program Name',
    description: 'Program description',
    icon: IconName, // From lucide-react
  }
]

// Update values
const values = [
  {
    title: 'Your Value',
    description: 'Value description'
  }
]
```

### About Page
**File**: `app/about/page.tsx`

```tsx
// Update vision items
const visions = [
  'Your vision item 1',
  'Your vision item 2',
]

// Update missions
const missions = [
  'Your mission item 1',
  'Your mission item 2',
]
```

### Programs Page
**File**: `app/programs/page.tsx`

```tsx
// Update program arms
const arms = [
  {
    title: 'Program Name',
    description: 'Detailed description',
    icon: IconName,
  }
]

// Update skills offered
const skills = [
  { name: 'Skill Name', category: 'Category' }
]
```

### Team Page
**File**: `app/team/page.tsx`

```tsx
// Update team members
const teamMembers = [
  {
    name: 'Person Name',
    role: 'Their Role',
    bio: 'Brief biography',
    focus: 'Focus Area',
  }
]
```

### Contact Page
**File**: `app/contact/page.tsx`

```tsx
// Update contact information
const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    content: 'your-email@organization.org',
    link: 'mailto:your-email@organization.org',
  },
  // Add phone, address, etc.
]
```

## 4. Typography

### Change Fonts
**File**: `app/layout.tsx`

```tsx
// Import different fonts from Google Fonts
import { YourFont, YourSansFont } from 'next/font/google'

const yourFont = YourFont({ subsets: ['latin'] })
const yourSansFont = YourSansFont({ weight: ['400', '700'] })
```

**File**: `app/globals.css`

```css
:root {
  --font-serif: 'Your Font', serif;
  --font-sans: 'Your Sans Font', sans-serif;
}

body {
  font-family: var(--font-sans), system-ui;
}
```

**File**: `tailwind.config.ts`

```ts
fontFamily: {
  sans: ['var(--font-sans)', 'system-ui'],
  serif: ['var(--font-serif)', 'serif'],
}
```

## 5. Images & Assets

### Add Hero Image
**File**: `app/page.tsx`

Replace the placeholder div:
```tsx
<div className="relative h-96 sm:h-[500px] rounded-2xl overflow-hidden">
  <Image
    src="/images/hero.jpg"
    alt="Your alt text"
    fill
    className="object-cover"
    priority
  />
</div>
```

### Add Team Photos
**File**: `app/team/page.tsx`

```tsx
<Image
  src={`/images/team/${member.name.toLowerCase().replace(' ', '-')}.jpg`}
  alt={member.name}
  width={200}
  height={200}
  className="rounded-full"
/>
```

## 6. Navigation & Routing

### Add New Pages
1. Create folder: `app/new-page/`
2. Create file: `app/new-page/page.tsx`
3. Add route to navigation in `components/header.tsx`

### Update Navigation Links
**File**: `components/header.tsx`

```tsx
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Your Page', href: '/your-page' },
]
```

## 7. Forms & Functionality

### Update Contact Form
**File**: `app/contact/page.tsx`

```tsx
// Add new form fields
<input
  type="text"
  name="newField"
  placeholder="Field name"
  required
/>

// Update form submission logic
const handleSubmit = async (e) => {
  // Add your form submission logic
}
```

### Update Interest Types
```tsx
<select name="interestType">
  <option value="volunteer">Volunteer</option>
  <option value="your-option">Your Option</option>
</select>
```

## 8. Metadata & SEO

### Update Page Meta
**File**: `app/layout.tsx`

```tsx
export const metadata: Metadata = {
  title: 'Your Organization Name',
  description: 'Your organization description',
  keywords: 'keyword1, keyword2, keyword3',
}
```

### Update Individual Page Meta
**File**: Any page (e.g., `app/about/page.tsx`)

```tsx
export const metadata: Metadata = {
  title: 'About Your Organization',
  description: 'Page description',
}
```

## 9. Social Links

### Update Footer Social Links
**File**: `components/footer.tsx`

```tsx
const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/yourpage', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/yourhandle', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/yourhandle', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/yourcompany', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:your-email@organization.org', label: 'Email' },
]
```

## 10. Responsive Design

The website is mobile-first. All components automatically adjust for:
- Small screens: `<640px` (mobile)
- Medium screens: `640px-1024px` (tablet)
- Large screens: `>1024px` (desktop)

### Tailwind Responsive Classes
```tsx
className="text-lg md:text-2xl lg:text-3xl"  // Different sizes at breakpoints
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"  // Responsive grid
className="hidden md:block"  // Hide on mobile, show on tablet+
```

## 11. Animation & Interactions

### Adjust Transition Speeds
**File**: `app/globals.css`

```css
.transition-all {
  transition: all 0.2s ease-in-out;  /* Change 0.2s to your duration */
}
```

### Add Hover Effects
```tsx
className="hover:opacity-90 transition-opacity"
className="hover:border-accent/50 transition-colors"
className="group-hover:translate-x-1 transition-transform"
```

## 12. Performance Tips

- Optimize images before adding them
- Use next/image for responsive images
- Leverage browser caching
- Consider lazy loading for below-fold images
- Monitor Core Web Vitals

## Common Customization Checklist

- [ ] Update organization name and logo
- [ ] Change colors to match brand
- [ ] Update all contact information
- [ ] Replace placeholder text with your content
- [ ] Add team member information
- [ ] Update program/services information
- [ ] Add real images
- [ ] Update social media links
- [ ] Set up email for contact form submissions
- [ ] Update SEO metadata
- [ ] Test on mobile devices
- [ ] Deploy to production

## Questions?

Refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [shadcn/ui Components](https://ui.shadcn.com)
