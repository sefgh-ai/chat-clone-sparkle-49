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
        "h-screen bg-sidebar-background border-r border-message-border flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Top Header with Logo and Hamburger */}
      <div className="p-3 border-b border-message-border">
        <div className="flex items-center justify-between mb-3">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-primary rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">C</span>
              </div>
              <span className="text-sidebar-text font-medium">ChatGPT</span>
            </div>
          )}
          {isCollapsed && (
            <div className="flex flex-col items-center space-y-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="text-sidebar-text hover:bg-sidebar-surface-hover h-6 w-6"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div className="w-6 h-6 bg-gradient-primary rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">C</span>
              </div>
            </div>
          )}
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="text-sidebar-text hover:bg-sidebar-surface-hover h-6 w-6"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Button className={cn(
          "bg-button-secondary hover:bg-button-secondary-hover text-sidebar-text border border-message-border rounded-lg",
          isCollapsed ? "w-10 h-10 p-0" : "w-full"
        )}>
          <Plus className="w-4 h-4" />
          {!isCollapsed && <span className="ml-2">New chat</span>}
        </Button>
      </div>

      {/* Chat History */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-2">
            <div className="text-xs font-medium text-sidebar-text-muted mb-2 px-2">
              Recent
            </div>
            
            {sampleChats.map((chat) => (
              <div
                key={chat.id}
                className={cn(
                  "group flex items-center cursor-pointer transition-colors mb-1 rounded-lg justify-between p-2",
                  selectedChat === chat.id 
                    ? "bg-sidebar-surface-hover" 
                    : "hover:bg-sidebar-surface"
                )}
                onClick={() => setSelectedChat(chat.id)}
                onMouseEnter={() => setHoveredChat(chat.id)}
                onMouseLeave={() => setHoveredChat(null)}
              >
                <div className="flex items-center flex-1 min-w-0">
                  <MessageSquare className="w-4 h-4 text-sidebar-text-muted mr-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-sidebar-text truncate">
                      {chat.title}
                    </div>
                    <div className="text-xs text-sidebar-text-muted">
                      {chat.timestamp}
                    </div>
                  </div>
                </div>
                
                {hoveredChat === chat.id && (
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-sidebar-text-muted hover:text-sidebar-text hover:bg-sidebar-surface-hover"
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-sidebar-text-muted hover:text-sidebar-text hover:bg-sidebar-surface-hover"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Section */}
      <div className="p-3 border-t border-message-border">
        <div className={cn(
          "flex items-center p-2 rounded-lg hover:bg-sidebar-surface cursor-pointer",
          isCollapsed ? "justify-center" : "space-x-3"
        )}>
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm text-sidebar-text font-medium">User</div>
              <div className="text-xs text-sidebar-text-muted">Free plan</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}