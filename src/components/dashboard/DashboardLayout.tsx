import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useCurrentProfile } from "@/hooks/useProfiles";
import { useAlerts } from "@/hooks/useAlerts";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { signOut } = useAuth();
  const { profile } = useCurrentProfile();
  const { alerts } = useAlerts();

  const unreadAlerts = alerts.filter(alert => !alert.read_at).length;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b border-border bg-card shadow-soft sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
                
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search reports, communities..." 
                    className="pl-10 bg-muted/50 border-0 focus:bg-background"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  {unreadAlerts > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 bg-destructive flex items-center justify-center">
                      {unreadAlerts}
                    </Badge>
                  )}
                </Button>
                
                {profile && (
                  <div className="flex items-center gap-3">
                    <div className="text-right text-sm">
                      <p className="font-medium">{profile.display_name}</p>
                      <p className="text-xs text-muted-foreground">{profile.points} points</p>
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={profile.avatar_url} />
                      <AvatarFallback className="bg-gradient-ocean text-white text-sm">
                        {profile.display_name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="ghost" size="sm" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}