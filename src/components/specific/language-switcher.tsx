

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  // Placeholder functionality
  const handleLanguageChange = (value: string) => {
    console.log("Language changed to:", value)
  }

  return (
    <Select onValueChange={handleLanguageChange} defaultValue="en">
      <SelectTrigger className="w-9 h-9 p-0 border-0 bg-transparent hover:bg-accent focus:ring-0 focus:ring-offset-0" aria-label="Select language">
        <Button variant="ghost" size="icon" asChild className="w-9 h-9">
          <span><Globe className="h-5 w-5" /></span>
        </Button>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">EN</SelectItem>
        <SelectItem value="es">ES</SelectItem>
        <SelectItem value="fr">FR</SelectItem>
      </SelectContent>
    </Select>
  )
}
