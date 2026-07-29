"use client";

import { useState } from "react";
import { event, hasLink } from "@/lib/event";
import s from "@/app/v3/styles.module.css";

export function ConfirmUrban() {
  const [paid, setPaid] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const payReady = hasLink(event.mercadopagoUrl);

  if (sent) {
    return (
      <div className={s.confirmBox}>
        <p className={s.confirmDoneTitle}>ESTÁS DENTRO</p>
        <p className={s.confirmDoneText}>
          Lugar reservado. Sábado 3 de octubre, 12 h, la quinta en Sauce Viejo.
        </p>
      </div>
    );
  }

  if (!paid) {
    return (
      <div className={s.confirmBox}>
        <div className={s.confirmRow}>
          <span className={s.confirmStep}>Paso 1 de 2</span>
          <span className={s.confirmAmount}>{event.contributionAmount}</span>
        </div>
        <p className={s.confirmHint}>
          Sin la seña el lugar no queda reservado. Es la forma de saber quién
          viene de verdad.
        </p>
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
      <p className={s.confirmStep}>Paso 2 de 2 · anotate</p>
      <input
        className={s.confirmInput}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="tu nombre y apellido"
        aria-label="Nombre y apellido"
      />
      <button
        type="button"
        className={s.confirmBtnDark}
        onClick={() => {
          if (name.trim()) setSent(true);
        }}
      >
        Anotame en la lista
      </button>
    </div>
  );
}
