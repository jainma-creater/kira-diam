'use client';

import { useState, useRef, useEffect } from 'react';

interface VideoSectionProps {
  title?: string;
  videoSrc?: string;
  fallbackImage?: string;
}

export default function VideoSection({
  title = '3D Jewelry Experience',
  videoSrc = '/jewelry.mp4',
  fallbackImage = '/jewelry.jpg'
}: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoLoaded = () => {
    setIsLoading(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  return (
    <section className="py-24 md:py-32 px-4 md:px-6 bg-gradient-to-b from-white to-[#F5F7FB]">
      <div className="max-w-6xl mx-auto">
        {/* Heading with animation */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h2 className="text-2xl md:text-4xl font-bold text-[#2F428C] mb-2 font-serif">
            {title}
          </h2>
          <p className="text-gray-600 text-xs md:text-sm max-w-2xl mx-auto">
            Discover exquisite jewelry craftsmanship in stunning detail
          </p>
        </div>

        {/* Video Container */}
        <div 
          className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#2F428C]/10 group animate-fade-in-up bg-gray-900"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#2F428C]/40 to-black/60 flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
                <p className="text-white text-xs md:text-sm font-medium">Loading video...</p>
              </div>
            </div>
          )}

          {/* Fallback Image (shown on error or as poster) */}
          {hasError && (
            <img 
              src={fallbackImage} 
              alt="Jewelry collection showcase"
              className="w-full h-full object-cover"
            />
          )}

          {/* Video Element */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={fallbackImage}
            className={`w-full h-auto block bg-black transition-transform duration-300 ${!hasError ? 'group-hover:scale-105' : 'hidden'}`}
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            aria-label={`${title} video demonstration`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          {/* Play/Pause Overlay Button */}
          <button
            onClick={togglePlayPause}
            className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0 hover:opacity-100'
            } group/btn`}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {!isPlaying && (
              <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#D4AF37]/90 shadow-2xl hover:bg-[#D4AF37] transition-all duration-200 transform group-hover/btn:scale-110">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-[#2F428C] ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
          </button>

          {/* Premium Badge */}
          <div className="absolute top-4 md:top-6 right-4 md:right-6 z-20 pointer-events-none">
            <div className="inline-block bg-[#D4AF37]/20 backdrop-blur-md text-[#D4AF37] px-3 py-1 rounded-full text-xs md:text-sm font-semibold border border-[#D4AF37]/30">
              ✨ Premium Quality
            </div>
          </div>

          {/* Gradient Overlay Border */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </section>
  );
}