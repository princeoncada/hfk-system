/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['chromadb', 'chromadb-default-embed'],
  },
}
export default nextConfig
