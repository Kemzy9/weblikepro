'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import Nav from '@/app/UI/Nav/page';
import Footer from '@/app/UI/footer/page';
import Image from 'next/image';

interface SearchResultProps {
    title: string;
    url: string;
    description: string;
    imageUrl: string;
    onClick: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({ title, url, description, imageUrl, onClick }) => {
    return (
        <article
            className="search-result flex flex-row-reverse p-4 border-b border-gray-200 cursor-pointer"
            itemScope
            itemType="http://schema.org/Article"
            onClick={onClick}
        >
            <Image
                src={imageUrl}
                alt={title}
                className="w-24 h-24 object-cover mr-4 rounded-lg"
                width={500}
                height={300}
                loading="lazy"
            />
            <div>
                <h2 itemProp="headline">
                    <a
                        href="#"
                        className="title text-blue-600 text-lg font-semibold hover:underline"
                    >
                        {title}
                    </a>
                </h2>
                <p className="url text-sm text-gray-500">{new URL(url).hostname}</p>
                <p className="description text-gray-700 mt-2" itemProp="description">
                    {description}
                </p>
            </div>
        </article>
    );
};

const Aiwebdesign: React.FC = () => {
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
    const [showImage, setShowImage] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const keyword = [
        "AI website generator", "website builder", "no-code website",
        "AI web design", "custom website", "business website",
        "portfolio website", "e-commerce website", "responsive design",
        "modern website", "professional website", "website templates",
        "landing page builder", "website customization", "mobile-friendly website",
        "SEO-friendly website", "fast website", "secure website",
        "website hosting", "domain names", "website maintenance",
        "website analytics", "website optimization", "website security",
        "website backup", "website support", "website migration",
        "best AI website builder 2024",
        "free AI website generator",
        "AI website design tool",
        "automated website creator",
        
        // Question-based Keywords
        "how to create website with AI",
        "which AI website builder is best",
        "AI vs traditional website builder",
          // Feature-based Keywords
    "drag and drop AI website builder",
    "AI website builder with SEO",
    "AI website templates",
    "custom AI website design",
    
    // Industry-specific Keywords
    "AI website builder for small business",
    "AI ecommerce website creator",
    "AI portfolio website maker",
    "AI website builder for startups",
    "website builder",
    "create website",
    "build website",
    "website design",
    "free website builder",
    
    // AI-Specific Keywords (Growing Search Trend)
    "ai website creator",
    "ai website generator",
    "ai website builder free",
    "artificial intelligence website builder",
    
    // Long-tail Keywords (Lower Competition, Higher Conversion)
    "how to create website without coding",
    "best website builder for small business",
    "easy website builder for beginners",
    "create business website free",
    
    // Problem-Solving Keywords (High Intent)
    "fastest way to build website",
    "professional website builder",
    "website builder with free domain",
    
    // Cost-related Keywords
    "affordable AI website builder",
    "free AI website maker",
    "AI website builder pricing",
    
    // Comparison Keywords
    "Wix alternative AI",
    "Shopify vs AI website builder",
    "WordPress alternative AI",
    
    // Location-based Keywords
    "AI website builder USA",
    "AI website creator online",
    "website builder near me",
    
    // Problem-solving Keywords
    "easy website builder for beginners",
    "quick website creation tool",
    "professional website builder AI",
    "no code website builder AI",
        "website development", "website design", "website builder platform"
    ];

    const results = [
        {
            title: (keyword[0] || 'AI website generator') + ' - Create Professional Websites in Minutes with AI',
            url: 'https://www.weblike.pro/',
            description: `Transform your ideas into stunning websites using our advanced ${keyword[1] || 'website builder'}. No coding required - perfect for businesses, creators, and professionals.`,
            imageUrl: '/professional-website.png',
        },
        {
            title: (keyword[2] || 'no-code website') + ' - E-commerce Solutions with Smart AI Integration',
            url: 'https://www.weblike.pro/',
            description: `Launch your online store quickly with our ${keyword[3] || 'AI web design'} platform. Features include smart product organization, secure payments, and inventory management.`,
            imageUrl: '/ecommerce-store.png',
        },
        {
            title: (keyword[4] || 'custom website') + ' - AI-Powered Portfolio Websites for Creatives',
            url: 'https://www.weblike.pro/',
            description: `Showcase your work beautifully with our ${keyword[5] || 'business website'} solutions. Perfect for artists, photographers, designers, and creative professionals.`,
            imageUrl: '/portfolio-template.png',
        },
        {
            title: (keyword[6] || 'portfolio website') + ' - Enterprise-Grade Websites with Advanced Features',
            url: 'https://www.weblike.pro/',
            description: `Build scalable, secure, and powerful websites with our ${keyword[7] || 'e-commerce website'} platform. Includes advanced analytics, user management, and custom integrations.`,
            imageUrl: '/enterprise-website.png',
        },
        {
            title: (keyword[8] || 'responsive design') + ' - Restaurant & Hospitality Website Builder',
            url: 'https://www.weblike.pro/',
            description: `Create appetizing restaurant websites with our ${keyword[9] || 'modern website'} builder. Features online ordering, reservation systems, and menu management powered by AI.`,
            imageUrl: '/restaurant-template.png',
        },
        {
            title: (keyword[10] || 'professional website') + ' - Educational Institution Website Solutions',
            url: 'https://www.weblike.pro/',
            description: `Design comprehensive educational websites with our ${keyword[11] || 'website templates'}. Includes learning management systems, student portals, and course catalogs using our AI tools.`,
            imageUrl: '/education-website.png',
        }
    ];

    const filteredResults = results.filter(result =>
        result.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        result.description.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    // For meta tags, use primary keywords
    const primaryKeywords = keyword.slice(0, 5).join(', '); // Take first 5 keywords
    const pageTitle = `${keyword[0] || 'AI Website Builder'} - Introducing Weblike AI landing page builder`;
    const pageDescription = `Create modern websites in minutes with ${keyword[1] || 'website builder'} - Weblike AI`;

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Weblike Website Builder",
        "applicationCategory": "WebApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "priceValidUntil": "2024-12-31",
            "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250",
            "bestRating": "5",
            "worstRating": "1"
        },
        "description": "Create professional websites without coding using our AI-powered website builder.",
        "image": "https://www.weblike.pro/chat.png",
        "screenshot": "https://www.weblike.pro/twitter-card.png",
        "featureList": [
            "AI-Powered Design",
            "Drag-and-Drop Editor",
            "Free Hosting",
            "Mobile Responsive",
            "SEO Tools"
        ]
    };

    const handleResultClick = (url: string) => {
        setSelectedUrl(url);
        setShowImage(true); 
    };

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content={keyword.join(', ')} />
                <link rel="canonical" href="https://www.weblike.pro" />
                
                {/* OpenGraph Tags */}
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.weblike.pro/blog" />
                
                {/* Twitter Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                
                <script type="application/ld+json">
                    {JSON.stringify({
                        ...schemaMarkup,
                        keywords: primaryKeywords
                    })}
                </script>
            </Head>
            <Nav />
            <div className="flex max-w-6xl mx-auto my-10">
                <aside className="w-1/4 pr-4">
                    <nav aria-label="Category" className="bg-gray-100 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Categories</h2>
                       
                    </nav>
                </aside>
                <main className="w-3/4 pl-4">
                    <h1 className="text-3xl font-bold mb-6">Landing Page Inspirations</h1>
                    <input
                        type="text"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                        placeholder="Search..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    {filteredResults.map((result, index) => (
                        <SearchResult
                            key={index}
                            title={result.title}
                            url={result.url}
                            description={result.description}
                            imageUrl={result.imageUrl}
                            onClick={() => handleResultClick(result.url)}
                        />
                    ))}
                    {showImage && selectedUrl && (
                        <div className="image-popup">
                            <Image src={selectedUrl} alt="Selected" />
                            <button onClick={() => setShowImage(false)}>Close</button>
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Aiwebdesign;



//in in term keyword change earch randomized keyword
