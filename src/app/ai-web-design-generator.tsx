import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const AIWebdesign: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /homepage after a short delay
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000); // Redirect after 3 seconds

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  const keyword = "WordPress website design, AI website design for SaaS, website design free, AI website design, business website design, AIsports website design, website design for education, custom website design";
const pageTitle = `Design Website With Webllix AI | ${keyword}`;
const pageDescription = `Effortlessly create stunning AI websites |${keyword} AI-powered web design generator. Get started for free!`;





  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={keyword} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
  
        <link rel="canonical" href="https://www.webllix.com/UI/gallery/landing-page" />
      </Head>
   
    </>
  );
};

export default AIWebdesign;
