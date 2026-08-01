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

## Google Sheet (invitados + temas)

1. Creá un Sheet. La primera pestaña es la lista de invitados con encabezados: `Fecha | Nombre | Apellido | Ya pago | Notas`.
2. Extensiones → Apps Script → pegá (reemplazá el código viejo si ya tenías uno):

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var tipo = (data.tipo || "rsvp").toString();
    var fecha = data.at || new Date().toISOString();

    if (tipo === "tema") {
      var temas = ss.getSheetByName("Temas");
      if (!temas) {
        temas = ss.insertSheet("Temas");
        temas.appendRow(["Fecha", "Nombre", "Tema", "Artista"]);
      }
      var tema = (data.tema || "").toString().trim();
      if (!tema) {
        return ContentService
          .createTextOutput(JSON.stringify({ ok: false, error: "Falta tema" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      temas.appendRow([
        fecha,
        (data.nombre || "").toString().trim(),
        tema,
        (data.artista || "").toString().trim(),
      ]);
      return ContentService
        .createTextOutput(JSON.stringify({ ok: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = ss.getSheets()[0];
    var nombre = (data.nombre || "").toString().trim();
    var apellido = (data.apellido || "").toString().trim();
    var yaPago = data.paid === true || data.paid === "true" ? "Sí" : "No";

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

3. Implementar → **Nueva implementación** (importante si ya existía) → Aplicación web → Ejecutar como: Yo → Quién tiene acceso: Cualquiera.
4. Copiá la URL `/exec` a `SHEET_WEBHOOK_URL` (local y Vercel).
5. Compartí el Sheet con Yanina. Los temas quedan en la pestaña **Temas**.
