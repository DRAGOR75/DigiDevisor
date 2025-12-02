// components/mobile/MobileProductShow.jsx
import Image from "next/image";

const projects = [
    { title: "Neon Finance", category: "Fintech", img: "/path-to-img1.jpg" },
    { title: "Space Xplorer", category: "Web Design", img: "/path-to-img2.jpg" },
    { title: "Art Gallery", category: "App Dev", img: "/path-to-img3.jpg" },
];

export default function MobileProductShow() {
    return (
        <section className="px-6 py-10">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Selected Work</h2>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">2024-25</span>
            </div>

            <div className="flex flex-col gap-8">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#12151c]"
                    >
                        {/* Image Container */}
                        <div className="absolute inset-0 bg-gray-800">
                            {/* <Image src={project.img} fill className="object-cover opacity-80 group-hover:opacity-100 transition duration-500" /> */}
                        </div>

                        {/* Content Overlay - Always visible on mobile */}
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
              <span className="text-sm text-blue-400 font-medium mb-1 block">
                {project.category}
              </span>
                            <h3 className="text-2xl font-semibold text-white">
                                {project.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            <button className="mt-10 w-full py-4 border-t border-white/10 text-gray-400 text-sm tracking-widest uppercase hover:text-white transition">
                View All Projects
            </button>
        </section>
    );
}