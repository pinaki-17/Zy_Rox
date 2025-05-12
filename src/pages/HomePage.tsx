import { ImageSlider } from "@/components/specific/image-slider"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Welcome to <span className="text-primary">ZenithHub</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          Your central place for productivity, relaxation, and community. Explore our features and enhance your daily life.
        </p>
      </section>
      
      <ImageSlider />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full pt-8">
        <div className="p-6 bg-card rounded-lg shadow-md border">
          <h3 className="text-xl font-semibold text-primary mb-2">Stay Organized</h3>
          <p className="text-muted-foreground mb-4">Manage your tasks and notes efficiently. Never miss a deadline or an idea.</p>
          <Button variant="outline" asChild>
            <Link to="/tasks">View Tasks</Link>
          </Button>
        </div>
        <div className="p-6 bg-card rounded-lg shadow-md border">
          <h3 className="text-xl font-semibold text-primary mb-2">Connect & Share</h3>
          <p className="text-muted-foreground mb-4">Engage with our community, share your thoughts on the blog, or chat with friends.</p>
           <Button variant="outline" asChild>
            <Link to="/blog">Read Blog</Link>
          </Button>
        </div>
        <div className="p-6 bg-card rounded-lg shadow-md border">
          <h3 className="text-xl font-semibold text-primary mb-2">Relax & Unwind</h3>
          <p className="text-muted-foreground mb-4">Take a break in our Chill Zone. Find peace and recharge your mind.</p>
           <Button variant="outline" asChild>
            <Link to="/chill-zone">Chill Zone</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
