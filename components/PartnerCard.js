import React from 'react';

const PartnerCard = ({ partner, onDelete, onEdit }) => {
    return (
        <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col items-start">
            <h3 className="text-xl font-bold mb-2 text-[#70BA02]">{partner.name}</h3>
            {partner.logo && (
                <img src={partner.logo} alt={partner.name} className="w-32 h-32 object-contain mb-4" />
            )}
            <p className="text-blue-600 mb-4">
                <a href={partner.website} target="_blank" rel="noopener noreferrer">{partner.website}</a>
            </p>
            <div className="flex space-x-2">
                <button
                    onClick={() => onEdit(partner)}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                    Update
                </button>
                <button
                    onClick={() => onDelete(partner._id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default PartnerCard;
