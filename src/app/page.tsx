import Image from 'next/image'

import React from "react";

import Hero from "@/app/UI/Hero/page";


import Footer from './UI/footer/page';

import Faq from "@/app/UI/faq/page"
import IntroductionSection from '@/app/UI/IntroductionSection/page'

import Feature from '@/app/UI/feature/page'

import ServicesSection from '@/app/UI/ServicesSection/page'



import Subscription from '@/app/UI/subscription/page'
import Review from '@/app/UI/review/page'
import Sectiondetail from '@/app/UI/sectiondetail/page'



export default function Home() {
  return (
    <main className="">

      <Hero />

      <Feature />

   < Review/>



      

        <Sectiondetail/>
      <IntroductionSection />

      <Subscription />
      <Faq />
      <Footer />




    </main>
  )
}
