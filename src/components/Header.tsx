import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { FaCarrot } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <FaCarrot className={styles.logoSvg} /> 
          <span>PruneVision</span>
        </Link>

        <button 
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <RiCloseLargeFill /> : <MdOutlineMenu />}
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link to="/" className={styles.navLink}>
            Accueil
          </Link>
          <Link to="/dashboard" className={styles.navLink}>
            Analyse
          </Link>
          <Link to="/features" className={styles.navLink}>
            Fonctionnalités
          </Link>
          <Link to="/dashboard" className={styles.ctaButton}>
            Essayer maintenant
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;