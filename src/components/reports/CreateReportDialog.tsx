import { useState } from "react";
import { useReports } from "@/hooks/useReports";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, MapPin } from "lucide-react";

export function CreateReportDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    report_type: "" as "illegal_cutting" | "pollution" | "dumping" | "construction" | "other",
    priority: "medium" as "low" | "medium" | "high" | "critical",
    latitude: 0,
    longitude: 0,
    location_name: "",
  });

  const { createReport, isCreating } = useReports();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.report_type) return;

    createReport({ ...formData, status: 'pending' as const });
    setOpen(false);
    setFormData({
      title: "",
      description: "",
      report_type: "" as any,
      priority: "medium",
      latitude: 0,
      longitude: 0,
      location_name: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-ocean hover:shadow-glow transition-smooth">
          <Plus className="w-4 h-4 mr-2" />
          New Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
            Create New Report
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Report Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Brief description of the issue"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="report_type">Issue Type *</Label>
              <Select value={formData.report_type} onValueChange={(value: any) => setFormData(prev => ({ ...prev, report_type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="illegal_cutting">Illegal Cutting</SelectItem>
                  <SelectItem value="pollution">Pollution</SelectItem>
                  <SelectItem value="dumping">Waste Dumping</SelectItem>
                  <SelectItem value="construction">Illegal Construction</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Provide detailed information about the incident..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select value={formData.priority} onValueChange={(value: any) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location_name">Location Name</Label>
              <Input
                id="location_name"
                value={formData.location_name}
                onChange={(e) => setFormData(prev => ({ ...prev, location_name: e.target.value }))}
                placeholder="e.g., Sundarbans Delta, Zone A"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData(prev => ({ ...prev, latitude: parseFloat(e.target.value) || 0 }))}
                placeholder="0.000000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData(prev => ({ ...prev, longitude: parseFloat(e.target.value) || 0 }))}
                placeholder="0.000000"
              />
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                onClick={getCurrentLocation}
                className="w-full"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Get Current Location
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || !formData.title || !formData.description || !formData.report_type}
              className="bg-gradient-ocean hover:shadow-glow transition-smooth"
            >
              {isCreating ? "Creating..." : "Create Report"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}