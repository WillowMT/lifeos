import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Daybase — Personal Memory Bank",
    short_name: "Daybase",
    description: "Capture and find the memories that shape your days.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f5f3ef",
    theme_color: "#f5f3ef",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
