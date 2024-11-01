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
    const keyword= ["free ai website","best ai ","Ai webdesign",
         "Ai webdesign generator",  "drag and drop", 
         "free drag and drop ", "best drag and drop",
          "drag and drop","easiest website builder for",
          "cheapest website","easy website builder for ",
          "best website builder for","what is the best website",
          "best ecommerce website builder for","free website builder for"
          ,"best free website builder for ","ai","free ai","best ai ","church","hotel","education","resturant","Saas",
          "durable","durable ai website builder","responsive professional","professional ","most professional","interactive ","best interactive ","Creative ","latest","modern","minimalist modern","clean modern","simple modern website design",];
          
          



    const results = [
        {
            title: `${keyword} website builder software`,
            url: 'https://www.webllix.com/blog/Introducing-website-builder',
            description: `${keyword} Effortlessly create stunning websites with AI  website builder software—perfect for any skill level.`,
            imageUrl: '/education.png', 
        },
        {
            title: `${keyword} Landing page design by webllix `,
            url: 'https://www.webllix.com/blog/ai-web-design',
            description: `${keyword}Design eye-catching landing pages that convert visitors into customers with our Ai Model to generate AI webiste design`,
            imageUrl: '/archit.png', 
        },
        {
            title: `${keyword} small business`,
            url: 'https://www.webllix.com/',
            description: `${keyword}Empower your small business with a sleek, professional website that easy to create and manage.`,
            imageUrl: '/yacht.png', 
        },
        {
            title: `${keyword} website builder`,
            url: 'https://www.webllix.com//blog/drag-and-drop-website-builder',
            description: `${keyword}Build stunning, responsive websites quickly with our intuitive website builder tool`,
            imageUrl: '/cosmetic.png', 
        },
        {
            title: `${keyword} website design`,
            url: 'https://www.webllix.com/blog/best-website-design-portfolio',
            description: `${keyword} Craft modern, responsive websites with our Ai model , webllix genrate a image of webiste and turn into responsive website, try free`,
            imageUrl: '/cosmetic.png', 
        },
        {
            title: `${keyword} Top Award wining website by webllix `,
            url: 'https://www.webllix.com/blog/best-website-design-portfolio',
            description: `${keyword} Craft modern, Award winning website  with webllix`,
            imageUrl: '/cosmetic.png', 
        },
        // Add more results as needed
    ];

    const filteredResults = results.filter(result =>
        result.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        result.description.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const pageTitle = `${keyword} Introducing Webllix AI Website design`;
    const pageDescription = `Webllix -Ai website design || Webllix design website and turn into the code,`;

    const handleResultClick = (url: string) => {
        setSelectedUrl(url);
        setShowImage(true); 
    };
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="responsive web design, custom web design,AI  web design " />
                <link rel="canonical" href="https://www.Webllix.com" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.webllix.com/blog" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <link rel="canonical" href="https://www.webllix.com" />
   

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
