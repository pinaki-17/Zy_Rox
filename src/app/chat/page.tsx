
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, SendHorizonal, Smile } from "lucide-react";

const messages = [
  { id: 1, user: "Alice", avatar: "https://picsum.photos/50/50?random=1", text: "Hey Bob, how's it going?", time: "10:00 AM", isSender: false, aiHint: "woman portrait" },
  { id: 2, user: "Bob", avatar: "https://picsum.photos/50/50?random=2", text: "Hi Alice! Pretty good, working on the ZenithHub project. You?", time: "10:01 AM", isSender: true, aiHint: "man portrait" },
  { id: 3, user: "Alice", avatar: "https://picsum.photos/50/50?random=1", text: "Same here! Just finished the chat UI. What do you think?", time: "10:02 AM", isSender: false, aiHint: "woman portrait" },
  { id: 4, user: "Bob", avatar: "https://picsum.photos/50/50?random=2", text: "Looks great! Very sleek.", time: "10:03 AM", isSender: true, aiHint: "man portrait" },
];

export default function ChatPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height,10rem))] max-h-[calc(100vh-var(--header-height,10rem))] border rounded-lg shadow-lg">
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
      </header>

      <ScrollArea className="flex-1 p-4 space-y-4 bg-background">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.isSender ? "justify-end" : ""}`}>
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
        <form className="flex items-center gap-2">
          <Button variant="ghost" size="icon" type="button">
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Input type="text" placeholder="Type a message..." className="flex-1" />
          <Button variant="ghost" size="icon" type="button">
            <Smile className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button type="submit" size="icon">
            <SendHorizonal className="w-5 h-5" />
          </Button>
        </form>
      </footer>
    </div>
  );
}
