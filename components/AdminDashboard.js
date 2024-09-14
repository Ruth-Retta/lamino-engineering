import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

const AdminDashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    const email = localStorage.getItem('authEmail') || '';
    signOut({ redirect: false });
    router.push(`/admin?email=${email}`);
  };

  return (
    <div className="admin-dashboard min-h-screen flex flex-col justify-between p-8 bg-white">
      <div>
        <h2 className="text-3xl font-bold mb-6 text-black">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link href="/admin/services">
              <div className="bg-[#70BA02] text-white py-2 px-4 rounded shadow-md hover:bg-[#94D13A] transition-colors cursor-pointer">
                Manage Services
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/news">
              <div className="bg-[#70BA02] text-white py-2 px-4 rounded shadow-md hover:bg-[#94D13A] transition-colors cursor-pointer">
                Manage News
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/portfolio">
              <div className="bg-[#70BA02] text-white py-2 px-4 rounded shadow-md hover:bg-[#94D13A] transition-colors cursor-pointer">
                Manage Portfolio
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/certifications">
              <div className="bg-[#70BA02] text-white py-2 px-4 rounded shadow-md hover:bg-[#94D13A] transition-colors cursor-pointer">
                Manage Certifications
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/customers">
              <div className="bg-[#70BA02] text-white py-2 px-4 rounded shadow-md hover:bg-[#94D13A] transition-colors cursor-pointer">
                Manage Customers
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/partners">
              <div className="bg-[#70BA02] text-white py-2 px-4 rounded shadow-md hover:bg-[#94D13A] transition-colors cursor-pointer">
                Manage Partners
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/testimonials">
              <div className="bg-[#70BA02] text-white py-2 px-4 rounded shadow-md hover:bg-[#94D13A] transition-colors cursor-pointer">
                Manage Testimonials
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/career">
              <div className="bg-[#70BA02] text-white py-2 px-4 rounded shadow-md hover:bg-[#94D13A] transition-colors cursor-pointer">
                Manage Career
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/about">
              <div className="bg-[#70BA02] text-white py-2 px-4 rounded shadow-md hover:bg-[#94D13A] transition-colors cursor-pointer">
                Manage About
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-8">
        <button 
          className="bg-black text-white py-2 px-4 rounded shadow-md hover:bg-[#94D13A] transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
