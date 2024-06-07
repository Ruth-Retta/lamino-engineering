import Image from 'next/image';
import Link from 'next/link';
import LaminoS from '../public/LaminoS.png'; // Adjust the path if necessary

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Image src={LaminoS} alt="Company Logo" width={50} height={50} />
          <h1 className="text-xl font-semibold ml-2">Your Company</h1>
        </div>

        {/* Navigation */}
        <nav className="flex items-center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/career">Career</NavLink>
          <NavLink href="/about">About Us</NavLink>
          <NavLink href="/contact">Contact Us</NavLink>
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
        {children}
      </a>
    </Link>
  );
};

export default Header;
