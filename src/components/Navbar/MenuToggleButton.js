import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';

export const MenuToggleButton = ({ setIsMenuOpen, isMenuOpen }) => {
    return (
        <div className="lg:hidden ml-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="absolute -right-1 top-4 bg-slate-600 text-white p-1.5 rounded-full hover:bg-slate-700">
                <FaChevronLeft className="text-xl" />
            </button>
        </div>
    );
};
