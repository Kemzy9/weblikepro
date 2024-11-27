import React from 'react';
import Head from 'next/head';

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Weblikepro ",
    "applicationCategory": "WebApplication",
    "operatingSystem": "Web",
    "url": "https://weblike.pro",
    "image": "https://weblike.pro/twitter-card.png",
    "description": "Build Website wiht AI Just by clicking Let AI Create A Webiste for You .",
    "offers": {
      "@type": "Offer",
      "price": "9",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "160"
    },
    "creator": {
      "@type": "Organization",
      "name": "Weblikepro",
      "url": "https://weblike.pro/twitter-card.png",
      "logo": "https://weblike.pro/logo.png"
    },
    "featureList": [
      "AI-powred Website maker",
      "Create Custome Website With AI",
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
