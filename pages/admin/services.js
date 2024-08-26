import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    image: '',
  });

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

  const addService = async () => {
    try {
      await axios.post('/api/services', newService);
      fetchServices();
    } catch (error) {
      console.error('Error adding service:', error);
    }
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
        <h2 className="text-2xl font-semibold mb-4">Add New Service</h2>
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
            type="text"
            placeholder="Image URL"
            value={newService.image}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setNewService({ ...newService, image: e.target.value })}
          />
          <button onClick={addService} className="px-4 py-2 bg-blue-500 text-white rounded">Add Service</button>
        </div>
      </div>
      <ul className="space-y-8">
        {services.map((service) => (
          <li key={service._id} className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
            <h3 className="text-xl font-bold">{service.title}</h3>
            <p className="mt-4">{service.description}</p>
            {service.image && <img src={service.image} alt={service.title} className="mt-4 rounded-lg h-24 w-auto" />}
            <button onClick={() => deleteService(service._id)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageServices;
