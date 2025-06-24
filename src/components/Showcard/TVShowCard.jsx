import { Link, useLocation } from 'react-router-dom';
import './TVShowCard.css';
import { useTranslation } from 'react-i18next';
import FavoriteHeart from '../favoris/FavoriteHeart';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w300';
const PLACEHOLDER_IMG = '/placeholder.jpg'; // Assure-toi que ce fichier existe dans /public

export default function TVShowCard({ show, onRequireAuth }) {
  const location = useLocation();
  const { t } = useTranslation();

  // Détermine l'URL de l'image à afficher
  const posterUrl = show.poster_path
    ? `${IMG_BASE_URL}${show.poster_path}`
    : show.image
    ? `${IMG_BASE_URL}${show.image}`
    : PLACEHOLDER_IMG;

  return (
    <div className="tvshow-card">
      <div className="card">
        <div className="card-img-wrapper">
          <img
            src={posterUrl}
            className="card-img"
            alt={show.name || show.original_name || 'No poster'}
            loading="lazy"
          />
          <FavoriteHeart show={show} onRequireAuth={onRequireAuth} />
        </div>

        <div className="card-body">
          <h5 className="card-title">{show.name || show.original_name}</h5>
          <Link
            to={`/details/${show.id}`}
            state={{ from: location.pathname + location.search }}
            className="btn-primary"
          >
            {t('showDetails')}
          </Link>
        </div>
      </div>
    </div>
  );
}
