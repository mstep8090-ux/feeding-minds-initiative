import Header from '@/components/header'
import Footer from '@/components/footer'

export default function Terms() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-6xl font-bold text-foreground mb-4">Terms & Conditions</h1>
            <p className="text-lg text-foreground/60">Last updated: February 2024</p>
          </div>
        </section>

        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
            <h2 className="font-serif text-3xl font-bold text-foreground mt-8 mb-4">1. Agreement to Terms</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="font-serif text-3xl font-bold text-foreground mt-8 mb-4">2. Use License</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-foreground/70 space-y-2 mb-4">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on our website</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            </ul>

            <h2 className="font-serif text-3xl font-bold text-foreground mt-8 mb-4">3. Disclaimer</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              The materials on our website are provided on an 'as is' basis. Feeding Minds Initiative makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2 className="font-serif text-3xl font-bold text-foreground mt-8 mb-4">4. Limitations</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              In no event shall Feeding Minds Initiative or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
            </p>

            <h2 className="font-serif text-3xl font-bold text-foreground mt-8 mb-4">5. Accuracy of Materials</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              The materials appearing on our website could include technical, typographical, or photographic errors. Feeding Minds Initiative does not warrant that any of the materials on our website are accurate, complete, or current.
            </p>

            <h2 className="font-serif text-3xl font-bold text-foreground mt-8 mb-4">6. Contact Information</h2>
            <p className="text-foreground/70 leading-relaxed">
              If you have any questions about these Terms & Conditions, please contact us at admin@feedingmindsinitiative.com
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
