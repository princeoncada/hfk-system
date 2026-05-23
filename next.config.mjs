/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['framer-motion'],
  experimental: {
    serverComponentsExternalPackages: [
      'chromadb',
      'chromadb-default-embed',
      'openai',
    ],
  },
}
export default nextConfig
