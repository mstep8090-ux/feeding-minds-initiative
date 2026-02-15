import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { CheckCircle2, Users, Target, Zap } from 'lucide-react'

export default function About() {
  const visions = [
    'Provide free and affordable skill-based training',
    'Empower students and youths with practical knowledge',
    'Support education through mentorship and outreach programs',
    'Organize empowerment conferences, school visits, and community impact projects',
    'Create opportunities for growth through partnerships and sponsorships',
    'Reduce unemployment and societal maladies',
  ]

  const missions = [
    'To equip students and young people with practical, income-generating skills such as shoemaking, graphic design, and other vocational crafts.',
    'To take skill acquisition and empowerment directly to communities by delivering hands-on training in schools, churches, and orphanage homes.',
    'To bridge the gap between formal education and real-life productivity by teaching skills that promote self-reliance and confidence.',
    'To empower underserved children and youths with knowledge, creativity, and opportunities that can shape sustainable futures.',
    'To build a culture of learning, service, and impact where individuals are trained to become contributors and solutions within their communities.',
  ]

  const benefits = [
    {
      title: 'Personal & Skill Growth',
      description: 'Team members gain practical skills, leadership development, and hands-on experience through active participation.',
      icon: Zap,
    },
    {
      title: 'Supportive Community',
      description: 'We function as one body built on love and unity where members support each other\'s growth and aspirations.',
      icon: Users,
    },
    {
      title: 'Leadership Development',
      description: 'Every team member is treated as a leader with opportunities to take responsibility and grow into leadership roles.',
      icon: Target,
    },
  ]

  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Page Header */}
        <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '2s' }} />
          </div>
          <div className="max-w-6xl mx-auto relative z-10 animate-fade-in-up">
            <h1 className="bricolage-grotesque-extrabold text-6xl sm:text-7xl text-foreground mb-6 leading-tight">
              About <span className="gradient-text">Feeding Minds</span>
            </h1>
            <p className="text-xl text-foreground/60 max-w-3xl bricolage-grotesque">
              An empowerment organization dedicated to equipping minds with practical skills and life-changing knowledge.
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="bricolage-grotesque-bold text-4xl text-foreground mb-8">Who We Are</h2>
              <p className="text-lg text-foreground/70 leading-relaxed mb-8 bricolage-grotesque">
                Feeding Minds Initiative is a non-profit organization focused on adult and youth-focused empowerment, committed to equipping minds with practical skills and life-changing knowledge. We take hands-on skill training directly to communities, schools, churches, and orphanage homes, teaching skills such as shoemaking, graphic design, and other practical crafts that help individuals become productive, confident, and self-reliant.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed mb-8 bricolage-grotesque">
                Our approach is simple but powerful: <span className="text-accent bricolage-grotesque-semibold">teach a skill, empower a mind, and transform a future.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Our Vision */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="bricolage-grotesque-bold text-4xl text-foreground mb-4">Our Vision</h2>
            <p className="text-lg text-foreground/60 mb-12 max-w-2xl bricolage-grotesque">
              We envision a future where every individual has access to quality skills training and opportunities for growth.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {visions.map((vision, index) => (
                <div key={index} className="flex gap-4">
                  <CheckCircle2 size={24} className="text-accent flex-shrink-0 mt-1" />
                  <p className="text-foreground/70 text-lg leading-relaxed">{vision}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-foreground/60 mb-12 max-w-2xl">
              We are committed to delivering transformative impact through strategic initiatives and community-centered approaches.
            </p>

            <div className="space-y-6">
              {missions.map((mission, index) => (
                <div key={index} className="p-6 rounded-xl bg-muted/50 border border-border hover:border-accent/50 transition-colors">
                  <div className="flex gap-4">
                    <span className="text-2xl font-serif font-bold text-accent flex-shrink-0">{index + 1}.</span>
                    <p className="text-foreground/70 text-lg leading-relaxed">{mission}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Culture */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl font-bold mb-12">Our Organizational Culture</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="font-serif text-2xl font-bold mb-4">Core Values</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <div>
                      <p className="font-semibold">Growth Mindset</p>
                      <p className="text-primary-foreground/70 text-sm mt-1">We believe every mind can grow through learning, discipline, and consistent effort.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <div>
                      <p className="font-semibold">Service with Purpose</p>
                      <p className="text-primary-foreground/70 text-sm mt-1">We exist to serve communities genuinely, not for recognition but for real impact.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <div>
                      <p className="font-semibold">Practical Impact</p>
                      <p className="text-primary-foreground/70 text-sm mt-1">We focus on hands-on skills and real-life solutions that create lasting change.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold mb-4">Leadership Culture</h3>
                <p className="text-primary-foreground/80 leading-relaxed mb-4">
                  At Feeding Minds Initiative, everyone is a leader. We lead ourselves, our work, and our communities by example, responsibility, and positive influence.
                </p>
                <p className="text-sm text-primary-foreground/70 italic">
                  All team members are expected to support the initiative through social media engagement, likes and commenting on any public post in all our social media handles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits of Being a Member */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold text-foreground mb-4">Benefits of Being a Team Member</h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                We operate on the pillars of love, unity, and oneness, creating an environment where every team member is valued, supported, and encouraged to grow.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="p-8 rounded-xl bg-muted/50 border border-border hover:border-accent/50 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Icon size={24} className="text-accent" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                    <p className="text-foreground/60 leading-relaxed">{benefit.description}</p>
                  </div>
                )
              })}
            </div>

            <div className="bg-background border border-border rounded-xl p-8">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Financial & Capital Support</h3>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Every team member is privileged to gain access to financial and capital support for their personal dreams, ideas, businesses, or tangible projects, subject to structure, accountability, and organizational capacity. Feeding Minds Initiative believes that when team members grow, the vision grows.
              </p>
              <p className="text-sm text-accent font-semibold">
                For projects requiring significant capital (100k+), we have established systems to provide structured support.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-accent text-accent-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-5xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-accent-foreground/90">
              Become part of a movement dedicated to transforming lives through skill-based empowerment and community impact.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-accent-foreground text-accent font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
