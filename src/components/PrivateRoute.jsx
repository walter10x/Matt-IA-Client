import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, authChecked } = useContext(UserContext);

  if (!authChecked) return <div className="flex justify-center items-center h-screen">Cargando...</div>;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
