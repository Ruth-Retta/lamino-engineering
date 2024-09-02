import React from 'react';

const ServiceCard = ({ title, description, image, onDelete, onUpdate }) => {
    return (
        <div className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-4">{description}</p>
            {image && <img src={image} alt={title} className="mt-4 rounded-lg h-24 w-auto" />}
            <div className="mt-4 space-x-4">
                <button
                    onClick={onUpdate}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Update
                </button>
                <button
                    onClick={onDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ServiceCard;
