import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.container}
      >
        <div className={styles.logoContainer}>
          <motion.span 
            role="img" 
            aria-label="plum" 
            className={styles.logo}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          >
            🍑
          </motion.span>
        </div>
        
        <h1 className={styles.title}>
          <span className={styles.titleHighlight}>Tri Automatique</span> des Prunes
        </h1>
        
        <p className={styles.subtitle}>
          Système intelligent de classification pour évaluer la qualité 
          des prunes avec une précision optimale
        </p>
        
        <div className={styles.features}>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>⚡</span>
            <span>Analyse rapide</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>🎯</span>
            <span>Précision élevée</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>🤖</span>
            <span>Technologie IA</span>
          </div>
        </div>
        
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link to="/upload" className={styles.button}>
            Commencer l'analyse
            <span className={styles.buttonIcon}>→</span>
          </Link>
        </motion.div>
        
        <div className={styles.footerNote}>
          <span className={styles.version}>v1.0.0</span>
          Solution professionnelle pour agriculteurs
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;