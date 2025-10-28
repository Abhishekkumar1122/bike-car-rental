import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaMotorcycle, FaCar, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa';
 // bike icon
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <FaCar size={32} style={{ marginRight: '8px' }} />
          AbHisHeK ReNTaL
        </Link>
      </div>

      {/* Links */}
      <ul className="navbar-links">
        <li>
          <Link to="/"><FaHome /> Home</Link>
        </li>
        <li>
          <Link to="/bikes"><FaMotorcycle /> Bikes</Link>
        </li>
        <li>
          <Link to="/cars"><FaCar /> Cars</Link>
        </li>
        <li>
          <Link to="/about"><FaInfoCircle /> About</Link>
        </li>
        <li>
          <Link to="/contact"><FaPhoneAlt /> Contact</Link>
        </li>
      </ul>

      {/* Rent Button */}
      <div className="navbar-button">
        <Link to="/rent" className="btn">Rent Now</Link>
      </div>
    </nav>
  );
}

export default Navbar;
