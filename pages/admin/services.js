import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    date: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const apiCall = isEditing ? updateService : addService;
    await apiCall();
  };

  const addService = async () => {
    try {
      await axios.post("/api/services", createFormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetForm();
      fetchServices();
    } catch (error) {
      handleApiError("adding", error);
    }
  };

  const updateService = async () => {
    try {
      await axios.put(`/api/services/${formData._id}`, createFormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetForm();
      fetchServices();
    } catch (error) {
      handleApiError("updating", error);
    }
  };

  const deleteService = async (id) => {
    try {
      await axios.delete(`/api/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
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
      `Error ${action} service:`,
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

  const handleEdit = (service) => {
    setFormData({
      ...service,
      date: new Date(service.date).toISOString().split("T")[0],
    });
    setIsEditing(true);
  };

  // UI Components
  const renderForm = () => (
    <form onSubmit={handleSubmit} className="manage-formContainer">
      <h2>{isEditing ? "Edit Service" : "Add New Service"}</h2>
      {renderInput("title", "Title")}
      {renderTextarea("description", "Description")}
      {renderInput("date", "Date", "date")}
      {renderFileInput()}
      <button type="submit" className="manage-button">
        {isEditing ? "Update Service" : "Add Service"}
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

  const renderServicesList = () => (
    <ul className="space-y-6"> {/* Add space between list items */}
      {services.map((service) => (
        <li key={service._id} className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
          {service.imageId && (
            <div className="mb-4">
              <Image
                src={`/api/services/image/${service.imageId}?t=${new Date().getTime()}`}
                alt={service.title}
                width={200}
                height={150}
                className="rounded-lg"
              />
            </div>
          )}
          <p className="mb-2 text-gray-700">{service.description}</p>
          <p className="text-gray-500">{new Date(service.date).toLocaleDateString()}</p>
          <div className="mt-4 flex space-x-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              onClick={() => handleEdit(service)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              onClick={() => deleteService(service._id)}
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
      <h1 className="manage-title">Manage Services</h1>
      {renderForm()}
      {renderServicesList()}
    </div>
  );
};

export default ManageServices;