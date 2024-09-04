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
  const [imageFile, setImageFile] = useState(null);
  const [editingArticleId, setEditingArticleId] = useState(null);

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

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const addOrUpdateNews = async () => {
    try {
      if (imageFile) {
        const imageUrl = await uploadImage(imageFile);
        setNewArticle((prevState) => ({ ...prevState, image: imageUrl }));
      }

      if (editingArticleId) {
        await axios.put(`/api/news/${editingArticleId}`, newArticle);
      } else {
        await axios.post('/api/news', newArticle);
      }

      fetchNews();
      resetForm();
    } catch (error) {
      console.error('Error saving news:', error);
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

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // const handleEditClick = (article) => {
  //   setNewArticle({
  //     title: article.title,
  //     content: article.content,
  //     image: article.image,
  //     date: article.date,
  //   });
  //   setEditingArticleId(article._id);
  // };

  async function handleFileUpload(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
  
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
  
    const result = await response.json();
    console.log(result);
  }

  const resetForm = () => {
    setNewArticle({ title: '', content: '', image: '', date: new Date().toISOString().split('T')[0] });
    setImageFile(null);
    setEditingArticleId(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Manage News</h1>
      <div className="bg-white p-6 rounded shadow-md mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          {editingArticleId ? 'Update Article' : 'Add New Article'}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newArticle.title}
            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Content"
            value={newArticle.content}
            onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded"
            rows="6"
          ></textarea>
          <input type="file" onChange={handleFileUpload} />
          <input
            type="date"
            value={newArticle.date}
            onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded"
          />
          <button
            onClick={addOrUpdateNews}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editingArticleId ? 'Update Article' : 'Add Article'}
          </button>
          {editingArticleId && (
            <button
              onClick={resetForm}
              className="w-full py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">News Articles</h2>
        <ul className="space-y-6">
          {newsArticles.map((article) => (
            <li key={article._id} className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-2">{new Date(article.date).toLocaleDateString()}</p>
              <p className="mb-4">{article.content}</p>
              {article.image && <img src={article.image} alt={article.title} className="w-full h-48 object-cover mb-4 rounded" />}
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEditClick(article)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNews(article._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageNews;

