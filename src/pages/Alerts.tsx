import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  AlertTriangle,
  Bell,
  Search,
  Filter,
  MapPin,
  Clock,
  Eye,
  CheckCircle,
  X,
  MoreHorizontal,
  Siren,
  Info,
  AlertCircle
} from "lucide-react";

export default function Alerts() {
  const alerts = [
    {
      id: "A001",
      type: "critical",
      title: "Mass mangrove cutting detected",
      description: "Satellite data shows large-scale deforestation in protected zone A-7",
      location: "Sundarbans Delta, Sector A-7",
      priority: "critical",
      status: "active",
      timestamp: "2024-01-15T10:30:00",
      source: "AI Detection",
      affectedArea: "45 hectares",
      confidence: 95,
      actions: ["Dispatch Team", "Contact Authorities", "Escalate"]
    },
    {
      id: "A002",
      type: "warning",
      title: "Unusual activity near protected area",
      description: "Multiple reports of construction equipment near mangrove reserve",
      location: "Everglades National Park, Zone C-2",
      priority: "high",
      status: "investigating",
      timestamp: "2024-01-15T08:45:00",
      source: "Community Reports",
      affectedArea: "12 hectares",
      confidence: 78,
      actions: ["Verify Reports", "Site Inspection"]
    },
    {
      id: "A003",
      type: "info",
      title: "Weather alert - Storm approaching",
      description: "Tropical storm may affect monitoring activities in coastal regions",
      location: "Gulf Coast Region",
      priority: "medium",
      status: "monitoring",
      timestamp: "2024-01-15T06:20:00",
      source: "Weather Service",
      affectedArea: "230 km coastline",
      confidence: 89,
      actions: ["Alert Teams", "Prepare Equipment"]
    },
    {
      id: "A004",
      type: "resolved",
      title: "Illegal dumping incident resolved",
      description: "Cleanup completed and perpetrators identified through community reports",
      location: "Manaus Bay Area",
      priority: "medium",
      status: "resolved",
      timestamp: "2024-01-14T16:30:00",
      source: "Community Reports",
      affectedArea: "2 hectares",
      confidence: 100,
      actions: ["Follow-up Monitoring"]
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical": return <Siren className="w-5 h-5 text-destructive" />;
      case "warning": return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "info": return <Info className="w-5 h-5 text-primary" />;
      case "resolved": return <CheckCircle className="w-5 h-5 text-success" />;
      default: return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical": return <Badge variant="destructive">Critical</Badge>;
      case "warning": return <Badge className="bg-warning text-warning-foreground">Warning</Badge>;
      case "info": return <Badge variant="default">Info</Badge>;
      case "resolved": return <Badge className="bg-success text-success-foreground">Resolved</Badge>;
      default: return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical": return <Badge variant="destructive">Critical</Badge>;
      case "high": return <Badge className="bg-accent text-accent-foreground">High</Badge>;
      case "medium": return <Badge variant="default">Medium</Badge>;
      case "low": return <Badge variant="secondary">Low</Badge>;
      default: return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge variant="destructive">Active</Badge>;
      case "investigating": return <Badge className="bg-warning text-warning-foreground">Investigating</Badge>;
      case "monitoring": return <Badge variant="default">Monitoring</Badge>;
      case "resolved": return <Badge className="bg-success text-success-foreground">Resolved</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-success";
    if (confidence >= 70) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-poppins bg-gradient-ocean bg-clip-text text-transparent">
            Alert Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and respond to conservation threats in real-time
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Configure Alerts
          </Button>
          <Button className="bg-gradient-ocean hover:shadow-glow transition-smooth">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Create Alert
          </Button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-soft border-destructive/20 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-2xl font-bold text-destructive">3</p>
                <p className="text-xs text-muted-foreground">Immediate attention</p>
              </div>
              <Siren className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft border-warning/20 bg-warning-light">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-warning">8</p>
                <p className="text-xs text-muted-foreground">Under investigation</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft border-primary/20 bg-secondary-light">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monitoring</p>
                <p className="text-2xl font-bold text-primary">15</p>
                <p className="text-xs text-muted-foreground">Being tracked</p>
              </div>
              <Eye className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft border-success/20 bg-success-light">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-bold text-success">7</p>
                <p className="text-xs text-muted-foreground">Successfully handled</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search alerts by location, type, or description..." 
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Alert Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="monitoring">Monitoring</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Alerts</TabsTrigger>
          <TabsTrigger value="critical">Critical (3)</TabsTrigger>
          <TabsTrigger value="active">Active (8)</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring (15)</TabsTrigger>
          <TabsTrigger value="resolved">Resolved (47)</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className="hover-lift shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold font-poppins">{alert.title}</h3>
                        {getAlertBadge(alert.type)}
                      </div>
                      <p className="text-muted-foreground mb-3">{alert.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-primary" />
                            <span className="text-sm">{alert.location}</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Source</p>
                          <span className="text-sm">{alert.source}</span>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Affected Area</p>
                          <span className="text-sm">{alert.affectedArea}</span>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">AI Confidence</p>
                          <span className={`text-sm font-semibold ${getConfidenceColor(alert.confidence)}`}>
                            {alert.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getPriorityBadge(alert.priority)}
                    {getStatusBadge(alert.status)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      {alert.actions.slice(0, 2).map((action) => (
                        <Badge key={action} variant="outline" className="text-xs">
                          {action}
                        </Badge>
                      ))}
                      {alert.actions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{alert.actions.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {alert.status === "active" && (
                      <Button size="sm" className="bg-gradient-ocean">
                        Take Action
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="critical">
          <div className="text-center py-8">
            <Siren className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">3 Critical Alerts</h3>
            <p className="text-muted-foreground">These alerts require immediate attention and response.</p>
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">8 Active Alerts</h3>
            <p className="text-muted-foreground">These alerts are currently being investigated.</p>
          </div>
        </TabsContent>

        <TabsContent value="monitoring">
          <div className="text-center py-8">
            <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">15 Monitoring Alerts</h3>
            <p className="text-muted-foreground">These situations are being tracked for potential escalation.</p>
          </div>
        </TabsContent>

        <TabsContent value="resolved">
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">47 Resolved Alerts</h3>
            <p className="text-muted-foreground">These alerts have been successfully handled and resolved.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}