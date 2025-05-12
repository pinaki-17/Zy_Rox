
import { TaskCard } from "@/components/specific/task-card";
import { Music, BedDouble, Zap, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const wellnessTasks = [
  { id: "music", title: "Listen to Calming Music", icon: <Music className="w-6 h-6"/> },
  { id: "rest", title: "Take a 15-Minute Rest", icon: <BedDouble className="w-6 h-6"/> },
  { id: "exercise", title: "Do Some Light Exercise", icon: <Zap className="w-6 h-6"/> },
  { id: "hydrate", title: "Drink a Glass of Water", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> }, // Placeholder for water drop
  { id: "stretch", title: "Stretch for 5 Minutes", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4m0 0L6 20M6 4h4M14 12h4M6 12h4"/></svg> }, // Placeholder for stretch
  { id: "mindful", title: "Practice Mindful Breathing", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 20a8 8 0 010-16c.5 0 .8.4.8.8v14.4c0 .4-.3.8-.8.8zM4 12H2m10-8V2M4 4l2 2m12 12l2 2m-2-2l-2-2m2-12l-2 2"/></svg> } // Placeholder for mindful
];

export default function TasksPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Wellness Tasks</h1>
          <p className="mt-2 text-md text-muted-foreground">
            Complete these tasks to improve your well-being.
          </p>
        </div>
        <Button className="mt-4 sm:mt-0 bg-primary hover:bg-primary/90 text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Task
        </Button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wellnessTasks.map((task) => (
          <TaskCard key={task.id} id={task.id} title={task.title} icon={task.icon} />
        ))}
      </div>
    </div>
  );
}
