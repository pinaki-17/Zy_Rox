 // This directive is Next.js specific, remove for Vite/React

import { useState, useEffect, useCallback } from "react"
// import Image from "next/image" // Replace with <img>
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Slide {
  src: string
  alt: string
  hint: string
}

const slidesData: Slide[] = [
  { src: "https://picsum.photos/1200/500?random=1", alt: "Abstract Landscape", hint: "nature landscape" },
  { src: "https://picsum.photos/1200/500?random=2", alt: "Modern Architecture", hint: "city architecture" },
  { src: "https://picsum.photos/1200/500?random=3", alt: "Serene Beach", hint: "beach sunset" },
  { src: "https://picsum.photos/1200/500?random=4", alt: "Forest Path", hint: "forest path" },
]

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = useCallback(() => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slidesData.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }, [currentIndex])

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slidesData.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }, [currentIndex])

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  useEffect(() => {
    const timer = setTimeout(nextSlide, 5000) // Auto-slide every 5 seconds
    return () => clearTimeout(timer)
  }, [currentIndex, nextSlide])

  if (slidesData.length === 0) {
    return <div>Loading slides...</div>
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto aspect-[12/5] overflow-hidden rounded-lg shadow-xl group">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slidesData.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 h-full relative">
            <img
              src={slide.src}
              alt={slide.alt}
              data-ai-hint={slide.hint}
              className="w-full h-full object-cover rounded-lg"
              loading={index === 0 ? "eager" : "lazy"} // Basic loading optimization
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slidesData.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={cn(
              "w-3 h-3 rounded-full transition-colors duration-300",
              currentIndex === slideIndex ? "bg-primary" : "bg-background/50 hover:bg-background/80"
            )}
            aria-label={`Go to slide ${slideIndex + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
