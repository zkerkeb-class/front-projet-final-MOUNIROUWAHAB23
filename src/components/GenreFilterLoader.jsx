import React, { useState, useEffect } from 'react';
import { getPopularShows, getShowDetails } from '../services/api';
import TVShowList from './ShowList/TVShowList';

export default function GenreFilterLoader({ genre }) {
  const [page, setPage] = useState(1);
  const [matchedShows, setMatchedShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadAndFilter = async () => {
    setLoading(true);
    try {
      const res = await getPopularShows(page);
      const tvShows = res.data.tv_shows || [];

      const detailed = await Promise.all(tvShows.map(async (show) => {
        try {
          const details = await getShowDetails(show.name);
          return {
            ...show,
            genres: details.data.tvShow?.genres || []
          };
        } catch (e) {
          return null;
        }
      }));

      const validShows = detailed.filter(Boolean);

      const filtered = validShows.filter((s) =>
        s.genres?.some((g) =>
          g.toLowerCase().includes(genre.toLowerCase())
        )
      );

      setMatchedShows(prev => [...prev, ...filtered]);
      setPage(prev => prev + 1);

      if (tvShows.length === 0 || page >= res.data.pages) {
        setHasMore(false);
      }
    } catch (e) {
      console.error('Erreur chargement:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMatchedShows([]);
    setPage(1);
    setHasMore(true);
  }, [genre]);

  useEffect(() => {
    if (page === 1) loadAndFilter();
  }, [page]);

  return (
    <div>
      <TVShowList shows={matchedShows} />
      {hasMore && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button onClick={loadAndFilter} disabled={loading}>
            {loading ? 'Chargement...' : `Charger plus de séries ${genre}`}
          </button>
        </div>
      )}
    </div>
  );
}
