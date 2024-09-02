import React from 'react';

const PortfolioCard = ({ title, imageUrl, description, onDelete, onUpdate }) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-start bg-white shadow-md transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold text-[#70BA02] mb-2">{title}</h3>
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-gray-700 mb-4">{description}</p>
            <div className="flex space-x-2">
                <button
                    onClick={onUpdate}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Update
                </button>
                <button
                    onClick={onDelete}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default PortfolioCard;
