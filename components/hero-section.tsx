import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-main.jpg"
          alt="Feeding Minds Initiative Team"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Solid & Deep Universal Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/80 z-10" />
        <div className="absolute inset-0 bg-black/40 z-20" /> {/* Extra layer of depth */}
      </div>

      {/* Content Container */}
      <div className="relative z-30 max-w-6xl mx-auto px-6 text-center animate-fade-in-up">
        {/* Subtle Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 mt-12">
          <span className="text-white bricolage-grotesque-bold text-[10px] tracking-[0.3em] uppercase text-center">
            Transforming Human Potential
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="bricolage-grotesque-extrabold text-5xl md:text-6xl lg:text-8xl text-white leading-[0.85] tracking-tighter mb-8 text-balance">
          Feed the <span className="gradient-text glow-text">Mind</span>.<br />
          Unleash the <span className="text-secondary">Future</span>.
        </h1>

        {/* Hero Description */}
        <p className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto bricolage-grotesque font-light mb-12 leading-relaxed text-balance">
          Empowering the next generation of Nigerian leaders with hands-on technical skills, mentorship, and a platform for growth.
        </p>

        {/* Primary and Secondary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/programs"
            className="group w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-white text-neutral-950 bricolage-grotesque-extrabold rounded-2xl hover:bg-secondary hover:text-white transition-all duration-500 shadow-2xl hover:shadow-secondary/50 transform hover:-translate-y-1"
          >
            Explore Programs <ArrowRight size={22} className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-white/5 backdrop-blur-xl text-white bricolage-grotesque-semibold rounded-2xl border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            Get Involved Now
          </Link>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 animate-bounce cursor-pointer">
        <span className="text-[10px] text-white uppercase tracking-[0.2em] bricolage-grotesque-bold">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent rounded-full" />
        <div className="flex items-center justify-center -mt-1.5">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Side Accents for extra "Premium" feel */}
      <div className="absolute left-10 top-1/2 -rotate-90 origin-left hidden lg:block opacity-20">
        <span className="text-[10px] text-white uppercase tracking-[0.5em] bricolage-grotesque-bold whitespace-nowrap">Benin City, Nigeria</span>
      </div>
      <div className="absolute right-10 top-1/2 rotate-90 origin-right hidden lg:block opacity-20">
        <span className="text-[10px] text-white uppercase tracking-[0.5em] bricolage-grotesque-bold whitespace-nowrap">Est. 2024 — FMI</span>
      </div>
    </section>
  )
}
