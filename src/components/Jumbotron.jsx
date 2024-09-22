import React, { useState, useEffect } from 'react';

const TypingEffect = ({ phrases }) => {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentPhrase = phrases[currentPhraseIndex];

        const timer = setTimeout(() => {
            if (!isDeleting && currentText === currentPhrase) {
                setIsDeleting(true);
                setTimeout(() => {}, 1000); // Pausa antes de empezar a borrar
            } else if (isDeleting && currentText === '') {
                setIsDeleting(false);
                setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
            } else {
                setCurrentText(prev => 
                    isDeleting 
                        ? prev.slice(0, -1) 
                        : currentPhrase.slice(0, prev.length + 1)
                );
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentPhraseIndex, phrases]);

    return <span className="text-2xl">{currentText}</span>;
};

export const Jumbotron = () => {
    const phrases = [
        'Tu asistente personal inteligente.',
        'Respondiendo tus preguntas.',
        'Impulsado por inteligencia artificial.',
        'Diseñado para el futuro.'
    ];

    return (
        <div className="w-full bg-gradient-to-r from-black to-indigo-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto bg-gradient-to-r from-black to-slate-600 rounded-lg p-6 shadow-lg border border-indigo-950">
                    <h1 className="text-4xl font-bold mb-2">Bienvenido a <span className="text-violet-400">MattIA</span></h1>
                    <div className="h-16 flex items-center justify-center">
                        <TypingEffect phrases={phrases} />
                    </div>
                    <p className="mt-4 text-lg">
                        MattIA es una plataforma de asistencia virtual que te ayuda a resolver preguntas complejas, 
                        interactuar con inteligencia artificial y mejorar tu productividad. 
                        Nuestra misión es llevar la tecnología avanzada a tu alcance.
                    </p>
                </div>
            </div>
        </div>
    );
};