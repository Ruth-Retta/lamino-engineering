import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';


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
    <section class="home" >
    <Swiper
      spaceBetween={5}
      slidesPerView={1}
      centeredSlides={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
    >
        {news.length > 0 ? (
            news.map((news) => (
          <SwiperSlide key={news._id}>
            <div className="slide-content">
                <Image
                  src={`/api/news/image/${news.imageId}?t=${new Date().getTime()}`}
                  alt={news.title}
                  width={100}
                  height={100}
                  className="slide-image"
                  unoptimized
                />
                <div className="slide-text">
                <h1>{news.title}</h1>
                <p>{news.content}</p>
                </div>
            </div>
          </SwiperSlide>
        ))
      ) : (
        <p className="text-center text-lg">No recent news available</p>
      )}
    </Swiper>
    </section>
  );
};

export default HomeSection;
