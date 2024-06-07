import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper bundle CSS
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Navigation, Pagination]);

const HomeSection = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <div
          style={{
            backgroundImage: `url('/background.jpg')`,
            height: '100vh',
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white'
          }}
        >
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Catchy Phrase 1</h1>
            <p style={{ fontSize: '1.2rem', opacity: '0.8' }}>Description for Slide 1</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{
            backgroundImage: `url('/background.jpg')`,
            height: '100vh',
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white'
          }}
        >
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Catchy Phrase 2</h1>
            <p style={{ fontSize: '1.2rem', opacity: '0.8' }}>Description for Slide 2</p>
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
