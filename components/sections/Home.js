import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const HomeSection = () => {
  return (
    <section id="home" >
    <Swiper
      spaceBetween={5}
      slidesPerView={1}
      centeredSlides={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
    >
      <SwiperSlide>
        <div className="slide-content">
          <img src="/background.jpg" alt="Slide 1" className="slide-image" />
          <div className="slide-text">
            <h1>Let’s Shape the Future Together</h1>
            <p>Whether you’re looking to revolutionize your IT strategy, fortify your IT infrastructure, or embrace the latest fintech advancements, we’re here to help you chart the course. Join us on the journey to a brighter, technology-driven future. Let’s talk about how we can transform your business.</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide-content">
          <img src="/background.jpg" alt="Slide 2" className="slide-image" />
          <div className="slide-text">
            <h1>Redefining Technology for Tomorrow</h1>
            <p>At Lamino Engineering, we’re more than a technology company; we’re a catalyst for transformation. With a relentless focus on innovation, we merge the worlds of IT, IT infrastructure, and fintech to pioneer the future of business technology.</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    </section>
  );
};

export default HomeSection;
