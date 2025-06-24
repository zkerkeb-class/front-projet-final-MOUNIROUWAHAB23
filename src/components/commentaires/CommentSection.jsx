import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './comments.css';
import { useTranslation } from 'react-i18next';

export default function CommentSection({ showId }) {
  const { token, user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments/${showId}`);
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error('Erreur chargement commentaires', err);
      }
    };

    fetchComments();
  }, [showId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ showId, text }),
      });

      const newComment = await res.json();

      // Ajout du nouveau commentaire en haut avec fadeIn CSS
      setComments((prev) => [newComment, ...prev]);
      setText('');
    } catch (err) {
      console.error('Erreur ajout commentaire', err);
    }
  };

  return (
    <div className="comment-section">
      <h3>{t('comments')}</h3>

      {comments.length === 0 ? (
        <p style={{ opacity: 0.6, fontStyle: 'italic' }}>
          {t('noComments')}
        </p>
      ) : (
        comments.map((c) => (
          <div key={c._id} className="comment fade-in-comment">
            <strong>{c.userId?.email || 'Utilisateur'}</strong>
            {c.text}
          </div>
        ))
      )}

      {token && (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('addComment')}
          ></textarea>
          <button type="submit">{t('send')}</button>
        </form>
      )}

      {!token && (
        <p style={{ marginTop: '1rem', opacity: 0.6 }}>
          {t('loginToComment')}
        </p>
      )}
    </div>
  );
}
