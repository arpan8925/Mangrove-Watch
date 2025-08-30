import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Trophy,
  Medal,
  Award,
  Star,
  Crown,
  Search,
  Filter,
  Calendar,
  MapPin,
  TrendingUp
} from "lucide-react";

export default function Leaderboard() {
  const leaderboardData = [
    {
      rank: 1,
      name: "John Fisher",
      location: "Sundarbans, Bangladesh",
      points: 1250,
      reports: 23,
      verified: 21,
      badge: "Guardian",
      avatar: "JF",
      streak: 15,
      lastActive: "2 hours ago",
      monthlyGrowth: "+45"
    },
    {
      rank: 2,
      name: "Maria Santos",
      location: "Manaus, Brazil", 
      points: 980,
      reports: 18,
      verified: 16,
      badge: "Protector",
      avatar: "MS",
      streak: 12,
      lastActive: "5 hours ago",
      monthlyGrowth: "+38"
    },
    {
      rank: 3,
      name: "David Kim",
      location: "Jeju Island, South Korea",
      points: 845,
      reports: 15,
      verified: 14,
      badge: "Scout",
      avatar: "DK",
      streak: 8,
      lastActive: "1 day ago",
      monthlyGrowth: "+22"
    },
    {
      rank: 4,
      name: "Sarah Wilson",
      location: "Everglades, USA",
      points: 720,
      reports: 12,
      verified: 11,
      badge: "Watcher",
      avatar: "SW",
      streak: 6,
      lastActive: "3 hours ago",
      monthlyGrowth: "+15"
    },
    {
      rank: 5,
      name: "Ahmed Hassan",
      location: "Red Sea, Egypt",
      points: 695,
      reports: 14,
      verified: 12,
      badge: "Explorer",
      avatar: "AH",
      streak: 4,
      lastActive: "6 hours ago",
      monthlyGrowth: "+18"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{rank}</div>;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Guardian": return "bg-gradient-ocean text-white";
      case "Protector": return "bg-gradient-mangrove text-white";
      case "Scout": return "bg-gradient-sunset text-white";
      case "Explorer": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-poppins bg-gradient-ocean bg-clip-text text-transparent">
            Community Leaderboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Celebrate our conservation heroes and their impact
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select defaultValue="monthly">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">This Week</SelectItem>
              <SelectItem value="monthly">This Month</SelectItem>
              <SelectItem value="quarterly">This Quarter</SelectItem>
              <SelectItem value="yearly">This Year</SelectItem>
              <SelectItem value="alltime">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search community members..." 
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="asia">Asia Pacific</SelectItem>
                <SelectItem value="americas">Americas</SelectItem>
                <SelectItem value="africa">Africa</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Badge Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Badges</SelectItem>
                <SelectItem value="guardian">Guardian</SelectItem>
                <SelectItem value="protector">Protector</SelectItem>
                <SelectItem value="scout">Scout</SelectItem>
                <SelectItem value="watcher">Watcher</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Top 3 Podium */}
        <Card className="lg:col-span-3 shadow-soft">
          <CardHeader>
            <CardTitle className="font-poppins flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-accent" />
              Top Contributors
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Podium Visual */}
            <div className="flex items-end justify-center space-x-8 mb-8">
              {/* Second Place */}
              <div className="text-center">
                <div className="w-20 h-16 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-lg flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <Avatar className="w-16 h-16 mx-auto mb-2 ring-4 ring-gray-300">
                  <AvatarFallback className="bg-gradient-mangrove text-white text-lg">
                    {leaderboardData[1].avatar}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{leaderboardData[1].name}</h3>
                <p className="text-sm text-muted-foreground">{leaderboardData[1].points} pts</p>
              </div>

              {/* First Place */}
              <div className="text-center">
                <div className="w-24 h-20 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-t-lg flex items-center justify-center mb-2">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <Avatar className="w-20 h-20 mx-auto mb-2 ring-4 ring-yellow-400">
                  <AvatarFallback className="bg-gradient-ocean text-white text-xl">
                    {leaderboardData[0].avatar}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">{leaderboardData[0].name}</h3>
                <p className="text-sm text-muted-foreground">{leaderboardData[0].points} pts</p>
                <Badge className="bg-gradient-ocean text-white mt-1">
                  {leaderboardData[0].badge}
                </Badge>
              </div>

              {/* Third Place */}
              <div className="text-center">
                <div className="w-20 h-12 bg-gradient-to-b from-amber-500 to-amber-600 rounded-t-lg flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <Avatar className="w-16 h-16 mx-auto mb-2 ring-4 ring-amber-500">
                  <AvatarFallback className="bg-gradient-sunset text-white text-lg">
                    {leaderboardData[2].avatar}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{leaderboardData[2].name}</h3>
                <p className="text-sm text-muted-foreground">{leaderboardData[2].points} pts</p>
              </div>
            </div>

            {/* Detailed Ranking */}
            <div className="space-y-4">
              {leaderboardData.map((member) => (
                <div key={member.rank} className="flex items-center justify-between p-4 border border-border rounded-lg hover-lift">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10">
                      {getRankIcon(member.rank)}
                    </div>
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-ocean text-white">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{member.name}</h4>
                        <Badge className={getBadgeColor(member.badge)}>
                          {member.badge}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {member.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {member.lastActive}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{member.points}</div>
                    <div className="text-sm text-muted-foreground">points</div>
                    <div className="flex items-center text-xs text-success">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {member.monthlyGrowth} this month
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="font-poppins text-lg">Monthly Leaders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-gradient-ocean rounded-lg text-white">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold">Most Reports</h3>
                <p className="text-sm opacity-90">John Fisher</p>
                <p className="text-xs opacity-75">23 reports</p>
              </div>
              <div className="text-center p-4 bg-gradient-mangrove rounded-lg text-white">
                <Star className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold">Best Accuracy</h3>
                <p className="text-sm opacity-90">Maria Santos</p>
                <p className="text-xs opacity-75">96% verified</p>
              </div>
              <div className="text-center p-4 bg-gradient-sunset rounded-lg text-white">
                <Award className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold">Longest Streak</h3>
                <p className="text-sm opacity-90">John Fisher</p>
                <p className="text-xs opacity-75">15 days</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="font-poppins text-lg">Your Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Rank</span>
                <span className="font-semibold">#47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Points</span>
                <span className="font-semibold">285</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Reports Made</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Accuracy Rate</span>
                <span className="font-semibold">87%</span>
              </div>
              <Button className="w-full mt-4 bg-gradient-ocean">
                View My Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}