import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Target,
  Users,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye
} from "lucide-react";

export default function Analytics() {
  const kpiData = [
    {
      title: "Report Response Rate",
      value: "94.2%",
      change: "+5.1%",
      changeType: "positive",
      description: "Average time from report to action"
    },
    {
      title: "Community Growth",
      value: "+312",
      change: "+18%",
      changeType: "positive",
      description: "New members this month"
    },
    {
      title: "Threat Detection",
      value: "87%",
      change: "-2.3%",
      changeType: "negative",
      description: "AI accuracy in identifying threats"
    },
    {
      title: "Area Coverage",
      value: "127",
      change: "+5",
      changeType: "positive",
      description: "Protected zones monitored"
    }
  ];

  const trendData = [
    { month: "Jan", reports: 65, verified: 58, resolved: 52 },
    { month: "Feb", reports: 78, verified: 72, resolved: 65 },
    { month: "Mar", reports: 92, verified: 85, resolved: 78 },
    { month: "Apr", reports: 87, verified: 82, resolved: 79 },
    { month: "May", reports: 105, verified: 98, resolved: 89 },
    { month: "Jun", reports: 118, verified: 110, resolved: 98 }
  ];

  const threatCategories = [
    { category: "Illegal Cutting", count: 145, percentage: 35, trend: "up" },
    { category: "Pollution", count: 98, percentage: 24, trend: "down" },
    { category: "Construction", count: 67, percentage: 16, trend: "stable" },
    { category: "Dumping", count: 52, percentage: 13, trend: "up" },
    { category: "Other", count: 48, percentage: 12, trend: "stable" }
  ];

  const regionalData = [
    { region: "Sundarbans Delta", reports: 89, coverage: "95%", effectiveness: "94%" },
    { region: "Everglades", reports: 67, coverage: "88%", effectiveness: "91%" },
    { region: "Manaus Basin", reports: 54, coverage: "78%", effectiveness: "89%" },
    { region: "Coastal Nigeria", reports: 43, coverage: "72%", effectiveness: "85%" },
    { region: "Malaysian Borneo", reports: 38, coverage: "65%", effectiveness: "82%" }
  ];

  const getChangeIcon = (changeType: string) => {
    return changeType === "positive" ? TrendingUp : TrendingDown;
  };

  const getChangeColor = (changeType: string) => {
    return changeType === "positive" ? "text-success" : "text-destructive";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-destructive" />;
      case "down": return <TrendingDown className="w-4 h-4 text-success" />;
      default: return <div className="w-4 h-4 bg-muted-foreground rounded-full"></div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-poppins bg-gradient-ocean bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Data-driven insights for conservation impact and effectiveness
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select defaultValue="30d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => {
          const ChangeIcon = getChangeIcon(kpi.changeType);
          return (
            <Card key={kpi.title} className="hover-lift shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm text-muted-foreground">{kpi.title}</h3>
                  <ChangeIcon className={`w-4 h-4 ${getChangeColor(kpi.changeType)}`} />
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold font-poppins">{kpi.value}</div>
                  <div className={`text-sm flex items-center ${getChangeColor(kpi.changeType)}`}>
                    {kpi.change} from last period
                  </div>
                  <p className="text-xs text-muted-foreground">{kpi.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trends Chart */}
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader>
            <CardTitle className="font-poppins flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-primary" />
              Report Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Mock Chart Area */}
              <div className="h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Interactive Chart View</h3>
                  <p className="text-sm max-w-md">
                    This would display interactive charts showing report trends, 
                    verification rates, and resolution metrics over time using 
                    libraries like Recharts or Chart.js.
                  </p>
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm">Total Reports</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm">Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm">Resolved</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Threat Categories */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-poppins">Threat Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {threatCategories.map((threat) => (
              <div key={threat.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{threat.category}</span>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(threat.trend)}
                    <span className="text-sm text-muted-foreground">{threat.count}</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-ocean h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${threat.percentage}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{threat.percentage}% of total</span>
                  <span>{threat.trend === "up" ? "↗" : threat.trend === "down" ? "↘" : "→"}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Regional Performance */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="font-poppins flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            Regional Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Region</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Reports</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Coverage</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Effectiveness</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {regionalData.map((region) => (
                  <tr key={region.region} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{region.region}</td>
                    <td className="py-3 px-4 text-muted-foreground">{region.reports}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-ocean h-2 rounded-full" 
                            style={{ width: region.coverage }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">{region.coverage}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-mangrove h-2 rounded-full" 
                            style={{ width: region.effectiveness }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">{region.effectiveness}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant="secondary" 
                        className={parseInt(region.effectiveness) > 90 ? "bg-success-light text-success" : ""}
                      >
                        {parseInt(region.effectiveness) > 90 ? "Excellent" : 
                         parseInt(region.effectiveness) > 85 ? "Good" : "Needs Attention"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-mangrove text-white shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Areas Protected</p>
                <p className="text-2xl font-bold">89,450</p>
                <p className="text-xs opacity-75">hectares preserved this year</p>
              </div>
              <Target className="w-8 h-8 opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-sunset text-white shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Threats Prevented</p>
                <p className="text-2xl font-bold">342</p>
                <p className="text-xs opacity-75">incidents stopped in time</p>
              </div>
              <AlertTriangle className="w-8 h-8 opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-ocean text-white shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Community Impact</p>
                <p className="text-2xl font-bold">3,856</p>
                <p className="text-xs opacity-75">active conservation heroes</p>
              </div>
              <Users className="w-8 h-8 opacity-75" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}