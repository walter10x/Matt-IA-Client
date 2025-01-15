import React, { useState, useEffect } from 'react';
import { FaPlus, FaHistory, FaBars } from 'react-icons/fa';

export const Sidebar = ({ onSelectChat, selectedChat }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
    const chats = [
        { id: 1, title: 'Chat 1' },
        { id: 2, title: 'Chat 2' },
        { id: 3, title: 'Chat 3' },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative">
            <div className="fixed top-4 left-4 z-50">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-yellow-300 focus:outline-none">
                    <FaBars className="text-2xl" />
                </button>
            </div>
            <div className={`bg-gradient-to-b from-black to-slate-800 text-white p-4 flex flex-col h-full overflow-y-auto fixed top-16 left-0 w-64 z-40 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'} lg:translate-x-0 lg:block`}>
                <h2 className="text-2xl font-bold mb-6 text-center text-yellow-300">Math-IA Chats</h2>
                
                <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-full mb-6 flex items-center justify-center hover:from-indigo-600 hover:to-violet-600 transition-all duration-300">
                    <FaPlus className="mr-2" />
                    Nuevo Chat
                </button>

                <div className="flex-grow">
                    <h3 className="text-lg font-semibold mb-2 text-yellow-300 flex items-center">
                        <FaHistory className="mr-2" />
                        Historial de Chats
                    </h3>
                    <ul>
                        {chats.map((chat) => (
                            <li 
                                key={chat.id} 
                                className={`py-2 px-3 rounded-md cursor-pointer transition-all duration-200 ${
                                    selectedChat === chat.id 
                                        ? 'bg-indigo-600 text-white' 
                                        : 'hover:bg-gray-700'
                                }`}
                                onClick={() => onSelectChat(chat.id)}
                            >
                                {chat.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
