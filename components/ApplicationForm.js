import React, { useState } from 'react';

const ApplicationForm = ({ career, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
    coverLetter: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data here
    // ...

    // Submit application data
    // ...

    // Close the form after successful submission
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <div className="application-form-modal">
      <h2>Apply for {career.position}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="resume">Resume:</label>
          <input type="file" id="resume" name="resume" onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="coverLetter">Cover Letter:</label>
          <input type="file" id="coverLetter" name="coverLetter" onChange={handleInputChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit Application</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default ApplicationForm;