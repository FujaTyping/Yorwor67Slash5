/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", swcMinify: true,
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
