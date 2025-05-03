import React from 'react';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import { FaSearchengin } from "react-icons/fa6";
import { FaWatchmanMonitoring } from "react-icons/fa6";
import { Analytics } from '@mui/icons-material';

import myImage from "../assets/1.jpeg";

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            <span className={styles.titleHighlight}>Prune</span>Vision AI
          </h1>
          <p className={styles.subtitle}>Détection intelligente des maladies des prunes par analyse d'images</p>
          <Link to="/dashboard" className={styles.ctaButton}>
            Démarrer l'analyse <span className={styles.arrow}>→</span>
          </Link>
          <div className={styles.trustBadges}>
            <span className={styles.badge}>Technologie de pointe</span>
            <span className={styles.badge}>Précision certifiée</span>
          </div>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.imageWrapper}>
          <img src={myImage} alt="AI Analysis" className={styles.image} />;
            <div className={styles.imageOverlay}></div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Pourquoi choisir PruneVision ?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FaSearchengin style={{fontSize:'35px'}}/>
            </div>
            <h3>Diagnostic précis</h3>
            <p>Notre algorithme détecte avec une précision de 98% les maladies courantes des prunes</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Analytics style={{fontSize:'35px'}}/>
            </div>
            <h3>Visualisation intelligente</h3>
            <p>Comprenez les résultats grâce à nos cartes thermiques Grad-CAM explicatives</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FaWatchmanMonitoring style={{fontSize:'35px'}} />
            </div>
            <h3>Rapports détaillés</h3>
            <p>Générez des rapports PDF complets pour archivage et partage</p>
          </div>
        </div>
      </section>

      <section className={styles.demo}>
        <h2 className={styles.sectionTitle}>Comment ça marche ?</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <p>Téléchargez une photo de votre prune</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <p>Notre IA analyse l'image en quelques secondes</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <p>Recevez un diagnostic complet avec visualisation</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;