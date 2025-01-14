import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ChatWindow } from '../components/ChatWindow';

export const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar 
                onSelectChat={setSelectedChat}
                selectedChat={selectedChat}
            />
            <ChatWindow 
                selectedChat={selectedChat}
            />
        </div>
    );
};
