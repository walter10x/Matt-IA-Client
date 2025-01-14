import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { Profile } from './pages/Profile';
import { Footer } from './components/Footer';
import { ChatWindow } from './components/ChatWindow';
import PrivateRoute from './components/PrivateRoute'; // Importar PrivateRoute

const App = () => {
    return (
        <Router>
            <div className="flex flex-col h-screen"> 
                <Navbar />  {/* Siempre visible */}
                <div className="flex-1 overflow-auto"> {/* Permitir que el contenido se muestre */}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/chat" element={<PrivateRoute><ChatWindow /></PrivateRoute>} /> {/* Usar PrivateRoute */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} /> {/* Usar PrivateRoute */}
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
