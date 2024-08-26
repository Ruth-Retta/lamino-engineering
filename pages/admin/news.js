import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageNews = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    image: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('/api/news');
      setNewsArticles(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const addNews = async () => {
    try {
      await axios.post('/api/news', newArticle);
      fetchNews();
    } catch (error) {
      console.error('Error adding news:', error);
    }
  };

  const deleteNews = async (id) => {
    try {
      await axios.delete(`/api/news/${id}`);
      fetchNews();
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  return (
    <div>
      <h1>Manage News</h1>
      <div>
        <h2>Add New Article</h2>
        <input
          type="text"
          placeholder="Title"
          value={newArticle.title}
          onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newArticle.content}
          onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
        ></textarea>
        <input
          type="text"
          placeholder="Image URL"
          value={newArticle.image}
          onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
        />
        <input
          type="date"
          value={newArticle.date}
          onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })}
        />
        <button onClick={addNews}>Add Article</button>
      </div>
      <ul>
        {newsArticles.map((article) => (
          <li key={article._id}>
            <h3>{article.title}</h3>
            <p>{new Date(article.date).toLocaleDateString()}</p>
            <p>{article.content}</p>
            {article.image && <img src={article.image} alt={article.title} className="h-24 w-auto" />}
            <button onClick={() => deleteNews(article._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageNews;
