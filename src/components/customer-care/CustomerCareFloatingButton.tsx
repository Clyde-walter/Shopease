
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useChat } from '@/contexts/ChatContext';

interface CustomerCareFloatingButtonProps {
  onClick: () => void;
}

export function CustomerCareFloatingButton({ onClick }: CustomerCareFloatingButtonProps) {
  const { unreadCount } = useChat();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <Button
          onClick={onClick}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 group"
          size="icon"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </Button>
        
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[20px] h-5 flex items-center justify-center text-xs">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-16 right-0 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Customer Care - We're here to help!
        {unreadCount > 0 && <span className="ml-2 text-red-300">({unreadCount} new)</span>}
      </div>
    </div>
  );
}
