import { useState, useEffect } from "react";
import axios from "axios";
import { TaskCard } from "@/components/specific/task-card"; // Make sure TaskCard is adapted
import { Music, BedDouble, Zap, PlusCircle, GlassWater, StretchHorizontal, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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


export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Task[]>("/api/tasks");
      // If backend tasks are different from initialWellnessTasks, merge or prioritize backend
      // For now, let's assume backend stores these wellness tasks if they are dynamic
      // If backend is empty, we can populate with initialWellnessTasks or create them
      if (response.data.length > 0) {
        setTasks(response.data);
      } else {
        // If no tasks from backend, use predefined ones (or add them to backend)
        // This part needs refinement based on how tasks are managed
        const clientSideTasks = initialWellnessTasks.map(t => ({...t, _id: t.id}));
        setTasks(clientSideTasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast({ title: "Error", description: "Could not fetch tasks.", variant: "destructive" });
      // Fallback to client-side tasks on error
      const clientSideTasks = initialWellnessTasks.map(t => ({...t, _id: t.id}));
      setTasks(clientSideTasks);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (title: string) => { // Example: if "Add New Task" button was functional
    setIsLoading(true);
    try {
      const response = await axios.post<Task>("/api/tasks", { title });
      setTasks([...tasks, response.data]);
      toast({ title: "Success", description: "Task added."});
    } catch (error) {
      toast({ title: "Error", description: "Could not add task.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTask = async (taskId: string, currentCompletedStatus: boolean) => {
    // Find the task to get its current title if needed for update
    const taskToUpdate = tasks.find(t => t._id === taskId);
    if (!taskToUpdate) return;

    try {
      const response = await axios.put<Task>(`/api/tasks/${taskId}`, { 
        completed: !currentCompletedStatus,
        title: taskToUpdate.title // Send title if backend expects it for update
      });
      setTasks(tasks.map(task => task._id === taskId ? response.data : task));
      toast({ title: "Task Updated", description: `Task marked as ${response.data.completed ? 'complete' : 'incomplete'}.`});
    } catch (error) {
      toast({ title: "Error", description: "Could not update task status.", variant: "destructive" });
    }
  };
  
  // Map initial tasks to include icon components for rendering
  // This mapping happens client-side as icons are React components
  const displayTasks = tasks.map(task => {
    const initialTask = initialWellnessTasks.find(it => it.id === task._id || it.title === task.title);
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
        {/* Add New Task Button - functionality to be implemented if custom tasks are allowed */}
        <Button className="mt-4 sm:mt-0 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => alert("Add New Task functionality to be implemented")}>
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Task
        </Button>
      </header>
      
      {isLoading && <p>Loading tasks...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayTasks.map((task) => (
          <TaskCard 
            key={task._id} 
            id={task._id} 
            title={task.title} 
            icon={task.icon}
            initialCompleted={task.completed}
            onToggleComplete={handleToggleTask}
          />
        ))}
      </div>
    </div>
  );
}
