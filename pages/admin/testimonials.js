import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [newTestimonial, setNewTestimonial] = useState({
        author: '',
        position: '',
        content: '',
        image: '',
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get('/api/testimonials');
            setTestimonials(response.data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        }
    };

    const addTestimonial = async () => {
        try {
            await axios.post('/api/testimonials', newTestimonial);
            fetchTestimonials();
        } catch (error) {
            console.error('Error adding testimonial:', error);
        }
    };

    const deleteTestimonial = async (id) => {
        try {
            await axios.delete(`/api/testimonials/${id}`);
            fetchTestimonials();
        } catch (error) {
            console.error('Error deleting testimonial:', error);
        }
    };

    return (
        <div>
            <h1>Manage Testimonials</h1>
            <div>
                <h2>Add New Testimonial</h2>
                <input
                    type="text"
                    placeholder="Author"
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, author: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Position"
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, position: e.target.value })}
                />
                <textarea
                    placeholder="Content"
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                ></textarea>
                <input
                    type="text"
                    placeholder="Image URL"
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, image: e.target.value })}
                />
                <button onClick={addTestimonial}>Add Testimonial</button>
            </div>
            <ul>
                {testimonials.map(testimonial => (
                    <li key={testimonial._id}>
                        <h3>{testimonial.author}</h3>
                        <p>{testimonial.position}</p>
                        <p>{testimonial.content}</p>
                        <img src={testimonial.image} alt={testimonial.author} className="h-24 w-auto" />
                        <button onClick={() => deleteTestimonial(testimonial._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageTestimonials;
