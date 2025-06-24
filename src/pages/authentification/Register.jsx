import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './auth.css'; 
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur lors de l’inscription.');
      await login({ email: formData.email, password: formData.password });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{t('register')}</h2>
        {error && <p className="error">{error}</p>}
        <input type="email" name="email" placeholder={t('email')} value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder={t('password')} value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder={t('confirmPassword')} value={formData.confirmPassword} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? 'Chargement...' : "S'inscrire"}</button>
      </form>
    </div>
  );
};

export default Register;
