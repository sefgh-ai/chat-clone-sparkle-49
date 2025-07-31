import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CanvasProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Canvas({ isOpen, onClose }: CanvasProps) {
  if (!isOpen) return null;

  return (
    <div className="w-80 bg-gradient-to-b from-sidebar-background to-chat-background border-l border-message-border/50 h-full flex flex-col shadow-card animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-message-border/50">
        <h3 className="text-foreground font-semibold text-lg">GitHub Search</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-sidebar-text-muted hover:text-sidebar-text rounded-xl transition-all duration-300 hover:scale-110"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-message-border/30">
          <div className="text-sidebar-text-muted text-sm text-center">
            🔍 GitHub search functionality will be implemented here.
          </div>
        </div>
      </div>
    </div>
  );
}