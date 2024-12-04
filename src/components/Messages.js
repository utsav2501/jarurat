import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const MessageComponent = ({ userId, workerId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);

    // Connect to the WebSocket when the component mounts
    useEffect(() => {
        const socketConnection = io(`localhost:8000/api/workers/${workerId}/`);
        setSocket(socketConnection);

        // Listen for incoming messages from the WebSocket
        socketConnection.on('chat_message', (data) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: data.sender, message: data.message },
            ]);
        });

        return () => {
            socketConnection.disconnect();
        };
    }, [workerId]);

    // Send a new message to the WebSocket
    const sendMessage = () => {
        if (newMessage && socket) {
            socket.emit('message', { message: newMessage, sender: userId });
            setNewMessage('');
        }
    };

    return (
        <div>
            <h3>Chat with Worker</h3>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}</strong>: {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default MessageComponent;
