import { ThemeContext } from '@/context/theme-context';
import Link from 'next/link';
import { useContext } from 'react';
import ThemeButton from '../ThemeButton/ThemeButton';
import styles from './Nav.module.scss';

const Nav = ({ className }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <nav className={`${styles.navbar} ${theme === 'light' ? 'light-mode-element' :
            'dark-mode-element'}`}>
            <div className={`${className} ${styles.navbarWrapper} `}>
                <Link className={`${styles.navbarLink} ${theme === 'light' ? 'light-mode-element' :
                    'dark-mode-element'}`} href='/'>Where in the world?</Link>
                <ThemeButton />
            </div>
        </nav>
    )
}
export default Nav;
