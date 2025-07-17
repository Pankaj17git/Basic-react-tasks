// src/components/Header.jsx
import React from "react";
import { Link, Router } from "react-router";
import "./styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">MyApp</div>
      <nav className="nav">

        <Link to="/weather" className="nav-link">Weather</Link>
        <Link to="/timer" className="nav-link">Timer</Link>
        <Link to="/" className="nav-link">login</Link>
        <Link to="/app" className="nav-link">App</Link>

      </nav>
    </header>
  );
};

export default Header;
