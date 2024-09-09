import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Image from "next/image";

const ManagePartners = () => {
    const [partners, setPartners] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        image: null,
        website: '',
        date: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        try {
            const response = await axios.get('/api/partners');
            setPartners(response.data);
        } catch (error) {
            console.error('Error fetching partners:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
    
        const apiCall = isEditing ? updatePartner : addPartner;
        await apiCall();
      };
    
      const addPartner = async () => {
        try {
          await axios.post("/api/partners", createFormData(), {
            headers: { "Content-Type": "multipart/form-data" },
          });
          resetForm();
          fetchPartners();
        } catch (error) {
          handleApiError("adding", error);
        }
      };
    
      const updatePartner = async () => {
        try {
          await axios.put(`/api/partners/${formData._id}`, createFormData(), {
            headers: { "Content-Type": "multipart/form-data" },
          });
          resetForm();
          fetchPartners();
        } catch (error) {
          handleApiError("updating", error);
        }
      };

    const deletePartner = async (id) => {
        try {
            await axios.delete(`/api/partners/${id}`);
            fetchPartners();
        } catch (error) {
            console.error('Error deleting partner:', error);
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
      "name",
      "website",
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
      name: "",
      image: null,
      website: "",
      date: "",
    });
    setIsEditing(false);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleApiError = (action, error) => {
    console.error(
      `Error ${action} partner:`,
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

  const handleEdit = (partner) => {
    setFormData({
      ...partner,
      date: new Date(partner.date).toISOString().split("T")[0],
    });
    setIsEditing(true);
  };

  // UI Components
  const renderForm = () => (
    <form onSubmit={handleSubmit} className="manage-formContainer">
      <h2>{isEditing ? "Edit Partner" : "Add New Partner"}</h2>
      {renderInput("name", "Name")}
      {renderTextarea("website", "Website")}
      {renderInput("date", "Date", "date")}
      {renderFileInput()}
      <button type="submit" className="manage-button">
        {isEditing ? "Update Partner" : "Add Partner"}
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

  const renderPartnersList = () => (
    <ul className="manage-list">
      {partners.map((partner) => (
        <li key={partner._id} className="manage-listItem">
          <h3>{partner.name}</h3>
          {partner.imageId && (
            <Image
              src={`/api/partners/image/${
                partner.imageId
              }?t=${new Date().getTime()}`}
              alt={partner.name}
              width={200}
              height={150}
              className="mt-4 rounded-lg h-24 w-auto"
            />
          )}
          <p>{partner.website}</p>
          <p>{new Date(partner.date).toLocaleDateString()}</p>
          <div className="manage-buttons">
            <button
              className="manage-button"
              onClick={() => handleEdit(partner)}
            >
              Edit
            </button>
            <button
              className="manage-button manage-deleteButton"
              onClick={() => deletePartner(partner._id)}
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
      <h1 className="manage-title">Manage Partners</h1>
      {renderForm()}
      {renderPartnersList()}
    </div>
  );
};

export default ManagePartners;
