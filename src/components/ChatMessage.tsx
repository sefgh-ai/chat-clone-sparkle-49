import { Bot, User, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    sender: "user" | "ai";
    timestamp: string;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user";
  
  return (
    <div className={cn(
      "group py-6 px-4 transition-colors",
      isUser ? "bg-message-user" : "bg-message-ai hover:bg-chat-surface"
    )}>
      <div className="max-w-4xl mx-auto flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            isUser 
              ? "bg-gradient-primary" 
              : "bg-button-secondary border border-message-border"
          )}>
            {isUser ? (
              <User className="w-4 h-4 text-white" />
            ) : (
              <Bot className="w-4 h-4 text-sidebar-text" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="space-y-2">
            <div className="text-foreground leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>
            
            {/* Action buttons for AI messages */}
            {!isUser && (
              <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-sidebar-text-muted hover:text-sidebar-text hover:bg-button-secondary"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-sidebar-text-muted hover:text-sidebar-text hover:bg-button-secondary"
                >
                  <ThumbsUp className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-sidebar-text-muted hover:text-sidebar-text hover:bg-button-secondary"
                >
                  <ThumbsDown className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}