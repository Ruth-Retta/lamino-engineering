import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import AdminDashboard from "../../components/AdminDashboard";

const ManageServices = () => {
  const { data: session } = useSession();
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    date: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("/api/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
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
      console.error("Error deleting service:", error);
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
    const requiredFields = ["title", "description", "date"];
    requiredFields.forEach((field) => {
      if (!formData[field])
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
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
    console.error(`Error ${action} service:`, error.response ? error.response.data : error.message);
  };

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

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit Service" : "Add New Service"}
      </h2>
      {renderInput("title", "Service Title")}
      {renderTextarea("description", "Service Description")}
      {renderInput("date", "Service Date", "date")}
      {renderFileInput()}
      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="bg-[#70BA02] text-white py-2 px-4 rounded focus:outline-none"
        >
          {isEditing ? "Update Service" : "Add Service"}
        </button>
        {isEditing && (
          <button
            type="button"
            className="bg-gray-300 text-gray-600 py-2 px-4 rounded focus:outline-none"
            onClick={resetForm}
          >
            Cancel
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

  const renderTextarea = (name, placeholder) => (
    <div className="mb-3">
      <textarea
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-green-200 h-28"
      ></textarea>
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

  const renderServicesList = () => (
    <ul className="space-y-4">
      {services.map((service) => (
        <li key={service._id} className="bg-white p-4 shadow-sm rounded-lg">
          <h3 className="text-md font-semibold">{service.title}</h3>
          {service.imageId && (
            <div className="my-2">
              <Image
                src={`/api/services/image/${service.imageId}?t=${new Date().getTime()}`}
                alt={service.title}
                width={200}
                height={150}
                className="rounded"
                unoptimized
              />
            </div>
          )}
          <p className="text-gray-600">{service.description}</p>
          <p className="text-gray-500 text-sm">
            {new Date(service.date).toLocaleDateString()}
          </p>
          <div className="mt-2 flex space-x-2">
            <button
              className="bg-blue-500 text-white py-1 px-3 rounded focus:outline-none"
              onClick={() => handleEdit(service)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-1 px-3 rounded focus:outline-none"
              onClick={() => deleteService(service._id)}
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
      <h1 className="text-2xl font-bold mb-4">Manage Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderForm()}
        {renderServicesList()}
      </div>
    </div>
  );
};

// Wrapping ManageServices in AdminDashboard layout
const ManageServicesPage = () => (
  <AdminDashboard>
    <ManageServices />
  </AdminDashboard>
);

export default ManageServicesPage;
