import { useState } from "react";
import { Plus, MessageSquare, Edit3, Trash2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface ChatItem {
  id: string;
  title: string;
  timestamp: string;
}

const sampleChats: ChatItem[] = [
  { id: "1", title: "React Component Design", timestamp: "2 hours ago" },
  { id: "2", title: "TypeScript Best Practices", timestamp: "Yesterday" },
  { id: "3", title: "API Integration Help", timestamp: "3 days ago" },
  { id: "4", title: "CSS Grid Layout", timestamp: "1 week ago" },
  { id: "5", title: "Database Schema Design", timestamp: "2 weeks ago" },
];

export function ChatSidebar({ isCollapsed, onToggle }: ChatSidebarProps) {
  const [selectedChat, setSelectedChat] = useState<string>("1");
  const [hoveredChat, setHoveredChat] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "h-screen bg-gradient-to-b from-sidebar-background to-chat-background border-r border-message-border flex flex-col transition-all duration-500",
        isCollapsed ? "w-16" : "w-72"
      )}
    >
      {/* Top Header with Logo and Hamburger */}
      <div className="p-4 border-b border-message-border/50">
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-hero rounded-2xl shadow-glow flex items-center justify-center animate-glow-pulse">
                <span className="text-white text-sm font-bold">✨</span>
              </div>
              <span className="text-sidebar-text font-semibold text-lg">ChatGPT</span>
            </div>
          )}
          {isCollapsed && (
            <div className="flex flex-col items-center space-y-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="text-sidebar-text hover:bg-sidebar-surface-hover h-8 w-8 rounded-xl transition-all duration-300 hover:scale-110"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 bg-gradient-hero rounded-2xl shadow-glow flex items-center justify-center animate-glow-pulse">
                <span className="text-white text-sm font-bold">✨</span>
              </div>
            </div>
          )}
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="text-sidebar-text hover:bg-sidebar-surface-hover h-8 w-8 rounded-xl transition-all duration-300 hover:scale-110"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <Button className={cn(
          "bg-gradient-card hover:bg-button-secondary-hover text-sidebar-text border border-message-border/50 shadow-soft transition-all duration-300 hover:shadow-card hover:scale-[1.02]",
          isCollapsed ? "w-12 h-12 p-0 rounded-2xl" : "w-full rounded-2xl py-3"
        )}>
          <Plus className="w-5 h-5" />
          {!isCollapsed && <span className="ml-3 font-medium">New chat</span>}
        </Button>
      </div>

      {/* Chat History */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto py-3">
          <div className="px-3">
            <div className="text-xs font-semibold text-sidebar-text-muted mb-4 px-3 uppercase tracking-wider">
              Recent Chats
            </div>
            
            {sampleChats.map((chat, index) => (
              <div
                key={chat.id}
                className={cn(
                  "group flex items-center cursor-pointer transition-all duration-300 mb-2 rounded-2xl justify-between p-3 animate-fade-in",
                  selectedChat === chat.id 
                    ? "bg-gradient-card shadow-soft border border-message-border/30" 
                    : "hover:bg-sidebar-surface-hover hover:shadow-soft"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedChat(chat.id)}
                onMouseEnter={() => setHoveredChat(chat.id)}
                onMouseLeave={() => setHoveredChat(null)}
              >
                <div className="flex items-center flex-1 min-w-0">
                  <MessageSquare className="w-5 h-5 text-button-primary mr-3 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-sidebar-text truncate font-medium">
                      {chat.title}
                    </div>
                    <div className="text-xs text-sidebar-text-muted mt-1">
                      {chat.timestamp}
                    </div>
                  </div>
                </div>
                
                {hoveredChat === chat.id && (
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-sidebar-text-muted hover:text-button-primary hover:bg-sidebar-surface-hover rounded-xl transition-all duration-300 hover:scale-110"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-sidebar-text-muted hover:text-destructive hover:bg-sidebar-surface-hover rounded-xl transition-all duration-300 hover:scale-110"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Section */}
      <div className="p-4 border-t border-message-border/50">
        <div className={cn(
          "flex items-center p-3 rounded-2xl hover:bg-sidebar-surface-hover cursor-pointer transition-all duration-300 hover:shadow-soft hover:scale-[1.02]",
          isCollapsed ? "justify-center" : "space-x-4"
        )}>
          <div className="w-10 h-10 bg-gradient-hero rounded-2xl shadow-glow flex items-center justify-center">
            <span className="text-white text-lg font-bold">U</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm text-sidebar-text font-semibold">User</div>
              <div className="text-xs text-sidebar-text-muted mt-1">Free plan • Upgrade</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}