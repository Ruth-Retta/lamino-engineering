import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

const AdminDashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Assuming the email is stored in session or a similar place
    const email = localStorage.getItem('authEmail') || '';

    // Remove the authentication token and any other relevant data
    signOut({ redirect: false });

    // Redirect to the login page with the email as a query parameter
    router.push(`/admin?email=${email}`);
  };

  return (
    <div className="admin-dashboard min-h-screen flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <ul className="space-y-2">
          <li><Link href="/admin/services">Manage Services</Link></li>
          <li><Link href="/admin/news">Manage News</Link></li>
          <li><Link href="/admin/portfolio">Manage Portfolio</Link></li>
          <li><Link href="/admin/certifications">Manage Certifications</Link></li>
          <li><Link href="/admin/customers">Manage Customers</Link></li>
          <li><Link href="/admin/partners">Manage Partners</Link></li>
          <li><Link href="/admin/testimonials">Manage Testimonials</Link></li>
          <li><Link href="/admin/career">Manage Career</Link></li>
        </ul>
      </div>
      <div className="mt-8">
        <button 
          className="bg-red-600 text-white py-2 px-4 rounded mt-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
