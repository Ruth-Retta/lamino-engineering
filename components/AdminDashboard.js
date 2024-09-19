import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import sideWhite from '../public/sideWhite.png';
import Image from 'next/image';

const AdminDashboard = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await signOut({ redirect: false, callbackUrl: '/admin' });
    router.push(result.url);
  };

  if (!session || !session.user.role) {
    return <p>Access Denied</p>;
  }

  return (
    <div className="admin-dashboard min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="sidebar bg-[#70BA02] text-white w-64 p-6">
      <div className="flex  items-center px-3">
  <Image
    src={sideWhite}
    alt="Company Logo"
    className="w-40 h-40 object-contain"
  />
</div>
        <ul className="space-y-4">
          <li>
            <Link href="/admin/services">
              <div className="py-2 px-4 rounded hover:bg-[#94D13A] cursor-pointer">Manage Services</div>
            </Link>
          </li>
          <li>
            <Link href="/admin/news">
              <div className="py-2 px-4 rounded hover:bg-[#94D13A] cursor-pointer">Manage News</div>
            </Link>
          </li>
          <li>
            <Link href="/admin/portfolio">
              <div className="py-2 px-4 rounded hover:bg-[#94D13A] cursor-pointer">Manage Portfolio</div>
            </Link>
          </li>
          <li>
            <Link href="/admin/certifications">
              <div className="py-2 px-4 rounded hover:bg-[#94D13A] cursor-pointer">Manage Certifications</div>
            </Link>
          </li>
          <li>
            <Link href="/admin/customers">
              <div className="py-2 px-4 rounded hover:bg-[#94D13A] cursor-pointer">Manage Customers</div>
            </Link>
          </li>
          <li>
            <Link href="/admin/partners">
              <div className="py-2 px-4 rounded hover:bg-[#94D13A] cursor-pointer">Manage Partners</div>
            </Link>
          </li>
          <li>
            <Link href="/admin/testimonials">
              <div className="py-2 px-4 rounded hover:bg-[#94D13A] cursor-pointer">Manage Testimonials</div>
            </Link>
          </li>
          <li>
            <Link href="/admin/career">
              <div className="py-2 px-4 rounded hover:bg-[#94D13A] cursor-pointer">Manage Career</div>
            </Link>
          </li>
          <li>
            <Link href="/admin/about">
              <div className="py-2 px-4 rounded hover:bg-[#94D13A] cursor-pointer">Manage About</div>
            </Link>
          </li>
        </ul>
        <div className="mt-8 flex px-2 ejustify-center ">
          <button 
            className="bg-white text-black py-2 px-4 rounded shadow-md hover:bg-[#94D13A] hover:text-white transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-area flex-1 p-8 bg-white rounded-lg shadow-lg ml-4">
        {children ? children : (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-black">Welcome to the Admin Dashboard</h2>
            <p>Select an option from the sidebar to manage different sections of the site.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
