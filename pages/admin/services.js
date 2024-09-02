import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceCard from '../../components/ServiceCard';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    image: '',
  });
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.file.path;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
        setNewService((prevState) => ({ ...prevState, image: imageUrl }));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const addOrUpdateService = async () => {
    try {
      if (editingServiceId) {
        await axios.put(`/api/services/${editingServiceId}`, newService);
      } else {
        await axios.post('/api/services', newService);
      }

      fetchServices();
      setNewService({ title: '', description: '', image: '' });
      setEditingServiceId(null);
      setImageFile(null);
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleUpdateClick = (service) => {
    setNewService({
      title: service.title,
      description: service.description,
      image: service.image,
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
              image={service.image}
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
