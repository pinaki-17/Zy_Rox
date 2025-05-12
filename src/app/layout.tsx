
import type { Metadata } from "next"
import { GeistSans, GeistMono } from "next/font/google"
import "./globals.css"
import { AppShell } from "@/components/layout/app-shell"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const geistSans = GeistSans({
  variable: "--font-geist-sans",
  subsets: ['latin'],
});

const geistMono = GeistMono({
  variable: "--font-geist-mono",
  subsets: ['latin'],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
