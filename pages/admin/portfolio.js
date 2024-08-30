import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagePortfolio = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        title: '',
        imageUrl: '',
        description: '',
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('/api/portfolio');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const addProject = async () => {
        try {
            await axios.post('/api/portfolio', newProject);
            fetchProjects();
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    const deleteProject = async (id) => {
        try {
            await axios.delete(`/api/portfolio/${id}`);
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <div>
            <h1>Manage Portfolio</h1>
            <div>
                <h2>Add New Project</h2>
                <input
                    type="text"
                    placeholder="Project Title"
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                ></textarea>
                <button onClick={addProject}>Add Project</button>
            </div>
            <ul>
                {projects.map(project => (
                    <li key={project._id}>
                        <h3>{project.title}</h3>
                        <img src={project.imageUrl} alt={project.title} className="h-24 w-auto" />
                        <p>{project.description}</p>
                        <button onClick={() => deleteProject(project._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManagePortfolio;
