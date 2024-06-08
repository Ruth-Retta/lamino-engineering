import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper bundle CSS
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Navigation, Pagination]);

const HomeSection = () => {
  return (
    <Swiper
      spaceBetween={10} // Adjust the space between slides
      slidesPerView={1} // Ensure only one slide is fully visible at a time
      centeredSlides={true} // Center the active slide
      navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <div className="slide-content">
          <img src="/background.jpg" alt="Slide 1" className="slide-image" />
          <div className="slide-text">
            <h1>Catchy Phrase 1</h1>
            <p>Description for Slide 1</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide-content">
          <img src="/background.jpg" alt="Slide 2" className="slide-image" />
          <div className="slide-text">
            <h1>Catchy Phrase 2</h1>
            <p>Description for Slide 2</p>
          </div>
        </div>
      </SwiperSlide>

      {/* Navigation Buttons */}
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </Swiper>
  );
};

export default HomeSection;
