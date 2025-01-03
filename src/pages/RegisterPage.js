import React from 'react';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-black to-indigo-900">
            <RegisterForm />
        </div>
    );
};