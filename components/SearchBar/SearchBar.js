import { ThemeContext } from '@/context/theme-context';
import { useContext } from 'react';
import styles from './SearchBar.module.scss';
const SearchBar = ({ countryNameFilter, setCountryNameFilter }) => {
    const { theme } = useContext(ThemeContext);

    const handleInputChange = (event) => {
        setCountryNameFilter(event.target.value);
    };

    return (
        <input className={`${styles.searchBar} ${theme === 'light' ? 'light-mode-element' :
            'dark-mode-element'}`}
            placeholder='Search for a country' value={countryNameFilter} onChange={handleInputChange} />

    )
}

export default SearchBar;
