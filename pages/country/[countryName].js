import Link from 'next/link';
import Layout from '@/components/Layout/Layout';
import Image from 'next/image';
import styles from '@/pages-style/countryPage.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/context/theme-context';
import { useRouter } from 'next/router';

const CountryPage = () => {
  const { theme } = useContext(ThemeContext);
  const [countryData, setCountryData] = useState([]);
  const router = useRouter();
  const { countryName } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}?fields=name,flags,population,region,capital,languages,subregion,currencies,tld,borders`
        );

        if (!response.ok) {
          response = await fetch(
            `https://restcountries.com/v3.1/alpha/${countryName}?fields=name,flags,population,region,capital,languages,subregion,currencies,tld,borders`
          );

          const countryData = await response.json();
          setCountryData([countryData]);
        } else {
          const countryData = await response.json();
          setCountryData(countryData);
        }

      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchData();
  }, [countryName]);

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


  if (!countryData || (Array.isArray(countryData) && countryData.length === 0)) {
    return <div>Loading...</div>;
  }

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

export default CountryPage;
