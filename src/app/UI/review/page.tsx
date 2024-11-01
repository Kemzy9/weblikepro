import React from 'react';

const SectionDetail: React.FC = () => {
    return (
        <div className="bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            {/* Hero Section */}


            {/* What is AI Web Design Section */}
            <section className=" py-20"style={{ backgroundImage: `url('/pinklight.png')` }}>
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
                        What is Weblike and how is a landing page created?
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <p className="text-xl mb-6 text-gray-700">
                                Weblike is an AI-powered tool for creating landing pages in minutes. Simply enter a prompt and export the file,
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Award-winning results",
                                    "Export file  ",
                                    "Drag and Drop ",
                                    "Text Font Adjsutment ",

                                ].map((text) => (
                                    <li className="flex items-center" key={text}>
                                        <svg
                                            className="w-6 h-6 mr-2 text-green-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="text-lg text-gray-700">{text}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* New line for drag-and-drop builder */}

                        </div>
                        <div className="md:w-1/2 md:pl-12">
                            <div
                                className="w-auto h-auto perspective"
                                style={{ perspective: '1000px' }}
                            >
                                <video
                                    src="/text-style.mp4"
                                    width="900"
                                    height="400"
                                    autoPlay
                                    loop
                                    muted
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <header className="mb-24 relative text-center"style={{ backgroundImage: `url('/lighter.png')` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 rounded-s-sm"></div>
                <div className="relative z-10 p-8">

                    <h1 className="text-xl md:text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
                    Your Wish, AI Creation: Layout Without Boundaries
                    </h1>
                    <p className="text-2xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Say it, and it happens. Personalize, update, and expand your landing page on demand. Let AI unlock infinite possibilities with the power of your request
                    </p>
                    <div className="flex flex-col items-center space-y-4">

                        {/* Get Started Button */}
                        <a href="/login" className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg transform transition-transform hover:scale-105">
                            Get Started Now
                        </a>
                    </div>
                </div>
            </header>


            <header className="mb-24 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 rounded-3xl"></div>
                <div className="relative z-10 p-8 flex flex-col md:flex-row items-center md:items-start">
                    {/* Text content on the left */}
                    <div className="md:w-1/2">
                        <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-6">
                            AI &amp; Technology
                        </span>
                        <h1 className="text-5xl md:text-2xl font-extrabold text-gray-900 mb-6 leading-tight">
                            AI and the Evolution of the technology: A New Frontier
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl">
                            Use text and font adjustments to create a more professional appearance
                        </p>
                    </div>

                    {/* Video on the right */}
                    <div className="w-full md:w-auto h-auto perspective mt-8 md:mt-0 md:ml-8" style={{ perspective: '1000px' }}>
                        <video
                            src="/text-style.mp4"
                            width="900"
                            height="400"
                            autoPlay
                            loop
                            muted
                            className="w-full h-auto object-cover rounded-lg shadow-lg"
                        />
                    </div>
                </div>
                <section className="py-20">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className=" rounded-2xl shadow-2xl overflow-hidden"style={{ backgroundImage: `url('/pinklight.png')` }}>
                            <div className="flex flex-col md:flex-row items-center">
                                {/* Video on the left for medium screens and larger */}
                                <div className="md:w-1/2 w-full h-auto" style={{ perspective: '1000px' }}>
                                    <video
                                        src="/weblike-add.mp4"
                                        width="900"
                                        height="400"
                                        autoPlay
                                        loop
                                        muted
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                                {/* Text content on the right */}
                                <div className="md:w-1/2 w-full p-12 flex flex-col items-start">
                                    <h2 className="text-3xl font-bold mb-6 text-black">
                                    AI at Your Command: Transform, Enhance, and Evolve
                                    </h2>
                                    <p className="text-xl mb-8 text-blue-800">
                                    Request changes, add features,The power to create dynamic, optimized landing pages is now in your hands—just say the word, and AI does the rest.

                                    </p>

                                    <a
                                        href="/blog"
                                        className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-full shadow hover:bg-gray-100 transition text-lg font-semibold"
                                    >
                                        Learn More
                                        <svg className="w-5 h-5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </header>


            {/* Generate Code Section */}




            <header className="mb-20  text-white rounded-3xl overflow-hidden shadow-2xl"style={{ backgroundImage: `url('/lighter.png')` }}>
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 p-12">
                        <div className="mb-6">
                            <span className="text-sm font-semibold bg-white text-blue-600 px-3 py-1 rounded-full uppercase tracking-wider">
                                AI & Technology
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-2xl font-bold mb-4">
                            Transforming the Online Experience: AI&apos;s Impact on the Future
                        </h1>
                        <p className="text-xl mb-8 text-">
                            Apply a modern theme to make your page more unique and interactive
                        </p>

                    </div>
                    <div className="w-auto h-auto perspective" style={{ perspective: '1000px' }}>
                        <video
                            src="/weblike Ai-them-generator.mp4"
                            width="900"
                            height="400"
                            autoPlay
                            loop
                            muted
                            className=""
                        />
                    </div>
                </div>
            </header>
            <div>



            </div>




        </div>
    );
};

export default SectionDetail;
