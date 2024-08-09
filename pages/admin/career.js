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
    };

    const deleteCareer = async (id) => {
        await axios.delete(`/api/careers/${id}`);
        fetchCareers();
    };

    return (
        <div>
            <h1>Manage Careers</h1>
            <div>
                <h2>Add New Career</h2>
                <input type="text" placeholder="Position" onChange={(e) => setNewCareer({ ...newCareer, position: e.target.value })} />
                <input type="date" placeholder="Start Date" onChange={(e) => setNewCareer({ ...newCareer, startDate: e.target.value })} />
                <input type="date" placeholder="End Date" onChange={(e) => setNewCareer({ ...newCareer, endDate: e.target.value })} />
                <textarea placeholder="Description" onChange={(e) => setNewCareer({ ...newCareer, description: e.target.value })}></textarea>
                <textarea placeholder="Requirements" onChange={(e) => setNewCareer({ ...newCareer, requirements: e.target.value })}></textarea>
                <button onClick={addCareer}>Add Career</button>
            </div>
            <ul>
                {careers.map(career => (
                    <li key={career._id}>
                        <h3>{career.position}</h3>
                        <p>{career.description}</p>
                        <button onClick={() => deleteCareer(career._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageCareers;
