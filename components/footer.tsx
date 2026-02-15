import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Organization: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Mission', href: '/about' },
      { label: 'Team & Staff', href: '/team' },
      { label: 'Careers', href: '/contact' },
    ],
    Programs: [
      { label: 'School Outreach', href: '/programs' },
      { label: 'Physical Academy', href: '/programs' },
      { label: 'Community Outreach', href: '/programs' },
      { label: 'Charity Arm', href: '/programs' },
    ],
    'Get Involved': [
      { label: 'Join Us', href: '/contact' },
      { label: 'Volunteer', href: '/contact' },
      { label: 'Donate', href: '/contact' },
      { label: 'Contact', href: '/contact' },
    ],
    Resources: [
      { label: 'Blog', href: '/blog' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:info@feedingmindsinitiative.org', label: 'Email' },
  ]

  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Branding Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                <span className="text-primary bricolage-grotesque-extrabold">FM</span>
              </div>
              <span className="bricolage-grotesque-bold text-lg">FMI</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed bricolage-grotesque">
              Empowering minds with practical skills and life-changing knowledge.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2.5 rounded-lg bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="bricolage-grotesque-bold text-sm mb-4 text-primary-foreground">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link, index) => (
                  <li key={`${title}-${index}`}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors bricolage-grotesque"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-primary-foreground/10">
          <div className="max-w-md mb-8">
            <h3 className="bricolage-grotesque-bold text-lg mb-2">Stay <span className="gradient-text">Connected</span></h3>
            <p className="text-primary-foreground/70 text-sm mb-4 bricolage-grotesque">
              Subscribe to get updates on our programs and opportunities.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-lg bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all bricolage-grotesque"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-accent to-secondary text-accent-foreground bricolage-grotesque-semibold text-sm hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-foreground/10 bg-primary-foreground/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>&copy; {currentYear} Feeding Minds Initiative. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary-foreground transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
