import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagePartners = () => {
    const [partners, setPartners] = useState([]);
    const [newPartner, setNewPartner] = useState({
        name: '',
        logo: '',
        website: '',
    });

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        try {
            const response = await axios.get('/api/partners');
            setPartners(response.data);
        } catch (error) {
            console.error('Error fetching partners:', error);
        }
    };

    const addPartner = async () => {
        try {
            await axios.post('/api/partners', newPartner);
            fetchPartners();
        } catch (error) {
            console.error('Error adding partner:', error);
        }
    };

    const deletePartner = async (id) => {
        try {
            await axios.delete(`/api/partners/${id}`);
            fetchPartners();
        } catch (error) {
            console.error('Error deleting partner:', error);
        }
    };

    return (
        <div>
            <h1>Manage Partners</h1>
            <div>
                <h2>Add New Partner</h2>
                <input
                    type="text"
                    placeholder="Partner Name"
                    onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Logo URL"
                    onChange={(e) => setNewPartner({ ...newPartner, logo: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Website URL"
                    onChange={(e) => setNewPartner({ ...newPartner, website: e.target.value })}
                />
                <button onClick={addPartner}>Add Partner</button>
            </div>
            <ul>
                {partners.map(partner => (
                    <li key={partner._id}>
                        <h3>{partner.name}</h3>
                        <img src={partner.logo} alt={partner.name} className="h-24 w-auto" />
                        <p><a href={partner.website} target="_blank" rel="noopener noreferrer">{partner.website}</a></p>
                        <button onClick={() => deletePartner(partner._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManagePartners;
