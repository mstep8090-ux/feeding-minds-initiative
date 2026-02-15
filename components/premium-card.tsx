import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface PremiumCardProps {
  icon?: React.ReactNode
  title: string
  description: string
  link?: string
  highlight?: string
  index?: number
  className?: string
}

export default function PremiumCard({
  icon,
  title,
  description,
  link,
  highlight,
  index = 0,
  className = '',
}: PremiumCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl glass hover:glass-light transition-all duration-300 hover:scale-105 transform animate-fade-in-up ${className}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-8 z-10">
        {/* Icon */}
        {icon && (
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:from-accent/40 group-hover:to-secondary/40 transition-colors duration-300">
            {icon}
          </div>
        )}

        {/* Title */}
        <h3 className="bricolage-grotesque-bold text-2xl text-foreground mb-4 group-hover:gradient-text transition-all duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-foreground/70 leading-relaxed mb-6 bricolage-grotesque">
          {description}
          {highlight && (
            <>
              {' '}
              <span className="text-accent bricolage-grotesque-semibold">{highlight}</span>
            </>
          )}
        </p>

        {/* Link */}
        {link && (
          <Link
            href={link}
            className="text-accent bricolage-grotesque-semibold inline-flex items-center gap-2 group/link hover:gap-3 transition-all duration-300"
          >
            Learn More <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
        background: 'radial-gradient(400px at 50% 50%, rgba(42, 159, 107, 0.2), transparent)',
      }} />
    </div>
  )
}
