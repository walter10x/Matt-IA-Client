import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const firebaseToken = params.get('firebase_token');
    const email = params.get('email');
    const userInfo = params.get('user_info');

    if (firebaseToken && email) {
      localStorage.setItem('token', firebaseToken);
      localStorage.setItem('email', email);
      if (userInfo) {
        localStorage.setItem('userInfo', userInfo);
      }
      navigate('/chat', { replace: true });  // Redirige al chat después de guardar el token
    } else {
      console.log('Missing token or email, redirecting to login');
      navigate('/login', { replace: true });
    }
  }, [navigate, location]);

  return <div>Procesando autenticación...</div>;
};

export default GoogleAuthCallback;
