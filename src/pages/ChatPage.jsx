import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ChatWindow } from '../components/ChatWindow';

export const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            {/* Sidebar con toggle para dispositivos móviles */}
            <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out md:w-64`}>
                <Sidebar 
                    onSelectChat={setSelectedChat} 
                    selectedChat={selectedChat}
                    isSidebarOpen={isSidebarOpen}
                />
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
                {/* Toggle button for sidebar on mobile */}
                <button 
                    className="md:hidden bg-indigo-600 text-white p-2 m-2 rounded"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? 'Cerrar Sidebar' : 'Abrir Sidebar'}
                </button>

                <ChatWindow selectedChat={selectedChat} />
            </div>
        </div>
    );
};
