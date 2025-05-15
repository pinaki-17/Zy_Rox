import { Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/app-shell'
import HomePage from '@/pages/HomePage'
import NotesPage from '@/pages/NotesPage'
import TasksPage from '@/pages/TasksPage'
import ChatPage from '@/pages/ChatPage'
import BlogPage from '@/pages/BlogPage'
import ChillZonePage from '@/pages/ChillZonePage'
import AboutUsPage from '@/pages/AboutUsPage'
import PaymentGatewayPage from '@/pages/PaymentGatewayPage'
import AuthPage from '@/pages/AuthPage'
// Import other pages if you create them

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/chill-zone" element={<ChillZonePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/payment-gateway" element={<PaymentGatewayPage />} />
        <Route path="/auth" element={<AuthPage />} />
        {/* Add other routes here */}
      </Routes>
    </AppShell>
  )
}
