// components/mobile/MobileClients.jsx
export default function MobileClients() {
    return (
        <section className="py-10 border-y border-white/5 bg-white/5">
            <p className="text-center text-gray-500 text-sm mb-6">Trusted by Innovative Teams</p>

            {/* Simple CSS Marquee Container */}
            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee flex gap-12 whitespace-nowrap px-6">
                    {/* Repeat your logos twice to ensure seamless loop */}
                    {["Google", "Amazon", "Netflix", "Spotify", "Stripe", "Google", "Amazon"].map((client, i) => (
                        <span key={i} className="text-2xl font-bold text-gray-600 uppercase">
              {client}
            </span>
                    ))}
                </div>
            </div>

            {/* Add this to your globals.css for the animation to work:
         @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
         .animate-marquee { animation: marquee 20s linear infinite; }
      */}
        </section>
    );
}