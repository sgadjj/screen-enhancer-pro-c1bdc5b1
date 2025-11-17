# Building Visual Enhancer APK

## Prerequisites
- Node.js installed
- Android Studio installed
- Git installed

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
1. In Android Studio, go to: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. Wait for the build to complete
3. Find the APK at: `android/app/build/outputs/apk/debug/app-debug.apk`

## Important Notes

### Overlay Permissions
When you install the app, you'll need to grant overlay permissions:
1. Install the APK
2. Open the app
3. Android will prompt for "Display over other apps" permission
4. Grant the permission
5. The floating toggle button will appear

### Limitations
- **Android restricts overlays**: The app works within its own window, not as a system-wide overlay over games/apps
- **Performance**: Filters work best on content within the app itself
- **Gaming overlays**: Most games block external overlays for security/anti-cheat reasons

### Testing
The app will work perfectly when:
- Viewing the app's own content
- Taking screenshots and applying filters
- Testing filter combinations

It will NOT work as a system-wide overlay over other apps due to Android security restrictions.

## Alternative: APK from GitHub Actions (Optional)

You can set up automated APK builds using GitHub Actions. Create `.github/workflows/build.yml`:

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

This will automatically build an APK whenever you push to GitHub.
