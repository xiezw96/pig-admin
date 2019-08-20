export function a2b(base64: string) {
  if (!base64) return '';
  return atob(base64);
}
