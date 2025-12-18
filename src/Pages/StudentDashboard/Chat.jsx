import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const Chat = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const withEmail = searchParams.get('with');
  const withName = searchParams.get('name');

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);


  const fetchMessages = async () => {
    if (!withEmail) return;
    try {
      const res = await axiosSecure.get(`/messages?with=${withEmail}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [withEmail]);

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // send a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return; 

    try {
      await axiosSecure.post('/messages', { toEmail: withEmail, message: newMessage.trim() });
      setNewMessage('');
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-base-200 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Chat with {withName}</h2>

      <div className="flex-1 overflow-y-auto mb-4 space-y-2 p-2 bg-white rounded shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`p-2 rounded max-w-xs wrap-break-words ${
              msg.fromEmail === user.email ? 'bg-blue-200 self-end ml-auto' : 'bg-gray-200 self-start mr-auto'
            }`}
          >
            {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="flex gap-2" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="input input-bordered flex-1"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
