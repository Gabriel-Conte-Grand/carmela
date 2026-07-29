"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function QrImage({
  url,
  dark = "#083d42",
  light = "#ffffff",
  className = "",
}: {
  url: string;
  dark?: string;
  light?: string;
  className?: string;
}) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(url, {
      width: 280,
      margin: 1,
      color: { dark, light },
    }).then((dataUrl) => {
      if (!cancelled) setSrc(dataUrl);
    });
    return () => {
      cancelled = true;
    };
  }, [url, dark, light]);

  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="QR del álbum de fotos" className={className} />;
}
