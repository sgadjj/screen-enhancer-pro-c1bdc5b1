import { registerPlugin } from '@capacitor/core';

export interface ShizukuPlugin {
  checkShizukuInstalled(): Promise<{ installed: boolean }>;
  checkShizukuRunning(): Promise<{ running: boolean }>;
  checkShizukuPermission(): Promise<{ granted: boolean }>;
  requestShizukuPermission(): Promise<{ granted: boolean }>;
  grantOverlayPermission(): Promise<{ granted: boolean }>;
}

const Shizuku = registerPlugin<ShizukuPlugin>('Shizuku', {
  web: () => import('./shizuku-web').then(m => new m.ShizukuWeb()),
});

export default Shizuku;
