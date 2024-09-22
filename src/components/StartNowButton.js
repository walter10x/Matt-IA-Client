import React from 'react';

export const StartNowButton = () => {
    return (
        <div className="flex justify-center mt-8">
            <button 
                className="bg-gradient-to-r from-black to-slate-600 text-white px-8 py-3 rounded-sm text-lg font-semibold shadow-lg transform transition duration-300 hover:scale-105 hover:from-violet-700 hover:to-indigo-700 active:scale-95"
                onClick={() => alert('¡Vamos a comenzar!')} // Aquí puedes agregar la funcionalidad que quieras.
            >
                Comenzar ahora
            </button>
        </div>
    );
};
