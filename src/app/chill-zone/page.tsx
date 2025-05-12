
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Headphones, BookOpen, Youtube, Waves } from "lucide-react";

const activities = [
  {
    title: "Ambient Soundscapes",
    description: "Listen to calming nature sounds or ambient music to relax your mind.",
    icon: <Headphones className="w-8 h-8 text-primary" />,
    action: "Listen Now",
    imageUrl: "https://picsum.photos/400/200?random=20",
    aiHint: "headphones music"
  },
  {
    title: "Guided Meditation",
    description: "Follow guided meditation sessions for stress relief and mental clarity.",
    icon: <Waves className="w-8 h-8 text-primary" />,
    action: "Start Session",
    imageUrl: "https://picsum.photos/400/200?random=21",
    aiHint: "yoga meditation"
  },
  {
    title: "Relaxing Reads",
    description: "Access a curated list of calming articles and short stories.",
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    action: "Read Now",
    imageUrl: "https://picsum.photos/400/200?random=22",
    aiHint: "book library"
  },
  {
    title: "Calming Videos",
    description: "Watch soothing videos, from nature scenes to art creation.",
    icon: <Youtube className="w-8 h-8 text-primary" />,
    action: "Watch Now",
    imageUrl: "https://picsum.photos/400/200?random=23",
    aiHint: "nature video"
  },
];

export default function ChillZonePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Welcome to the <span className="text-primary">Chill Zone</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Unwind, relax, and recharge. Find activities to soothe your mind and body.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {activities.map((activity, index) => (
          <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
               <div className="aspect-[16/8] relative w-full">
                <Image 
                  src={activity.imageUrl} 
                  alt={activity.title} 
                  layout="fill" 
                  objectFit="cover"
                  data-ai-hint={activity.aiHint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <div className="flex items-center gap-3 mb-3">
                {activity.icon}
                <CardTitle className="text-xl font-semibold">{activity.title}</CardTitle>
              </div>
              <CardDescription className="text-foreground/80">{activity.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">{activity.action}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
