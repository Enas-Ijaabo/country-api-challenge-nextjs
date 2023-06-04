import { ThemeContext } from '@/context/theme-context';
import Link from 'next/link';
import { useContext } from 'react';
import styles from './BackButton.module.scss';
const BackButton = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <Link className={`${styles.BackButton} ${theme === 'light' ? 'light-mode-element' :
            'dark-mode-element'}`} href='/'>
            <span className={styles.BackButtonArrow}>&#10229;</span>
            Back
        </Link>
    );
}
export default BackButton;
