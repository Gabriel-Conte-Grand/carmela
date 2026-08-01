"use client";

import type { ReactNode, MouseEvent } from "react";
import { event } from "@/lib/event";

type Props = {
  className?: string;
  children: ReactNode;
};

/**
 * Opens the playlist in the Spotify app on Android/iPhone when possible,
 * and falls back to open.spotify.com if the app is missing.
 */
export function SpotifyPlaylistLink({ className, children }: Props) {
  const webUrl = event.spotifyPlaylistUrl;
  const appUrl = `spotify:playlist:${event.spotifyPlaylistId}`;

  function openSpotify(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    const ua = navigator.userAgent;
    const isAndroid = /Android/i.test(ua);

    if (isAndroid) {
      window.location.href =
        `intent://playlist/${event.spotifyPlaylistId}` +
        `#Intent;scheme=spotify;package=com.spotify.music;` +
        `S.browser_fallback_url=${encodeURIComponent(webUrl)};end`;
      return;
    }

    let leftForApp = false;
    const markLeft = () => {
      leftForApp = true;
    };

    document.addEventListener("visibilitychange", markLeft);
    window.addEventListener("pagehide", markLeft);

    window.location.href = appUrl;

    window.setTimeout(() => {
      document.removeEventListener("visibilitychange", markLeft);
      window.removeEventListener("pagehide", markLeft);
      if (!leftForApp && !document.hidden) {
        window.location.href = webUrl;
      }
    }, 1400);
  }

  return (
    <a href={webUrl} className={className} onClick={openSpotify}>
      {children}
    </a>
  );
}
