/** @type {import('next').NextConfig} */
const repo = "PawformanceReport";
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    output: "export",
    images: { unoptimized: true },
    trailingSlash: true,

    // Only needed for GitHub Pages in production
    basePath: isProd ? `/${repo}` : "",
    assetPrefix: isProd ? `/${repo}/` : "",
};

module.exports = nextConfig;
