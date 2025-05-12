import { useState, useEffect, FormEvent, useRef } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, SendHorizonal, Smile, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  _id: string; // From MongoDB or temporary client-side ID
  user: string; // User identifier (e.g., name or ID)
  avatar?: string;
  text: string;
  time: string; // Formatted time string
  isSender: boolean; // Determined client-side based on current user
  aiHint?: string;
  createdAt?: string; // From timestamps (optional, for sorting)
}

const initialMessages: Message[] = [
  { _id: "1", user: "Alice", avatar: "https://picsum.photos/50/50?random=1", text: "Hey Bob, how's it going?", time: "10:00 AM", isSender: false, aiHint: "woman portrait", createdAt: new Date(Date.now() - 5 * 60000).toISOString() },
  { _id: "2", user: "Bob", avatar: "https://picsum.photos/50/50?random=2", text: "Hi Alice! Pretty good, working on the ZenithHub project. You?", time: "10:01 AM", isSender: true, aiHint: "man portrait", createdAt: new Date(Date.now() - 4 * 60000).toISOString() },
  { _id: "3", user: "Alice", avatar: "https://picsum.photos/50/50?random=1", text: "Same here! Just finished the chat UI. What do you think?", time: "10:02 AM", isSender: false, aiHint: "woman portrait", createdAt: new Date(Date.now() - 3 * 60000).toISOString() },
  { _id: "4", user: "Bob", avatar: "https://picsum.photos/50/50?random=2", text: "Looks great! Very sleek.", time: "10:03 AM", isSender: true, aiHint: "man portrait", createdAt: new Date(Date.now() - 2 * 60000).toISOString() },
];

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001"; // Get base URL
const currentUserId = "Bob"; // Placeholder for logged-in user's ID/name

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages); // Start with static
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);


  const scrollToBottom = () => {
    // Use a timeout to allow the DOM to update before scrolling
    setTimeout(() => {
       const viewport = viewportRef.current;
        if (viewport) {
          viewport.scrollTop = viewport.scrollHeight;
        }
    }, 0);
  };

  // Fetch messages function (commented out as backend route doesn't exist)
  const fetchMessages = async () => {
    setIsLoading(true);
    console.log("Fetching messages..."); // Placeholder
    // try {
    //   const response = await axios.get<Message[]>(`${apiUrl}/api/chat/messages`); // Define this API
    //   const fetchedMessages = response.data.map(msg => ({
    //     ...msg,
    //     isSender: msg.user === currentUserId,
    //     time: new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    //   })).sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()); // Sort by creation time
    //   setMessages(fetchedMessages);
    //   scrollToBottom();
    // } catch (error) {
    //   toast({ title: "Error", description: "Could not fetch messages.", variant: "destructive" });
    //   // Fallback to initial messages or empty array?
    //   setMessages(initialMessages); // Keep initial for demo
    // } finally {
       setIsLoading(false);
    // }
  };

  useEffect(() => {
    // fetchMessages(); // Call fetchMessages when component mounts (currently disabled)
    scrollToBottom(); // Scroll on initial load
  }, []);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const optimisticMessage: Message = {
      _id: `temp-${Date.now()}`, // Temporary client-side ID
      user: currentUserId,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender: true,
      avatar: "https://picsum.photos/50/50?random=2", // Current user avatar placeholder
      createdAt: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, optimisticMessage]);
    setNewMessage("");
    scrollToBottom();


    // Send message to backend (commented out)
    // setIsLoading(true);
    // try {
    //   const response = await axios.post<Message>(`${apiUrl}/api/chat/messages`, { text: newMessage, userId: currentUserId });
    //   // Replace optimistic message with the actual one from the backend
    //    setMessages(prev => prev.map(m =>
    //     m._id === optimisticMessage._id
    //       ? { ...response.data, isSender: response.data.user === currentUserId, time: new Date(response.data.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    //       : m
    //   ).sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()));
    //   scrollToBottom();
    // } catch (error) {
    //   toast({ title: "Error", description: "Could not send message.", variant: "destructive" });
    //   // Remove the optimistic message if sending failed
    //   setMessages(prev => prev.filter(m => m._id !== optimisticMessage._id));
    // } finally {
    //    setIsLoading(false);
    // }
  };


  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height,8rem))] max-h-[calc(100vh-var(--header-height,8rem))] border rounded-lg shadow-lg bg-card">
      <header className="p-4 border-b flex items-center justify-between bg-card">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://picsum.photos/50/50?random=5" alt="Chat User" data-ai-hint="person avatar"/>
            <AvatarFallback>CU</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">ZenithHub Support</h2>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <Button onClick={fetchMessages} variant="ghost" size="icon" disabled={isLoading}>
             <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </header>

      <ScrollArea className="flex-1 bg-background" ref={scrollAreaRef} viewportRef={viewportRef}>
        <div className="p-4 space-y-4">
          {isLoading && messages.length === 0 && <p className="text-center text-muted-foreground">Loading messages...</p>}
          {messages.map((msg) => (
            <div key={msg._id} className={`flex items-end gap-2 ${msg.isSender ? "justify-end" : ""}`}>
              {!msg.isSender && (
                <Avatar className="w-8 h-8 self-end">
                  <AvatarImage src={msg.avatar} alt={msg.user} data-ai-hint={msg.aiHint}/>
                  <AvatarFallback>{msg.user.substring(0,1)}</AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-[70%] p-3 rounded-lg shadow-sm ${msg.isSender ? "bg-primary text-primary-foreground rounded-br-none" : "bg-card text-card-foreground rounded-bl-none border"}`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.isSender ? "text-primary-foreground/70 text-right" : "text-muted-foreground"}`}>{msg.time}</p>
              </div>
              {msg.isSender && (
                <Avatar className="w-8 h-8 self-end">
                  <AvatarImage src={msg.avatar} alt={msg.user} data-ai-hint={msg.aiHint}/>
                  <AvatarFallback>{msg.user.substring(0,1)}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
         </div>
      </ScrollArea>

      <footer className="p-4 border-t bg-card">
        <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
          <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-primary">
            <Paperclip className="w-5 h-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Input
            type="text"
            placeholder="Type a message..."
            className="flex-1"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            aria-label="Chat message input"
          />
          <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-primary">
            <Smile className="w-5 h-5" />
             <span className="sr-only">Add emoji</span>
          </Button>
          <Button type="submit" size="icon" disabled={!newMessage.trim() || isLoading} aria-label="Send message">
            <SendHorizonal className="w-5 h-5" />
          </Button>
        </form>
      </footer>
    </div>
  );
}
