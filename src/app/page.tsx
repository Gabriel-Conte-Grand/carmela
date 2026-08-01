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
            Confirmá tu lugar y sumate a la fiesta.
          </p>
          <div className={s.heroCtas}>
            <a href="#confirmar" className={s.btn}>
              Confirmar asistencia
            </a>
            <a href="#fotos" className={`${s.btn} ${s.btnGhost}`}>
              Álbum de fotos
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
              Para reservar tu lugar, dejá tu aporte de $10.000.
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

      <section className={s.section} id="fotos">
        <h2 className={s.sectionHead}>Las fotos</h2>
        <p className={s.sectionSub}>
          Durante la fiesta, subí las fotos que saques al álbum compartido.
          Después queda de recuerdo para todos.
        </p>
        <div className={s.cards}>
          <div className={`${s.card} ${s.cardLight}`}>
            <Image
              src="/img/v3-photos.jpg"
              alt="Fotos instantáneas sobre una toalla al lado de la pileta"
              width={1400}
              height={1050}
            />
            <div className={s.cardBody}>
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
