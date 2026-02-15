import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function FAQs() {
  const faqs = [
    {
      category: 'Programs & Training',
      questions: [
        {
          q: 'What skills do you offer?',
          a: 'We offer training in vocational skills like shoemaking, digital skills such as graphic design and digital marketing, leadership development, business training, and creative writing.',
        },
        {
          q: 'How long are the training programs?',
          a: 'Program duration varies based on the skill and level. Typically, courses range from a few weeks to several months. Contact us for specific details about your desired program.',
        },
        {
          q: 'Is the training free?',
          a: 'We provide free and affordable skill-based training. Some programs may require a nominal fee to support instructors and materials.',
        },
        {
          q: 'Do you offer certificates?',
          a: 'Yes! We provide certificates upon completion of our training programs. We also organize exhibition days for participants to showcase their skills.',
        },
      ],
    },
    {
      category: 'Getting Involved',
      questions: [
        {
          q: 'How do I join as a volunteer?',
          a: 'Fill out our contact form with "Volunteer" selected, and we will reach out to schedule a personal interview to discuss your interests and skills.',
        },
        {
          q: 'What are the requirements to become a staff member?',
          a: 'We look for individuals passionate about community empowerment. Requirements vary by role but generally include commitment, skill in your area, and alignment with our mission.',
        },
        {
          q: 'Can I volunteer remotely?',
          a: 'While many programs require in-person participation, we have opportunities for remote support in communications, administration, and coordination.',
        },
        {
          q: 'Are there age requirements?',
          a: 'Our programs welcome participants of all ages. Specific age considerations vary by program type. Contact us for details.',
        },
      ],
    },
    {
      category: 'Partnerships & Support',
      questions: [
        {
          q: 'Can businesses partner with Feeding Minds Initiative?',
          a: 'Absolutely! We welcome corporate partnerships, sponsorships, and collaborations. Contact us to discuss partnership opportunities.',
        },
        {
          q: 'How can I donate?',
          a: 'You can donate through our website or contact us directly. We appreciate financial contributions, donations of materials, and in-kind support.',
        },
        {
          q: 'Does Feeding Minds Initiative have tax-exempt status?',
          a: 'We are a registered non-profit organization. Please contact us for tax documentation and specific information about donations.',
        },
        {
          q: 'Can schools partner with your organization?',
          a: 'Yes! Our School Outreach Arm specifically focuses on partnerships with secondary and tertiary institutions. Email us to discuss opportunities.',
        },
      ],
    },
    {
      category: 'Operations',
      questions: [
        {
          q: 'Where are your locations?',
          a: 'We have a head office and multiple branch locations. We also conduct outreach programs in schools, churches, and communities.',
        },
        {
          q: 'What is your operating schedule?',
          a: 'Programs run throughout the year with flexible scheduling. Contact us for specific class times and program schedules.',
        },
        {
          q: 'How do you ensure quality training?',
          a: 'Our facilitators are trained professionals with expertise in their fields. We maintain high standards through regular training, feedback, and continuous improvement.',
        },
        {
          q: 'What happens after I complete a course?',
          a: 'We provide ongoing mentorship and support. Many graduates start their own ventures or secure employment. We maintain an alumni network for continued connection.',
        },
      ],
    },
  ]

  return (
    <>
      <Header />
      <main className="bg-background">
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-serif text-6xl sm:text-7xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-foreground/60 max-w-3xl">
              Find answers to common questions about our programs, team, and how to get involved.
            </p>
          </div>
        </section>

        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {faqs.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-16">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-8">{section.category}</h2>

                <div className="space-y-6">
                  {section.questions.map((faq, qIndex) => (
                    <details
                      key={qIndex}
                      className="group p-6 rounded-lg bg-card border border-border hover:border-accent/50 transition-all cursor-pointer"
                    >
                      <summary className="flex justify-between items-start gap-4 font-semibold text-foreground list-none">
                        <span>{faq.q}</span>
                        <span className="text-accent text-2xl group-open:rotate-180 transition-transform flex-shrink-0">+</span>
                      </summary>
                      <p className="text-foreground/60 leading-relaxed mt-4">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-5xl font-bold mb-6">Didn't Find Your Answer?</h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Get in touch with our team directly. We're here to help and answer any questions you have.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
