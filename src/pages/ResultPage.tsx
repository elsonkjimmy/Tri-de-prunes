import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./ResultPage.module.css";

const ResultPage = () => {
  // Données simulées - à remplacer par vos données réelles
  const result = {
    quality: "Tachetée",
    confidence: 87,
    description: "La prune présente des taches caractéristiques qui affectent sa qualité. Elle est encore comestible mais ne répond pas aux standards premium.",
    recommendations: [
      "Convient pour la transformation en jus ou confiture",
      "À consommer rapidement",
      "Ne convient pas pour la vente en frais"
    ]
  };

  return (
    <div className={styles.wrapper}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.container}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.titleHighlight}>Résultat</span> de l'analyse
          </h1>
          <p className={styles.subtitle}>Classification de qualité des prunes</p>
        </div>

        <div className={styles.resultContainer}>
          <div className={styles.qualityBadge}>
            <span className={styles.qualityLabel}>Qualité</span>
            <span className={styles.qualityValue}>{result.quality}</span>
            <div className={styles.confidenceMeter}>
              <div 
                className={styles.confidenceBar}
                style={{ width: `${result.confidence}%` }}
              ></div>
              <span className={styles.confidenceValue}>{result.confidence}% de confiance</span>
            </div>
          </div>

          <div className={styles.resultImage}>
            {/* Ici vous placerez l'image analysée */}
            <div className={styles.imagePlaceholder}>
              <span className={styles.emoji}>🍑</span>
              <span>Image analysée</span>
            </div>
          </div>
        </div>

        <div className={styles.detailsContainer}>
          <h3 className={styles.detailsTitle}>Détails de l'analyse</h3>
          <p className={styles.description}>{result.description}</p>
          
          <div className={styles.recommendations}>
            <h4 className={styles.recommendationsTitle}>Recommandations :</h4>
            <ul className={styles.recommendationsList}>
              {result.recommendations.map((item, index) => (
                <li key={index} className={styles.recommendationItem}>
                  <span className={styles.bullet}>•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.actions}>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link to="/upload" className={styles.buttonPrimary}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13V19H5V13H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13H19Z" fill="white"/>
                <path d="M12 3L6.5 8.5L7.92 9.92L11 6.83V16H13V6.83L16.08 9.92L17.5 8.5L12 3Z" fill="white"/>
              </svg>
              Analyser une autre prune
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link to="/" className={styles.buttonSecondary}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="#4F46E5"/>
              </svg>
              Retour à l'accueil
            </Link>
          </motion.div>
        </div>

        <div className={styles.footerNote}>
          <span className={styles.version}>v1.0.0</span>
          Système expert de classification des prunes
        </div>
      </motion.div>
    </div>
  );
};

export default ResultPage;