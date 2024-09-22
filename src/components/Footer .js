import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-black to-indigo-900 text-white py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="flex justify-center space-x-6 mb-4">
                    {/* Iconos de redes sociales */}
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                        <FaFacebook className="text-2xl" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                        <FaTwitter className="text-2xl" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                        <FaLinkedin className="text-2xl" />
                    </a>
                    <a href="https://www.github.com/walter10x" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                        <FaGithub className="text-2xl" />
                    </a>
                </div>
                
                <p className="text-center text-gray-400 text-sm">
                    © {new Date().getFullYear()} MattIA. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};
