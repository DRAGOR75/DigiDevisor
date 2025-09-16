/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'images.unsplash.com' },
            { hostname: 'res.cloudinary.com' },
            { hostname: 'webneel.com' },
            { hostname: 'images.pexels.com' }, // This line is the fix
        ],
    },
};

export default nextConfig;
