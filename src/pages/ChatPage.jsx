import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { ChatWindow } from '../components/ChatWindow';

export const ChatPage = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <ChatWindow />
        </div>
    );
};
