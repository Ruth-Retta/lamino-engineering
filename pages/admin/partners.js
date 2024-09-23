import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import AdminDashboard from "../../components/AdminDashboard";

const ManagePartners = () => {
  const { data: session } = useSession();
  const [partners, setPartners] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    website: "",
    date: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await axios.get("/api/partners");
      setPartners(response.data);
    } catch (error) {
      console.error("Error fetching partners:", error);
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
      console.error("Error deleting partner:", error);
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
    const requiredFields = ["name", "website", "date"];
    requiredFields.forEach((field) => {
      if (!formData[field])
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
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
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{isEditing ? "Edit Partner" : "Add New Partner"}</h2>
      {renderInput("name", "Name")}
      {renderInput("website", "Website")}
      {renderInput("date", "Date", "date")}
      {renderFileInput()}
      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="bg-[#70BA02] text-white py-2 px-4 rounded focus:outline-none"
        >
          {isEditing ? "Update Partner" : "Add Partner"}
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

  const renderPartnersList = () => (
    <ul className="space-y-6">
      {partners.map((partner) => (
        <li key={partner._id} className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
          {partner.imageId && (
            <div className="mb-4">
              <Image
                src={`/api/partners/image/${partner.imageId}?t=${new Date().getTime()}`}
                alt={partner.name}
                width={200}
                height={150}
                className="rounded-lg"
                unoptimized
              />
            </div>
          )}
          <p className="mb-2 text-gray-700">{partner.website}</p>
          <p className="text-gray-500">{new Date(partner.date).toLocaleDateString()}</p>
          <div className="mt-4 flex space-x-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              onClick={() => handleEdit(partner)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              onClick={() => deletePartner(partner._id)}
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
      <h1 className="text-2xl font-bold mb-4">Manage Partners</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderForm()}
        {renderPartnersList()}
      </div>
    </div>
  );
};

const ManagePartnersPage = () => (
  <AdminDashboard>
    <ManagePartners />
  </AdminDashboard>
);

export default ManagePartnersPage;
