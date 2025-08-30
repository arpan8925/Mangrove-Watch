import { useState, useEffect, useRef } from "react";
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
  Download,
  ZoomIn,
  ZoomOut,
  Compass
} from "lucide-react";

// TypeScript declarations for MapLibre
declare global {
  interface Window {
    maplibregl: any;
  }
}

export default function MapView() {
  const [selectedLayer, setSelectedLayer] = useState("liberty");
  const [selectedReport, setSelectedReport] = useState(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

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

  // MapLibre helper functions
  const addReportMarkers = (map: any) => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    reportMarkers.forEach((report) => {
      // Create custom marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'custom-marker';
      markerEl.innerHTML = `
        <div class="w-8 h-8 rounded-full border-3 border-white shadow-lg cursor-pointer ${getStatusColor(report.status)} relative">
          <div class="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
            ${report.status === 'critical' ? '<svg class="w-2.5 h-2.5 text-destructive" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>' : 
              report.status === 'verified' ? '<svg class="w-2.5 h-2.5 text-success" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>' : 
              '<svg class="w-2.5 h-2.5 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>'}
          </div>
          <div class="absolute -bottom-1 -left-1">
            <span class="text-xs px-1 py-0.5 bg-secondary text-secondary-foreground rounded ${report.priority === 'critical' ? 'bg-destructive text-white' : ''}">${report.priority}</span>
          </div>
        </div>
      `;

      // Add click event
      markerEl.addEventListener('click', (e) => {
        e.stopPropagation();
        setSelectedReport(report);
      });

      // Create and add marker
      const marker = new window.maplibregl.Marker(markerEl)
        .setLngLat([report.lng, report.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });
  };

  const addProtectedAreas = (map: any) => {
    // Add protected area circles
    const protectedZones = [
      { center: [89.0425, 22.3511], radius: 50, name: "Sundarbans Reserve" },
      { center: [55.2962, 25.2744], radius: 30, name: "Coastal Bay Conservation" },
      { center: [-80.6081, 25.4815], radius: 40, name: "Everglades National Park" }
    ];

    protectedZones.forEach((zone) => {
      // Add circle for protected area
      map.addSource(`protected-${zone.name}`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: zone.center
          },
          properties: {}
        }
      });

      map.addLayer({
        id: `protected-${zone.name}`,
        type: 'circle',
        source: `protected-${zone.name}`,
        paint: {
          'circle-radius': zone.radius * 1000, // Convert km to meters
          'circle-color': 'rgba(34, 197, 94, 0.2)',
          'circle-stroke-color': 'rgba(34, 197, 94, 0.8)',
          'circle-stroke-width': 2,
          'circle-stroke-dasharray': [2, 2]
        }
      });
    });
  };

  // MapLibre integration
  useEffect(() => {
    // Load MapLibre GL JS dynamically
    const loadMapLibre = async () => {
      if (typeof window !== 'undefined' && !window.maplibregl) {
        // Load CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/maplibre-gl/dist/maplibre-gl.css';
        document.head.appendChild(link);

        // Load JS
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/maplibre-gl/dist/maplibre-gl.js';
        script.onload = initializeMap;
        document.head.appendChild(script);
      } else if (window.maplibregl) {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (!mapContainerRef.current || !window.maplibregl) return;

      // Clear existing map
      if (mapRef.current) {
        mapRef.current.remove();
      }

      // Initialize map
      const map = new window.maplibregl.Map({
        container: mapContainerRef.current,
        style: `https://tiles.openfreemap.org/styles/${selectedLayer}`,
        center: [89.0425, 22.3511], // Sundarbans Delta
        zoom: 8,
        attributionControl: false
      });

      mapRef.current = map;

      // Add navigation controls
      map.addControl(new window.maplibregl.NavigationControl(), 'top-right');

      // Wait for map to load
      map.on('load', () => {
        addReportMarkers(map);
        addProtectedAreas(map);
      });

      // Add click event for map
      map.on('click', () => {
        setSelectedReport(null);
      });
    };

    loadMapLibre();

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [selectedLayer]);

  const handleMapStyleChange = (newStyle: string) => {
    setSelectedLayer(newStyle);
    if (mapRef.current) {
      mapRef.current.setStyle(`https://tiles.openfreemap.org/styles/${newStyle}`);
      // Re-add layers after style change
      mapRef.current.once('style.load', () => {
        addReportMarkers(mapRef.current);
        addProtectedAreas(mapRef.current);
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Custom CSS for MapLibre markers */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-marker {
            cursor: pointer;
          }
          .custom-marker:hover {
            transform: scale(1.1);
            transition: transform 0.2s ease;
          }
          .custom-marker .w-8 {
            width: 2rem;
          }
          .custom-marker .h-8 {
            height: 2rem;
          }
          .custom-marker .border-3 {
            border-width: 3px;
          }
          .custom-marker .absolute {
            position: absolute;
          }
          .custom-marker .relative {
            position: relative;
          }
          .custom-marker .rounded-full {
            border-radius: 9999px;
          }
          .custom-marker .shadow-lg {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
          .custom-marker .text-xs {
            font-size: 0.75rem;
            line-height: 1rem;
          }
          .custom-marker .px-1 {
            padding-left: 0.25rem;
            padding-right: 0.25rem;
        }
          .custom-marker .py-0\\.5 {
            padding-top: 0.125rem;
            padding-bottom: 0.125rem;
          }
          .custom-marker .rounded {
            border-radius: 0.25rem;
          }
          .custom-marker .bg-secondary {
            background-color: hsl(var(--secondary));
          }
          .custom-marker .text-secondary-foreground {
            color: hsl(var(--secondary-foreground));
          }
          .custom-marker .bg-destructive {
            background-color: hsl(var(--destructive));
          }
          .custom-marker .text-white {
            color: white;
          }
          .custom-marker .bg-success {
            background-color: hsl(var(--success));
          }
          .custom-marker .bg-muted-foreground {
            background-color: hsl(var(--muted-foreground));
          }
          .custom-marker .bg-warning {
            background-color: hsl(var(--warning));
          }
          .custom-marker .-top-1 {
            top: -0.25rem;
          }
          .custom-marker .-right-1 {
            right: -0.25rem;
          }
          .custom-marker .-bottom-1 {
            bottom: -0.25rem;
          }
          .custom-marker .-left-1 {
            left: -0.25rem;
          }
          .custom-marker .w-4 {
            width: 1rem;
          }
          .custom-marker .h-4 {
            height: 1rem;
          }
          .custom-marker .bg-white {
            background-color: white;
          }
          .custom-marker .shadow-sm {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }
          .custom-marker .flex {
            display: flex;
          }
          .custom-marker .items-center {
            align-items: center;
          }
          .custom-marker .justify-center {
            justify-content: center;
          }
          .custom-marker .text-destructive {
            color: hsl(var(--destructive));
          }
          .custom-marker .text-success {
            color: hsl(var(--success));
          }
          .custom-marker .text-muted-foreground {
            color: hsl(var(--muted-foreground));
          }
          .custom-marker .w-2\\.5 {
            width: 0.625rem;
          }
          .custom-marker .h-2\\.5 {
            height: 0.625rem;
          }
        `
      }} />
      
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
             {/* OpenFreeMap Integration */}
             <div className="relative h-[600px] rounded-lg overflow-hidden">
               {/* Map Container */}
               <div 
                 ref={mapContainerRef}
                 className="w-full h-full"
                 style={{ position: 'relative' }}
               />
               
               {/* Map Controls Overlay */}
               <div className="absolute top-4 left-4 z-10 space-y-2">
                 <Button 
                   variant="outline" 
                   size="icon" 
                   className="bg-white/90 backdrop-blur hover:bg-white"
                   onClick={() => mapRef.current?.flyTo({ center: [89.0425, 22.3511], zoom: 10 })}
                 >
                   <Compass className="w-4 h-4" />
                 </Button>
                 <Button 
                   variant="outline" 
                   size="icon" 
                   className="bg-white/90 backdrop-blur hover:bg-white"
                   onClick={() => mapRef.current?.zoomIn()}
                 >
                   <ZoomIn className="w-4 h-4" />
                 </Button>
                 <Button 
                   variant="outline" 
                   size="icon" 
                   className="bg-white/90 backdrop-blur hover:bg-white"
                   onClick={() => mapRef.current?.zoomOut()}
                 >
                   <ZoomOut className="w-4 h-4" />
                 </Button>
               </div>

               {/* Map Style Selector */}
               <div className="absolute top-4 right-4 z-10">
                 <Select value={selectedLayer} onValueChange={handleMapStyleChange}>
                   <SelectTrigger className="w-32 bg-white/90 backdrop-blur">
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="liberty">Liberty</SelectItem>
                     <SelectItem value="bright">Bright</SelectItem>
                     <SelectItem value="positron">Positron</SelectItem>
                     <SelectItem value="3d">3D</SelectItem>
                   </SelectContent>
                 </Select>
               </div>

               {/* Enhanced Legend */}
               <div className="absolute top-16 right-4 bg-white/95 backdrop-blur rounded-lg p-4 space-y-3 shadow-lg">
                 <h4 className="font-semibold text-sm border-b pb-2">Map Legend</h4>
                 <div className="space-y-2">
                   <div className="flex items-center space-x-2">
                     <div className="w-3 h-3 bg-destructive rounded-full"></div>
                     <span className="text-xs">Critical Issues</span>
                   </div>
                   <div className="flex items-center space-x-2">
                     <div className="w-3 h-3 bg-success rounded-full"></div>
                     <span className="text-xs">Verified Reports</span>
                   </div>
                   <div className="flex items-center space-x-2">
                     <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                     <span className="text-xs">Resolved Issues</span>
                   </div>
                 </div>
                 <div className="pt-2 border-t">
                   <div className="flex items-center space-x-2">
                     <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                     <span className="text-xs">Protected Areas</span>
                   </div>
                   <div className="flex items-center space-x-2">
                     <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                     <span className="text-xs">Marine Reserves</span>
                   </div>
                 </div>
               </div>

               {/* Selected Report Popup */}
               {selectedReport && (
                 <div className="absolute bottom-20 left-4 right-4 bg-white rounded-lg shadow-xl p-4 max-w-sm border border-border z-20">
                   <div className="flex items-start justify-between mb-3">
                     <h4 className="font-semibold text-primary">{selectedReport.title}</h4>
                     <Button 
                       variant="ghost" 
                       size="sm" 
                       onClick={() => setSelectedReport(null)}
                       className="h-6 w-6 p-0 hover:bg-muted"
                     >
                       ×
                     </Button>
                   </div>
                   <p className="text-sm text-muted-foreground mb-3">{selectedReport.description}</p>
                   <div className="space-y-2">
                     <div className="flex items-center justify-between text-xs">
                       <span className="text-muted-foreground">Reporter:</span>
                       <span className="font-medium">{selectedReport.reporter}</span>
                     </div>
                     <div className="flex items-center justify-between text-xs">
                       <span className="text-muted-foreground">Date:</span>
                       <Badge variant="outline" className="text-xs">{selectedReport.date}</Badge>
                     </div>
                     <div className="flex items-center justify-between text-xs">
                       <span className="text-muted-foreground">Evidence:</span>
                       <div className="flex space-x-1">
                         {selectedReport.evidence.map((item, idx) => (
                           <Badge key={idx} variant="secondary" className="text-xs">
                             {item}
                           </Badge>
                         ))}
                       </div>
                     </div>
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