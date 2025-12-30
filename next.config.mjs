/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Vercel otimiza imagens automaticamente
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Habilita compressão gzip/brotli (Vercel faz automaticamente)
  compress: true,
  // Gera sitemap automático
  generateBuildId: async () => {
    return 'conecta-saude-' + new Date().getTime()
  },
}

export default nextConfig