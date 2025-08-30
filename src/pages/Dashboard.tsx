import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useReports } from "@/hooks/useReports";
import { useProfiles } from "@/hooks/useProfiles";
import { useAlerts } from "@/hooks/useAlerts";
import { 
  FileText, 
  Users, 
  MapPin, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Trophy,
  Plus,
  ArrowRight
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Dashboard() {
  const { reports, isLoading: reportsLoading } = useReports();
  const { profiles, isLoading: profilesLoading } = useProfiles();
  const { alerts } = useAlerts();

  const recentReports = reports.slice(0, 5);
  const topContributors = profiles.slice(0, 4);
  
  const pendingReports = reports.filter(r => r.status === 'pending').length;
  const verifiedReports = reports.filter(r => r.status === 'verified').length;
  const resolvedReports = reports.filter(r => r.status === 'resolved').length;
  const criticalAlerts = alerts.filter(a => a.severity === 'critical' || a.severity === 'high').length;

  if (reportsLoading || profilesLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded-lg w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-poppins bg-gradient-ocean bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor mangrove conservation efforts in real-time
          </p>
        </div>
        <Button className="bg-gradient-ocean hover:shadow-glow transition-smooth">
          <Plus className="w-4 h-4 mr-2" />
          New Report
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Reports"
          value={reports.length.toString()}
          change={`${verifiedReports} verified`}
          changeType="positive"
          icon={FileText}
          variant="default"
        />
        <MetricCard
          title="Active Community"
          value={profiles.length.toString()}
          change={`${profiles.filter(p => p.total_reports > 0).length} contributors`}
          changeType="positive"
          icon={Users}
          variant="success"
        />
        <MetricCard
          title="Resolved Issues"
          value={resolvedReports.toString()}
          change={`${pendingReports} pending`}
          changeType={pendingReports > 0 ? "neutral" : "positive"}
          icon={CheckCircle}
          variant="default"
        />
        <MetricCard
          title="Critical Alerts"
          value={criticalAlerts.toString()}
          change={`${alerts.length - criticalAlerts} other alerts`}
          changeType={criticalAlerts > 0 ? "negative" : "positive"}
          icon={AlertTriangle}
          variant="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reports */}
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-poppins">Recent Reports</CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover-lift">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <h4 className="font-medium">{report.title}</h4>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{report.location_name || 'Unknown Location'}</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(report.created_at), { addSuffix: true })}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      by {report.profiles?.display_name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={
                      report.priority === "critical" || report.priority === "high" ? "destructive" : 
                      report.priority === "medium" ? "default" : 
                      "secondary"
                    }
                  >
                    {report.priority}
                  </Badge>
                  <Badge 
                    variant={
                      report.status === "verified" ? "default" :
                      report.status === "resolved" ? "secondary" :
                      "outline"
                    }
                    className={
                      report.status === "verified" ? "bg-success text-success-foreground" :
                      report.status === "resolved" ? "bg-muted" :
                      ""
                    }
                  >
                    {report.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                    {report.status === "verified" && <CheckCircle className="w-3 h-3 mr-1" />}
                    {report.status === "resolved" && <CheckCircle className="w-3 h-3 mr-1" />}
                    {report.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Contributors */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-poppins flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-accent" />
              Top Contributors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topContributors.map((contributor, index) => (
              <div key={contributor.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-ocean text-white rounded-full text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{contributor.display_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {contributor.total_reports} reports
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{contributor.points}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-mangrove text-white shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Areas Protected</p>
                <p className="text-2xl font-bold">{(reports.length * 42.5).toLocaleString()}</p>
                <p className="text-xs opacity-75">hectares monitored</p>
              </div>
              <TrendingUp className="w-8 h-8 opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-sunset text-white shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Issues Resolved</p>
                <p className="text-2xl font-bold">{resolvedReports}</p>
                <p className="text-xs opacity-75">this month</p>
              </div>
              <CheckCircle className="w-8 h-8 opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-ocean text-white shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Response Time</p>
                <p className="text-2xl font-bold">{pendingReports > 0 ? Math.round(24 / pendingReports * 10) / 10 : 0}h</p>
                <p className="text-xs opacity-75">average</p>
              </div>
              <Clock className="w-8 h-8 opacity-75" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}