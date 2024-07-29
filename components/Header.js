import Image from 'next/image';
import sideWhite from '../public/sideWhite.png';
import Link from 'next/link';


const HeaderP = () => (
  <header className="header">
    <div className="header-container">
      <div className="logo">
        <Image src={sideWhite} alt="Company Logo" className="logo-image" />
      </div>
      <nav className="nav">
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/portfolio">Portfolio</Link></li>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/career">Career</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default HeaderP;
