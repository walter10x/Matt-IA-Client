import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import {ChangePasswordForm} from './ChangePasswordForm';

export const Profile = () => {
  const { userEmail } = useContext(UserContext);
  // Se asume que en localStorage se guarda un objeto "userInfo" con más datos (como nombre, google_id, last_login)
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  
  return (
    <div className="profile-component p-6 border rounded shadow max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Información del Perfil</h2>
      <p><strong>Email:</strong> {userEmail}</p>
      {userInfo.name && <p><strong>Nombre:</strong> {userInfo.name}</p>}
      {userInfo.last_login && (
        <p>
          <strong>Último inicio:</strong> {new Date(userInfo.last_login).toLocaleString()}
        </p>
      )}
				
      <div className="mt-6">
        <h3 className="text-xl font-medium mb-2">Opciones de Seguridad</h3>
        {userInfo.google_id ? (
          <p>
            Estás autenticado a través de Google. La contraseña se gestiona en tu cuenta de Google.
            Para cambiarla, ingresa al panel de configuración de tu cuenta de Google.
          </p>
        ) : (
          <div>
            <p className="mb-2">Cambiar contraseña:</p>
            <ChangePasswordForm />
          </div>
        )}
      </div>
    </div>
  );
};

