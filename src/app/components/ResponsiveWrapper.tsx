import { useState, useEffect } from "react";

interface ResponsiveWrapperProps {
  children: React.ReactNode;
  mobileComponent: React.ComponentType;
  desktopComponent: React.ComponentType;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}

export function ResponsiveWrapper({ mobileComponent: MobileComponent, desktopComponent: DesktopComponent }: ResponsiveWrapperProps) {
  const isMobile = useIsMobile();

  return isMobile ? <MobileComponent /> : <DesktopComponent />;
}
