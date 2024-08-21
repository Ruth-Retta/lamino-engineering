import React from 'react';
import Link from 'next/link';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <ul>
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
  );
};

export default AdminDashboard;
