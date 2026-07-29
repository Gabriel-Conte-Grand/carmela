"use client";

import { useEffect, useState } from "react";

const feed = [
  { who: "Juana", what: "sumó una canción" },
  { who: "Tomi", what: "confirmó que va" },
  { who: "Delfi", what: "sumó una canción" },
  { who: "Bauti", what: "confirmó que va" },
  { who: "Mora", what: "sumó una canción" },
];

export function ActivityToast({
  className,
  dotClassName,
  nameClassName,
  actionClassName,
  initialDelay = 3600,
  visibleMs = 4400,
  gapMs = 5200,
}: {
  className: string;
  dotClassName?: string;
  nameClassName?: string;
  actionClassName?: string;
  initialDelay?: number;
  visibleMs?: number;
  gapMs?: number;
}) {
  const [ti, setTi] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    let cycleTimer: ReturnType<typeof setTimeout>;

    const cycle = () => {
      setShow(true);
      hideTimer = setTimeout(() => {
        setShow(false);
        setTi((t) => (t + 1) % feed.length);
        cycleTimer = setTimeout(cycle, gapMs);
      }, visibleMs);
    };

    const start = setTimeout(cycle, initialDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(hideTimer);
      clearTimeout(cycleTimer);
    };
  }, [initialDelay, visibleMs, gapMs]);

  const item = feed[ti];

  return (
    <div
      className={className}
      style={{
        transform: `translate(-50%, ${show ? "0" : "-22px"})`,
        opacity: show ? 1 : 0,
        pointerEvents: "none",
      }}
      aria-live="polite"
    >
      {dotClassName && <span className={dotClassName} aria-hidden />}
      <span>
        <b className={nameClassName}>{item.who}</b>
        <span className={actionClassName}> {item.what}</span>
      </span>
    </div>
  );
}
