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
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserEmail(token);
        }
    }, []);

    const fetchUserEmail = async (token) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserEmail(data.user.email);
                setIsLoggedIn(true);
            } else {
                console.error('Error al obtener el email del usuario:', await response.text());
                setIsLoggedIn(false);
                setUserEmail(null);
            }
        } catch (error) {
            console.error('Error de red al obtener el email:', error);
            setIsLoggedIn(false);
            setUserEmail(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserEmail(null);
        setActiveItem('/');
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login');
    };

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
        <nav className="bg-gradient-to-r from-black to-slate-500 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mr-2">Math-IA</h1>
                    <span className="text-yellow-300 text-sm">Asistente Inteligente</span>
                </div>
                <div className="lg:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-yellow-300 focus:outline-none">
                        <FaBars className="text-2xl" />
                    </button>
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
                                <item.icon
                                    className={`text-lg mr-1 ${
                                        activeItem === item.path ? 'animate-bounce' : ''
                                    }`}
                                />
                                <span className="text-sm">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                    {isLoggedIn && userEmail && (
                        <li className="text-yellow-300 text-sm flex-shrink-0 my-2 lg:my-0">
                            {userEmail}
                        </li>
                    )}
                </ul>
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
                                        <item.icon
                                            className={`text-lg mr-1 ${
                                                activeItem === item.path ? 'animate-bounce' : ''
                                            }`}
                                        />
                                        <span className="text-sm">{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                            {isLoggedIn && userEmail && (
                                <li className="text-yellow-300 text-sm flex-shrink-0">
                                    {userEmail}
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};
