"use client";

import { useState } from "react";
import { event, hasLink } from "@/lib/event";
import s from "@/app/v2/styles.module.css";

export function ConfirmElegant() {
  const [paid, setPaid] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const payReady = hasLink(event.mercadopagoUrl);

  if (sent) {
    return (
      <div className={s.confirmBox}>
        <p className={s.confirmDoneTitle}>Estás dentro</p>
        <p className={s.confirmDoneText}>
          Ya tenés tu lugar guardado. Nos vemos el sábado 3 de octubre a las 12
          en la quinta.
        </p>
      </div>
    );
  }

  if (!paid) {
    return (
      <div className={s.confirmBox}>
        <p className={s.confirmStep}>Paso 1 de 2 · La seña</p>
        <p className={s.confirmAmount}>{event.contributionAmount}</p>
        <p className={s.confirmHint}>{event.contributionNote}</p>
        {payReady ? (
          <a
            href={event.mercadopagoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={s.confirmBtn}
            onClick={() => setPaid(true)}
          >
            Pagar con Mercado Pago
          </a>
        ) : (
          <button type="button" className={s.confirmBtn} onClick={() => setPaid(true)}>
            Pagar con Mercado Pago
          </button>
        )}
        <button type="button" className={s.confirmLink} onClick={() => setPaid(true)}>
          Ya pagué
        </button>
        {!payReady && (
          <p className={s.confirmPending}>El link de pago se publica en breve</p>
        )}
      </div>
    );
  }

  return (
    <div className={s.confirmForm}>
      <p className={s.confirmStep}>Paso 2 de 2 · Tu nombre</p>
      <input
        className={s.confirmInput}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre y apellido"
        aria-label="Nombre y apellido"
      />
      <button
        type="button"
        className={s.confirmBtn}
        onClick={() => {
          if (name.trim()) setSent(true);
        }}
      >
        Anotame en la lista
      </button>
    </div>
  );
}
