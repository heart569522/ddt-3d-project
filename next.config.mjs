/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three'],
    env: {
        NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL // สำหรับ fetch client component
    }
};

export default nextConfig;
