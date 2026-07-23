/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,

  images: {
    unoptimized: true,
  },
  
  // For example: if repo is "mikoajinurachman/portfolio" then basePath: "/portfolio"
  // basePath: "/portfolio",
}

export default nextConfig
