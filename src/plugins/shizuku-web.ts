import { WebPlugin } from '@capacitor/core';
import type { ShizukuPlugin } from './shizuku';

export class ShizukuWeb extends WebPlugin implements ShizukuPlugin {
  async checkShizukuInstalled(): Promise<{ installed: boolean }> {
    return { installed: false };
  }

  async checkShizukuRunning(): Promise<{ running: boolean }> {
    return { running: false };
  }

  async checkShizukuPermission(): Promise<{ granted: boolean }> {
    return { granted: false };
  }

  async requestShizukuPermission(): Promise<{ granted: boolean }> {
    return { granted: false };
  }

  async grantOverlayPermission(): Promise<{ granted: boolean }> {
    return { granted: false };
  }
}
