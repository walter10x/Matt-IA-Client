import React, { useContext, useEffect, useState } from 'react';
import { FaUserPlus, FaBars, FaUser, FaChevronLeft, FaBrain } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import {DesktopMenu} from './DesktopMenu';
import {MobileMenu} from './MobileMenu';
import {MenuToggleButton} from './MenuToggleButton';

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

    return (
        <nav className="bg-gradient-to-r from-black to-slate-500 p-4 shadow-lg z-50 fixed top-0 w-full">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center justify-center flex-grow">
            {/* <h1 className="text-2xl lg:text-3xl font-bold text-white mr-2">Math-IA</h1> */}
            <FaBrain className="text-white text-2xl lg:text-3xl ml-2" />
            <span className="text-yellow-300 text-sm hidden sm:inline ml-4">Asistente Inteligente</span>
          </div>
        

                {/* Menú de escritorio */}
                <DesktopMenu
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    isLoggedIn={isLoggedIn}
                    userEmail={userEmail}
                />
                
                {/* Menú móvil */}
                <MobileMenu
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    isLoggedIn={isLoggedIn}
                    userEmail={userEmail}
                />

                {/* Botón de toggle para menú móvil */}
                <MenuToggleButton
                    setIsMenuOpen={setIsMenuOpen}
                    isMenuOpen={isMenuOpen}
                />
            </div>
        </nav>
    );
};
