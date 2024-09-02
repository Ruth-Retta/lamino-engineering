import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PortfolioCard from '../../components/Portfoliocard';

const ManagePortfolio = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        title: '',
        imageUrl: '',
        description: '',
    });
    const [editingProjectId, setEditingProjectId] = useState(null);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    };

    const addOrUpdateProject = async () => {
        try {
            if (editingProjectId) {
                await axios.put(`/api/portfolio/${editingProjectId}`, newProject);
            } else {
                await axios.post('/api/portfolio', newProject);
            }
            fetchProjects();
            setNewProject({ title: '', imageUrl: '', description: '' });
            setEditingProjectId(null);
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    const handleUpdateClick = (project) => {
        setNewProject({
            title: project.title,
            imageUrl: project.imageUrl,
            description: project.description,
        });
        setEditingProjectId(project._id); 
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
                <h2 className="text-2xl font-semibold mb-4 text-black">{editingProjectId ? 'Update Project' : 'Add New Project'}</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Project Title"
                        value={newProject.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    />
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Image URL"
                        value={newProject.imageUrl}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={newProject.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                        rows="4"
                    ></textarea>
                    <button
                        onClick={addOrUpdateProject}
                        className="bg-[#94D13A] text-white py-2 px-4 rounded-lg hover:bg-[#70BA02] transition-colors"
                    >
                        {editingProjectId ? 'Update Project' : 'Add Project'}
                    </button>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-black">Existing Projects</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <PortfolioCard
                            key={project._id}
                            title={project.title}
                            imageUrl={project.imageUrl}
                            description={project.description}
                            onDelete={() => deleteProject(project._id)}
                            onUpdate={() => handleUpdateClick(project)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManagePortfolio;
