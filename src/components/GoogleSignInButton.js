import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    // Redirigir al usuario a la ruta de backend para iniciar el flujo de OAuth
    window.location.href = `${process.env.REACT_APP_API_URL}/login/google`;
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center w-full px-4 py-2 mt-4 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
    >
      <FcGoogle className="w-5 h-5 mr-2" />
      <span className="font-medium">Continuar con Google</span>
    </button>
  );
};

export default GoogleSignInButton;
