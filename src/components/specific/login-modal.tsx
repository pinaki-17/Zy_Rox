
"use client"

import type { PropsWithChildren } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { cn } from "@/lib/utils"

const FloatingLabelInput = ({ id, label, type = "text", ...props }: { id: string, label: string, type?: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="floating-label-container mb-6">
      <Input
        id={id}
        type={type}
        placeholder=" " // Important: space placeholder for floating label
        className="floating-label-input" // This class applies 'peer'
        {...props}
      />
      <Label 
        htmlFor={id} 
        className={cn(
          "floating-label-label", // Base styles from globals.css
          "peer-placeholder-shown:top-2 peer-placeholder-shown:text-base",
          "peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary",
          "peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary"
        )}
      >
        {label}
      </Label>
    </div>
  )
}

export function LoginModal({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false)

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
            <form onSubmit={(e) => e.preventDefault()}>
              <FloatingLabelInput id="user-email" label="Email Address" type="email" />
              <FloatingLabelInput id="user-password" label="Password" type="password" />
              <DialogFooter className="mt-6">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Login as User</Button>
              </DialogFooter>
            </form>
          </TabsContent>
          <TabsContent value="admin" className="p-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <FloatingLabelInput id="admin-email" label="Admin Email" type="email" />
              <FloatingLabelInput id="admin-password" label="Admin Password" type="password" />
              <DialogFooter className="mt-6">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Login as Admin</Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
