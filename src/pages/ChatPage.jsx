import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { ChatWindow } from '../components/ChatWindow';
import { UserContext } from '../context/UserContext';

export const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const { isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            {/* Sidebar */}
          

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
                <ChatWindow selectedChat={selectedChat} />
            </div>
        </div>
    );
};

