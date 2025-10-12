import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Map,
  Layers,
  Maximize2,
  Minimize2,
  Satellite,
  Waves,
  Thermometer,
  AlertTriangle,
  RefreshCw,
  MapPin,
  Zap,
} from "lucide-react";

interface MapRegion {
  id: string;
  name: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  type: "flood" | "heat" | "fire" | "mixed";
  coordinates: { lat: number; lng: number };
  affected: number;
  lastUpdate: string;
}

const mockRegions: MapRegion[] = [
  {
    id: "region-1",
    name: "Central Valley",
    riskLevel: "high",
    type: "flood",
    coordinates: { lat: 37.2431, lng: -119.2026 },
    affected: 12500,
    lastUpdate: "2 mins ago",
  },
  {
    id: "region-2",
    name: "Metropolitan Area",
    riskLevel: "medium",
    type: "heat",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    affected: 8900,
    lastUpdate: "5 mins ago",
  },
  {
    id: "region-3",
    name: "Northern Districts",
    riskLevel: "critical",
    type: "fire",
    coordinates: { lat: 38.5816, lng: -121.4944 },
    affected: 25000,
    lastUpdate: "30 secs ago",
  },
  {
    id: "region-4",
    name: "Coastal Region",
    riskLevel: "low",
    type: "mixed",
    coordinates: { lat: 36.7783, lng: -119.4179 },
    affected: 1200,
    lastUpdate: "10 mins ago",
  },
];

const getRiskColor = (level: string) => {
  switch (level) {
    case "critical": return "bg-red-500";
    case "high": return "bg-orange-500";
    case "medium": return "bg-yellow-500";
    case "low": return "bg-green-500";
    default: return "bg-gray-500";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "flood": return Waves;
    case "heat": return Thermometer;
    case "fire": return Zap;
    case "mixed": return AlertTriangle;
    default: return Map;
  }
};

export function DisasterMap() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeLayer, setActiveLayer] = useState("risk");
  const [selectedRegion, setSelectedRegion] = useState<MapRegion | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Card className={`sentinelx-glass border-sentinelx-glass-border transition-all duration-300 ${
      isFullscreen ? 'fixed inset-4 z-50' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sentinelx-alert-yellow/20">
              <Map className="h-5 w-5 text-sentinelx-alert-yellow" />
            </div>
            <div>
              <CardTitle className="text-white">Live Risk Map</CardTitle>
              <p className="text-sm text-muted-foreground">Real-time disaster monitoring zones</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="text-sentinelx-alert-yellow hover:bg-sentinelx-alert-yellow/20"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-sentinelx-alert-yellow hover:bg-sentinelx-alert-yellow/20"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Map Layers Control */}
        <Tabs value={activeLayer} onValueChange={setActiveLayer} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-sentinelx-glass-bg">
            <TabsTrigger value="risk" className="text-xs">Risk Zones</TabsTrigger>
            <TabsTrigger value="satellite" className="text-xs">Satellite</TabsTrigger>
            <TabsTrigger value="weather" className="text-xs">Weather</TabsTrigger>
            <TabsTrigger value="reports" className="text-xs">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeLayer} className="mt-4">
            {/* Mock Map Container */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden border border-sentinelx-glass-border">
              {/* Map Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-gradient-to-br from-blue-900 via-slate-800 to-green-900"></div>
              </div>

              {/* Region Markers */}
              <div className="absolute inset-0 p-4">
                {mockRegions.map((region, index) => {
                  const TypeIcon = getTypeIcon(region.type);
                  return (
                    <div
                      key={region.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110`}
                      style={{
                        left: `${25 + index * 20}%`,
                        top: `${30 + index * 15}%`,
                      }}
                      onClick={() => setSelectedRegion(region)}
                    >
                      {/* Risk Zone Circle */}
                      <div className={`w-16 h-16 rounded-full ${getRiskColor(region.riskLevel)} opacity-30 animate-pulse`}></div>
                      
                      {/* Center Icon */}
                      <div className={`absolute inset-0 flex items-center justify-center`}>
                        <div className={`p-2 rounded-full ${getRiskColor(region.riskLevel)} border-2 border-white`}>
                          <TypeIcon className="h-4 w-4 text-white" />
                        </div>
                      </div>

                      {/* Region Label */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
                        <Badge className={`${getRiskColor(region.riskLevel)} text-white text-xs whitespace-nowrap`}>
                          {region.name}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="sm" variant="secondary" className="p-2 bg-sentinelx-glass-bg border-sentinelx-glass-border">
                  <Layers className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" className="p-2 bg-sentinelx-glass-bg border-sentinelx-glass-border">
                  <Satellite className="h-4 w-4" />
                </Button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-sentinelx-glass-bg border border-sentinelx-glass-border rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-2">Risk Levels</p>
                <div className="flex gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-white">Low</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-white">Medium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-white">High</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-white">Critical</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Selected Region Info */}
        {selectedRegion && (
          <div className="sentinelx-glass border border-sentinelx-glass-border rounded-lg p-4 sentinelx-fade-in">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-sentinelx-alert-yellow" />
                <h4 className="text-white font-medium">{selectedRegion.name}</h4>
              </div>
              <Badge className={`${getRiskColor(selectedRegion.riskLevel)} text-white capitalize`}>
                {selectedRegion.riskLevel} Risk
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Affected Population</p>
                <p className="text-white font-medium">{selectedRegion.affected.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Update</p>
                <p className="text-white font-medium">{selectedRegion.lastUpdate}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
