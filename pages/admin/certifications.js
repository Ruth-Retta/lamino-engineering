import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageCertifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [newCertification, setNewCertification] = useState({
    title: "",
    image: null,
    description: "",
    certifyingOrganization: "",
    date: "",
  });
  const [editCertification, setEditCertification] = useState(null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (editCertification) {
      setEditCertification({ ...editCertification, image: file });
    } else {
      setNewCertification({ ...newCertification, image: file });
    }
  };

  const createFormData = (data) => {
    const formData = {};
    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        formData[key] = data[key];
      }
    }
    return formData;
  };

  const addCertification = async () => {
    const formData = createFormData(newCertification);

    try {
      const response = await axios.post("/api/certifications", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchCertifications();
      setNewCertification({
        title: "",
        image: null,
        description: "",
        certifyingOrganization: "",
        date: "",
      });
    } catch (error) {
      console.error(
        "Error adding certification:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const updateCertification = async () => {
    const formData = createFormData(editCertification);

    try {
      await axios.put(
        `/api/certifications/${editCertification._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      fetchCertifications();
      setEditCertification(null);
    } catch (error) {
      console.error(
        "Error updating certification:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteCertification = async (id) => {
    try {
      await axios.delete(`/api/certifications/${id}`);
      fetchCertifications();
    } catch (error) {
      console.error("Error deleting certification:", error);
    }
  };

  const handleInputChange = (e, isEditMode = false) => {
    const { name, value } = e.target;
    if (isEditMode) {
      setEditCertification({ ...editCertification, [name]: value });
    } else {
      setNewCertification({ ...newCertification, [name]: value });
    }
  };

  return (
    <div className="manage-container">
      <h1 className="manage-title">Manage Certifications</h1>
      <div className="manage-formContainer">
        <h2>
          {editCertification ? "Edit Certification" : "Add New Certification"}
        </h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="manage-input"
          value={
            editCertification ? editCertification.title : newCertification.title
          }
          onChange={(e) => handleInputChange(e, !!editCertification)}
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          className="manage-textarea"
          value={
            editCertification
              ? editCertification.description
              : newCertification.description
          }
          onChange={(e) => handleInputChange(e, !!editCertification)}
        ></textarea>
        <input
          type="text"
          name="certifyingOrganization"
          placeholder="Certifying Organization"
          className="manage-input"
          value={
            editCertification
              ? editCertification.certifyingOrganization
              : newCertification.certifyingOrganization
          }
          onChange={(e) => handleInputChange(e, !!editCertification)}
        />
        <input
          type="date"
          name="date"
          className="manage-input"
          value={
            editCertification ? editCertification.date : newCertification.date
          }
          onChange={(e) => handleInputChange(e, !!editCertification)}
        />
        <button
          className="manage-button"
          onClick={editCertification ? updateCertification : addCertification}
        >
          {editCertification ? "Update Certification" : "Add Certification"}
        </button>
        {editCertification && (
          <button
            className="manage-button"
            onClick={() => setEditCertification(null)}
          >
            Cancel Edit
          </button>
        )}
      </div>
      <ul className="manage-list">
        {certifications.map((certification) => (
          <li key={certification._id} className="manage-listItem">
            <h3>{certification.title}</h3>
            {certification.imageId && (
              <img
                src={`/api/certifications/image/${certification.imageId}`}
                alt={certification.title}
                className="mt-4 rounded-lg h-24 w-auto"
              />
            )}
            <p>{certification.description}</p>
            <p>Certified by: {certification.certifyingOrganization}</p>
            <p>Date: {new Date(certification.date).toLocaleDateString()}</p>
            <div className="manage-buttons">
              <button
                className="manage-button"
                onClick={() => setEditCertification(certification)}
              >
                Edit
              </button>
              <button
                className="manage-button manage-deleteButton"
                onClick={() => deleteCertification(certification._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCertifications;
