import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

export const SimilarCarousel = ({ children }) => {
    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation]}
        >
            {children.map((child, index) => (
                <SwiperSlide key={`swiper-slide-${index}`}>
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}