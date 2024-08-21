import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        logo: '',
        website: '',
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const addCustomer = async () => {
        try {
            await axios.post('/api/customers', newCustomer);
            fetchCustomers();
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    const deleteCustomer = async (id) => {
        try {
            await axios.delete(`/api/customers/${id}`);
            fetchCustomers();
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    return (
        <div>
            <h1>Manage Customers</h1>
            <div>
                <h2>Add New Customer</h2>
                <input
                    type="text"
                    placeholder="Customer Name"
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Logo URL"
                    onChange={(e) => setNewCustomer({ ...newCustomer, logo: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Website URL"
                    onChange={(e) => setNewCustomer({ ...newCustomer, website: e.target.value })}
                />
                <button onClick={addCustomer}>Add Customer</button>
            </div>
            <ul>
                {customers.map(customer => (
                    <li key={customer._id}>
                        <h3>{customer.name}</h3>
                        <img src={customer.logo} alt={customer.name} className="h-24 w-auto" />
                        <p><a href={customer.website} target="_blank" rel="noopener noreferrer">{customer.website}</a></p>
                        <button onClick={() => deleteCustomer(customer._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageCustomers;
