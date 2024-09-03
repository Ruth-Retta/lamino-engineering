import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCertifications = () => {
    const [certifications, setCertifications] = useState([]);
    const [newCertification, setNewCertification] = useState({
        title: '',
        imageUrl: '',
        description: '',
        certifyingOrganization: '',
        date: '',
    });
    const [editCertification, setEditCertification] = useState(null);

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            const response = await axios.get('/api/certifications');
            setCertifications(response.data);
        } catch (error) {
            console.error('Error fetching certifications:', error);
        }
    };

    const addCertification = async () => {
        try {
            const response = await axios.post('/api/certifications', newCertification);
            fetchCertifications();
            setNewCertification({
                title: '',
                imageUrl: '',
                description: '',
                certifyingOrganization: '',
                date: '',
            });
        } catch (error) {
            console.error('Error adding certification:', error.response.data);
        }
    };

    const updateCertification = async () => {
        try {
            await axios.put(`/api/certifications/${editCertification._id}`, editCertification);
            fetchCertifications();
            setEditCertification(null);
        } catch (error) {
            console.error('Error updating certification:', error);
        }
    };

    const deleteCertification = async (id) => {
        try {
            await axios.delete(`/api/certifications/${id}`);
            fetchCertifications();
        } catch (error) {
            console.error('Error deleting certification:', error);
        }
    };

    return (
        <div className="manage-container">
            <h1 className="manage-title">Manage Certifications</h1>
            <div className="manage-formContainer">
                <h2>{editCertification ? 'Edit Certification' : 'Add New Certification'}</h2>
                <input
                    type="text"
                    placeholder="Title"
                    className="manage-input"
                    value={editCertification ? editCertification.title : newCertification.title}
                    onChange={(e) => (editCertification
                        ? setEditCertification({ ...editCertification, title: e.target.value })
                        : setNewCertification({ ...newCertification, title: e.target.value })
                    )}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    className="manage-input"
                    value={editCertification ? editCertification.imageUrl : newCertification.imageUrl}
                    onChange={(e) => (editCertification
                        ? setEditCertification({ ...editCertification, imageUrl: e.target.value })
                        : setNewCertification({ ...newCertification, imageUrl: e.target.value })
                    )}
                />
                <textarea
                    placeholder="Description"
                    className="manage-textarea"
                    value={editCertification ? editCertification.description : newCertification.description}
                    onChange={(e) => (editCertification
                        ? setEditCertification({ ...editCertification, description: e.target.value })
                        : setNewCertification({ ...newCertification, description: e.target.value })
                    )}
                ></textarea>
                <input
                    type="text"
                    placeholder="Certifying Organization"
                    className="manage-input"
                    value={editCertification ? editCertification.certifyingOrganization : newCertification.certifyingOrganization}
                    onChange={(e) => (editCertification
                        ? setEditCertification({ ...editCertification, certifyingOrganization: e.target.value })
                        : setNewCertification({ ...newCertification, certifyingOrganization: e.target.value })
                    )}
                />
                <input
                    type="date"
                    className="manage-input"
                    value={editCertification ? editCertification.date : newCertification.date}
                    onChange={(e) => (editCertification
                        ? setEditCertification({ ...editCertification, date: e.target.value })
                        : setNewCertification({ ...newCertification, date: e.target.value })
                    )}
                />
                <button
                    className="manage-button"
                    onClick={editCertification ? updateCertification : addCertification}
                >
                    {editCertification ? 'Update Certification' : 'Add Certification'}
                </button>
            </div>
            <ul className="manage-list">
                {certifications.map(certification => (
                    <li key={certification._id} className="manage-listItem">
                        <h3>{certification.title}</h3>
                        <img src={certification.imageUrl} alt={certification.title} className="manage-image" />
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
