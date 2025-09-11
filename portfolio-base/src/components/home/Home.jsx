import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"

import { fetchData } from "@/lib/api"

import Autoplay from "embla-carousel-autoplay"

export default function Home() {


  const slides = [
    {
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1887&auto=format&fit=crop"
    },
    {
      image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1887&auto=format&fit=crop"
    },
    {
      image: "https://images.unsplash.com/photo-1535241749838-299277b6305f?q=80&w=1887&auto=format&fit=crop"
    }
  ]

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3500,
          stopOnInteraction: true,
        })
      ]}
      opts={{
        loop: true,
        speed: 5
       
      }}
      onPointerDown={e => {


      }}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <img
              src={slide.image}
              alt="slide"
              className="w-full h-56 sm:h-64 md:h-130 lg:h-130 object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
   </Carousel>
  )
}
