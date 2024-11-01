"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { KeywordRoute } from '@/lib/keyword';

interface Props extends KeywordRoute {
  params: {
    keyword: string;
  };
}

export default function KeywordContent(props: Props) {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/');
    }, 100);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative h-64 md:h-96 mb-8">
          <Image
            src={props.image}
            alt={props.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">{props.title}</h1>
        <p className="text-gray-600 mb-6">{props.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{props.views} views</span>
          <span>Category: {props.category}</span>
        </div>
      </div>
    </div>
  );
}