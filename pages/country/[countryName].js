import Link from 'next/link';
import Layout from '@/components/Layout/Layout';
import Image from 'next/image';
import styles from '@/pages-style/countryPage.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useContext } from 'react';
import { ThemeContext } from '@/context/theme-context';

const CountryPage = ({ countryData }) => {
  const { theme } = useContext(ThemeContext);

  const capital = countryData[0]?.capital?.[0];
  const flagsPng = countryData[0]?.flags?.png;
  const flagsAlt = countryData[0]?.flags?.alt;
  const name = countryData[0]?.name?.common;
  const population = countryData[0]?.population;
  const region = countryData[0]?.region;
  const subregion = countryData[0]?.subregion;
  const tld = countryData[0]?.tld;
  const currencies = countryData[0]?.currencies;
  const languages = countryData[0]?.languages;
  const borders = countryData[0]?.borders;

  return (
    <Layout>
      <div className={styles.countryPageBackButtonContainer}>
        <BackButton />
      </div>

      <div className={styles.countryPageContainer}>
        <div className={styles.countryPageFlagContainer}>
          {flagsPng ? <Image className={styles.countryPageFlagImg} src={flagsPng} alt={flagsAlt} fill /> : <></>}
        </div>

        <div className={styles.countryPageInfoContainer}>
          <div className={`${styles.countryPageInfo} ${styles.countryPageName}`}>{name || 'N/A'}</div>
          <div className={styles.countryPageInfoGrid}>
            <div>
              <div className={styles.countryPageInfo}><span>Population:</span> {population || 'N/A'}</div>
              <div className={styles.countryPageInfo}><span>Region:</span> {region || 'N/A'}</div>
              <div className={styles.countryPageInfo}><span>Subregion:</span> {subregion || 'N/A'}</div>
              <div className={styles.countryPageInfo}><span>Capital:</span> {capital || 'N/A'}</div>
            </div>

            <div>
              <div className={styles.countryPageInfo}><span>TLD:</span> {tld ? tld.join(', ') : 'N/A'}</div>
              <div className={styles.countryPageInfo}>
                <span> Currencies:{' '}</span>
                {currencies &&
                  Object.values(currencies).map((currency) => currency.name).join(', ')}
              </div>
              <div className={styles.countryPageInfo}>
                <span>Languages:</span>{' '}
                {languages && Object.values(languages).join(', ')}
              </div>
            </div>
          </div>

          <div className={`${styles.countryPageInfo} ${styles.countryBorders}`}>
            <span>Borders:</span>{' '}
            {borders && borders.length > 0 ? (
              borders.map((border) => (
                <Link className={`${styles.countryPageBorderLink} ${theme === 'light' ? 'light-mode-element' :
                  'dark-mode-element'}`} key={border} href={`/country/${border}`}>
                  {border}
                </Link>
              ))
            ) : (
              <div className={styles.noBorderCountries}>No border countries</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { countryName } = params;
  let countryData;

  let response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,flags,population,region,capital,languages,subregion,currencies,tld,borders`);
  if (!response.ok) {
    response = await fetch(`https://restcountries.com/v3.1/alpha/${countryName}?fields=name,flags,population,region,capital,languages,subregion,currencies,tld,borders`);
    countryData = await response.json()
    countryData = [countryData]
  } else {
    countryData = await response.json()
  }


  return {
    props: {
      countryData,
    },
  };
}

export default CountryPage;
