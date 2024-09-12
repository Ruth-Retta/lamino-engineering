import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";

const ManageCareers = () => {
    const [careers, setCareers] = useState([]);
    const [formData, setFormData] = useState({
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        requirements: '',
        date: '',
        image: null,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        try {
          const response = await axios.get("/api/careers");
          setCareers(response.data);
        } catch (error) {
          console.error("Error fetching careers:", error);
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
    
        const apiCall = isEditing ? updateCareer : addCareer;
        await apiCall();
      };
    
      const addCareer = async () => {
        try {
          await axios.post("/api/careers", createFormData(), {
            headers: { "Content-Type": "multipart/form-data" },
          });
          resetForm();
          fetchCareers();
        } catch (error) {
          handleApiError("adding", error);
        }
      };
    
      const updateCareer = async () => {
        try {
          await axios.put(`/api/careers/${formData._id}`, createFormData(), {
            headers: { "Content-Type": "multipart/form-data" },
          });
          resetForm();
          fetchCareers();
        } catch (error) {
          handleApiError("updating", error);
        }
      };
    
      const deleteCareer = async (id) => {
        try {
          await axios.delete(`/api/careers/${id}`);
          fetchCareers();
        } catch (error) {
          handleApiError("deleting", error);
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
          "position",
          "description",
          "startDate",
          "endDate",
          "requirements",
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
          position: "",
          image: null,
          description: "",
          startDate: "",
          endDate: "",
          requirements: "",
          date: "",
        });
        setIsEditing(false);
        setErrors({});
        if (fileInputRef.current) fileInputRef.current.value = "";
      };
    
      const handleApiError = (action, error) => {
        console.error(
          `Error ${action} career:`,
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
    
      const handleEdit = (career) => {
        setFormData({
          ...career,
          date: new Date(career.date).toISOString().split("T")[0],
        });
        setIsEditing(true);
      };
    
      // UI Components
      const renderForm = () => (
        <form onSubmit={handleSubmit} className="manage-formContainer">
          <h2>{isEditing ? "Edit Career" : "Add New Career"}</h2>
          {renderInput("position", "Position")}
          {renderInput("startDate", "Start Date", "date")}
          {renderInput("endDate", "End Date", "date")}
          {renderTextarea("description", "Description")}
          {renderInput("requirements", "Requirements")}
          {renderInput("date", "Date", "date")}
          {renderFileInput()}
          <button type="submit" className="manage-button">
            {isEditing ? "Update Career" : "Add Career"}
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
    
      const renderCareersList = () => (
        <ul className="manage-list">
          {careers.map((career) => (
            <li key={career._id} className="manage-listItem">
              <h3>{career.position}</h3>
              {career.imageId && (
                <Image
                  src={`/api/careers/image/${career.imageId}?t=${new Date().getTime()}`}
                  alt={career.position}
                  width={100}
                  height={50}
                  className="mt-4 rounded-lg h-24 w-auto"
                />
              )}
              <p>{career.description}</p>
              <p>{career.requirements}</p>
              <p>{career.startDate} | {career.endDate}</p>
              <p>{new Date(career.date).toLocaleDateString()}</p>
              <div className="manage-buttons">
                <button
                  className="manage-button"
                  onClick={() => handleEdit(career)}
                >
                  Edit
                </button>
                <button
                  className="manage-button manage-deleteButton"
                  onClick={() => deleteCareer(career._id)}
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
          <h1 className="manage-title">Manage Careers</h1>
          {renderForm()}
          {renderCareersList()}
        </div>
      );
    };

export default ManageCareers;
