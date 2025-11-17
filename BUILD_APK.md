# Building Visual Enhancer APK

## ⚠️ CRITICAL: READ THIS FIRST

**YOU CANNOT GET A READY APK FILE FROM GITHUB**
- GitHub stores source code, not compiled apps
- You MUST build the APK yourself using Android Studio
- There is no shortcut or automatic APK generation

**OVERLAY OVER GAMES WILL NOT WORK ON MODERN ANDROID**
- Android 10+ blocks overlays over games
- Games have anti-cheat that detects overlays
- The app will request permission but it won't work system-wide

## Prerequisites
- Node.js installed
- Android Studio installed
- Git installed
- USB Debugging enabled on your phone (Settings → Developer Options → USB Debugging)

## Steps to Build APK

### 1. Export to GitHub
1. Click the GitHub button in Lovable (top right)
2. Click "Export to GitHub" 
3. Clone your repository locally:
```bash
git clone <your-github-url>
cd <your-repo-name>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Add Android Platform
```bash
npx cap add android
```
This creates the `android/` folder with AndroidManifest.xml

### 4. Update Android Platform
```bash
npx cap update android
```

### 5. Build the Web App
```bash
npm run build
```

### 6. Sync to Android
```bash
npx cap sync android
```

### 7. Open in Android Studio
```bash
npx cap open android
```

### 8. Build APK in Android Studio
1. Wait for Gradle sync to complete (this may take 5-10 minutes the first time)
2. Go to: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
3. Wait for build to complete
4. Find the APK at: `android/app/build/outputs/apk/debug/app-debug.apk`

### 9. Install on Your Phone

**If Android Studio doesn't recognize your phone:**
1. Enable Developer Options: Settings → About Phone → Tap "Build Number" 7 times
2. Enable USB Debugging: Settings → Developer Options → USB Debugging
3. Install USB drivers for your phone brand
4. Try a different USB cable (must support data transfer)

**OR manually copy APK:**
1. Copy `app-debug.apk` from computer to phone via USB/cloud
2. Install it manually on your phone
3. You may need to enable "Install from Unknown Sources"

## Important Notes

### Overlay Permission
When you first open the app, it will ask for "Display over other apps" permission. You must grant this, but **it has severe limitations**:

✅ **What Works:**
- Permission request will show up
- Filters work inside the app window
- Can process screenshots/photos
- Can test filter combinations
- Floating toggle button works

❌ **What DOESN'T Work:**
- **System-wide overlay over games** (Android blocks this)
- **Overlay over any app** (security restriction)
- Works only inside the app's own window

### Why Games Won't Work
- Android 10+ blocks overlays over games for security
- Games actively detect and block overlay apps
- Requires root access + custom kernel for real system-wide filters
- Battery drain and severe performance lag

### Alternative Solutions
1. **Root + Custom Kernel** - Requires rooting (voids warranty)
2. **Screenshot Processing** - Use this app to enhance screenshots after playing
3. **Manufacturer Game Tools** - Use Samsung Game Plugins or similar
4. **Screen Recording** - Record gameplay, apply filters in post

## Testing
Test in browser first to verify all controls work:
```bash
npm run dev
```

## GitHub Actions (Optional Automation)

Create `.github/workflows/build.yml` to auto-build APK on push:

```yaml
name: Build APK

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '17'
      - run: npm install
      - run: npm run build
      - run: npx cap sync android
      - name: Build APK
        run: cd android && ./gradlew assembleDebug
      - uses: actions/upload-artifact@v3
        with:
          name: app-debug.apk
          path: android/app/build/outputs/apk/debug/app-debug.apk
```

Then download APK from: Actions → Latest workflow → Artifacts

## The Reality

This app **cannot** work as a system-wide game filter on modern Android without:
- Rooted device
- Custom kernel modifications
- Or using manufacturer's built-in display settings
