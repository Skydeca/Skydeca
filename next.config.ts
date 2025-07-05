// next.config.ts
const nextConfig = {
  // other config options...
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    localeDetection: false, // 👈 disables automatic redirects
  },
}

export default nextConfig
