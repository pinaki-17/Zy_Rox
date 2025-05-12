import { useState, useEffect } from "react";
import axios from "axios";
import { TaskCard } from "@/components/specific/task-card"; // Make sure TaskCard is adapted
import { Music, BedDouble, Zap, PlusCircle, GlassWater, StretchHorizontal, Brain, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
  // iconName?: string; // To dynamically select Lucide icons or SVGs
}

const initialWellnessTasks = [
  { id: "music", title: "Listen to Calming Music", icon: <Music className="w-6 h-6"/>, completed: false },
  { id: "rest", title: "Take a 15-Minute Rest", icon: <BedDouble className="w-6 h-6"/>, completed: false },
  { id: "exercise", title: "Do Some Light Exercise", icon: <Zap className="w-6 h-6"/>, completed: false },
  { id: "hydrate", title: "Drink a Glass of Water", icon: <GlassWater className="w-6 h-6"/>, completed: false },
  { id: "stretch", title: "Stretch for 5 Minutes", icon: <StretchHorizontal className="w-6 h-6"/>, completed: false },
  { id: "mindful", title: "Practice Mindful Breathing", icon: <Brain className="w-6 h-6"/>, completed: false }
];

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001"; // Get base URL

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Task[]>(`${apiUrl}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast({ title: "Error", description: "Could not fetch tasks.", variant: "destructive" });
      // Fallback or clear tasks on error? Decide based on desired UX
      // setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = (task: Task | null = null) => {
    setEditingTask(task);
    setNewTaskTitle(task ? task.title : "");
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTaskTitle("");
    setEditingTask(null);
  }

  const handleSaveTask = async () => {
    if (!newTaskTitle.trim()) {
        toast({ title: "Validation Error", description: "Task title cannot be empty.", variant: "destructive"});
        return;
    }
    setIsLoading(true);
    try {
        if (editingTask) {
            // Update existing task
            const response = await axios.put<Task>(`${apiUrl}/api/tasks/${editingTask._id}`, { title: newTaskTitle, completed: editingTask.completed });
            setTasks(tasks.map(t => t._id === editingTask._id ? response.data : t));
            toast({ title: "Success", description: "Task updated." });
        } else {
            // Create new task
            const response = await axios.post<Task>(`${apiUrl}/api/tasks`, { title: newTaskTitle });
            setTasks([...tasks, response.data]);
            toast({ title: "Success", description: "Task added."});
        }
        handleCloseModal();
    } catch (error) {
        toast({ title: "Error", description: `Could not ${editingTask ? 'update' : 'add'} task.`, variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    setIsLoading(true);
    try {
      await axios.delete(`${apiUrl}/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
      toast({ title: "Success", description: "Task deleted." });
    } catch (error) {
      toast({ title: "Error", description: "Could not delete task.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };


  const handleToggleTask = async (taskId: string, currentCompletedStatus: boolean) => {
    const taskToUpdate = tasks.find(t => t._id === taskId);
    if (!taskToUpdate) return;

    // Optimistic update
    setTasks(tasks.map(task => task._id === taskId ? { ...task, completed: !currentCompletedStatus } : task));

    try {
      await axios.put<Task>(`${apiUrl}/api/tasks/${taskId}`, {
        completed: !currentCompletedStatus,
        title: taskToUpdate.title // Send title if backend expects it for update
      });
      // No need to update state again if optimistic update worked, but fetch can ensure consistency
      // fetchTasks(); // Optional: refetch to confirm
      toast({ title: "Task Updated", description: `Task marked as ${!currentCompletedStatus ? 'complete' : 'incomplete'}.`});
    } catch (error) {
      toast({ title: "Error", description: "Could not update task status. Reverting.", variant: "destructive" });
      // Revert optimistic update
      setTasks(tasks.map(task => task._id === taskId ? { ...task, completed: currentCompletedStatus } : task));
    }
  };

  // Map tasks to include icons for rendering (client-side mapping)
  const displayTasks = tasks.map(task => {
    const initialTask = initialWellnessTasks.find(it => it.title.toLowerCase() === task.title.toLowerCase());
    return {
      ...task,
      icon: initialTask ? initialTask.icon : <Zap className="w-6 h-6" /> // Default icon
    };
  });


  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Wellness Tasks</h1>
          <p className="mt-2 text-md text-muted-foreground">
            Complete these tasks to improve your well-being.
          </p>
        </div>
        <Button className="mt-4 sm:mt-0 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => handleOpenModal()}>
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Task
        </Button>
      </header>

      {isLoading && tasks.length === 0 && <p>Loading tasks...</p>}
      {!isLoading && tasks.length === 0 && <p>No tasks found. Add one!</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayTasks.map((task) => (
          <div key={task._id} className="relative group">
             <TaskCard
                id={task._id}
                title={task.title}
                icon={task.icon}
                initialCompleted={task.completed}
                onToggleComplete={handleToggleTask}
             />
             {/* Edit and Delete buttons */}
             <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleOpenModal(task)} disabled={isLoading}>
                    <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => handleDeleteTask(task._id)} disabled={isLoading}>
                    <Trash2 className="h-4 w-4" />
                </Button>
             </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Task Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-title" className="text-right">
                Title
              </Label>
              <Input
                id="task-title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="col-span-3"
                placeholder="Enter task title"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveTask} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Task'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
