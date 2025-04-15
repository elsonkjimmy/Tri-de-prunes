import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./UploadPage.module.css";

const UploadPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      // Créer une preview de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.match('image.*')) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.wrapper}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.container}
      >
        <h1 className={styles.title}>
          <span className={styles.titleHighlight}>Analyse</span> d'image de prune
        </h1>
        <p className={styles.subtitle}>
          Sélectionnez une image de prune pour évaluer sa qualité
        </p>

        <div 
          className={`${styles.uploadArea} ${preview ? styles.hasPreview : ''}`}
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />

          {preview ? (
            <div className={styles.previewContainer}>
              <img src={preview} alt="Preview" className={styles.previewImage} />
              <div className={styles.overlay}>
                <span className={styles.changeText}>Cliquer pour changer d'image</span>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.uploadIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 13V19H5V13H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13H19Z" fill="#4F46E5"/>
                  <path d="M12 3L6.5 8.5L7.92 9.92L11 6.83V16H13V6.83L16.08 9.92L17.5 8.5L12 3Z" fill="#4F46E5"/>
                </svg>
              </div>
              <p className={styles.uploadText}>
                Glissez-déposez une image ou <span className={styles.browseText}>parcourir</span>
              </p>
              <p className={styles.uploadHint}>
                Formats supportés: JPG, PNG, WEBP (Max. 5MB)
              </p>
            </>
          )}
        </div>

        {preview && (
          <div className={styles.fileInfo}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#64748B"/>
              <path d="M14 2V8H20" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{image?.name}</span>
            <span className={styles.fileSize}>
              {(image?.size ? image.size / 1024 / 1024 : 0).toFixed(2)} MB
            </span>
          </div>
        )}

        <motion.div 
          whileHover={{ scale: 1.03 }} 
          whileTap={{ scale: 0.98 }}
          className={styles.buttonContainer}
        >
          <Link 
            to="/result" 
            className={`${styles.button} ${!image ? styles.disabled : ''}`}
            onClick={(e) => !image && e.preventDefault()}
          >
            Analyser la prune
            <span className={styles.buttonIcon}>→</span>
          </Link>
        </motion.div>

        <div className={styles.footerNote}>
          <span className={styles.version}>v1.0.0</span>
          Système de classification avancée
        </div>
      </motion.div>
    </div>
  );
};

export default UploadPage;