import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useGenreFilteredShows from '../../hooks/useGenreFilteredShows';
import { getGenres } from '../../services/api';
import TVShowList from '../../components/ShowList/TVShowList';
import GenreFilterLoader from '../../components/GenreFilterLoader';
import './home.css';

const RECENT_KEY = 'recentSearches';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  const language = i18n.language === 'en' ? 'en-US' : 'fr-FR';

  const [inputValue, setInputValue] = useState(searchParams.get('q') || '');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupShowName, setPopupShowName] = useState('');
  const [genresList, setGenresList] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState('');

  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page')) || 1;

  // Récupération dynamique des genres TMDB selon la langue
  useEffect(() => {
    getGenres(language).then(res => setGenresList(res.data.genres || []));
  }, [language]);

  // Synchronisation genre sélectionné <-> ID
  useEffect(() => {
    const genreName = searchParams.get('genre') || '';
    const found = genresList.find(g => g.name === genreName);
    setSelectedGenreId(found ? found.id : '');
  }, [searchParams, genresList]);

  const { shows, loading, totalPages } = useGenreFilteredShows(query, selectedGenreId, page, language);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    setRecentSearches(stored);
  }, []);

  const updateRecentSearches = (term) => {
    let updated = [term, ...recentSearches.filter((t) => t !== term)];
    if (updated.length > 5) updated = updated.slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setSearchParams({ q: inputValue, genre: searchParams.get('genre') || '', page: 1 });
    updateRecentSearches(inputValue);
  };

  const handleRecentClick = (term) => {
    setInputValue(term);
    setSearchParams({ q: term, genre: searchParams.get('genre') || '', page: 1 });
  };

  const goToPage = (targetPage) => {
    setSearchParams({ q: query, genre: searchParams.get('genre') || '', page: targetPage });
  };

  const handleGenreChange = (e) => {
    const genreName = e.target.value;
    setSearchParams({ q: query, genre: genreName, page: 1 });
  };

  return (
    <div className="home-container">
      <h1 className="title">{t('homeTitle')}</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder={t('searchPlaceholder')}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="search-button">{t('searchButton')}</button>
        <select
          value={searchParams.get('genre') || ''}
          onChange={handleGenreChange}
          className="genre-select"
        >
          <option className="genre-list" value="">{t('genres')}</option>
          {genresList.map((g) => (
            <option key={g.id} value={g.name}>{g.name}</option>
          ))}
        </select>
      </form>

      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <h6>{t('Recent searches')}:</h6>
          <div className="recent-buttons">
            {recentSearches.map((term, idx) => (
              <button
                key={idx}
                onClick={() => handleRecentClick(term)}
                className="recent-btn"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <GenreFilterLoader />
      ) : (
        <TVShowList
          shows={shows}
          onRequireAuth={(show) => {
            setPopupShowName(show.name || show.original_name);
            setShowPopup(true);
          }}
        />
      )}

      <div className="pagination">
        <button onClick={() => goToPage(page - 1)} disabled={page === 1}>
          ← {t('prev')}
        </button>
        <span>Page {page} / {totalPages}</span>
        <button onClick={() => goToPage(page + 1)} disabled={page === totalPages}>
          {t('next')} →
        </button>
      </div>

      {showPopup && (
        <div className="custom-popup-overlay">
          <div className="custom-popup">
            <h2>{t('authRequired')}</h2>
            <p>
              {t('loginToFavorite')} {popupShowName ? ` « ${popupShowName} »` : ''}
            </p>
            <div className="popup-actions">
              <button className="popup-btn primary" onClick={() => window.location = '/login'}>
                {t('login')}
              </button>
              <button className="popup-btn" onClick={() => setShowPopup(false)}>
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
