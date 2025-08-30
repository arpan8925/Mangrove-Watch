import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Community from "./pages/Community";
import MapView from "./pages/MapView";
import Analytics from "./pages/Analytics";
import Leaderboard from "./pages/Leaderboard";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen bg-gradient-ocean flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Reports />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Community />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/map" element={
            <ProtectedRoute>
              <DashboardLayout>
                <MapView />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Leaderboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/alerts" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Alerts />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
