import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import AdminDashboard from "../../components/AdminDashboard";

const ManageAbout = () => {
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

  useEffect(() => {
    fetchAbout();
  }, []);

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
      console.error("Error deleting about:", error);
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
    const requiredFields = ["aboutLamino", "date"];
    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = `${field} is required`;
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

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit About" : "Add New About"}
      </h2>
      {renderInput("aboutLamino", "About Lamino")}
      {renderInput("date", "Date", "date")}
      {renderFileInput()}
      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="bg-[#70BA02] text-white py-2 px-4 rounded focus:outline-none"
        >
          {isEditing ? "Update About" : "Add About"}
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

  const renderAboutList = () => (
    <ul className="space-y-4">
      {about.map((item) => (
        <li key={item._id} className="bg-white p-4 shadow-sm rounded-lg">
          {item.imageId && (
            <div className="my-2">
              <Image
                src={`/api/about/image/${item.imageId}?t=${new Date().getTime()}`}
                width={200}
                height={150}
                alt=""
                className="rounded"
                unoptimized
              />
            </div>
          )}
          <p className="text-gray-700 mb-2">{item.aboutLamino}</p>
          <p className="text-gray-500 text-sm">{new Date(item.date).toLocaleDateString()}</p>
          <div className="mt-2 flex space-x-2">
            <button
              className="bg-blue-500 text-white py-1 px-3 rounded focus:outline-none"
              onClick={() => handleEdit(item)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-1 px-3 rounded focus:outline-none"
              onClick={() => deleteAbout(item._id)}
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
      <h1 className="text-2xl font-bold mb-4">Manage About</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderForm()}
        {renderAboutList()}
      </div>
    </div>
  );
};

const ManageAboutPage = () => (
  <AdminDashboard>
    <ManageAbout />
  </AdminDashboard>
);

export default ManageAboutPage;
