/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/hosagunda',
  reactStrictMode: true,
  images: {
    // Allow remote plantation imagery / YouTube posters if a config points to them.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
