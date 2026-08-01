"use client";

import { FormEvent, useState } from "react";
import { event, hasLink } from "@/lib/event";
import { SpotifyPlaylistLink } from "@/components/SpotifyPlaylistLink";
import s from "@/app/home.module.css";

type Status = "idle" | "loading" | "ok" | "error";

export function SuggestSong() {
  const [nombre, setNombre] = useState("");
  const [tema, setTema] = useState("");
  const [artista, setArtista] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const spotifyReady = hasLink(event.spotifyPlaylistUrl);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const t = tema.trim();
    if (!t) {
      setError("Escribí el nombre del tema.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          tema: t,
          artista: artista.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "No se pudo guardar. Probá de nuevo.");
      }
      setStatus("ok");
      setTema("");
      setArtista("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Algo salió mal.");
    }
  }

  if (status === "ok") {
    return (
      <div className={s.songOk}>
        <p className={s.songOkTitle}>¡Tema anotado!</p>
        <p className={s.songOkText}>Lo sumamos a la playlist de la fiesta.</p>
        <button
          type="button"
          className={`${s.btn} ${s.btnSun}`}
          onClick={() => setStatus("idle")}
        >
          Sumar otro
        </button>
      </div>
    );
  }

  return (
    <>
      <form className={s.songForm} onSubmit={onSubmit}>
        <label className={s.songLabel}>
          Tema
          <input
            className={s.songInput}
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            placeholder="Ej. Cruel Summer"
            maxLength={120}
            required
          />
        </label>
        <label className={s.songLabel}>
          Artista <span className={s.songOptional}>(opcional)</span>
          <input
            className={s.songInput}
            value={artista}
            onChange={(e) => setArtista(e.target.value)}
            placeholder="Ej. Taylor Swift"
            maxLength={120}
          />
        </label>
        <label className={s.songLabel}>
          Tu nombre <span className={s.songOptional}>(opcional)</span>
          <input
            className={s.songInput}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoComplete="nickname"
            maxLength={60}
          />
        </label>

        {error && <p className={s.rsvpError}>{error}</p>}

        <button
          type="submit"
          className={`${s.btn} ${s.btnSun}`}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Guardando…" : "Sumar este tema"}
        </button>
      </form>

      {spotifyReady && (
        <p className={s.songSpotifyHint}>
          ¿Querés escuchar la playlist?{" "}
          <SpotifyPlaylistLink className={s.songSpotifyLink}>
            Abrir en Spotify
          </SpotifyPlaylistLink>
        </p>
      )}
    </>
  );
}
