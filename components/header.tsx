'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Programs', href: '/programs' },
    { label: 'Team', href: '/team' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-background/80 border-b border-white/10 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 transform group-hover:scale-110 transition-all duration-300">
            <Image
              src="/logo.png"
              alt="Feeding Minds Initiative Logo"
              fill
              className="object-contain rounded-md"
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="bricolage-grotesque-extrabold text-lg bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent leading-none">FMI</span>
            <span className="text-xs bricolage-grotesque-light text-foreground/60 leading-none">Empowering Minds</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm bricolage-grotesque-semibold text-foreground/70 hover:text-accent hover:bg-accent/10 rounded-lg transition-all duration-300 relative group"
            >
              {item.label}
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden sm:block">
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-accent to-secondary text-accent-foreground bricolage-grotesque-semibold text-sm hover:shadow-2xl hover:shadow-accent/70 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
          >
            <span className="relative z-10">Get Involved</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-foreground/70 hover:bg-muted hover:text-accent transition-colors bricolage-grotesque-semibold"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-2.5 rounded-lg bg-accent text-accent-foreground bricolage-grotesque-semibold mt-2"
            >
              Get Involved
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
