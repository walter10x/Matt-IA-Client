import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const ProfilePage = () => {
    const { isLoggedIn, userEmail } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[350px] max-w-full">
                <h2 className="text-3xl font-bold text-indigo-600 mb-4 text-center">
                    Perfil de Usuario
                </h2>
                <p className="text-center text-gray-700">
                    Email: <span className="font-semibold">{userEmail}</span>
                </p>
            </div>
        </div>
    );
};
