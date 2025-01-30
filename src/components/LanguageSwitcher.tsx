import { useState } from 'react';
import { FiFlag } from 'react-icons/fi';
import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherProps {
  onLanguageChange: (language: 'en' | 'sk') => void;
}

export default function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'sk'>('en');

  const handleLanguageChange = (language: 'en' | 'sk') => {
    setCurrentLanguage(language);
    onLanguageChange(language);
  };

  return (
    <div className={styles['language-switcher']}>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`${styles['language-button']} ${
          currentLanguage === 'en' ? styles['active'] : ''
        }`}
        style={{ order: -1 }}
      >
        <FiFlag size={20} />
        <span>EN</span>
      </button>
      <button
        onClick={() => handleLanguageChange('sk')}
        className={`${styles['language-button']} ${
          currentLanguage === 'sk' ? styles['active'] : ''
        }`}
      >
        <FiFlag size={20} />
        <span>SK</span>
      </button>
    </div>
  );
} 