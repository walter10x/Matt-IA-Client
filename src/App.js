import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChatWindow } from './components/ChatWindow';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';

import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { Profile } from './pages/Profile';
import { Footer } from './components/Footer ';

const App = () => {
    return (
        <Router>
            <div className="flex flex-col h-screen"> 
                <Navbar />  {/* Siempre visible */}
                <div className="flex-1 overflow-auto"> {/* Permitir que el contenido se muestre */}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/chat" element={<ChatWindow />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
