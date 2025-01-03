import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setMessage('Inicio de sesión exitoso');
                navigate('/profile'); // Redirigir al perfil después del inicio de sesión exitoso
            } else {
                setMessage(data.error || 'Error en el inicio de sesión');
            }
        } catch (error) {
            setMessage('Error al conectarse al servidor');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form 
                className="bg-white p-8 rounded-lg shadow-lg w-[350px] max-w-full" 
                onSubmit={handleLogin}
            >
                <h2 className="text-3xl font-bold text-indigo-600 mb-4 text-center">
                    Login <span className="text-violet-600">MattIA</span>
                </h2>
                
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
                >
                    Iniciar sesión
                </button>

                {message && <p className="mt-4 text-center text-red-500">{message}</p>}

                <p className="mt-4 text-center text-gray-600">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/register" className="text-indigo-600 hover:text-indigo-800">
                        Regístrate aquí
                    </Link>
                </p>
            </form>
        </div>
    );
};