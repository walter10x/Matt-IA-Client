import React from 'react';
import { Link } from 'react-router-dom';

export const NavbarItem = ({ item, activeItem, setActiveItem, setIsMenuOpen }) => {
    return (
        <li className="flex-shrink-0 my-2 lg:my-0">
            <Link
                to={item.path}
                className={`flex items-center text-white hover:text-black transition-all duration-300 ease-in-out ${
                    activeItem === item.path ? 'text-white scale-110' : ''
                }`}
                onClick={() => {
                    setActiveItem(item.path);
                    if (setIsMenuOpen) setIsMenuOpen(false);
                }}
            >
                <item.icon className={`text-lg mr-1 ${activeItem === item.path ? 'animate-bounce' : ''}`} />
                <span className="text-sm">{item.name}</span>
            </Link>
        </li>
    );
};

