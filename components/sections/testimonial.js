import React, { useState, useEffect } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

SwiperCore.use([Navigation, Pagination]);

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="testimonials-section">
      <h2 className="text-4xl font-bold mb-6 text-center text-custom-green-2">Testimonials</h2>
      <div className="container mx-auto my-auto p-10">
      <Swiper
        spaceBetween={10}
        slidesPerView={testimonials.length < 4 ? testimonials.length : 3} 
        centeredSlides={testimonials.length < 4} 
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: testimonials.length < 4 ? testimonials.length : 3, 
          },
          1440: {
            slidesPerView: 4,
          }
        }}
        pagination={{ clickable: true }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card">
              <div className="testimonial-header">
                <Image
                  src={`/api/testimonials/image/${testimonial.imageId}?t=${new Date().getTime()}`}
                  alt={testimonial.author}
                  width={100}
                  height={100}
                  className="testimonial-image"
                />
                <div className="testimonial-info">
                  <h3 className="testimonial-author">{testimonial.author}</h3>
                  <p className="testimonial-position">{testimonial.position}</p>
                  <p className="testimonial-date">{new Date(testimonial.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="testimonial-content">
                <p>{testimonial.content}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
