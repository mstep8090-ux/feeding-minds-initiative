import Header from '@/components/header' // Re-triggering build to resolve hydration mismatch
import Footer from '@/components/footer'
import HeroSection from '@/components/hero-section'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, TrendingUp, Heart, Zap, Award, Quote, MessageCircle } from 'lucide-react'
import { getTestimonies, ITestimony } from '@/app/actions/testimonies'
import { getServices, IService } from '@/app/actions/services'
import { getGalleryImages, IGalleryImage } from '@/app/actions/gallery'
import { seedDemoData } from '@/app/actions/seed'

export default async function Home() {
  // Try to seed data if empty, ignore errors for public page rendering
  await seedDemoData().catch(() => { })

  const allTestimonies = await getTestimonies()
  const reviews = allTestimonies.filter((item: ITestimony) => item.type === 'Review')
  // Get all types for the animated preview
  const previewTestimonies = allTestimonies.filter((item: ITestimony) => item.image || item.content.length > 50)

  const dbServices = await getServices()
  const dbGallery = await getGalleryImages()

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

        {/* Action/Preview Marquee Section */}
        {previewTestimonies.length > 0 && (
          <section className="py-12 bg-accent/5 overflow-hidden border-y border-accent/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="bricolage-grotesque-bold text-2xl text-foreground flex items-center gap-2">
                  <MessageCircle className="text-accent" /> Recent <span className="gradient-text">Impact & Updates</span>
                </h3>
                <Link href="/testimonies" className="text-sm font-bold text-accent hover:underline flex items-center gap-1">
                  View All <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="flex gap-8 group">
              {/* First Marquee Track */}
              <div className="flex gap-8 animate-marquee group-hover:[animation-play-state:paused] min-w-max">
                {previewTestimonies.map((item: ITestimony, index: number) => (
                  <div key={`m1-${item._id}-${index}`} className="w-80 md:w-96 bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-accent/10 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/20 shrink-0">
                        {item.type}
                      </div>
                      <h4 className="font-bold text-foreground text-sm line-clamp-1">{item.name}</h4>
                    </div>
                    <p className="text-sm text-foreground/70 italic line-clamp-3">"{item.content}"</p>
                  </div>
                ))}
              </div>
              {/* Second Marquee Track (Duplicate for seamless looping) */}
              <div className="flex gap-8 animate-marquee group-hover:[animation-play-state:paused] min-w-max" aria-hidden="true">
                {previewTestimonies.map((item: ITestimony, index: number) => (
                  <div key={`m2-${item._id}-${index}`} className="w-80 md:w-96 bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-accent/10 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/20 shrink-0">
                        {item.type}
                      </div>
                      <h4 className="font-bold text-foreground text-sm line-clamp-1">{item.name}</h4>
                    </div>
                    <p className="text-sm text-foreground/70 italic line-clamp-3">"{item.content}"</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Services Section */}
        {dbServices.length > 0 && (
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
                {dbServices.map((service: IService, index: number) => (
                  <div
                    key={service._id}
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
        )}

        {/* Impact Counter Section */}
        <section className="py-16 bg-accent text-accent-foreground align-middle justify-center text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 animate-fade-in-up">
              <h2 className="bricolage-grotesque-extrabold text-5xl sm:text-7xl lg:text-8xl drop-shadow-xl">
                1,000+
              </h2>
              <p className="text-xl sm:text-2xl font-bold tracking-widest uppercase bricolage-grotesque opacity-90">
                Individuals Trained
              </p>
              <div className="w-16 h-1 bg-white rounded-full mt-4 opacity-50"></div>
            </div>
          </div>
        </section>

        {/* Training Gallery Section */}
        {dbGallery.length > 0 && (
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 animate-fade-in-down">
                <h2 className="bricolage-grotesque-bold text-4xl sm:text-5xl text-foreground mb-4">
                  Training <span className="gradient-text">Gallery</span>
                </h2>
                <p className="text-lg text-foreground/60 max-w-2xl mx-auto bricolage-grotesque">
                  A glimpse into our training programs and hands-on skill acquisition sessions.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {dbGallery.map((img: IGalleryImage, index: number) => (
                  <div key={img._id} className="relative h-48 md:h-64 rounded-xl overflow-hidden group">
                    <Image
                      src={img.image}
                      alt={img.title || `Gallery Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

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

        {/* Client Reviews Section */}
        {reviews.length > 0 && (
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-accent/5">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 animate-fade-in-down">
                <h2 className="bricolage-grotesque-bold text-4xl sm:text-5xl text-foreground mb-4">
                  Client <span className="gradient-text">Feedback</span>
                </h2>
                <p className="text-lg text-foreground/60 max-w-2xl mx-auto bricolage-grotesque">
                  Hear what our beneficiaries and partners have to say about our impact.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.slice(0, 3).map((review: ITestimony, index: number) => (
                  <div key={review._id} className="bg-white rounded-2xl p-8 shadow-xl hover:-translate-y-2 transition-transform duration-300 relative">
                    <Quote className="absolute top-6 right-6 text-accent/20 w-12 h-12" />
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      {review.image ? (
                        <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-accent">
                          <Image src={review.image} alt={review.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center shrink-0 border-2 border-accent">
                          <span className="text-accent font-bold text-xl">{review.name.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-lg text-foreground bricolage-grotesque">{review.name}</h3>
                        <p className="text-xs text-accent font-bold tracking-wide uppercase">{review.role}</p>
                      </div>
                    </div>
                    <p className="text-foreground/80 text-sm leading-relaxed bricolage-grotesque relative z-10">
                      "{review.content}"
                    </p>
                  </div>
                ))}
              </div>
              {reviews.length > 3 && (
                <div className="text-center mt-12">
                  <Link href="/testimonies" className="text-accent font-bold hover:underline bricolage-grotesque">
                    Read all reviews & testimonies &rarr;
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

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

