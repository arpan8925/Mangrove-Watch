import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Layers, 
  Filter,
  Satellite,
  Navigation,
  Maximize,
  Info,
  AlertTriangle,
  CheckCircle,
  Clock,
  Camera,
  Download
} from "lucide-react";

export default function MapView() {
  const [selectedLayer, setSelectedLayer] = useState("satellite");
  const [selectedReport, setSelectedReport] = useState(null);

  const mapLayers = [
    { id: "satellite", name: "Satellite View", icon: Satellite },
    { id: "terrain", name: "Terrain", icon: Layers },
    { id: "hybrid", name: "Hybrid", icon: Navigation }
  ];

  const reportMarkers = [
    {
      id: "R001",
      lat: 22.3511,
      lng: 89.0425,
      title: "Illegal mangrove cutting",
      status: "critical",
      priority: "high",
      date: "2024-01-15",
      reporter: "John Fisher",
      description: "Large scale cutting operation observed",
      evidence: ["photo", "gps"]
    },
    {
      id: "R002",
      lat: 25.2744,
      lng: 55.2962,
      title: "Plastic waste accumulation",
      status: "verified",
      priority: "medium",
      date: "2024-01-14",
      reporter: "Maria Santos",
      description: "Plastic debris washing up on shores",
      evidence: ["photo", "video"]
    },
    {
      id: "R003",
      lat: 25.4815,
      lng: -80.6081,
      title: "Construction activity",
      status: "resolved",
      priority: "low",
      date: "2024-01-12",
      reporter: "David Kim",
      description: "Unauthorized construction near protected area",
      evidence: ["photo", "document"]
    }
  ];

  const protectedAreas = [
    { name: "Sundarbans Reserve", area: "10,000 km²", status: "Protected" },
    { name: "Everglades National Park", area: "6,104 km²", status: "Protected" },
    { name: "Mangrove Bay Conservation", area: "2,300 km²", status: "Monitoring" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-destructive";
      case "verified": return "bg-success";
      case "resolved": return "bg-muted-foreground";
      default: return "bg-warning";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical": return AlertTriangle;
      case "verified": return CheckCircle;
      case "resolved": return CheckCircle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-poppins bg-gradient-ocean bg-clip-text text-transparent">
            Interactive Map
          </h1>
          <p className="text-muted-foreground mt-1">
            Visualize reports and protected areas across mangrove ecosystems
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedLayer} onValueChange={setSelectedLayer}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mapLayers.map((layer) => (
                <SelectItem key={layer.id} value={layer.id}>
                  <div className="flex items-center">
                    <layer.icon className="w-4 h-4 mr-2" />
                    {layer.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Container */}
        <Card className="lg:col-span-3 shadow-soft">
          <CardContent className="p-0">
            {/* Mock Map Interface */}
            <div className="relative h-[600px] bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
              {/* Map Controls */}
              <div className="absolute top-4 left-4 z-10 space-y-2">
                <Button variant="outline" size="icon" className="bg-white/90 backdrop-blur">
                  <Maximize className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-white/90 backdrop-blur">
                  <Layers className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-white/90 backdrop-blur">
                  <Navigation className="w-4 h-4" />
                </Button>
              </div>

              {/* Legend */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-sm">Report Status</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span className="text-xs">Critical</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span className="text-xs">Verified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                    <span className="text-xs">Resolved</span>
                  </div>
                </div>
              </div>

              {/* Mock map with report markers */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Interactive Map View</h3>
                  <p className="text-sm max-w-md">
                    This would display the actual map interface with satellite imagery, 
                    report markers, and protected area overlays. Integration with mapping 
                    services like Mapbox or Google Maps would be implemented here.
                  </p>
                </div>
              </div>

              {/* Mock report markers positioned on map */}
              {reportMarkers.map((report, index) => (
                <div
                  key={report.id}
                  className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform ${getStatusColor(report.status)}`}
                  style={{
                    left: `${20 + index * 25}%`,
                    top: `${30 + index * 15}%`,
                  }}
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                    <span className="text-[8px] font-bold text-primary">{index + 1}</span>
                  </div>
                </div>
              ))}

              {/* Selected Report Popup */}
              {selectedReport && (
                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{selectedReport.title}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedReport(null)}
                      className="h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{selectedReport.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span>Reporter: {selectedReport.reporter}</span>
                    <Badge variant="outline">{selectedReport.date}</Badge>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Report List */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="font-poppins text-lg">Recent Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {reportMarkers.map((report) => {
                const StatusIcon = getStatusIcon(report.status);
                return (
                  <div 
                    key={report.id} 
                    className="p-3 border border-border rounded-lg hover-lift cursor-pointer"
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{report.title}</h4>
                      <StatusIcon className={`w-4 h-4 ${
                        report.status === 'critical' ? 'text-destructive' :
                        report.status === 'verified' ? 'text-success' :
                        'text-muted-foreground'
                      }`} />
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{report.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{report.reporter}</span>
                      <div className="flex items-center space-x-1">
                        {report.evidence.map((type) => (
                          <Badge key={type} variant="outline" className="text-[10px] px-1">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Protected Areas */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="font-poppins text-lg">Protected Areas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {protectedAreas.map((area) => (
                <div key={area.name} className="p-3 border border-border rounded-lg">
                  <h4 className="font-medium text-sm mb-1">{area.name}</h4>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{area.area}</span>
                    <Badge variant="secondary">{area.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Map Statistics */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="font-poppins text-lg">Map Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Reports</span>
                <span className="font-semibold">247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Protected Areas</span>
                <span className="font-semibold">15</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Coverage</span>
                <span className="font-semibold">89,450 km²</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Monitors</span>
                <span className="font-semibold">3,856</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}