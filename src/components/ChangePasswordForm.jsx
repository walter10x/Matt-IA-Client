import React, { useState } from 'react';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

export const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if(newPassword !== confirmPassword) {
      setMessage('La nueva contraseña y la confirmación no coinciden.');
      return;
    }
    try {
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      // Es necesario reautenticar al usuario
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setMessage('Contraseña actualizada con éxito.');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="change-password-form mt-4">
      <div className="mb-2">
        <label className="block mb-1">Contraseña antigua:</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Nueva contraseña:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Confirmar nueva contraseña:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Actualizar contraseña
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
};

