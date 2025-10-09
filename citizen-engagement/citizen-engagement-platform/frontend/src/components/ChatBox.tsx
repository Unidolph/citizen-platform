/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../services/api';

const socket = io(import.meta.env.VITE_SOCKET_URL);

const ChatBox: React.FC<{ room: string }> = ({ room }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    socket.emit('join_room', room);

    api.get(`/chat/${room}`).then(res => setMessages(res.data));

    socket.on('receive_message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [room]);

  const sendMessage = () => {
    socket.emit('send_message', { sender: user._id, content: message, room });
    setMessage('');
  };

  return (
    <div className="p-4 border rounded-md">
      <h3 className="font-semibold mb-2">Chat Room: {room}</h3>
      <div className="h-64 overflow-y-scroll mb-3 bg-gray-100 p-2 rounded">
        {messages.map((m, i) => (
          <div key={i} className="mb-1">
            <strong>{m.sender.fullName || 'Anonymous'}:</strong> {m.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <label htmlFor="message">write message</label>
        <input
          id='message'
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  );
};
export default ChatBox;