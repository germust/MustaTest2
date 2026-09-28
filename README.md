# Must Consulting · Sitio institucional

Sitio de una sola página para **Must Consulting** (Rosario, Santa Fe, Argentina):
procesos, datos y cumplimiento para PyMEs.

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4 con la paleta institucional como únicos colores disponibles
- Íconos lineales de Lucide
- Tipografía Inter optimizada con `next/font` (se sirve desde el mismo dominio)
- Sin base de datos, sin autenticación, sin CMS y sin herramientas de seguimiento
- Todas las páginas se generan como contenido estático

> El archivo `index.html` de la raíz pertenece a otro proyecto (vista previa de smartData FLMS)
> y no forma parte de este sitio. No afecta al build de Next.js y se dejó sin cambios.

---

## Datos pendientes

| Dato | Dónde completarlo | Mientras tanto |
| --- | --- | --- |
| URL de LinkedIn | `src/config/site.ts` → `social.linkedin` | El enlace no se muestra |
| Dominio definitivo | Variable `NEXT_PUBLIC_SITE_URL` | En Vercel se usa el dominio del proyecto; en local, `http://localhost:3000` |
| Logo negativo oficial | `public/brand/` + `site.ts` → `brand.logoNegative` | Versión provisional derivada del logo oficial |
| Monograma oficial | `public/brand/` + `site.ts` → `brand.monogram` | Monograma provisional derivado del logo oficial |
| Formato del número de WhatsApp | `site.ts` → `contact.whatsapp.number` | Se usa `543416715384` (ver nota abajo) |
| Servicio de formularios (opcional) | Variable `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` | El formulario prepara un WhatsApp o un email |

**Nota sobre WhatsApp.** El sitio usa `https://wa.me/543416715384`, tal como fue indicado. El QR de la
tarjeta de presentación usa `5493416715384` (con 9), que es el formato internacional habitual para
celulares argentinos. Conviene probar el enlace desde un teléfono; si no abre el chat correcto,
cambiar `number` a `5493416715384` en `src/config/site.ts`. Todos los botones se actualizan solos.

---

## Requisitos

- Node.js 20.9 o superior
- npm (incluido con Node.js)

## Instalación y ejecución local

```bash
npm install
npm run dev
```

Abrir <http://localhost:3000>.

## Build de producción

```bash
npm run build   # genera el sitio optimizado
npm run start   # sirve el build en http://localhost:3000
```

Verificaciones rápidas antes de publicar:

```bash
npm run lint
npx tsc --noEmit
```

---

## Estructura

```
public/
  brand/
    Must_Consulting_Logo_Vector.svg   Logo principal oficial (sin modificar)
    logo-negative-provisional.svg     Negativo provisional (ver "Logos")
    monogram-provisional.svg          Monograma provisional, usado como favicon
  favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png
  og-image.png                        Imagen para redes sociales (1200 × 630)
src/
  config/
    site.ts        Datos de la empresa, contacto, enlaces, dominio, marca y SEO
    content.ts     Textos de todas las secciones, servicios y mensajes de WhatsApp
  lib/
    links.ts         Enlaces de WhatsApp y email
    contact-form.ts  Validación, sanitización y envío del formulario
  components/
    layout/      Header (menú móvil accesible) y Footer
    sections/    Hero, Problems, Services, Method, EngagementModels, About, Contact
    contact/     ContactForm
    ui/          Logo, ButtonLink, Container, SectionHeader, íconos, animación de aparición
    visuals/     Composiciones SVG abstractas (hero y detalles de líneas)
    seo/         JSON-LD (schema.org ProfessionalService)
  app/
    layout.tsx   Metadata, Open Graph, favicon, fuente Inter y JSON-LD
    page.tsx     Página principal
    privacidad/  Política de privacidad básica
    not-found.tsx, robots.ts, sitemap.ts, manifest.ts
```

---

## Cómo cambiar los datos de contacto

Todo se edita en **`src/config/site.ts`**; ningún componente repite estos datos.

- **Teléfono / WhatsApp:** `contact.whatsapp.display` (cómo se ve) y `contact.whatsapp.number`
  (solo dígitos con código de país, usado en `https://wa.me/`).
- **Correo:** `contact.email`.
- **LinkedIn:** `social.linkedin`, por ejemplo `"https://www.linkedin.com/in/usuario/"`. Al
  completarlo aparece en Sobre Must, Contacto, Footer y en el JSON-LD.
- **Mensajes precargados de WhatsApp:** el general está en `whatsappMessages.general`
  (`site.ts`); los de cada servicio y modalidad, en `src/config/content.ts`.
- **Textos de las secciones:** `src/config/content.ts`.

## Cómo configurar el dominio

El dominio se usa en canonical, sitemap, robots, Open Graph y JSON-LD. Definirlo con la variable de
entorno `NEXT_PUBLIC_SITE_URL`, sin barra final:

```bash
NEXT_PUBLIC_SITE_URL=https://www.ejemplo.com.ar
```

En local se puede crear `.env.local` a partir de `.env.example`. En Vercel se carga desde
**Settings → Environment Variables** (ver "Publicación en Vercel"). Si no se define, en Vercel se usa
automáticamente el dominio de producción del proyecto (`VERCEL_PROJECT_PRODUCTION_URL`).

---

## Logos

Los archivos de marca van en **`public/brand/`** y sus rutas se declaran en `site.ts` → `brand`.
Los archivos se usan tal cual: el sitio nunca redibuja el logo ni lo reemplaza por texto.

- **Logo principal** (`Must_Consulting_Logo_Vector.svg`): archivo oficial, idéntico al entregado.
  Se usa sobre fondos claros (encabezado).
- **Margen del lienzo.** El SVG oficial tiene margen vacío alrededor del logotipo (lienzo de
  2172 × 724). El componente `Logo` lo recorta visualmente con CSS, sin tocar el archivo, usando
  `crop` en `site.ts`. Si se reemplaza por un archivo sin margen, poner `crop: null`.
- **Logo negativo** (`logo-negative-provisional.svg`): **provisional**. No se entregó una versión
  negativa, así que se generó a partir del logo oficial con los mismos trazados y proporciones,
  cambiando solo el azul por blanco (el cuadrado verde azulado conserva su color). Se usa en el
  footer sobre azul marino.
- **Monograma** (`monogram-provisional.svg`): **provisional**. Se armó con la "M" y el cuadrado del
  logo oficial, sin redibujarlos, sobre un fondo blanco para que funcione como favicon.

Para usar los archivos oficiales:

1. Copiar el archivo a `public/brand/` (se puede mantener su nombre original).
2. Actualizar la ruta en `src/config/site.ts` (`brand.logoNegative.src` o `brand.monogram`) y, si
   el lienzo cambia, `width`, `height` y `crop`.
3. Si cambia el monograma, regenerar `public/favicon.ico`, `apple-touch-icon.png` (180 px),
   `icon-192.png` e `icon-512.png` con cualquier generador de favicons a partir del SVG nuevo.
4. `public/og-image.png` usa el logo principal; reemplazarlo si se quiere otra imagen para redes.

**Imagen del hero.** No se entregó una imagen institucional, por lo que el hero usa una composición
SVG liviana (`src/components/visuals/HeroVisual.tsx`) basada en el motivo de curvas y nodos de los
banners. Si más adelante hay una imagen, puede ubicarse en `public/brand/hero-visual.webp` y
mostrarse con `next/image` en `src/components/sections/Hero.tsx`.

---

## Formulario de contacto

El formulario valida los campos (nombre, correo o WhatsApp y mensaje son obligatorios), limpia el
texto ingresado y muestra los errores de forma accesible. La lógica está separada de la interfaz en
`src/lib/contact-form.ts`.

### Modo por defecto (sin configuración)

El sitio **no envía ni almacena** datos. Al enviar, la persona elige:

- **Enviar por WhatsApp:** abre WhatsApp con el mensaje armado.
- **Preparar un email:** abre su aplicación de correo con asunto y cuerpo completos.

### Conectar Formspree

1. Crear un formulario en <https://formspree.io> y copiar su endpoint (`https://formspree.io/f/xxxxxxx`).
2. Definir la variable `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` con ese valor (en `.env.local` o en Vercel).
3. Volver a publicar. El formulario pasa a enviar un POST en JSON con los campos `nombre`, `empresa`,
   `contacto`, `servicio`, `mensaje`, un asunto y un campo trampa para bots (`_gotcha`).

El endpoint de Formspree no es una credencial: es público por diseño. La política de privacidad se
adapta automáticamente al modo con servicio externo; conviene revisar su texto con un profesional
antes de activar la integración.

### Conectar Resend u otro servicio con clave privada

Servicios como Resend requieren una clave secreta, que **nunca** debe ir en el frontend. Para usarlos:

1. Crear `src/app/api/contact/route.ts` con un `POST` que valide los datos con
   `sanitizeContactForm` y `validateContactForm` y envíe el correo con la clave leída de una variable
   de entorno **sin** el prefijo `NEXT_PUBLIC_` (por ejemplo `RESEND_API_KEY`).
2. Definir `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=/api/contact`.

Ejemplo mínimo con la API HTTP de Resend (sin dependencias adicionales):

```ts
// src/app/api/contact/route.ts
import { sanitizeContactForm, validateContactForm } from "@/lib/contact-form";

export async function POST(request: Request) {
  const body = await request.json();
  if (body._gotcha) return Response.json({ ok: true });

  const data = sanitizeContactForm({
    name: body.nombre, company: body.empresa, contact: body.contacto,
    service: body.servicio, message: body.mensaje,
  });
  if (Object.keys(validateContactForm(data)).length > 0) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Sitio Must Consulting <formulario@dominio-verificado.com>",
      to: ["germust.cs@gmail.com"],
      subject: `Consulta de ${data.name}`,
      text: `${data.name} (${data.company || "sin empresa"})\n${data.contact}\n${data.service}\n\n${data.message}`,
    }),
  });
  return Response.json({ ok: response.ok }, { status: response.ok ? 200 : 502 });
}
```

---

## Publicación en Vercel

1. Subir el repositorio a GitHub (ya está en `germust/MustaTest2`).
2. En <https://vercel.com/new>, importar el repositorio. Vercel detecta Next.js automáticamente:
   no hace falta cambiar el comando de build (`npm run build`) ni el directorio de salida.
3. En **Settings → Environment Variables**, cargar para *Production*:
   - `NEXT_PUBLIC_SITE_URL` con el dominio definitivo (cuando exista).
   - `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` solo si se conecta un servicio de formularios.
4. **Deploy.** Cada push a la rama de producción vuelve a publicar el sitio; las ramas y pull
   requests generan vistas previas (Vercel les agrega `noindex` automáticamente).
5. **Dominio propio:** en **Settings → Domains**, agregar el dominio y configurar los registros DNS
   que indica Vercel. Después, actualizar `NEXT_PUBLIC_SITE_URL` y volver a publicar para que el
   canonical y el sitemap usen el dominio nuevo.

El sitio es estático, por lo que también puede publicarse en otras plataformas compatibles con
Next.js (Netlify, Cloudflare, un servidor propio con `npm run start`).

---

## Diseño, accesibilidad y rendimiento

- Paleta cerrada: `globals.css` reemplaza los colores de Tailwind por los institucionales
  (`navy`, `navy-2`, `teal`, `teal-dark`, `teal-light`, `ivory`, `muted`, `line`, `surface`).
  El texto verde azulado pequeño usa `#246B67` para alcanzar contraste AA sobre fondo marfil.
- HTML semántico, un solo `h1`, jerarquía de encabezados ordenada, enlace "Saltar al contenido",
  foco visible (anillo `#7ED0C7` con línea azul marino), menú móvil con foco contenido y tecla
  Escape, formularios con etiquetas, errores descriptos por texto e ícono (no solo por color).
- Animaciones de 150 a 400 ms, sin librerías, desactivadas con `prefers-reduced-motion`.
- Enlaces externos con `target="_blank"` y `rel="noopener noreferrer"`; cabeceras de seguridad en
  `next.config.ts`.
- Revisión realizada sobre el build de producción: 1440, 1024, 768, 390 y 320 px sin scroll
  horizontal ni errores de consola. Lighthouse local: móvil 97 · 100 · 100 · 100, escritorio
  100 · 100 · 100 · 100 (rendimiento, accesibilidad, buenas prácticas, SEO).
