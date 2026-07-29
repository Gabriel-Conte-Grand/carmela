import type { Metadata } from "next";
import Link from "next/link";
import { Syne, Space_Mono } from "next/font/google";
import { event, hasLink } from "@/lib/event";
import { RotatingPhoto } from "@/components/RotatingPhoto";
import { ActivityToast } from "@/components/ActivityToast";
import { ConfirmUrban } from "@/components/ConfirmUrban";
import s from "./styles.module.css";

const display = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-v3display",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-v3mono",
});

export const metadata: Metadata = {
  title: "Carmela 15 · Urbana",
  description:
    "Pool party en Sauce Viejo. Sábado 3 de octubre, de 12 a 17 hs.",
};

const marquee =
  "Pool party · 03.10.26 · 12 a 17 h · traé malla · pool party · 03.10.26 · 12 a 17 h · traé malla · ";

export default function V3Urban() {
  const albumReady = hasLink(event.photosAlbumUrl);

  return (
    <main className={`${s.shell} ${display.variable} ${mono.variable}`}>
      <header className={s.hero}>
        <div className={s.meta}>
          <span>{event.dateCompact}</span>
          <span>{event.locationLabel} / ER</span>
          <span>12–17h</span>
        </div>
        <div className={s.metaLine} aria-hidden />

        <h1 className={s.h1}>
          CARMELA
          <br />
          <span className={s.pink}>CUMPLE</span>
          <br />
          <span className={s.h1Sub}>
            15
            <span className={s.h1Tag}>y hace pool party</span>
          </span>
        </h1>

        <div className={s.heroRow}>
          <div className={s.heroShot}>
            <RotatingPhoto
              offset={0}
              className={s.heroShotImg}
              intervalMs={4600}
            />
          </div>
          <p className={s.heroCopy}>
            Sábado entero de pileta.
            <br />
            Traé malla, toalla y
            <br />
            ganas de tirarte de cabeza.
          </p>
        </div>

        <a href="#confirmar" className={s.cta}>
          Confirmar que voy →
        </a>
      </header>

      <div className={s.marquee} aria-hidden>
        <div className={s.marqueeTrack}>
          <span>{marquee}</span>
          <span>{marquee}</span>
        </div>
      </div>

      <section className={s.block}>
        <div className={s.secHead}>
          <span className={s.secNum}>01</span>
          <span className={s.secLabel}>Dónde es</span>
        </div>
        <h2 className={s.secTitle}>{event.locationName}</h2>
        <div className={s.mapFrame}>
          <iframe
            src={event.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa"
          />
        </div>
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={s.linkOrange}
        >
          Abrir en Maps ↗
        </a>
      </section>

      <section className={s.block}>
        <div className={s.secHead}>
          <span className={s.secNum}>02</span>
          <span className={s.secLabel}>La playlist</span>
        </div>
        <div className={s.card}>
          <div className={s.cardShot}>
            <RotatingPhoto
              offset={2}
              className={s.cardShotImg}
              intervalMs={4600}
            />
          </div>
          <div>
            <h3 className={s.cardTitle}>
              Metele
              <br />
              tu tema
            </h3>
            <p className={s.cardText}>
              Playlist colaborativa.
              <br />
              Si no la agregás, no llorés.
            </p>
            <a
              href={event.spotifyPlaylistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={s.linkGhost}
            >
              Abrir Spotify ↗
            </a>
          </div>
        </div>
      </section>

      <section className={s.blockTight}>
        <div className={s.secHead}>
          <span className={s.secNum}>03</span>
          <span className={s.secLabel}>Las fotos</span>
        </div>
        <div className={s.cardRev}>
          <div className={s.cardShot}>
            <RotatingPhoto
              offset={4}
              className={s.cardShotImg}
              intervalMs={4600}
            />
          </div>
          <div>
            <h3 className={s.cardTitle}>
              Subí
              <br />
              las fotos
            </h3>
            <p className={s.cardText}>Álbum compartido del día.</p>
            {albumReady ? (
              <a
                href={event.photosAlbumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={s.linkGhost}
              >
                Abrir álbum ↗
              </a>
            ) : (
              <span className={s.linkMuted}>El álbum llega en breve</span>
            )}
          </div>
        </div>
      </section>

      <section className={s.confirm} id="confirmar">
        <div className={s.confirmTop}>
          <span>04 / Confirmación</span>
          <span className={s.live}>
            <span className={s.liveDot} aria-hidden />
            Cupo abierto
          </span>
        </div>
        <div className={s.confirmLine} aria-hidden />
        <h2 className={s.confirmTitle}>
          ¿VAS A
          <br />
          VENIR?
        </h2>
        <p className={s.confirmLead}>
          Primero la seña de {event.contributionAmount}, después te anotás. Se
          descuenta de la barra.
        </p>
        <ConfirmUrban />
      </section>

      <footer className={s.footer}>
        <p className={s.footerTitle}>NOS VEMOS EN EL AGUA</p>
        <p className={s.versions}>
          Otras versiones: <Link href="/">1</Link> · <Link href="/v2">2</Link>
        </p>
      </footer>

      <ActivityToast
        className={s.toast}
        dotClassName={s.toastDot}
        nameClassName={s.toastName}
        initialDelay={3200}
        visibleMs={4300}
        gapMs={5000}
      />
    </main>
  );
}
