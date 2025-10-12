import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Activity,
  Satellite,
  Droplets,
  Thermometer,
  Gauge,
  Wifi,
  WifiOff,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
} from "lucide-react";

interface SensorReading {
  id: string;
  sensorType: "rainfall" | "water_level" | "soil_moisture" | "humidity" | "temperature";
  value: number;
  unit: string;
  location: string;
  barangay: string;
  timestamp: Date;
  status: "online" | "offline" | "warning";
  threshold: {
    normal: number;
    warning: number;
    critical: number;
  };
  trend: "up" | "down" | "stable";
}

interface BarangayData {
  name: string;
  sensors: SensorReading[];
  lastUpdate: Date;
  connectivity: "online" | "offline" | "partial";
}

const mockSensorData: BarangayData[] = [
  {
    name: "Barangay Central Valley",
    lastUpdate: new Date(Date.now() - 2 * 60 * 1000),
    connectivity: "online",
    sensors: [
      {
        id: "rain-001",
        sensorType: "rainfall",
        value: 45.2,
        unit: "mm/hr",
        location: "Weather Station Alpha",
        barangay: "Central Valley",
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        status: "online",
        threshold: { normal: 10, warning: 25, critical: 40 },
        trend: "up"
      },
      {
        id: "water-001",
        sensorType: "water_level",
        value: 2.3,
        unit: "m",
        location: "River Gauge Station",
        barangay: "Central Valley",
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
        status: "warning",
        threshold: { normal: 1.5, warning: 2.0, critical: 2.5 },
        trend: "up"
      },
      {
        id: "soil-001",
        sensorType: "soil_moisture",
        value: 91,
        unit: "%",
        location: "Soil Station Beta",
        barangay: "Central Valley",
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
        status: "online",
        threshold: { normal: 60, warning: 80, critical: 90 },
        trend: "up"
      }
    ]
  },
  {
    name: "Barangay Riverside",
    lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
    connectivity: "partial",
    sensors: [
      {
        id: "water-002",
        sensorType: "water_level",
        value: 2.8,
        unit: "m",
        location: "Main River Gauge",
        barangay: "Riverside",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        status: "warning",
        threshold: { normal: 1.8, warning: 2.5, critical: 3.0 },
        trend: "up"
      },
      {
        id: "humidity-001",
        sensorType: "humidity",
        value: 85,
        unit: "%",
        location: "Weather Station Gamma",
        barangay: "Riverside",
        timestamp: new Date(Date.now() - 4 * 60 * 1000),
        status: "online",
        threshold: { normal: 50, warning: 70, critical: 85 },
        trend: "stable"
      }
    ]
  }
];

const getSensorIcon = (type: string) => {
  switch (type) {
    case "rainfall": return Droplets;
    case "water_level": return Gauge;
    case "soil_moisture": return Activity;
    case "humidity": return Thermometer;
    case "temperature": return Thermometer;
    default: return Activity;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "online": return "bg-green-500/20 text-green-400 border-green-500/30";
    case "warning": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "offline": return "bg-red-500/20 text-red-400 border-red-500/30";
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const getConnectivityIcon = (status: string) => {
  switch (status) {
    case "online": return Wifi;
    case "offline": return WifiOff;
    case "partial": return Wifi;
    default: return WifiOff;
  }
};

const getRiskLevel = (value: number, threshold: { critical: number; warning: number }) => {
  if (value >= threshold.critical) return "critical";
  if (value >= threshold.warning) return "warning";
  return "normal";
};

export function SensorFeedView() {
  const [activeTab, setActiveTab] = useState("live");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return "↗";
      case "down": return "↘";
      default: return "→";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sentinelx-alert-yellow/20">
            <Satellite className="h-5 w-5 text-sentinelx-alert-yellow" />
          </div>
          <div>
            <h2 className="text-xl text-white font-medium">Ground Station Feed</h2>
            <p className="text-sm text-muted-foreground">Live IoT sensor data from barangay monitoring stations</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <Activity className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-lg bg-sentinelx-glass-bg border border-sentinelx-glass-border hover:bg-sentinelx-alert-yellow/20 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 text-sentinelx-alert-yellow ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-sentinelx-glass-bg">
          <TabsTrigger value="live" className="text-sm">Live Feed</TabsTrigger>
          <TabsTrigger value="sensors" className="text-sm">Sensor Status</TabsTrigger>
          <TabsTrigger value="connectivity" className="text-sm">Connectivity</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          {mockSensorData.map((barangay) => (
            <Card key={barangay.name} className="sentinelx-glass border-sentinelx-glass-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-sentinelx-alert-yellow" />
                    <CardTitle className="text-white">{barangay.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(barangay.connectivity)}>
                      {barangay.connectivity === "online" ? "Online" : 
                       barangay.connectivity === "offline" ? "Offline" : "Partial"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Updated {Math.floor((Date.now() - barangay.lastUpdate.getTime()) / 60000)}m ago
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {barangay.sensors.map((sensor) => {
                    const SensorIcon = getSensorIcon(sensor.sensorType);
                    const riskLevel = getRiskLevel(sensor.value, sensor.threshold);
                    
                    return (
                      <div key={sensor.id} className="p-4 rounded-lg bg-sentinelx-glass-bg border border-sentinelx-glass-border">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <SensorIcon className="h-4 w-4 text-sentinelx-alert-yellow" />
                            <span className="text-sm font-medium text-white capitalize">
                              {sensor.sensorType.replace('_', ' ')}
                            </span>
                          </div>
                          <Badge className={getStatusColor(sensor.status)}>
                            {sensor.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-white">
                              {sensor.value}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {sensor.unit}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Trend:</span>
                            <span className="text-xs text-white">
                              {getTrendIcon(sensor.trend)}
                            </span>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Risk Level</span>
                              <span className={`font-medium ${
                                riskLevel === "critical" ? "text-red-400" :
                                riskLevel === "warning" ? "text-yellow-400" :
                                "text-green-400"
                              }`}>
                                {riskLevel.toUpperCase()}
                              </span>
                            </div>
                            <Progress 
                              value={(sensor.value / sensor.threshold.critical) * 100} 
                              className="h-2 bg-gray-700"
                            />
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            {sensor.location}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="sensors" className="space-y-4">
          <Card className="sentinelx-glass border-sentinelx-glass-border">
            <CardHeader>
              <CardTitle className="text-white">Sensor Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-sentinelx-glass-bg border border-sentinelx-glass-border text-center">
                  <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-sm text-muted-foreground">Online Sensors</div>
                </div>
                <div className="p-4 rounded-lg bg-sentinelx-glass-bg border border-sentinelx-glass-border text-center">
                  <AlertTriangle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-sm text-muted-foreground">Warning</div>
                </div>
                <div className="p-4 rounded-lg bg-sentinelx-glass-bg border border-sentinelx-glass-border text-center">
                  <Activity className="h-8 w-8 text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">1</div>
                  <div className="text-sm text-muted-foreground">Offline</div>
                </div>
                <div className="p-4 rounded-lg bg-sentinelx-glass-bg border border-sentinelx-glass-border text-center">
                  <Clock className="h-8 w-8 text-sentinelx-alert-yellow mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">2m</div>
                  <div className="text-sm text-muted-foreground">Last Update</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connectivity" className="space-y-4">
          <Card className="sentinelx-glass border-sentinelx-glass-border">
            <CardHeader>
              <CardTitle className="text-white">Network Connectivity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSensorData.map((barangay) => {
                  const ConnectivityIcon = getConnectivityIcon(barangay.connectivity);
                  return (
                    <div key={barangay.name} className="flex items-center justify-between p-4 rounded-lg bg-sentinelx-glass-bg border border-sentinelx-glass-border">
                      <div className="flex items-center gap-3">
                        <ConnectivityIcon className="h-5 w-5 text-sentinelx-alert-yellow" />
                        <div>
                          <div className="text-white font-medium">{barangay.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {barangay.sensors.length} sensors • Last update: {Math.floor((Date.now() - barangay.lastUpdate.getTime()) / 60000)}m ago
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(barangay.connectivity)}>
                        {barangay.connectivity}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

