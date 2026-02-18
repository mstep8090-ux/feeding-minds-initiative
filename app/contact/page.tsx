'use client'

import React from "react"

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { submitContact } from '@/app/actions/contact'

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interestType: 'volunteer',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for reaching out! We will get back to you soon.')
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        interestType: 'volunteer',
        message: '',
      })
      setIsSubmitting(false)

      setTimeout(() => setSubmitMessage(''), 5000)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'admin@feedingmindsinitiative.com',
      link: 'mailto:admin@feedingmindsinitiative.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '08073810811, 07038258161, 07040826955',
      link: 'tel:08073810811',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Head Office & Multiple Branch Locations',
      link: '#',
    },
    {
      icon: MapPin,
      title: 'Office 1',
      content: 'No 10, Iyiomo lane, off Agbonma junction, opp Matice, Ekewan Road, Benin City, Edo State',
      link: '#',
    },
    {
      icon: MapPin,
      title: 'Office 2',
      content: 'Benin Shagamu Express way, opp Agen junction, Oluku Isihor, Benin City',
      link: '#',
    },
  ]

  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Page Header */}
        <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/25 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float" />
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float" style={{ animationDelay: '1s' }} />
          </div>
          <div className="max-w-6xl mx-auto relative z-10 animate-fade-in-up">
            <h1 className="bricolage-grotesque-extrabold text-6xl sm:text-7xl text-foreground mb-6 leading-tight">
              Get <span className="gradient-text">In Touch</span>
            </h1>
            <p className="text-xl text-foreground/60 max-w-3xl bricolage-grotesque">
              Ready to get involved? Have questions? We'd love to hear from you. Reach out to our team.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto mb-24">
            <div className="grid md:grid-cols-3 gap-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <a
                    key={index}
                    href={info.link}
                    className="group relative p-8 rounded-2xl glass hover:glass-light transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-fade-in-up overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/30 to-secondary/30 flex items-center justify-center mb-6 group-hover:from-accent/50 group-hover:to-secondary/50 transition-all duration-300">
                        <Icon size={28} className="text-accent" />
                      </div>
                      <h3 className="bricolage-grotesque-bold text-xl text-foreground mb-3 group-hover:gradient-text transition-all">{info.title}</h3>
                      <p className="text-foreground/70 bricolage-grotesque leading-relaxed">{info.content}</p>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-3xl p-12 md:p-16 animate-fade-in-up">
              <h2 className="bricolage-grotesque-bold text-3xl text-foreground mb-8">
                Send us a <span className="gradient-text">Message</span>
              </h2>

              {submitMessage && (
                <div className="mb-6 p-4 rounded-lg bg-green-100 border border-green-300 text-green-800">
                  {submitMessage}
                </div>
              )}

              <form action={async (formData) => {
                setIsSubmitting(true)
                // @ts-ignore
                const result = await submitContact(Object.fromEntries(formData))
                setIsSubmitting(false)

                if (result.success) {
                  setSubmitMessage('Thank you for reaching out! We will get back to you soon.')
                  setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    interestType: 'volunteer',
                    message: '',
                  })
                  setTimeout(() => setSubmitMessage(''), 5000)
                } else {
                  setSubmitMessage('Something went wrong. Please try again.')
                }
              }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block bricolage-grotesque-semibold text-sm text-foreground mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all bricolage-grotesque"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block bricolage-grotesque-semibold text-sm text-foreground mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all bricolage-grotesque"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="interestType" className="block text-sm font-semibold text-foreground mb-2">
                    How can we help? *
                  </label>
                  <select
                    id="interestType"
                    name="interestType"
                    value={formData.interestType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="volunteer">Volunteer</option>
                    <option value="join-programs">Join a Program</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="donation">Donate</option>
                    <option value="inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 resize-none"
                    placeholder="Tell us about your interest..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3.5 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-12">Frequently Asked Questions</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-background border border-border">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">How do I join as a volunteer?</h3>
                  <p className="text-foreground/60">
                    Simply fill out the contact form above with "Volunteer" selected. We'll reach out to schedule an interview where we discuss your interests and skills.
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-background border border-border">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">What programs are available?</h3>
                  <p className="text-foreground/60">
                    We offer skills training in graphic design, shoemaking, and other vocational crafts. Check our Programs page for detailed information on all available programs.
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-background border border-border">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">Is the training free?</h3>
                  <p className="text-foreground/60">
                    We provide free and affordable skill-based training to make education accessible. Contact us for specific details on pricing and scholarships.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-background border border-border">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">How long are the courses?</h3>
                  <p className="text-foreground/60">
                    Course duration varies depending on the skill and program type. Our team will provide specific timelines when you reach out or attend our exhibition sessions.
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-background border border-border">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">Can I volunteer from a distance?</h3>
                  <p className="text-foreground/60">
                    While many of our programs require in-person participation, we have opportunities for remote support and coordination. Let us know your location and interests!
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-background border border-border">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">How can businesses partner with us?</h3>
                  <p className="text-foreground/60">
                    We welcome partnerships! Select "Partnership Opportunity" in the contact form or email us directly to discuss collaboration possibilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-5xl font-bold mb-6">Let's Build Something Together</h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Whether you're looking to learn, volunteer, or partner with us, we're excited to connect and create impact together.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
