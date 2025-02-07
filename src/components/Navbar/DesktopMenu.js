import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarItem } from './NavbarItem';
import { FaUserPlus, FaBars, FaUser, FaChevronLeft } from 'react-icons/fa';

export const DesktopMenu = ({ activeItem, setActiveItem, isLoggedIn, userEmail }) => {
    const navItems = [
        { name: 'Register', icon: FaUser, path: '/register' },
    ];

    return (
        <ul className="hidden lg:flex space-x-6 items-center">
            {navItems.map((item, index) => (
                <NavbarItem
                    key={index}
                    item={item}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />
            ))}
            {isLoggedIn && userEmail && (
                <li className="text-yellow-300 text-sm flex-shrink-0 my-2 lg:my-0">
                    {userEmail}
                </li>
            )}
        </ul>
    );
};


