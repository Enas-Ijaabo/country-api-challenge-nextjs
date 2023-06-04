import { ThemeContext } from '@/context/theme-context';
import React, { useContext, useState } from 'react';
import styles from './RegionMenu.module.scss';

const regions = [
  "Asia",
  "Oceania",
  "Europe",
  "Americas",
  "Antarctic",
  "Africa"
];

const RegionMenu = ({ regionFilter, setRegionFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleRegionSelect = (selectedRegion) => {
    setIsOpen(false);
    setRegionFilter(selectedRegion);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdownWrapper}>
      <button className={`${styles.dropdownToggle}  ${theme === 'light' ? 'light-mode-element' :
        'dark-mode-element'}`} onClick={toggleDropdown}>
        {regionFilter === "All" || !regionFilter ? "Filter by Region" : regionFilter}
      </button>
      {isOpen && (
        <ul className={`${styles.dropdownMenu}  ${theme === 'light' ? 'light-mode-element' :
          'dark-mode-element'}`}>
          <li
            className={styles.menuOption}
            onClick={() => handleRegionSelect('All')}
          >
            All
          </li>
          {regions.map((region) => (
            <li
              className={styles.menuOption}
              key={region}
              onClick={() => handleRegionSelect(region)}
            >
              {region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RegionMenu;
