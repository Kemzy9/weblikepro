"use client";
import React, { useState, useEffect, useRef, ChangeEvent, MouseEvent, useCallback,Suspense } from 'react';

import { Download, Maximize2, Code, Minimize2, Sparkles, ExternalLink, Redo2, Undo2, Type, Eye, Grip, Smartphone, Monitor, Palette, Droplet, Play, LayoutList, MousePointerClick, X, MessageSquare , } from 'lucide-react';


import LogoGenerator from '@/app/weblike/weblike/logogenerator/page';
import Client from '@/app/weblike/weblike/client/page';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Gallery from '@/app/weblike/weblike/gallery/Gallery';
import BuilderPage from './ BuilderPage';
import { FiGrid, FiX, FiMinimize2, FiMaximize2, FiCode, FiEye, FiDownload, FiSmartphone, FiMonitor, FiSave, FiShare2, FiSliders, FiImage, FiDroplet, FiPlay } from 'react-icons/fi';
import StyleControls from '@/app/weblike/weblike/style/StyleControls';
import { Rnd } from 'react-rnd';
import { FiMessageSquare, FiSend } from 'react-icons/fi';
import Logo from '@/app/UI/logo/page';
import { FiMove, FiCornerRightDown, } from 'react-icons/fi';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';


interface CodePreviewProps {
  initialCode: string;
}
const initialCode = ''; // Define initialCode
const CodePreview: React.FC = () => {
  const [code, setCode] = useState<string>(initialCode); // Ensure code is initialized
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('preview');
  const [codeType, setCodeType] = useState<string>('html');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isApplyingColor, setIsApplyingColor] = useState<boolean>(false);
  const [isApplyingImage, setIsApplyingImage] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [imageSize, setImageSize] = useState<string>('medium');
  const [selectedAnimation, setSelectedAnimation] = useState<string>('');
  const [isApplyingAnimation, setIsApplyingAnimation] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [images, setImages] = useState<{ [key: string]: File }>({});
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [imageCounter, setImageCounter] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [isGalleryMinimized, setIsGalleryMinimized] = useState<boolean>(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<{ file: File | null, url: string | null } | null>(null);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [galleryTab, setGalleryTab] = useState<'images' | 'logos' | 'client'>('images');
  const [addedImages, setAddedImages] = useState<Array<{ id: string, src: string, position: { x: number, y: number }, size: { width: number, height: number } }>>([]);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showChangePrompt, setShowChangePrompt] = useState(false);
  const [showStyleControls, setShowStyleControls] = useState<boolean>(false);
  const [isTextEditing, setIsTextEditing] = useState<boolean>(false);
  const [isLeftSidebarMinimized, setIsLeftSidebarMinimized] = useState(false);
  const [isRightSidebarMinimized, setIsRightSidebarMinimized] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>(['#000000', '#000000', '#000000']);
  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);


  
  // ... existing functions ...




  ;
  const toggleLeftSidebar = () => {
    setIsLeftSidebarMinimized(!isLeftSidebarMinimized);
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarMinimized(!isRightSidebarMinimized);
  }
  useEffect(() => {
    if (previewRef.current) {
      if (isTextEditing) {
        previewRef.current.setAttribute('contenteditable', 'true');
      } else {
        previewRef.current.removeAttribute('contenteditable');
      }
    }
  }, [isTextEditing])


  const toggleTextEditing = () => {
    if (isTextEditing) {
      // Save the changes when exiting text editing mode
      if (previewRef.current) {
        const updatedContent = previewRef.current.innerHTML;
        setOutput(updatedContent);
        setCode(updatedContent);
      }
    }
    setIsTextEditing(!isTextEditing);
  };

  const showCodeSection = () => {
    setActiveTab('code');
  };


  useEffect(() => {
    // Clean up object URLs when component unmounts
    return () => {
      Object.values(imageUrls).forEach(URL.revokeObjectURL);
    };
  }, [imageUrls]);
 
  // Replace the state variables with refs
  const hoveredElementRef = useRef<Element | null>(null);
  const [selectedElementRef, setSelectedElementRef] = useState<{ current: Element | null }>({ current: null });
  const forceUpdate = useCallback(() => updateState({}), []);
  // Modify the handleMouseEvent function
  const handleMouseEvent = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!isTextEditing) {
      const target = event.target as Element;
      if (event.type === 'mouseover') {
        hoveredElementRef.current = target;
      } else if (event.type === 'mouseout') {
        hoveredElementRef.current = null;
      } else if (event.type === 'click') {
        selectedElementRef.current = target;
        // Force a re-render
        forceUpdate();
      }
    }
  }, [isTextEditing, forceUpdate, selectedElementRef]);



  const handleOpenLive = () => {
    const domain = process.env.DOMAIN;

    // Generate full HTML document with the domain environment variable
    const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Live Preview</title>
        </head>
        <body>
            <script>
                // Optionally use the domain in your script here
                const domain = "${domain}";
            </script>
            ${output}
        </body>
        </html>
    `;

    // Create a Blob with the HTML content
    const blob = new Blob([fullHtml], { type: 'text/html' });

    // Create a data URL from the Blob
    const dataUrl = URL.createObjectURL(blob);

    // Open the data URL in a new tab
    window.open(dataUrl, '_blank');
  };



  // Add this to force re-render when needed
  const [, updateState] = useState({});


  useEffect(() => {
    try {
      if (code.trim().startsWith('<')) {
        setOutput(code);
        setError('');
      } else {
        const transformedCode = code
          .replace(/className=/g, 'class=')
          .replace(/\{([^}]+)\}/g, (_, content) => {
            try {
              return new Function(`return ${content}`)();
            } catch {
              return `\${${content}}`;
            }
          })
          .replace(/&nbsp;/g, ' ');
        setOutput(transformedCode);
        setError('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, [code]);

  const [selectedText, setSelectedText] = useState<string | null>(null);


  const toggleEditMode = () => {
    setIsEditMode((prev: boolean) => !prev); // Toggle edit mode
    if (!isEditMode) {
      // Additional logic to activate edit mode (if needed)
      // e.g., select elements or enable editing features
    }
  };

  const saveCode = useCallback(async () => {
    if (!previewRef.current) return;

    const zip = new JSZip();
    const fileExtension = codeType === 'html' ? 'html' : codeType === 'jsx' ? 'jsx' : 'tsx';

    // Get the current state of the preview
    let saveableCode = previewRef.current.innerHTML;
    // Process images
    const imagePromises = Object.entries(images).map(async ([imageId, file]) => {
      const imageContent = await file.arrayBuffer();
      const fileName = `image_${imageId}.${file.name.split('.').pop()}`;
      zip.file(`images/${fileName}`, imageContent);
      return { imageId, fileName };
    });
    const processedImages = await Promise.all(imagePromises);
    // Update image paths in the code
    processedImages.forEach(({ imageId, fileName }) => {
      const imgRegex = new RegExp(`data-image-id="${imageId}"[^>]*src="[^"]*"`, 'g');
      saveableCode = saveableCode.replace(imgRegex, `data-image-id="${imageId}" src="images/${fileName}"`);
    });
    // Add image elements to the code
    addedImages.forEach((img, index) => {
      const imgFileName = `added-image-${index}.png`;
      zip.file(`images/${imgFileName}`, img.src.split(',')[1], { base64: true });

      const imgElement = `<img src="./images/${imgFileName}" style="position: absolute; left: ${img.position.x}px; top: ${img.position.y}px; width: ${img.size.width}px; height: ${img.size.height}px;" />`;
      saveableCode += imgElement;
    });





    if (codeType === 'html') {
      // For HTML, update image paths and create a style tag
      let styleContent = '';
      processedImages.forEach(({ imageId, fileName }) => {
        const imgRegex = new RegExp(`data-image-id="${imageId}"`, 'g');
        saveableCode = saveableCode.replace(imgRegex, `data-image-id="${imageId}" style="background-image: url('./images/${fileName}')"`);

        // Add to style content
        styleContent += `
            [data-image-id="${imageId}"] {
              background-size: ${imageSize};
              background-position: center;
              background-repeat: no-repeat;
            }
          `;
      });

      // Add style tag to the head of the HTML
      saveableCode = `
          <html>
            <head>
              <style>${styleContent}</style>
            </head>
            <body>
              ${saveableCode}
            </body>
          </html>
        `;
    } else {
      // Convert HTML to JSX/TSX
      saveableCode = saveableCode
        .replace(/class=/g, 'className=')
        .replace(/for=/g, 'htmlFor=')
        .replace(/style="([^"]*)"/g, (match, styles) => {
          const styleObject = styles.split(';').reduce((acc: Record<string, string>, style: string) => {
            const [key, value] = style.split(':').map((s: string) => s.trim());
            if (key && value) {
              const jsxKey = key.replace(/-./g, (x: string) => x.charAt(1).toUpperCase() + x.slice(2));
              acc[jsxKey] = value.replace(/"/g, "'");
            }
            return acc;
          }, {});
          return `style={${JSON.stringify(styleObject)}}`;
        })
        .replace(/(\w+)="(\{[^}]+\})"/g, (match: string, attr: string, value: string) => `${attr}=${value}`)
        .replace(/<([a-z]+)([^>]*)>/g, (match: string, tag: string, attrs: string) => {
          const jsxAttrs = attrs.replace(/(\w+)="([^"]+)"/g, (attrMatch: string, attr: string, value: string) => {
            if (attr === 'style') return attrMatch;
            return `${attr}="${value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}"`;
          });
          return `<${tag}${jsxAttrs}>`;
        })
        .replace(/&nbsp;/g, '{" "}')
        .replace(/<!--(.*?)-->/g, '{/* $1 */}');

      // Replace image URLs with imports
      processedImages.forEach(({ imageId, fileName }) => {
        const imgRegex = new RegExp(`data-image-id="${imageId}"`, 'g');
        saveableCode = saveableCode.replace(imgRegex, `data-image-id="${imageId}" style={{backgroundImage: \`url(\${${imageId}})\`, backgroundSize: '${imageSize}', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}`);
      });

      // Wrap the code in a React component
      saveableCode = `
import React from 'react';
${processedImages.map(({ imageId, fileName }) => `import ${imageId} from './images/${fileName}';`).join('\n')}

const GeneratedComponent: React.FC = () => {
  return (
    <React.Fragment>
      ${saveableCode}
    </React.Fragment>
  );
};

export default GeneratedComponent;
`;
    }

    zip.file(`index.${fileExtension}`, saveableCode);

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'weblike.zip');
  }, [codeType, images, imageSize, addedImages]);


  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newColors = [...selectedColors];
    newColors[activeColorIndex] = e.target.value;
    setSelectedColors(newColors);
  };

  const applyColor = useCallback(() => {
    setIsApplyingColor(true);
  }, []);
  const [hoverStyle, setHoverStyle] = useState<{ backgroundColor?: string; backgroundImage?: string }>({});
  const removeColor = () => {
    setIsApplyingColor(false);
    setHoverStyle({ backgroundColor: '' });
    applyStyleToSelection({ backgroundColor: '' });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageId = `img_${imageCounter}`;
      setImages(prevImages => ({ ...prevImages, [imageId]: file }));
      const objectUrl = URL.createObjectURL(file);
      setImageUrls(prevUrls => ({ ...prevUrls, [imageId]: objectUrl }));
      setImageCounter(prevCounter => prevCounter + 1);
      setImageSrc(objectUrl);
    }
  };

  const applyImage = useCallback(() => {
    if (imageSrc) {
      setIsApplyingImage(true);
    }
  }, [imageSrc]);

  const removeImage = () => {
    setIsApplyingImage(false);
    const applyStyleToSelection = (style: { backgroundImage: string; }) => {
      console.log("Applying style to selection:", style);
    };
    applyStyleToSelection({ backgroundImage: '' });
  };

  const handlePreviewInteraction = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTextEditing) {
      // If we're in text editing mode, don't do anything else
      e.stopPropagation();
      return;
    } // Don't apply styles or images when text editing is active

    const target = e.target as HTMLElement;

    // Handle click events for applying color, image, or animation
    if (isApplyingColor) {
      const gradientColors = selectedColors.filter(color => color !== '#000000').join(', ');
      if (gradientColors.length > 0) {
        target.style.background = `linear-gradient(45deg, ${gradientColors})`;
      } else {
        target.style.backgroundColor = selectedColors[0];
      }
      setIsApplyingColor(false);
    }
    if (isApplyingImage) {
      const imageId = `img_${imageCounter - 1}`;
      target.setAttribute('data-image-id', imageId);
      target.style.backgroundImage = `url(${imageSrc})`;
      target.style.backgroundSize = imageSize;
      target.style.backgroundPosition = 'center';
      target.style.backgroundRepeat = 'no-repeat';
      setIsApplyingImage(false);
    }
    if (isApplyingAnimation && selectedAnimation) {
      target.style.animation = `${selectedAnimation} 1s`;
      target.style.animationFillMode = 'both';
      setIsApplyingAnimation(false);
    }

    // Update output and code
    if (previewRef.current) {
      const newContent = previewRef.current.innerHTML;
      setOutput(newContent);
      setCode(newContent); // Update the code state as well
    }
  }, [
    isTextEditing,
    isApplyingColor,
    isApplyingImage,
    isApplyingAnimation,
    selectedColors,
    imageSrc,
    imageSize,
    selectedAnimation,
    imageCounter
  ]);

  const toggleMobileView = () => {
    setIsMobileView(!isMobileView);
  };

  const handleImageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setImageSize(e.target.value);
  };

  const removeAppliedStyle = (style: 'color' | 'image') => {
    if (previewRef.current) {
      const elements = previewRef.current.querySelectorAll('*');
      elements.forEach((el) => {
        if (el instanceof HTMLElement) {
          if (style === 'color') {
            el.style.removeProperty('background-color');
          } else if (style === 'image') {
            el.style.removeProperty('background-image');
            el.style.removeProperty('background-size');
            el.style.removeProperty('background-position');
            el.style.removeProperty('background-repeat');
          }
        }
      });
      updateOutputAndCode();
    }
  };

  const handleAnimationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAnimation(e.target.value);
  };

  const applyAnimation = () => {
    if (selectedAnimation) {
      setIsApplyingAnimation(true);
    }
  };

  const removeAllAnimations = () => {
    if (previewRef.current) {
      const elements = previewRef.current.querySelectorAll('*');
      elements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.removeProperty('animation');
          el.style.removeProperty('animation-fill-mode');
        }
      });
      setOutput(previewRef.current.innerHTML);
      setCode(previewRef.current.innerHTML);
    }
  };

  const extractComponents = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const elements = doc.body.querySelectorAll('*');
    const uniqueComponents = new Set<string>();
    elements.forEach((el) => {
      if (el.tagName && el.tagName.includes('-')) {
        uniqueComponents.add(el.tagName.toLowerCase());
      } else if (el.tagName) {
        uniqueComponents.add(el.tagName.toLowerCase());
      }
    });
  };

  useEffect(() => {
    extractComponents(output);
  }, [output]);



  useEffect(() => {
    // Clean up object URLs when component unmounts
    return () => {
      Object.values(imageUrls).forEach(URL.revokeObjectURL);
    };
  }, [imageUrls]);

  const handleSelectImage = (file: File | null, imageUrl: string | null) => {
    if (file && imageUrl) {
      const imageId = `img_${imageCounter}`;
      setImages(prevImages => ({ ...prevImages, [imageId]: file }));
      const objectUrl = URL.createObjectURL(file);
      setImageUrls(prevUrls => ({ ...prevUrls, [imageId]: objectUrl }));
      setImageCounter(prevCounter => prevCounter + 1);
      setImageSrc(imageUrl);
      setIsApplyingImage(true); // Set to true to apply the image
    }
  };

  const handlePublish = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const toggleGallery = () => {
    setIsGalleryOpen(!isGalleryOpen);
    setIsGalleryMinimized(false);
  };

  const toggleMinimizeGallery = () => {
    setIsGalleryMinimized(!isGalleryMinimized);
  };

  const handleSelectGalleryImage = (file: File, imageUrl: string) => {
    setSelectedGalleryImage({ file, url: imageUrl });
    setImageSrc(imageUrl);
    setIsApplyingImage(true);
  };


  const applySelectedImage = () => {
    if (selectedGalleryImage && selectedGalleryImage.file && selectedGalleryImage.url) {
      const imageId = `img_${imageCounter}`;
      setImages(prevImages => ({
        ...prevImages,
        [imageId]: selectedGalleryImage.file as File
      }));
      setImageUrls(prevUrls => ({
        ...prevUrls,
        [imageId]: selectedGalleryImage.url || ''
      }));
      setImageCounter(prevCounter => prevCounter + 1);
      setImageSrc(selectedGalleryImage.url || '');
      setIsApplyingImage(true);
      setSelectedGalleryImage(null);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageAdd(e.target.files[0]);
    }
  };


  const updateImagePosition = (id: string, position: { x: number, y: number }) => {
    setAddedImages(prev => prev.map(img =>
      img.id === id ? { ...img, position } : img
    ));
  };

  const updateImageSize = (id: string, size: { width: number, height: number }) => {
    setAddedImages(prev => prev.map(img =>
      img.id === id ? { ...img, size } : img
    ));
  };

  const removeAddedImage = (id: string) => {
    setAddedImages(prev => prev.filter(img => img.id !== id));
  };

  useEffect(() => {
    const handleBlur = () => {
      if (isTextEditing && previewRef.current) {
        const updatedContent = previewRef.current.innerHTML;
        setOutput(updatedContent);
        setCode(updatedContent);
      }
    };

    const currentPreviewRef = previewRef.current;

    if (currentPreviewRef) {
      if (isTextEditing) {
        currentPreviewRef.setAttribute('contenteditable', 'true');
        currentPreviewRef.addEventListener('blur', handleBlur);
      } else {
        currentPreviewRef.removeAttribute('contenteditable');
        currentPreviewRef.removeEventListener('blur', handleBlur);
      }
    }

    return () => {
      if (currentPreviewRef) {
        currentPreviewRef.removeEventListener('blur', handleBlur);
      }
    };
  }, [isTextEditing]);

  const [isTyping, setIsTyping] = useState(false);
  const typingSpeedMs = 20; // Adjust this value to change typing speed


  const typeCode = async (codeToType: string) => {
    setIsTyping(true);
    let tempDiv = document.createElement('div');

    for (let i = 0; i < codeToType.length; i++) {
      await new Promise(resolve => setTimeout(resolve, typingSpeedMs));
      tempDiv.innerHTML = codeToType.substring(0, i + 1);

      if (selectedElementRef.current) {
        const newCode = code.replace(selectedElementRef.current.outerHTML, tempDiv.innerHTML);
        setCode(newCode);
        setOutput(newCode);
      } else {
        setCode(tempDiv.innerHTML);
        setOutput(tempDiv.innerHTML);
      }
    }

    // Cleanup step: remove any temporary attributes and classes
    tempDiv.querySelectorAll('*').forEach(el => {
      el.removeAttribute('data-typing');
      el.classList.remove('typing-cursor');
    });

    // Final update to ensure correct display
    if (selectedElementRef.current) {
      const finalCode = code.replace(selectedElementRef.current.outerHTML, tempDiv.innerHTML);
      setCode(finalCode);
      setOutput(finalCode);
    } else {
      setCode(tempDiv.innerHTML);
      setOutput(tempDiv.innerHTML);
    }

    setIsTyping(false);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedImage) return;

    // New check for selected element
    if (!selectedElementRef.current) {
      setChatMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: 'Please select an element first.' }
      ]);
      return; // Exit the function if no element is selected
    }

    setLoading(true);
    const userMessage = { role: 'user', content: inputMessage };
    setChatMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      let selectedCode = selectedElementRef.current ? selectedElementRef.current.outerHTML : code;

      const formData = new FormData();
      formData.append('prompt', inputMessage);
      formData.append('selectedCode', selectedCode);
      formData.append('isContinuation', 'true');

      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await fetch('/api/users/opengpt4', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let aiMessage = { role: 'assistant', content: '' };
      let fullCodeResponse = '';
      let isCodeBlock = false;
      let codeBlockContent = '';

      while (true) {
        const { done, value } = await reader?.read() ?? { done: true, value: undefined };
        if (done) break;

        const chunk = decoder.decode(value);

        for (const char of chunk) {
          if (char === '`' && !isCodeBlock) {
            isCodeBlock = true;
            codeBlockContent = '';
            continue;
          }
          if (char === '`' && isCodeBlock) {
            isCodeBlock = false;
            fullCodeResponse += codeBlockContent;
            continue;
          }

          if (isCodeBlock) {
            codeBlockContent += char;
          } else {
            aiMessage.content += char;
            // Update chat messages in real-time
            setChatMessages(prevMessages => {
              const updatedMessages = [...prevMessages];
              updatedMessages[updatedMessages.length - 1] = { ...aiMessage };
              return updatedMessages;
            });
          }
        }
      }

      // Apply the typing effect to the full code response
      if (fullCodeResponse) {
        await typeCode(fullCodeResponse);
      }

      // Clear input and selected image
      setInputMessage('');
      setSelectedImage(null);
      setSelectedElementRef({ current: null });
    } catch (error) {
      console.error('Error sending message:', error);
      setChatMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: 'Sorry, there was an error processing your request.' }
      ]);
      setError('Failed to generate response. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const applyStyleToSelection = (style: { [key: string]: string }) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      for (const [styleProperty, value] of Object.entries(style)) {
        span.style[styleProperty as any] = value;
      }
      applyStyle(span, range);
    }
  };

  const applyStyle = (span: HTMLSpanElement, range: Range) => {
    const fragment = range.extractContents();
    span.appendChild(fragment);
    range.insertNode(span);
    updateOutputAndCode();
  };

  const updateOutputAndCode = () => {
    if (previewRef.current) {
      const updatedHtml = previewRef.current.innerHTML;
      setOutput(updatedHtml);
      setCode(updatedHtml);
    }
  };

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageAdd(e.dataTransfer.files[0]);
    }
  };
  const handleImageAdd = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setAddedImages(prev => [...prev, {
        id: `image-${Date.now()}`,
        src,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 200 }
      }]);
    };
    reader.readAsDataURL(file);
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };



  const editorRef = useRef(null);
  const [selectedDesignLabImage, setSelectedDesignLabImage] = useState<{ file: File; url: string } | null>(null);


  const handleDesignLabImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          const imageId = `img_${imageCounter}`;
          setImages(prevImages => ({ ...prevImages, [imageId]: file }));
          setImageUrls(prevUrls => ({ ...prevUrls, [imageId]: event.target?.result as string }));
          setImageCounter(prevCounter => prevCounter + 1);

          // Add the image directly to the preview
          if (previewRef.current) {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            img.setAttribute('data-image-id', imageId);
            previewRef.current.appendChild(img);
            setOutput(previewRef.current.innerHTML);
            setCode(previewRef.current.innerHTML);
          }

          setSelectedDesignLabImage({ file, url: event.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addSelectedImageToPreview = () => {
    if (selectedDesignLabImage) {
      const imageId = `img_${imageCounter}`;
      setImages(prevImages => ({ ...prevImages, [imageId]: selectedDesignLabImage.file }));
      setImageUrls(prevUrls => ({ ...prevUrls, [imageId]: selectedDesignLabImage.url }));
      setImageCounter(prevCounter => prevCounter + 1);

      // Add the image to addedImages for draggable functionality
      setAddedImages(prev => [...prev, {
        id: imageId,
        src: selectedDesignLabImage.url,
        position: { x: 0, y: 0 },
        size: { width: 200, height: 200 }
      }]);

      // Reset the selected image
      setSelectedDesignLabImage(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-lime-200 mb-4 ">
        <div className="flex space-x-2">
          {/* Keep only the Preview button visible */}
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white"
            onClick={() => setActiveTab('preview')}
          >
            <Eye className="inline-block mr-2" size={18} />
            Preview
          </button>
        </div>

        <label
          onClick={toggleEditMode}
          className="inline-flex items-center cursor-pointer"
        >
          <input
            type="checkbox"
            checked={isEditMode}
            onChange={toggleEditMode}
            className="sr-only peer"
          />
          <div
            className={`relative w-11 h-6 rounded-full ${isEditMode ? 'bg-blue-600' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800`}
          >
            <div
              className={`absolute top-[2px] left-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-transform duration-300 ease-in-out ${isEditMode ? 'translate-x-5' : 'translate-x-0'}`}
            ></div>
          </div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Edit
          </span>
        </label>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded flex items-center"
          onClick={handleOpenLive}
        >
          <ExternalLink className="inline-block mr-2" size={18} />
          Open Live
        </button>


        <button
          className="px-4 py-2 bg-purple-400 text-white rounded flex items-center"
          onClick={saveCode}
        >
          <Download className="inline-block mr-2" size={18} />



        </button>
        <Undo2 />
        <Redo2 color="#121111" />
        <Logo />
        <button
          className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 transition-colors"
          onClick={showCodeSection}
        >
          <Code className="inline-block mr-1" size={14} />
          Show Code
        </button>

        {/* Add a small button to show code */}

      </div>

      <div className="flex h-screen bg-gray-100">
        <div className={`w-80 bg-white border-r border-gray-200 flex flex-col ${isChatOpen ? '' : 'hidden'}`}>
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Chat</h2>
            <button onClick={toggleChat} className="text-gray-500 hover:text-gray-700">
              <FiX size={24} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>


          <div className="p-4 border-t border-gray-200">
            <div className="flex">
              {/* Image selection input */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setSelectedImage(files[0]); // Set the selected image
                  }
                }}
                className="hidden" // Hide the default file input
                id="imageInput"
              />
              <label htmlFor="imageInput" className="px-4 py-2 bg-gray-300 text-black rounded-l-md hover:bg-gray-400 transition-colors cursor-pointer">
                <FiImage /> {/* Use an appropriate icon for the gallery */}
              </label>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-grow p-2 border border-gray-300 rounded-r-md"
                placeholder="Type your message..."
              />

              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition-colors"
              >
                <FiSend />
              </button>
            </div>
          </div>

        </div>


       {/* Left Sidebar */}

       <div className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${isLeftSidebarMinimized ? 'w-16' : 'w-64'}`}>
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            {!isLeftSidebarMinimized && <h2 className="text-lg font-semibold">Elements</h2>}
            <button onClick={toggleLeftSidebar} className="text-gray-500 hover:text-gray-700">
              {isLeftSidebarMinimized ? <Sparkles size={24} /> : <Smartphone size={24} />}
            </button>
          </div>
          {!isLeftSidebarMinimized && (
            <>
              <StyleControls onStyleChange={applyStyleToSelection} />
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={toggleGallery}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center justify-center hover:bg-indigo-700 transition-colors"
                >
                  <FiGrid className="mr-2" />
                  Open Gallery
                </button>
              </div>
              <div className="p-4 border-t border-gray-200">
                <div
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleButtonClick}
                  className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-500'
                    }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <p className="text-gray-600">
                    {isDragging
                      ? "Drop the image here..."
                      : "Drag 'n' drop an image here, or click to select one"
                    }
                  </p>
                </div>

              </div>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col">
          {/* Top Toolbar */}
          <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">

            <div className="flex space-x-2">
              <button
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
                onClick={toggleMobileView}
              >
                {isMobileView ? <FiMonitor className="inline-block mr-1" size={14} /> : <FiSmartphone className="inline-block mr-1" size={14} />}
                {isMobileView ? 'Desktop' : 'Mobile'}
              </button>
              <button
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md text-sm hover:bg-indigo-200 transition-colors"
                onClick={saveCode}
              >
                <FiSave className="inline-block mr-1" size={14} />
                Save
              </button>
              <button
                className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
                onClick={handlePublish}
              >
                <FiShare2 className="inline-block mr-1" size={14} />
                Publish
              </button>
            </div>
            <button
              className={`px-3 py-1 ${isTextEditing ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'} rounded-md text-sm hover:bg-indigo-700 transition-colors`}
              onClick={toggleTextEditing}
            >
              <Type className="inline-block mr-1" size={14} />
              {isTextEditing ? 'Finish Editing' : 'Edit Text'}
            </button>
          </div>

          {/* Editor Area */}
          <div className="flex-grow flex overflow-hidden">
            <div className="flex-grow p-4 overflow-auto">
              <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${isMobileView ? 'w-[375px] mx-auto' : 'w-full'}`}>
                <div className="bg-gray-800 px-4 py-2 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  {isMobileView && <div className="ml-4 text-sm text-gray-400">Mobile Preview</div>}
                </div>
                <div className="relative">
                  {/* Preview Section */}
                  <div
                    id="preview-container"
                    className={`${activeTab === 'preview' ? 'block' : 'hidden'} min-h-[500px] relative`}
                  >
                    <div
                      ref={previewRef}
                      dangerouslySetInnerHTML={{ __html: output }}
                      className={`min-h-[200px] max-h-[900px] overflow-auto outline-none ${isTextEditing ? 'cursor-text' : ''}`}
                      contentEditable

                      onMouseOver={handleMouseEvent}
                      onMouseOut={handleMouseEvent}
                      onClick={handleMouseEvent}
                      onMouseDown={handlePreviewInteraction}
                      suppressContentEditableWarning={true}
                    />

                    {hoveredElementRef.current && hoveredElementRef.current !== selectedElementRef.current && (
                      <div
                        className="absolute border border-blue-300 pointer-events-none transition-all duration-200 ease-in-out"
                        style={{
                          top: hoveredElementRef.current.getBoundingClientRect().top - previewRef.current!.getBoundingClientRect().top,
                          left: hoveredElementRef.current.getBoundingClientRect().left - previewRef.current!.getBoundingClientRect().left,
                          width: hoveredElementRef.current.getBoundingClientRect().width,
                          height: hoveredElementRef.current.getBoundingClientRect().height,
                        }}
                      />
                    )}

                    {selectedElementRef.current && (
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          top: selectedElementRef.current.getBoundingClientRect().top - previewRef.current!.getBoundingClientRect().top,
                          left: selectedElementRef.current.getBoundingClientRect().left - previewRef.current!.getBoundingClientRect().left,
                          width: selectedElementRef.current.getBoundingClientRect().width,
                          height: selectedElementRef.current.getBoundingClientRect().height,
                        }}
                      >
                        {/* Main border */}
                        <div className="absolute inset-0 border-2 border-blue-500 rounded-sm transition-all duration-200 ease-in-out"></div>

                        {/* Corner handles */}
                        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
                          <div
                            key={corner}
                            className={`absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full ${corner.includes('top') ? 'top-0' : 'bottom-0'
                              } ${corner.includes('left') ? 'left-0' : 'right-0'} -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out`}
                          ></div>
                        ))}

                        {/* Side handles */}
                        {['top', 'right', 'bottom', 'left'].map((side) => (
                          <div
                            key={side}
                            className={`absolute bg-white border-2 border-blue-500 ${side === 'top' || side === 'bottom' ? 'w-4 h-3 -translate-x-1/2' : 'w-3 h-4 -translate-y-1/2'
                              } ${side === 'top' ? 'top-0' : side === 'bottom' ? 'bottom-0' : ''} ${side === 'left' ? 'left-0' : side === 'right' ? 'right-0' : ''
                              } transition-all duration-200 ease-in-out`}
                          ></div>
                        ))}

                        {/* Element type label */}
                        <div className="absolute top-0 left-0 -translate-y-full bg-blue-500 text-white text-xs px-2 py-1 rounded-t-sm shadow-md transition-all duration-200 ease-in-out">
                          <span className="font-semibold">{selectedElementRef.current.tagName.toLowerCase()}</span>
                          <span className="ml-2 text-blue-200">#{selectedElementRef.current.id}</span>
                          <span className="ml-2 text-blue-200">.{Array.from(selectedElementRef.current.classList).join('.')}</span>
                        </div>

                        {/* Action buttons */}
                        <div className="absolute top-0 right-0 -translate-y-full flex space-x-1 bg-blue-500 rounded-t-sm overflow-hidden shadow-md">
                          <button className="p-1 hover:bg-blue-600 transition-colors duration-200">
                            <FiMove size={14} className="text-white" />
                          </button>
                          <button className="p-1 hover:bg-blue-600 transition-colors duration-200">
                            <FiMaximize2 size={14} className="text-white" />
                          </button>
                          <button className="p-1 hover:bg-blue-600 transition-colors duration-200">
                            <FiCornerRightDown size={14} className="text-white" />
                          </button>
                        </div>
                      </div>
                    )}
                    {addedImages.map(img => (
                      <Rnd
                        key={img.id}
                        position={img.position}
                        size={img.size}
                        onDragStop={(e, d) => updateImagePosition(img.id, { x: d.x, y: d.y })}
                        onResizeStop={(e, direction, ref, delta, position) => {
                          updateImageSize(img.id, {
                            width: parseInt(ref.style.width),
                            height: parseInt(ref.style.height)
                          });
                          updateImagePosition(img.id, position);
                        }}
                        bounds="parent"
                      >
                        <Image
                          src={img.src}
                          alt="Added image"
                          layout="fill"
                          objectFit="contain"
                          style={{ pointerEvents: 'none' }}
                        />
                        <button
                          onClick={() => removeAddedImage(img.id)}
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                          style={{ zIndex: 1000 }}
                        >
                          X
                        </button>
                      </Rnd>
                    ))}
                  </div>

                  {/* Code Section */}
                  <div className={`${activeTab === 'code' ? 'block' : 'hidden'} bg-gray-900`}>
                    <textarea
                      style={{ height: 'calc(50vh - 30px)', width: '100%' }}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-full p-2 text-white bg-gray-900 border border-gray-700 rounded"
                    /><Suspense fallback={<div>Loading...</div>}>
                    <BuilderPage setCode={setCode} />
                  </Suspense>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={`bg-gradient-to-b from-indigo-100 to-white border-l border-gray-200 flex flex-col transition-all duration-300 ${isRightSidebarMinimized ? 'w-16' : 'w-60'}`}>
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
            {!isRightSidebarMinimized && <h2 className="text-lg font-semibold text-indigo-600">Design Lab</h2>}
            <button onClick={toggleRightSidebar} className="text-gray-500 hover:text-indigo-600 transition-colors">
              {isRightSidebarMinimized ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
            </button>
          </div>
          {!isRightSidebarMinimized && (
            <div className="flex-grow overflow-y-auto px-2">

              {/* Quick Actions */}
              <div className="flex justify-center space-x-4 mb-6">
                {[
                  { icon: <MousePointerClick size={20} />, label: "Select" },

                  { icon: <Type size={20} />, label: "Text" },
                  { icon: <FiMessageSquare size={20} />, label: "Chat", onClick: toggleChat },
                  { icon: <FiGrid size={20} />, label: "Gallery", onClick: toggleGallery },
                ].map((action, index) => (
                  <button key={index} onClick={action.onClick} className="flex flex-col items-center group">
                    <div className="p-3 bg-white rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:bg-indigo-50">
                      {action.icon}
                    </div>
                    <span className="mt-2 text-xs text-gray-600 group-hover:text-indigo-600">{action.label}</span>
                  </button>
                ))}
              </div>

              {/* Settings Sections */}
              <div className="space-y-8">
                {/* Image Settings */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                    <FiImage className="mr-2" size={18} />
                    Image
                  </h3>
                  <div className="space-y-4">
                    <select
                      value={imageSize}
                      onChange={handleImageSizeChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="small">Compact</option>
                      <option value="medium">Standard</option>
                      <option value="large">Expansive</option>
                    </select>
                    <div className="flex space-x-2">
                      <button onClick={applyImage} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors">Apply</button>
                      <button onClick={removeImage} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors">Remove</button>
                    </div>
                    <div className="relative">
                      <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <div className="w-full px-4 py-2 bg-gray-100 text-center text-gray-600 rounded-md border-2 border-dashed border-gray-300 hover:bg-gray-200 transition-colors">
                        Upload Image
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleDesignLabImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="w-full px-4 py-2 bg-gray-100 text-center text-gray-600 rounded-md border-2 border-dashed border-gray-300 hover:bg-gray-200 transition-colors">
                        Choose Image
                      </div>
                    </div>

                    {selectedDesignLabImage && (
                      <div className="mt-4">
                       <Image 
  src={selectedDesignLabImage.url} 
  alt="Selected design lab image" 
  width={300}
  height={160}
  objectFit="cover"
  className="rounded-md"
/>
                        <button
                          onClick={addSelectedImageToPreview}
                          className="mt-2 w-full px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
                        >
                          Add to Preview
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Color Settings */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                    <FiDroplet className="mr-2" size={18} />
                    Color
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      {selectedColors.map((color, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <input
                            type="color"
                            value={color}
                            onChange={handleColorChange}
                            onClick={() => setActiveColorIndex(index)}
                            className={`w-12 h-12 rounded-full border-4 ${activeColorIndex === index ? 'border-indigo-500' : 'border-white'} shadow-inner`}
                          />
                          <div className="mt-1 text-xs text-gray-500 text-center">{color}</div>
                        </div>
                      ))}
                    </div>
                    <div className="h-8 rounded-md" style={{ background: `linear-gradient(45deg, ${selectedColors.join(', ')})` }}></div>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={applyColor} className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors">Apply</button>
                      <button onClick={removeColor} className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors">Remove</button>
                      <button onClick={() => removeAppliedStyle('color')} className="col-span-2 px-4 py-2 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 transition-colors">Reset Palette</button>
                    </div>
                  </div>
                </div>


                {/* Animation Settings */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                    <FiPlay className="mr-2" size={18} />
                    Motion Potion
                  </h3>
                  <div className="space-y-4">
                    <select
                      value={selectedAnimation}
                      onChange={handleAnimationChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Choose Your Spell</option>
                      <option value="fadeIn">Fade In</option>
                      <option value="slideIn">Slide In</option>
                      <option value="bounce">Bounce</option>
                      <option value="rotate">Rotate</option>
                    </select>
                    <div className="flex space-x-2">
                      <button onClick={applyAnimation} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors">Cast Spell</button>
                      <button onClick={removeAllAnimations} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors">Dispel All</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          )}
        </div>

        {/* Gallery Modal */}
        {isGalleryOpen && (
          <div className={`fixed inset-y-0 right-0 bg-white shadow-lg z-50 transition-all duration-300 ${isGalleryMinimized ? 'w-16' : 'w-96'
            }`}>
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                {!isGalleryMinimized && <h2 className="text-xl font-bold">Gallery</h2>}
                <div className="flex items-center">
                  <button onClick={toggleMinimizeGallery} className="text-gray-500 hover:text-gray-700 mr-2">
                    {isGalleryMinimized ? <FiMaximize2 className="text-xl" /> : <FiMinimize2 className="text-xl" />}
                  </button>
                  <button onClick={toggleGallery} className="text-gray-500 hover:text-gray-700">
                    <FiX className="text-xl" />
                  </button>
                </div>
              </div>
              {!isGalleryMinimized && (
                <>
                  <div className="flex space-x-2 mb-4">
                    <button
                      onClick={() => setGalleryTab('images')}
                      className={`px-3 py-1 rounded ${galleryTab === 'images' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Theme
                    </button>
                    <button
                      onClick={() => setGalleryTab('logos')}
                      className={`px-3 py-1 rounded ${galleryTab === 'logos' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Logos
                    </button>
                    <button
                      onClick={() => setGalleryTab('client')}
                      className={`px-3 py-1 rounded ${galleryTab === 'client' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Image
                    </button>
                  </div>
                  <div className="flex-grow overflow-y-auto">
                  {galleryTab === 'images' && <Gallery onSelectImage={handleSelectGalleryImage} />}
                   {galleryTab === 'logos' && <LogoGenerator />}
                   {galleryTab === 'client' && <Client />}
                  </div>
                  {selectedGalleryImage && galleryTab !== 'client' && (
                    <button
                      onClick={applySelectedImage}
                      className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
                    >
                      Apply Selected {galleryTab === 'logos' ? 'Logo' : 'Image'}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Minimized Gallery Preview */}
        {isGalleryOpen && isGalleryMinimized && selectedGalleryImage && (
          <div className="fixed bottom-4 right-20 bg-white p-2 rounded-lg shadow-md">
         <Image
  src={selectedGalleryImage.url ?? ''}
  alt="Selected gallery image"
  width={48}
  height={48}
  objectFit="cover"
  className="rounded"
/>
            <button
              onClick={applySelectedImage}
              className="mt-2 w-full px-2 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 transition duration-200"
            >
              Apply
            </button>
          </div>
        )}


        {/* Publish Modal */}
   



        {/* Global Styles */}
        <style jsx global>{`
            #preview-container *[data-image-id] {
              background-size: ${imageSize};
              background-position: center;
              background-repeat: no-repeat;
            }
            ${Object.entries(imageUrls).map(([imageId, url]) => `
              #preview-container *[data-image-id="${imageId}"] {
                background-image: url('${url}');
              }
            `).join('\n')}
            .typing-cursor::after {
              content: '|';
              animation: blink 0.7s infinite;
            }
            @keyframes blink {
              0% { opacity: 0; }
              50% { opacity: 1; }
              100% { opacity: 0; }
            }
          `}</style>
      </div>
    </div>

  );
};

export default CodePreview;



