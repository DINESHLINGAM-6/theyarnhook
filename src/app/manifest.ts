import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TheYarnHook",
    short_name: "TheYarnHook",
    description:
      "Small-batch yarn for crochet and knitting, dyed slowly in India. Four collections, one soft obsession.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F1E8",
    theme_color: "#F7F1E8",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
