import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Activity,
  Satellite,
  Zap,
  BarChart3,
} from "lucide-react";

interface AIPrediction {
  id: string;
  type: "flood" | "landslide" | "drought" | "fire";
  location: string;
  barangay: string;
  probability: number;
  confidence: number;
  timeframe: string;
  factors: string[];
  riskLevel: "low" | "medium" | "high" | "critical";
  trend: "increasing" | "decreasing" | "stable";
  lastUpdate: Date;
}

interface PredictionModel {
  name: string;
  accuracy: number;
  lastTraining: Date;
  status: "active" | "training" | "offline";
  predictions: number;
}

const mockPredictions: AIPrediction[] = [
  {
    id: "pred-001",
    type: "flood",
    location: "Central Valley Region",
    barangay: "Central Valley",
    probability: 78,
    confidence: 87,
    timeframe: "Next 6 hours",
    factors: ["Heavy rainfall", "High soil saturation", "Rising water levels"],
    riskLevel: "high",
    trend: "increasing",
    lastUpdate: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: "pred-002",
    type: "landslide",
    location: "Hillside District",
    barangay: "Hillside",
    probability: 45,
    confidence: 84,
    timeframe: "Next 12 hours",
    factors: ["Soil moisture 78%", "Slope instability", "Heavy rainfall"],
    riskLevel: "medium",
    trend: "stable",
    lastUpdate: new Date(Date.now() - 8 * 60 * 1000)
  },
  {
    id: "pred-003",
    type: "fire",
    location: "Northern District",
    barangay: "Northern District",
    probability: 23,
    confidence: 76,
    timeframe: "Next 24 hours",
    factors: ["Low humidity", "High temperature", "Dry vegetation"],
    riskLevel: "low",
    trend: "decreasing",
    lastUpdate: new Date(Date.now() - 15 * 60 * 1000)
  }
];

const mockModels: PredictionModel[] = [
  {
    name: "Flood Prediction Model v2.1",
    accuracy: 94.2,
    lastTraining: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "active",
    predictions: 1247
  },
  {
    name: "Landslide Risk Assessment v1.8",
    accuracy: 89.7,
    lastTraining: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: "active",
    predictions: 892
  },
  {
    name: "Fire Risk Model v3.0",
    accuracy: 91.3,
    lastTraining: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: "training",
    predictions: 634
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "flood": return Activity;
    case "landslide": return AlertTriangle;
    case "drought": return Zap;
    case "fire": return Satellite;
    default: return Brain;
  }
};

const getRiskColor = (level: string) => {
  switch (level) {
    case "critical": return "bg-red-500/20 text-red-400 border-red-500/30";
    case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "low": return "bg-green-500/20 text-green-400 border-green-500/30";
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "increasing": return TrendingUp;
    case "decreasing": return "↘";
    case "stable": return "→";
    default: return "→";
  }
};

export function AIPredictionsView() {
  const [activeTab, setActiveTab] = useState("predictions");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sentinelx-alert-yellow/20">
            <Brain className="h-5 w-5 text-sentinelx-alert-yellow" />
          </div>
          <div>
            <h2 className="text-xl text-white font-medium">AI Prediction Center</h2>
            <p className="text-sm text-muted-foreground">Machine learning models analyzing disaster risks</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Brain className="h-3 w-3 mr-1" />
            AI Active
          </Badge>
          <span className="text-xs text-muted-foreground">
            Last update: {Math.floor((Date.now() - mockPredictions[0].lastUpdate.getTime()) / 60000)}m ago
          </span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-sentinelx-glass-bg">
          <TabsTrigger value="predictions" className="text-sm">Active Predictions</TabsTrigger>
          <TabsTrigger value="models" className="text-sm">AI Models</TabsTrigger>
          <TabsTrigger value="analytics" className="text-sm">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          {mockPredictions.map((prediction) => {
            const TypeIcon = getTypeIcon(prediction.type);
            const TrendIcon = getTrendIcon(prediction.trend);
            
            return (
              <Card key={prediction.id} className="sentinelx-glass border-sentinelx-glass-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-sentinelx-alert-yellow/20">
                        <TypeIcon className="h-5 w-5 text-sentinelx-alert-yellow" />
                      </div>
                      <div>
                        <CardTitle className="text-white capitalize">
                          {prediction.type} Risk Prediction
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{prediction.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getRiskColor(prediction.riskLevel)}>
                        {prediction.riskLevel.toUpperCase()}
                      </Badge>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {prediction.confidence}% Confidence
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Probability Display */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Prediction Probability</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">{prediction.probability}%</span>
                        <span className="text-sm text-muted-foreground">
                          {typeof TrendIcon === 'string' ? TrendIcon : <TrendIcon className="h-4 w-4" />}
                        </span>
                      </div>
                    </div>
                    <Progress 
                      value={prediction.probability} 
                      className="h-3 bg-gray-700"
                    />
                  </div>

                  {/* Timeframe */}
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-sentinelx-glass-bg border border-sentinelx-glass-border">
                    <Clock className="h-4 w-4 text-sentinelx-alert-yellow" />
                    <span className="text-sm text-white">
                      <strong>Timeframe:</strong> {prediction.timeframe}
                    </span>
                  </div>

                  {/* Risk Factors */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Risk Factors</h4>
                    <div className="space-y-1">
                      {prediction.factors.map((factor, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-sentinelx-alert-yellow rounded-full"></div>
                          <span className="text-muted-foreground">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="flex items-center gap-2 pt-2 border-t border-sentinelx-glass-border">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Updated {Math.floor((Date.now() - prediction.lastUpdate.getTime()) / 60000)}m ago
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockModels.map((model) => (
              <Card key={model.name} className="sentinelx-glass border-sentinelx-glass-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-sm">{model.name}</CardTitle>
                    <Badge className={
                      model.status === "active" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                      model.status === "training" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                      "bg-red-500/20 text-red-400 border-red-500/30"
                    }>
                      {model.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Accuracy</span>
                      <span className="text-white font-medium">{model.accuracy}%</span>
                    </div>
                    <Progress value={model.accuracy} className="h-2 bg-gray-700" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Predictions</span>
                      <div className="text-white font-medium">{model.predictions.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Training</span>
                      <div className="text-white font-medium">
                        {Math.floor((Date.now() - model.lastTraining.getTime()) / (24 * 60 * 60 * 1000))}d ago
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="sentinelx-glass border-sentinelx-glass-border">
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-8 w-8 text-sentinelx-alert-yellow mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">2,773</div>
                <div className="text-sm text-muted-foreground">Total Predictions</div>
              </CardContent>
            </Card>
            
            <Card className="sentinelx-glass border-sentinelx-glass-border">
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">91.8%</div>
                <div className="text-sm text-muted-foreground">Average Accuracy</div>
              </CardContent>
            </Card>
            
            <Card className="sentinelx-glass border-sentinelx-glass-border">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-sm text-muted-foreground">Active Alerts</div>
              </CardContent>
            </Card>
            
            <Card className="sentinelx-glass border-sentinelx-glass-border">
              <CardContent className="p-4 text-center">
                <Brain className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-sm text-muted-foreground">AI Models</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

