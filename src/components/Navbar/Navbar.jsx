import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">🎬 TVShowApp</NavLink>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" className="nav-link">{t('homeTitle')}</NavLink>
        {user && <NavLink to="/favorites" className="nav-link">{t('favorites')}</NavLink>}

        {!user ? (
          <>
            <NavLink to="/login" className="nav-link">{t('login')}</NavLink>
            <NavLink to="/register" className="nav-link">{t('register')}</NavLink>
          </>
        ) : (
          <>
            <button
              className="settings-btn"
              onClick={() => setSettingsOpen(!settingsOpen)}
            >
              <i className="fa-solid fa-gear"></i> {t('settings')}
            </button>

            {settingsOpen && (
              <div className="settings-menu">
                <div className="settings-item">
                  <i className="fa-solid fa-user"></i> {user.email}
                </div>

                <button className="settings-item" onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i> {t('logout')}
                </button>

                <button className="settings-item" onClick={toggleTheme}>
                  <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                  {theme === 'dark' ? t('lightMode') : t('darkMode')}
                </button>

                <div className="settings-item">
                  <i className="fa-solid fa-globe"></i>
                  <select
                    className="language-switch"
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                    value={i18n.language}
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
    </nav>
  );
}
