// components/mobile/MobileReviews.jsx
import Image from "next/image";
import { MessageSquare, Star } from "lucide-react";

const testimonials = [
    {
        image: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1757925472/WhatsApp_Image_2020-07-23_at_2_19_21_AM_biaez5.avif",
        feedback: "There is absolutely no doubt in my mind that without our platform, I would not have been able to make the jump to building my dream agency. The work I got through our service made it possible for me to have something to build on.",
        author: "Rahul Kumar Gupta",
        company: "Agrasen Ayurved",
        role: "CEO & Founder",
    },
    {
        image: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1757925459/WhatsApp2525202020-07-23_25_tesfzt.avif",
        feedback: "If I've made one investment that's truly paid off, it would be paying for Pro. Love the projects that I get from there.",
        author: "Mani singh",
        company: "Mani infra Services",
        role: "Owner",
    },
    {
        image: "",
        feedback: "Because of this platform I managed to increase my profit more than 10 times in just a year. It was the most amazing experience of my life and I am still living it!",
        author: "Marcus Rodriguez",
        company: "StartupLab",
        role: "Founder",
    },
    {
        image: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1757925454/WhatsApp202020-08-05205_3_hzlpkl.avif",
        feedback: "My business has expanded and i have larger client base than before thanks to the brilliant team of DIGI DEVISOR",
        author: "Somyaroop Das",
        company: "Assocated Consuntalt",
        role: "Product Manager",
    },
    {
        image: "",
        feedback: "90% of my contracts come from clients who have seen my work on this platform.",
        author: "James Wilson",
        company: "NextGen Studios",
        role: "VP Engineering",
    },
];

// Helper to get initials
const getInitials = (name) => {
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

export default function MobileReviews() {
    return (
        <section className="py-16 bg-[#0a0d13] relative overflow-hidden">
            {/* Background accent glow */}
            <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-blue-900/20 blur-[80px] pointer-events-none" />

            {/* Section Header */}
            <div className="px-6 mb-10 text-center">
                <h2 className="text-3xl font-extrabold mb-3 text-white">
                    What Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Clients Say</span>
                </h2>
                <div className="flex justify-center items-center gap-2 text-sm text-gray-400">
                    <div className="flex text-yellow-400">
                        <Star className="w-4 h-4 fill-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400" />
                    </div>
                    <span>5.0 Average Rating</span>
                </div>
            </div>

            {/* Swipeable Carousel */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-8 no-scrollbar">
                {testimonials.map((t, i) => (
                    <div
                        key={i}
                        className="snap-center min-w-[85%] flex-shrink-0"
                    >
                        <div className="h-full bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm relative flex flex-col justify-between">
                            {/* Quote Icon */}
                            <MessageSquare className="absolute -top-3 -left-2 w-8 h-8 text-blue-500/20 fill-blue-500/20" />

                            <blockquote className="relative z-10 mb-6">
                                <p className="text-gray-300 leading-relaxed italic">
                                    "{t.feedback}"
                                </p>
                            </blockquote>

                            {/* Author Info */}
                            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                {t.image ? (
                                    <Image
                                        src={t.image}
                                        alt={t.author}
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover w-12 h-12 border border-white/10"
                                    />
                                ) : (
                                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-blue-900/50 rounded-full text-blue-300 font-bold border border-white/10">
                                        {getInitials(t.author)}
                                    </div>
                                )}
                                <div>
                                    <h4 className="text-white font-bold text-sm">{t.author}</h4>
                                    <p className="text-xs text-gray-500">{t.company}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Simple Dots Indicator */}
            <div className="flex justify-center gap-2 mt-2">
                <div className="w-12 h-1 rounded-full bg-blue-500"></div>
                <div className="w-2 h-1 rounded-full bg-white/20"></div>
                <div className="w-2 h-1 rounded-full bg-white/20"></div>
            </div>
        </section>
    );
}