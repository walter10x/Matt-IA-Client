import React from 'react';
import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-black to-indigo-900">
            <LoginForm />
        </div>
    );
};