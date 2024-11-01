'use client'

import React, { useState } from 'react';
import StyleControls from './StyleControls'

export default function StylePage() {
  const [currentStyle, setCurrentStyle] = useState<{ [key: string]: string }>({});

  const handleStyleChange = (style: { [key: string]: string }) => {
    setCurrentStyle(prevStyle => ({ ...prevStyle, ...style }));
    console.log('Style updated:', style);
  };

  return (
    <div>
      <h1>Style Controls</h1>
      <StyleControls onStyleChange={handleStyleChange} />
      <div>
        <h2>Current Style:</h2>
        <pre>{JSON.stringify(currentStyle, null, 2)}</pre>
      </div>
    </div>
  )
}