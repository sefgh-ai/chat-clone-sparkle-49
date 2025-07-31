import { useState, useRef } from "react";
import { Send, Plus, Paperclip, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  onToggleCanvas?: () => void;
}

export function ChatInput({ onSendMessage, disabled, onToggleCanvas }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Handle file upload logic here
      console.log("Files selected:", files);
    }
  };

  return (
    <div className="border-t border-message-border bg-chat-background p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-end gap-3 bg-chat-surface border border-message-border rounded-2xl p-3">
            {/* Plus button with dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-sidebar-text-muted hover:text-sidebar-text hover:bg-button-secondary"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={handleFileUpload}>
                  Upload files
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Connect drive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tools button with dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-sidebar-text-muted hover:text-sidebar-text hover:bg-button-secondary"
                >
                  <Wrench className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem>
                  Web search
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Deep thinking
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onToggleCanvas}>
                  GitHub search
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Text input */}
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message ChatGPT..."
              disabled={disabled}
              className="flex-1 min-h-[24px] max-h-32 resize-none border-0 bg-transparent text-foreground placeholder-sidebar-text-muted focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              rows={1}
              style={{
                height: "auto",
                minHeight: "24px",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
              }}
            />

            {/* Send button */}
            <Button
              type="submit"
              disabled={!message.trim() || disabled}
              className="h-8 w-8 p-0 bg-button-primary hover:bg-button-primary-hover disabled:bg-muted disabled:opacity-50 rounded-full"
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </div>
        </form>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Disclaimer */}
        <div className="text-xs text-sidebar-text-muted text-center mt-3">
          ChatGPT can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
}