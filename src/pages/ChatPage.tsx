import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, SendHorizonal, Smile } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  _id: string; // From MongoDB
  id?: number; // Original static ID, can be removed
  user: string;
  avatar?: string;
  text: string;
  time: string; // Should be Date from backend, formatted client-side
  isSender: boolean; // This needs to be determined based on current logged-in user vs message sender
  aiHint?: string;
  createdAt?: string; // from timestamps
}

const initialMessages = [
  { id: 1, user: "Alice", avatar: "https://picsum.photos/50/50?random=1", text: "Hey Bob, how's it going?", time: "10:00 AM", isSender: false, aiHint: "woman portrait" },
  { id: 2, user: "Bob", avatar: "https://picsum.photos/50/50?random=2", text: "Hi Alice! Pretty good, working on the ZenithHub project. You?", time: "10:01 AM", isSender: true, aiHint: "man portrait" },
  { id: 3, user: "Alice", avatar: "https://picsum.photos/50/50?random=1", text: "Same here! Just finished the chat UI. What do you think?", time: "10:02 AM", isSender: false, aiHint: "woman portrait" },
  { id: 4, user: "Bob", avatar: "https://picsum.photos/50/50?random=2", text: "Looks great! Very sleek.", time: "10:03 AM", isSender: true, aiHint: "man portrait" },
];

// Assume a current user for determining `isSender`. This would come from auth context.
const currentUserId = "Bob"; // Placeholder for logged-in user's ID/name

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages.map(m => ({...m, _id: String(m.id)}))); // Start with static, then fetch
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // TODO: Fetch messages from backend
  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await axios.get<Message[]>("/api/chat/messages"); // Define this API
  //       setMessages(response.data.map(msg => ({ ...msg, isSender: msg.user === currentUserId })));
  //     } catch (error) {
  //       toast({ title: "Error", description: "Could not fetch messages.", variant: "destructive" });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchMessages();
  // }, [toast]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const optimisticMessage: Message = {
      _id: Date.now().toString(), // Temporary ID
      user: currentUserId, 
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender: true,
      avatar: "https://picsum.photos/50/50?random=2" // Current user avatar
    };
    setMessages(prev => [...prev, optimisticMessage]);
    setNewMessage("");

    // TODO: Send message to backend
    // try {
    //   const response = await axios.post<Message>("/api/chat/messages", { text: newMessage, userId: currentUserId });
    //   setMessages(prev => prev.map(m => m._id === optimisticMessage._id ? {...response.data, isSender: response.data.user === currentUserId} : m)); // Replace optimistic with real
    // } catch (error) {
    //   toast({ title: "Error", description: "Could not send message.", variant: "destructive" });
    //   setMessages(prev => prev.filter(m => m._id !== optimisticMessage._id)); // Revert optimistic update
    // }
  };


  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height,8rem))] max-h-[calc(100vh-var(--header-height,8rem))] border rounded-lg shadow-lg">
      <header className="p-4 border-b flex items-center justify-between bg-card">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://picsum.photos/50/50?random=5" alt="Chat User" data-ai-hint="person avatar"/>
            <AvatarFallback>CU</AvatarFallback>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">ZenithHub Support</h2>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 p-4 space-y-4 bg-background">
        {isLoading && messages.length === 0 && <p>Loading messages...</p>}
        {messages.map((msg) => (
          <div key={msg._id} className={`flex items-end gap-2 ${msg.isSender ? "justify-end" : ""}`}>
            {!msg.isSender && (
              <Avatar className="w-8 h-8">
                <AvatarImage src={msg.avatar} alt={msg.user} data-ai-hint={msg.aiHint}/>
                <AvatarFallback>{msg.user.substring(0,1)}</AvatarFallback>
              </Avatar>
            )}
            <div className={`max-w-[70%] p-3 rounded-lg shadow ${msg.isSender ? "bg-primary text-primary-foreground rounded-br-none" : "bg-card text-card-foreground rounded-bl-none"}`}>
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.isSender ? "text-primary-foreground/70 text-right" : "text-muted-foreground"}`}>{msg.time}</p>
            </div>
             {msg.isSender && (
              <Avatar className="w-8 h-8">
                <AvatarImage src={msg.avatar} alt={msg.user} data-ai-hint={msg.aiHint}/>
                <AvatarFallback>{msg.user.substring(0,1)}</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </ScrollArea>

      <footer className="p-4 border-t bg-card">
        <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
          <Button variant="ghost" size="icon" type="button">
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button variant="ghost" size="icon" type="button">
            <Smile className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <SendHorizonal className="w-5 h-5" />
          </Button>
        </form>
      </footer>
    </div>
  );
}
