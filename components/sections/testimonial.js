import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper core styles
import 'swiper/css/navigation'; // Import Swiper navigation styles
import 'swiper/css/pagination'; // Import Swiper pagination styles

SwiperCore.use([Navigation, Pagination]);


const testimonialsData = [
  {
    id: 1,
    author: 'John Doe',
    position: 'CEO, Example Company',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'background.jpg', 
  },
  {
    id: 2,
    author: 'Jane Smith',
    position: 'CTO, Another Company',
    content:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'background.jpg', 
  },
  {
    id: 3,
    author: 'Abebe Kebede',
    position: 'CTO, Another Company',
    content:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'background.jpg', 
  },
  {
    id: 4,
    author: 'Kebede Abebe',
    position: 'CTO, Another Company',
    content:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'background.jpg', 
  },
  {
    id: 5,
    author: 'Kebede Abebe',
    position: 'CTO, Another Company',
    content:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'background.jpg', 
  },
  {
    id: 6,
    author: 'Kebede Abebe',
    position: 'CTO, Another Company',
    content:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'background.jpg', 
  },
  {
    id: 7,
    author: 'Kebede Abebe',
    position: 'CTO, Another Company',
    content:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'background.jpg', 
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6">Testimonials</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={4} // Display 4 testimonials per screen
          navigation
          pagination={{ clickable: true }}
          className="mySwiper"
        >
          {testimonialsData.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-56">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <p className="text-lg mb-2 font-bold">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                  <p className="mt-4">{testimonial.content}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
