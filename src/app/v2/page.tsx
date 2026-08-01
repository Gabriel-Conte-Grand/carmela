import type { Metadata } from "next";
import Link from "next/link";
import {
  Pinyon_Script,
  Cormorant_Garamond,
  Karla,
} from "next/font/google";
import { event, hasLink } from "@/lib/event";
import { RotatingPhoto } from "@/components/RotatingPhoto";
import { ActivityToast } from "@/components/ActivityToast";
import { ConfirmElegant } from "@/components/ConfirmElegant";
import { SpotifyPlaylistLink } from "@/components/SpotifyPlaylistLink";
import s from "./styles.module.css";

const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-v2script",
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-v2display",
});

const body = Karla({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-v2body",
});

export const metadata: Metadata = {
  title: "Carmela 15 · Elegante",
  description:
    "Pool party en Sauce Viejo. Sábado 3 de octubre, de 12 a 17 hs.",
};

export default function V2Elegant() {
  const albumReady = hasLink(event.photosAlbumUrl);

  return (
    <main
      className={`${s.shell} ${script.variable} ${display.variable} ${body.variable}`}
    >
      <header className={s.hero}>
        <div className={s.eyebrow}>
          Pool party · {event.locationLabel}
        </div>
        <div className={s.rule} aria-hidden />
        <h1 className={s.name}>{event.name}</h1>
        <p className={s.subtitle}>celebra sus quince</p>

        <div className={s.polaroid}>
          <RotatingPhoto offset={0} className={s.polaroidImg} />
        </div>

        <div className={s.when}>
          <span>Sáb 3 oct</span>
          <span className={s.dot} aria-hidden />
          <span>{event.timeShort}</span>
        </div>

        <a href="#confirmar" className={s.scrollCue}>
          Deslizá
          <span aria-hidden />
        </a>
      </header>

      <section className={s.quote}>
        <p className={s.quoteText}>
          Cumplo quince y lo quiero festejar como más me gusta: pileta, sol de
          la tarde y la gente que quiero adentro del agua.
        </p>
        <div className={s.quoteRule} aria-hidden />
      </section>

      <section className={s.info}>
        <div className={s.infoBlock}>
          <div className={s.infoLabel}>Cuándo</div>
          <div className={s.infoTitle}>{event.dateLabel}</div>
          <div className={s.infoSub}>de 12 del mediodía a 17 h</div>
        </div>
        <div className={s.infoLine} aria-hidden />
        <div className={s.infoBlock}>
          <div className={s.infoLabel}>Qué llevar</div>
          <div className={s.infoTitle}>Malla, toalla y ganas</div>
        </div>
      </section>

      <section className={s.place}>
        <div className={s.infoLabel}>El lugar</div>
        <div className={s.placeName}>{event.locationName}</div>
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
          className={s.linkCopper}
        >
          Abrir en Google Maps
        </a>
      </section>

      <section className={s.sideRow}>
        <div className={s.miniPolaroid}>
          <RotatingPhoto offset={2} className={s.miniPolaroidImg} />
        </div>
        <div className={s.sideText}>
          <div className={s.infoLabel}>La música</div>
          <div className={s.sideScript}>Dejame tu canción</div>
          <p className={s.sideItalic}>La playlist la armamos entre todos.</p>
          <SpotifyPlaylistLink className={s.linkInk}>
            Sumar un tema
          </SpotifyPlaylistLink>
        </div>
      </section>

      <section className={s.sideRowRev}>
        <div className={s.miniPolaroid}>
          <RotatingPhoto offset={4} className={s.miniPolaroidImg} />
        </div>
        <div className={s.sideTextRight}>
          <div className={s.infoLabel}>Las fotos</div>
          <div className={s.sideScript}>Álbum del día</div>
          <p className={s.sideItalic}>Subí ahí todo lo que saques.</p>
          {albumReady ? (
            <a
              href={event.photosAlbumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={s.linkInk}
            >
              Abrir el álbum
            </a>
          ) : (
            <span className={s.linkMuted}>El álbum llega en breve</span>
          )}
        </div>
      </section>

      <section className={s.confirm} id="confirmar">
        <div className={s.confirmEyebrow}>Confirmación</div>
        <h2 className={s.confirmTitle}>Te espero</h2>
        <p className={s.confirmLead}>
          El lugar se guarda con la seña. Primero el aporte, después te anotás.
        </p>
        <ConfirmElegant />
      </section>

      <footer className={s.footer}>
        <p className={s.footerScript}>nos vemos en el agua</p>
        <p className={s.footerMeta}>
          Carmela · 3 de octubre de {event.year}
        </p>
        <p className={s.versions}>
          Otras versiones: <Link href="/">1</Link> · <Link href="/v3">3</Link>
        </p>
      </footer>

      <ActivityToast
        className={s.toast}
        dotClassName={s.toastDot}
        nameClassName={s.toastName}
        actionClassName={s.toastAction}
      />
    </main>
  );
}
