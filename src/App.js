import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChatWindow } from './components/ChatWindow';
import { Navbar } from './components/Navbar';

import { RegisterPage } from './pages/RegisterPage';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Footer } from './components/Footer ';

const App = () => {
    return (
        <Router>
            <div className="flex flex-col h-screen"> 
                <Navbar />  {/* Siempre visible */}
                <div className="flex-1 overflow-auto"> {/* Permitir que el contenido se muestre */}
                    <Routes>
                        <Route path="/" element={<ChatWindow />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
