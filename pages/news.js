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
    <div>
      <Header />
      <main className="container mx-auto py-10 px-4 md:px-20">
        <h1 className="text-4xl font-bold mb-6">Latest News</h1>
        <div className="space-y-8">
          {newsArticles.map((article) => (
            <div key={article._id} className="news-item p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
              <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-500">{new Date(article.date).toLocaleDateString()}</p>
              <p className="text-gray-700 mt-4">{article.content}</p>
              {article.image && (
                <div className="mt-6">
                  <img src={article.image} alt={article.title} className="rounded-lg w-full h-auto" />
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
