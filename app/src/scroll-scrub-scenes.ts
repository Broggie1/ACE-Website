import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#D6A62A",
  background: "#173F35",
  ink: "#F4F7F3",
  muted: "#DDE9E0",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    id: "community-energy",
    label: "Ashford",
    poster: "/assets/world/scene-01-poster.webp",
    mobilePoster: "/assets/world/scene-01-mobile-poster.webp",
    clip: "/assets/world/scene-01.mp4",
    mobileClip: "/assets/world/scene-01-mobile.mp4",
    kicker: "Community energy in Ashford",
    title: "Local energy starts here",
    body: "People, places and practical projects can keep more of the value of clean energy within our community.",
    tags: ["Community led", "Evidence based", "Local benefit"],
    align: "left",
    scroll: 3.6,
    linger: 0.18,
    objectPosition: "50% 50%",
    mobileObjectPosition: "52% 50%",
  },
];
