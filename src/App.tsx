import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot'; // Ajoutez cette ligne
import styles from './App.module.css';
import Fonctionnalites from './components/Fonctionnalites';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        
        <main className={styles.mainContent}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/features" element={<Fonctionnalites />} />
          </Routes>
        </main>

        <Footer />
        <Chatbot /> {/* Ajoutez cette ligne */}
      </div>
    </BrowserRouter>
  );
};

export default App;