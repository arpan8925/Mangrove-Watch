import { useState } from "react";
import { 
  BarChart3, 
  Users, 
  MapPin, 
  AlertTriangle, 
  Settings, 
  Trophy,
  FileText,
  Home,
  Eye
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const mainItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Reports", url: "/reports", icon: FileText, badge: "12" },
  { title: "Map View", url: "/map", icon: MapPin },
  { title: "Community", url: "/community", icon: Users },
];

const insightItems = [
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
];

const systemItems = [
  { title: "Alerts", url: "/alerts", icon: AlertTriangle, badge: "3" },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-ocean text-primary-foreground shadow-soft hover-glow" 
      : "text-foreground hover:bg-muted hover:text-foreground transition-smooth";

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-3 p-4">
          {!collapsed && (
            <>
              <div className="w-8 h-8 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-poppins font-semibold text-foreground">Mangrove Watch</h2>
                <p className="text-xs text-muted-foreground">Conservation CRM</p>
              </div>
            </>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-gradient-ocean rounded-lg flex items-center justify-center mx-auto">
              <Eye className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && (
                        <>
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Insights
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {insightItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && (
                        <>
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="destructive" className="ml-auto text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}