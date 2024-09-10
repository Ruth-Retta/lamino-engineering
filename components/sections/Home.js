import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import React, { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const HomeSection = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        const sortedNews = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        const recentNews = sortedNews.slice(0, 3);
        setNews(recentNews);
      })
      .catch((err) => console.error(err));
  }, []);
  
  return (
    <section id="home" >
    <Swiper
      spaceBetween={5}
      slidesPerView={1}
      centeredSlides={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
    >

        {news.map((news, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content">
                <Image
                  src={`/api/news/image/${news.imageId}?t=${new Date().getTime()}`}
                  alt={news.title}
                  width={100}
                  height={100}
                  className="slide-image"
                />
                <div className="slide-text">
                <h1>{news.title}</h1>
                <p>{news.content}</p>
                </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
    </section>
  );
};

export default HomeSection;
