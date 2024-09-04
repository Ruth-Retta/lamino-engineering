import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCareers = () => {
    const [careers, setCareers] = useState([]);
    const [newCareer, setNewCareer] = useState({
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        requirements: '',
    });
    const [editCareer, setEditCareer] = useState(null);

    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        const response = await axios.get('/api/careers');
        setCareers(response.data);
    };

    const addCareer = async () => {
        await axios.post('/api/careers', newCareer);
        fetchCareers();
        setNewCareer({
            position: '',
            startDate: '',
            endDate: '',
            description: '',
            requirements: '',
        });
    };

    const updateCareer = async () => {
        await axios.put(`/api/careers/${editCareer._id}`, editCareer);
        fetchCareers();
        setEditCareer(null);
    };

    const deleteCareer = async (id) => {
        await axios.delete(`/api/careers/${id}`);
        fetchCareers();
    };

    return (
        <div className="manage-container">
            <h1 className="manage-title">Manage Careers</h1>
            <div className="manage-formContainer">
                <h2>{editCareer ? 'Edit Career' : 'Add New Career'}</h2>
                <input
                    type="text"
                    placeholder="Position"
                    className="manage-input"
                    value={editCareer ? editCareer.position : newCareer.position}
                    onChange={(e) => (editCareer
                        ? setEditCareer({ ...editCareer, position: e.target.value })
                        : setNewCareer({ ...newCareer, position: e.target.value })
                    )}
                />
                <input
                    type="date"
                    placeholder="Start Date"
                    className="manage-input"
                    value={editCareer ? editCareer.startDate : newCareer.startDate}
                    onChange={(e) => (editCareer
                        ? setEditCareer({ ...editCareer, startDate: e.target.value })
                        : setNewCareer({ ...newCareer, startDate: e.target.value })
                    )}
                />
                <input
                    type="date"
                    placeholder="End Date"
                    className="manage-input"
                    value={editCareer ? editCareer.endDate : newCareer.endDate}
                    onChange={(e) => (editCareer
                        ? setEditCareer({ ...editCareer, endDate: e.target.value })
                        : setNewCareer({ ...newCareer, endDate: e.target.value })
                    )}
                />
                <textarea
                    placeholder="Description"
                    className="manage-textarea"
                    value={editCareer ? editCareer.description : newCareer.description}
                    onChange={(e) => (editCareer
                        ? setEditCareer({ ...editCareer, description: e.target.value })
                        : setNewCareer({ ...newCareer, description: e.target.value })
                    )}
                ></textarea>
                <textarea
                    placeholder="Requirements"
                    className="manage-textarea"
                    value={editCareer ? editCareer.requirements : newCareer.requirements}
                    onChange={(e) => (editCareer
                        ? setEditCareer({ ...editCareer, requirements: e.target.value })
                        : setNewCareer({ ...newCareer, requirements: e.target.value })
                    )}
                ></textarea>
                <button
                    className="manage-button"
                    onClick={editCareer ? updateCareer : addCareer}
                >
                    {editCareer ? 'Update Career' : 'Add Career'}
                </button>
            </div>
            <ul className="manage-list">
                {careers.map(career => (
                    <li key={career._id} className="manage-listItem">
                        <h3>{career.position}</h3>
                        <p>{career.description}</p>
                        <div className="manage-buttons">
                            <button
                                className="manage-button"
                                onClick={() => setEditCareer(career)}
                            >
                                Edit
                            </button>
                            <button
                                className="manage-button manage-deleteButton"
                                onClick={() => deleteCareer(career._id)}
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

export default ManageCareers;
