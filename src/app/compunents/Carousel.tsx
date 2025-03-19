"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import img1 from "../pic/image/carsol1.jpg";
import imge2 from "../pic/image/carsol4.jpg";
import imge3 from "../pic/image/carsol5.jpg";
import imge4 from "../pic/image/carsol6.jpg";

const Carousel = () => {
  const totalSlides = 4;
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isAutoplay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev % totalSlides) + 1);
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoplay]);

  return (
    <div className="relative w-full h-64 overflow-hidden"> {/* 👈 Set height for banner */}
      {/** Slides **/}
      <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${(currentSlide - 1) * 100}%)` }}>
        
        {[img1, imge2, imge3, imge4].map((img, index) => (
          <div key={index} className="min-w-full h-64 relative">
            <Image src={img} alt={`Slide ${index + 1}`} layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
        ))}

      </div>

      {/** Navigation Arrows **/}
      <button onClick={() => setCurrentSlide((currentSlide - 2 + totalSlides) % totalSlides + 1)}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full hover:bg-gray-600">
        ❮
      </button>

      <button onClick={() => setCurrentSlide((currentSlide % totalSlides) + 1)}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full hover:bg-gray-600">
        ❯
      </button>
    </div>
  );
};

export default Carousel;
