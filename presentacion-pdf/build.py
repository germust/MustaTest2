"""Genera presentacion.html: la presentación de Must Consulting (5 páginas A4) con el estilo de la web.

Ver README.md para los pasos completos (HTML -> PDF -> metadatos)."""
import json, re, urllib.parse
from pathlib import Path

HERE = Path(__file__).resolve().parent
ASSETS = HERE / "assets"
ICONS = json.loads((ASSETS / "icons.json").read_text())
BRAND = ASSETS
QR = (ASSETS / "qr-whatsapp.svg").read_text()

WA_TEXT = "Hola Germán, me interesa conversar sobre cómo Must Consulting puede ayudar a mi negocio."
WA = "https://wa.me/5493416715384?text=" + urllib.parse.quote(WA_TEXT)
CAL = "https://calendly.com/must-consulting/30min"
WEB = "https://must-consulting.com"
MAIL = "mailto:info@must-consulting.com"
TOTAL = 5

TEAL, TEAL_D, TEAL_L, NAVY, NAVY2, MUTED, LINE, SURF, IVORY = "#2E7F7A", "#246B67", "#7ED0C7", "#122332", "#18364B", "#5B6873", "#D6E0E2", "#E6EEEE", "#F7F8F6"


def ic(name, size=20, color="currentColor", stroke=1.7):
    svg = ICONS[name]
    svg = re.sub(r'width="\d+"', f'width="{size}"', svg, count=1)
    svg = re.sub(r'height="\d+"', f'height="{size}"', svg, count=1)
    return svg.replace('stroke="currentColor"', f'stroke="{color}"').replace('stroke-width="1.7"', f'stroke-width="{stroke}"')


def logo(negative=False, width=150):
    src = BRAND / ("Must_Consulting_Logo_Negativo.svg" if negative else "Must_Consulting_Logo_Vector.svg")
    return f'<span class="logo" style="width:{width}px"><img src="file://{src}" alt="Must Consulting"></span>'


def head(section):
    return f'<div class="top">{logo(width=118)}<span class="sec">{section}</span></div>'


def footer(n):
    return f'''<footer class="foot">
  <span class="foot-links"><a href="{WEB}">must-consulting.com</a> · <a href="{MAIL}">info@must-consulting.com</a> · <a href="{WA}">WhatsApp +54 9 341 6715384</a></span>
  <span class="pg">{n:02d} / {TOTAL:02d}</span>
</footer>'''


def item(num, icon, problem, solution, benefit):
    return f'''<div class="item">
  <div class="prob">
    <span class="num">{num}</span>
    <span class="ic" style="width:38px;height:38px;background:{IVORY};border:1px solid {LINE}">{ic(icon, 19, NAVY2)}</span>
    <h3>{problem}</h3>
  </div>
  <div class="sol">
    <p>{solution}</p>
    <p class="ben">{ic("CircleCheck", 15, TEAL, 1.9)}<span>{benefit}</span></p>
  </div>
</div>'''


def cols():
    return '<div class="cols"><span>Si hoy te pasa esto</span><span>Podemos ayudarte así</span></div>'


CSS = f"""
@font-face {{ font-family: Inter; font-weight: 100 900; src: url(file://{ASSETS}/inter-latin.woff2) format("woff2"); }}
@page {{ size: A4; margin: 0; }}
* {{ box-sizing: border-box; }}
html, body {{ margin: 0; padding: 0; }}
body {{ font-family: Inter, sans-serif; color: {NAVY}; -webkit-print-color-adjust: exact; print-color-adjust: exact; font-size: 12.5px; line-height: 1.5; }}
p {{ text-wrap: pretty; }}
h1, h2, h3 {{ text-wrap: balance; }}
a {{ color: inherit; text-decoration: none; }}
.page {{ width: 210mm; height: 297mm; position: relative; overflow: hidden; background: {IVORY}; padding: 40px 46px 0; page-break-after: always; break-after: page; display: flex; flex-direction: column; }}
.page:last-child {{ page-break-after: auto; break-after: auto; }}
.logo {{ display: inline-block; position: relative; aspect-ratio: 1445/478; overflow: hidden; vertical-align: middle; }}
.logo img {{ position: absolute; max-width: none; width: 150.3114%; left: -24.1522%; top: -26.1506%; }}
.top {{ display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid {LINE}; }}
.sec {{ display: inline-flex; align-items: center; gap: 8px; font-size: 10px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: {TEAL_D}; }}
.sec b {{ background: {TEAL}; color: #fff; border-radius: 99px; padding: 2px 8px; letter-spacing: .04em; }}
.eyebrow {{ display: flex; align-items: center; gap: 10px; font-size: 10.5px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: {TEAL_D}; }}
.eyebrow::before {{ content: ""; width: 26px; height: 1.5px; background: {TEAL}; }}
h2 {{ font-size: 33px; line-height: 1.08; letter-spacing: -0.028em; margin: 12px 0 0; font-weight: 700; }}
h3 {{ font-size: 14.5px; line-height: 1.3; margin: 0; font-weight: 650; }}
.lead {{ font-size: 13.5px; line-height: 1.55; color: {MUTED}; margin: 12px 0 0; max-width: 620px; }}
.muted {{ color: {MUTED}; }}
.ic {{ display: inline-flex; align-items: center; justify-content: center; border-radius: 99px; flex-shrink: 0; }}
.foot {{ margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: 12px; border-top: 1px solid {LINE}; padding: 12px 0 18px; font-size: 9.5px; color: {MUTED}; }}
.foot-links a {{ color: {TEAL_D}; font-weight: 500; }}
.pg {{ font-weight: 600; color: {NAVY}; letter-spacing: .04em; }}
.note {{ font-size: 9.5px; color: {MUTED}; }}

/* Problema -> solución */
.cols {{ display: grid; grid-template-columns: 1fr 1.15fr; gap: 22px; margin-top: 26px; padding: 0 18px 8px; font-size: 9.5px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: {MUTED}; }}
.items {{ display: flex; flex-direction: column; gap: 10px; }}
.item {{ display: grid; grid-template-columns: 1fr 1.15fr; gap: 22px; background: #fff; border: 1px solid {LINE}; border-radius: 16px; padding: 18px; }}
.prob {{ display: grid; grid-template-columns: auto auto 1fr; gap: 10px; align-items: start; }}
.prob .num {{ font-size: 11px; font-weight: 700; color: {TEAL}; padding-top: 10px; letter-spacing: .04em; }}
.prob h3 {{ font-size: 15px; padding-top: 2px; }}
.sol p {{ margin: 0; font-size: 12.3px; line-height: 1.5; }}
.sol .ben {{ margin-top: 8px; display: flex; gap: 6px; align-items: flex-start; color: {TEAL_D}; font-weight: 600; font-size: 11.5px; }}
.sol .ben svg {{ margin-top: 1px; flex-shrink: 0; }}
.callout {{ margin-top: 18px; display: flex; gap: 14px; align-items: center; background: {SURF}; border-radius: 16px; padding: 16px 18px; }}
.callout h3 {{ font-size: 14px; }}
.callout p {{ margin: 3px 0 0; color: {MUTED}; font-size: 12px; }}
.btn {{ display: inline-flex; align-items: center; gap: 9px; border-radius: 99px; padding: 10px 18px; font-weight: 600; font-size: 12.5px; }}
.btn.primary {{ background: {TEAL}; color: #fff; }}
.btn.outline {{ border: 1px solid rgba(255,255,255,.4); color: #fff; }}

/* Ejemplo simple */
.flow {{ display: grid; grid-template-columns: 1fr 34px 1fr 34px 1fr; align-items: center; gap: 6px; margin-top: 12px; }}
.flow .f {{ background: #fff; border: 1px solid {LINE}; border-radius: 14px; padding: 12px; display: flex; gap: 10px; align-items: center; }}
.flow .f b {{ display: block; font-size: 12.5px; }}
.flow .f small {{ display: block; font-size: 10px; color: {MUTED}; line-height: 1.35; }}

/* Tablero */
.board {{ background: #fff; border: 1px solid {LINE}; border-radius: 18px; padding: 16px 18px; box-shadow: 0 6px 0 -2px #DCE5E5; margin-top: 18px; }}
.board-head {{ display: flex; justify-content: space-between; align-items: center; }}
.board-head b {{ font-size: 11px; letter-spacing: .12em; text-transform: uppercase; }}
.tiles {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; }}
.tile {{ border: 1px solid {LINE}; border-radius: 12px; padding: 10px 12px; }}
.tile .k {{ font-size: 10px; color: {MUTED}; font-weight: 600; display: flex; justify-content: space-between; align-items: center; }}
.tile .v {{ font-size: 21px; font-weight: 700; letter-spacing: -0.02em; margin-top: 2px; }}
.tile .d {{ font-size: 9.5px; font-weight: 600; color: {TEAL_D}; }}
.mini-title {{ font-size: 10px; font-weight: 600; color: {MUTED}; margin: 0 0 6px; }}

/* Pasos y contacto */
.steps {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 12px; position: relative; }}
.steps::before {{ content: ""; position: absolute; top: 17px; left: 17px; right: calc(33.33% - 17px); height: 1.5px; background: {TEAL}; }}
.stepnum {{ position: relative; width: 34px; height: 34px; border-radius: 99px; background: {TEAL}; color: #fff; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 12px; box-shadow: 0 0 0 6px {IVORY}; letter-spacing: .02em; }}
.steps h3 {{ margin-top: 10px; font-size: 13.5px; }}
.steps p {{ margin: 3px 0 0; color: {MUTED}; font-size: 11.2px; }}
.contact {{ margin-top: 18px; background: {NAVY2}; color: #fff; border-radius: 20px; padding: 20px 22px; display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: center; }}
.qr {{ background: #fff; border-radius: 14px; padding: 10px; width: 112px; text-align: center; color: {NAVY}; }}
.qr svg {{ width: 100%; height: auto; display: block; }}
.qr p {{ margin: 6px 0 0; font-size: 8.5px; line-height: 1.3; font-weight: 600; }}

/* Historia del lunes */
.story {{ display: grid; grid-template-columns: 1fr 26px 1fr; gap: 10px; align-items: center; margin-top: 12px; }}
.story .panel {{ border-radius: 18px; padding: 14px; }}
.chaos {{ background: #E9EFEE; border: 1px solid {LINE}; }}
.order {{ background: #fff; border: 1px solid {LINE}; box-shadow: 0 6px 0 -2px #DCE5E5; }}
.panel-head {{ display: flex; justify-content: space-between; align-items: center; font-weight: 650; font-size: 11.5px; }}
.panel-head span {{ display: inline-flex; align-items: center; gap: 6px; }}
.chip {{ display: inline-flex; align-items: center; gap: 5px; border-radius: 99px; font-size: 9.5px; font-weight: 600; padding: 2px 9px; }}
.rows {{ list-style: none; margin: 10px 0 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }}
.rows li {{ display: flex; align-items: center; gap: 8px; background: #fff; border: 1px solid {LINE}; border-radius: 10px; padding: 5px 9px; font-size: 10.3px; white-space: nowrap; }}
.rows li .t {{ flex: 1; overflow: hidden; text-overflow: ellipsis; }}
.chaos .rows li {{ box-shadow: 0 3px 0 0 #D3DDDD; }}
.ending {{ margin-top: 8px; display: flex; align-items: center; gap: 6px; font-weight: 650; color: {TEAL_D}; font-size: 11.5px; }}
.tools {{ display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px; }}
.tools span {{ background: #fff; border: 1px solid {LINE}; border-radius: 99px; padding: 4px 12px; font-size: 11px; color: {NAVY2}; font-weight: 500; }}
.dflow {{ display: grid; grid-template-columns: 1fr 22px 1fr 22px 1fr 22px 1fr; align-items: stretch; gap: 4px; margin-top: 12px; }}
.dflow > div:not(.f) {{ align-self: center; }}
.dflow .f {{ background: #fff; border: 1px solid {LINE}; border-radius: 14px; padding: 12px 10px; text-align: center; }}
.dflow .f b {{ display: block; font-size: 11.5px; margin-top: 8px; line-height: 1.25; }}
.dflow .f small {{ display: block; font-size: 9.5px; color: {MUTED}; line-height: 1.35; margin-top: 3px; }}

/* Título (para quién) y subtítulo (la idea) */
.ttl {{ margin-top: 28px; }}
.ttl::before {{ content: ""; display: block; width: 34px; height: 3px; border-radius: 3px; background: {TEAL}; margin-bottom: 12px; }}
.subtitle {{ margin: 8px 0 0; font-size: 19px; line-height: 1.25; font-weight: 650; letter-spacing: -0.012em; color: {TEAL_D}; }}

/* Antes y después */
.ba {{ display: grid; grid-template-columns: 1fr 26px 1fr; gap: 10px; align-items: stretch; margin-top: 12px; }}
.ba .col {{ border-radius: 16px; padding: 14px 16px; }}
.ba .before {{ background: #E9EFEE; border: 1px solid {LINE}; }}
.ba .after {{ background: #fff; border: 1px solid {LINE}; box-shadow: 0 6px 0 -2px #DCE5E5; }}
.ba .lbl {{ display: inline-flex; border-radius: 99px; font-size: 9.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; padding: 3px 10px; }}
.ba ol {{ list-style: none; margin: 10px 0 0; padding: 0; position: relative; }}
.ba ol::before {{ content: ""; position: absolute; left: 13px; top: 14px; bottom: 14px; width: 1.5px; }}
.ba .before ol::before {{ background: #C9D4D6; }}
.ba .after ol::before {{ background: #A6DED8; }}
.ba li {{ position: relative; display: flex; align-items: center; gap: 10px; padding: 5px 0; font-size: 11.6px; line-height: 1.3; }}
.ba li .dot {{ width: 28px; height: 28px; border-radius: 99px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }}
.ba .before li .dot {{ background: #fff; border: 1px solid {LINE}; }}
.ba .after li .dot {{ background: {SURF}; }}
.ba .before li {{ color: {MUTED}; }}
.ba li.end {{ font-weight: 650; }}
.ba .before li.end {{ color: {NAVY2}; }}
.ba .after li.end {{ color: {TEAL_D}; }}

/* Página 3: un poco más compacta para que entre el antes y después */
.tight .cols {{ margin-top: 20px; }}
.tight .item {{ padding: 14px 18px; }}
.tight .ba li {{ padding: 3.5px 0; }}

/* Carátula */
.cover {{ background: {NAVY2}; color: #fff; padding: 46px 52px 0; }}
.cover .deco {{ position: absolute; right: -150px; bottom: 120px; width: 620px; opacity: .07; }}
.cover .deco svg {{ width: 100%; height: auto; display: block; }}
.cover h1 {{ font-size: 48px; line-height: 1.02; letter-spacing: -0.035em; margin: 18px 0 0; font-weight: 700; max-width: 560px; }}
.cover .sub {{ font-size: 16px; line-height: 1.5; color: {LINE}; margin: 16px 0 0; max-width: 520px; }}
.cover .q {{ margin-top: 28px; display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.16); border-radius: 99px; padding: 9px 16px; font-size: 13px; font-weight: 600; color: {TEAL_L}; }}
.toc {{ margin-top: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; position: relative; }}
.toc a {{ display: block; border-radius: 18px; padding: 18px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.16); }}
.toc .n {{ font-size: 11px; font-weight: 700; color: {TEAL_L}; letter-spacing: .08em; }}
.toc h3 {{ font-size: 16.5px; margin-top: 8px; color: #fff; }}
.toc p {{ margin: 4px 0 0; font-size: 11.5px; color: {LINE}; }}
.toc .go {{ margin-top: 12px; display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: {TEAL_L}; }}
.cover-foot {{ display: flex; justify-content: space-between; align-items: center; gap: 12px; border-top: 1px solid rgba(255,255,255,.16); margin-top: 22px; padding: 14px 0 22px; font-size: 10.5px; color: {LINE}; position: relative; }}
.cover-foot a {{ color: #fff; font-weight: 500; }}
"""

# ------------------------------------------------------------------ carátula
mono = (BRAND / "Must_Consulting_Monograma.svg").read_text()
mono = re.sub(r"<!--.*?-->", "", mono, flags=re.S)
mono = re.sub(r'(<svg[^>]*?)\s(width|height)="[^"]*"', r"\1", mono)
mono = re.sub(r'(<svg[^>]*?)\s(width|height)="[^"]*"', r"\1", mono)
mono_white = mono.replace("#06243E", "#FFFFFF").replace("#218F8B", "#FFFFFF")

cover = f'''<section class="page cover" id="p1">
  <div class="deco">{mono_white}</div>
  <div class="top" style="border-bottom:0;padding:0;position:relative">{logo(negative=True, width=176)}<a href="{WEB}" style="font-size:11.5px;font-weight:600;color:{TEAL_L}">must-consulting.com</a></div>
  <div style="margin-top:118px;position:relative">
    <div class="eyebrow" style="color:{TEAL_L}">Presentación de servicios</div>
    <h1>Soluciones para emprendedores, profesionales y PyMEs</h1>
    <p class="sub">Procesos, digitalización, automatización e indicadores para ordenar el día a día y decidir con información.</p>
    <span class="q">{ic("ArrowRight", 15, TEAL_L, 2)}¿Qué parte de tu negocio querés ordenar primero?</span>
  </div>
  <div class="toc">
    <a href="#p2"><span class="n">01</span><h3>Emprendedores y profesionales</h3><p>Emprendimientos y oficinas</p><span class="go">Página 2 {ic("ArrowRight", 13, TEAL_L, 2)}</span></a>
    <a href="#p4"><span class="n">02</span><h3>PyMEs</h3><p>Dueños · gerentes · equipos</p><span class="go">Página 4 {ic("ArrowRight", 13, TEAL_L, 2)}</span></a>
  </div>
  <div class="cover-foot">
    <span>Germán Mustafha · Ingeniero Industrial · Rosario, Argentina</span>
    <span><a href="{MAIL}">info@must-consulting.com</a> · <a href="{WA}">+54 9 341 6715384</a></span>
  </div>
</section>'''

# ------------------------------------------------------------------ 01 · emprendimientos (1/2)
chaos_rows = [
    ("Mail", "Mails sin leer: <b>52</b>", -3, 0),
    ("MessageCircle", "Cliente: “¿Y mi pedido???”", 2.5, 12),
    ("CalendarClock", "Vencía AYER: pago a proveedor", -2, -4),
    ("FileSpreadsheet", "planilla_FINAL_v3_ahora_sí.xlsx", 3, 9),
    ("Package", "¿Quedan cajas? Nadie sabe.", -2.5, 2),
]
order_rows = [
    ("Mail", "Mails: respuestas listas"),
    ("MessageCircle", "Cliente avisado: va en camino"),
    ("CalendarClock", "Aviso 3 días antes de cada pago"),
    ("FileSpreadsheet", "Una sola planilla, siempre al día"),
    ("Package", "Stock al día, con alertas"),
]
chaos_html = "".join(f'<li style="transform:translateX({dx}px) rotate({r}deg)">{ic(i, 14, MUTED)}<span class="t">{t}</span></li>' for i, t, r, dx in chaos_rows)
order_html = "".join(f'<li>{ic(i, 14, TEAL)}<span class="t">{t}</span>{ic("CircleCheck", 14, TEAL, 1.9)}</li>' for i, t in order_rows)
story = f'''<div style="margin-top:18px" class="eyebrow">Un lunes cualquiera</div>
  <div class="story">
    <div class="panel chaos">
      <div class="panel-head"><span>{ic("Clock", 13, MUTED)}Lunes 9:07</span><span class="chip" style="background:{NAVY2};color:#fff">Modo caos</span></div>
      <ul class="rows">{chaos_html}</ul>
    </div>
    <div style="display:flex;justify-content:center">{ic("ArrowRight", 20, TEAL, 2)}</div>
    <div class="panel order">
      <div class="panel-head"><span>{ic("Clock", 13, TEAL)}Lunes 18:00</span><span class="chip" style="background:{SURF};color:{TEAL_D}">● Todo en orden</span></div>
      <ul class="rows">{order_html}</ul>
      <div class="ending">{ic("Sunset", 15, TEAL_D)}Hoy salís a horario.</div>
    </div>
  </div>'''
SEC1 = '<b>01</b> Emprendimientos y oficinas'
p2 = f'''<section class="page" id="p2">
  {head(SEC1)}
  <h2 class="ttl">Emprendedores y profesionales independientes</h2>
  <p class="subtitle">Más tiempo para dedicarle a lo que hacés.</p>
  <p class="lead">Herramientas simples para ordenar el día a día de tu emprendimiento, estudio u oficina. Empezamos por lo que hoy te quita tiempo.</p>
  {cols()}
  <div class="items">
    {item("01", "Mail", "Respondés las mismas consultas una y otra vez.", "Organizamos el correo y preparamos respuestas modelo, reglas y recordatorios para dar seguimiento.", "Menos repetición. Más continuidad en la atención.")}
    {item("02", "CalendarClock", "Se te pasan cobros, turnos o vencimientos.", "Centralizamos las fechas importantes y configuramos avisos para vos o tu equipo.", "Pendientes visibles antes de que se vuelvan urgentes.")}
    {item("03", "ClipboardList", "Los pedidos quedan repartidos entre chats y notas.", "Armamos un registro compartido con cliente, pedido, estado y próxima acción.", "Cada pedido tiene un lugar y un seguimiento claro.")}
  </div>
  <div class="callout">
    <span class="ic" style="width:40px;height:40px;background:#fff">{ic("Sprout", 20, TEAL)}</span>
    <div><h3>No necesitás cambiar todo.</h3><p>Podemos empezar por una tarea o un circuito concreto y aprovechar las herramientas que ya usás.</p></div>
  </div>
  {story}
  {footer(2)}
</section>'''

# ------------------------------------------------------------------ 01 · emprendimientos (2/2)
def ba_row(icon, text, color, end=False):
    cls = "end" if end else ""
    return f'<li class="{cls}"><span class="dot">{ic(icon, 14, color, 1.8)}</span>{text}</li>'


before_after = f'''<div class="ba">
  <div class="col before">
    <span class="lbl" style="background:{NAVY2};color:#fff">Antes</span>
    <ol>
      {ba_row("MessageCircle", "Llega una consulta por WhatsApp.", MUTED)}
      {ba_row("MessagesSquare", "Se pierde entre otros 40 chats.", MUTED)}
      {ba_row("Hourglass", "Te acordás tres días después.", MUTED)}
      {ba_row("CircleX", "El cliente ya resolvió con otro.", NAVY2, True)}
    </ol>
  </div>
  <div style="display:flex;justify-content:center;align-items:center">{ic("ArrowRight", 20, TEAL, 2)}</div>
  <div class="col after">
    <span class="lbl" style="background:{SURF};color:{TEAL_D}">Después</span>
    <ol>
      {ba_row("MessageCircle", "Llega la misma consulta.", TEAL)}
      {ba_row("ClipboardList", "Queda anotada con cliente y estado.", TEAL)}
      {ba_row("BellRing", "Te llega un aviso para responder.", TEAL)}
      {ba_row("CircleCheck", "El cliente tiene respuesta a tiempo.", TEAL, True)}
    </ol>
  </div>
</div>'''
p3 = f'''<section class="page tight" id="p3">
  {head(SEC1)}
  <h2 class="ttl">Soluciones a tu escala</h2>
  <p class="subtitle">Menos tareas repetidas. Más claridad.</p>
  <p class="lead">Digitalizar también puede ser simple: una planilla bien armada, un formulario o un aviso que llega a tiempo.</p>
  {cols()}
  <div class="items">
    {item("04", "Copy", "Copiás los mismos datos en varios lugares.", "Conectamos formularios y planillas, y automatizamos cargas o documentos repetitivos cuando las herramientas lo permiten.", "Menos pasos manuales y menos errores de transcripción.")}
    {item("05", "FolderOpen", "Papeles, archivos y versiones se mezclan.", "Digitalizamos registros y definimos carpetas, nombres y accesos para encontrar la información.", "Documentos disponibles y una forma común de guardarlos.")}
    {item("06", "ChartColumn", "No tenés a mano tus números o tu stock.", "Preparamos un control sencillo de ingresos, gastos, pedidos o existencias, con resúmenes y alertas útiles.", "Una vista práctica de lo que necesitás seguir.")}
  </div>
  <div style="margin-top:16px" class="eyebrow">Un ejemplo simple: una consulta de un cliente</div>
  {before_after}
  <div style="margin-top:16px" class="eyebrow">Con lo que ya usás</div>
  <div class="tools"><span>Excel</span><span>Google Sheets</span><span>Formularios</span><span>Mail</span><span>WhatsApp</span><span>Carpetas compartidas</span></div>
  <div class="callout" style="margin-top:16px;justify-content:space-between;gap:18px;padding:14px 16px 14px 22px">
    <p style="margin:0;font-size:13px;max-width:380px;color:{NAVY}">Nos contás qué te complica. Elegimos una mejora concreta, la implementamos y te mostramos cómo usarla.</p>
    <a class="btn primary" href="{WA}">{ic("MessageCircle", 17, "#fff")}Contanos qué querés resolver</a>
  </div>
  {footer(3)}
</section>'''

# ------------------------------------------------------------------ 02 · PyMEs (1/2)
SEC2 = '<b>02</b> PyMEs'
p4 = f'''<section class="page" id="p4">
  {head(SEC2)}
  <h2 class="ttl">Dueños, gerentes y equipos</h2>
  <p class="subtitle">Cuando el negocio crece, la gestión también.</p>
  <p class="lead">Integramos información, ordenamos procesos y desarrollamos soluciones que acompañen el trabajo entre áreas.</p>
  {cols()}
  <div class="items">
    {item("01", "LayoutDashboard", "Cada área tiene sus números y no coinciden.", "Unificamos criterios y fuentes para construir dashboards en Power BI con indicadores de ventas, gastos, stock u operación.", "Una base común para seguir resultados y decidir.")}
    {item("02", "Timer", "Preparar los reportes lleva horas cada semana.", "Automatizamos la preparación y consolidación de datos, con controles y actualizaciones según las fuentes disponibles.", "Menos armado manual. Más tiempo para analizar.")}
    {item("03", "Route", "Los pedidos se demoran entre áreas.", "Revisamos el circuito, identificamos trabas y definimos responsables, estados, avisos y puntos de control.", "Seguimiento de punta a punta y desvíos más visibles.")}
    {item("04", "Users", "El trabajo depende de quien sabe hacerlo.", "Documentamos procesos y procedimientos, definimos roles y acompañamos al equipo en su adopción.", "Una manera de trabajar clara y más fácil de sostener.")}
  </div>
  <div style="margin-top:28px" class="eyebrow">Del dato a la decisión</div>
  <div class="dflow">
    <div class="f"><span class="ic" style="width:34px;height:34px;background:{SURF}">{ic("FileSpreadsheet", 17, TEAL)}</span><b>Fuentes</b><small>Sistema de gestión, planillas y registros de cada área</small></div>
    <div style="display:flex;justify-content:center">{ic("ArrowRight", 18, TEAL, 2)}</div>
    <div class="f"><span class="ic" style="width:34px;height:34px;background:{SURF}">{ic("Workflow", 17, TEAL)}</span><b>Integración</b><small>Criterios comunes, controles y actualización automática</small></div>
    <div style="display:flex;justify-content:center">{ic("ArrowRight", 18, TEAL, 2)}</div>
    <div class="f"><span class="ic" style="width:34px;height:34px;background:{SURF}">{ic("LayoutDashboard", 17, TEAL)}</span><b>Tablero</b><small>Indicadores por área en Power BI</small></div>
    <div style="display:flex;justify-content:center">{ic("ArrowRight", 18, TEAL, 2)}</div>
    <div class="f"><span class="ic" style="width:34px;height:34px;background:{TEAL}">{ic("TrendingUp", 17, "#fff")}</span><b>Decisiones</b><small>Desvíos a la vista y acciones con responsable</small></div>
  </div>
  {footer(4)}
</section>'''

# ------------------------------------------------------------------ 02 · PyMEs (2/2)
evo = [0.34, 0.46, 0.42, 0.58, 0.64, 0.8, 0.92]
months = ["Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep"]
evo_html = "".join(
    f'<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;justify-content:flex-end"><div style="width:100%;height:{int(v*100)}%;background:{TEAL if k >= 5 else "#A6DED8"};border-radius:5px 5px 0 0"></div><span style="font-size:8.5px;color:{MUTED}">{m}</span></div>'
    for k, (v, m) in enumerate(zip(evo, months))
)
areas = [("Comercial", 0.86, "86 %"), ("Administración", 0.72, "72 %"), ("Operaciones", 0.78, "78 %")]
area_html = "".join(
    f'''<div style="display:grid;grid-template-columns:88px 1fr 34px;gap:8px;align-items:center;font-size:10.5px;margin-top:9px">
      <span>{n}</span><span style="height:9px;background:{SURF};border-radius:9px;overflow:hidden"><span style="display:block;height:100%;width:{v*100:.0f}%;background:{TEAL};border-radius:9px"></span></span><span style="text-align:right;color:{MUTED}">{t}</span></div>'''
    for n, v, t in areas
)
spark = lambda pts: '<svg width="46" height="16" viewBox="0 0 46 16"><polyline fill="none" stroke="' + TEAL + '" stroke-width="1.8" points="' + " ".join(f"{i*46/(len(pts)-1):.1f},{16-p*14-1:.1f}" for i, p in enumerate(pts)) + '"/></svg>'
board = f'''<div class="board">
  <div class="board-head"><b>Visión de gestión</b><span class="note">Esquema ilustrativo · datos ficticios</span></div>
  <div class="tiles">
    <div class="tile"><div class="k">Ventas {spark([.2,.35,.3,.5,.55,.7,.85])}</div><div class="v">103 %</div><div class="d">del objetivo del mes</div></div>
    <div class="tile"><div class="k">Stock {spark([.7,.6,.65,.5,.55,.45,.5])}</div><div class="v">3</div><div class="d">productos bajo el mínimo</div></div>
    <div class="tile"><div class="k">Operación {spark([.4,.5,.45,.6,.7,.75,.8])}</div><div class="v">94 %</div><div class="d">pedidos entregados a tiempo</div></div>
  </div>
  <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:20px;margin-top:14px">
    <div><p class="mini-title">Evolución</p><div style="display:flex;gap:7px;height:96px;align-items:flex-end">{evo_html}</div></div>
    <div><p class="mini-title">Seguimiento por área</p>{area_html}</div>
  </div>
</div>'''
p5 = f'''<section class="page" id="p5">
  {head(SEC2)}
  <h2 class="ttl">Indicadores, procesos y mejora continua</h2>
  <p class="subtitle">Ver lo importante. Actuar con criterio.</p>
  <p class="lead">Un dashboard no es solo un gráfico: reúne información confiable para detectar desvíos y saber dónde intervenir.</p>
  {board}
  <div class="callout" style="margin-top:14px;align-items:flex-start">
    <span class="ic" style="width:40px;height:40px;background:#fff">{ic("ShieldCheck", 20, TEAL)}</span>
    <div><h3>Gestión y calidad</h3><p style="color:{NAVY}">Acompañamos la organización de procedimientos, controles, registros e indicadores para fortalecer la gestión y preparar sistemas como ISO 9001.</p>
    <p class="note" style="margin-top:6px">El alcance se define según la necesidad. El acompañamiento no incluye emitir certificaciones.</p></div>
  </div>
  <div style="margin-top:20px" class="eyebrow">Tres pasos, sin vueltas</div>
  <div class="steps">
    <div><div class="stepnum">01</div><h3>Charlamos</h3><p>Entendemos tu operación y lo que querés mejorar.</p></div>
    <div><div class="stepnum">02</div><h3>Armamos un plan</h3><p>Priorizamos y acordamos alcance, plazos e inversión.</p></div>
    <div><div class="stepnum">03</div><h3>Lo hacemos juntos</h3><p>Implementamos y acompañamos la puesta en uso.</p></div>
  </div>
  <div class="contact">
    <div>
      <h3 style="font-size:17px;color:#fff">Germán Mustafha · Ingeniero Industrial</h3>
      <p style="margin:4px 0 0;color:{LINE};font-size:12px;display:flex;align-items:center;gap:6px">{ic("MapPin", 14, TEAL_L)}Rosario · <a href="{MAIL}" style="color:#fff">info@must-consulting.com</a></p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">
        <a class="btn primary" href="{WA}">{ic("MessageCircle", 17, "#fff")}Conversemos por WhatsApp</a>
        <a class="btn outline" href="{CAL}">{ic("CalendarDays", 17, "#fff")}Agendar una charla</a>
      </div>
      <p style="margin:10px 0 0;font-size:12px;color:{LINE}">+54 9 341 6715384 · <a href="{WEB}" style="color:#fff">must-consulting.com</a></p>
    </div>
    <div class="qr"><a href="{WA}">{QR}</a><p>Escaneá para escribirnos por WhatsApp</p></div>
  </div>
  {footer(5)}
</section>'''

html = f'''<!doctype html><html lang="es-AR"><head><meta charset="utf-8">
<title>Must Consulting | Soluciones para emprendedores, profesionales y PyMEs</title><style>{CSS}</style></head>
<body>{cover}{p2}{p3}{p4}{p5}</body></html>'''
(HERE / "presentacion.html").write_text(html, encoding="utf-8")
print("ok", len(html))
