import { FaFacebook, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShareAlt } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <h2>Get in touch</h2>
        <div className="email-info">
        <FaEnvelope className="inline mr-2" /> 
          <a href="mailto:info@laminoengineering.com" className="hover:underline">info@laminoengineering.com</a> 
        </div>
        <div className="phone-info">
        <FaPhone className="inline mr-2" /> 
          <a href="tel:+251944000033" className="hover:underline">+251 944 000033</a> / 
          <a href="tel:+251988000033" className="hover:underline">+251 988 000033</a>
        </div>
        <div className="location">
        <FaMapMarkerAlt />
        <Link href="https://maps.app.goo.gl/ZkPPzZnBNyVp6pUv5" passHref>
          Addis Ababa, Bole, Winta Building, 4th floor
        </Link>
      </div> 
      <div className="social-icons">
        <Link href="https://www.facebook.com" passHref>
          <FaFacebook />
        </Link>
        <Link href="https://www.linkedin.com" passHref>
          <FaLinkedin />
        </Link>
        <button onClick={() => navigator.share({ title: 'Lamino Engineering', url: window.location.href })}>
          <FaShareAlt />
        </button>
      </div>
      <p>&copy; 2024 Lamino Engineering. All rights reserved.</p>
      <p>Powered by Lamino Engineering</p>
    </footer>
  );
};

export default Footer;
