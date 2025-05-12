import type { PropsWithChildren, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const FloatingLabelInput = ({ id, label, type = "text", ...props }: { id: string, label: string, type?: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="floating-label-container mb-6">
      <Input
        id={id}
        type={type}
        placeholder=" " // Important: space placeholder for floating label
        className="floating-label-input peer" 
        {...props}
      />
      <Label 
        htmlFor={id} 
        className={cn(
          "floating-label-label",
          "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0",
          "peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-focus:text-primary",
          "peer-[&:not(:placeholder-shown)]:scale-75 peer-[&:not(:placeholder-shown)]:-translate-y-3.5 peer-[&:not(:placeholder-shown)]:text-primary",
          "absolute left-3 top-2 origin-[0] -translate-y-3.5 scale-75 transform text-sm text-muted-foreground duration-200",
          "peer-placeholder-shown:top-2 peer-placeholder-shown:text-base",
          "peer-focus:-top-2.5 peer-focus:text-xs",
          "peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs"
        )}
      >
        {label}
      </Label>
    </div>
  )
}

export function LoginModal({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: FormEvent, type: 'user' | 'admin') => {
    e.preventDefault();
    setIsLoading(true);
    const email = type === 'user' ? userEmail : adminEmail;
    const password = type === 'user' ? userPassword : adminPassword;
    const url = type === 'user' ? "/api/auth/login" : "/api/auth/admin/login";

    try {
      const response = await axios.post(url, { email, password });
      // Handle successful login: store token, redirect, update UI state
      console.log(`${type} login successful:`, response.data);
      toast({ title: "Login Successful", description: `Welcome back, ${email}!` });
      // Example: localStorage.setItem('token', response.data.token);
      setOpen(false); // Close modal on success
    } catch (error: any) {
      console.error(`${type} login error:`, error.response?.data?.message || error.message);
      toast({ title: "Login Failed", description: error.response?.data?.message || "An error occurred.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        <Tabs defaultValue="user" className="w-full">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold text-center">Login to ZenithHub</DialogTitle>
            <DialogDescription className="text-center">
              Access your account or manage the platform.
            </DialogDescription>
            <TabsList className="grid w-full grid-cols-2 mt-4">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
          </DialogHeader>
          
          <TabsContent value="user" className="p-6">
            <form onSubmit={(e) => handleLogin(e, 'user')}>
              <FloatingLabelInput id="user-email" label="Email Address" type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
              <FloatingLabelInput id="user-password" label="Password" type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required />
              <DialogFooter className="mt-6">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login as User"}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          <TabsContent value="admin" className="p-6">
            <form onSubmit={(e) => handleLogin(e, 'admin')}>
              <FloatingLabelInput id="admin-email" label="Admin Email" type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required/>
              <FloatingLabelInput id="admin-password" label="Admin Password" type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required/>
              <DialogFooter className="mt-6">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                 {isLoading ? "Logging in..." : "Login as Admin"}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
