import React, { useEffect, useState } from 'react';



const CustomersSection = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => setPartners(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <main className="mx-auto p-10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6">Our Customers</h2>
          <div className="flex flex-col items-center">
            {/* Central logo */}
            <div className="mb-6">
              <img src="/underlightgreen.png" alt="Lamino Engineering" className="w-32 h-32 mx-auto animate-bounce" />
              <p className="text-xl font-bold mt-2 text-center">Lamino Engineering</p>
            </div>
            {/* Partners logos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {customers.map(customer => (
                <div key={customer._id} className="text-center transform transition duration-500 hover:scale-110">
                  <a href={customer.website} target="_blank" rel="noopener noreferrer">
                    <img src={customer.logo} alt={customer.name} className="mx-auto mb-2 h-16 w-auto rounded-md" />
                    <p className="text-lg font-medium">{customer.name}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomersSection;
