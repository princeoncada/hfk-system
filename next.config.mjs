/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      'chromadb',
      'chromadb-default-embed',
      'openai',
    ],
  },
}
export default nextConfig
