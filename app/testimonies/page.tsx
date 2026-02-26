import Header from '@/components/header'
import Footer from '@/components/footer'
import Image from 'next/image'
import { getTestimonies, ITestimony } from '@/app/actions/testimonies'

export default async function TestimoniesPage() {
    const data = await getTestimonies()

    // Separate into Testimonies and Updates
    const testimonies = data.filter((item: ITestimony) => item.type === 'Testimony')
    const updates = data.filter((item: ITestimony) => item.type === 'Update')

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="bricolage-grotesque-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                            Updates <span className="gradient-text">&</span> Testimonies
                        </h1>
                        <p className="text-lg text-foreground/70 max-w-2xl mx-auto bricolage-grotesque">
                            Read about the impact of our programs and stay updated with our latest activities.
                        </p>
                    </div>

                    {/* Updates Section */}
                    {updates.length > 0 && (
                        <div className="mb-20">
                            <h2 className="bricolage-grotesque-bold text-3xl text-foreground mb-8 border-b pb-2">Latest Updates</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {updates.map((update: ITestimony) => (
                                    <div key={update._id} className="glass rounded-2xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                                        {update.image && (
                                            <div className="relative h-48 w-full bg-accent/10">
                                                <Image src={update.image} alt={update.name} fill className="object-cover" />
                                            </div>
                                        )}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <span className="text-accent text-xs font-bold uppercase tracking-wider mb-2">Update</span>
                                            <h3 className="text-xl bricolage-grotesque-bold text-foreground mb-1">{update.name}</h3>
                                            <p className="text-sm font-semibold text-foreground/60 mb-4">{update.role}</p>
                                            <p className="text-foreground/80 text-sm bricolage-grotesque flex-1">{update.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Testimonies Section */}
                    {testimonies.length > 0 && (
                        <div>
                            <h2 className="bricolage-grotesque-bold text-3xl text-foreground mb-8 border-b pb-2">What People Say</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {testimonies.map((testimony: ITestimony) => (
                                    <div key={testimony._id} className="bg-white/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-lg transition-all">
                                        <div className="flex items-center gap-4 mb-4">
                                            {testimony.image ? (
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                                                    <Image src={testimony.image} alt={testimony.name} fill className="object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                                                    <span className="text-accent font-bold text-lg">{testimony.name.charAt(0)}</span>
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="font-bold text-foreground bricolage-grotesque">{testimony.name}</h3>
                                                <p className="text-xs text-foreground/60 font-medium tracking-wide uppercase">{testimony.role}</p>
                                            </div>
                                        </div>
                                        <p className="text-foreground/80 text-sm italic bricolage-grotesque before:content-['\201C'] after:content-['\201D']">
                                            {testimony.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {testimonies.length === 0 && updates.length === 0 && (
                        <div className="text-center text-foreground/50 py-12">
                            Check back later for Testimonies and Updates.
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
