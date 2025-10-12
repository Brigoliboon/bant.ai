import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import {
  Users,
  MapPin,
  Clock,
  CheckCircle,
  X,
  AlertTriangle,
  Camera,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Filter,
  Download,
  Upload,
  Brain,
} from "lucide-react";

interface CommunityReport {
  id: string;
  title: string;
  description: string;
  category: "flood" | "landslide" | "fire" | "infrastructure" | "other";
  location: string;
  barangay: string;
  coordinates: { lat: number; lng: number };
  timestamp: Date;
  status: "pending" | "verified" | "false" | "investigating";
  severity: "low" | "medium" | "high" | "critical";
  reporter: {
    id: string;
    name: string;
    phone?: string;
  };
  images: string[];
  votes: {
    helpful: number;
    not_helpful: number;
  };
  aiAnalysis?: {
    confidence: number;
    riskScore: number;
    recommendation: string;
  };
}

const mockReports: CommunityReport[] = [
  {
    id: "report-001",
    title: "Road flooding on Highway 101",
    description: "Water level reaching car bumpers. Traffic severely impacted. Multiple vehicles stranded.",
    category: "flood",
    location: "Highway 101, Mile Marker 23",
    barangay: "Central Valley",
    coordinates: { lat: 14.5995, lng: 120.9842 },
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    status: "verified",
    severity: "high",
    reporter: {
      id: "user-001",
      name: "Juan Santos",
      phone: "+63 912 345 6789"
    },
    images: ["https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400"],
    votes: { helpful: 15, not_helpful: 2 },
    aiAnalysis: {
      confidence: 87,
      riskScore: 78,
      recommendation: "High flood risk confirmed. Evacuation recommended for low-lying areas."
    }
  },
  {
    id: "report-002",
    title: "Extreme heat affecting elderly",
    description: "Multiple elderly residents showing signs of heat exhaustion at community center.",
    category: "other",
    location: "Sunset Community Center",
    barangay: "Riverside",
    coordinates: { lat: 14.6042, lng: 120.9822 },
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    status: "investigating",
    severity: "critical",
    reporter: {
      id: "user-002",
      name: "Maria Garcia",
      phone: "+63 917 234 5678"
    },
    images: [],
    votes: { helpful: 23, not_helpful: 1 },
    aiAnalysis: {
      confidence: 92,
      riskScore: 85,
      recommendation: "Heat emergency protocol activated. Medical assistance dispatched."
    }
  },
  {
    id: "report-003",
    title: "False evacuation notice spreading",
    description: "Fake evacuation order being shared on social media for downtown area.",
    category: "other",
    location: "Downtown District",
    barangay: "Northern District",
    coordinates: { lat: 14.6091, lng: 120.9801 },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "false",
    severity: "medium",
    reporter: {
      id: "user-003",
      name: "Pedro Cruz",
      phone: "+63 918 345 6789"
    },
    images: [],
    votes: { helpful: 8, not_helpful: 12 },
    aiAnalysis: {
      confidence: 95,
      riskScore: 15,
      recommendation: "Misinformation detected. Official channels only for evacuation orders."
    }
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "flood": return "🌊";
    case "landslide": return "⛰️";
    case "fire": return "🔥";
    case "infrastructure": return "🏗️";
    default: return "⚠️";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "verified": return "bg-green-500/20 text-green-400 border-green-500/30";
    case "investigating": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "pending": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "false": return "bg-red-500/20 text-red-400 border-red-500/30";
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical": return "bg-red-500/20 text-red-400 border-red-500/30";
    case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "low": return "bg-green-500/20 text-green-400 border-green-500/30";
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

export function CommunityReportsView() {
  const [activeTab, setActiveTab] = useState("reports");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const formatTimeAgo = (timestamp: Date) => {
    const diffMs = currentTime - timestamp.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    
    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const filteredReports = mockReports.filter(report => {
    const statusMatch = filterStatus === "all" || report.status === filterStatus;
    const severityMatch = filterSeverity === "all" || report.severity === filterSeverity;
    return statusMatch && severityMatch;
  });

  const handleVote = (reportId: string, helpful: boolean) => {
    // Mock vote handling
    console.log(`Voted ${helpful ? 'helpful' : 'not helpful'} for report ${reportId}`);
  };

  const handleStatusChange = (reportId: string, newStatus: string) => {
    // Mock status change
    console.log(`Changed status for report ${reportId} to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sentinelx-alert-yellow/20">
            <Users className="h-5 w-5 text-sentinelx-alert-yellow" />
          </div>
          <div>
            <h2 className="text-xl text-white font-medium">Community Reports</h2>
            <p className="text-sm text-muted-foreground">Citizen reports and LGU verification system</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="bg-sentinelx-glass-bg border-sentinelx-glass-border">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Users className="h-3 w-3 mr-1" />
            {mockReports.length} Reports
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-sentinelx-glass-bg">
          <TabsTrigger value="reports" className="text-sm">All Reports</TabsTrigger>
          <TabsTrigger value="map" className="text-sm">Map View</TabsTrigger>
          <TabsTrigger value="analytics" className="text-sm">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          {/* Filters */}
          <Card className="sentinelx-glass border-sentinelx-glass-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-sentinelx-alert-yellow" />
                  <span className="text-sm text-white">Filters:</span>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-sentinelx-glass-bg border border-sentinelx-glass-border rounded px-3 py-1 text-white text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="investigating">Investigating</option>
                  <option value="false">False</option>
                </select>
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="bg-sentinelx-glass-bg border border-sentinelx-glass-border rounded px-3 py-1 text-white text-sm"
                >
                  <option value="all">All Severity</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Reports List */}
          <ScrollArea className="h-[500px]">
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <Card key={report.id} className="sentinelx-glass border-sentinelx-glass-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{getCategoryIcon(report.category)}</div>
                        <div className="flex-1">
                          <CardTitle className="text-white text-base">{report.title}</CardTitle>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {report.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTimeAgo(report.timestamp)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {report.reporter.name}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                        <Badge className={getSeverityColor(report.severity)}>
                          {report.severity}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Description */}
                    <p className="text-sm text-white">{report.description}</p>
                    
                    {/* Images */}
                    {report.images.length > 0 && (
                      <div className="flex gap-2">
                        {report.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Report ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* AI Analysis */}
                    {report.aiAnalysis && (
                      <div className="p-3 rounded-lg bg-sentinelx-glass-bg border border-sentinelx-glass-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="h-4 w-4 text-sentinelx-alert-yellow" />
                          <span className="text-sm text-sentinelx-alert-yellow">AI Analysis</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Confidence:</span>
                            <span className="text-white ml-2">{report.aiAnalysis.confidence}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Risk Score:</span>
                            <span className="text-white ml-2">{report.aiAnalysis.riskScore}%</span>
                          </div>
                        </div>
                        <p className="text-sm text-white mt-2">{report.aiAnalysis.recommendation}</p>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-sentinelx-glass-border">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleVote(report.id, true)}
                            className="text-green-400 hover:bg-green-500/20"
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {report.votes.helpful}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleVote(report.id, false)}
                            className="text-red-400 hover:bg-red-500/20"
                          >
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            {report.votes.not_helpful}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="text-sentinelx-alert-yellow">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        {report.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(report.id, "verified")}
                            className="bg-green-500/20 text-green-400 border-green-500/30"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verify
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <Card className="sentinelx-glass border-sentinelx-glass-border">
            <CardHeader>
              <CardTitle className="text-white">Report Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-sentinelx-alert-yellow mx-auto mb-4" />
                  <p className="text-white">Interactive map view</p>
                  <p className="text-sm text-muted-foreground">Map integration coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="sentinelx-glass border-sentinelx-glass-border">
              <CardContent className="p-4 text-center">
                <MessageSquare className="h-8 w-8 text-sentinelx-alert-yellow mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{mockReports.length}</div>
                <div className="text-sm text-muted-foreground">Total Reports</div>
              </CardContent>
            </Card>
            
            <Card className="sentinelx-glass border-sentinelx-glass-border">
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {mockReports.filter(r => r.status === "verified").length}
                </div>
                <div className="text-sm text-muted-foreground">Verified</div>
              </CardContent>
            </Card>
            
            <Card className="sentinelx-glass border-sentinelx-glass-border">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {mockReports.filter(r => r.status === "pending").length}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </CardContent>
            </Card>
            
            <Card className="sentinelx-glass border-sentinelx-glass-border">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {new Set(mockReports.map(r => r.reporter.id)).size}
                </div>
                <div className="text-sm text-muted-foreground">Active Reporters</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

