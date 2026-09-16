import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

export function ImageGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Pre-load images for smoother transitions
  useEffect(() => {
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Display */}
      <div className="relative aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden rounded-2xl group bg-gray-100">
        <img 
          src={images[currentIndex]} 
          alt={`Gallery image ${currentIndex + 1}`} 
          className="w-full h-full object-cover transition-transform duration-500"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-900 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-900 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
        
        {/* Fullscreen Toggle */}
        <button 
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
        >
          <ZoomIn className="w-5 h-5" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur rounded-full text-white text-xs font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {images.map((src, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentIndex(i)}
              className={`relative flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden ${currentIndex === i ? 'ring-2 ring-blue-600 ring-offset-2' : 'opacity-70 hover:opacity-100 transition-opacity'}`}
            >
              <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur flex items-center justify-center">
          <button 
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          <img 
            src={images[currentIndex]} 
            alt="Fullscreen view" 
            className="max-w-full max-h-[90vh] object-contain"
          />

          {images.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
          
          {/* Thumbnails in lightbox */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4 py-2">
            {images.map((src, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentIndex(i)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${currentIndex === i ? 'border-white' : 'border-transparent opacity-50 hover:opacity-100'}`}
              >
                <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
