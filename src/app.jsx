import { webUpdate } from '@/services/web';

export function render(oldRender) {
  webUpdate();
  oldRender();
}
