import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Waves,
  Thermometer,
  MessageSquareWarning,
  Satellite,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Activity,
} from "lucide-react";

interface AlertData {
  id: string;
  type: "flood" | "heatwave" | "misinformation" | "satellite" | "landslide" | "sensor" | "rain";
  title: string;
  riskScore: number;
  status: "low" | "medium" | "high" | "critical";
  location: string;
  lastUpdated: string;
  prediction?: string;
  confidence?: number;
  trend: "up" | "down" | "stable";
  details: string;
  sensorData?: {
    rainfall: number;
    waterLevel: number;
    soilMoisture: number;
    humidity: number;
  };
  barangay?: string;
  aiPrediction?: number;
}

const mockAlertData: AlertData[] = [
  {
    id: "flood-001",
    type: "flood",
    title: "Satellite Analysis: Flash Flood Risk",
    riskScore: 78,
    status: "high",
    location: "Barangay Central Valley",
    lastUpdated: "2 mins ago",
    prediction: "72% chance within 6 hours",
    confidence: 87,
    trend: "up",
    details: "Heavy rainfall detected upstream, soil saturation at 91%",
    sensorData: {
      rainfall: 45.2,
      waterLevel: 2.3,
      soilMoisture: 91,
      humidity: 85
    },
    barangay: "Central Valley",
    aiPrediction: 78
  },
  {
    id: "sensor-001",
    type: "sensor",
    title: "Ground Station: Water Level Alert",
    riskScore: 65,
    status: "medium",
    location: "Barangay Riverside",
    lastUpdated: "5 mins ago",
    prediction: "River level approaching critical threshold",
    confidence: 92,
    trend: "up",
    details: "Water level at 2.8m, approaching 3.0m danger zone",
    sensorData: {
      rainfall: 32.1,
      waterLevel: 2.8,
      soilMoisture: 78,
      humidity: 72
    },
    barangay: "Riverside",
    aiPrediction: 65
  },
  {
    id: "landslide-001",
    type: "landslide",
    title: "Mission Control: Landslide Risk",
    riskScore: 45,
    status: "medium",
    location: "Barangay Hillside",
    lastUpdated: "8 mins ago",
    prediction: "Moderate landslide risk due to soil saturation",
    confidence: 84,
    trend: "stable",
    details: "Soil moisture at 78%, slope stability compromised",
    sensorData: {
      rainfall: 28.5,
      waterLevel: 1.2,
      soilMoisture: 78,
      humidity: 68
    },
    barangay: "Hillside",
    aiPrediction: 45
  },
  {
    id: "landslide-002",
    type: "landslide",
    title: "Satellite Analysis: Landslide Risk",
    riskScore: 89,
    status: "critical",
    location: "Barangay Northern District",
    lastUpdated: "30 secs ago",
    prediction: "High landslide risk detected - soil saturation critical",
    confidence: 95,
    trend: "up",
    details: "Heavy rainfall 85mm causing soil erosion and slope instability on hillside areas",
    sensorData: {
      rainfall: 85.5,
      waterLevel: 2.1,
      soilMoisture: 92,
      humidity: 88
    },
    barangay: "Northern District",
    aiPrediction: 89
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "critical":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "high":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "medium":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "low":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "flood":
      return Waves;
    case "rain":
      return Waves;
    case "heatwave":
      return Thermometer;
    case "misinformation":
      return MessageSquareWarning;
    case "satellite":
      return Satellite;
    case "landslide":
      return AlertTriangle;
    case "sensor":
      return Activity;
    default:
      return AlertTriangle;
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return TrendingUp;
    case "down":
      return TrendingDown;
    default:
      return CheckCircle;
  }
};

export function DisasterAlertCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {mockAlertData.map((alert) => {
        const TypeIcon = getTypeIcon(alert.type);
        const TrendIcon = getTrendIcon(alert.trend);
        
        return (
          <Card 
            key={alert.id} 
            className="sentinelx-glass border-sentinelx-glass-border hover:border-sentinelx-alert-yellow/50 transition-all duration-300 sentinelx-fade-in"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sentinelx-alert-yellow/20">
                    <TypeIcon className="h-5 w-5 text-sentinelx-alert-yellow" />
                  </div>
                  <div>
                    <CardTitle className="text-white">{alert.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{alert.location}</span>
                    </div>
                  </div>
                </div>
                <Badge className={`${getStatusColor(alert.status)} capitalize`}>
                  {alert.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Risk Score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Risk Score</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{alert.riskScore}%</span>
                    <TrendIcon className={`h-3 w-3 ${
                      alert.trend === 'up' 
                        ? 'text-red-400' 
                        : alert.trend === 'down' 
                        ? 'text-green-400' 
                        : 'text-gray-400'
                    }`} />
                  </div>
                </div>
                <Progress 
                  value={alert.riskScore} 
                  className="h-2 bg-gray-700"
                />
              </div>

              {/* Prediction */}
              {alert.prediction && (
                <div className="p-3 rounded-lg bg-sentinelx-glass-bg border border-sentinelx-glass-border">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-sentinelx-alert-yellow" />
                    <span className="text-sm text-sentinelx-alert-yellow">Prediction</span>
                  </div>
                  <p className="text-sm text-white">{alert.prediction}</p>
                  {alert.confidence && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">Confidence:</span>
                      <span className="text-xs text-green-400">{alert.confidence}%</span>
                    </div>
                  )}
                </div>
              )}

              {/* Sensor Data */}
              {alert.sensorData && (
                <div className="p-3 rounded-lg bg-sentinelx-glass-bg border border-sentinelx-glass-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-sentinelx-alert-yellow" />
                    <span className="text-sm text-sentinelx-alert-yellow">Ground Station Data</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rainfall:</span>
                      <span className="text-white font-medium">{alert.sensorData.rainfall}mm/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Water Level:</span>
                      <span className="text-white font-medium">{alert.sensorData.waterLevel}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Soil Moisture:</span>
                      <span className="text-white font-medium">{alert.sensorData.soilMoisture}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Humidity:</span>
                      <span className="text-white font-medium">{alert.sensorData.humidity}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Details */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Latest Update</p>
                <p className="text-sm text-white">{alert.details}</p>
              </div>

              {/* Timestamp */}
              <div className="flex items-center gap-2 pt-2 border-t border-sentinelx-glass-border">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Updated {alert.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
