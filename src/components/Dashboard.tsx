// src/components/Dashboard.tsx
import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import PredictionResult from './PredictionResult';
import styles from './Dashboard.module.css';

export interface PredictionResultData {
  label: string;
  confidence: number;
  gradcamImage: string;
  originalImage: string;
}

const Dashboard: React.FC = () => {
  const [result, setResult] = useState<PredictionResultData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Dashboard d'analyse</h1>
        <p>Téléchargez une image pour obtenir une prédiction IA</p>
      </div>
      
      <div className={styles.uploadSection}>
        <ImageUploader 
          onPredictionResult={setResult} 
          setIsLoading={setIsLoading}
        />
      </div>

      {isLoading && (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p>Analyse en cours...</p>
        </div>
      )}

      {result && !isLoading && (
        <PredictionResult
          label={result.label}
          confidence={result.confidence}
          originalImage={result.originalImage}
          gradcamImage={result.gradcamImage}
        />
      )}
    </div>
  );
};

export default Dashboard;