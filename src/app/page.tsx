import Image from 'next/image'

import React from "react";

import Hero from "@/app/UI/Hero/page";

import Feature from '@/app/UI/feature/page'

import Baner from '@/app/UI/baner/page'


export default function Home() {
  return (
    <main className="">



    
<Hero/>
            <Feature />
 

<Baner/>


    </main>
  )
}
