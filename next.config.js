/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['replicate.delivery'], // Allowed image domains
  },
  async rewrites() {
    return [
      // Exclude /sitemap.xml from being redirected
    
   
  
        {
        source: '/weblik/builder',
        destination: '/',
      },
     
      // Redirect all other routes to /not-found
    
    ];
  },
};

module.exports = nextConfig;
