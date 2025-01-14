import { useState, useEffect } from 'react';
import { FaHome, FaUserPlus, FaSignInAlt, FaUser, FaComments, FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(location.pathname);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            // Aquí puedes hacer una llamada al backend para obtener el email si es necesario
            setUserEmail("user@example.com"); // Esto es solo un ejemplo, reemplázalo con tu lógica para obtener el email.
        } else {
            setIsLoggedIn(false);
            setUserEmail(null);
        }
    }, []); // Solo se ejecuta cuando el componente se monta

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token al cerrar sesión
        setIsLoggedIn(false); // Cambiar el estado de autenticación
        setUserEmail(null); // Limpiar el email
        setActiveItem('/'); // Cambiar la ruta activa
        navigate('/'); // Redirigir a la página principal
    };

    const handleLogin = () => {
        navigate('/login'); // Redirigir al login
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
                    <h1 className="text-3xl font-bold text-white mr-2">Math-IA</h1>
                    <span className="text-yellow-300 text-sm">Asistente Inteligente</span>
                </div>
                <ul className="flex space-x-6 items-center">
                    {navItems.map((item, index) => (
                        <li key={index}>
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
                                    className={`text-xl mr-1 ${
                                        activeItem === item.path ? 'animate-bounce' : ''
                                    }`}
                                />
                                <span className="text-sm">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                    {isLoggedIn && userEmail && (
                        <li className="text-yellow-300 text-sm">
                            {userEmail}
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};
