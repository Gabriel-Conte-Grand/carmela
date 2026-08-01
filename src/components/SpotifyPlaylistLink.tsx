"use client";

import type { ReactNode, MouseEvent } from "react";
import { event } from "@/lib/event";

type Props = {
  className?: string;
  children: ReactNode;
};

/**
 * Opens the collaborator invite URL in the Spotify app when possible.
 * Keeps the full https invite (?si=...) so guests can join and edit —
 * a bare spotify:playlist: link only opens view mode.
 */
export function SpotifyPlaylistLink({ className, children }: Props) {
  const webUrl = event.spotifyPlaylistUrl;

  function openSpotify(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isAndroid) {
      const path = webUrl.replace(/^https?:\/\//, "");
      window.location.href =
        `intent://${path}#Intent;scheme=https;package=com.spotify.music;` +
        `S.browser_fallback_url=${encodeURIComponent(webUrl)};end`;
      return;
    }

    // iOS / desktop: https invite — Universal Links open the app with join flow
    window.location.href = webUrl;
  }

  return (
    <a href={webUrl} className={className} onClick={openSpotify}>
      {children}
    </a>
  );
}
