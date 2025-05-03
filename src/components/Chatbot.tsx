import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Chatbot.module.css';
import { IoSend } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { BsChatRightTextFill } from "react-icons/bs";
import { MdOutlineLiveHelp } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'bot' | 'system'}>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Charger l'historique depuis localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setMessages(JSON.parse(savedHistory));
    } else {
      setMessages([{
        text: "Bonjour ! Je suis l'assistant PruneVision. Posez-moi vos questions sur l'analyse des prunes.",
        sender: 'system'
      }]);
    }
  }, []);

  // Sauvegarder l'historique
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
  
    const userMessage = { text: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
  
    try {
      // Construire le contexte de la conversation
      // Prendre uniquement les 10 derniers messages pour éviter de dépasser les limites
      const conversationHistory = messages
        .filter(msg => msg.sender !== 'system')
        .slice(-10)
        .map(msg => `${msg.sender === 'user' ? 'Utilisateur' : 'Assistant'}: ${msg.text}`)
        .join('\n\n');
      
      // Ajouter le nouveau message
      const fullPrompt = conversationHistory 
        ? `Contexte de la conversation précédente:\n${conversationHistory}\n\nNouvelle question: ${input}\n\nAssistant, utilise le formatage markdown comme **gras** et *italique* dans ta réponse pour améliorer la lisibilité.`
        : `${input}\n\nAssistant, utilise le formatage markdown comme **gras** et *italique* dans ta réponse pour améliorer la lisibilité.`;
      
      console.log("Envoi du prompt avec contexte:", fullPrompt);
      
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt }),
      });
  
      const data = await response.json();
      console.log("Réponse du backend:", data);
  
      if (response.ok && data.text) {
        setMessages(prev => [...prev, { text: data.text, sender: 'bot' }]);
      } else {
        throw new Error(data.error || 'Erreur inconnue');
      }
    } catch (error) {
      console.error('Erreur appel backend:', error);
      setMessages(prev => [
        ...prev,
        {
          text: "Je rencontre des difficultés techniques. Veuillez réessayer plus tard.",
          sender: 'bot',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
  };

  const clearHistory = () => {
    localStorage.removeItem('chatHistory');
    setMessages([{
      text: "Conversation réinitialisée. Comment puis-je vous aider?",
      sender: 'system'
    }]);
  };

  const quickReplies = [
    "Comment analyser une prune?",
    "Qu'est-ce que Grad-CAM?",
    "Comment interpréter les résultats?",
    "Quelles maladies détectez-vous?"
  ];

  return (
    <div className={`${styles.chatbotContainer} ${isOpen ? styles.open : ''}`}>
      {isOpen ? (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <h3>Assistant PruneVision</h3>
              <div className={styles.actions}>
                <button 
                  onClick={clearHistory} 
                  title="Effacer l'historique"
                  className={styles.actionButton}
                >
                  <FaHistory />
                </button>
                <button 
                  onClick={() => handleQuickReply('/aide')} 
                  title="Aide"
                  className={styles.actionButton}
                >
                  <MdOutlineLiveHelp/>
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className={styles.closeButton}
                  title="Fermer"
                >
                  <IoMdClose style={{ fontSize: 30 }}/>
                </button>
              </div>
            </div>
          </div>
          
          <div className={styles.messages}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`${styles.message} ${
                  msg.sender === 'user' ? styles.user : 
                  msg.sender === 'system' ? styles.system : 
                  styles.bot
                }`}
              >
                {msg.sender === 'bot' || msg.sender === 'system' ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {isTyping && (
              <div className={styles.typingIndicator}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {messages.length === 1 && (
            <div className={styles.quickReplies}>
              <h4>Suggestions rapides:</h4>
              <div className={styles.repliesContainer}>
                {quickReplies.map((reply, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleQuickReply(reply)}
                    className={styles.replyButton}
                  >
                    <FaRegLightbulb fontSize="small" /> {reply}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Posez votre question..."
              disabled={isTyping}
            />
            <button 
              onClick={handleSend} 
              className={styles.sendButton}
              disabled={isTyping || !input.trim()}
            >
              <IoSend style={{ fontSize: '50px' }}/>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)} 
          className={styles.chatButton}
          aria-label="Ouvrir le chat"
        >
          <BsChatRightTextFill style={{ fontSize: 30 }} />
          {messages.length > 1 && (
            <span className={styles.notificationBadge}></span>
          )}
        </button>
      )}
    </div>
  );
};

export default Chatbot;