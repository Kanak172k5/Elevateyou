import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InfiniteTypewriter = ({ phrases, speed = 100, eraseSpeed = 50, pause = 2000 }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentFullText = phrases[currentPhraseIndex];
      
      if (!isDeleting) {
        // Typing
        setCurrentText(currentFullText.slice(0, currentText.length + 1));
        
        if (currentText === currentFullText) {
          // Finished typing, wait before deleting
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        // Deleting
        setCurrentText(currentFullText.slice(0, currentText.length - 1));
        
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? eraseSpeed : speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, speed, eraseSpeed, pause]);

  return (
    <span className="relative">
      {currentText}
      <motion.span 
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[0.8em] bg-indigo-600 dark:bg-cyan-400 ml-1 translate-y-1"
      />
    </span>
  );
};

export default InfiniteTypewriter;
