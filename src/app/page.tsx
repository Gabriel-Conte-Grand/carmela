import type { Metadata } from "next";
import Image from "next/image";
import { Fredoka } from "next/font/google";
import { event, hasLink } from "@/lib/event";
import { QrImage } from "@/components/QrImage";
import { ConfirmHome } from "@/components/ConfirmHome";
import s from "./home.module.css";

const display = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-v1display",
});

export const metadata: Metadata = {
  title: "Carmela 15 · Pool Party",
  description:
    "Te invito a mi Pool Party de 15. Sábado 3 de octubre, de 12 a 17 hs.",
};

export default function Home() {
  const albumReady = hasLink(event.photosAlbumUrl);

  return (
    <main className={`${s.page} ${display.variable}`}>
      <nav className={s.nav}>
        <span className={s.brand}>Carmela · XV</span>
        <div className={s.navLinks}>
          <a href="#fiesta">La fiesta</a>
          <a href="#confirmar">Confirmar</a>
          <a href="#musica">Música</a>
          <a href="#fotos">Fotos</a>
        </div>
      </nav>

      <header className={s.hero}>
        <div>
          <span className={s.eyebrow}>Pool party · 3 de octubre</span>
          <h1 className={s.h1}>
            Carmela cumple <em>15</em> y lo festejamos en la pile
          </h1>
          <p className={s.lead}>
            Una tarde de agua, música y amigos en {event.locationLabel}.
            Confirmá tu lugar y sumá tus temas a la playlist.
          </p>
          <div className={s.heroCtas}>
            <a href="#confirmar" className={s.btn}>
              Confirmar asistencia
            </a>
            <a
              href={event.spotifyPlaylistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.btn} ${s.btnGhost}`}
            >
              Sumar música
            </a>
          </div>
        </div>

        <div className={s.poolArt}>
          <div className={s.pool} />
          <div className={s.sunDot} aria-hidden />
          <div className={s.badge}>
            <p className={s.badgeTop}>Sáb 03.10</p>
            <p className={s.badgeSub}>12 a 17 hs</p>
          </div>
        </div>
      </header>

      <section className={s.ticketWrap} id="fiesta">
        <div className={s.ticket}>
          <div>
            <p className={s.tLabel}>Fecha</p>
            <p className={s.tValue}>Sáb 3 de octubre</p>
          </div>
          <div>
            <p className={s.tLabel}>Hora</p>
            <p className={s.tValue}>12 a 17 hs</p>
          </div>
          <div>
            <p className={s.tLabel}>Lugar</p>
            <p className={s.tValue}>
              {event.locationName} · {event.locationLabel}
            </p>
          </div>
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${s.btn} ${s.btnTeal}`}
          >
            Cómo llegar
          </a>
        </div>
      </section>

      <section className={s.section} id="confirmar">
        <div className={s.splitGrid}>
          <div>
            <h2 className={s.sectionHead}>Reservá tu lugar</h2>
            <p className={s.sectionSub}>
              Para reservar tu lugar, dejá la seña y anotate con tu nombre.
            </p>
            <ConfirmHome />
          </div>

          <div className={s.photoFrame}>
            <Image
              src="/img/v3-splash.jpg"
              alt="Salpicadura de un salto a la pileta al sol"
              width={1400}
              height={1050}
            />
          </div>
        </div>
      </section>

      <section className={s.section} id="musica">
        <h2 className={s.sectionHead}>Entre todos</h2>
        <p className={s.sectionSub}>
          La música y las fotos del cumple las armamos entre todos los
          invitados.
        </p>
        <div className={s.cards}>
          <div className={`${s.card} ${s.cardTeal}`}>
            <Image
              src="/img/v3-music.jpg"
              alt="Parlante retro coral al borde de la pileta"
              width={1400}
              height={1050}
            />
            <div className={s.cardBody}>
              <h3>La playlist</h3>
              <p>
                Sumá los temas que no pueden faltar a{" "}
                <strong>{event.spotifyPlaylistName}</strong>. Lo que agregues
                suena en la fiesta.
              </p>
              <a
                href={event.spotifyPlaylistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${s.btn} ${s.btnSun}`}
              >
                Abrir en Spotify
              </a>
            </div>
          </div>
          <div className={`${s.card} ${s.cardLight}`} id="fotos">
            <Image
              src="/img/v3-photos.jpg"
              alt="Fotos instantáneas sobre una toalla al lado de la pileta"
              width={1400}
              height={1050}
            />
            <div className={s.cardBody}>
              <h3>Las fotos</h3>
              <p>
                Durante la fiesta, subí las fotos que saques al álbum
                compartido. Después queda de recuerdo para todos.
              </p>
              {albumReady ? (
                <>
                  <div className={s.qr}>
                    <QrImage url={event.photosAlbumUrl} dark="#0e7c86" />
                  </div>
                  <a
                    href={event.photosAlbumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${s.btn} ${s.btnTeal}`}
                  >
                    Abrir álbum
                  </a>
                </>
              ) : (
                <>
                  <span className={`${s.btn} ${s.btnOff}`}>Abrir álbum</span>
                  <p className={s.hint}>El álbum se publica en breve</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <svg
        className={s.footWave}
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,32 C150,60 300,0 450,24 C600,48 750,8 900,28 C1050,48 1150,20 1200,32 L1200,60 L0,60 Z"
          fill="currentColor"
        />
      </svg>
      <footer className={s.footer}>
        <p className={s.footScript}>¡nos vemos en la pile!</p>
        <p className={s.footNote}>{event.closingNote}</p>
      </footer>
    </main>
  );
}
