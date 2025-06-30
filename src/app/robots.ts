import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/cart/',
          '/checkout/',
          '/account/',
          '/verify-email/',
          '/reset-password/',
        ],
      },
    ],
    sitemap: 'https://shoply.com/sitemap.xml',
    host: 'https://shoply.com',
  }
}
