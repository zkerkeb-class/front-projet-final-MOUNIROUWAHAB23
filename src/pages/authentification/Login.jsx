import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './auth.css'; 
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { t } = useTranslation();
  
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{t('Connexion')}</h2>
        {error && <p className="error">{error}</p>}
        <input type="email" placeholder={t('email')} value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} required />
        <input type="password" placeholder={t('password')} value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} required />
        <button type="submit">{t('login')}</button>
      </form>
    </div>
  );
};

export default Login;
