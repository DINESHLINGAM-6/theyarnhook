function clamp(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

export function shade(hex: string, amount: number): string {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return hex;
  const num = parseInt(clean, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const target = amount < 0 ? 0 : 255;
  const t = Math.abs(amount);
  const nr = clamp(r + (target - r) * t);
  const ng = clamp(g + (target - g) * t);
  const nb = clamp(b + (target - b) * t);
  return `#${((nr << 16) | (ng << 8) | nb).toString(16).padStart(6, "0")}`;
}

export function mixHex(a: string, b: string, t: number): string {
  const pa = a.replace("#", "");
  const pb = b.replace("#", "");
  if (pa.length !== 6 || pb.length !== 6) return a;
  const na = parseInt(pa, 16);
  const nb = parseInt(pb, 16);
  const ar = (na >> 16) & 255;
  const ag = (na >> 8) & 255;
  const ab = na & 255;
  const br = (nb >> 16) & 255;
  const bg = (nb >> 8) & 255;
  const bb = nb & 255;
  const r = clamp(ar + (br - ar) * t);
  const g = clamp(ag + (bg - ag) * t);
  const bl = clamp(ab + (bb - ab) * t);
  return `#${((r << 16) | (g << 8) | bl).toString(16).padStart(6, "0")}`;
}

export function isLight(hex: string): boolean {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return true;
  const num = parseInt(clean, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62;
}
