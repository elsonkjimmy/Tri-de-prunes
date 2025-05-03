// src/components/ImageUploader.tsx
import React, { useRef, useState } from 'react';
import { PredictionResultData } from './Dashboard';
import styles from './ImageUploader.module.css';

interface Props {
  onPredictionResult: (result: PredictionResultData) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const ImageUploader: React.FC<Props> = ({ onPredictionResult, setIsLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFileChange = async (file: File) => {
    if (!file) return;
    
    setIsLoading(true);
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      onPredictionResult({
        label: data.label,
        confidence: data.confidence,
        gradcamImage: data.gradcamImage,
        originalImage: URL.createObjectURL(file),
      });
    } catch (err) {
      console.error('Erreur lors de la prédiction :', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = () => {
    setIsDragActive(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileChange(file);
    }
  };

  return (
    <div 
      className={`${styles.uploadContainer} ${isDragActive ? styles.dragActive : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onInputChange}
        className={styles.fileInput}
      />
      
      {preview ? (
        <img src={preview} alt="Preview" className={styles.previewImage} />
      ) : (
        <div className={styles.uploadContent}>
          <div className={styles.uploadIcon}>📁</div>
          <p className={styles.uploadText}>
            {isDragActive ? 'Déposez votre image ici' : 'Glissez-déposez une image ou cliquez pour sélectionner'}
          </p>
          <p className={styles.uploadSubtext}>Formats supportés: JPG, PNG, JPEG</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;