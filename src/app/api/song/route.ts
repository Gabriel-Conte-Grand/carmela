import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  nombre?: unknown;
  tema?: unknown;
  artista?: unknown;
};

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, max);
}

export async function POST(request: Request) {
  const webhook = process.env.SHEET_WEBHOOK_URL?.trim();
  if (!webhook) {
    return NextResponse.json(
      { ok: false, error: "Falta configurar SHEET_WEBHOOK_URL" },
      { status: 500 }
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Pedido inválido" },
      { status: 400 }
    );
  }

  const nombre = clean(body.nombre, 60);
  const tema = clean(body.tema, 120);
  const artista = clean(body.artista, 120);

  if (!tema) {
    return NextResponse.json(
      { ok: false, error: "Escribí el nombre del tema" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: "tema",
        nombre,
        tema,
        artista,
        at: new Date().toISOString(),
      }),
      redirect: "follow",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Song webhook failed", res.status, text);
      return NextResponse.json(
        { ok: false, error: "No se pudo guardar el tema" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Song webhook error", err);
    return NextResponse.json(
      { ok: false, error: "No se pudo guardar el tema" },
      { status: 502 }
    );
  }
}
