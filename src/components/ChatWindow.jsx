import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaPaperPlane, FaUser, FaMicrophone, FaPlus, FaGlobe } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import '../styles/chatwindow.css';

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
    const { threadId } = useParams();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Cargar mensajes iniciales
    const fetchMessages = async () => {
        try {
            if (!threadId) return;

            const response = await fetch(`${process.env.REACT_APP_API_URL}/threads/${threadId}/messages`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            const formattedMessages = data.map(msg => ({
                role: msg.sender,
                content: msg.content,
                id: msg._id
            }));
            setMessages(formattedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [threadId]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const newUserMessage = { role: 'user', content: input.trim(), id: Date.now() };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/ai/ask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    prompt: input.trim(),
                    thread_id: threadId
                })
            });

            if (!response.ok) throw new Error('Error en la respuesta del servidor');

            const { assistant_message } = await response.json();
            const newAssistantMessage = {
                role: 'assistant',
                content: assistant_message.content,
                id: assistant_message._id
            };

            setMessages(prev => [...prev, newAssistantMessage]);
        } catch (error) {
            console.error("Error al procesar la solicitud:", error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Lo siento, ha ocurrido un error. Por favor, intenta de nuevo."
            }]);
        } finally {
            setLoading(false);
            inputRef.current?.focus();
            scrollToBottom();
        }
    };

    useEffect(() => {
        const handleResize = () => {
            window.scrollTo(0, document.body.scrollHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col h-screen bg-black">
            {/* Sugerencias iniciales */}
            <div className="flex space-x-2 p-4 overflow-x-auto">
                <button className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
                    Crea una ilustración
                </button>
                <button className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
                    Hazme una página web
                </button>
            </div>

            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'user' ? (
                            <div className="flex items-end">
                                <div className="max-w-[70%] bg-blue-600 text-white rounded-lg p-3 shadow mr-2">
                                    <p className="text-sm">{msg.content}</p>
                                </div>
                                <FaUser className="text-white mb-6 text-2xl" />
                            </div>
                        ) : (
                            <div className="flex items-end">
                                <FaRobot className="text-yellow-400 mr-2 mb-6 text-2xl" />
                                <div className="max-w-[70%] bg-gray-800 text-white rounded-lg p-3 shadow">
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

            {/* Barra inferior */}
            <div className="p-4 bg-black border-t border-gray-800">
                <form onSubmit={handleSend} className="flex items-center bg-gray-900 rounded-full px-4 py-2">
                    <FaPlus className="text-gray-400 mr-2" />
                    <FaGlobe className="text-gray-400 mr-2" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Mensaje"
                        className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none"
                        autoFocus
                    />
                    <button 
                        type="submit"
                        disabled={loading}
                        className="ml-2 text-blue-400 hover:text-blue-500 transition-colors disabled:opacity-50"
                    >
                        <FaPaperPlane />
                    </button>
                    <FaMicrophone className="text-gray-400 ml-2" />
                </form>
            </div>
        </div>
    );
};
