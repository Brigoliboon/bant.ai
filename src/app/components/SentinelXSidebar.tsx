import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import logo from '../assets/img/logo.png';

import {
  Satellite,
  Waves,
  Thermometer,
  AlertTriangle,
  MessageSquareWarning,
  Users,
  Mic,
  Home,
  Settings,
  Activity,
  Map,
  TrendingUp,
  Database
} from "lucide-react";
import Image from "next/image";

interface SentinelXSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  alertCount: number;
}

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    badge: null,
  },
  {
    id: "sensor-feed",
    label: "Sensor Feed",
    icon: Activity,
    badge: "LIVE",
  },
  {
    id: "ai-predictions",
    label: "AI Predictions",
    icon: TrendingUp,
    badge: "AI",
  },
  {
    id: "flood-watch",
    label: "FlashFloodWatch",
    icon: Waves,
    badge: "ML",
  },
  {
    id: "heatwave-alert",
    label: "HeatwaveAlert",
    icon: Thermometer,
    badge: "INDEX",
  },
  {
    id: "misinformation",
    label: "Misinformation",
    icon: MessageSquareWarning,
    badge: "NLP",
  },
  {
    id: "satellite-feed",
    label: "Satellite Feed",
    icon: Satellite,
    badge: "LIVE",
  },
  {
    id: "community-reports",
    label: "Community Reports",
    icon: Users,
    badge: null,
  },
  {
    id: "voice-bot",
    label: "Voice Assistant",
    icon: Mic,
    badge: "AI",
  },
];

const systemItems = [
  {
    id: "analytics",
    label: "Analytics",
    icon: TrendingUp,
  },
  {
    id: "data-sources",
    label: "Data Sources",
    icon: Database,
  },
  {
    id: "system-status",
    label: "System Status",
    icon: Activity,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

export function SentinelXSidebar({ activeView, onViewChange, alertCount }: SentinelXSidebarProps) {
  return (
    <div className="sentinelx-glass border-r w-80 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-sentinelx-glass-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            {/* TODO: Replace src/app/assets/img/logo.png with bant.ai logo */}
            <Image width={50} height={50} src={logo} alt="Bant.AI logo"/>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-sentinelx-alert-yellow rounded-full sentinelx-pulse"></div>
          </div>
          <div>
            <h1 className="text-xl text-white font-bold">Bant.AI</h1>
            <p className="text-sm text-muted-foreground">Disaster Monitoring Platform</p>
          </div>
        </div>
        
        {alertCount > 0 && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-sentinelx-crimson-red/20 border border-sentinelx-crimson-red/30">
            <AlertTriangle className="h-4 w-4 text-sentinelx-crimson-red" />
            <span className="text-sm text-sentinelx-crimson-red font-medium">
              {alertCount} Active Alert{alertCount !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-2">
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-3 px-2">MONITORING MODULES</p>
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeView === item.id ? "secondary" : "ghost"}
                className={`
                  w-full justify-start gap-3 h-11 px-3 mb-2 transition-all duration-200
                  ${activeView === item.id 
                    ? 'bg-sentinelx-alert-yellow/20 text-sentinelx-alert-yellow border border-sentinelx-alert-yellow/30' 
                    : 'text-foreground hover:bg-sentinelx-glass-bg hover:text-sentinelx-alert-yellow'
                  }
                `}
                onClick={() => onViewChange(item.id)}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1 text-left truncate">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant="outline" 
                    className="text-xs px-2 py-0 bg-sentinelx-alert-yellow/20 text-sentinelx-alert-yellow border-sentinelx-alert-yellow/30"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          <Separator className="my-4" />

          <div>
            <p className="text-xs text-muted-foreground mb-3 px-2">SYSTEM</p>
            {systemItems.map((item) => (
              <Button
                key={item.id}
                variant={activeView === item.id ? "secondary" : "ghost"}
                className={`
                  w-full justify-start gap-3 h-10 px-3 mb-1 transition-all duration-200
                  ${activeView === item.id 
                    ? 'bg-sentinelx-alert-yellow/20 text-sentinelx-alert-yellow border border-sentinelx-alert-yellow/30' 
                    : 'text-foreground hover:bg-sentinelx-glass-bg hover:text-sentinelx-alert-yellow'
                  }
                `}
                onClick={() => onViewChange(item.id)}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1 text-left truncate">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-sentinelx-glass-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full sentinelx-pulse"></div>
            <span>System Online</span>
          </div>
          <span>v2.1.0</span>
        </div>
      </div>
    </div>
  );
}
