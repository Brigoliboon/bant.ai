import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Wifi,
  WifiOff,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
} from "lucide-react";

interface OfflineData {
  id: string;
  type: "sensor_reading" | "community_report" | "alert" | "prediction";
  data: any;
  timestamp: Date;
  synced: boolean;
}

interface OfflineModeIndicatorProps {
  isOnline: boolean;
  offlineData?: OfflineData[];
  onSync?: () => void;
}

export function OfflineModeIndicator({ isOnline, offlineData = [], onSync }: OfflineModeIndicatorProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  useEffect(() => {
    if (isOnline && lastSyncTime) {
      // Simulate sync completion
      setTimeout(() => {
        setLastSyncTime(new Date());
      }, 2000);
    }
  }, [isOnline, lastSyncTime]);

  const pendingData = offlineData.filter(item => !item.synced);
  const syncedData = offlineData.filter(item => item.synced);

  const getDataIcon = (type: string) => {
    switch (type) {
      case "sensor_reading": return Database;
      case "community_report": return Upload;
      case "alert": return AlertTriangle;
      case "prediction": return CheckCircle;
      default: return Database;
    }
  };

  const getDataLabel = (type: string) => {
    switch (type) {
      case "sensor_reading": return "Sensor Reading";
      case "community_report": return "Community Report";
      case "alert": return "Alert";
      case "prediction": return "AI Prediction";
      default: return "Data";
    }
  };

  if (isOnline) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Card className="sentinelx-glass border-sentinelx-glass-border">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">Online</span>
              {lastSyncTime && (
                <span className="text-xs text-muted-foreground">
                  Last sync: {Math.floor((Date.now() - lastSyncTime.getTime()) / 60000)}m ago
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className="sentinelx-glass border-sentinelx-glass-border">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <WifiOff className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-yellow-400 font-medium">Offline Mode</span>
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              {pendingData.length} Pending
            </Badge>
          </div>
          
          <div className="text-xs text-muted-foreground mb-2">
            Data will sync when connection is restored
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowDetails(!showDetails)}
              className="text-sentinelx-alert-yellow hover:bg-sentinelx-alert-yellow/20"
            >
              {showDetails ? "Hide" : "Show"} Details
            </Button>
            
            {onSync && (
              <Button
                size="sm"
                onClick={onSync}
                className="bg-sentinelx-alert-yellow/20 text-sentinelx-alert-yellow border-sentinelx-alert-yellow/30"
              >
                <Download className="h-3 w-3 mr-1" />
                Sync Now
              </Button>
            )}
          </div>
          
          {showDetails && (
            <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
              {pendingData.length > 0 && (
                <div>
                  <div className="text-xs text-yellow-400 font-medium mb-1">Pending Sync:</div>
                  {pendingData.slice(0, 5).map((item, index) => {
                    const DataIcon = getDataIcon(item.type);
                    return (
                      <div key={index} className="flex items-center gap-2 p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                        <DataIcon className="h-3 w-3 text-yellow-400" />
                        <span className="text-xs text-white">
                          {getDataLabel(item.type)} - {Math.floor((Date.now() - item.timestamp.getTime()) / 60000)}m ago
                        </span>
                      </div>
                    );
                  })}
                  {pendingData.length > 5 && (
                    <div className="text-xs text-muted-foreground">
                      +{pendingData.length - 5} more items
                    </div>
                  )}
                </div>
              )}
              
              {syncedData.length > 0 && (
                <div>
                  <div className="text-xs text-green-400 font-medium mb-1">Recently Synced:</div>
                  {syncedData.slice(0, 3).map((item, index) => {
                    const DataIcon = getDataIcon(item.type);
                    return (
                      <div key={index} className="flex items-center gap-2 p-2 rounded bg-green-500/10 border border-green-500/20">
                        <DataIcon className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-white">
                          {getDataLabel(item.type)} - {Math.floor((Date.now() - item.timestamp.getTime()) / 60000)}m ago
                        </span>
                        <CheckCircle className="h-3 w-3 text-green-400 ml-auto" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

