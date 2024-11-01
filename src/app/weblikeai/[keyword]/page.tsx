import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { keywordRoutes, generateSchema } from '@/models/keyword';
import KeywordContent from '@/app/weblikeai/KeywordContent';

interface Props {
  params: {
    keyword: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = keywordRoutes.find(r => r.keyword === params.keyword);
  
  if (!route) {
    return {
      title: 'Not Found'
    };
  }

  const schema = generateSchema(route);

  return {
    title: route.title,
    description: route.description,
    other: {
      'application/ld+json': JSON.stringify(schema)
    }
  };
}

export async function generateStaticParams() {
  return keywordRoutes.map((route) => ({
    keyword: route.keyword,
  }));
}

export default function KeywordDetailPage({ params }: Props) {
  const route = keywordRoutes.find(r => 
    r.keyword.toLowerCase() === params.keyword.toLowerCase()
  );

  if (!route) {
    return null;
  }

  return <KeywordContent {...route} params={params} />;
}
