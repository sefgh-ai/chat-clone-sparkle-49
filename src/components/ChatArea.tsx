import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { Canvas } from "@/components/Canvas";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
}

// Start with empty messages for a clean landing experience
const sampleMessages: Message[] = [];

interface ChatAreaProps {
  isCollapsed: boolean;
  canvasOpen: boolean;
  onToggleCanvas: () => void;
}

export function ChatArea({ isCollapsed, canvasOpen, onToggleCanvas }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your message! I'm here to help with any questions you have about programming, technology, or general topics. How can I assist you today?",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex-1 flex h-full">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col bg-chat-background">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center px-4">
              <div className="text-center max-w-2xl animate-fade-in">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-hero rounded-3xl shadow-glow flex items-center justify-center mx-auto animate-float">
                    <span className="text-white text-3xl font-bold">✨</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-glow rounded-3xl opacity-60 animate-glow-pulse"></div>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
                  How can I help you today?
                </h1>
                <p className="text-sidebar-text-muted text-lg mb-8">
                  Start a conversation and I'll do my best to help with anything you need.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="p-4 rounded-2xl bg-gradient-card shadow-soft border border-message-border hover:shadow-card transition-all duration-300 cursor-pointer group">
                    <div className="text-sm text-sidebar-text group-hover:text-foreground transition-colors">
                      💡 Creative writing and brainstorming
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-card shadow-soft border border-message-border hover:shadow-card transition-all duration-300 cursor-pointer group">
                    <div className="text-sm text-sidebar-text group-hover:text-foreground transition-colors">
                      🔧 Code help and debugging
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-card shadow-soft border border-message-border hover:shadow-card transition-all duration-300 cursor-pointer group">
                    <div className="text-sm text-sidebar-text group-hover:text-foreground transition-colors">
                      📚 Learning and explanations
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-card shadow-soft border border-message-border hover:shadow-card transition-all duration-300 cursor-pointer group">
                    <div className="text-sm text-sidebar-text group-hover:text-foreground transition-colors">
                      🎯 Problem solving
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isTyping && (
                <div className="py-6 px-4 bg-message-ai animate-slide-up">
                  <div className="max-w-4xl mx-auto flex gap-4">
                    <div className="w-8 h-8 rounded-2xl bg-gradient-card shadow-soft border border-message-border flex items-center justify-center">
                      <div className="w-2 h-2 bg-button-primary rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-button-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-button-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-button-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isTyping} 
          onToggleCanvas={onToggleCanvas}
        />
      </div>

      {/* Canvas sidebar */}
      <Canvas isOpen={canvasOpen} onClose={onToggleCanvas} />
    </div>
  );
}