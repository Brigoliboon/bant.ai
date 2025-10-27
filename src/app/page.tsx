'use client'
import { useState, useEffect } from "react";
import { useIsMobile } from "./components/ResponsiveWrapper";
import { MobileApp } from "./components/mobile/MobileApp";
import { SentinelXSidebar } from "./components/SentinelXSidebar";
import { DisasterAlertCards } from "./components/DisasterAlertCards";
import { DisasterMap } from "./components/DisasterMap";
import { VoiceChatBot } from "./components/VoiceChatBot";
import { Spline3D } from "./components/Spline3D";
import { SensorFeedView } from "./components/SensorFeedView";
import { AIPredictionsView } from "./components/AIPredictionsView";
import { CommunityReportsView } from "./components/CommunityReportsView";
import { OfflineModeIndicator } from "./components/OfflineModeIndicator";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { ScrollArea } from "./components/ui/scroll-area";
import {
  Mic,
  Download,
  FileText,
  Activity,
  Users,
  Globe,
  TrendingUp,
  Clock,
  AlertTriangle,
  Eye,
  BarChart3,
  Satellite,
} from "lucide-react";

interface SystemStats {
  activeThreats: number;
  evacuationZones: number;
  responseTeams: number;
  communicationStatus: string;
  weatherStationHealth: string;
  satelliteCoverage: string;
  dataLatency: string;
  systemLoad: string;
}

interface ThreatAssessment {
  floodRisk: { level: 'low'|'medium'|'high'|'critical', confidence: number };
  landslideRisk: { level: 'low'|'medium'|'high'|'critical', confidence: number };
  fireRisk: { level: 'low'|'medium'|'high'|'critical', confidence: number };
  heatwaveRisk: { level: 'low'|'medium'|'high'|'critical', confidence: number };
  lastUpdated: string;
}

interface ResourceStatus {
  emergencyTeams: { deployed: number, available: number, responding: number };
  vehicles: { ambulances: number, firetrucks: number, rescue: number };
  shelters: { capacity: number, occupied: number, available: number };
  supplies: { food: number, water: number, medical: number };
}

interface WeatherStation {
  id: string;
  location: string;
  status: 'online'|'offline'|'maintenance';
  readings: {
    temperature: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
    windDirection: number;
    pressure: number;
  };
  lastUpdate: string;
  batteryLevel: number;
  signalStrength: number;
}

const mockSystemStats: SystemStats = {
  activeThreats: 12,
  evacuationZones: 3,
  responseTeams: 8,
  communicationStatus: "Operational",
  weatherStationHealth: "95%",
  satelliteCoverage: "100%",
  dataLatency: "2.3s",
  systemLoad: "78%",
};

const mockThreatAssessment: ThreatAssessment = {
  floodRisk: { level: 'high', confidence: 87 },
  landslideRisk: { level: 'medium', confidence: 65 },
  fireRisk: { level: 'low', confidence: 23 },
  heatwaveRisk: { level: 'critical', confidence: 94 },
  lastUpdated: "1 min ago"
};

// Resource status data - will be used in future components
// const mockResourceStatus: ResourceStatus = {
//   emergencyTeams: { deployed: 8, available: 4, responding: 3 },
//   vehicles: { ambulances: 5, firetrucks: 3, rescue: 2 },
//   shelters: { capacity: 500, occupied: 120, available: 380 },
//   supplies: { food: 85, water: 92, medical: 78 }
// };

const mockWeatherStations: WeatherStation[] = [
  {
    id: "WS-001",
    location: "Central Valley",
    status: "online",
    readings: { temperature: 32.5, humidity: 85, rainfall: 45.2, windSpeed: 15, windDirection: 180, pressure: 1013.2 },
    lastUpdate: "30 secs ago",
    batteryLevel: 95,
    signalStrength: 87
  },
  {
    id: "WS-002", 
    location: "Riverside",
    status: "offline",
    readings: { temperature: 0, humidity: 0, rainfall: 0, windSpeed: 0, windDirection: 0, pressure: 0 },
    lastUpdate: "2 hours ago",
    batteryLevel: 0,
    signalStrength: 0
  },
  {
    id: "WS-003",
    location: "Northern District", 
    status: "online",
    readings: { temperature: 35.2, humidity: 72, rainfall: 12.8, windSpeed: 8, windDirection: 270, pressure: 1010.5 },
    lastUpdate: "45 secs ago",
    batteryLevel: 87,
    signalStrength: 92
  }
];

const mockTimeline = [
  { id: 1, time: "14:32", event: "Flash flood alert issued for Central Valley", severity: "high", type: "flood" },
  { id: 2, time: "14:15", event: "Heatwave warning updated for Metropolitan Area", severity: "medium", type: "heat" },
  { id: 3, time: "13:58", event: "Misinformation detected: False evacuation order", severity: "low", type: "info" },
  { id: 4, time: "13:45", event: "Landslide risk detected in Northern Districts - heavy rain and soil saturation", severity: "critical", type: "fire" },
  { id: 5, time: "13:30", event: "Community report verified: Road flooding on Highway 101", severity: "medium", type: "flood" },
];

// Desktop App Component
function DesktopApp() {
  const [activeView, setActiveView] = useState("dashboard");
  const [isVoiceBotOpen, setIsVoiceBotOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [offlineData] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  const renderMainContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="sentinelx-glass border-sentinelx-glass-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-500/20">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Threats</p>
                      <p className="text-2xl font-bold text-white">{mockSystemStats.activeThreats}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="sentinelx-glass border-sentinelx-glass-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/20">
                      <Globe className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Evacuation Zones</p>
                      <p className="text-2xl font-bold text-white">{mockSystemStats.evacuationZones}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="sentinelx-glass border-sentinelx-glass-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Response Teams</p>
                      <p className="text-2xl font-bold text-white">{mockSystemStats.responseTeams}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="sentinelx-glass border-sentinelx-glass-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <Activity className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">System Load</p>
                      <p className="text-2xl font-bold text-white">{mockSystemStats.systemLoad}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Map */}
              <div className="lg:col-span-2">
                <DisasterMap />
              </div>

              {/* Right Column - Enhanced Components */}
              <div className="space-y-6">
                {/* Threat Assessment Matrix */}
                <Card className="sentinelx-glass border-sentinelx-glass-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-sentinelx-alert-yellow" />
                      Threat Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-red-400 font-medium">Flood Risk</span>
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                            {mockThreatAssessment.floodRisk.level.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Confidence: {mockThreatAssessment.floodRisk.confidence}%
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-orange-400 font-medium">Landslide</span>
                          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                            {mockThreatAssessment.landslideRisk.level.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Confidence: {mockThreatAssessment.landslideRisk.confidence}%
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-green-400 font-medium">Fire Risk</span>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                            {mockThreatAssessment.fireRisk.level.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Confidence: {mockThreatAssessment.fireRisk.confidence}%
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-red-400 font-medium">Heatwave</span>
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                            {mockThreatAssessment.heatwaveRisk.level.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Confidence: {mockThreatAssessment.heatwaveRisk.confidence}%
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground text-center pt-2 border-t border-sentinelx-glass-border">
                      Last updated: {mockThreatAssessment.lastUpdated}
                    </div>
                  </CardContent>
                </Card>

                {/* Resource Allocation */}
                {/* <Card className="sentinelx-glass border-sentinelx-glass-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="h-4 w-4 text-sentinelx-alert-yellow" />
                      Resource Allocation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Emergency Teams</span>
                        <div className="flex gap-2 text-xs">
                          <span className="text-green-400">{mockResourceStatus.emergencyTeams.deployed} deployed</span>
                          <span className="text-blue-400">{mockResourceStatus.emergencyTeams.available} available</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Vehicles</span>
                        <div className="flex gap-2 text-xs">
                          <span className="text-white">{mockResourceStatus.vehicles.ambulances} ambulances</span>
                          <span className="text-white">{mockResourceStatus.vehicles.firetrucks} fire trucks</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Shelters</span>
                        <div className="flex gap-2 text-xs">
                          <span className="text-orange-400">{mockResourceStatus.shelters.occupied} occupied</span>
                          <span className="text-green-400">{mockResourceStatus.shelters.available} available</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Supplies</span>
                        <div className="flex gap-2 text-xs">
                          <span className="text-white">Food: {mockResourceStatus.supplies.food}%</span>
                          <span className="text-white">Water: {mockResourceStatus.supplies.water}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}

                {/* Weather Station Network */}
                <Card className="sentinelx-glass border-sentinelx-glass-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white flex items-center gap-2">
                      <Satellite className="h-4 w-4 text-sentinelx-alert-yellow" />
                      Weather Stations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockWeatherStations.map((station) => (
                      <div key={station.id} className="p-3 rounded-lg bg-sentinelx-glass-bg border border-sentinelx-glass-border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              station.status === 'online' ? 'bg-green-400' : 
                              station.status === 'offline' ? 'bg-red-400' : 'bg-yellow-400'
                            }`}></div>
                            <span className="text-sm text-white font-medium">{station.location}</span>
                          </div>
                          <Badge className={`text-xs ${
                            station.status === 'online' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            station.status === 'offline' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                            'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          }`}>
                            {station.status}
                          </Badge>
                        </div>
                        
                        {station.status === 'online' && (
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Temp:</span>
                              <span className="text-white">{station.readings.temperature}°C</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Humidity:</span>
                              <span className="text-white">{station.readings.humidity}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Rainfall:</span>
                              <span className="text-white">{station.readings.rainfall}mm</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Wind:</span>
                              <span className="text-white">{station.readings.windSpeed} km/h</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-sentinelx-glass-border">
                          <span className="text-xs text-muted-foreground">{station.lastUpdate}</span>
                          {station.status === 'online' && (
                            <div className="flex gap-2 text-xs">
                              <span className="text-green-400">Battery: {station.batteryLevel}%</span>
                              <span className="text-blue-400">Signal: {station.signalStrength}%</span>
                            </div>
                          )}
                        </div>
                    </div>
                    ))}
                  </CardContent>
                </Card>

                {/* System Status */}
                <Card className="sentinelx-glass border-sentinelx-glass-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-sentinelx-alert-yellow" />
                      System Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Communication</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {mockSystemStats.communicationStatus}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Weather Stations</span>
                        <span className="text-white">{mockSystemStats.weatherStationHealth}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Satellite Coverage</span>
                        <span className="text-white">{mockSystemStats.satelliteCoverage}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Data Latency</span>
                        <span className="text-white">{mockSystemStats.dataLatency}</span>
                    </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity Timeline */}
                <Card className="sentinelx-glass border-sentinelx-glass-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <Clock className="h-4 w-4 text-sentinelx-alert-yellow" />
                        Recent Activity
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="text-sentinelx-alert-yellow hover:bg-sentinelx-alert-yellow/20">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      <div className="space-y-3">
                        {mockTimeline.map((item) => (
                          <div key={item.id} className="flex gap-3 p-2 rounded-lg hover:bg-sentinelx-glass-bg transition-colors">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-sentinelx-alert-yellow mt-2"></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white">{item.event}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-muted-foreground">{item.time}</span>
                                <Badge 
                                  className={`text-xs px-2 py-0 ${
                                    item.severity === 'critical' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                    item.severity === 'high' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                                    item.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                                    'bg-green-500/20 text-green-400 border-green-500/30'
                                  }`}
                                >
                                  {item.severity}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Alert Cards */}
            <DisasterAlertCards />

            {/* Export Controls */}
            <Card className="sentinelx-glass border-sentinelx-glass-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Export Data</h3>
                    <p className="text-sm text-muted-foreground">Download current monitoring data and reports</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" className="bg-sentinelx-glass-bg border-sentinelx-glass-border hover:bg-sentinelx-alert-yellow/20">
                      <FileText className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                    <Button variant="secondary" className="bg-sentinelx-glass-bg border-sentinelx-glass-border hover:bg-sentinelx-alert-yellow/20">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "sensor-feed":
        return <SensorFeedView />;

      case "ai-predictions":
        return <AIPredictionsView />;

      case "satellite-feed":
        return (
          <div className="space-y-6">
            <Card className="sentinelx-glass border-sentinelx-glass-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Satellite className="h-4 w-4 text-sentinelx-alert-yellow" />
                  Live Satellite Feed
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96">
                  <Spline3D type="satellite" className="w-full h-full" interactive />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "misinformation":
        return (
          <div className="space-y-6">
            <Card className="sentinelx-glass border-sentinelx-glass-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-sentinelx-alert-yellow" />
                  Misinformation Network Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96">
                  <Spline3D type="network" className="w-full h-full" interactive />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "community-reports":
        return <CommunityReportsView />;

      case "flood-watch":
      case "heatwave-alert":
        return (
          <div className="flex items-center justify-center h-96">
            <Card className="sentinelx-glass border-sentinelx-glass-border p-8">
              <div className="text-center">
                <h2 className="text-xl text-white mb-2">
                  {activeView.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Module
                </h2>
                <p className="text-muted-foreground mb-4">
                  This specialized monitoring module is under development.
                </p>
                <Badge className="bg-sentinelx-alert-yellow/20 text-sentinelx-alert-yellow border-sentinelx-alert-yellow/30">
                  Coming Soon
                </Badge>
              </div>
            </Card>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-96">
            <Card className="sentinelx-glass border-sentinelx-glass-border p-8">
              <div className="text-center">
                <h2 className="text-xl text-white mb-2">Feature In Development</h2>
                <p className="text-muted-foreground">This feature is currently being developed.</p>
              </div>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-sentinelx-deep-blue dark flex">
      {/* Sidebar */}
      <SentinelXSidebar 
        activeView={activeView} 
        onViewChange={setActiveView}
        alertCount={5}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="sentinelx-glass border-b border-sentinelx-glass-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl text-white">
                {activeView === "dashboard" ? "Mission Control Dashboard" : 
                 activeView.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </h1>
              <p className="text-sm text-muted-foreground">
                {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <Activity className="h-3 w-3 mr-1" />
                All Systems Operational
              </Badge>
              <Button 
                onClick={() => setIsVoiceBotOpen(true)}
                className="bg-sentinelx-alert-yellow hover:bg-sentinelx-alert-yellow/80 text-black font-medium sentinelx-glow"
              >
                <Mic className="h-4 w-4 mr-2" />
                Voice Assistant
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {renderMainContent()}
        </div>
      </div>

      {/* Offline Mode Indicator */}
      <OfflineModeIndicator 
        isOnline={isOnline}
        offlineData={offlineData}
        onSync={() => {
          // Mock sync functionality
          console.log("Syncing offline data...");
        }}
      />

      {/* Voice Chatbot */}
      <VoiceChatBot 
        isOpen={isVoiceBotOpen} 
        onClose={() => setIsVoiceBotOpen(false)} 
      />

      {/* Floating Voice Button */}
      {!isVoiceBotOpen && (
        <Button
          onClick={() => setIsVoiceBotOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-sentinelx-alert-yellow hover:bg-sentinelx-alert-yellow/80 text-black shadow-lg sentinelx-glow z-40"
        >
          <Mic className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}

// Main App with Responsive Detection
export default function App() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileApp /> : <DesktopApp />;
}
