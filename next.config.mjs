/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // For static export (e.g., for GitHub Pages)
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // For GitHub Pages deployment, usually disable Next.js default image optimization
  },
  // If your GitHub Pages site is accessed via a subpath (e.g., your-username.github.io/your-repo/)
  // you might need to set basePath
  // basePath: '/your-repository-name', 
};

export default nextConfig; 