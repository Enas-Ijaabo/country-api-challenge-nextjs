import { ThemeContext } from '@/context/theme-context';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import styles from './Card.module.scss';

const Card = ({ countryData }) => {
  const { theme } = useContext(ThemeContext);

  const capital = countryData.capital?.[0];
  const flagsPng = countryData.flags?.png;
  const flagsAlt = countryData.flags?.alt;
  const name = countryData.name?.common;
  const population = countryData.population;
  const region = countryData.region;

  return (
    <Link className={`${styles.countryCard} ${theme === 'light' ? 'light-mode-element' :
      'dark-mode-element'}`} href={`/country/${name}`}>
      <div className={styles.countryCardFlagContainer}>
        {flagsPng ? <Image className={styles.countryCardFlagImg} src={flagsPng} alt={flagsAlt} fill /> : <></>}
      </div>

      <div className={styles.countryCardInfoContainer}>
        <div className={`${styles.countryCardInfo} ${styles.countryCardName}`}>{name || 'N/A'}</div>
        <div className={styles.countryCardInfo}><span>Population:</span> {population || 'N/A'}</div>
        <div className={styles.countryCardInfo}><span>Region:</span> {region || 'N/A'}</div>
        <div className={styles.countryCardInfo}><span>Capital:</span> {capital || 'N/A'}</div>
      </div>
    </Link>

  )
}
export default Card;
