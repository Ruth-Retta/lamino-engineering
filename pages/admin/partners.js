import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PartnerCard from '../../components/PartnerCard';

const ManagePartners = () => {
    const [partners, setPartners] = useState([]);
    const [newPartner, setNewPartner] = useState({
        name: '',
        logo: '',
        website: '',
    });
    const [editingPartner, setEditingPartner] = useState(null);

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

    const addOrUpdatePartner = async () => {
        try {
            if (editingPartner) {
                // Update the existing partner
                await axios.put(`/api/partners/${editingPartner._id}`, newPartner);
                setEditingPartner(null);
            } else {
                // Add a new partner
                await axios.post('/api/partners', newPartner);
            }
            setNewPartner({ name: '', logo: '', website: '' });
            fetchPartners();
        } catch (error) {
            console.error('Error saving partner:', error);
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

    const startEditing = (partner) => {
        setNewPartner({ name: partner.name, logo: partner.logo, website: partner.website });
        setEditingPartner(partner);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-[#70BA02]">Manage Partners</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-black">{editingPartner ? 'Update Partner' : 'Add New Partner'}</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Partner Name"
                        value={newPartner.name}
                        onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    />
                    <input
                        type="text"
                        placeholder="Logo URL"
                        value={newPartner.logo}
                        onChange={(e) => setNewPartner({ ...newPartner, logo: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    />
                    <input
                        type="text"
                        placeholder="Website URL"
                        value={newPartner.website}
                        onChange={(e) => setNewPartner({ ...newPartner, website: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    />
                    <button
                        onClick={addOrUpdatePartner}
                        className="bg-[#94D13A] text-white py-2 px-4 rounded-lg hover:bg-[#70BA02] transition-colors"
                    >
                        {editingPartner ? 'Update Partner' : 'Add Partner'}
                    </button>
                    {editingPartner && (
                        <button
                            onClick={() => {
                                setNewPartner({ name: '', logo: '', website: '' });
                                setEditingPartner(null);
                            }}
                            className="bg-gray-500 text-white py-2 px-4 rounded-lg ml-4 hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partners.map(partner => (
                    <PartnerCard key={partner._id} partner={partner} onDelete={deletePartner} onEdit={startEditing} />
                ))}
            </div>
        </div>
    );
};

export default ManagePartners;
