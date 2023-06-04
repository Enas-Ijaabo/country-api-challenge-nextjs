import { ThemeContext } from '@/context/theme-context';
import React, { useContext } from 'react';
import styles from './ThemeButton.module.scss';

const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className={`${styles.themeButton} ${theme === 'light' ? 'light-mode-element' :
      'dark-mode-element'}`} onClick={toggleTheme}>
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
};

export default ThemeButton;
