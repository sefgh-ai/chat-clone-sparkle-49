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
      "group py-6 px-4 transition-all duration-300 animate-fade-in",
      isUser ? "bg-message-user" : "bg-message-ai hover:bg-chat-surface-hover"
    )}>
      <div className="max-w-4xl mx-auto flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className={cn(
            "w-10 h-10 rounded-2xl shadow-soft flex items-center justify-center transition-all duration-300 group-hover:scale-105",
            isUser 
              ? "bg-gradient-hero shadow-glow" 
              : "bg-gradient-card border border-message-border"
          )}>
            {isUser ? (
              <User className="w-5 h-5 text-white" />
            ) : (
              <Bot className="w-5 h-5 text-button-primary" />
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
              <div className="flex items-center gap-2 pt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 text-sidebar-text-muted hover:text-sidebar-text hover:bg-button-secondary rounded-full shadow-soft border border-message-border"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-sidebar-text-muted hover:text-button-primary hover:bg-button-secondary rounded-full shadow-soft border border-message-border"
                >
                  <ThumbsUp className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-sidebar-text-muted hover:text-destructive hover:bg-button-secondary rounded-full shadow-soft border border-message-border"
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