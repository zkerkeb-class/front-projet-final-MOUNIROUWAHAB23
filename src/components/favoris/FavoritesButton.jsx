import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './favorite.css';
import { useTranslation } from 'react-i18next';

export default function FavoriteButton({ show }) {
  const { token } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    const fetchFavorites = async () => {
      const res = await fetch('/api/favorites', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const fav = data.find((f) => f.showId === show.id.toString());
      setIsFavorite(!!fav);
    };
    fetchFavorites();
  }, [show.id, token]);

  const toggleFavorite = async () => {
    if (!token) {
      setShowPopup(true);
      return;
    }

    if (isFavorite) {
      await fetch(`/api/favorites/${show.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsFavorite(false);
    } else {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          showId: show.id,
          name: show.name,
          poster_path: show.poster_path, 
          original_name: show.original_name 
        }),
      });
      setIsFavorite(true);
    }
  };

  const handlePopupClose = () => setShowPopup(false);
  const handleGoToLogin = () => navigate('/login');

  return (
    <>
      <button className="favorite-btn" onClick={toggleFavorite}>
        {isFavorite ? t('removeFavorite') : t('addFavorite')}
      </button>
      {showPopup && (
        <div className="custom-popup-overlay">
          <div className="custom-popup">
            <h2>{t('authRequired')}</h2>
            <p>{t('pop_text')}</p>
            <div className="popup-actions">
              <button className="popup-btn primary" onClick={handleGoToLogin}>{t('login')}</button>
              <button className="popup-btn" onClick={handlePopupClose}>{t('close')}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
