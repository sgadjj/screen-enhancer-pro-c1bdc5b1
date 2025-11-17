import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Shield } from "lucide-react";
import { toast } from "sonner";
import Shizuku from "@/plugins/shizuku";

export const ShizukuManager = ({ onShizukuReady }: { onShizukuReady: (ready: boolean) => void }) => {
  const [shizukuStatus, setShizukuStatus] = useState<'checking' | 'available' | 'unavailable' | 'granted'>('checking');
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    checkShizuku();
  }, []);

  const checkShizuku = async () => {
    if (!(window as any).Capacitor) {
      setIsNative(false);
      setShizukuStatus('unavailable');
      return;
    }

    setIsNative(true);

    try {
      const { installed } = await Shizuku.checkShizukuInstalled();
      if (!installed) {
        setShizukuStatus('unavailable');
        onShizukuReady(false);
        return;
      }

      const { running } = await Shizuku.checkShizukuRunning();
      if (!running) {
        setShizukuStatus('unavailable');
        onShizukuReady(false);
        return;
      }

      const { granted } = await Shizuku.checkShizukuPermission();
      if (granted) {
        setShizukuStatus('granted');
        onShizukuReady(true);
      } else {
        setShizukuStatus('available');
        onShizukuReady(false);
      }
    } catch (error) {
      console.error("Error checking Shizuku:", error);
      setShizukuStatus('unavailable');
      onShizukuReady(false);
    }
  };

  const requestShizukuPermission = async () => {
    toast.info("Requesting Shizuku permission...");
    
    try {
      const permissionResult = await Shizuku.requestShizukuPermission();
      
      if (!permissionResult.granted) {
        toast.error("Shizuku permission denied");
        return;
      }

      const overlayResult = await Shizuku.grantOverlayPermission();
      
      if (overlayResult.granted) {
        setShizukuStatus('granted');
        onShizukuReady(true);
        toast.success("Shizuku permission granted! Overlay will work over games.");
      } else {
        toast.error("Failed to grant overlay permission");
      }
    } catch (error) {
      toast.error("Failed to get Shizuku permission");
      console.error(error);
    }
  };

  if (!isNative) {
    return (
      <Card className="p-6 border-muted">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-muted-foreground mt-1" />
          <div className="space-y-2">
            <h3 className="font-semibold text-muted-foreground">Preview Mode</h3>
            <p className="text-sm text-muted-foreground">
              Shizuku integration only works in the installed Android app.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (shizukuStatus === 'checking') {
    return (
      <Card className="p-6 border-primary/50">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-primary animate-pulse" />
          <p className="text-sm">Checking Shizuku status...</p>
        </div>
      </Card>
    );
  }

  if (shizukuStatus === 'granted') {
    return (
      <Card className="p-6 border-green-500/50 bg-green-500/5">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
          <div className="space-y-2">
            <h3 className="font-semibold text-green-500">Shizuku Active</h3>
            <p className="text-sm text-muted-foreground">
              Elevated permissions granted. Overlay will work over games!
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (shizukuStatus === 'unavailable') {
    return (
      <Card className="p-6 border-destructive/50">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive mt-1" />
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-destructive">Shizuku Not Running</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Shizuku is required for overlay to work over games.
              </p>
            </div>
            <div className="text-xs space-y-1 text-muted-foreground">
              <p>1. Install Shizuku from Play Store</p>
              <p>2. Grant Shizuku ADB access (wireless or USB)</p>
              <p>3. Keep Shizuku running in background</p>
              <p>4. Restart this app</p>
            </div>
            <Button onClick={checkShizuku} variant="outline" size="sm">
              Recheck Shizuku
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-primary/50">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-primary mt-1" />
          <div className="space-y-2">
            <h3 className="font-semibold">Shizuku Detected</h3>
            <p className="text-sm text-muted-foreground">
              Grant permission to enable system-wide overlay with elevated access.
            </p>
          </div>
        </div>
        <Button onClick={requestShizukuPermission} className="w-full">
          Grant Shizuku Permission
        </Button>
      </div>
    </Card>
  );
};
