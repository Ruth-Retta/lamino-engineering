import React, { useEffect, useState } from 'react';
import Image from "next/image";

const CustomersSection = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <main className="mx-auto p-10 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center pb-5 text-custom-green-2">Customers</h2>
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-20">
            {Array.isArray(customers) && customers.length > 0 ? (
              customers.map(customer => (
                <div key={customer._id} className="text-center transform transition duration-500 hover:scale-110">
                  <a href={customer.website} target="_blank" rel="noopener noreferrer">
                  <Image
                  src={`/api/customers/image/${customer.imageId}?t=${new Date().getTime()}`}
                  alt={customer.title}
                  width={200}
                  height={200}
                  className="mt-4 rounded-lg h-24 w-auto mx-auto"
                />
                  </a>
                </div>
              ))
            ) : (
              <p>No customers available</p> 
            )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomersSection;
