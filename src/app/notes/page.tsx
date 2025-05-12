
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit3, Trash2, Search } from "lucide-react";

const sampleNotes = [
  { id: 1, title: "Meeting Recap - Project Phoenix", date: "2023-10-25", content: "Discussed Q4 goals and new feature roadmap. Key takeaways included...", color: "bg-yellow-100 dark:bg-yellow-900/30" },
  { id: 2, title: "Ideas for Blog Post", date: "2023-10-24", content: "Brainstorming topics: AI in everyday life, Future of remote work, Sustainable tech...", color: "bg-blue-100 dark:bg-blue-900/30" },
  { id: 3, title: "Grocery List", date: "2023-10-26", content: "Milk, Eggs, Bread, Coffee, Apples, Chicken breast", color: "bg-green-100 dark:bg-green-900/30" },
];

export default function NotesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">My Notes</h1>
            <p className="mt-2 text-md text-muted-foreground">
              Capture your thoughts, ideas, and reminders.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="mr-2 h-5 w-5" /> Create New Note
          </Button>
        </div>
        <div className="mt-6 relative">
          <Input type="search" placeholder="Search notes..." className="pl-10" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </header>

      {/* Form for new note (simplified) */}
      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">New Note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Note title" />
          <Textarea placeholder="Start writing your note..." rows={4} />
        </CardContent>
        <CardFooter>
          <Button className="ml-auto bg-primary hover:bg-primary/90 text-primary-foreground">Save Note</Button>
        </CardFooter>
      </Card>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleNotes.map((note) => (
          <Card key={note.id} className={`flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 ${note.color}`}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{note.title}</CardTitle>
              <CardDescription className="text-sm">{note.date}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-foreground/80 whitespace-pre-line">{note.content}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 p-4 pt-0">
              <Button variant="ghost" size="icon" aria-label="Edit note">
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" aria-label="Delete note">
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
