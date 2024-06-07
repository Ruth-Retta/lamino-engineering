import Image from 'next/image';
import Link from 'next/link';
import LaminoS from '../public/LaminoS.png'; // Adjust the path if necessary

// Header component
const Header = () => (
  <header className="header">
    <div className="flex items-center">
        <Image src={LaminoS} alt="Company Logo" className="h-10 mr-3" /> 
    </div>
    <div className="container mx-auto flex justify-between items-center py-4 px-6">
      <nav className="nav">
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#career">Career</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;

