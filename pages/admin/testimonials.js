import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import AdminDashboard from "../../components/AdminDashboard";

const ManageTestimonials = () => {
  const { data: session } = useSession();
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    author: "",
    position: "",
    content: "",
    date: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("/api/testimonials");
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const apiCall = isEditing ? updateTestimonial : addTestimonial;
    await apiCall();
  };

  const addTestimonial = async () => {
    try {
      await axios.post("/api/testimonials", createFormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetForm();
      fetchTestimonials();
    } catch (error) {
      handleApiError("adding", error);
    }
  };

  const updateTestimonial = async () => {
    try {
      await axios.put(`/api/testimonials/${formData._id}`, createFormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetForm();
      fetchTestimonials();
    } catch (error) {
      handleApiError("updating", error);
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await axios.delete(`/api/testimonials/${id}`);
      fetchTestimonials();
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
    const requiredFields = ["author", "position", "content", "date"];
    requiredFields.forEach((field) => {
      if (!formData[field])
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    });
    if (!isEditing && !formData.image) newErrors.image = "Image is required";
    return newErrors;
  };

  const resetForm = () => {
    setFormData({
      author: "",
      position: "",
      content: "",
      date: "",
      image: null,
    });
    setIsEditing(false);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleApiError = (action, error) => {
    console.error(
      `Error ${action} testimonial:`,
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

  const handleEdit = (testimonial) => {
    setFormData({
      ...testimonial,
      date: new Date(testimonial.date).toISOString().split("T")[0],
    });
    setIsEditing(true);
  };

  // UI Components
  const renderForm = () => (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{isEditing ? "Edit Testimonial" : "Add New Testimonial"}</h2>
      {renderInput("author", "Author")}
      {renderInput("position", "Position")}
      {renderTextarea("content", "Content")}
      {renderInput("date", "Date", "date")}
      {renderFileInput()}
      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="bg-[#70BA02] text-white py-2 px-4 rounded focus:outline-none"
        >
          {isEditing ? "Update Testimonial" : "Add Testimonial"}
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

  const renderTestimonialsList = () => (
    <ul className="space-y-6">
      {testimonials.map((testimonial) => (
        <li key={testimonial._id} className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">{testimonial.author}</h3>
          {testimonial.imageId && (
            <div className="mb-4">
              <Image
                src={`/api/testimonials/image/${testimonial.imageId}?t=${new Date().getTime()}`}
                alt={testimonial.author}
                width={200}
                height={150}
                className="rounded-lg"
              />
            </div>
          )}
          <p className="mb-2 text-gray-700"><strong>Position:</strong> {testimonial.position}</p>
          <p className="mb-2 text-gray-800">{testimonial.content}</p>
          <p className="text-gray-500">{new Date(testimonial.date).toLocaleDateString()}</p>
          <div className="mt-4 flex space-x-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              onClick={() => handleEdit(testimonial)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              onClick={() => deleteTestimonial(testimonial._id)}
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
      <h1 className="text-2xl font-bold mb-4">Manage Testimonials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderForm()}
        {renderTestimonialsList()}
      </div>
    </div>
  );
};

const ManageTestimonialsPage = () => (
  <AdminDashboard>
    <ManageTestimonials />
  </AdminDashboard>
);

export default ManageTestimonialsPage;
