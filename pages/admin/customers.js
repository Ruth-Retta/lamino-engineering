import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Image from "next/image";
import { useSession } from "next-auth/react";
import AdminDashboard from "@/components/AdminDashboard";

const ManageCustomers = () => {
  const { data: session } = useSession();
    const [customers, setCustomers] = useState([]);
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
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
    
        const apiCall = isEditing ? updateCustomer : addCustomer;
        await apiCall();
      };

    const addCustomer = async () => {
        try {
            await axios.post('/api/customers', createFormData(), {
                headers: { "Content-Type": "multipart/form-data" },
              });
              resetForm();
            fetchCustomers();
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    const updateCustomer = async () => {
        try {
          await axios.put(`/api/customers/${formData._id}`, createFormData(), {
            headers: { "Content-Type": "multipart/form-data" },
          });
          resetForm();
          fetchCustomers();
        } catch (error) {
          handleApiError("updating", error);
        }
      };

    const deleteCustomer = async (id) => {
        try {
            await axios.delete(`/api/customers/${id}`);
            fetchCustomers();
        } catch (error) {
            console.error('Error deleting customer:', error);
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
      title: "",
      image: null,
      website: "",
      date:"",
    });
    setIsEditing(false);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleApiError = (action, error) => {
    console.error(
      `Error ${action} customer:`,
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

  const handleEdit = (customer) => {
    setFormData({
      ...customer,
      date: new Date(customer.date).toISOString().split("T")[0],
    });
    setIsEditing(true);
  };

  // UI Components
  const renderForm = () => (
    <form onSubmit={handleSubmit} className="manage-formContainer">
      <h2>{isEditing ? "Edit Customer" : "Add New Customer"}</h2>
      {renderInput("name", "Name")}
      {renderTextarea("website", "Website")}
      {renderInput("date", "Date", "date")}
      {renderFileInput()}
      <button type="submit" className="manage-button">
        {isEditing ? "Update Customer" : "Add Customer"}
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

  const renderCustomersList = () => (
    <ul className="manage-list">
      {customers.map((customer) => (
        <li key={customer._id} className="manage-listItem bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl mb-2">{customer.name}</h3>
          {customer.imageId && (
            <Image
              src={`/api/customers/image/${
                customer.imageId
              }?t=${new Date().getTime()}`}
              alt={customer.title}
              width={200}
              height={150}
              className="mt-4 rounded-lg h-24 w-auto"
            />
          )}
          <p className="mb-2 text-gray-700">{customer.website}</p>
          <p className="mb-2 text-gray-700">{new Date(customer.date).toLocaleDateString()}</p>
          <div className="manage-buttons">
            <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                  onClick={() => handleEdit(customer)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                  onClick={() => deleteCustomer(customer._id)}
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
      <h1 className="manage-title">Manage Customers</h1>
      {renderForm()}
      {renderCustomersList()}
    </div>
    );
};

const ManageCustomersPage = () => (
  <AdminDashboard>
    <ManageCustomers />
  </AdminDashboard>
);

export default ManageCustomersPage;

