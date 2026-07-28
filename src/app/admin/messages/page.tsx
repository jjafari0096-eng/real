'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, Phone, Clock, Check, X, Send, Trash2, Eye } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  isReplied: boolean;
  replyText?: string;
}

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'replied'>('all');

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('contact_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Sample messages for testing
      const sampleMessages: ContactMessage[] = [
        {
          id: '1',
          name: 'Ali Mohammadi',
          email: 'ali@example.com',
          phone: '+44 7911 123456',
          subject: 'Inquiry about villa prices',
          message: 'Hello, I would like to know the price of the villa in Chelsea and if in-person viewing is possible?',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          isRead: false,
          isReplied: false
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          subject: 'Question about London apartment',
          message: 'Hello, is the Kensington apartment still available for sale? Do you also accept part exchanges?',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          isRead: true,
          isReplied: true,
          replyText: 'Thank you for your message. Yes, the apartment is still available and part exchange is possible. Please contact our office to arrange a viewing.'
        }
      ];
      setMessages(sampleMessages);
      localStorage.setItem('contact_messages', JSON.stringify(sampleMessages));
    }
  }, []);

  // Save messages when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('contact_messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Mark message as read
  const markAsRead = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, isRead: true });
    }
  };

  // Send reply
  const handleSendReply = () => {
    if (!selectedMessage || !replyText.trim()) return;
    
    const updatedMessages = messages.map(m => 
      m.id === selectedMessage.id 
        ? { ...m, isReplied: true, replyText: replyText, isRead: true } 
        : m
    );
    setMessages(updatedMessages);
    setSelectedMessage({ ...selectedMessage, isReplied: true, replyText: replyText, isRead: true });
    setReplyText('');
    setShowReplyForm(false);
  };

  // Delete message
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  // Filter messages
  const filteredMessages = messages.filter(m => {
    if (filter === 'unread') return !m.isRead;
    if (filter === 'replied') return m.isReplied;
    return true;
  });

  // Format date to English locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-serif text-2xl sm:text-3xl text-white">Messages Management</h1>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                  {unreadCount} new messages
                </span>
              )}
            </div>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Manage and respond to user inquiries</p>
          </div>
          <div className="flex items-center gap-3">
            <MessageSquare className="text-blue-600" size={32} />
          </div>
        </motion.div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl shadow-sm p-4 mb-6 flex gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All Messages ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'unread' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('replied')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'replied' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Replied ({messages.filter(m => m.isReplied).length})
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="divide-y">
              {filteredMessages.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Mail className="mx-auto mb-3 opacity-50" size={48} />
                  <p>No messages to display</p>
                </div>
              ) : (
                filteredMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (!message.isRead) markAsRead(message.id);
                    }}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-blue-50 border-r-4 border-blue-600' : 'hover:bg-gray-50'
                    } ${!message.isRead ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {!message.isRead && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                          <h3 className="font-semibold text-white">{message.name}</h3>
                          {message.isReplied && <Check size={14} className="text-green-500" />}
                        </div>
                        <p className="text-sm text-gray-400 truncate">{message.subject}</p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Clock size={12} />
                          {formatDate(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            {selectedMessage ? (
              <div className="h-full flex flex-col">
                {/* Message Header */}
                <div className="p-6 border-b border-gray-700 bg-gray-750">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-2">{selectedMessage.subject}</h2>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Mail size={16} />
                          {selectedMessage.email}
                        </span>
                        {selectedMessage.phone && (
                          <span className="flex items-center gap-1">
                            <Phone size={16} />
                            {selectedMessage.phone}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {formatDate(selectedMessage.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(selectedMessage.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete message"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {!selectedMessage.isRead && (
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">New</span>
                    )}
                    {selectedMessage.isReplied && (
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded flex items-center gap-1">
                        <Check size={12} />
                        Replied
                      </span>
                    )}
                  </div>
                </div>

                {/* Message Body */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="bg-gray-700 rounded-lg p-4 mb-4">
                    <p className="text-gray-100 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>

                  {/* Previous Reply */}
                  {selectedMessage.replyText && (
                    <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                      <p className="text-xs text-green-400 mb-2 font-semibold">Your reply:</p>
                      <p className="text-gray-300">{selectedMessage.replyText}</p>
                    </div>
                  )}
                </div>

                {/* Reply Form */}
                <div className="p-6 border-t border-gray-700">
                  {!selectedMessage.isReplied ? (
                    !showReplyForm ? (
                      <button
                        onClick={() => setShowReplyForm(true)}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
                      >
                        <Send size={20} />
                        Reply to this message
                      </button>
                    ) : (
                      <div className="space-y-4">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write your reply here..."
                          rows={4}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={handleSendReply}
                            disabled={!replyText.trim()}
                            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white py-3 rounded-lg transition-colors"
                          >
                            <Send size={20} />
                            Send Reply
                          </button>
                          <button
                            onClick={() => setShowReplyForm(false)}
                            className="px-6 py-3 border border-gray-600 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-4 text-green-500 flex items-center justify-center gap-2">
                      <Check size={20} />
                      This message has already been replied to
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageSquare className="mx-auto mb-4 opacity-50" size={64} />
                  <p>Please select a message from the list on the left</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Guide for Contact Form */}
        <div className="mt-8 bg-amber-900/30 border border-amber-700/50 rounded-xl p-6">
          <h3 className="font-semibold text-lg text-amber-300 mb-3">📌 Important Note: Automatic Message Saving</h3>
          <p className="text-amber-200">
            All messages sent by users through the contact form on the <strong>Contact</strong> page are automatically saved in this list.
            You can manage all messages, read them, and respond to them directly from this admin panel.
          </p>
        </div>
      </div>
  );
}