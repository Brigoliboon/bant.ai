import { useState, useEffect } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { MobileDashboard } from "./MobileDashboard";
import { CommunityReport } from "./CommunityReport";
import { MobileBottomNav } from "./MobileBottomNav";
import { VoiceChatBot } from "../VoiceChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Spline3D } from "../Spline3D";
import {
  Bell,
  MapPin,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Smartphone,
  Globe,
  Shield,
  User,
  ChevronRight,
  AlertTriangle,
  TrendingUp,
  Waves,
  Thermometer,
  MessageSquareWarning,
  Satellite,
} from "lucide-react";

export function MobileApp() {
  const [hasCompletedWelcome, setHasCompletedWelcome] = useState(false);
  const [activeView, setActiveView] = useState("home");
  const [isVoiceBotOpen, setIsVoiceBotOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const mockAlertCount = 4;
  const mockActiveAlerts = [
    { id: "1", type: "flood", title: "Flash Flood Risk", severity: "high", region: "Central Valley" },
    { id: "2", type: "heat", title: "Heat Stress Alert", severity: "medium", region: "Metro Area" },
    { id: "3", type: "satellite", title: "Thermal Anomaly", severity: "critical", region: "Northern Districts" },
    { id: "4", type: "misinformation", title: "False Information", severity: "low", region: "Social Networks" },
  ];

  // Simulate loading welcome state
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('sentinelx-welcome-completed');
    if (hasSeenWelcome) {
      setHasCompletedWelcome(true);
    }
  }, []);

  const handleWelcomeComplete = () => {
    setHasCompletedWelcome(true);
    localStorage.setItem('sentinelx-welcome-completed', 'true');
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "flood": return Waves;
      case "heat": return Thermometer;
      case "misinformation": return MessageSquareWarning;
      case "satellite": return Satellite;
      default: return AlertTriangle;
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

  if (!hasCompletedWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  const renderMainContent = () => {
    switch (activeView) {
      case "home":
        return <MobileDashboard onNavigate={setActiveView} />;
      
      case "alerts":
        return (
          <div className="min-h-screen bg-sentinelx-deep-blue pb-20">
            {/* Header */}
            <div className="sticky top-0 z-10 sentinelx-glass border-b border-sentinelx-glass-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg text-white font-medium">Active Alerts</h1>
                  <p className="text-sm text-muted-foreground">{mockActiveAlerts.length} active warnings</p>
                </div>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {mockActiveAlerts.filter(a => a.severity === "critical" || a.severity === "high").length} Critical
                </Badge>
              </div>
            </div>

            {/* 3D Alert Visualization */}
            <div className="p-4">
              <Card className="sentinelx-glass border-sentinelx-glass-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center gap-2 text-base">
                    <Globe className="h-4 w-4 text-sentinelx-alert-yellow" />
                    Risk Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-48">
                    <Spline3D type="globe" className="w-full h-full" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts List */}
            <div className="p-4 pt-0 space-y-3">
              {mockActiveAlerts.map((alert) => {
                const AlertIcon = getAlertIcon(alert.type);
                return (
                  <Card key={alert.id} className="sentinelx-glass border-sentinelx-glass-border">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-sentinelx-alert-yellow/20 flex-shrink-0">
                          <AlertIcon className="h-4 w-4 text-sentinelx-alert-yellow" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-white font-medium text-sm">{alert.title}</h3>
                            <Badge className={`${getSeverityColor(alert.severity)} text-xs capitalize`}>
                              {alert.severity}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{alert.region}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      
      case "report":
        return <CommunityReport onBack={() => setActiveView("home")} />;
      
      case "voice-bot":
        setIsVoiceBotOpen(true);
        setActiveView("home");
        return <MobileDashboard onNavigate={setActiveView} />;
      
      case "settings":
        return (
          <div className="min-h-screen bg-sentinelx-deep-blue pb-20">
            {/* Header */}
            <div className="sticky top-0 z-10 sentinelx-glass border-b border-sentinelx-glass-border p-4">
              <h1 className="text-lg text-white font-medium">Settings</h1>
              <p className="text-sm text-muted-foreground">Customize your experience</p>
            </div>

            <div className="p-4 space-y-6">
              {/* Profile Section */}
              <Card className="sentinelx-glass border-sentinelx-glass-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center gap-2 text-base">
                    <User className="h-4 w-4 text-sentinelx-alert-yellow" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm">Location</p>
                      <p className="text-xs text-muted-foreground">San Francisco, CA</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-sentinelx-alert-yellow">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Separator className="bg-sentinelx-glass-border" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm">Emergency Contacts</p>
                      <p className="text-xs text-muted-foreground">2 contacts added</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-sentinelx-alert-yellow">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="sentinelx-glass border-sentinelx-glass-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center gap-2 text-base">
                    <Bell className="h-4 w-4 text-sentinelx-alert-yellow" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm">Push Notifications</p>
                      <p className="text-xs text-muted-foreground">Receive emergency alerts</p>
                    </div>
                    <Switch 
                      checked={notificationsEnabled} 
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm">Sound Alerts</p>
                      <p className="text-xs text-muted-foreground">Audio notifications</p>
                    </div>
                    <Switch 
                      checked={soundEnabled} 
                      onCheckedChange={setSoundEnabled}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Appearance */}
              <Card className="sentinelx-glass border-sentinelx-glass-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center gap-2 text-base">
                    {darkMode ? <Moon className="h-4 w-4 text-sentinelx-alert-yellow" /> : <Sun className="h-4 w-4 text-sentinelx-alert-yellow" />}
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm">Dark Mode</p>
                      <p className="text-xs text-muted-foreground">Enable dark theme</p>
                    </div>
                    <Switch 
                      checked={darkMode} 
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* About */}
              <Card className="sentinelx-glass border-sentinelx-glass-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center gap-2 text-base">
                    <Shield className="h-4 w-4 text-sentinelx-alert-yellow" />
                    About SentinelX
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <p>Version 2.1.0</p>
                    <p className="mt-2">
                      AI-powered disaster monitoring and alert platform. 
                      Protecting communities through real-time predictions and verified reports.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      default:
        return <MobileDashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-sentinelx-deep-blue dark">
      {renderMainContent()}
      
      {/* Bottom Navigation */}
      <MobileBottomNav 
        activeView={activeView} 
        onViewChange={setActiveView}
        alertCount={mockAlertCount}
      />

      {/* Voice Chatbot */}
      <VoiceChatBot 
        isOpen={isVoiceBotOpen} 
        onClose={() => setIsVoiceBotOpen(false)} 
      />
    </div>
  );
}
