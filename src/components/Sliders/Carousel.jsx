import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

export const Carousel = ({ children }) => {
    return (
        <Swiper
            slidesPerView={5}
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
        >
            {children.map((child, index) => (
                <SwiperSlide key={`swiper-slide-${index}`}>
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}