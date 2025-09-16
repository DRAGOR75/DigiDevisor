// src/components/Logo.jsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function Logo() {
    return (

        <div className="fixed top-6 left-6 z-50">
            <Link href="/" aria-label="Return to Homepage">
                <Image
                    src="/logo-01 (1).png"
                    alt="DigiDevisor Logo"
                    width={40}
                    height={40}
                    priority={true}
                    className="h-10 w-auto"
                />
            </Link>
        </div>
    );
}