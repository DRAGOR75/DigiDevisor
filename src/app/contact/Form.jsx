"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Mail, Smartphone, MapPin, Linkedin, Instagram, Facebook, ChevronDown } from "lucide-react";

// --- Floating Orb Component ---
const FloatingOrb = () => {
    const orbRef = useRef(null);
    const quickToX = useRef(null);
    const quickToY = useRef(null);
    useEffect(() => {
        const orb = orbRef.current; if (!orb) return;
        quickToX.current = gsap.quickTo(orb, "x", { duration: 0.8, ease: "power3" });
        quickToY.current = gsap.quickTo(orb, "y", { duration: 0.8, ease: "power3" });
        let idleTimeout;
        const startIdleMovement = () => {
            gsap.to(orb, {
                x: `+=${gsap.utils.random(-100, 100, 1)}`, y: `+=${gsap.utils.random(-100, 100, 1)}`,
                duration: gsap.utils.random(6, 12), ease: "sine.inOut", repeat: -1, yoyo: true,
            });
        };
        const handleMouseMove = (e) => {
            gsap.killTweensOf(orb); quickToX.current(e.clientX); quickToY.current(e.clientY);
            clearTimeout(idleTimeout); idleTimeout = setTimeout(startIdleMovement, 2000);
        };
        window.addEventListener("mousemove", handleMouseMove); startIdleMovement();
        return () => { window.removeEventListener("mousemove", handleMouseMove); clearTimeout(idleTimeout); gsap.killTweensOf(orb); };
    }, []);
    return (<div ref={orbRef} className="fixed top-0 left-0 w-80 h-80 rounded-full pointer-events-none -z-10" style={{ background: "radial-gradient(circle at center, rgba(124, 200, 249, 0.4) 0%, rgba(162, 89, 255, 0.2) 80%)", filter: "blur(60px)", transform: "translate(-50%, -50%)", mixBlendMode: "soft-light" }} aria-hidden="true" />);
};


const faqs = [ { question: "What is the typical timeline for a project?", answer: "Project timelines vary based on complexity. A standard website may take 4-6 weeks, while a full digital marketing campaign setup can take 2-4 weeks. We'll provide a detailed timeline after our initial discovery call." }, { question: "How do you handle project communication?", answer: "We believe in transparent communication. You'll have a dedicated project lead and regular check-ins via your preferred method (email, call, or Slack). We also provide status reports to keep you updated." }, { question: "What are your payment terms?", answer: "We typically require a 50% upfront deposit to begin work, with the remaining 50% due upon project completion and your final approval. For ongoing services, we offer monthly retainer plans." } ];


const FormInput = ({ name, type = "text", placeholder, value, onChange, children }) => {
    const commonClasses = "w-full p-4 bg-white/5 border-2 border-white/10 rounded-lg text-white placeholder-white/40 outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30";
    if (type === 'textarea') {
        return <textarea name={name} required value={value} onChange={onChange} placeholder={placeholder} className={`${commonClasses} min-h-[150px] resize-y`} />;
    }
    if (type === 'select') {
        return (
            <div className="relative">
                <select name={name} required value={value} onChange={onChange} className={`${commonClasses} appearance-none ${!value && 'text-white/40'}`}>
                    {children}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
            </div>
        );
    }
    return <input type={type} name={name} required value={value} onChange={onChange} placeholder={placeholder} className={commonClasses} />;
};


const ContactPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", service: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ submitted: false, error: false, message: "" });
    const [openFaq, setOpenFaq] = useState(null);
    const pageRef = useRef(null);

    useEffect(() => {
    }, []);

    const handleInputChange = (e) => { setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value })); };
    const handleSubmit = async (e) => {
        e.preventDefault(); setIsSubmitting(true); setSubmitStatus({ submitted: false, error: false, message: "" });
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitStatus({ submitted: true, error: false, message: "🎉 Message sent! We'll be in touch soon." });
            setFormData({ name: "", email: "", company: "", phone: "", service: "", message: "" });
        } catch (error) { setSubmitStatus({ submitted: false, error: true, message: "⚠️ Something went wrong. Please try again." }); } finally {
            setIsSubmitting(false); setTimeout(() => setSubmitStatus({ submitted: false, error: false, message: "" }), 5000);
        }
    };

    return (
        <div ref={pageRef} className="bg-[#0a0d13]">
            <FloatingOrb />
            <section className="relative min-h-screen flex flex-col items-center justify-center px-5 py-20 md:py-24 overflow-hidden">
                <div className="relative z-10 w-full max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl shadow-lg p-8 flex flex-col">
                            <div>
                                <h2 className="text-3xl font-bold mb-3 text-white">Contact Details</h2>
                                <p className="text-base text-blue-200/80 mb-8">Find us here or drop us a line. We respond to all inquiries within one business day.</p>
                                <div className="space-y-6 mb-8">
                                    <div className="flex items-start space-x-4"><Mail className="w-5 h-5 mt-1 text-yellow-300 flex-shrink-0" /><a href="mailto:info@digidevisor.com" className="text-white/80 hover:text-white transition-colors">info@digidevisor.com</a></div>
                                    <div className="flex items-start space-x-4"><Smartphone className="w-5 h-5 mt-1 text-blue-300 flex-shrink-0" /><a href="tel:+917870791893" className="text-white/80 hover:text-white transition-colors">+91 7870791893</a></div>
                                    <div className="flex items-start space-x-4"><MapPin className="w-5 h-5 mt-1 text-purple-300 flex-shrink-0" /><span className="text-white/60">Jamshedpur, Jharkhand, India</span></div>
                                </div>
                                <div className="pt-8 border-t border-white/10">
                                    <h3 className="text-xl font-semibold text-white mb-4">Office Hours (IST)</h3>
                                    <p className="text-white/60">Monday - Saturday: 10:00 AM - 7:00 PM</p>
                                    <p className="text-white/60">Sunday: Closed</p>
                                </div>
                            </div>
                            <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-center space-x-6">
                                <a href="https://www.linkedin.com/company/digi-devisor/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors"><Linkedin /></a>
                                <a href="https://www.instagram.com/digi_devisor?igsh=ajcyZG96MXMxaWd2" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors"><Instagram /></a>
                                <a href="https://www.facebook.com/share/1BMnfaWTie" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors"><Facebook /></a>
                            </div>
                        </div>
                        <div className="lg:col-span-3 bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-8 md:p-10">
                            {submitStatus.submitted || submitStatus.error ? (<div className={`p-10 rounded-2xl text-center text-white font-bold text-xl shadow-lg transition-all duration-500 ${submitStatus.error ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-green-400 to-emerald-400'}`}>{submitStatus.message}</div>) : (<form className="w-full space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><FormInput name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} />
                                    <FormInput name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput name="company" placeholder="Company Name (Optional)" value={formData.company} onChange={handleInputChange} />
                                    <FormInput name="phone" type="tel" placeholder="Phone Number (Optional)" value={formData.phone} onChange={handleInputChange} />
                                </div>
                                <FormInput name="service" type="select" value={formData.service} onChange={handleInputChange}>
                                    <option value="" disabled>Select Service</option>
                                    <option value="digital-marketing">Digital Marketing</option>
                                    <option value="web-development">Web Development</option>
                                    <option value="video-production">Video Production</option>
                                    <option value="brand-strategy">Brand Strategy</option>
                                    <option value="other">Other Inquiry</option>
                                </FormInput>
                                <FormInput name="message" type="textarea" placeholder="How can we help?" value={formData.message} onChange={handleInputChange} />
                                <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-lg text-black font-bold uppercase tracking-wider bg-gradient-to-r from-yellow-300 to-orange-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-yellow-400/40 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed group">
                                    <span className="group-hover:tracking-widest transition-all duration-300">{isSubmitting ? "Submitting..." : "Send Inquiry"}</span>
                                </button>
                            </form>)}
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative z-10 w-full max-w-4xl mx-auto py-20 px-5">
                <div className="text-center mb-12"><h2 className="text-4xl font-extrabold text-white mb-3">Frequently Asked Questions</h2><p className="text-lg text-gray-400">Quick answers to common questions about our process and services.</p></div>
                <div className="space-y-4">{faqs.map((faq, index) => (<div key={index} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex justify-between items-center text-left p-6"><span className="text-lg font-medium text-white">{faq.question}</span><ChevronDown className={`w-6 h-6 text-blue-300 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} /></button><div className="grid transition-all duration-500 ease-in-out" style={{ gridTemplateRows: openFaq === index ? '1fr' : '0fr' }}><div className="overflow-hidden"><p className="text-gray-300 p-6 pt-0">{faq.answer}</p></div></div></div>))}</div>
            </section>
        </div>
    );
};

export default ContactPage;