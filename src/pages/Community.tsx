import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search,
  Trophy,
  Star,
  Award,
  Users,
  MapPin,
  Calendar,
  TrendingUp,
  Gift,
  Target
} from "lucide-react";

export default function Community() {
  const topContributors = [
    {
      id: 1,
      name: "John Fisher",
      location: "Sundarbans, Bangladesh",
      points: 1250,
      reports: 23,
      verified: 21,
      rank: 1,
      badge: "Guardian",
      joinedDate: "2023-03-15",
      achievements: ["First Report", "100 Points", "Verified Reporter"]
    },
    {
      id: 2,
      name: "Maria Santos",
      location: "Manaus, Brazil",
      points: 980,
      reports: 18,
      verified: 16,
      rank: 2,
      badge: "Protector",
      joinedDate: "2023-05-20",
      achievements: ["Quick Responder", "Photo Expert", "Community Leader"]
    },
    {
      id: 3,
      name: "David Kim",
      location: "Jeju Island, South Korea",
      points: 845,
      reports: 15,
      verified: 14,
      rank: 3,
      badge: "Scout",
      joinedDate: "2023-07-10",
      achievements: ["Consistent Reporter", "Local Hero", "Data Accuracy"]
    },
    {
      id: 4,
      name: "Sarah Wilson",
      location: "Everglades, USA",
      points: 720,
      reports: 12,
      verified: 11,
      rank: 4,
      badge: "Watcher",
      joinedDate: "2023-09-05",
      achievements: ["New Member", "First Verification"]
    }
  ];

  const communityStats = [
    { label: "Total Members", value: "3,856", icon: Users, change: "+12%" },
    { label: "Active This Month", value: "1,247", icon: TrendingUp, change: "+8%" },
    { label: "Reports Submitted", value: "5,673", icon: Target, change: "+15%" },
    { label: "Points Awarded", value: "127,890", icon: Star, change: "+22%" }
  ];

  const recentActivities = [
    {
      user: "John Fisher",
      action: "submitted a report",
      target: "Illegal cutting in Zone A-7",
      time: "2 hours ago",
      points: "+50"
    },
    {
      user: "Maria Santos",
      action: "earned badge",
      target: "Community Leader",
      time: "4 hours ago",
      points: "+100"
    },
    {
      user: "David Kim",
      action: "report verified",
      target: "Construction near mangrove",
      time: "6 hours ago",
      points: "+25"
    },
    {
      user: "Sarah Wilson",
      action: "joined the community",
      target: "Welcome!",
      time: "1 day ago",
      points: "+10"
    }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Guardian": return "bg-gradient-ocean text-white";
      case "Protector": return "bg-gradient-mangrove text-white";
      case "Scout": return "bg-gradient-sunset text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-poppins bg-gradient-ocean bg-clip-text text-transparent">
            Community Hub
          </h1>
          <p className="text-muted-foreground mt-1">
            Engage with conservation heroes and track community impact
          </p>
        </div>
        <Button className="bg-gradient-ocean hover:shadow-glow transition-smooth">
          <Gift className="w-4 h-4 mr-2" />
          Reward Contributors
        </Button>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {communityStats.map((stat) => (
          <Card key={stat.label} className="hover-lift shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold font-poppins">{stat.value}</p>
                  <p className="text-sm text-success">{stat.change} this month</p>
                </div>
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboard */}
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-poppins flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-accent" />
                Community Leaderboard
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search members..." 
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {topContributors.map((contributor) => (
              <div key={contributor.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover-lift">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-ocean text-white rounded-full font-bold">
                    {contributor.rank}
                  </div>
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-mangrove text-white">
                      {contributor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{contributor.name}</h4>
                      <Badge className={getBadgeColor(contributor.badge)}>
                        <Award className="w-3 h-3 mr-1" />
                        {contributor.badge}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {contributor.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Joined {new Date(contributor.joinedDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {contributor.achievements.slice(0, 2).map((achievement) => (
                        <Badge key={achievement} variant="outline" className="text-xs">
                          {achievement}
                        </Badge>
                      ))}
                      {contributor.achievements.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{contributor.achievements.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{contributor.points}</div>
                  <div className="text-sm text-muted-foreground">points</div>
                  <div className="text-xs text-muted-foreground">
                    {contributor.reports} reports • {contributor.verified} verified
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-poppins">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs bg-gradient-ocean text-white">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    <Badge variant="secondary" className="text-xs">
                      {activity.points} pts
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Gamification Section */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="font-poppins flex items-center">
            <Star className="w-5 h-5 mr-2 text-accent" />
            Achievements & Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="badges" className="w-full">
            <TabsList>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>
            
            <TabsContent value="badges" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { name: "First Report", description: "Submit your first report", earned: true },
                  { name: "Guardian", description: "100+ verified reports", earned: true },
                  { name: "Quick Response", description: "Report within 1 hour", earned: false },
                  { name: "Photo Expert", description: "High-quality evidence", earned: true },
                  { name: "Community Leader", description: "Help 10+ new members", earned: false },
                  { name: "Consistency", description: "Report for 30 days straight", earned: false }
                ].map((badge) => (
                  <div key={badge.name} className={`p-4 border rounded-lg text-center ${badge.earned ? 'bg-success-light border-success' : 'bg-muted/50 border-muted'}`}>
                    <Award className={`w-8 h-8 mx-auto mb-2 ${badge.earned ? 'text-success' : 'text-muted-foreground'}`} />
                    <h4 className="font-medium text-sm">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="challenges" className="mt-6">
              <div className="space-y-4">
                {[
                  { title: "Weekly Reporter", description: "Submit 5 reports this week", progress: 3, target: 5, reward: "50 points" },
                  { title: "Area Explorer", description: "Report from 3 different zones", progress: 1, target: 3, reward: "75 points" },
                  { title: "Quality Control", description: "Maintain 90% verification rate", progress: 87, target: 90, reward: "100 points" }
                ].map((challenge) => (
                  <div key={challenge.title} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{challenge.title}</h4>
                      <Badge variant="outline">{challenge.reward}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-ocean h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {challenge.progress} / {challenge.target} completed
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="rewards" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Coffee Shop Voucher", cost: 100, available: true },
                  { name: "Eco-friendly T-shirt", cost: 250, available: true },
                  { name: "Tree Planting Certificate", cost: 500, available: false },
                  { name: "Conservation Workshop", cost: 750, available: true },
                  { name: "Mangrove Tour Guide", cost: 1000, available: false },
                  { name: "Environmental Award", cost: 1500, available: false }
                ].map((reward) => (
                  <div key={reward.name} className={`p-4 border rounded-lg ${reward.available ? 'border-border' : 'border-muted bg-muted/20'}`}>
                    <Gift className={`w-8 h-8 mb-2 ${reward.available ? 'text-accent' : 'text-muted-foreground'}`} />
                    <h4 className="font-medium">{reward.name}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">{reward.cost} points</span>
                      <Button 
                        size="sm" 
                        variant={reward.available ? "default" : "outline"}
                        disabled={!reward.available}
                      >
                        {reward.available ? "Redeem" : "Locked"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}