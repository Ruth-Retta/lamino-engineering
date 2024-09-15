import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Image from "next/image";
import { useSession } from "next-auth/react";

const ManagePortfolio = () => {
  const { data: session } = useSession();
    const [portfolios, setPortfolios] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        image: null,
        description: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolios = async () => {
        try {
            const response = await axios.get('/api/portfolio');
            setPortfolios(response.data);
        } catch (error) {
            console.error('Error fetching portfolios:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
    
        const apiCall = isEditing ? updatePortfolio : addPortfolio;
        await apiCall();
      };
    
      const addPortfolio = async () => {
        try {
          await axios.post("/api/portfolio", createFormData(), {
            headers: { "Content-Type": "multipart/form-data" },
          });
          resetForm();
          fetchPortfolios();
        } catch (error) {
          handleApiError("adding", error);
        }
      };
    
      const updatePortfolio = async () => {
        try {
          await axios.put(`/api/portfolio/${formData._id}`, createFormData(), {
            headers: { "Content-Type": "multipart/form-data" },
          });
          resetForm();
          fetchPortfolios();
        } catch (error) {
          handleApiError("updating", error);
        }
      };

    const deletePortfolio = async (id) => {
        try {
            await axios.delete(`/api/portfolio/${id}`);
            fetchPortfolios();
        } catch (error) {
            console.error('Error deleting portfolio:', error);
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
      "description",
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
      description: "",
      date: "",
    });
    setIsEditing(false);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleApiError = (action, error) => {
    console.error(
      `Error ${action} portfolio:`,
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

  const handleEdit = (portfolio) => {
    setFormData({
      ...portfolio,
      date: new Date(portfolio.date).toISOString().split("T")[0],
    });
    setIsEditing(true);
  };

  // UI Components
  const renderForm = () => (
    <form onSubmit={handleSubmit} className="manage-formContainer">
      <h2>{isEditing ? "Edit Portfolio" : "Add New Portfolio"}</h2>
      {renderInput("title", "Title")}
      {renderTextarea("description", "Description")}
      {renderInput("date", "Date", "date")}
      {renderFileInput()}
      <button type="submit" className="manage-button">
        {isEditing ? "Update Portfolio" : "Add Portfolio"}
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

  const renderPortfolioList = () => (
    <ul className="space-y-6"> {/* Add vertical spacing between list items */}
      {portfolios.map((portfolio) => (
        <li key={portfolio._id} className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">{portfolio.title}</h3>
          {portfolio.imageId && (
            <div className="mb-4">
              <Image
                src={`/api/portfolio/image/${portfolio.imageId}?t=${new Date().getTime()}`}
                alt={portfolio.title}
                width={200}
                height={150}
                className="rounded-lg"
              />
            </div>
          )}
          <p className="mb-2 text-gray-700">{portfolio.description}</p>
          <p className="text-gray-500">{new Date(portfolio.date).toLocaleDateString()}</p>
          <div className="mt-4 flex space-x-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              onClick={() => handleEdit(portfolio)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              onClick={() => deletePortfolio(portfolio._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );

  if (!session || !session.user.role) {
    return <p>Access Denied</p>;
  }

  return (
    <div className="manage-container">
      <h1 className="manage-title">Manage Portfolios</h1>
      {renderForm()}
      {renderPortfolioList()}
    </div>
  );
};

export default ManagePortfolio;
