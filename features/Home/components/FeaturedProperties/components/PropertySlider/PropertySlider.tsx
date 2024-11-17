import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PropertyCard from "@/features/common/modules/PropertyCard";
import { useIsDesktop } from "@/features/common/Hooks/useIsDesktop";
import { Hit } from "@/lib/properties";

const PropertySlider: React.FC<{ featuredProperties: Hit[] }> = ({
  featuredProperties,
}) => {
  const { isDesktop } = useIsDesktop();

  return (
    <Swiper
      slidesPerView={isDesktop ? 3 : 1}
      spaceBetween={10}
      loop={true}
      centeredSlides={true}
      autoplay={{ delay: 2000, disableOnInteraction: true }}
      pagination={{ dynamicBullets: true }}
      className="mySwiper"
    >
      {featuredProperties.map((hit) => (
        <SwiperSlide key={hit.id}>
          <PropertyCard hit={hit} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PropertySlider;
