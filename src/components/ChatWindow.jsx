import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaPaperPlane, FaUser } from 'react-icons/fa';

const LoadingIndicator = () => (
    <div className="flex items-center justify-center h-8">
        <div className="bg-gray-700 p-2 rounded-lg flex space-x-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
    </div>
);

export const ChatWindow = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input.trim() };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/ask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: input.trim() }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const assistantMessage = { role: 'assistant', content: data.response };

            setMessages(prevMessages => [...prevMessages, assistantMessage]);
        } catch (error) {
            console.error("Error al procesar la solicitud:", error);
            setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: "Lo siento, ha ocurrido un error. Por favor, intenta de nuevo." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-800 to-gray-900 text-white p-4 flex items-center">
                <FaRobot className="mr-2 text-yellow-400 text-2xl" />
                <span className="font-bold">Chat con MattIA</span>
            </div>
            <div className="flex flex-col h-[70vh]">
                <div className="flex-1 overflow-auto p-4 bg-gradient-to-r from-black to-slate-600">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                            {msg.role === 'user' ? (
                                <div className="flex items-end">
                                    <div className="max-w-[70%] bg-gradient-to-r from-black to-slate-600 text-white rounded-lg p-3 shadow mr-2">
                                        <p className="text-sm">{msg.content}</p>
                                    </div>
                                    <FaUser className="text-white mb-6 text-2xl" />
                                </div>
                            ) : (
                                <div className="flex items-end">
                                    <FaRobot className="text-yellow-400 mr-2 mb-6 text-2xl" />
                                    <div className="max-w-[70%] bg-gradient-to-r from-black to-slate-600 text-white rounded-lg p-3 shadow">
                                        <p className="text-sm">{msg.content}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start mb-4">
                            <FaRobot className="text-yellow-400 mr-2 mb-2" />
                            <div className="bg-gray-700 rounded-lg p-3 shadow">
                                <LoadingIndicator />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="bg-gradient-to-r from-indigo-800 to-gray-900 p-4 border-t border-gray-700">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSend();
                                }
                            }}
                            className="flex-grow bg-white-800 text-black border border-gray-700 rounded-lg p-2 h-12 focus:outline-none focus:ring-2 focus:ring-white mr-2"
                            placeholder="Escribe un mensaje..."
                        />
                        <button 
                            onClick={handleSend} 
                            className="bg-gradient-to-r from-black to-slate-600 text-white rounded-lg px-6 h-12 hover:bg-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-white flex items-center justify-center ml-2"
                        >
                            <FaPaperPlane className="mr-2" />
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};