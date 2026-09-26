import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span>💰</span>
          <span>Salary Tracker</span>
        </div>
        <nav className={styles.nav}>
          <NavLink 
            to="/" 
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
          >
            Главная
          </NavLink>
          <NavLink 
            to="/history" 
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
          >
            История
          </NavLink>
          <NavLink 
            to="/analytics" 
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
          >
            Аналитика
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;