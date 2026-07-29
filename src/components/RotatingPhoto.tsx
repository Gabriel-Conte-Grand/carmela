"use client";

import { useEffect, useState } from "react";
import { photoPool } from "@/lib/event";

export function RotatingPhoto({
  offset = 0,
  className = "",
  intervalMs = 5000,
}: {
  offset?: number;
  className?: string;
  intervalMs?: number;
}) {
  const [rot, setRot] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRot((r) => r + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  const src = photoPool[(rot + offset) % photoPool.length];

  return (
    <div
      className={className}
      style={{
        backgroundImage: `url("${src}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "opacity 0.8s ease",
      }}
      role="img"
      aria-label="Foto del pool party"
    />
  );
}
