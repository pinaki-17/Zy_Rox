import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image"; // Replace with <img>
import { Users, Target, Lightbulb, Heart } from "lucide-react";

const teamMembers = [
  { name: "Alex Johnson", role: "Founder & CEO", avatarUrl: "https://picsum.photos/100/100?random=30", aiHint: "person face" },
  { name: "Maria Garcia", role: "Lead Developer", avatarUrl: "https://picsum.photos/100/100?random=31", aiHint: "woman face" },
  { name: "Sam Lee", role: "UX Designer", avatarUrl: "https://picsum.photos/100/100?random=32", aiHint: "man face" },
  { name: "Chloe Davis", role: "Marketing Lead", avatarUrl: "https://picsum.photos/100/100?random=33", aiHint: "person smiling" },
];

export default function AboutUsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          About <span className="text-primary">ZenithHub</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          We are a passionate team dedicated to creating tools that enhance productivity, foster connection, and promote well-being. ZenithHub is our commitment to a more balanced and fulfilling digital experience.
        </p>
      </header>

      <section className="mb-16">
        <div className="relative aspect-[16/7] w-full rounded-xl overflow-hidden shadow-2xl">
          <img 
            src="https://picsum.photos/1200/525?random=35" 
            alt="ZenithHub Team Working" 
            className="w-full h-full object-cover"
            data-ai-hint="team office"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
           <div className="absolute bottom-8 left-8 text-white">
             <h2 className="text-3xl font-semibold">Our Collaborative Spirit</h2>
             <p className="text-lg">Building the future, together.</p>
           </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-10 text-foreground">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Purpose-Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We build with intention, focusing on features that truly make a difference in people's lives.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Innovative Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We constantly explore new ideas and technologies to provide cutting-edge solutions.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl">User-Centric</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Our users are at the heart of everything we do. Their feedback shapes our platform.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-center mb-10 text-foreground">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary">
                <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.aiHint} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm text-primary">{member.role}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
