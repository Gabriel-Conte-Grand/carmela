"use client";

import { FormEvent, useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { event } from "@/lib/event";
import s from "@/app/home.module.css";

type Status = "idle" | "loading" | "ok" | "error";

const STORAGE_KEY = "carmela-seña-abierta";

function fireSuccessConfetti() {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const colors = ["#ff6b5e", "#ffc94a", "#0e7c86", "#ff8fb1", "#fff"];

  confetti({
    particleCount: 110,
    spread: 70,
    origin: { y: 0.65 },
    colors,
  });

  window.setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    });
  }, 180);
}

export function ConfirmHome() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [openedPay, setOpenedPay] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setOpenedPay(true);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (status === "ok") {
      fireSuccessConfetti();
    }
  }, [status]);

  function markPayOpened() {
    setOpenedPay(true);
    setError("");
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const n = nombre.trim();
    const a = apellido.trim();
    if (!openedPay) {
      setError("Primero abrí el link de la seña para anotarte.");
      return;
    }
    if (!n || !a) {
      setError("Completá nombre y apellido.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: n, apellido: a, paid: true }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "No se pudo guardar. Probá de nuevo.");
      }
      setStatus("ok");
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Algo salió mal.");
    }
  }

  if (status === "ok") {
    return (
      <div className={s.confirmSuccess}>
        <p className={s.confirmSuccessTitle}>Listo, ya estás en la lista</p>
        <p className={s.confirmSuccessText}>¡Nos vemos en la pile!</p>
      </div>
    );
  }

  return (
    <div className={s.steps}>
      <div className={s.step}>
        <span className={s.stepNum}>1</span>
        <h3 className={s.stepTitle}>La seña</h3>
        <p className={s.stepText}>
          Un aporte de {event.contributionAmount} que se descuenta de la barra.
        </p>
        <a
          href={event.mercadopagoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={s.btn}
          onClick={markPayOpened}
        >
          Ir a Mercado Pago
        </a>
        {openedPay && (
          <p className={s.hint}>Cuando vuelvas, podés anotarte acá abajo.</p>
        )}
      </div>

      <div className={`${s.step} ${!openedPay ? s.stepLocked : ""}`}>
        <span className={s.stepNum}>2</span>
        <h3 className={s.stepTitle}>Tu lugar</h3>
        <p className={s.stepText}>
          {openedPay
            ? "Anotate con tu nombre y apellido para quedar en la lista."
            : "Después de abrir el link de la seña, acá podés anotarte."}
        </p>

        <form className={s.rsvpForm} onSubmit={onSubmit}>
          <label className={s.rsvpLabel}>
            Nombre
            <input
              className={s.rsvpInput}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              autoComplete="given-name"
              maxLength={60}
              required
              disabled={!openedPay}
            />
          </label>
          <label className={s.rsvpLabel}>
            Apellido
            <input
              className={s.rsvpInput}
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              autoComplete="family-name"
              maxLength={60}
              required
              disabled={!openedPay}
            />
          </label>

          {error && <p className={s.rsvpError}>{error}</p>}

          <button
            type="submit"
            className={s.btn}
            disabled={!openedPay || status === "loading"}
          >
            {status === "loading" ? "Guardando…" : "Anotame en la lista"}
          </button>
        </form>
      </div>
    </div>
  );
}
