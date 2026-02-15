import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Zap, Heart, Church, MapPin, Trophy, Users } from 'lucide-react'

export default function Programs() {
  const arms = [
    {
      title: 'School Outreach Arm',
      description:
        'This arm focuses on secondary schools and tertiary institutions, delivering skill-acquisition training, mentorship, leadership talks, and empowerment programs that prepare students for life beyond the classroom.',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Physical Academy Arms',
      description:
        'Where individuals physically meet to learn varieties of skills, both in our head office and branch office for skills acquisition.',
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Orphanage Outreach Arm',
      description:
        'Through this arm, we serve orphanage homes, providing practical skill training, educational support, mentorship, and emotional encouragement to help children build confidence and hope for the future.',
      icon: Heart,
      color: 'from-red-500 to-red-600',
    },
    {
      title: 'Church Outreach Arm',
      description:
        'This arm partners with churches and faith-based organizations to deliver skills training, youth empowerment sessions, and value-driven development programs that promote purpose, discipline, and service.',
      icon: Church,
      color: 'from-amber-500 to-amber-600',
    },
    {
      title: 'Community Outreach Arm',
      description:
        'Our community outreach arm engages local communities, offering vocational training, empowerment workshops, and awareness programs aimed at improving self-reliance and social development.',
      icon: MapPin,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Charity Arm',
      description:
        'The charity arm focuses on acts of compassion and support, including donations, educational materials, basic needs assistance, and relief support for vulnerable individuals and groups.',
      icon: Heart,
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Quiz Competition Arm',
      description:
        'This arm creates open learning and empowerment spaces with free or public sessions where individuals can learn skills, receive guidance, connect, and grow regardless of background or status.',
      icon: Trophy,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Special Day/Birthday Celebration Shout out',
      description:
        'About any individual who wants to use their special day for teaching people through us. We help you visit orphanages and train them with your resources while you attain and maintain your lead sponsors position.',
      icon: Users,
      color: 'from-pink-500 to-pink-600',
    },
  ]

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
              We operate through 8 distinct arms, each designed to reach and empower communities in specific ways.
            </p>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {arms.map((arm, index) => {
                const images = [
                  '/programs-school.jpg', 
                  '/programs-academy.jpg', 
                  '/programs-community.jpg', 
                  '/programs-church.jpg',
                  '/programs-community.jpg',
                  '/programs-charity.jpg',
                  '/programs-academy.jpg',
                  '/programs-school.jpg'
                ]
                return (
                  <div
                    key={index}
                    className="group relative h-80 rounded-2xl glass hover:glass-light transition-all duration-300 overflow-hidden animate-fade-in-up transform hover:scale-105 hover:shadow-2xl"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Image
                      src={images[index] || "/placeholder.svg"}
                      alt={arm.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    
                    <div className="relative z-10 h-full flex flex-col justify-end p-6">
                      <span className="text-xs bricolage-grotesque-semibold text-accent mb-2 opacity-90">Program {index + 1}</span>
                      <h3 className="bricolage-grotesque-bold text-2xl text-white mb-3">{arm.title}</h3>
                      <p className="text-white/80 leading-relaxed mb-4 bricolage-grotesque text-sm line-clamp-2">{arm.description}</p>

                      <Link
                        href="/contact"
                        className="text-accent bricolage-grotesque-semibold inline-flex items-center gap-2 group/link hover:gap-3 transition-all duration-300 w-fit"
                      >
                        Learn More <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
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

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="group p-6 rounded-xl glass hover:glass-light transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: `${index * 0.08}s` }}>
                  <div className="text-xs bricolage-grotesque-semibold text-accent mb-3 uppercase tracking-wide opacity-70 group-hover:opacity-100">{skill.category}</div>
                  <p className="bricolage-grotesque-bold text-xl text-foreground group-hover:gradient-text transition-all">{skill.name}</p>
                </div>
              ))}
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
