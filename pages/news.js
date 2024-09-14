import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from "next/image";

const News = () => {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news');
        const sortedNews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date
        setNewsArticles(sortedNews);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main style={{ marginTop: '80px' }} className="flex-grow container mx-auto py-10 px-4 md:px-10 lg:px-20">
        {/* <h1 className="text-4xl font-extrabold mb-12 text-center text-customgreen1">Latest News</h1> */}
        <div className="space-y-12">
          {newsArticles.map((article) => (
            <div
              key={article._id}
              className="news-item flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-gray-800">{article.title}</h2>
                <p className="text-sm text-gray-500">{new Date(article.date).toLocaleDateString()}</p>
              </div>

              {article.imageId && (
                <div className="relative w-full h-64 mb-6">
                  <Image
                    src={`/api/news/image/${article.imageId}?t=${new Date().getTime()}`}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              )}

              <p className="text-gray-700 mb-4 leading-relaxed">
                {article.content}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default News;
