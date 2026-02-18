import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import ApplicationForm from '@/components/application-form'

export default function Programs() {
  const skills = [
    { name: 'Shoemaking', category: 'Vocational' },
    { name: 'Graphic Design', category: 'Digital' },
    { name: 'Business Development', category: 'Entrepreneurship' },
    { name: 'Leadership Training', category: 'Personal Development' },
    { name: 'Digital Marketing', category: 'Digital' },
    { name: 'Creative Writing', category: 'Creative' },
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
              Our <span className="gradient-text">Programs</span>
            </h1>
            <p className="text-xl text-foreground/60 max-w-3xl bricolage-grotesque">
              We operate through distinct arms, each designed to reach and empower communities in specific ways.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/15 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-down">
              <h2 className="bricolage-grotesque-bold text-4xl sm:text-5xl text-foreground mb-4">
                Skills We <span className="gradient-text">Teach</span>
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto bricolage-grotesque">
                From vocational trades to digital skills, we offer comprehensive training in practical areas that build self-reliance.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
              {skills.map((skill, index) => (
                <div key={index} className="group p-6 rounded-xl glass hover:glass-light transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: `${index * 0.08}s` }}>
                  <div className="text-xs bricolage-grotesque-semibold text-accent mb-3 uppercase tracking-wide opacity-70 group-hover:opacity-100">{skill.category}</div>
                  <p className="bricolage-grotesque-bold text-xl text-foreground group-hover:gradient-text transition-all">{skill.name}</p>
                </div>
              ))}
            </div>

            {/* Application Form Section */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <ApplicationForm />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="bricolage-grotesque-bold text-4xl sm:text-5xl text-foreground mb-16 animate-fade-in-down">
              How Our <span className="gradient-text">Programs</span> Work
            </h2>

            <div className="space-y-8">
              <div className="relative pb-8 border-l-2 border-accent pl-8">
                <div className="absolute left-[-10px] top-0 w-4 h-4 rounded-full bg-accent" />
                <div className="ml-4">
                  <h3 className="bricolage-grotesque-bold text-2xl text-foreground mb-2">Identification</h3>
                  <p className="text-foreground/60 leading-relaxed bricolage-grotesque">
                    We identify communities, schools, churches, and organizations in need of skill-based training and empowerment.
                  </p>
                </div>
              </div>

              <div className="relative pb-8 border-l-2 border-accent pl-8">
                <div className="absolute left-[-10px] top-0 w-4 h-4 rounded-full bg-accent" />
                <div className="ml-4">
                  <h3 className="bricolage-grotesque-bold text-2xl text-foreground mb-2">Engagement</h3>
                  <p className="text-foreground/60 leading-relaxed bricolage-grotesque">
                    We engage with stakeholders to understand needs, design customized programs, and secure buy-in from participants.
                  </p>
                </div>
              </div>

              <div className="relative pb-8 border-l-2 border-accent pl-8">
                <div className="absolute left-[-10px] top-0 w-4 h-4 rounded-full bg-accent" />
                <div className="ml-4">
                  <h3 className="bricolage-grotesque-bold text-2xl text-foreground mb-2">Delivery</h3>
                  <p className="text-foreground/60 leading-relaxed bricolage-grotesque">
                    Our trained facilitators deliver hands-on, practical skill training using proven methodologies and real-world applications.
                  </p>
                </div>
              </div>

              <div className="relative pb-8 border-l-2 border-accent pl-8">
                <div className="absolute left-[-10px] top-0 w-4 h-4 rounded-full bg-accent" />
                <div className="ml-4">
                  <h3 className="bricolage-grotesque-bold text-2xl text-foreground mb-2">Exhibition & Certification</h3>
                  <p className="text-foreground/60 leading-relaxed bricolage-grotesque">
                    We normally organise a one-day exhibition programme for prospective learners to display the knowledge acquired by facilitators of each skill.
                  </p>
                </div>
              </div>

              <div className="relative border-l-2 border-accent pl-8">
                <div className="absolute left-[-10px] top-0 w-4 h-4 rounded-full bg-accent" />
                <div className="ml-4">
                  <h3 className="bricolage-grotesque-bold text-2xl text-foreground mb-2">Follow-up & Support</h3>
                  <p className="text-foreground/60 leading-relaxed bricolage-grotesque">
                    We provide ongoing mentorship, guidance, and support to ensure participants successfully apply their skills and achieve sustainability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rights & Privileges */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-6xl mx-auto">
            <h2 className="bricolage-grotesque-bold text-4xl mb-12">Rights & Privileges of FMI Team Members</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="bricolage-grotesque-bold text-xl mb-2">Financial & Capital Support</h3>
                  <p className="text-primary-foreground/80 bricolage-grotesque">
                    Every team member gets access to financial and capital support for their personal dreams, ideas, businesses, or tangible projects, subject to structure and organizational capacity.
                  </p>
                </div>

                <div>
                  <h3 className="bricolage-grotesque-bold text-xl mb-2">Capacity Building & Skill Development</h3>
                  <p className="text-primary-foreground/80 bricolage-grotesque">
                    Access to trainings, mentorship, leadership development, and skill-acquisition opportunities that enhance personal growth and professional excellence.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="bricolage-grotesque-bold text-xl mb-2">Right to Participation & Contribution</h3>
                  <p className="text-primary-foreground/80 bricolage-grotesque">
                    Every member has the right to actively participate in decision-making, projects, outreaches, and strategic discussions, contributing ideas that strengthen the initiative.
                  </p>
                </div>

                <div>
                  <h3 className="bricolage-grotesque-bold text-xl mb-2">Recognition, Trust & Growth Opportunities</h3>
                  <p className="text-primary-foreground/80 bricolage-grotesque">
                    Commitment, consistency, and impact will be recognized and rewarded. Team members may be entrusted with leadership roles and growth opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="bricolage-grotesque-bold text-5xl text-foreground mb-6">Ready to Transform Lives?</h2>
            <p className="text-xl text-foreground/60 mb-8 max-w-2xl mx-auto bricolage-grotesque">
              Whether you want to participate in our programs, volunteer, or partner with us, there's a place for you in our movement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-accent-foreground bricolage-grotesque-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-accent text-accent bricolage-grotesque-semibold rounded-lg hover:bg-accent/5 transition-colors"
              >
                Meet Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
