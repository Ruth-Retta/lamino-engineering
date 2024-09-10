import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Image from "next/image";

const ManageNews = () => {
  const [news, setNews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
    date: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('/api/news');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const apiCall = isEditing ? updateNews : addNews;
    await apiCall();
  };

  const addNews = async () => {
    try {
      await axios.post("/api/news", createFormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetForm();
      fetchNews();
    } catch (error) {
      handleApiError("adding", error);
    }
  };

  const updateNews = async () => {
    try {
      await axios.put(`/api/news/${formData._id}`, createFormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetForm();
      fetchNews();
    } catch (error) {
      handleApiError("updating", error);
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

 
 // Helper functions
 const createFormData = () => {
  const data = new FormData();
  Object.keys(formData).forEach((key) => {
    if (formData[key] !== null && formData[key] !== undefined) {
      data.append(key, formData[key]);
    }
  });
  return data;
};

const validateForm = () => {
  const newErrors = {};
  const requiredFields = [
    "title",
    "content",
    "date",
  ];
  requiredFields.forEach((field) => {
    if (!formData[field])
      newErrors[field] = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } is required`;
  });
  if (!isEditing && !formData.image) newErrors.image = "Image is required";
  return newErrors;
};

const resetForm = () => {
  setFormData({
    title: "",
    image: null,
    content: "",
    date: "",
  });
  setIsEditing(false);
  setErrors({});
  if (fileInputRef.current) fileInputRef.current.value = "";
};

const handleApiError = (action, error) => {
  console.error(
    `Error ${action} news:`,
    error.response ? error.response.data : error.message
  );
};

// Event handlers
const handleInputChange = (e) => {
  const { name, value, files } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: files ? files[0] : value,
  }));
};

const handleEdit = (news) => {
  setFormData({
    ...news,
    date: new Date(news.date).toISOString().split("T")[0],
  });
  setIsEditing(true);
};

// UI Components
const renderForm = () => (
  <form onSubmit={handleSubmit} className="manage-formContainer">
    <h2>{isEditing ? "Edit News" : "Add New News"}</h2>
    {renderInput("title", "Title")}
    {renderTextarea("content", "Content")}
    {renderInput("date", "Date", "date")}
    {renderFileInput()}
    <button type="submit" className="manage-button">
      {isEditing ? "Update News" : "Add News"}
    </button>
    {isEditing && (
      <button type="button" className="manage-button" onClick={resetForm}>
        Cancel Edit
      </button>
    )}
  </form>
);

const renderInput = (name, placeholder, type = "text") => (
  <>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={formData[name]}
      onChange={handleInputChange}
      className="manage-input"
    />
    {errors[name] && <p className="error-text">{errors[name]}</p>}
  </>
);

const renderFileInput = () => (
  <>
    <input
      type="file"
      name="image"
      onChange={handleInputChange}
      className="w-full p-2 border border-gray-300 rounded"
      ref={fileInputRef}
    />
    {errors.image && <p className="error-text">{errors.image}</p>}
  </>
);

const renderTextarea = (name, placeholder) => (
  <>
    <textarea
      name={name}
      placeholder={placeholder}
      value={formData[name]}
      onChange={handleInputChange}
      className="manage-textarea"
    ></textarea>
    {errors[name] && <p className="error-text">{errors[name]}</p>}
  </>
);

const renderNewsList = () => (
  <ul className="manage-list">
    {news.map((news) => (
      <li key={news._id} className="manage-listItem">
        <h3>{news.title}</h3>
        {news.imageId && (
          <Image
            src={`/api/news/image/${news.imageId}?t=${new Date().getTime()}`}
            alt={news.title}
            width={200}
            height={150}
            className="mt-4 rounded-lg h-24 w-auto"
          />
        )}
        <p>{news.content}</p>
        <p>{new Date(news.date).toLocaleDateString()}</p>
        <div className="manage-buttons">
          <button
            className="manage-button"
            onClick={() => handleEdit(news)}
          >
            Edit
          </button>
          <button
            className="manage-button manage-deleteButton"
            onClick={() => deleteNews(news._id)}
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
);

return (
  <div className="manage-container">
    <h1 className="manage-title">Manage News</h1>
    {renderForm()}
    {renderNewsList()}
  </div>
);
};

export default ManageNews;

