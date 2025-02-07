import React from 'react';
import { Link } from 'react-router-dom';
import {NavbarItem} from './NavbarItem';
import { FaUserPlus, FaBars, FaUser, FaChevronLeft } from 'react-icons/fa';

export const MobileMenu = ({ isMenuOpen, setIsMenuOpen, activeItem, setActiveItem, isLoggedIn, userEmail }) => {
    const navItems = [
        { name: 'Register', icon: FaUser, path: '/register' },
    ];

    return isMenuOpen ? (
        <div className="absolute top-16 right-0 bg-gradient-to-r from-black to-slate-500 p-4 shadow-lg rounded-lg lg:hidden">
            <ul className="space-y-4">
                {navItems.map((item, index) => (
                    <NavbarItem
                        key={index}
                        item={item}
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                ))}
                {isLoggedIn && userEmail && (
                    <li className="text-yellow-300 text-sm flex-shrink-0">
                        {userEmail}
                    </li>
                )}
            </ul>
        </div>
    ) : null;
};


