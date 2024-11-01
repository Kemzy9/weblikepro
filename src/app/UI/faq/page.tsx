'use client'
import React, { useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

const faqs = [
  {
    question: "When should I reach out?",
    answer: "Feel free to reach out as soon as you have a clear vision and business model."
  },
  {
    question: "How do I upgrade my plan?",
    answer: "You can upgrade your plan through the billing section in your account dashboard at any time."
  },
  {
    question: "How should I get in touch?",
    answer: "You can get in touch by emailing us at weblike@gmail.com."
  },
  {
    question: "What is an Ai request?",
    answer: " Ai request  is a command given to AI to Updaet or Add Layout in your landing page , Here is how its work when you want to change or update schema jsut type 'Make this image 3d rotate,' change the color into ligh sky blue when cursor hover on ' And its simply update  ."
  },

  {
    question: "What kind of landing page can I build, and does it support backend functionality?",
    answer: "You can create a variety of landing pages, such as brand sites and Saas and more . its  generates static HTML, CSS, and JavaScript, so no backend support ."
  },
  
  {
    question: "Can I cancel my plan?",
    answer: "Yes, you can cancel your plan at any time through your account settings."
  },
  {
    question: "Is there a free trial available?",
    answer:  "Lets be real—running advanced AI models takes a lot of energy and resources behind the scenes. To keep Weblike going strong without cutting corners, we have to balance things.It helps us cover the costs and keeps the platform growing for everyone"
  },
  {
    question: "How do I upgrade my plan?",
    answer: "You can upgrade your plan through the billing section in your account dashboard at any time."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer 24/7 customer support via chat and email to assist with any questions or issues you may encounter."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight mb-10">
        Frequently Asked Questions
      </h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">
              <div 
                className="sm:w-1/2 p-4 bg-gray-50 cursor-pointer group"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                    {faq.question}
                  </h2>
                  <div className="sm:hidden">
                    {activeIndex === index ? (
                      <ArrowDown size={20} className="text-gray-500 transition-transform duration-300" />
                    ) : (
                      <ArrowRight size={20} className="text-gray-500 transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                  </div>
                </div>
              </div>
              <div className={`sm:w-1/2 p-4 bg-white text-sm sm:text-base text-gray-500 leading-relaxed ${activeIndex === index ? "block" : "hidden sm:block"}`}>
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
