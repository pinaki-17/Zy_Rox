
// Removed "use client"
// Removed useTheme from "next-themes"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  // Placeholder state and logic since next-themes is removed
  const [currentTheme, setCurrentTheme] = useState("light"); // Default or detect preference
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Basic theme detection (optional)
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setCurrentTheme(prefersDark ? "dark" : "light");
    // Apply theme to body/html if needed using standard JS/CSS
    document.documentElement.classList.toggle('dark', prefersDark);
  }, [])


  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    // Apply theme change directly to DOM
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    // Persist preference if desired (e.g., localStorage)
    localStorage.setItem('theme', newTheme);
  }

   if (!mounted) {
    // Render a placeholder or null to avoid potential mismatch during initial render
    return <Button variant="ghost" size="icon" className="w-9 h-9" disabled><Sun className="h-5 w-5" /></Button>;
  }


  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="w-9 h-9" aria-label="Toggle theme">
      {currentTheme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  )
}
