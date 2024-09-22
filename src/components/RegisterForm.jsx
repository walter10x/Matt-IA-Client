import React, { useState } from 'react';

export const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setMessage('Registro exitoso');
            } else {
                setMessage(data.error || 'Error en el registro');
            }
        } catch (error) {
            setMessage('Error al conectarse al servidor');
        }
    };

    return (
        <div className="flex justify-center items-center ">
            <form 
                className="bg-gradient-to-r from-black to-indigo-900 p-6 rounded-lg shadow-lg w-[350px] max-w-full" 
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
                >
                    Registrarse
                </button>

                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </form>
        </div>
    );
};
