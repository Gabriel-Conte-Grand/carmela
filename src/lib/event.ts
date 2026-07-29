/**
 * Event config — paste Yanina's links here when ready.
 * Empty strings hide / disable the corresponding CTAs.
 */
export const event = {
  name: "Carmela",
  age: 15,
  title: "Pool Party",
  inviteLine: "Te invito a vivir este día especial conmigo",
  dateLabel: "Sábado 3 de octubre",
  dateShort: "03.10",
  dateCompact: "03.10.26",
  timeLabel: "12:00 a 17:00 hs",
  timeShort: "12 a 17 h",
  locationLabel: "Sauce Viejo",
  locationName: "La quinta",
  mapsUrl:
    "https://www.google.com/maps?q=-31.732330322265625,-60.803768157958984&z=17&hl=es",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=-31.73233,-60.80377&z=16&hl=es&output=embed",
  spotifyPlaylistUrl:
    "https://open.spotify.com/playlist/6mVTWlmG5Eltq88rMXos2v?si=Y30Y2_sFT5SYy76I1tb5Kg",
  spotifyPlaylistName: "Cumple 15 Carme",
  googleFormUrl: "",
  mercadopagoUrl: "",
  contributionAmount: "$10.000",
  contributionNote:
    "Se descuenta de la barra el día del cumple. Sin la seña el lugar no queda reservado.",
  photosAlbumUrl: "",
  photosNote: "Subí las fotos del cumple al álbum",
  closingNote:
    "no te olvides el traje de baño, tus cositas para el agua y tu mejor vibe",
  year: 2026,
} as const;

export const photoPool = [
  "/img/v2-pool.jpg",
  "/img/v3-splash.jpg",
  "/img/v3-photos.jpg",
  "/img/v2-camera.jpg",
  "/img/v3-music.jpg",
  "/img/v2-disco.jpg",
  "/img/v3-hero.jpg",
] as const;

export function hasLink(url: string): boolean {
  return Boolean(url && url.trim().length > 0);
}
