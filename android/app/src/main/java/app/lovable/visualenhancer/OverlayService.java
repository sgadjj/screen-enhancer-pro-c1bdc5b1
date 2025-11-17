package app.lovable.visualenhancer;

import android.app.Service;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.os.Build;
import android.os.IBinder;
import android.view.Gravity;
import android.view.WindowManager;
import android.widget.FrameLayout;

public class OverlayService extends Service {
    private WindowManager windowManager;
    private FrameLayout overlayView;

    @Override
    public void onCreate() {
        super.onCreate();

        // Create overlay view
        overlayView = new FrameLayout(this);
        
        // Set up window manager parameters
        WindowManager.LayoutParams params;
        
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            params = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.MATCH_PARENT,
                WindowManager.LayoutParams.MATCH_PARENT,
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE |
                WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE |
                WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN,
                PixelFormat.TRANSLUCENT
            );
        } else {
            params = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.MATCH_PARENT,
                WindowManager.LayoutParams.MATCH_PARENT,
                WindowManager.LayoutParams.TYPE_PHONE,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE |
                WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE,
                PixelFormat.TRANSLUCENT
            );
        }

        params.gravity = Gravity.TOP | Gravity.START;

        // Add view to window manager
        windowManager = (WindowManager) getSystemService(WINDOW_SERVICE);
        windowManager.addView(overlayView, params);
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (overlayView != null && windowManager != null) {
            windowManager.removeView(overlayView);
        }
    }
}
