import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../firebase';

export const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth(app);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        if (!email || !password || !username) {
            setMessage('Email, contraseña y nombre de usuario son requeridos');
            setIsLoading(false);
            return;
        }

        try {
            // Registrar en el backend
            const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error en el registro');
            }

            setMessage('Usuario registrado exitosamente');
            setTimeout(() => navigate('/chat'), 1500);
        } catch (error) {
            console.error('Error durante el registro:', error);
            setMessage(error.message || 'Error al registrarse');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form 
                className="bg-white p-8 rounded-lg shadow-lg w-[350px] max-w-full" 
                onSubmit={handleRegister}
            >
                <h2 className="text-3xl font-bold text-indigo-600 mb-4 text-center">
                    Register <span className="text-violet-600">MattIA</span>
                </h2>
                
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Nombre de usuario" 
                    className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-violet-600"
                    required 
                />
                
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-violet-600"
                    required 
                />
                
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Contraseña" 
                    className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-violet-600"
                    required 
                />
                
                <button 
                    type="submit" 
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded w-full hover:bg-gradient-to-l hover:from-indigo-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-600"
                    disabled={isLoading}
                >
                    {isLoading ? 'Registrando...' : 'Registrarse'}
                </button>

                {message && <p className="mt-4 text-center text-red-500">{message}</p>}

                <p className="mt-4 text-center text-gray-600">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-800">
                        Inicia sesión aquí
                    </Link>
                </p>
            </form>
        </div>
    );
};
