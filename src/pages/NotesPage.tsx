import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit3, Trash2, Search, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Assuming useToast is adapted for React

interface Note {
  _id: string;
  title: string;
  content: string;
  date: string; // Or Date object, adjust based on API response
  color?: string;
  createdAt?: string; // from timestamps
}

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001"; // Get base URL

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const { toast } = useToast();

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Note[]>(`${apiUrl}/api/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast({ title: "Error", description: "Could not fetch notes.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Added toast to dependency array if it's expected to change, otherwise disable lint warning

  const handleCreateNote = async (e: FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) {
      toast({ title: "Validation Error", description: "Title and content are required.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post<Note>(`${apiUrl}/api/notes`, {
        title: newNoteTitle,
        content: newNoteContent,
        // color: "bg-yellow-100 dark:bg-yellow-900/30" // Example color
      });
      setNotes([response.data, ...notes]);
      setNewNoteTitle("");
      setNewNoteContent("");
      toast({ title: "Success", description: "Note created successfully." });
    } catch (error) {
      console.error("Error creating note:", error);
      toast({ title: "Error", description: "Could not create note.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setNewNoteTitle(note.title);
    setNewNoteContent(note.content);
  };

  const handleUpdateNote = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingNote || !newNoteTitle.trim() || !newNoteContent.trim()) {
      toast({ title: "Validation Error", description: "Title and content are required.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.put<Note>(`${apiUrl}/api/notes/${editingNote._id}`, {
        title: newNoteTitle,
        content: newNoteContent,
      });
      setNotes(notes.map(n => n._id === editingNote._id ? response.data : n));
      setNewNoteTitle("");
      setNewNoteContent("");
      setEditingNote(null);
      toast({ title: "Success", description: "Note updated successfully." });
    } catch (error) {
      console.error("Error updating note:", error);
      toast({ title: "Error", description: "Could not update note.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };


  const handleDeleteNote = async (noteId: string) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    setIsLoading(true);
    try {
      await axios.delete(`${apiUrl}/api/notes/${noteId}`);
      setNotes(notes.filter((note) => note._id !== noteId));
      toast({ title: "Success", description: "Note deleted successfully." });
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({ title: "Error", description: "Could not delete note.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = editingNote ? handleUpdateNote : handleCreateNote;


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
           <Button onClick={fetchNotes} variant="outline" disabled={isLoading}>
            <RefreshCw className={`mr-2 h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} /> Refresh Notes
          </Button>
        </div>
        <div className="mt-6 relative">
          <Input 
            type="search" 
            placeholder="Search notes..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </header>

      <Card className="mb-8 shadow-md">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-xl">{editingNote ? "Edit Note" : "Create New Note"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              placeholder="Note title" 
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              required 
            />
            <Textarea 
              placeholder="Start writing your note..." 
              rows={4} 
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              required
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            {editingNote && (
              <Button variant="outline" type="button" onClick={() => { setEditingNote(null); setNewNoteTitle(""); setNewNoteContent(""); }}>
                Cancel Edit
              </Button>
            )}
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
              {editingNote ? <Edit3 className="mr-2 h-5 w-5" /> : <PlusCircle className="mr-2 h-5 w-5" />}
              {editingNote ? "Update Note" : "Save Note"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isLoading && notes.length === 0 && <p>Loading notes...</p>}
      {!isLoading && notes.length === 0 && !editingNote && <p>No notes yet. Create one above!</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <Card key={note._id} className={`flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 ${note.color || 'bg-card'}`}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{note.title}</CardTitle>
              <CardDescription className="text-sm">
                {new Date(note.date || note.createdAt || Date.now()).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-foreground/80 whitespace-pre-line">{note.content}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 p-4 pt-0">
              <Button variant="ghost" size="icon" aria-label="Edit note" onClick={() => handleEditNote(note)} disabled={isLoading}>
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" aria-label="Delete note" onClick={() => handleDeleteNote(note._id)} disabled={isLoading}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
