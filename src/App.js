import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { Profile } from './pages/Profile';
import { Footer } from './components/Footer';
import { ChatPage } from './pages/ChatPage';
import PrivateRoute from './components/PrivateRoute';
import GoogleAuthCallback from './components/GoogleAuthCallback';

const App = () => {
    return (
        <Router>
            <div className="flex flex-col h-screen"> 
                <Navbar />
                <div className="flex-1 overflow-auto">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login/google/callback" element={<GoogleAuthCallback />} />
                        <Route path="/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
