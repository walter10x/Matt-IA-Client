import { useState } from 'react';
import { FaHome, FaUserPlus, FaSignInAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [activeItem, setActiveItem] = useState(null);

    const navItems = [
        { name: 'Home', icon: FaHome, path: '/' },
        { name: 'Register', icon: FaUserPlus, path: '/register' },
        { name: 'Login', icon: FaSignInAlt, path: '/login' },
        { name: 'Profile', icon: FaUser, path: '/profile' },
    ];

    return (
        <nav className="bg-gradient-to-r from-black to-slate-500 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className="text-3xl font-bold text-white mr-2">Math-IA</h1>
                    <span className="text-yellow-300 text-sm">Asistente Inteligente</span>
                </div>
                <ul className="flex space-x-6">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.path}
                                className={`flex items-center text-yellow-300  hover:text-white transition-all duration-300 ease-in-out ${
                                    activeItem === index ? 'text-white scale-110' : ''
                                }`}
                                onClick={() => setActiveItem(index)}
                            >
                                <item.icon className={`text-xl mr-1 ${
                                    activeItem === index ? 'animate-bounce' : ''
                                }`} />
                                <span className="text-sm">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};