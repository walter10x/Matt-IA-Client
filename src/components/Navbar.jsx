import React, { useContext, useEffect, useState } from 'react';
import { FaHome, FaUserPlus, FaSignInAlt, FaUser, FaComments, FaSignOutAlt, FaBars } from 'react-icons/fa';
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

    const handleLogout = () => {
        // Limpiar localStorage y actualizar estado
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('userInfo');
        setIsLoggedIn(false);
        setUserEmail(null);
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const displayedEmail = userEmail || userInfo.email || '';

    const navItems = [
        { name: 'Home', icon: FaHome, path: '/' },
        { name: 'Chat', icon: FaComments, path: '/chat' },
        { name: 'Profile', icon: FaUser, path: '/profile' },
        { name: 'Register', icon: FaUserPlus, path: '/register' },
        {
            name: isLoggedIn ? 'Cerrar Sesión' : 'Login',
            icon: isLoggedIn ? FaSignOutAlt : FaSignInAlt,
            path: isLoggedIn ? '/' : '/login',
            onClick: isLoggedIn ? handleLogout : handleLogin,
        },
    ];

    return (
        <nav className="bg-gradient-to-r from-black to-slate-500 p-4 shadow-lg z-50 relative ">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="flex items-center justify-center flex-grow">
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mr-2">Math-IA</h1>
                    <span className="text-yellow-300 text-sm hidden sm:inline">Asistente Inteligente</span>
                </div>
                
                <ul className="hidden lg:flex space-x-6 items-center">
                    {navItems.map((item, index) => (
                        <li key={index} className="flex-shrink-0 my-2 lg:my-0">
                            <Link
                                to={item.path}
                                className={`flex items-center text-yellow-300 hover:text-white transition-all duration-300 ease-in-out ${
                                    activeItem === item.path ? 'text-white scale-110' : ''
                                }`}
                                onClick={() => {
                                    setActiveItem(item.path);
                                    if (item.onClick) item.onClick();
                                }}
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

                {/* Menú móvil */}
                <div className="lg:hidden ml-4">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-yellow-300 focus:outline-none">
                        <FaBars className="text-2xl" />
                    </button>
                </div>

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
                                            if (item.onClick) item.onClick();
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
