import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Fonctionnalites.module.css';
import { 
  ImageSearch, 
  Analytics, 
  Visibility, 
  Speed, 
  Security, 
  IntegrationInstructions,
  Chat,
  DashboardCustomize,
  Science
} from '@mui/icons-material';

const Fonctionnalites: React.FC = () => {
  const features = [
    {
      icon: <ImageSearch className={styles.featureIcon} />,
      title: "Analyse d'images avancée",
      description: "Détection précise des maladies des prunes grâce à notre modèle IA entraîné sur des milliers d'images.",
      color: "#6a0dad"
    },
    {
      icon: <Analytics className={styles.featureIcon} />,
      title: "Rapports détaillés",
      description: "Générez des rapports PDF complets avec statistiques et recommandations de traitement.",
      color: "#9c27b0"
    },
    {
      icon: <Visibility className={styles.featureIcon} />,
      title: "Visualisation Grad-CAM",
      description: "Comprenez comment l'IA prend ses décisions avec nos cartes thermiques explicatives.",
      color: "#ab47bc"
    },
    {
      icon: <Speed className={styles.featureIcon} />,
      title: "Temps réel",
      description: "Résultats en moins de 5 secondes grâce à notre infrastructure optimisée.",
      color: "#7b1fa2"
    },
    {
      icon: <Security className={styles.featureIcon} />,
      title: "Sécurité des données",
      description: "Vos images sont analysées localement et jamais stockées sur nos serveurs.",
      color: "#8e24aa"
    },
    {
      icon: <Chat className={styles.featureIcon} />,
      title: "Assistant IA intégré",
      description: "Notre chatbot Gemini répond à toutes vos questions sur les maladies des prunes.",
      color: "#d500f9"
    }
  ];

  const steps = [
    {
      icon: <DashboardCustomize className={styles.stepIcon} />,
      title: "1. Téléversement",
      description: "Glissez-déposez votre image ou sélectionnez un fichier"
    },
    {
      icon: <Science className={styles.stepIcon} />,
      title: "2. Analyse IA",
      description: "Notre algorithme examine chaque détail de l'image"
    },
    {
      icon: <IntegrationInstructions className={styles.stepIcon} />,
      title: "3. Résultats",
      description: "Recevez un diagnostic complet avec visualisation"
    }
  ];

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Fonctionnalités <span className={styles.highlight}>PruneVision</span></h1>
          <p className={styles.heroSubtitle}>
            Découvrez comment notre plateforme révolutionne la détection des maladies des prunes
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/dashboard" className={styles.primaryButton}>
              Essayer maintenant
            </Link>
            <Link to="/" className={styles.secondaryButton}>
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Nos technologies clés</h2>
        <p className={styles.sectionSubtitle}>
          Une combinaison puissante d'IA et d'agronomie
        </p>
        
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={styles.featureCard}
              style={{ borderTop: `4px solid ${feature.color}` }}
            >
              <div className={styles.featureHeader}>
                <div className={styles.iconContainer} style={{ backgroundColor: `${feature.color}20` }}>
                  {feature.icon}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
              </div>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>Comment ça marche ?</h2>
        <p className={styles.sectionSubtitle}>
          Trois étapes simples pour un diagnostic précis
        </p>
        
        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div key={index} className={styles.stepCard}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.stepIconContainer}>
                {step.icon}
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Prêt à révolutionner votre diagnostic agricole ?</h2>
        <Link to="/dashboard" className={styles.ctaButton}>
          Commencer l'analyse gratuite
        </Link>
      </section>
    </div>
  );
};

export default Fonctionnalites;