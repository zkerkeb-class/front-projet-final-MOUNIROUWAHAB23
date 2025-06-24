import { useEffect, useState } from 'react';
import { getPopularShows, searchShows, getShowsByGenre } from '../services/api';

export default function useGenreFilteredShows(query, genreId, page, language) {
  const [shows, setShows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        let res;
        if (genreId) {
          res = await getShowsByGenre(genreId, page, language);
        } else if (query) {
          res = await searchShows(query, page, language);
        } else {
          res = await getPopularShows(page, language);
        }
        if (!cancelled) {
          setShows(res.data.results || []);
          setTotalPages(res.data.total_pages || 1);
        }
      } catch (err) {
        if (!cancelled) {
          setShows([]);
          setTotalPages(1);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, [query, genreId, page, language]);

  return { shows, loading, totalPages };
}
