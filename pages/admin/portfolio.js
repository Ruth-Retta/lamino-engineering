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
            setNewProject({ title: '', imageUrl: '', description: '' }); // Clear form after submission
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
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-[#70BA02]">Manage Portfolio</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-black">Add New Project</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Project Title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newProject.imageUrl}
                        onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    />
                    <textarea
                        placeholder="Description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                        rows="4"
                    ></textarea>
                    <button
                        onClick={addProject}
                        className="bg-[#94D13A] text-white py-2 px-4 rounded-lg hover:bg-[#70BA02] transition-colors"
                    >
                        Add Project
                    </button>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-black">Existing Projects</h2>
                <ul className="space-y-4">
                    {projects.map(project => (
                        <li key={project._id} className="border border-gray-300 rounded-lg p-4 flex flex-col items-start">
                            <h3 className="text-xl font-semibold text-[#70BA02]">{project.title}</h3>
                            <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover rounded-lg my-4" />
                            <p className="text-gray-700 mb-4">{project.description}</p>
                            <button
                                onClick={() => deleteProject(project._id)}
                                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ManagePortfolio;
