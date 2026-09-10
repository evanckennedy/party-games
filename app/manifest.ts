import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Party Games",
    short_name: "Party Games",
    description: "Pass the phone. Make memories.",
    start_url: "/",
    display: "standalone",
    background_color: "#11100f",
    theme_color: "#11100f",
    icons: [
      {
        src: "/icons/party-games-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/party-games-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
