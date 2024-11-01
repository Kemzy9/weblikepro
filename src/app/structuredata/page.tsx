import React from 'react';
import Head from 'next/head';

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Weblike ai ",
    "applicationCategory": "WebApplication",
    "operatingSystem": "Web",
    "url": "https://weblike.ai",
    "image": "https://weblike.ai/twitter-card.png",
    "description": "AI-powered landing page builder that helps create professional, high-converting pages instantly without coding.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    },
    "creator": {
      "@type": "Organization",
      "name": "Weblike ai",
      "url": "https://weblike.ai/twitter-card.png",
      "logo": "https://weblike.ai/logo.png"
    },
    "featureList": [
      "AI-powered page generation",
      "Custom design templates",
      "Instant page creation",
      "Conversion optimization"
    ]
  };

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Head>
  );
};

export default StructuredData;
