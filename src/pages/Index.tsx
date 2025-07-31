import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatArea } from "@/components/ChatArea";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [canvasOpen, setCanvasOpen] = useState(false);

  return (
    <div className="h-screen bg-background text-foreground flex overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      {/* Main Chat Area */}
      <ChatArea 
        isCollapsed={sidebarCollapsed} 
        canvasOpen={canvasOpen}
        onToggleCanvas={() => setCanvasOpen(!canvasOpen)}
      />
      
      {/* Mobile overlay */}
      {!sidebarCollapsed && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  );
};

export default Index;
