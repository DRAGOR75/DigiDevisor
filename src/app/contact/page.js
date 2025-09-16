import Form from "@/app/contact/Form";
import FloatingOrb from "@/app/contact/FloatingOrb";
import Footer from "@/components/Footer";
import { Mail, Smartphone } from "lucide-react";

export default function Contact() {
    return (

        <main className="relative min-h-screen bg-[#0a0d13] text-white overflow-hidden">

            <FloatingOrb />

            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-24 md:py-32">

                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-400 to-yellow-300">

                        Let&apos;s Start a Conversation
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">

                        Whether you have a question, a project proposal, or just want to say hello, we&apos;re here to listen. Fill out the form below or reach out to us directly.
                    </p>
                </div>

                <div className="w-full max-w-3xl mx-auto">
                    <Form />
                </div>

                <div className="text-center mt-16 border-t border-white/10 pt-10">
                    <h3 className="text-xl font-semibold text-white mb-4">Prefer a more direct approach?</h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-gray-300">
                        <a href="mailto:info@digidevisor.com" className="flex items-center gap-3 hover:text-white transition-colors">
                            <Mail className="w-5 h-5 text-yellow-300" />
                            <span>info@digidevisor.com</span>
                        </a>
                        <a href="tel:+917870791893" className="flex items-center gap-3 hover:text-white transition-colors">
                            <Smartphone className="w-5 h-5 text-blue-300" />
                            <span>+91 7870791893</span>
                        </a>
                    </div>
                </div>

            </div>

            <Footer />

        </main>
    );
}