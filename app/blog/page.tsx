import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { ArrowRight, Calendar, User } from 'lucide-react'

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: 'The Power of Practical Skills in Youth Empowerment',
      excerpt: 'Discover how hands-on skill training transforms lives and creates opportunities for sustainable futures.',
      date: '2024-02-10',
      author: 'Sarah Johnson',
      category: 'Education',
    },
    {
      id: 2,
      title: 'Community Impact: School Outreach Success Stories',
      excerpt: 'Read inspiring stories of students who have transformed their futures through our school outreach programs.',
      date: '2024-02-05',
      author: 'Michael Okafor',
      category: 'Impact',
    },
    {
      id: 3,
      title: 'Building Self-Reliance: The Graphic Design Journey',
      excerpt: 'How digital skills training is opening doors for young professionals in the creative industry.',
      date: '2024-01-28',
      author: 'David Chen',
      category: 'Skills',
    },
    {
      id: 4,
      title: 'Mentorship Matters: Guiding the Next Generation',
      excerpt: 'The role of mentorship in bridging the gap between education and real-world opportunity.',
      date: '2024-01-20',
      author: 'Amara Mensah',
      category: 'Mentorship',
    },
  ]

  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Page Header */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-serif text-6xl sm:text-7xl font-bold text-foreground mb-4">Blog</h1>
            <p className="text-xl text-foreground/60 max-w-3xl">
              Stories, insights, and updates from the Feeding Minds Initiative community.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="group p-8 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-lg transition-all">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">{post.category}</span>
                      </div>
                      <h2 className="font-serif text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-foreground/60 leading-relaxed mb-6">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-foreground/50 mb-4">
                        <span className="flex items-center gap-2">
                          <Calendar size={16} />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-2">
                          <User size={16} />
                          {post.author}
                        </span>
                      </div>
                      <Link href={`/blog/${post.id}`} className="text-accent font-semibold inline-flex items-center gap-2 group/link">
                        Read More <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-5xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest stories, updates, and opportunities from Feeding Minds Initiative.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground text-primary placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <button type="submit" className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
