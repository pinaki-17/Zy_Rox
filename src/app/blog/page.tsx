
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    date: "October 26, 2023",
    excerpt: "Exploring upcoming trends and technologies shaping the web development landscape...",
    imageUrl: "https://picsum.photos/400/250?random=10",
    aiHint: "technology code"
  },
  {
    id: 2,
    title: "Mindfulness in a Busy World",
    date: "October 22, 2023",
    excerpt: "Tips and techniques for practicing mindfulness amidst a hectic schedule...",
    imageUrl: "https://picsum.photos/400/250?random=11",
    aiHint: "meditation nature"
  },
  {
    id: 3,
    title: "Getting Started with ZenithHub",
    date: "October 18, 2023",
    excerpt: "A beginner's guide to navigating and making the most of ZenithHub features...",
    imageUrl: "https://picsum.photos/400/250?random=12",
    aiHint: "abstract computer"
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">ZenithHub Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Insights, articles, and updates from the ZenithHub team.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="aspect-[16/10] relative w-full">
                <Image 
                  src={post.imageUrl} 
                  alt={post.title} 
                  layout="fill" 
                  objectFit="cover"
                  data-ai-hint={post.aiHint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                <a href="#">{post.title}</a>
              </CardTitle>
              <p className="text-sm text-muted-foreground mb-3">{post.date}</p>
              <CardDescription className="text-foreground/80 mb-4">{post.excerpt}</CardDescription>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                Read more &rarr;
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
