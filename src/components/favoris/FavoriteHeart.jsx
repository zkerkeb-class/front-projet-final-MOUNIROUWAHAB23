import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './FavoriteHeart.css';

export default function FavoriteHeart({ show, onRequireAuth }) {
  const { token } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return;
      try {
        const res = await fetch('/api/favorites', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const fav = data.find((f) => f.showId === show.id.toString());
        setIsFavorite(!!fav);
      } catch (err) {
        console.error('Erreur chargement favoris', err);
      }
    };

    fetchFavorites();
  }, [show.id, token]);

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    if (!token) {
      if (onRequireAuth) onRequireAuth(show);
      else setShowPopup(true);
      return;
    }

    try {
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
    } catch (err) {
      console.error('Erreur modification favori', err);
    }
  };

  const handlePopupClose = () => setShowPopup(false);
  const handleGoToLogin = () => navigate('/login');

  return (
    <>
     <button
  className={`heart-icon ${isFavorite ? 'liked' : ''}`}
  onClick={toggleFavorite}
  aria-label="Toggle Favorite"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={isFavorite ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    className="heart-svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
         2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 
         16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
         11.54L12 21.35z"
    />
  </svg>
</button>

      {showPopup && (
        <div className="custom-popup-overlay">
          <div className="custom-popup">
            <h2>Connexion requise</h2>
            <p>Vous devez créer un compte ou vous connecter pour ajouter des séries en favoris.</p>
            <div className="popup-actions">
              <button className="popup-btn primary" onClick={handleGoToLogin}>Se connecter</button>
              <button className="popup-btn" onClick={handlePopupClose}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
