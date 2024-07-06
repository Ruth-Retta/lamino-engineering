import Image from 'next/image';
import sideWhite from '../public/sideWhite.png'; // Adjust the path if necessary

// Header component
const Header = () => (
  <header className="header">
    <div className="header-container">
      <div className="logo">
        <Image src={sideWhite} alt="Company Logo" className="logo-image" />
      </div>
      <nav className="nav">
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#testimonial">Testimonial</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#career">Career</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
