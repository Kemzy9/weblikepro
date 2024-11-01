'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle, DollarSign, XCircle, HelpCircle } from 'lucide-react';

const PricingUI = () => {
  const [isYearly, setIsYearly] = useState(true);

  const [userId, setUserId] = useState<string | null>(null);

  const togglePricing = () => {
    setIsYearly((prevState) => !prevState);
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await fetch('/api/users/me');
        const data = await res.json();
        setUserId(data.data._id);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    getUserDetails();
  }, []);

  const handleBuy = async (priceId: string) => {
    if (!userId) {
      toast.error('Please log in to make a purchase');
      return;
    }

    if (!priceId) {
      toast.error('Invalid product selection');
      return;
    }

    try {
      const response = await fetch('/api/users/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, userId }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      toast.error('Failed to initiate purchase. Please try again.');
    }
  };

  const plans = [
    {
      title: 'Starter',
      price: isYearly ? '25' : '29',
      description: 'Ideal for beginners or individuals building their first project.',
      features: [
        { feature: 'Landing Page', tooltip: 'Build  3 landing page /month ' },
        { feature: 'create Logo', tooltip: '20Logos/mo This plan includes AI-powered logo generation. You can create up to 20 unique logos per month.' },
        { feature: 'Drag and Drop Builder', tooltip: 'Our intuitive drag and drop builder allows you to easily create and customize your landing pages.' },
        { feature: 'High Quality images', tooltip: '50 High quality image Access a library of high-quality, AI-generated images. You can use up to 50 HD images per month.' },
        { feature: 'Built-in AI copywriting', tooltip: 'Leverage AI to generate compelling copy for your landing pages, saving you time and effort.' },
        { feature: 'Unique Themes ', tooltip: '20 theme Choose from a selection of 5 professionally designed themes each month to kickstart your projects.' },
        { feature: '24/7 customer support', included: false },
        { feature: 'Dynamic Text Editor', included: false },
        { feature: 'Image Drag and Drop', included: false },

        { feature: 'Access 100 Premium Request/month ', tooltip: 'Receive  100 AI model requests, add more additional feature Build landing page based your choice and  your needs.  ' },
        'Export Code',
      ],
      priceId: isYearly
        ? process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STANDARD_YEARLY_PRICE_ID
        : process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STANDARD_MONTHLY_PRICE_ID,
    },
    {
      title: 'Creator',
      price: isYearly ? '55' : '59',
      description: 'Perfect for creators looking to experiment and expand their toolkit.',
      isPopular: true,
      features: [
        { feature: 'Landing Page', tooltip: 'Build  6 landing page /month ' },
        { feature: 'create Logo', tooltip: '40Logos/mo This plan includes AI-powered logo generation. You can create up to 20 unique logos per month.' },
        { feature: 'Drag and Drop Builder', tooltip: 'Our intuitive drag and drop builder allows you to easily create and customize your landing pages.' },
        { feature: 'High Quality images', tooltip: '100 High quality image Access a library of high-quality, AI-generated images. You can use up to 50 HD images per month.' },
        { feature: 'Built-in AI copywriting', tooltip: 'Leverage AI to generate compelling copy for your landing pages, saving you time and effort.' },
        { feature: 'Unique Themes ', tooltip: '50 theme Choose from a selection of 5 professionally designed themes each month to kickstart your projects.' },
        { feature: '24/7 customer support', included: false },
        { feature: 'Dynamic Text Editor', included: false },
        { feature: 'Image Drag and Drop', included: false },

        { feature: 'Access 400 Premium Request/month ', tooltip: 'Receive  100 AI model requests, add more additional feature Build landing page based your choice and  your needs.  ' },
        'Export Code',
      ],
      priceId: isYearly
        ? process.env.NEXT_PUBLIC_LEMON_CREATOR_PRO_YEARLY_PRICE_ID
        : process.env.NEXT_PUBLIC_LEMON_CREATOR_PRO_MONTHLY_PRICE_ID,
    },
    {
      title: 'PREMIUM',
      price: isYearly ? '109' : '119',
      description: 'Empowering Unique Minds with Cutting-Edge Tools and Suppor.',
      features: [
        { feature: 'Landing Page', tooltip: 'Build  12 landing page /month ' },
        { feature: 'create Logo', tooltip: '200Logos/mo This plan includes AI-powered logo generation. You can create up to 20 unique logos per month.' },
        { feature: 'Drag and Drop Builder', tooltip: 'Our intuitive drag and drop builder allows you to easily create and customize your landing pages.' },
        { feature: 'High Quality images', tooltip: '200 High quality image Access a library of high-quality, AI-generated images. You can use up to 50 HD images per month.' },
        { feature: 'Built-in AI copywriting', tooltip: 'Leverage AI to generate compelling copy for your landing pages, saving you time and effort.' },
        { feature: 'Unique Themes ', tooltip: '200 theme Choose from a selection of 5 professionally designed themes each month to kickstart your projects.' },
      

        { feature: '24/7 customer support', tooltip: 'Leverage AI to generate compelling copy for your landing pages, saving you time and effort.' },
        { feature: 'Image Drag and Drop', tooltip: 'Leverage AI to generate compelling copy for your landing pages, saving you time and effort.' },
        { feature: 'Dynamic Text Editor', tooltip: 'Leverage AI to generate compelling copy for your landing pages, saving you time and effort.' },
       

        { feature: 'Access 2000 Premium Request/month ', tooltip: 'Receive  100 AI model requests, add more additional feature Build landing page based your choice and  your needs.  ' },
        'Export Code',
      ],
      priceId: isYearly
        ? process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PREMIUM_YEARLY_PRICE_ID
        : process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PREMIUM_MONTHLY_PRICE_ID,
    },

  ];

  return (
    <div>

  
      <div className=" text-gray-900 py-40  px-3 lg:px-20 overflow-hidden" style={{ backgroundImage: `url('/lighter.png')` }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose the Plan That Suits You Best</h2>
          <p className="text-lg text-gray-500">Step Into the Future of Web Creation with AI</p>
          <p className="text-sm text-gray-400">
            Build forward-thinking landing pages in minutes with AI-generated custom designs. Let AI handle the heavy lifting.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="flex space-x-4 bg-white rounded-full p-1 shadow-lg">
            <button
              className={`px-6 py-2 rounded-full transition-all duration-300 ${isYearly ? 'bg-blue-600 text-white font-semibold' : 'text-gray-600 hover:text-gray-900'
                }`}
              onClick={togglePricing}
            >
              Yearly (Save 20%)
            </button>
            <button
              className={`px-6 py-2 rounded-full transition-all duration-300 ${!isYearly ? 'bg-blue-600 text-white font-semibold' : 'text-gray-600 hover:text-gray-900'
                }`}
              onClick={togglePricing}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white border rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 ${plan.isPopular ? 'border-blue-600' : 'border-gray-200'
                }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm rounded-bl-2xl">
                  Most Popular
                </div>
              )}
              <h3 className="text-3xl font-semibold mb-6">{plan.title}</h3>
              <div className="flex items-baseline space-x-2 mb-6">
                <DollarSign className="text-blue-600" />
                <p className="text-2xl font-bold">{plan.price}</p>
                <span className="text-sm text-gray-500">/mo</span>
              </div>
              <p className="text-sm text-gray-500 mb-8">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-center space-x-2 text-gray-700">
                    {typeof feature === 'string' ? (
                      <>
                        <CheckCircle className="text-blue-600 w-5 h-5" />
                        <span>{feature}</span>
                      </>
                    ) : 'tooltip' in feature ? (
                      <div className="relative group flex items-center">
                        <CheckCircle className="text-blue-600 w-5 h-5" />
                        <span className="ml-2">{feature.feature}</span>
                        <div className="relative">
                          <HelpCircle className="w-4 h-4 text-gray-400 ml-1 cursor-help" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 hidden group-hover:block w-48 z-10 mb-1">
                            {feature.tooltip}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {feature.included ? (
                          <>
                            <CheckCircle className="text-blue-600 w-5 h-5" />
                            <span>{feature.feature}</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="text-red-600 w-5 h-5" />
                            <span className="line-through">{feature.feature}</span>
                          </>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleBuy(plan.priceId!)}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full text-white font-semibold w-full transition-all"
              >
                {`Choose ${plan.title}`}
              </button>
            </div>
          ))}
        </div>

      </div>
      
    </div>
  );
};

export default PricingUI;
