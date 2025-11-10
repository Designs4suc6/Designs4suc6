"use client"
import { useState, useEffect } from 'react';

export default function Portfolio() {
  // Updated cardData to include an array of images for each card
  const cardData = [
    {
      images: [
        '/images/Portfolio - KPSA.webp',
        '/images/Portfolio - KPSA Tablet & Mobile.webp',
      ],
      heading: "KPSA",
      subheading: "At KPSA, we help companies and initiatives take the next step. Our focus is on strategy, funding and execution. With a hands-on approach that goes beyond advice.",
      link: 'view site',
      url: 'https://kpsa.nl/'
    },
    {
      images: [
        '/images/Portfolio - Like-Fresh.webp',
        '/images/Portfolio - Like-Fresh Tablet & Mobile.webp',
      ],
      heading: "Like Fresh",
      subheading: "Like-Fresh is the next level experience in plant based dairy. Made special for flexitarians, vegetarians and vegans.",
      link: 'view site',
      url: 'https://like-fresh.com/'
    },
    {
      images: [
        '/images/Portfolio_farm-32.webp',
        '/images/Portfolio farm-32 Tablet & Mobile.webp',
      ],
      heading: "farm-32",
      subheading: "farm-32's mission is clear: to guarantee food security, anywhere, anytime, through clean energy and sustainable farming techniques.",
      link: 'view site',
      url: 'https://farm-32.nl/'
    },
  ];

  return (
    <div className="bg-gray-500 py-16 px-4">
      <div className='flex flex-col items-center text-center max-w-4xl mx-auto mb-12'>
        <h2 className='text-pink text-2xl md:text-3xl font-normal mb-3 ls-51 uppercase text-center' style={{ color: '#B60B13' }}>Portfolio</h2>
        <p className='text-grey md:text-lg font-normal mb-10' style={{ color: '#645F5A' }}>
          Here are some of the websites I have produced previously. All distinct in their design. Check them out yourself and see how responsive their designs are on tablet and mobile too!
         
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {/* <h3 className="text-pink-500 text-lg font-normal uppercase tracking-wider mb-2">Portfolio</h3> */}
          {/* <p className="text-4xl font-semibold" style={{color: 'red'}}>My Portfolio</p>        */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {cardData.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Updated interface for the card item to support multiple images and URL
interface CardItem {
  images: string[];
  heading: string;
  subheading: string;
  link: string;
  url: string;
}

function Card({ item }: { item: CardItem }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hasChangedOnce, setHasChangedOnce] = useState(false);
  
  // Effect to cycle through images when hovering
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isHovering && item.images.length > 1) {
      // Quick initial change (500ms)
      if (!hasChangedOnce) {
        const initialTimerId = setTimeout(() => {
          setCurrentImageIndex(1); // Move directly to second image
          setHasChangedOnce(true);
        }, 100);
        
        return () => clearTimeout(initialTimerId);
      } else {
        // Slower subsequent changes (2000ms)
        intervalId = setInterval(() => {
          setCurrentImageIndex((prevIndex) => 
            prevIndex === item.images.length - 1 ? 0 : prevIndex + 1
          );
        }, 20000); // Slower cycling for subsequent images
      }
    }
    
    // Reset when not hovering
    if (!isHovering) {
      setCurrentImageIndex(0);
      setHasChangedOnce(false);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHovering, item.images.length, hasChangedOnce]);

  return (
    <div 
      style={{ backgroundColor: '#f8f7f7' }} 
      className="rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setCurrentImageIndex(0); // Reset to first image when not hovering
      }}
    >
      <div className="h-48 relative" style={{ backgroundColor: '#f8f7f7' }}>
        {item.images.map((src, index) => (
          <img 
            key={index}
            src={src} 
            alt={`${item.heading} image ${index + 1}`} 
            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <div className="p-6" style={{ backgroundColor: '#f8f7f7' }}>
        <h3 className="text-2xl font-medium text-lightgrey mb-2" style={{ color: '#FDD194' }}>{item.heading}</h3>
        <p className="text-base text-lightgrey mb-6" style={{ color: '#645F5A' }}>{item.subheading}</p>
        <div className="flex justify-between border-t border-gray-400 pt-4">
          <a 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-pink-500 font-medium flex items-center hover:text-pink-700" 
            style={{ color: '#B60B13' }}
          >
            {item.link}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}