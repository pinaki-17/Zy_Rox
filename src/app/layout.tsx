
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font"; // Corrected import path from 'geist/font/mono'
import "./globals.css"
import { AppShell } from "@/components/layout/app-shell"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

// The imported GeistSans and GeistMono are objects, not functions.
// Their .variable property provides the CSS variable class name.
// The following lines were causing the TypeError.
// const geistSans = GeistSans({
//   variable: "--font-geist-sans",
//   subsets: ['latin'],
// });
//
// const geistMono = GeistMono({
//   variable: "--font-geist-mono",
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: "ZenithHub",
  description: "Modern responsive UI for ZenithHub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppShell>{children}</AppShell>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

