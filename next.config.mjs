/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three'],
    env: {
        API_URL: process.env.API_URL
    }
};

export default nextConfig;
