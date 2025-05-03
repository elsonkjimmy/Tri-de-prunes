// src/components/PredictionResult.tsx
import React from 'react';
import Plot from 'react-plotly.js';
import styles from './PredictionResult.module.css';

interface Props {
  label: string;
  confidence: number;
  originalImage: string;
  gradcamImage: string;
}

const PredictionResult: React.FC<Props> = ({
  label,
  confidence,
  originalImage,
  gradcamImage,
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Résultats de l'analyse</h2>
      
      <div className={styles.imageComparison}>
        <div className={styles.imageCard}>
          <h3>Image originale</h3>
          <img src={originalImage} alt="Original" className={styles.image} />
        </div>
        <div className={styles.imageCard}>
          <h3>Visualisation Grad-CAM</h3>
          <img src={gradcamImage} alt="Grad-CAM" className={styles.image} />
        </div>
      </div>

      <div className={styles.results}>
        <div className={styles.predictionDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Label prédit:</span>
            <span className={styles.detailValue}>{label}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Niveau de confiance:</span>
            <span className={styles.confidenceValue}>
              {(confidence * 100).toFixed(2)}%
              <div className={styles.confidenceBarContainer}>
                <div 
                  className={styles.confidenceBar} 
                  style={{ width: `${confidence * 100}%` }}
                ></div>
              </div>
            </span>
          </div>
        </div>

        <div className={styles.gaugeContainer}>
          <Plot
            data={[
              {
                type: 'indicator',
                mode: 'gauge+number',
                value: confidence * 100,
                title: { text: 'Confiance', font: { size: 16 } },
                gauge: {
                  axis: { range: [0, 100], tickwidth: 1, tickcolor: '#6a0dad' },
                  bar: { color: '#6a0dad' },
                  bgcolor: 'white',
                  borderwidth: 2,
                  bordercolor: '#e1bee7',
                  steps: [
                    { range: [0, 50], color: '#e1bee7' },
                    { range: [50, 100], color: '#ce93d8' }
                  ],
                },
                number: { font: { color: '#6a0dad', size: 24 } }
              },
            ]}
            layout={{ 
              width: 300, 
              height: 250, 
              margin: { t: 40, b: 40, l: 40, r: 40 },
              paper_bgcolor: 'rgba(0,0,0,0)',
              font: { family: 'Arial, sans-serif' }
            }}
            config={{ displayModeBar: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;