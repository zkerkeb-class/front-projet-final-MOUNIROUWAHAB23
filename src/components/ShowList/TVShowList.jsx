import React from 'react';
import TVShowCard from '../Showcard/TVShowCard';
import './TVShowList.css';

export default function TVShowList({ shows, onRequireAuth }) {
  if (!shows.length) {
    return <p className="no-results">Aucun résultat.</p>;
  }

  return (
    <div className="tvshow-grid">
      {shows.map((show) => (
        <TVShowCard key={show.id} show={show} onRequireAuth={onRequireAuth} />
      ))}
    </div>
  );
}
