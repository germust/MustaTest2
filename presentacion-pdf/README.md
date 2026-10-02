# Presentación PDF de Must Consulting

Fuente del PDF **"Must Consulting - Presentacion.pdf"** (5 páginas A4) para
mandar por WhatsApp o mail. Usa el mismo estilo que `must-consulting.com`
(colores, tipografía Inter, logo y monograma), pero no está conectado a la
web: cambiar algo acá no modifica el sitio.

## Contenido

| Página | Título | Subtítulo / contenido |
| --- | --- | --- |
| 1 · Carátula | Soluciones para emprendedores, profesionales y PyMEs | Índice: 01 Emprendedores y profesionales (Emprendimientos y oficinas) · 02 PyMEs (Dueños · gerentes · equipos) |
| 2 · 01 | Emprendedores y profesionales independientes | Más tiempo para dedicarle a lo que hacés. Problemas 01–03, "No necesitás cambiar todo" y la historia del lunes (modo caos → todo en orden) |
| 3 · 01 | Soluciones a tu escala | Menos tareas repetidas. Más claridad. Problemas 04–06, antes y después de una consulta de un cliente, herramientas que ya usás y botón a WhatsApp |
| 4 · 02 | Dueños, gerentes y equipos | Cuando el negocio crece, la gestión también. Problemas 01–04 y "Del dato a la decisión" |
| 5 · 02 | Indicadores, procesos y mejora continua | Ver lo importante. Actuar con criterio. Tablero ilustrativo, gestión y calidad (ISO 9001, sin emitir certificaciones), tres pasos y contacto con QR |

## Cómo regenerarlo

```bash
./generar.sh
```

Hace tres pasos:

1. `python3 build.py` → arma `presentacion.html` con los textos y el diseño.
2. `node render.mjs` → lo imprime a PDF con Chromium (Playwright).
3. `python3 finalize.py` → agrega título, autor y tema, y muestra un control:
   páginas, enlaces y máscaras de transparencia (tiene que dar 0).

Requisitos: Python 3.10 o superior con `pypdf` (`pip install pypdf`) y
Node 18 o superior con `playwright` (`npm install playwright` y, si el
navegador no está instalado, `npx playwright install chromium`).

`presentacion.html` y `presentacion-sin-metadatos.pdf` son intermedios y no
se guardan en git.

## Dónde se cambia cada cosa

Todo está en `build.py`:

- **Contacto:** variables `WA_TEXT` (mensaje precargado de WhatsApp), `WA`,
  `CAL` (Calendly), `WEB` y `MAIL`, al principio del archivo.
- **Colores:** variables `TEAL`, `NAVY`, etc., al principio del archivo. Son
  los de la web.
- **Textos de cada página:** en los bloques `cover`, `p2`, `p3`, `p4` y `p5`.
  Cada problema se arma con `item(número, ícono, problema, solución, beneficio)`.
- **Antes y después (página 3):** `before_after`, con una fila `ba_row` por paso.
- **Tablero (página 5):** `board`, `evo` (barras de evolución) y `areas`.
  Lleva la aclaración "Esquema ilustrativo · datos ficticios".

## Reglas de diseño

- **Sin sombras con desenfoque.** Chromium las guarda como máscaras de
  transparencia y algunos visores de PDF (sobre todo de celular) las dibujan
  como rectángulos oscuros encima del contenido. Usar sombras planas sin
  desenfoque (`0 6px 0 -2px #DCE5E5`). `finalize.py` avisa si aparece alguna.
- **Cada página debe entrar en la hoja:** el pie de página tiene que quedar
  completo. Si un cambio agrega contenido, revisar que no lo empuje fuera.
- **Mail de contacto:** `info@must-consulting.com` (no un mail personal).

## Archivos en `assets/`

| Archivo | Origen |
| --- | --- |
| `Must_Consulting_Logo_Vector.svg`, `Must_Consulting_Logo_Negativo.svg`, `Must_Consulting_Monograma.svg` | Copias de `public/brand/` del repositorio de la web (`germust/mustconsultinganimation`). Si cambia el logo, copiarlos de nuevo. |
| `inter-latin.woff2` | Tipografía Inter (licencia SIL Open Font License 1.1, https://rsms.me/inter/). |
| `icons.json` | Íconos de Lucide (licencia ISC, https://lucide.dev) exportados como SVG. Para sumar uno, exportarlo desde `lucide-react` con el mismo formato (nombre → SVG de 24 px). |
| `qr-whatsapp.svg` | QR a `https://wa.me/5493416715384`, generado con `segno`: `segno.make('https://wa.me/5493416715384', error='m')` guardado como SVG con `dark='#122332'`, sin borde. |
