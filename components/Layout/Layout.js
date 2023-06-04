import { ThemeContext } from '@/context/theme-context';
import { useContext, useEffect } from 'react';
import Nav from '../Nav/Nav';
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme) {
      updateBodyClasses();
    }
  }, [theme]);

  const updateBodyClasses = () => {
    const body = document.body;
    body.classList.remove('light-mode-background', 'dark-mode-background');
    body.classList.add(theme === 'light' ? 'light-mode-background' : 'dark-mode-background');
  };

  return (
    <>
      <Nav className={styles.pageContainer} />
      <main className={`${styles.pageContainer} ${styles.main}`}>{children}</main>
    </>
  )
}
export default Layout;
