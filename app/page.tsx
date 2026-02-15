import Header from '@/components/header' // Re-triggering build to resolve hydration mismatch
import Footer from '@/components/footer'
import HeroSection from '@/components/hero-section'
import PremiumCard from '@/components/premium-card'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, TrendingUp, Heart, Zap, Award } from 'lucide-react'

export default function Home() {
  const services = [
    {
      title: 'School Outreach – Skills Acquisition',
      caption: 'We partner with schools to train students in practical, future-ready skills that build creativity and confidence.',
      image: '/outreach.png',
    },
    {
      title: 'Corporate Social Responsibility (CSR) Support',
      caption: 'We help companies design and execute impactful CSR projects focused on youth development and education.',
      image: '/csr.png',
    },
    {
      title: 'Inter-School Competitions',
      caption: 'We organize competitions that promote innovation, creativity, and healthy rivalry among schools.',
      image: '/competition.png',
    },
    {
      title: 'Gift a Skill (Special Day Initiative)',
      caption: 'We help individuals celebrate special occasions by gifting life-changing skills instead of regular presents.',
      image: '/gift.png',
    },
    {
      title: 'Event Coverage & Media Services',
      caption: 'We provide professional photography and videography services for weddings, birthdays, conferences, and other events.',
      image: '/media.png',
    },
    {
      title: 'Physical Training Centers',
      caption: 'We operate physical training centers for hands-on skills development and mentorship.',
      details: 'Head Office: Ekengwa, Benin City | Branch Office: Near Oluku, Benin City',
      image: '/training.png',
    },
    {
      title: 'Mind Academy Conference',
      caption: 'A transformational conference designed to inspire individuals to discover their purpose and maximize their potential.',
      tag: '“Raising the Crushing Leaders”',
      image: '/conference.png',
    },
  ]

  const values = [
    {
      title: 'Growth Mindset',
      description: 'We believe every mind can grow through learning, discipline, and consistent effort.',
      icon: TrendingUp,
    },
    {
      title: 'Service with Purpose',
      description: 'We exist to serve communities genuinely, creating real impact beyond recognition.',
      icon: Heart,
    },
    {
      title: 'Practical Impact',
      description: 'Focus on hands-on skills and real-life solutions that create lasting change.',
      icon: Zap,
    },
    {
      title: 'Excellence & Accountability',
      description: 'We give our best in everything and take responsibility for our results.',
      icon: Award,
    },
  ]

  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero Section */}
        <HeroSection />

        {/* Services Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 blur-[120px] -z-10 rounded-full" />
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-down">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-accent uppercase bg-accent/10 rounded-full bricolage-grotesque">
                What We Do
              </span>
              <h2 className="bricolage-grotesque-bold text-4xl sm:text-6xl text-foreground mb-4">
                Our <span className="gradient-text">Services</span>
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto bricolage-grotesque">
                Empowering the next generation through diverse, youth-led initiatives and practical skill acquisition.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group flex flex-col rounded-3xl overflow-hidden glass hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {service.tag && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-accent text-accent-foreground text-[10px] font-bold tracking-wide uppercase rounded-full shadow-lg">
                          {service.tag}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 p-8 flex flex-col">
                    <h3 className="bricolage-grotesque-bold text-xl text-foreground mb-3 group-hover:text-accent transition-colors leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-foreground/60 text-sm bricolage-grotesque leading-relaxed mb-6">
                      {service.caption}
                    </p>
                    {service.details && (
                      <p className="text-accent text-[10px] uppercase font-bold tracking-widest mb-6 mt-auto">{service.details}</p>
                    )}
                    <Link
                      href="/contact"
                      className="text-foreground/80 bricolage-grotesque-semibold inline-flex items-center gap-2 group/link hover:gap-3 transition-all w-fit text-sm mt-auto"
                    >
                      Inquire Now <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform text-accent" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section id="our-story" className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[600px] rounded-3xl overflow-hidden animate-fade-in-left order-2 lg:order-1">
                <Image
                  src="/story-main.png"
                  alt="Organization Vision"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-accent/20 mix-blend-overlay" />
                <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl">
                  <p className="text-foreground italic bricolage-grotesque">
                    "Sometimes, all a mind needs is to be fed."
                  </p>
                </div>
              </div>

              <div className="space-y-8 order-1 lg:order-2 animate-fade-in-right">
                <h2 className="bricolage-grotesque-bold text-4xl sm:text-5xl text-foreground leading-tight">
                  Our <span className="gradient-text">Story</span>
                </h2>

                <div className="space-y-6 text-foreground/70 bricolage-grotesque text-lg leading-relaxed">
                  <p>
                    Feeding Mind Initiative was officially born in 2024, but the vision began long before then. It started with a deep hunger for growth, a personal desire to learn, and to understand how knowledge can transform lives.
                  </p>
                  <p>
                    The turning point came through the inspiration of <span className="text-foreground font-bold underline decoration-accent/30">Mr. Joshua Oyedele</span>, founder of Just Recycle Initiative. Watching his commitment stirred a deeper question: <span className="italic text-accent">How else can we contribute meaningfully to society?</span>
                  </p>
                  <p>
                    With this conviction, a team of passionate individuals — <span className="text-foreground font-semibold">Adetunji Oriade</span> (Co-Founder), <span className="text-foreground font-semibold">Ruth Odedera</span>, <span className="text-foreground font-semibold">Tracy Epikgum</span>, and other key leaders — came together to create a platform where the “skill-less” can discover skills and where young minds can build meaningful futures.
                  </p>
                  <p>
                    We saw untapped potential everywhere — in schools, orphanages, and young people who only needed guidance. Today, we exist to help individuals discover their path, develop practical skills, and unlock the greatness already within them.
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <div className="flex -space-x-4">
                    {[
                      '/outreach.png',
                      '/competition.png',
                      '/csr.png'
                    ].map((src, i) => (
                      <div key={i} className="relative w-12 h-12 rounded-full border-4 border-background bg-accent/10 overflow-hidden shadow-lg">
                        <Image src={src} alt="Team" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Youth-Led Movement</p>
                    <p className="text-xs text-foreground/50">Nigerian-based Organization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-accent/5 to-transparent -z-10" />
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-down">
              <h2 className="bricolage-grotesque-bold text-4xl sm:text-5xl text-foreground mb-4">
                Our <span className="gradient-text">Values</span>
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto bricolage-grotesque">
                Built on the foundation of love, unity, and oneness, we create an environment where every individual thrives.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="glass rounded-2xl p-8 animate-fade-in-up group hover:glass-light transition-all duration-300 transform hover:scale-105" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:from-accent/40 group-hover:to-secondary/40 transition-colors text-accent">
                      <value.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="bricolage-grotesque-bold text-xl text-foreground mb-2">{value.title}</h3>
                      <p className="text-foreground/60 leading-relaxed bricolage-grotesque text-sm">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float" />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="glass rounded-3xl p-12 md:p-16 animate-fade-in-up">
              <h2 className="bricolage-grotesque-extrabold text-5xl sm:text-6xl mb-6 text-foreground leading-tight">
                Ready to <span className="gradient-text">Transform</span> Your Mind?
              </h2>
              <p className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto bricolage-grotesque leading-relaxed">
                Join our youth-led movement dedicated to empowerment, skill development, and community impact across Nigeria.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground bricolage-grotesque-semibold rounded-xl hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 transform hover:scale-105"
                >
                  Get Involved Now <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link
                  href="#our-story"
                  className="inline-flex items-center justify-center px-8 py-4 glass hover:glass-light rounded-xl bricolage-grotesque-semibold transition-all duration-300"
                >
                  Learn Our Story
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

