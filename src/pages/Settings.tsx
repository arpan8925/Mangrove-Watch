import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Database,
  Users,
  Globe,
  Smartphone,
  Mail,
  MapPin,
  Save,
  Download,
  Upload,
  Trash2,
  AlertTriangle
} from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-poppins bg-gradient-ocean bg-clip-text text-transparent">
            System Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure system preferences and administrative controls
          </p>
        </div>
        <Button className="bg-gradient-ocean hover:shadow-glow transition-smooth">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-primary" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="system-name">System Name</Label>
                  <Input id="system-name" defaultValue="Mangrove Watch CRM" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input id="organization" defaultValue="Global Conservation Network" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                      <SelectItem value="gmt">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="pt">Portuguese</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Geographic Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default-region">Default Region</Label>
                  <Select defaultValue="global">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="global">Global</SelectItem>
                      <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                      <SelectItem value="americas">Americas</SelectItem>
                      <SelectItem value="africa">Africa</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="coordinate-format">Coordinate Format</Label>
                  <Select defaultValue="decimal">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="decimal">Decimal Degrees</SelectItem>
                      <SelectItem value="dms">Degrees Minutes Seconds</SelectItem>
                      <SelectItem value="utm">UTM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-location">Auto-detect Location</Label>
                  <Switch id="auto-location" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="offline-maps">Enable Offline Maps</Label>
                  <Switch id="offline-maps" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-primary" />
                  Alert Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="critical-alerts">Critical Alerts</Label>
                    <p className="text-sm text-muted-foreground">Immediate threats requiring urgent response</p>
                  </div>
                  <Switch id="critical-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="report-notifications">New Report Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when new reports are submitted</p>
                  </div>
                  <Switch id="report-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ai-alerts">AI Detection Alerts</Label>
                    <p className="text-sm text-muted-foreground">Automated threat detection notifications</p>
                  </div>
                  <Switch id="ai-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="community-updates">Community Updates</Label>
                    <p className="text-sm text-muted-foreground">Weekly digest of community activities</p>
                  </div>
                  <Switch id="community-updates" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <Smartphone className="w-5 h-5 mr-2 text-primary" />
                  Delivery Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="email-notifications" defaultChecked />
                    <Input placeholder="admin@organization.com" className="flex-1" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sms-alerts">SMS Alerts (Critical Only)</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="sms-alerts" defaultChecked />
                    <Input placeholder="+1 (555) 123-4567" className="flex-1" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Browser and mobile app notifications</p>
                  </div>
                  <Switch id="push-notifications" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="alert-frequency">Alert Frequency</Label>
                  <Select defaultValue="immediate">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly Digest</SelectItem>
                      <SelectItem value="daily">Daily Summary</SelectItem>
                      <SelectItem value="weekly">Weekly Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  Authentication & Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                  </div>
                  <Switch id="two-factor" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-policy">Password Policy</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                      <SelectItem value="strong">Strong (12+ chars, mixed case, numbers)</SelectItem>
                      <SelectItem value="strict">Strict (16+ chars, special chars, no common passwords)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="login-logging">Log Login Attempts</Label>
                    <p className="text-sm text-muted-foreground">Track all authentication attempts</p>
                  </div>
                  <Switch id="login-logging" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <Database className="w-5 h-5 mr-2 text-primary" />
                  Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="data-encryption">Data Encryption at Rest</Label>
                    <p className="text-sm text-muted-foreground">Encrypt stored data</p>
                  </div>
                  <Switch id="data-encryption" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retention-period">Data Retention Period</Label>
                  <Select defaultValue="7years">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="3years">3 Years</SelectItem>
                      <SelectItem value="5years">5 Years</SelectItem>
                      <SelectItem value="7years">7 Years</SelectItem>
                      <SelectItem value="indefinite">Indefinite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="gdpr-compliance">GDPR Compliance Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable privacy protection features</p>
                  </div>
                  <Switch id="gdpr-compliance" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="audit-trail">Audit Trail</Label>
                    <p className="text-sm text-muted-foreground">Log all system changes</p>
                  </div>
                  <Switch id="audit-trail" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="font-poppins">API Integrations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Satellite Data API", status: "active", provider: "Planet Labs" },
                  { name: "Weather Service", status: "active", provider: "OpenWeather" },
                  { name: "Mapping Service", status: "active", provider: "Mapbox" },
                  { name: "SMS Gateway", status: "inactive", provider: "Twilio" }
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium">{integration.name}</h4>
                      <p className="text-sm text-muted-foreground">{integration.provider}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={integration.status === "active" ? "default" : "secondary"}>
                        {integration.status}
                      </Badge>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="font-poppins">External Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-service">AI Validation Service</Label>
                  <Input id="ai-service" placeholder="API endpoint URL" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backup-service">Cloud Backup Service</Label>
                  <Select defaultValue="aws">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aws">Amazon S3</SelectItem>
                      <SelectItem value="gcp">Google Cloud Storage</SelectItem>
                      <SelectItem value="azure">Azure Blob Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="analytics-service">Analytics Platform</Label>
                  <Input id="analytics-service" placeholder="Google Analytics ID" />
                </div>
                
                <Button className="w-full bg-gradient-ocean">
                  Test All Connections
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="font-poppins flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-approve">Auto-approve New Users</Label>
                  <p className="text-sm text-muted-foreground">Automatically approve community member registrations</p>
                </div>
                <Switch id="auto-approve" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="default-role">Default User Role</Label>
                <Select defaultValue="reporter">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reporter">Community Reporter</SelectItem>
                    <SelectItem value="verifier">Report Verifier</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-verification">Require Email Verification</Label>
                  <p className="text-sm text-muted-foreground">Users must verify email before accessing system</p>
                </div>
                <Switch id="email-verification" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-users">Maximum Active Users</Label>
                <Input id="max-users" type="number" placeholder="Unlimited" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <Database className="w-5 h-5 mr-2 text-primary" />
                  Backup Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-backup">Automatic Backups</Label>
                    <p className="text-sm text-muted-foreground">Enable scheduled system backups</p>
                  </div>
                  <Switch id="auto-backup" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retention-backups">Backup Retention</Label>
                  <Select defaultValue="30days">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">7 Days</SelectItem>
                      <SelectItem value="30days">30 Days</SelectItem>
                      <SelectItem value="90days">90 Days</SelectItem>
                      <SelectItem value="1year">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-gradient-ocean">
                    <Download className="w-4 h-4 mr-2" />
                    Create Backup
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    Restore
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="font-poppins">Recent Backups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { date: "2024-01-15 02:00", size: "2.4 GB", status: "success" },
                  { date: "2024-01-14 02:00", size: "2.3 GB", status: "success" },
                  { date: "2024-01-13 02:00", size: "2.3 GB", status: "success" },
                  { date: "2024-01-12 02:00", size: "2.2 GB", status: "failed" }
                ].map((backup, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">{backup.date}</p>
                      <p className="text-sm text-muted-foreground">{backup.size}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={backup.status === "success" ? "default" : "destructive"}>
                        {backup.status}
                      </Badge>
                      {backup.status === "success" && (
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}