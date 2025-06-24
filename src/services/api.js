import axios from 'axios';

const TMDB_API_KEY = '258e24c1e089f5839c6eec474539532a';
const BASE_URL = 'https://api.themoviedb.org/3';

// Séries populaires
export const getPopularShows = (page = 1, language = 'fr-FR') =>
  axios.get(`${BASE_URL}/tv/popular`, {
    params: {
      api_key: TMDB_API_KEY,
      language,
      page,
    },
  });

// Recherche de séries par nom
export const searchShows = (query, page = 1, language = 'fr-FR') =>
  axios.get(`${BASE_URL}/search/tv`, {
    params: {
      api_key: TMDB_API_KEY,
      language,
      query,
      page,
    },
  });

// Détails d'une série (par ID)
export const getShowDetails = (id, language = 'fr-FR') =>
  axios.get(`${BASE_URL}/tv/${id}`, {
    params: {
      api_key: TMDB_API_KEY,
      language,
    },
  });

// Liste des genres TV
export const getGenres = (language = 'fr-FR') =>
  axios.get(`${BASE_URL}/genre/tv/list`, {
    params: {
      api_key: TMDB_API_KEY,
      language,
    },
  });

// Séries filtrées par genre (ID)
export const getShowsByGenre = (genreId, page = 1, language = 'fr-FR') =>
  axios.get(`${BASE_URL}/discover/tv`, {
    params: {
      api_key: TMDB_API_KEY,
      language,
      with_genres: genreId,
      page,
    },
  });

  // Détails d'une saison (et ses épisodes) pour une série donnée
export const getSeasonDetails = (showId, seasonNumber, language = 'fr-FR') =>
  axios.get(`${BASE_URL}/tv/${showId}/season/${seasonNumber}`, {
    params: {
      api_key: TMDB_API_KEY,
      language,
    },
  });
