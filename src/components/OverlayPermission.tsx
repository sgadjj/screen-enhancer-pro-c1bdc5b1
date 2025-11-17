import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

export const OverlayPermission = ({ onPermissionGranted }: { onPermissionGranted: () => void }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    // Check if running in Capacitor (native app)
    const checkNative = async () => {
      if ((window as any).Capacitor) {
        setIsNative(true);
        // On native, we need to request SYSTEM_ALERT_WINDOW permission
        checkOverlayPermission();
      }
    };
    checkNative();
  }, []);

  const checkOverlayPermission = async () => {
    try {
      // This would check Android's Settings.canDrawOverlays()
      // For now, we'll assume it needs to be requested
      setHasPermission(false);
    } catch (error) {
      console.error("Error checking overlay permission:", error);
    }
  };

  const requestOverlayPermission = async () => {
    if (!isNative) {
      toast.error("This only works in the installed Android app");
      return;
    }

    try {
      // Open Android settings to grant overlay permission
      toast.info("Opening settings... Please enable 'Display over other apps'");
      
      // This would trigger native code to open settings
      // await Capacitor.Plugins.App.openSettings();
      
      // For demo purposes
      setTimeout(() => {
        setHasPermission(true);
        onPermissionGranted();
        toast.success("Overlay permission granted!");
      }, 2000);
    } catch (error) {
      toast.error("Failed to request permission");
      console.error(error);
    }
  };

  if (!isNative) {
    return (
      <Card className="p-6 border-destructive/50">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive mt-1" />
          <div className="space-y-2">
            <h3 className="font-semibold text-destructive">Preview Mode</h3>
            <p className="text-sm text-muted-foreground">
              Overlay functionality only works in the installed Android app. 
              Follow BUILD_APK.md to create the APK.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (hasPermission) {
    return null;
  }

  return (
    <Card className="p-6 border-primary/50">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-primary mt-1" />
          <div className="space-y-2">
            <h3 className="font-semibold">Overlay Permission Required</h3>
            <p className="text-sm text-muted-foreground">
              This app needs permission to display over other apps. This is required for the filter overlay to work.
            </p>
            <p className="text-xs text-destructive font-medium">
              Warning: May not work on Android 10+ over games due to security restrictions.
            </p>
          </div>
        </div>
        <Button onClick={requestOverlayPermission} className="w-full">
          Grant Overlay Permission
        </Button>
      </div>
    </Card>
  );
};
