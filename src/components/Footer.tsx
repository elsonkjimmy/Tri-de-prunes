import React from 'react';
import styles from './Footer.module.css';
import { FaCarrot } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <FaCarrot className={styles.logo} />
            <h3>PruneVision AI</h3>
            <p>La solution intelligente pour la santé de vos prunes</p>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.linkGroup}>
              <h4>Navigation</h4>
              <a href="/">Accueil</a>
              <a href="/dashboard">Analyse</a>
              <a href="#features">Fonctionnalités</a>
            </div>
            
            <div className={styles.linkGroup}>
              <h4>Ressources</h4>
              <a href="#">Documentation</a>
              <a href="#">API</a>
              <a href="#">Support</a>
            </div>
            
            <div className={styles.linkGroup}>
              <h4>Légal</h4>
              <a href="#">Confidentialité</a>
              <a href="#">Conditions</a>
              <a href="#">Licence</a>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} PruneVision AI. Tous droits réservés.
          </div>
          
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Twitter">
            <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn">
            <GrLinkedin />
            </a>
            <a href="#" aria-label="GitHub">
            <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;