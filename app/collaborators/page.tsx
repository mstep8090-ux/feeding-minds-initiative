import Header from '@/components/header'
import Footer from '@/components/footer'
import Image from 'next/image'
import { getCollaborators, ICollaborator } from '@/app/actions/collaborators'

export default async function CollaboratorsPage() {
    const collaborators = await getCollaborators()

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="bricolage-grotesque-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
                            Our <span className="gradient-text">Collaborators & Advisors</span>
                        </h1>
                        <p className="text-lg text-foreground/70 max-w-2xl mx-auto bricolage-grotesque">
                            Meet the visionary mentors, partners, and advisors who guide the Feeding Minds Initiative towards greatness.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {collaborators.map((collaborator: ICollaborator) => (
                            <div key={collaborator._id} className="glass rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                                <div className="h-64 relative overflow-hidden bg-accent/5">
                                    {collaborator.image ? (
                                        <Image
                                            src={collaborator.image}
                                            alt={collaborator.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-accent/20">
                                            <span className="text-6xl max-w-full overflow-hidden">{collaborator.name.charAt(0)}</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <h3 className="bricolage-grotesque-bold text-2xl">{collaborator.name}</h3>
                                        <p className="text-accent text-sm font-semibold tracking-wide">{collaborator.role}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-foreground/70 text-sm leading-relaxed bricolage-grotesque">
                                        {collaborator.bio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {collaborators.length === 0 && (
                        <div className="text-center text-foreground/50 py-12">
                            Check back later to meet our Collaborators and Advisors.
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
