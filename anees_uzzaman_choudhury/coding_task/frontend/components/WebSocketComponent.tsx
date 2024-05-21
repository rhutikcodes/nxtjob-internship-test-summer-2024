"use client";
import React, { useState, useEffect, useRef } from 'react';


interface Message {
    from?: string;
    content: string;
}

interface WebSocketComponentProps {
    userId: string; // 
}

const WebSocketComponent = () => {
    const [messages, setMessages] = useState<Message[]>([]); // Use Message interface for message state
    const [recipientId, setRecipientId] = useState<string>(''); // Recipient ID as a string
    const [message, setMessage] = useState<string>(''); // Current message as a string
    const websocketRef = useRef<WebSocket | null>(null); // Ref for WebSocket

    const userId = localStorage.getItem('userID') || "default"; // Get the user ID from localStorage

    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:8787/ws');
        websocketRef.current = websocket;

        websocket.onopen = () => {
            // Register this connection with the server on open
            const registerMessage = JSON.stringify({
                type: 'register',
                userId: userId
            });
            websocket.send(registerMessage);
        };

        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, data]);
        };

        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        websocket.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            websocket.close();
        };
    }, [userId]);

    const sendMessage = () => {
        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
            const messageData = JSON.stringify({
                type: 'send',
                recipientId,
                userId,
                content: message
            });
            websocketRef.current.send(messageData);
        }
    };

    return (
        <div>
            <h2>Messages</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg.from ? `${msg.from}: ${msg.content}` : msg.content}</li>
                ))}
            </ul>
            <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Write a message"
            />
            <button onClick={sendMessage}>Send Message</button>
            <input
                value={recipientId}
                onChange={e => setRecipientId(e.target.value)}
                placeholder="Recipient ID"
            />
        </div>
    );
}

export default WebSocketComponent;



