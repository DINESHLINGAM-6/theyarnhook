/**
 * Generate inline SVG data-URI placeholder images – replaces all placehold.co URLs.
 * Zero external requests, correct aspect ratio, branded colours.
 */
export function placeholderSvg(
  w: number,
  h: number,
  bg: string,
  fg: string,
  label: string
): string {
  const lines = label.split(" ");
  const y1 = h / 2 - 10;
  const y2 = h / 2 + 16;
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`,
    `<rect width="${w}" height="${h}" fill="${bg}"/>`,
    `<text x="50%" y="${y1}" font-family="Georgia,serif" font-size="${Math.max(14, Math.round(w / 12))}" fill="${fg}" text-anchor="middle" dominant-baseline="middle">${lines[0] ?? ""}</text>`,
    lines[1]
      ? `<text x="50%" y="${y2}" font-family="Georgia,serif" font-size="${Math.max(12, Math.round(w / 16))}" fill="${fg}" opacity="0.7" text-anchor="middle" dominant-baseline="middle">${lines.slice(1).join(" ")}</text>`
      : "",
    `</svg>`,
  ].join("");
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// Pre-built named placeholders used throughout data.ts

/** 1200×1200 collection hero images */
export const collectionPlaceholders = {
  desire: placeholderSvg(1200, 1200, "#7A1F3D", "#FFFFFF", "Desire Collection"),
  milka: placeholderSvg(1200, 1200, "#6B4A2C", "#FFFFFF", "Milka Collection"),
  souffle: placeholderSvg(1200, 1200, "#F2C879", "#3A2350", "Souffle Collection"),
  "plush-luxe": placeholderSvg(1200, 1200, "#3A2350", "#FFFFFF", "Plush Luxe Collection"),
};

/** 800×800 product card images, keyed by collectionId */
export const productPlaceholders = {
  desire: placeholderSvg(800, 800, "#7A1F3D", "#FFFFFF", "Desire Yarn"),
  milka: placeholderSvg(800, 800, "#6B4A2C", "#FFFFFF", "Milka Yarn"),
  souffle: placeholderSvg(800, 800, "#F2C879", "#3A2350", "Souffle Yarn"),
  "plush-luxe": placeholderSvg(800, 800, "#3A2350", "#FFFFFF", "Plush Luxe Yarn"),
};

/** 1200×1500 lookbook portrait images, keyed by project id */
export const lookbookPlaceholders = {
  throws: placeholderSvg(1200, 1500, "#F2C879", "#3A2350", "Throws Yarn"),
  garments: placeholderSvg(1200, 1500, "#6B4A2C", "#FFFFFF", "Milka Yarn"),
  amigurumi: placeholderSvg(1200, 1500, "#7A1F3D", "#FFFFFF", "Desire Yarn"),
  home: placeholderSvg(1200, 1500, "#3A2350", "#FFFFFF", "Plush Luxe Yarn"),
};

/** 400×400 cart empty state illustration */
export const cartEmptyPlaceholder = placeholderSvg(400, 400, "#F4DCE2", "#7A1F3D", "Yarn Skein");
