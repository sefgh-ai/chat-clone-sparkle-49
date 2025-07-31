import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CanvasProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Canvas({ isOpen, onClose }: CanvasProps) {
  if (!isOpen) return null;

  return (
    <div className="w-80 bg-chat-surface border-l border-message-border h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-message-border">
        <h3 className="text-foreground font-medium">GitHub Search</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-6 w-6 text-sidebar-text-muted hover:text-sidebar-text"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="text-sidebar-text-muted text-sm">
          GitHub search functionality will be implemented here.
        </div>
      </div>
    </div>
  );
}