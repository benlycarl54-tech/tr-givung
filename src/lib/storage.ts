// localStorage-based storage replacing base44 entities

const STORAGE_KEY = 'site_settings';

export function getSiteSettings(): Record<string, string> | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveSiteSettings(data: Record<string, string>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
