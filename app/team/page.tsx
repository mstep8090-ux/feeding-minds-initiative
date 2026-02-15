import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'
import { Users, Award, Target, Heart } from 'lucide-react'
import { getTeamMembers } from '@/app/actions/team'

export const dynamic = 'force-dynamic'

export default async function Team() {
  // Fetch team members from the database
  const teamMembers = await getTeamMembers()

  const branches = ['National', 'Lagos', 'Abuja', 'Isior']

  const getBranchTeamMembers = (branch: string) => {
    // @ts-ignore
    return teamMembers.filter(member => member.branch === branch)
  }

  const staffRoles = [
    {
      title: 'Program Coordinator',
      description: 'Support planning, coordination, and execution of programs and outreach activities.',
      icon: Target,
    },
    {
      title: 'Training Facilitator',
      description: 'Deliver hands-on skill training and educational content to participants.',
      icon: Users,
    },
    {
      title: 'Community Engagement Officer',
      description: 'Build relationships and coordinate with community partners and stakeholders.',
      icon: Heart,
    },
    {
      title: 'Administrative Support',
      description: 'Provide logistics and administrative coordination for programs.',
      icon: Award,
    },
  ]

  return (
    <>
      <Header />
      <main className="bg-background">

        {/* Team Members*/}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-down">
              <h2 className="bricolage-grotesque-bold text-4xl sm:text-5xl text-foreground mb-4">
                Our <span className="gradient-text">Team Members</span>
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto bricolage-grotesque">
                Passionate professionals committed to transforming lives through education and empowerment across all our branches.
              </p>
            </div>

            <div className="space-y-16">
              {branches.map((branch) => {
                const branchMembers = getBranchTeamMembers(branch)
                if (branchMembers.length === 0) return null

                return (
                  <div key={branch} className="animate-fade-in-up">
                    <h3 className="bricolage-grotesque-bold text-3xl text-foreground mb-8 pb-4 border-b-2 border-accent/30">
                      {branch} {branch !== 'National' && 'Branch'}
                    </h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {/* @ts-ignore */}
                      {branchMembers.map((member, index) => (
                        <div
                          key={`${branch}-${index}`}
                          className="group rounded-2xl glass hover:glass-light transition-all duration-300 overflow-hidden animate-fade-in-up transform hover:scale-105 hover:shadow-2xl"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="relative h-64 w-full overflow-hidden">
                            <Image
                              src={member.image || "/placeholder.svg"}
                              alt={member.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          </div>
                          <div className="p-6 relative z-10">
                            <h3 className="bricolage-grotesque-bold text-xl text-black mb-1">{member.name}</h3>
                            <p className="text-accent bricolage-grotesque-semibold text-sm mb-3">{member.role}</p>
                            <p className="text-black/80 bricolage-grotesque text-sm leading-relaxed mb-4">{member.bio}</p>
                            <span className="inline-block px-3 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent bricolage-grotesque-semibold text-xs backdrop-blur-sm">
                              {member.focus}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Staff & Volunteers */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="bricolage-grotesque-bold text-4xl text-foreground mb-12">Administrative Structure</h2>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="bricolage-grotesque-bold text-2xl text-foreground mb-4">Staff Members</h3>
                <p className="text-foreground/60 leading-relaxed mb-6 bricolage-grotesque">
                  Staffs are committed individuals who volunteer to take on specific responsibilities within the initiative. They support planning, coordination, and execution of programs and outreach activities.
                </p>
                <p className="text-foreground/60 leading-relaxed bricolage-grotesque">
                  Staff function as the core administrative and operational team, ensuring consistency, structure, and quality delivery across all arms of the initiative.
                </p>
              </div>

              <div>
                <h3 className="bricolage-grotesque-bold text-2xl text-foreground mb-4">Volunteers</h3>
                <p className="text-foreground/60 leading-relaxed mb-6 bricolage-grotesque">
                  Volunteers are individuals who join Feeding Minds Initiative to support main facilitators while developing their own skills. They learn through active participation, observation, and hands-on assistance.
                </p>
                <p className="text-foreground/60 leading-relaxed bricolage-grotesque">
                  Volunteers showing high interest in developing the organization culture can be promoted to staff positions with compensation.
                </p>
              </div>
            </div>

            <div>
              <h3 className="bricolage-grotesque-bold text-2xl text-foreground mb-8">Staff Roles & Responsibilities</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {staffRoles.map((role, index) => {
                  const Icon = role.icon
                  return (
                    <div key={index} className="p-6 rounded-lg bg-background border border-border hover:border-accent/50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                        <Icon size={20} className="text-accent" />
                      </div>
                      <h4 className="bricolage-grotesque-bold text-lg text-foreground mb-2">{role.title}</h4>
                      <p className="text-foreground/60 text-sm leading-relaxed bricolage-grotesque">{role.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Culture */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-6xl mx-auto">
            <h2 className="bricolage-grotesque-bold text-4xl mb-12">Leadership Culture</h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl bricolage-grotesque-bold mb-6">Everyone is a Leader</h3>
                <p className="text-primary-foreground/80 leading-relaxed mb-4 bricolage-grotesque">
                  At Feeding Minds Initiative, everyone is a leader. We lead ourselves, our work, and our communities by example, responsibility, and positive influence.
                </p>
                <p className="text-primary-foreground/80 leading-relaxed bricolage-grotesque">
                  We believe in the potential of every team member and provide opportunities for growth, development, and leadership expression.
                </p>
              </div>

              <div className="bg-primary-foreground/10 rounded-xl p-8 border border-primary-foreground/20">
                <h3 className="text-xl font-bold mb-4">Team Expectations</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold mt-1">→</span>
                    <span>Active participation in programs and community engagement</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold mt-1">→</span>
                    <span>Support through social media engagement and visibility</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold mt-1">→</span>
                    <span>Commitment to continuous learning and growth</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold mt-1">→</span>
                    <span>Leadership by example and positive influence</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Join Our Team */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="bricolage-grotesque-bold text-4xl text-foreground mb-12">Join Our Team</h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-8 rounded-xl bg-muted/50 border border-border">
                <h3 className="bricolage-grotesque-bold text-2xl text-foreground mb-4">Application Process</h3>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center bricolage-grotesque-bold text-sm">
                      1
                    </span>
                    <div>
                      <p className="bricolage-grotesque-semibold text-foreground">Expression of Interest</p>
                      <p className="text-foreground/60 text-sm bricolage-grotesque">Submit your application and interest in joining us.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center bricolage-grotesque-bold text-sm">
                      2
                    </span>
                    <div>
                      <p className="bricolage-grotesque-semibold text-foreground">Personal Interview</p>
                      <p className="text-foreground/60 text-sm bricolage-grotesque">Meet with us to discuss your skills, vision, and readiness to serve.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center bricolage-grotesque-bold text-sm">
                      3
                    </span>
                    <div>
                      <p className="bricolage-grotesque-semibold text-foreground">Orientation & Induction</p>
                      <p className="text-foreground/60 text-sm bricolage-grotesque">Learn about our mission, values, and your role in the initiative.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="p-8 rounded-xl bg-accent/10 border border-accent/30">
                <h3 className="bricolage-grotesque-bold text-2xl text-foreground mb-4">We're Looking For</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">✓</span>
                    <span className="text-foreground/70">Passionate individuals committed to community empowerment</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">✓</span>
                    <span className="text-foreground/70">Skills trainers in vocational and digital areas</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">✓</span>
                    <span className="text-foreground/70">Community engagement specialists</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">✓</span>
                    <span className="text-foreground/70">Administrative and organizational support</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-1">✓</span>
                    <span className="text-foreground/70">Mentors and life coaches</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-accent-foreground bricolage-grotesque-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Apply or Volunteer Now
              </Link>
            </div>
          </div>
        </section>

        {/* Code of Conduct */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="bricolage-grotesque-bold text-4xl text-foreground mb-12">Code of Conduct</h2>
            <p className="text-lg text-foreground/60 max-w-3xl mb-12 bricolage-grotesque">
              To maintain order, excellence, and a healthy working environment, we expect all team members to uphold these standards.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-lg bg-background border border-border">
                <h3 className="bricolage-grotesque-bold text-lg text-foreground mb-3">Expectations</h3>
                <ul className="space-y-2 text-foreground/60 text-sm">
                  <li>• Respect and regard for authority and leadership</li>
                  <li>• Clear communication and timely reporting</li>
                  <li>• Active participation in assigned activities</li>
                  <li>• Commitment and seriousness in your role</li>
                  <li>• Honesty and integrity in all dealings</li>
                  <li>• Positive representation of the initiative</li>
                </ul>
              </div>

              <div className="p-6 rounded-lg bg-background border border-border">
                <h3 className="bricolage-grotesque-bold text-lg text-foreground mb-3">Unacceptable Behaviors</h3>
                <ul className="space-y-2 text-foreground/60 text-sm">
                  <li>• Disrespect toward leaders and team members</li>
                  <li>• Unreported absences or lateness</li>
                  <li>• Failure to participate in assigned duties</li>
                  <li>• Lack of commitment or seriousness</li>
                  <li>• Dishonesty or unethical behavior</li>
                  <li>• Actions that damage organizational image</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
