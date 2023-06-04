import RegionMenu from '@/components/RegionMenu/RegionMenu';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import Layout from '@/components/Layout/Layout';
import styles from '@/pages-style/home.module.scss';

export default function Home({ data }) {
    const [countriesData, setCountriesData] = useState(data);
    const [regionFilter, setRegionFilter] = useState('');
    const [countryNameFilter, setCountryNameFilter] = useState('')

    useEffect(() => {
        if (!countryNameFilter) {
            if (regionFilter) {
                const filteredData = regionFilter === 'All' ? data : data.filter((country) => country.region === regionFilter);
                setCountriesData(filteredData);
            } else {
                setCountriesData(data);
            }
            return
        };
        const url = `https://restcountries.com/v3.1/name/${countryNameFilter}?fields=name,flags,population,region,capital`;
        const timer = setTimeout(() => {
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    if (!Array.isArray(data)) {
                        setCountriesData([]);
                        return;
                    }
                    if (regionFilter) {
                        const filteredData = regionFilter === 'All' ? data : data.filter((country) => country.region === regionFilter);
                        setCountriesData(filteredData);
                    } else {
                        setCountriesData(data);
                    }
                });
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [countryNameFilter, regionFilter, data]);


    console.log({ regionFilter }, { countryNameFilter }, { countriesData })
    return (
        <Layout>
            <div className={styles.filtersWrapper}>
                <SearchBar countryNameFilter={countryNameFilter} setCountryNameFilter={setCountryNameFilter} />
                <RegionMenu regionFilter={regionFilter} setRegionFilter={setRegionFilter} />
            </div>

            <div className={styles.countryCardsContainer}>
                {

                    countriesData && Array.isArray(countriesData) && countriesData.map((countryData) => (
                        <Card countryData={countryData} key={countryData.name?.common} />
                    ))
                }
            </div>
        </ Layout>
    );
}

export async function getServerSideProps() {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital');
    const data = await res.json();
    return { props: { data } };
}
