import { FaFacebook, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShareAlt } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <h2>Get in touch</h2>
        <div className="email-info">
          <FaEnvelope /> info@laminoengineering.com / contact@laminoengineering.com
        </div>
        <div className="phone-info">
          <FaPhone /> +251 944 000033 / +251 988 000033
        </div>
        <div className="location">
        <FaMapMarkerAlt />
        <Link href="https://www.google.com/maps/place/Location" passHref>
          Addis Ababa, Bole, Winta Building
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
      <p>Powered by Ruth Retta</p>
    </footer>
  );
};

export default Footer;
