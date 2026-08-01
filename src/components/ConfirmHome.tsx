"use client";

import { FormEvent, useState } from "react";
import { event } from "@/lib/event";
import s from "@/app/home.module.css";

type Status = "idle" | "loading" | "ok" | "error";

export function ConfirmHome() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [paid, setPaid] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const n = nombre.trim();
    const a = apellido.trim();
    if (!n || !a) {
      setError("Completá nombre y apellido.");
      return;
    }
    if (!paid) {
      setError("Marcá que ya dejaste la seña para anotarte.");
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
        >
          Ir a Mercado Pago
        </a>
      </div>

      <div className={s.step}>
        <span className={s.stepNum}>2</span>
        <h3 className={s.stepTitle}>Tu lugar</h3>
        <p className={s.stepText}>
          Anotate con tu nombre y apellido para quedar en la lista.
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
            />
          </label>

          <label className={s.rsvpCheck}>
            <input
              type="checkbox"
              checked={paid}
              onChange={(e) => setPaid(e.target.checked)}
            />
            <span>Ya dejé la seña</span>
          </label>

          {error && <p className={s.rsvpError}>{error}</p>}

          <button
            type="submit"
            className={s.btn}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Guardando…" : "Anotame en la lista"}
          </button>
        </form>
      </div>
    </div>
  );
}
