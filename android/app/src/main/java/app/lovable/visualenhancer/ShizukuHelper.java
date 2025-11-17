package app.lovable.visualenhancer;

import android.content.pm.PackageManager;
import android.os.IBinder;
import rikka.shizuku.Shizuku;
import rikka.shizuku.ShizukuBinderWrapper;
import rikka.shizuku.SystemServiceHelper;

public class ShizukuHelper {
    private static final String SHIZUKU_PACKAGE = "moe.shizuku.privileged.api";
    private static final int SHIZUKU_PERMISSION_REQUEST_CODE = 1;

    public static boolean isShizukuInstalled(PackageManager pm) {
        try {
            pm.getPackageInfo(SHIZUKU_PACKAGE, 0);
            return true;
        } catch (PackageManager.NameNotFoundException e) {
            return false;
        }
    }

    public static boolean isShizukuRunning() {
        try {
            return Shizuku.pingBinder();
        } catch (Exception e) {
            return false;
        }
    }

    public static boolean checkShizukuPermission() {
        if (!isShizukuRunning()) {
            return false;
        }
        return Shizuku.checkSelfPermission() == PackageManager.PERMISSION_GRANTED;
    }

    public static void requestShizukuPermission() {
        if (isShizukuRunning() && !checkShizukuPermission()) {
            Shizuku.requestPermission(SHIZUKU_PERMISSION_REQUEST_CODE);
        }
    }

    public static boolean grantOverlayPermissionViaShizuku(String packageName) {
        if (!checkShizukuPermission()) {
            return false;
        }

        try {
            // Use Shizuku to grant SYSTEM_ALERT_WINDOW permission
            IBinder appOps = SystemServiceHelper.getSystemService("appops");
            if (appOps != null) {
                // Execute shell command via Shizuku to grant overlay permission
                String command = "appops set " + packageName + " SYSTEM_ALERT_WINDOW allow";
                Shizuku.newProcess(new String[]{"sh", "-c", command}, null, null).waitFor();
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
