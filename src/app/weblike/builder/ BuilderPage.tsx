'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BuilderPageProps {
  setCode: (code: string) => void;
}

export default function BuilderPage({ setCode }: BuilderPageProps) {
  const searchParams = useSearchParams();
  const [decodedCode, setDecodedCode] = useState<string>('');

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      try {
        const decoded = decodeURIComponent(code);
        setDecodedCode(decoded);
        setCode(decoded); // Pass the decoded code to the parent component
        console.log('Decoded code:', decoded); // For debugging
      } catch (error) {
        console.error('Error decoding URL parameter:', error);
        setDecodedCode('Error decoding the provided code.');
      }
    } else {
      console.log('No code parameter found in URL'); // For debugging
    }
  }, [searchParams, setCode]);

  return (
    <div>
      {decodedCode ? (
        <div dangerouslySetInnerHTML={{ __html: decodedCode }} />
      ) : (
        <div>No code provided or still loading...</div>
      )}
    </div>
  );
}
