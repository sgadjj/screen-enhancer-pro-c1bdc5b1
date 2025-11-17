package app.lovable.visualenhancer;

import android.content.pm.PackageManager;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import rikka.shizuku.Shizuku;

@CapacitorPlugin(name = "Shizuku")
public class ShizukuPlugin extends Plugin {

    private final Shizuku.OnRequestPermissionResultListener REQUEST_PERMISSION_RESULT_LISTENER = (requestCode, grantResult) -> {
        boolean granted = grantResult == PackageManager.PERMISSION_GRANTED;
        if (pendingCall != null) {
            JSObject ret = new JSObject();
            ret.put("granted", granted);
            pendingCall.resolve(ret);
            pendingCall = null;
        }
    };

    private PluginCall pendingCall;

    @Override
    public void load() {
        super.load();
        Shizuku.addRequestPermissionResultListener(REQUEST_PERMISSION_RESULT_LISTENER);
    }

    @Override
    protected void handleOnDestroy() {
        super.handleOnDestroy();
        Shizuku.removeRequestPermissionResultListener(REQUEST_PERMISSION_RESULT_LISTENER);
    }

    @PluginMethod
    public void checkShizukuInstalled(PluginCall call) {
        try {
            boolean installed = ShizukuHelper.isShizukuInstalled(getContext().getPackageManager());
            JSObject ret = new JSObject();
            ret.put("installed", installed);
            call.resolve(ret);
        } catch (Exception e) {
            call.reject("Error checking Shizuku installation", e);
        }
    }

    @PluginMethod
    public void checkShizukuRunning(PluginCall call) {
        try {
            boolean running = ShizukuHelper.isShizukuRunning();
            JSObject ret = new JSObject();
            ret.put("running", running);
            call.resolve(ret);
        } catch (Exception e) {
            call.reject("Error checking Shizuku status", e);
        }
    }

    @PluginMethod
    public void checkShizukuPermission(PluginCall call) {
        try {
            boolean granted = ShizukuHelper.checkShizukuPermission();
            JSObject ret = new JSObject();
            ret.put("granted", granted);
            call.resolve(ret);
        } catch (Exception e) {
            call.reject("Error checking Shizuku permission", e);
        }
    }

    @PluginMethod
    public void requestShizukuPermission(PluginCall call) {
        try {
            if (!ShizukuHelper.isShizukuRunning()) {
                JSObject ret = new JSObject();
                ret.put("granted", false);
                call.resolve(ret);
                return;
            }

            if (ShizukuHelper.checkShizukuPermission()) {
                JSObject ret = new JSObject();
                ret.put("granted", true);
                call.resolve(ret);
                return;
            }

            pendingCall = call;
            ShizukuHelper.requestShizukuPermission();
        } catch (Exception e) {
            pendingCall = null;
            call.reject("Error requesting Shizuku permission", e);
        }
    }

    @PluginMethod
    public void grantOverlayPermission(PluginCall call) {
        try {
            String packageName = getContext().getPackageName();
            boolean granted = ShizukuHelper.grantOverlayPermissionViaShizuku(packageName);
            JSObject ret = new JSObject();
            ret.put("granted", granted);
            call.resolve(ret);
        } catch (Exception e) {
            call.reject("Error granting overlay permission", e);
        }
    }
}
