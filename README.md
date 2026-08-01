# Carmela · Pool Party 15

Landing de invitación para el cumple de 15 de Carmela.

## Desarrollo

```bash
cd carmela
npm install
cp .env.example .env.local   # pegá tu SHEET_WEBHOOK_URL
npm run dev
```

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `SHEET_WEBHOOK_URL` | URL `/exec` del Apps Script (Google Sheet) |

En Vercel: Project → Settings → Environment Variables → agregar `SHEET_WEBHOOK_URL`.

## Google Sheet (lista de invitados)

1. Creá un Sheet con encabezados en la fila 1: `Fecha | Nombre | Apellido | Ya pago | Notas`.
2. Extensiones → Apps Script → pegá:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    var nombre = (data.nombre || "").toString().trim();
    var apellido = (data.apellido || "").toString().trim();
    var yaPago = data.paid === true || data.paid === "true" ? "Sí" : "No";
    var fecha = data.at || new Date().toISOString();

    if (!nombre || !apellido) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: "Faltan nombre o apellido" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([fecha, nombre, apellido, yaPago, ""]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Implementar → Aplicación web → Ejecutar como: Yo → Quién tiene acceso: Cualquiera → Implementar.
4. Copiá la URL que termina en `/exec` a `SHEET_WEBHOOK_URL`.
5. Compartí el Sheet con Yanina.

## Links pendientes

- Álbum de Google Photos → `photosAlbumUrl` en [`src/lib/event.ts`](src/lib/event.ts).
