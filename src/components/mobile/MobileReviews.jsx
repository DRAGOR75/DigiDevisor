// components/mobile/MobileReviews.jsx
import { Quote } from "lucide-react"; // Assuming you are using lucide-react for icons

const reviews = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "CEO, Apex Fintech",
        text: "DigiDevisor completely transformed our digital presence. The new platform is faster, sleeker, and our user engagement has doubled since launch.",
        initial: "S",
    },
    {
        id: 2,
        name: "Marcus Chen",
        role: "Founder, Orbit Studio",
        text: "Their eye for design is unmatched. They took our vague concepts and turned them into a stunning, functional reality that perfectly captures our brand.",
        initial: "M",
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        role: "CTO, Aura Health",
        text: "Professional, timely, and incredibly talented. The mobile experience they built for us is seamless and intuitive. Highly recommend.",
        initial: "E",
    },
];

export default function MobileReviews() {
    return (
        <section className="py-16 relative overflow-hidden">
            {/* Background accent glow */}
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-900/20 blur-[100px] pointer-events-none" />

            {/* Section Header */}
            <div className="px-6 mb-10 text-center">
                <h2 className="text-3xl font-extrabold mb-2">
                    What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Clients Say</span>
                </h2>
                <p className="text-gray-400 text-sm">Trusted partners in digital innovation.</p>
            </div>

            {/* Carousel Container with CSS Scroll Snap */}
            {/* 'no-scrollbar' is a custom utility class we need to add (see step 2) */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-8 no-scrollbar">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        // min-w-[85%] makes the next card slightly visible, encouraging a swipe
                        className="snap-center min-w-[85%] flex-shrink-0"
                    >
                        <div className="h-full p-6 rounded-3xl border border-white/10 bg-[#12151c]/80 backdrop-blur-md flex flex-col relative group transition-all duration-300 hover:border-white/20">

                            {/* Subtle top gradient border accent */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent group-hover:via-blue-400 transition-all" />

                            {/* Large Quote Icon Accent */}
                            <Quote className="absolute top-6 right-6 text-white/5 w-12 h-12" />

                            {/* Review Text */}
                            <blockquote className="flex-grow mb-8 relative z-10">
                                <p className="text-lg text-gray-300 leading-relaxed italic">
                                    &quot;{review.text}&quot;
                                </p>
                            </blockquote>

                            {/* Reviewer Info */}
                            <div className="flex items-center gap-4">
                                {/* Avatar Placeholder with Gradient */}
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center shadow-lg">
                                    <span className="text-lg font-bold text-white">{review.initial}</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-base">{review.name}</h4>
                                    <p className="text-sm text-gray-500">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Simple visual indicator dots (Optional, adds a nice touch) */}
            <div className="flex justify-center gap-2 mt-2">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full ${i === 0 ? 'w-6 bg-blue-400' : 'w-1.5 bg-white/20'}`}></div>
                ))}
            </div>
        </section>
    );
}