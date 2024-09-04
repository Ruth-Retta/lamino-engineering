import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceCard from '../../components/ServiceCard';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [editingServiceId, setEditingServiceId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleFileChange = (e) => {
    setNewService({ ...newService, image: e.target.files[0] });
  };

  const addOrUpdateService = async () => {
    const formData = new FormData();
    formData.append('title', newService.title);
    formData.append('description', newService.description);
    if (newService.image) {
      formData.append('image', newService.image);
    }

    try {
      if (editingServiceId) {
        await axios.put(`/api/services/${editingServiceId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('/api/services', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      fetchServices();
      setNewService({ title: '', description: '', image: null });
      setEditingServiceId(null);
    } catch (error) {
      console.error('Error saving service:', error.response ? error.response.data : error.message);
    }
  };

  const handleUpdateClick = (service) => {
    setNewService({
      title: service.title,
      description: service.description,
      image: null,
    });
    setEditingServiceId(service._id);
  };

  const deleteService = async (id) => {
    try {
      await axios.delete(`/api/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div className="admin-page">
      <h1 className="text-3xl font-bold mb-6">Manage Services</h1>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          {editingServiceId ? 'Update Service' : 'Add New Service'}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Service Title"
            value={newService.title}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setNewService({ ...newService, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newService.description}
            className="w-full p-2 border border-gray-300 rounded"
            rows="6"
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          ></textarea>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button onClick={addOrUpdateService} className="px-4 py-2 bg-blue-500 text-white rounded">
            {editingServiceId ? 'Update Service' : 'Add Service'}
          </button>
        </div>
      </div>
      <ul className="space-y-8">
        {services.map((service) => (
          <li key={service._id}>
            <ServiceCard
              title={service.title}
              description={service.description}
              imageId={service.imageId}
              onDelete={() => deleteService(service._id)}
              onUpdate={() => handleUpdateClick(service)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageServices;