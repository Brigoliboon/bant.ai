import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Spline3D } from "../Spline3D";
import {
  Waves,
  Thermometer,
  MessageSquareWarning,
  Satellite,
  MapPin,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Eye,
  Bell,
  Users,
} from "lucide-react";

interface MobileDashboardProps {
  onNavigate: (view: string) => void;
}

const alertData = [
  {
    id: "flood-001",
    type: "flood",
    title: "Satellite Analysis: Flash Flood Risk",
    region: "Barangay Central Valley",
    riskScore: 78,
    status: "high",
    trend: "up",
    affected: 12500,
    lastUpdate: "2 mins ago",
    description: "Heavy rainfall upstream, soil saturation at 91%",
    icon: Waves,
    color: "blue",
    sensorData: {
      rainfall: 45.2,
      waterLevel: 2.3,
      soilMoisture: 91,
      humidity: 85
    }
  },
  {
    id: "heat-001",
    type: "heat",
    title: "Heat Stress Alert",
    region: "Metro Area",
    riskScore: 45,
    status: "medium",
    trend: "stable",
    affected: 8900,
    lastUpdate: "5 mins ago",
    description: "Temperature 38°C, UV index extreme",
    icon: Thermometer,
    color: "orange",
  },
  {
    id: "misinfo-001",
    type: "misinformation",
    title: "Misinformation Detected",
    region: "Social Networks",
    riskScore: 23,
    status: "low",
    trend: "down",
    affected: 0,
    lastUpdate: "1 min ago",
    description: "3 flagged posts about false evacuation orders",
    icon: MessageSquareWarning,
    color: "purple",
  },
  {
    id: "sat-001",
    type: "satellite",
    title: "Thermal Anomaly",
    region: "Northern Districts",
    riskScore: 89,
    status: "critical",
    trend: "up",
    affected: 25000,
    lastUpdate: "30 secs ago",
    description: "Multiple heat sources detected via FIRMS",
    icon: Satellite,
    color: "red",
  },
];

const weatherData = {
  temperature: 38,
  humidity: 67,
  windSpeed: 12,
  uvIndex: "Extreme",
  airQuality: "Moderate",
  precipitation: 15,
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "critical": return "bg-red-500/20 text-red-400 border-red-500/30";
    case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "low": return "bg-green-500/20 text-green-400 border-green-500/30";
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

export function MobileDashboard({ onNavigate }: MobileDashboardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const criticalAlerts = alertData.filter(alert => alert.status === "critical" || alert.status === "high");

  return (
    <div className="min-h-screen bg-sentinelx-deep-blue pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 sentinelx-glass border-b border-sentinelx-glass-border p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg text-white font-medium">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Real-time monitoring</p>
          </div>
          <div className="flex items-center gap-2">
            {criticalAlerts.length > 0 && (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {criticalAlerts.length}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-sentinelx-alert-yellow hover:bg-sentinelx-alert-yellow/20"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="sentinelx-glass border border-sentinelx-glass-border rounded-lg p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <div>
                <p className="text-xs text-muted-foreground">Active Alerts</p>
                <p className="text-lg text-white font-medium">{alertData.length}</p>
              </div>
            </div>
          </div>
          <div className="sentinelx-glass border border-sentinelx-glass-border rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-xs text-muted-foreground">Affected</p>
                <p className="text-lg text-white font-medium">
                  {alertData.reduce((sum, alert) => sum + alert.affected, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Weather Card */}
        <Card className="sentinelx-glass border-sentinelx-glass-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-base">
              <Thermometer className="h-4 w-4 text-sentinelx-alert-yellow" />
              Current Weather
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Temperature</p>
                <p className="text-white font-medium">{weatherData.temperature}°C</p>
              </div>
              <div>
                <p className="text-muted-foreground">Humidity</p>
                <p className="text-white font-medium">{weatherData.humidity}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Wind</p>
                <p className="text-white font-medium">{weatherData.windSpeed} km/h</p>
              </div>
              <div>
                <p className="text-muted-foreground">UV Index</p>
                <p className="text-red-400 font-medium">{weatherData.uvIndex}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3D Heatmap */}
        <Card className="sentinelx-glass border-sentinelx-glass-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4 text-sentinelx-alert-yellow" />
                Risk Heatmap
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('heatmap')}
                className="text-sentinelx-alert-yellow hover:bg-sentinelx-alert-yellow/20"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-40">
              <Spline3D type="heatmap" className="w-full h-full" />
            </div>
          </CardContent>
        </Card>

        {/* Alert Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-white font-medium">Regional Alerts</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('alerts')}
              className="text-sentinelx-alert-yellow hover:bg-sentinelx-alert-yellow/20"
            >
              View All
            </Button>
          </div>

          {alertData.map((alert) => {
            const AlertIcon = alert.icon;
            const TrendIcon = alert.trend === "up" ? TrendingUp : TrendingDown;
            const isExpanded = selectedAlert === alert.id;

            return (
              <Card 
                key={alert.id} 
                className="sentinelx-glass border-sentinelx-glass-border cursor-pointer transition-all duration-200 hover:border-sentinelx-alert-yellow/50"
                onClick={() => setSelectedAlert(isExpanded ? null : alert.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-${alert.color}-500/20 flex-shrink-0`}>
                      <AlertIcon className={`h-4 w-4 text-${alert.color}-400`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-white font-medium text-sm">{alert.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{alert.region}</span>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(alert.status)} text-xs capitalize`}>
                          {alert.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Risk Score</span>
                          <div className="flex items-center gap-1">
                            <span className="text-white">{alert.riskScore}%</span>
                            <TrendIcon className={`h-3 w-3 ${
                              alert.trend === 'up' ? 'text-red-400' : 'text-green-400'
                            }`} />
                          </div>
                        </div>
                        <Progress value={alert.riskScore} className="h-1.5 bg-gray-700" />
                      </div>

                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-sentinelx-glass-border space-y-2">
                          <p className="text-xs text-white">{alert.description}</p>
                          {alert.affected > 0 && (
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Affected Population</span>
                              <span className="text-white">{alert.affected.toLocaleString()}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Last Update</span>
                            <span className="text-white">{alert.lastUpdate}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="sentinelx-glass border-sentinelx-glass-border">
          <CardContent className="p-4">
            <h3 className="text-white font-medium mb-3 text-sm">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate('report')}
                className="bg-sentinelx-glass-bg border-sentinelx-glass-border hover:bg-sentinelx-alert-yellow/20 justify-start"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Incident
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate('voice-bot')}
                className="bg-sentinelx-glass-bg border-sentinelx-glass-border hover:bg-sentinelx-alert-yellow/20 justify-start"
              >
                <Bell className="h-4 w-4 mr-2" />
                Voice Assistant
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
