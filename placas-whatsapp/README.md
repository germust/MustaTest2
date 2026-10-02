# Placas para el catálogo de WhatsApp Business

12 imágenes cuadradas (1080 × 1080 px) para cargar como "productos" en el
catálogo de WhatsApp Business de Must Consulting. Mismo estilo que la web y
que la presentación PDF (`../presentacion-pdf`), con la que comparten el logo
y la tipografía.

| Código | Colección | Servicio |
| --- | --- | --- |
| MC-00 | Para empezar | Charla inicial de 30 minutos |
| MC-01 | Emprendimientos y oficinas | Consultas y mails en orden |
| MC-02 | Emprendimientos y oficinas | Avisos de cobros, turnos y vencimientos |
| MC-03 | Emprendimientos y oficinas | Registro de pedidos y clientes |
| MC-04 | Emprendimientos y oficinas | Cargas y documentos automáticos |
| MC-05 | Emprendimientos y oficinas | Digitalización de papeles y archivos |
| MC-06 | Emprendimientos y oficinas | Control simple de números y stock |
| MC-07 | PyMEs | Tableros de control en Power BI |
| MC-08 | PyMEs | Reportes automáticos |
| MC-09 | PyMEs | Circuitos entre áreas |
| MC-10 | PyMEs | Procesos y procedimientos documentados |
| MC-11 | PyMEs | Preparación para ISO 9001 |

- `png/` — las 12 imágenes listas para subir.
- `catalogo.md` — nombre, descripción, enlace y código de cada producto, para
  copiar y pegar. El precio queda vacío.
- `vista-general.png` — las 12 juntas, para revisarlas de un vistazo.

## Cómo cargarlas en WhatsApp Business

En la app: **Herramientas para la empresa → Catálogo → Agregar artículo**
(los nombres pueden variar un poco según la versión). Para cada producto,
subir la imagen de `png/` y copiar el nombre, la descripción, el enlace y el
código de `catalogo.md`. Después, desde el catálogo, crear las colecciones
**Para empezar**, **Emprendimientos y oficinas** y **PyMEs** y sumar cada
producto a la suya.

## Cómo regenerarlas

```bash
python3 build.py   # arma placas.html y catalogo.md
node render.mjs    # genera png/ y vista-general.png (Chromium vía Playwright)
```

Todo el contenido está en `build.py`: cada placa es un bloque `P.append(dict(...))`
con su título, la pregunta, la maqueta, el beneficio y los textos del
catálogo (`name`, `desc`, `link`). Las cifras de las maquetas de tableros
llevan la etiqueta "Ejemplo ilustrativo".
