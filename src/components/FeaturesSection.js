import React from 'react';
import { FaRobot, FaQuestionCircle, FaBolt, FaChartLine } from 'react-icons/fa'; // Importamos iconos

export const FeaturesSection = () => {
    const features = [
        {
            icon: <FaRobot className="text-white text-5xl mb-4  " />,
            title: "Asistencia Inteligente",
            description: "Recibe respuestas rápidas y precisas gracias a la inteligencia artificial avanzada."
        },
        {
            icon: <FaQuestionCircle className="text-white text-5xl mb-4" />,
            title: "Resuelve tus dudas",
            description: "No importa la complejidad de la pregunta, MattIA tiene la respuesta."
        },
        {
            icon: <FaBolt className="text-white text-5xl mb-4" />,
            title: "Rápido y Eficiente",
            description: "Diseñado para ofrecer respuestas instantáneas y mejorar tu productividad."
        },
        {
            icon: <FaChartLine className="text-white text-5xl mb-4" />,
            title: "Proyección al Futuro",
            description: "Constantemente evolucionando para ofrecerte las mejores herramientas tecnológicas."
        }
    ];

    return (
        <div className="py-12 bg-gradient-to-r from-black to-indigo-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <h2 className="text-3xl font-bold mb-4 text-center">Características de <span className="text-violet-400">MattIA</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center p-6 bg-gray-900 bg-opacity-70 rounded-lg shadow-lg flex flex-col items-center  bg-gradient-to-r from-black to-slate-600"> {/* Ajustamos flex aquí */}
                            <div className="flex justify-center items-center">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-white">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
