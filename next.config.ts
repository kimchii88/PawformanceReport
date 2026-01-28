/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: { unoptimized: true },
    basePath: "/PawformanceReport",
    trailingSlash: true,
};

module.exports = nextConfig;
