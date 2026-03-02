import React, { useState } from 'react';
import './LanguageSelector.css';

interface LanguageSelectorProps {
  onLanguageChange?: (language: string) => void;
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Français');

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷', code2: 'FR' },
    { code: 'en', name: 'English', flag: '🇬🇧', code2: 'GB' },
    { code: 'ar', name: 'Arabic', flag: '🇹🇳', code2: 'TN' }
  ];

  const handleLanguageSelect = (language: { code: string; name: string; flag: string }) => {
    setSelectedLanguage(language.name);
    setIsOpen(false);
    if (onLanguageChange) {
      onLanguageChange(language.code);
    }
  };

  const currentLanguage = languages.find(lang => lang.name === selectedLanguage);

  return (
    <div className={`language-selector ${className}`}>
      <div 
        className="language-selector__current" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="language-selector__flag" data-flag={currentLanguage?.code}>
          {currentLanguage?.flag} {currentLanguage?.code2}
        </span>
        <span className="language-selector__text">{selectedLanguage}</span>
        <span className={`language-selector__arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </div>
      
      {isOpen && (
        <div className="language-selector__dropdown">
          {languages.map((language) => (
            <div
              key={language.code}
              className={`language-selector__option ${
                selectedLanguage === language.name ? 'selected' : ''
              }`}
              onClick={() => handleLanguageSelect(language)}
            >
              <span className="language-selector__flag" data-flag={language.code}>
                {language.flag} {language.code2}
              </span>
              <span className="language-selector__text">{language.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 