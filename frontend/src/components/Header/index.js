import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';

const Header = () => {
  const [activeTab, setActiveTab] = useState("Sala");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Sala");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    } 
  }, [location]);
  return (
    <div className="header">
      <p className="logo">RECOR</p>
      <div className="header-right">
        <Link to="/">
          <p
            className={`${activeTab === "Sala" ? "active" : ""}`}
            onClick={() => setActiveTab("Sala")}
          >
            Salas
          </p>
        </Link>

        <Link to="/about">
          <p
            className={`${activeTab === "About" ? "active" : ""}`}
            onClick={() => setActiveTab("About")}
          >
            Sobre
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;