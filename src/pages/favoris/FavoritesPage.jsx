import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './favorites.css';
import { useTranslation } from 'react-i18next';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w300';

export default function FavoritesPage() {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await fetch('/api/favorites', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFavorites(data);
    };
    fetchFavorites();
  }, [token]);

  return (
    <div className="favorites-container">
      <h2>{t('favorites')}</h2>
      <div className="favorites-grid">
        {favorites.length === 0 ? (
          <div className="no-favorites">{t('noFavorites', 'Aucune série en favoris pour le moment.')}</div>
        ) : (
          favorites.map((fav) => (
            <div key={fav._id} className="favorite-card">
              <img
                src={
                  fav.poster_path
                    ? `${IMG_BASE_URL}${fav.poster_path}`
                    : fav.image
                    ? `${IMG_BASE_URL}${fav.image}`
                    : '/placeholder.jpg'
                }
                alt={fav.name || fav.original_name}
                className="favorite-img"
              />
              <h4>{fav.name || fav.original_name}</h4>
              <Link to={`/details/${fav.showId}`} className="details-link">
                {t('showDetails')}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
