import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  nombre?: unknown;
  apellido?: unknown;
  paid?: unknown;
};

function cleanName(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, 60);
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

  const nombre = cleanName(body.nombre);
  const apellido = cleanName(body.apellido);
  const paid = body.paid === true;

  if (!nombre || !apellido) {
    return NextResponse.json(
      { ok: false, error: "Completá nombre y apellido" },
      { status: 400 }
    );
  }

  if (!paid) {
    return NextResponse.json(
      { ok: false, error: "Confirmá que ya dejaste la seña" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        apellido,
        paid: true,
        at: new Date().toISOString(),
      }),
      redirect: "follow",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Sheet webhook failed", res.status, text);
      return NextResponse.json(
        { ok: false, error: "No se pudo guardar en la lista" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Sheet webhook error", err);
    return NextResponse.json(
      { ok: false, error: "No se pudo guardar en la lista" },
      { status: 502 }
    );
  }
}
