import React from 'react';
import { Facebook, X, Linkedin, Youtube, Instagram, Globe, Mail, Phone, ShoppingCart, Building, Cpu, PaintBucket, Briefcase, Users, BookOpen, HelpCircle, ArrowRight } from 'lucide-react';
import Logo from '@/app/UI/logo/page';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-16">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Company Info and Newsletter */}
          <div className="lg:col-span-1 space-y-8">
            <div className="flex items-center">
              <Logo />
              <span className="text-xl font-bold ml-2">Weblike</span>
            </div>
            <p className="text-blue-200">
Ready to launch something new? We make it easy to create a standout landing page that grabs attention and drives results. Your vision, our AI
            </p>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-blue-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-300"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
              >
                Subscribe to Newsletter <ArrowRight size={16} className="ml-2" />
              </button>
            </form>
          </div>

          {/* Solutions and Use Cases */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-6 text-2xl">Solutions for Every Industry</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                ['E-commerce', <ShoppingCart key="ecommerce" size={24} />],
                ['SaaS', <Cpu key="saas" size={24} />],
                ['Real Estate', <Building key="realestate" size={24} />],
                ['NFT Marketplace', <PaintBucket key="nft" size={24} />],
                ['Startups', <Briefcase key="startups" size={24} />],
                ['Personal Branding', <Users key="personal" size={24} />],
                ['Education', <BookOpen key="education" size={24} />],
                ['Nonprofit', <HelpCircle key="nonprofit" size={24} />],
                ['Healthcare', <HelpCircle key="healthcare" size={24} />],
              ].map(([item, icon], index) => (
                <Link key={index} href="#" className="group">
                  <div className="bg-blue-800 p-4 rounded-lg transition-all duration-300 group-hover:bg-blue-700 group-hover:shadow-lg">
                    <div className="flex items-center mb-2">
                      {icon}
                      <span className="ml-2 font-semibold">{item}</span>
                    </div>
                    <p className="text-sm text-blue-200">Create stunning landing pages for your {typeof item === 'string' ? item.toLowerCase() : ''} business.</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        

        {/* Quick Links */}
        <div className="border-t border-blue-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h5 className="font-semibold mb-4 text-lg">Products</h5>
              <ul className="space-y-2">
                {[
                  'AI Logo Generator',
                  'Drag-and-Drop Builder',
                  'Theme Generator',
                  'AI Image Creator',
                  'Landing Page Builder',
                  'SEO Optimizer',
             
                ].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-lg">Resources</h5>
              <ul className="space-y-2">
                {[
                  'Blog',
             
                ].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-lg">Company</h5>
              <ul className="space-y-2">
                {[
                  'About Us',
            
                ].map((item, index) => (
                  <li key={index}>
                    <Link href="/About" className="text-blue-200 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
  <h5 className="font-semibold mb-4 text-lg">Legal</h5>
  <ul className="space-y-2">
    {[
      { name: 'Terms And Conditions', path: '/TermsAndConditions' },
      { name: 'Privacy Policy', path: '/PrivacyPolicy' },
    ].map((item, index) => (
      <li key={index}>
        <Link href={item.path} className="text-blue-200 hover:text-white transition-colors">
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
</div>

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center">
         <div className="flex space-x-4 mb-4 md:mb-0">
  {[
    { Icon: X, url: 'https://x.com/weblike_ai' },

    { Icon: Instagram, url: 'https://www.instagram.com/weblike.ai/' },
  ].map((item, index) => (
    <Link key={index} href={item.url} className="text-blue-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
      <item.Icon size={20} />
    </Link>
  ))}
</div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <span className="text-blue-200">© {new Date().getFullYear()} Weblike. All rights reserved.</span>
            <Link href="/PrivacyPolicy" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/TermsAndConditions" className="text-blue-200 hover:text-white transition-colors">Terms And Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
