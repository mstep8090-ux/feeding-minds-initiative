import Header from '@/components/header'
import Footer from '@/components/footer'

export default function Privacy() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-6xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-lg text-foreground/60">Last updated: February 2024</p>
          </div>
        </section>

        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
            <h2 className="font-serif text-3xl font-bold text-foreground mt-8 mb-4">1. Introduction</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Feeding Minds Initiative ("we," "us," or "our") operates the feedingmindsinitiative.org website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.
            </p>

            <h2 className="font-serif text-3xl font-bold text-foreground mt-8 mb-4">2. Data Collection</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              We collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-foreground/70 space-y-2 mb-4">
              <li>Fill out our contact forms</li>
              <li>Apply to join our programs or volunteer</li>
              <li>Subscribe to our newsletter</li>
              <li>Communicate with us via email</li>
            </ul>

            <h2 className="font-serif text-3xl font-bold text-foreground mt-8 mb-4">3. Use of Data</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              We use the collected data for various purposes:
            </p>
            <ul className="list-disc list-inside text-foreground/70 space-y-2 mb-4">
              <li>To provide and maintain our services</li>
              <li>To notify you about changes to our programs</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so we can improve our services</li>
              <li>To monitor the usage of our services</li>
            </ul>

            <h2 className="font-serif text-3xl font-bold text-foreground mt-8 mb-4">4. Data Security</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
            </p>

            <h2 className="font-serif text-3xl font-bold text-foreground mt-8 mb-4">5. Contact Us</h2>
            <p className="text-foreground/70 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at info@feedingmindsinitiative.org
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
