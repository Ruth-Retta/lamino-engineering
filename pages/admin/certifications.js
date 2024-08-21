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
            await axios.post('/api/certifications', newCertification);
            fetchCertifications();
        } catch (error) {
            console.error('Error adding certification:', error);
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
        <div>
            <h1>Manage Certifications</h1>
            <div>
                <h2>Add New Certification</h2>
                <input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setNewCertification({ ...newCertification, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    onChange={(e) => setNewCertification({ ...newCertification, imageUrl: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    onChange={(e) => setNewCertification({ ...newCertification, description: e.target.value })}
                ></textarea>
                <input
                    type="text"
                    placeholder="Certifying Organization"
                    onChange={(e) => setNewCertification({ ...newCertification, certifyingOrganization: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Date"
                    onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
                />
                <button onClick={addCertification}>Add Certification</button>
            </div>
            <ul>
                {certifications.map(certification => (
                    <li key={certification._id}>
                        <h3>{certification.title}</h3>
                        <img src={certification.imageUrl} alt={certification.title} className="h-24 w-auto" />
                        <p>{certification.description}</p>
                        <p>Certified by: {certification.certifyingOrganization}</p>
                        <p>Date: {new Date(certification.date).toLocaleDateString()}</p>
                        <button onClick={() => deleteCertification(certification._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageCertifications;
