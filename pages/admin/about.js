import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import AdminDashboard from "@/components/AdminDashboard";

const ManageAbout = () => {
  // State management
  const { data: session } = useSession();
  const [about, setAbout] = useState([]);
  const [formData, setFormData] = useState({
    image: null,
    aboutLamino: "",
    date: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Fetch About on component mount
  useEffect(() => {
    fetchAbout();
  }, []);

  // API calls
  const fetchAbout = async () => {
    try {
      const response = await axios.get("/api/about");
      setAbout(response.data);
    } catch (error) {
      console.error("Error fetching about:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const apiCall = isEditing ? updateAbout : addAbout;
    await apiCall();
  };

  const addAbout = async () => {
    try {
      await axios.post("/api/about", createFormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetForm();
      fetchAbout();
    } catch (error) {
      handleApiError("adding", error);
    }
  };

  const updateAbout = async () => {
    try {
      await axios.put(`/api/about/${formData._id}`, createFormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetForm();
      fetchAbout();
    } catch (error) {
      handleApiError("updating", error);
    }
  };

  const deleteAbout = async (id) => {
    try {
      await axios.delete(`/api/about/${id}`);
      fetchAbout();
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
      "aboutLamino",
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
      aboutLamino: "",
      image: null,
      date: "",
    });
    setIsEditing(false);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleApiError = (action, error) => {
    console.error(
      `Error ${action} about:`,
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

  const handleEdit = (about) => {
    setFormData({
      ...about,
      date: new Date(about.date).toISOString().split("T")[0],
    });
    setIsEditing(true);
  };

  // UI Components
  const renderForm = () => (
    <form onSubmit={handleSubmit} className="manage-formContainer">
      <h2>{isEditing ? "Edit About" : "Add New About"}</h2>
      {renderInput("aboutLamino", "About Lamino")}
      {renderInput("date", "Date", "date")}
      {renderFileInput()}
      <button type="submit" className="manage-button">
        {isEditing ? "Update About" : "Add About"}
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

  const renderAboutList = () => (
    <ul className="space-y-6"> {/* Add vertical spacing between list items */}
      {about.map((about) => (
        <li key={about._id} className="bg-white shadow-lg rounded-lg p-6">
          {about.imageId && (
            <div className="mb-4">
              <Image
                src={`/api/about/image/${about.imageId}?t=${new Date().getTime()}`}
                width={200}
                height={150}
                className="rounded-lg"
              />
            </div>
          )}
          <p className="mb-2 text-gray-700">{about.aboutLamino}</p>
          <p className="text-gray-500">{new Date(about.date).toLocaleDateString()}</p>
          <div className="mt-4 flex space-x-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              onClick={() => handleEdit(about)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              onClick={() => deleteAbout(about._id)}
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
      <h1 className="manage-title">Manage About</h1>
      {renderForm()}
      {renderAboutList()}
    </div>
  );
};

const ManageAboutPage = () => (
  <AdminDashboard>
    <ManageAbout />
  </AdminDashboard>
);

export default ManageAboutPage;

