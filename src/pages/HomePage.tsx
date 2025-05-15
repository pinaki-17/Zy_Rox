import { ImageSlider } from "@/components/specific/image-slider"
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate();
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
            <Link to="/chill-zone">Visit Chill Zone</Link>
          </Button>
        </div>
      </section>



      {/* New Sections Added Below */}

      {/* Detailed Feature Breakdown Section */}
      <section className="w-full max-w-5xl py-12">
        <h2 className="text-3xl font-bold text-center text-foreground mb-8">Dive Deeper into Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">

              <h3 className="text-2xl font-semibold text-primary mb-2">Task Management Mastery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our intuitive task management system allows you to create, prioritize, and track your tasks with ease. Set deadlines, add subtasks, and categorize your work to stay on top of your goals. Whether it's a simple grocery list or a complex project, ZenithHub helps you get it done.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-primary mb-2">Effortless Note Taking</h3>
              <p className="text-muted-foreground leading-relaxed">
                Capture your ideas the moment they strike. Our note-taking feature provides a clean and flexible space to jot down thoughts, create lists, and save important information. Organize your notes with tags and folders for quick retrieval.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-primary mb-2">Real-Time Collaboration</h3>
              <p className="text-muted-foreground leading-relaxed">
                Work seamlessly with others on shared tasks and notes. See changes as they happen and stay connected with your team or friends.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-primary mb-2">AI-Powered Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                Leverage intelligent suggestions and insights to optimize your productivity. Get recommendations for task prioritization and discover patterns in your workflow.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-primary mb-2">Customizable Workflows</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tailor ZenithHub to your specific needs. Create custom task statuses, project templates, and notification settings to fit your unique style of working.
              </p>
            </div>
          </div>
          <div>
            <img
              src="https://picsum.photos/id/237/500/300"
              alt="Task management interface screenshot"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
              data-ai-hint="image showcasing task management and note taking features"
            />
          </div>
        </div>
      </section>

      {/* Pricing Overview Section (Placeholder) */}
      <section className="w-full max-w-5xl py-12 bg-card rounded-lg shadow-md border text-center">
        <h2 className="text-3xl font-bold text-foreground mb-8">Simple & Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div className="p-6 border rounded-lg bg-background shadow-sm space-y-4" onClick={() => navigate('/payment-gateway-free')}>
            <h3 className="text-2xl font-semibold text-primary">Free Tier</h3>
            <p className="text-muted-foreground">Great for getting started.</p>
            <p className="text-4xl font-bold text-foreground">$0<span className="text-lg font-normal text-muted-foreground">/month</span></p>
            <ul className="text-muted-foreground text-sm space-y-2 text-left">
              <li>✓ Basic Task Management</li><li>✓ Limited Notes</li><li>✓ Community Access</li>
            </ul>
            {/* Added onClick handler to navigate */}

            <Button variant="secondary" className="w-full" onClick={() => navigate('/payment-gateway')}>Get Started</Button>
          </div>
          <div className="p-6 border rounded-lg bg-primary text-primary-foreground shadow-lg space-y-4 transform scale-105" >
            <h3 className="text-2xl font-bold">Pro Plan</h3>
            <p className="text-primary-foreground/90">Unlock full potential.</p>
            <p className="text-4xl font-bold">$9<span className="text-lg font-normal">/month</span></p>
            <ul className="text-primary-foreground/90 text-sm space-y-2 text-left">
              <li>✓ Unlimited Tasks & Notes</li><li>✓ Advanced Organization</li><li>✓ Priority Support</li>
              <li>✓ Exclusive Chill Zone Features</li>
            </ul>
            {/* Added onClick handler to navigate */}
            <Button variant="secondary" className="w-full" onClick={() => navigate('/payment-gateway')}>Get Started</Button>
          </div> 
          <div className="p-6 border rounded-lg bg-background shadow-sm space-y-4" onClick={() => navigate('/payment-gateway-business')}>
            <p className="text-4xl font-bold text-foreground">$29<span className="text-lg font-normal text-muted-foreground">/month</span></p>
            <ul className="text-muted-foreground text-sm space-y-2 text-left">
              <li>✓ All Pro Features</li>
              <li>✓ Team Collaboration</li>
              <li>✓ Admin Dashboard</li>
            </ul>
            {/* Added onClick handler to navigate */}
            <Button variant="secondary" className="w-full" onClick={() => navigate('/payment-gateway-business')}>Contact Us</Button>
          </div>
        </div>
      </section>

      {/* Integration Showcase Section */}
      <section className="w-full max-w-5xl py-12 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-8">Seamlessly Integrates With</h2>
        <div className="flex justify-center items-center gap-12 flex-wrap">
          {/* Replace with actual integration logos */}
          <img src="/src/assets/logos/logo1.png" alt="Integration Logo 1" className="h-12 opacity-75 hover:opacity-100 transition-opacity" />
          <img src="/src/assets/logos/logo2.png" alt="Integration Logo 2" className="h-12 opacity-75 hover:opacity-100 transition-opacity" />
          <img src="/src/assets/logos/logo3.png" alt="Integration Logo 3" className="h-12 opacity-75 hover:opacity-100 transition-opacity" />
          <img src="/src/assets/logos/logo4.png" alt="Integration Logo 4" className="h-12 opacity-75 hover:opacity-100 transition-opacity" />
        </div>
      </section>

      {/* FAQ Snippet Section */}
      <section className="w-full max-w-5xl py-12 bg-card rounded-lg shadow-md border px-6">
        <h2 className="text-3xl font-bold text-center text-foreground mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">What is ZenithHub?</h3>
            <p className="text-muted-foreground">ZenithHub is an all-in-one platform designed to help you manage your tasks, take notes, relax, and connect with a community.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Is ZenithHub free to use?</h3>
            <p className="text-muted-foreground">Yes, we offer a free tier with essential features. We also have paid plans for users who need more advanced capabilities.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">How can I join the community?</h3>
            <p className="text-muted-foreground">Simply sign up for an account, and you'll gain access to our community features, including the blog and chat.</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/faq">View All FAQs</Link>
          </Button>
        </div>
      </section>

      {/* Contact Information Snippet */}
      <section className="w-full max-w-5xl py-12 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
        <p className="text-lg text-muted-foreground mb-6">Have questions or feedback? We'd love to hear from you.</p>
        <Button asChild>
          <Link to="/contact">Contact Us</Link>
        </Button>
      </section>
    </div>
  );
}
