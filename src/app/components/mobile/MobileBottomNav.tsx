import { Badge } from "../ui/badge";
import {
  Home,
  AlertTriangle,
  FileText,
  Mic,
  Settings,
  Bell,
} from "lucide-react";

interface MobileBottomNavProps {
  activeView: string;
  onViewChange: (view: string) => void;
  alertCount?: number;
}

const navItems = [
  {
    id: "home",
    label: "Home",
    icon: Home,
  },
  {
    id: "alerts",
    label: "Alerts",
    icon: AlertTriangle,
    hasNotification: true,
  },
  {
    id: "report",
    label: "Report",
    icon: FileText,
  },
  {
    id: "voice-bot",
    label: "Voice",
    icon: Mic,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

export function MobileBottomNav({ activeView, onViewChange, alertCount = 0 }: MobileBottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sentinelx-glass border-t border-sentinelx-glass-border">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          const showBadge = item.hasNotification && alertCount > 0;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                isActive
                  ? "text-sentinelx-alert-yellow"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {showBadge && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-sentinelx-crimson-red text-white text-xs border-none">
                    {alertCount > 9 ? "9+" : alertCount}
                  </Badge>
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
