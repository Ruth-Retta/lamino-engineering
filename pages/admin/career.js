import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import AdminDashboard from "../../components/AdminDashboard";

const ManageCareers = () => {
  const { data: session } = useSession();
  const [careers, setCareers] = useState([]);
  const [formData, setFormData] = useState({
    position: "",
    startDate: "",
    endDate: "",
    description: "",
    requirements: "",
    date: "",
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

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit Career" : "Add New Career"}
      </h2>
      {renderInput("position", "Position")}
      {renderInput("startDate", "Start Date", "date")}
      {renderInput("endDate", "End Date", "date")}
      {renderTextarea("description", "Description")}
      {renderInput("requirements", "Requirements")}
      {renderInput("date", "Date", "date")}
      {renderFileInput()}
      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="bg-[#70BA02] text-white py-2 px-4 rounded focus:outline-none"
        >
          {isEditing ? "Update Career" : "Add Career"}
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

  const renderCareersList = () => (
    <ul className="space-y-6">
      {careers.map((career) => (
        <li key={career._id} className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">{career.position}</h3>
          {career.imageId && (
            <div className="mb-4">
              <Image
                src={`/api/careers/image/${career.imageId}?t=${new Date().getTime()}`}
                alt={career.position}
                width={100}
                height={50}
                className="rounded-lg h-24 w-auto"
                unoptimized
              />
            </div>
          )}
          <p className="mb-2 text-gray-700">{career.description}</p>
          <p className="mb-2 text-gray-700">{career.requirements}</p>
          <p className="text-gray-500">
            {new Date(career.startDate).toLocaleDateString()} |{" "}
            {new Date(career.endDate).toLocaleDateString()}
          </p>
          <p className="text-gray-500">
            {new Date(career.date).toLocaleDateString()}
          </p>
          <div className="mt-4 flex space-x-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              onClick={() => handleEdit(career)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              onClick={() => deleteCareer(career._id)}
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
      <h1 className="text-2xl font-bold mb-4">Manage Careers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderForm()}
        {renderCareersList()}
      </div>
    </div>
  );
};

const ManageCareersPage = () => (
  <AdminDashboard>
    <ManageCareers />
  </AdminDashboard>
);

export default ManageCareersPage;
