# Carmela · Pool Party 15

Landing de invitación para el cumple de 15 de Carmela.

## Versiones

| Ruta | Estilo |
|------|--------|
| [`/`](http://localhost:3000/) | Club de pileta (v1) |
| [`/v2`](http://localhost:3000/v2) | Elegante — verde bosque + script |
| [`/v3`](http://localhost:3000/v3) | Urbana — Syne + fucsia/naranja |

## Desarrollo

```bash
cd carmela
npm install
npm run dev
```

## Links pendientes (Yanina)

Editá [`src/lib/event.ts`](src/lib/event.ts):

- `googleFormUrl` — formulario de confirmación (usado en v1)
- `mercadopagoUrl` — link de pago / seña $10.000
- `photosAlbumUrl` — álbum de Google Photos

En v2 y v3 el flujo de confirmación es: seña → nombre → listo (UI local hasta que haya backend/form).
