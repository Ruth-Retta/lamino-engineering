import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import AdminDashboard from "../../components/AdminDashboard";

const ManageCertifications = () => {
  const { data: session } = useSession();
  const [certifications, setCertifications] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    certifyingOrganization: "",
    date: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await axios.get("/api/certifications");
      setCertifications(response.data);
    } catch (error) {
      console.error("Error fetching certifications:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const apiCall = isEditing ? updateCertification : addCertification;
    await apiCall();
  };

  const addCertification = async () => {
    try {
      await axios.post("/api/certifications", createFormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetForm();
      fetchCertifications();
    } catch (error) {
      handleApiError("adding", error);
    }
  };

  const updateCertification = async () => {
    try {
      await axios.put(`/api/certifications/${formData._id}`, createFormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetForm();
      fetchCertifications();
    } catch (error) {
      handleApiError("updating", error);
    }
  };

  const deleteCertification = async (id) => {
    try {
      await axios.delete(`/api/certifications/${id}`);
      fetchCertifications();
    } catch (error) {
      handleApiError("deleting", error);
    }
  };

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
      "certifyingOrganization",
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
      certifyingOrganization: "",
      date: "",
    });
    setIsEditing(false);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleApiError = (action, error) => {
    console.error(
      `Error ${action} certification:`,
      error.response ? error.response.data : error.message
    );
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleEdit = (certification) => {
    setFormData({
      ...certification,
      date: new Date(certification.date).toISOString().split("T")[0],
    });
    setIsEditing(true);
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit Certification" : "Add New Certification"}
      </h2>
      {renderInput("title", "Title")}
      {renderTextarea("description", "Description")}
      {renderInput("certifyingOrganization", "Certifying Organization")}
      {renderInput("date", "Date", "date")}
      {renderFileInput()}
      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="bg-[#70BA02] text-white py-2 px-4 rounded focus:outline-none"
        >
          {isEditing ? "Update Certification" : "Add Certification"}
        </button>
        {isEditing && (
          <button
            type="button"
            className="bg-gray-300 text-gray-600 py-2 px-4 rounded focus:outline-none"
            onClick={resetForm}
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );

  const renderInput = (name, placeholder, type = "text") => (
    <div className="mb-3">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-green-200"
      />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
    </div>
  );

  const renderFileInput = () => (
    <div className="mb-3">
      <input
        type="file"
        name="image"
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-green-200"
        ref={fileInputRef}
      />
      {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
    </div>
  );

  const renderTextarea = (name, placeholder) => (
    <div className="mb-3">
      <textarea
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-green-200"
      ></textarea>
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
    </div>
  );

  const renderCertificationsList = () => (
    <ul className="space-y-6">
      {certifications.map((certification) => (
        <li key={certification._id} className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">{certification.title}</h3>
          {certification.imageId && (
            <div className="mb-4">
              <Image
                src={`/api/certifications/image/${certification.imageId}?t=${new Date().getTime()}`}
                alt={certification.title}
                width={200}
                height={150}
                className="rounded-lg"
                unoptimized
              />
            </div>
          )}
          <p className="mb-2 text-gray-700">{certification.description}</p>
          <p className="mb-2 text-gray-600">{certification.certifyingOrganization}</p>
          <p className="text-gray-500">{new Date(certification.date).toLocaleDateString()}</p>
          <div className="mt-4 flex space-x-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              onClick={() => handleEdit(certification)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              onClick={() => deleteCertification(certification._id)}
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
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Manage Certifications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderForm()}
        {renderCertificationsList()}
      </div>
    </div>
  );
};

const ManageCertificationsPage = () => (
  <AdminDashboard>
    <ManageCertifications />
  </AdminDashboard>
);

export default ManageCertificationsPage;
