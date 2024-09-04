import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const News = () => {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news');
        setNewsArticles(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-10 px-4 md:px-10 lg:px-20">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-customgreen1">Latest News</h1>
        <div className="space-y-8">
          {newsArticles.map((article) => (
            <div
              key={article._id}
              className="news-item p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:bg-gray-50 transition duration-300"
            >
              <h2 className="text-3xl font-semibold mb-2 text-customgreen1">{article.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{new Date(article.date).toLocaleDateString()}</p>
              <p className="text-gray-800 mb-4 leading-relaxed">{article.content}</p>
              {article.image && (
                <div className="mt-4">
                  <img src={article.image} alt={article.title} className="rounded-lg w-full max-h-80 object-cover" />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default News;
