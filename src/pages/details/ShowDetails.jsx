import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getShowDetails } from '../../services/api';
import TVShowDetails from '../../components/ShowDetails/TVShowDetails';
import FavoriteButton from '../../components/favoris/FavoritesButton';
import CommentSection from '../../components/commentaires/CommentSection';


export default function ShowDetailsPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getShowDetails(id);
        setShow(res.data);
      } catch (err) {
        setError('Erreur lors du chargement des détails.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <div className="container my-4">
      <button
        onClick={() => navigate(from)}
        className="btn-primary"
        style={{ marginBottom: '1rem' }}
        aria-label="Retour à la liste"
      >
        ← Retour
      </button>

      {loading && <p>Chargement...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {show && (
        <>
          <TVShowDetails show={show} />
          <div style={{ marginTop: '1rem' }}>
            <FavoriteButton show={show} />
          </div>
          <hr />
          <CommentSection showId={show.id?.toString() || ''} />
        </>
      )}
    </div>
  );
}
