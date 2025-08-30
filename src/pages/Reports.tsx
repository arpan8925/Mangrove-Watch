import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateReportDialog } from "@/components/reports/CreateReportDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search,
  Filter,
  MapPin, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Download,
  Plus,
  MoreHorizontal
} from "lucide-react";

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const reports = [
    {
      id: "R001",
      title: "Illegal mangrove cutting detected",
      description: "Large scale cutting operation observed in protected zone",
      location: "Sundarbans Delta, Sector A-7",
      coordinates: "22.3511° N, 89.0425° E",
      status: "pending",
      priority: "critical",
      reporter: "John Fisher",
      reporterType: "Local Fisherman",
      submittedAt: "2024-01-15T10:30:00",
      aiScore: 95,
      category: "illegal_cutting",
      evidence: ["photo", "gps"],
      assignedTo: "Forest Officer Sarah"
    },
    {
      id: "R002",
      title: "Plastic waste accumulation",
      description: "Large amounts of plastic debris washing up on mangrove shores",
      location: "Coastal Bay Area, Zone B-3",
      coordinates: "25.2744° N, 55.2962° E",
      status: "verified",
      priority: "high",
      reporter: "Maria Santos",
      reporterType: "Environmental Volunteer",
      submittedAt: "2024-01-14T14:20:00",
      aiScore: 87,
      category: "pollution",
      evidence: ["photo", "video"],
      assignedTo: "Cleanup Team Alpha"
    },
    {
      id: "R003",
      title: "Construction near protected area",
      description: "Unauthorized construction activities affecting mangrove ecosystem",
      location: "Everglades National Park, Section C-2",
      coordinates: "25.4815° N, 80.6081° W",
      status: "resolved",
      priority: "medium",
      reporter: "David Kim",
      reporterType: "Park Ranger",
      submittedAt: "2024-01-12T09:15:00",
      aiScore: 78,
      category: "construction",
      evidence: ["photo", "document"],
      assignedTo: "Legal Team",
      resolvedAt: "2024-01-14T16:30:00"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-warning border-warning"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "verified":
        return <Badge className="bg-success text-success-foreground"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>;
      case "resolved":
        return <Badge variant="secondary"><CheckCircle className="w-3 h-3 mr-1" />Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "high":
        return <Badge className="bg-accent text-accent-foreground">High</Badge>;
      case "medium":
        return <Badge variant="default">Medium</Badge>;
      case "low":
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getAIScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-poppins bg-gradient-ocean bg-clip-text text-transparent">
            Reports Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all conservation reports from the community
          </p>
        </div>
        <CreateReportDialog />
      </div>

      {/* Filters */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search reports by title, location, or reporter..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
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
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="pending">Pending (12)</TabsTrigger>
          <TabsTrigger value="verified">Verified (8)</TabsTrigger>
          <TabsTrigger value="resolved">Resolved (127)</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="hover-lift shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold font-poppins mb-2">
                          {report.title}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {report.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(report.status)}
                        {getPriorityBadge(report.priority)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-primary" />
                          <span className="text-sm">{report.location}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{report.coordinates}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Reporter</p>
                        <div className="flex items-center">
                          <Avatar className="w-6 h-6 mr-2">
                            <AvatarFallback className="text-xs bg-gradient-ocean text-white">
                              {report.reporter.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{report.reporter}</p>
                            <p className="text-xs text-muted-foreground">{report.reporterType}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">AI Validation</p>
                        <div className="flex items-center">
                          <div className={`text-lg font-bold ${getAIScoreColor(report.aiScore)}`}>
                            {report.aiScore}%
                          </div>
                          <span className="text-sm text-muted-foreground ml-2">confidence</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Submitted</p>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(report.submittedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          {report.evidence.map((type) => (
                            <Badge key={type} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Assigned to: {report.assignedTo}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending">
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">12 Pending Reports</h3>
            <p className="text-muted-foreground">These reports are awaiting AI validation and assignment.</p>
          </div>
        </TabsContent>

        <TabsContent value="verified">
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">8 Verified Reports</h3>
            <p className="text-muted-foreground">These reports have been validated and are in progress.</p>
          </div>
        </TabsContent>

        <TabsContent value="resolved">
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">127 Resolved Reports</h3>
            <p className="text-muted-foreground">These reports have been successfully addressed.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}