'use client'
import { LogIn } from 'lucide-react';


import React from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import Logo from '@/app/UI/logo/page';

const Nav = () => {
  const logo = {
    name: 'LogoName',
    icon: 'LogoIcon',
    business: { name: 'BusinessName' },
    alt: 'Logo Alt Text',
    size: 50,

    quality: 75,
  };

  return (
    <div className=" bg-gray-900 max-width: 320px " >


      <header className="bg-gray-900 rounded-lg ">
        <div className="container px-9 py-8 flex justify-between items-center text-white">
          <div className="flex items-center space-x-4">
            <Logo />
            <span className="ml-2 text-white text-xl font-semibold">Weblike</span>
          </div>
          <div className="flex items-center space-x-4 ">
            <a href="/signup" className="underline">Sign In</a>
          </div>
        </div>
      </header>


    </div>
  );
};

export default Nav;





