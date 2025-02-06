import React, { useContext, useEffect, useState } from 'react';
import { FaUserPlus, FaBars, FaUser,FaChevronLeft } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(location.pathname);
    const { isLoggedIn, setIsLoggedIn, userEmail, setUserEmail } = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // Cargar datos directamente desde localStorage
        const storedEmail = localStorage.getItem('email');
        const storedToken = localStorage.getItem('token');
        
        if (storedToken && storedEmail) {
            setIsLoggedIn(true);
            setUserEmail(storedEmail);
        } else {
            setIsLoggedIn(false);
            setUserEmail(null);
        }
    }, []);

    // Con esta modificación solo dejamos el elemento Register en el navbar.
    const navItems = [
        { name: 'Register', icon: FaUser, path: '/register' },
    ];

    // Si deseas eliminar también la función de logout o login, puedes quitarla.
    // En este ejemplo se mantiene la lógica para cargar el email del usuario.
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const displayedEmail = userEmail || userInfo.email || '';

    return (
        <nav className="bg-gradient-to-r from-black to-slate-500 p-4 shadow-lg z-50 relative ">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="flex items-center justify-center flex-grow">
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mr-2">Math-IA</h1>
                    <span className="text-yellow-300 text-sm hidden sm:inline">Asistente Inteligente</span>
                </div>
                
                {/* Menú de escritorio */}
                <ul className="hidden lg:flex space-x-6 items-center ">
                    {navItems.map((item, index) => (
                        <li key={index} className="flex-shrink-0 my-2 lg:my-0 ">
                            <Link
                                to={item.path}
                                className={`flex items-center  text-yellow-300 hover:text-white transition-all duration-300 ease-in-out ${
                                    activeItem === item.path ? 'text-white scale-110' : ''
                                }`}
                                onClick={() => setActiveItem(item.path)}
                            >
                                <item.icon className={`text-lg mr-1 ${activeItem === item.path ? 'animate-bounce' : ''}`} />
                                <span className="text-sm">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                    
                    {isLoggedIn && displayedEmail && (
                        <li className="text-yellow-300 text-sm flex-shrink-0 my-2 lg:my-0">
                            {displayedEmail}
                        </li>
                    )}
                </ul>

                {/* Menú móvil
                <div className="lg:hidden ml-4">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="absolute -right-1 top-4 bg-slate-600 text-white p-1.5 rounded-full hover:bg-slate-700">
                        <FaChevronLeft  className="text-xl" />
                    </button>
                </div> */}

                {isMenuOpen && (
                    <div className="absolute top-16 right-0 bg-gradient-to-r from-black to-slate-500 p-4 shadow-lg rounded-lg lg:hidden">
                        <ul className="space-y-4">
                            {navItems.map((item, index) => (
                                <li key={index} className="flex-shrink-0">
                                    <Link
                                        to={item.path}
                                        className={`flex items-center text-yellow-300 hover:text-white transition-all duration-300 ease-in-out ${
                                            activeItem === item.path ? 'text-white scale-110' : ''
                                        }`}
                                        onClick={() => {
                                            setActiveItem(item.path);
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        <item.icon className={`text-lg mr-1 ${activeItem === item.path ? 'animate-bounce' : ''}`} />
                                        <span className="text-sm">{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                            
                            {isLoggedIn && displayedEmail && (
                                <li className="text-yellow-300 text-sm flex-shrink-0">
                                    {displayedEmail}
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};
