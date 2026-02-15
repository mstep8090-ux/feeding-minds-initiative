# Image Assets Guide

## Overview
This document describes all the high-quality images integrated into the Feeding Minds Initiative website. All images are professional, premium quality suitable for organizational websites.

## Image Assets

### Hero Section
- **File**: `/public/hero-main.jpg`
- **Location**: Home page hero section
- **Description**: Premium professional photograph of diverse young people engaged in practical skill training in a modern facility
- **Dimensions**: Full-width responsive image
- **Purpose**: Showcases the empowering learning environment and community diversity

### Programs Section - Home Page

#### School Outreach
- **File**: `/public/programs-school.jpg`
- **Location**: Home page programs section (first card)
- **Description**: Professional image of classroom training with instructor and engaged students
- **Purpose**: Represents school outreach arm activities

#### Physical Academy
- **File**: `/public/programs-academy.jpg`
- **Location**: Home page programs section (second card)
- **Description**: Modern training facility with hands-on vocational skill training in progress
- **Purpose**: Showcases physical academy environment and practical training

#### Community Outreach
- **File**: `/public/programs-community.jpg`
- **Location**: Home page programs section (third card)
- **Description**: Community members engaged in empowerment workshops with mentors
- **Purpose**: Highlights community engagement and inclusive learning

#### Charity Arm
- **File**: `/public/programs-charity.jpg`
- **Location**: Home page programs section (fourth card)
- **Description**: Charitable support and assistance to underprivileged youth
- **Purpose**: Demonstrates compassionate community support

### Programs Page
The Programs page reuses the same program images:
- School Outreach: `/public/programs-school.jpg`
- Physical Academy: `/public/programs-academy.jpg`
- Community Outreach: `/public/programs-community.jpg`
- Charity Arm: `/public/programs-charity.jpg`

### Team Section - Team Member Profiles

#### Team Member 1
- **File**: `/public/team-member-1.jpg`
- **Description**: Professional headshot of confident female team member
- **Used by**: Sarah Johnson (Founder & Executive Director), David Chen (Digital Skills Facilitator)

#### Team Member 2
- **File**: `/public/team-member-2.jpg`
- **Description**: Professional portrait of male team member
- **Used by**: Michael Okafor (Programs Manager), James Mbatha (Vocational Skills Trainer)

#### Team Member 3
- **File**: `/public/team-member-3.jpg`
- **Description**: Professional headshot of diverse team member
- **Used by**: Chioma Adesina (Community Outreach Lead)

#### Team Member 4
- **File**: `/public/team-member-4.jpg`
- **Description**: Professional portrait of experienced mentor/senior team member
- **Used by**: Amara Mensah (Mentorship Coordinator)

## Image Specifications

All images are:
- **Format**: JPG
- **Quality**: High-resolution, professional photography
- **Aspect Ratios**:
  - Hero: 16:9
  - Programs: 4:3 landscape
  - Team: 1:1 square (cropped for profile)
- **Optimization**: Compressed for web while maintaining quality
- **Responsive**: Work seamlessly on all device sizes

## Image Usage in Code

### Next.js Image Component
All images use Next.js `Image` component with:
- `fill` prop for flexible sizing
- `object-cover` for proper scaling
- Lazy loading support
- Automatic optimization

### Gradient Overlays
All images feature:
- Subtle gradient overlays for text contrast
- Hover animations (scale-110 on group hover)
- Smooth transitions (500ms duration)

## Customization Notes

### Replacing Images
To replace images with your own:

1. **Add new images** to `/public/` folder
2. **Update file paths** in respective components:
   - Hero: `components/hero-section.tsx`
   - Programs: `app/page.tsx` and `app/programs/page.tsx`
   - Team: `app/team/page.tsx`
3. **Maintain consistent dimensions** for best results

### Recommended Image Sizes
- **Hero**: 1200x675px or larger
- **Programs**: 800x600px
- **Team Profiles**: 400x400px minimum

## File Structure
```
/public/
├── hero-main.jpg
├── programs-school.jpg
├── programs-academy.jpg
├── programs-community.jpg
├── programs-charity.jpg
├── team-member-1.jpg
├── team-member-2.jpg
├── team-member-3.jpg
├── team-member-4.jpg
└── design-showcase.jpg
```

## Notes
- All images are loaded with proper alt text for accessibility
- Images are optimized for performance
- Responsive behavior is built-in via Tailwind classes
- All animations are smooth and performant
