
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  id: string
  title: string
  icon?: React.ReactNode;
}

export function TaskCard({ id, title, icon }: TaskCardProps) {
  const [completed, setCompleted] = useState(false)

  const handleToggle = () => {
    setCompleted(!completed)
  }

  return (
    <Card className={cn(
      "transition-all duration-300 ease-in-out shadow-md hover:shadow-lg",
      completed ? "bg-secondary/70" : "bg-card"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn(
          "text-lg font-medium transition-colors",
          completed ? "text-muted-foreground line-through" : "text-card-foreground"
        )}>
          {title}
        </CardTitle>
        {icon && <div className={cn("text-muted-foreground", completed && "text-primary")}>{icon}</div>}
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <Label htmlFor={`task-${id}`} className={cn(
            "text-sm transition-colors",
            completed ? "text-muted-foreground" : "text-foreground"
          )}>
          {completed ? "Completed" : "Mark as complete"}
        </Label>
        <Switch
          id={`task-${id}`}
          checked={completed}
          onCheckedChange={handleToggle}
          aria-label={`Mark task "${title}" as ${completed ? 'incomplete' : 'complete'}`}
          className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
        />
      </CardContent>
    </Card>
  )
}
