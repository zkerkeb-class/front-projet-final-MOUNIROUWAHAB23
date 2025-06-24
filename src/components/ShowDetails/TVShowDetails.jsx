import React, { useState } from 'react';
import './TvShowDetails.css';
import { useTranslation } from 'react-i18next';
import { getSeasonDetails } from '../../services/api';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function TVShowDetails({ show }) {
  const { t, i18n } = useTranslation();
  const [openedSeason, setOpenedSeason] = useState(null);
  const [episodesBySeason, setEpisodesBySeason] = useState({});
  const [loadingSeason, setLoadingSeason] = useState(false);
  const language = i18n.language === 'en' ? 'en-US' : 'fr-FR';

  // Charge les épisodes d'une saison si besoin
  const handleSeasonClick = async (seasonNumber) => {
    if (openedSeason === seasonNumber) {
      setOpenedSeason(null);
      return;
    }
    if (episodesBySeason[seasonNumber]) {
      setOpenedSeason(seasonNumber);
      return;
    }
    setLoadingSeason(true);
    try {
      const res = await getSeasonDetails(show.id, seasonNumber, language);
      setEpisodesBySeason((prev) => ({
        ...prev,
        [seasonNumber]: res.data.episodes,
      }));
      setOpenedSeason(seasonNumber);
    } catch (err) {
      // Gère l'erreur si besoin
    }
    setLoadingSeason(false);
  };

  return (
    <div className="show-details">
      <div className="image-section">
        <img
          src={show.poster_path ? `${IMG_BASE_URL}${show.poster_path}` : '/placeholder.jpg'}
          alt={show.name || show.original_name}
          className="detail-image"
        />
        {show.backdrop_path && (
          <img
            src={`${IMG_BASE_URL}${show.backdrop_path}`}
            alt={`${show.name || show.original_name} backdrop`}
            className="backdrop-image"
            style={{ marginTop: 10, width: 320, borderRadius: 8 }}
          />
        )}
      </div>

      <div className="info-section">
        <h2>{show.name || show.original_name}</h2>
        <div className="card description">
          <h4>{t('Description')}</h4>
          <p>{show.overview || t('Pas de description disponible')}</p>
        </div>
        <div className="card informations">
          <h4>{t('Informations')}</h4>
          <ul>
            <li>
              <strong>{t('Statut')} :</strong> {show.status || t('Inconnu')}
            </li>
            <li>
              <strong>{t('Début')} :</strong> {show.first_air_date || t('Inconnue')}
            </li>
            <li>
              <strong>{t('End')} :</strong> {show.last_air_date || t('En cours')}
            </li>
            <li>
              <strong>{t('saisons')} :</strong> {show.number_of_seasons}
            </li>
            <li>
              <strong>{t('Episodes')} :</strong> {show.number_of_episodes}
            </li>
            <li>
              <strong>{t('Genres')} :</strong> {show.genres?.map(g => g.name).join(', ') || '-'}
            </li>
            <li>
              <strong>{t('rate')} :</strong> {show.vote_average} ({show.vote_count} {t('votes')})
            </li>
            <li>
              <strong>{t('Pays')} :</strong> {show.origin_country?.join(', ') || '-'}
            </li>
            <li>
              <strong>{t('langue')} :</strong> {show.original_language?.toUpperCase() || '-'}
            </li>
            <li>
              <strong>{t('Network')} :</strong> {show.networks?.map(n => n.name).join(', ') || '-'}
            </li>
          </ul>
        </div>

        {/* Accordéon Saisons & Épisodes */}
        {show.seasons && show.seasons.length > 0 && (
          <div className="card accordion-section">
            <h4>{t('Saisons et épisodes')}</h4>
            <ul>
              {show.seasons.map((season) => (
                <li key={season.season_number}>
                  <button
                    className={`accordion-toggle ${openedSeason === season.season_number ? 'open' : ''}`}
                    onClick={() => handleSeasonClick(season.season_number)}
                    style={{
                      fontWeight: openedSeason === season.season_number ? 'bold' : 'normal',
                      background: openedSeason === season.season_number ? '#e0f7fa' : undefined,
                    }}
                  >
                    {season.name} ({season.episode_count} {t('Episodes')})
                  </button>

                  {openedSeason === season.season_number && (
                    <>
                      {loadingSeason ? (
                        <div style={{ padding: '1rem', textAlign: 'center' }}>{t('Chargement...')}</div>
                      ) : (
                        <ul className="episode-list">
                          {(episodesBySeason[season.season_number] || []).map((ep) => (
                            <li key={ep.id}>
                              <strong>{ep.episode_number}.</strong> {ep.name}
                              {ep.overview && (
                                <span style={{ color: '#888', fontSize: '0.97em', marginLeft: 8 }}>
                                  — {ep.overview.length > 100 ? ep.overview.slice(0, 100) + '…' : ep.overview}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
