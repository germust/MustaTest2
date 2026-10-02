"""Genera placas.html: 12 placas cuadradas (1080 x 1080) para el catálogo de WhatsApp Business.

Mismo estilo que la web y el PDF. Ver README.md para los pasos (HTML -> PNG).
"""
import json, re
from pathlib import Path

HERE = Path(__file__).resolve().parent
ASSETS = HERE / "assets"
SHARED = HERE.parent / "presentacion-pdf" / "assets"  # logo, tipografía (compartidos con el PDF)
ICONS = json.loads((ASSETS / "icons.json").read_text())

TEAL, TEAL_D, TEAL_L, NAVY, NAVY2, MUTED, LINE, SURF, IVORY = "#2E7F7A", "#246B67", "#7ED0C7", "#122332", "#18364B", "#5B6873", "#D6E0E2", "#E6EEEE", "#F7F8F6"


def ic(name, size=28, color="currentColor", stroke=1.8):
    svg = ICONS[name]
    svg = re.sub(r'width="\d+"', f'width="{size}"', svg, count=1)
    svg = re.sub(r'height="\d+"', f'height="{size}"', svg, count=1)
    return svg.replace('stroke="currentColor"', f'stroke="{color}"').replace('stroke-width="1.7"', f'stroke-width="{stroke}"')


def logo(variant):
    # Fondo claro: logo oficial. Fondo azul: negativo. Fondo verde: todo en blanco.
    src = SHARED / ("Must_Consulting_Logo_Vector.svg" if variant == "ivory" else "Must_Consulting_Logo_Negativo.svg")
    style = "filter:brightness(0) invert(1)" if variant == "teal" else ""
    return f'<span class="logo"><img src="file://{src}" alt="Must Consulting" style="{style}"></span>'


# ------------------------------------------------------------------ piezas de las maquetas
def chip(text, kind="soft"):
    return f'<span class="mchip {kind}">{text}</span>'


def rows(header, items):
    """Tarjeta con filas: (ícono, texto, chip, tipo de chip)."""
    lis = "".join(
        f'<li><span class="dot">{ic(i, 26, TEAL)}</span><span class="t">{t}</span>{chip(c, k) if c else ""}</li>' for i, t, c, k in items
    )
    head = f'<div class="mhead">{header}</div>' if header else ""
    return f'<div class="mock">{head}<ul class="mrows">{lis}</ul></div>'


def flow(steps, caption):
    parts = []
    for n, (i, t, sub) in enumerate(steps):
        if n:
            parts.append(f'<span class="farrow">{ic("ArrowRight", 30, TEAL, 2.2)}</span>')
        parts.append(f'<div class="fbox"><span class="dot big">{ic(i, 30, TEAL)}</span><b>{t}</b><small>{sub}</small></div>')
    return f'<div class="mock"><div class="mflow">{"".join(parts)}</div><div class="mcap">{ic("CircleCheck", 24, TEAL, 2)}{caption}</div></div>'


def table(cols, data):
    th = "".join(f"<th>{c}</th>" for c in cols)
    trs = "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in data)
    return f'<div class="mock"><table class="mtable"><tr>{th}</tr>{trs}</table></div>'


def bars(values, highlight_from):
    return "".join(
        f'<span class="bar" style="height:{int(v * 100)}%;background:{TEAL if k >= highlight_from else "#A6DED8"}"></span>' for k, v in enumerate(values)
    )


# ------------------------------------------------------------------ las 12 placas
P = []

P.append(dict(
    code="MC-00", coll="Para empezar", variant="teal", icon="CalendarDays",
    title="Charla inicial de 30 minutos",
    q="Nos contás qué te complica y te proponemos por dónde empezar.",
    mock=f'''<div class="mock">
      <div class="mhead">Elegí un horario</div>
      <div class="slots">
        <span>Lun 10:00</span><span>Mar 15:30</span><span class="on">{ic("CircleCheck", 24, "#fff", 2.2)}Mié 11:00</span><span>Jue 9:30</span><span>Vie 17:00</span><span>Lun 16:00</span>
      </div>
      <div class="mcap">{ic("MessageCircle", 24, TEAL, 2)}También podés escribirnos por WhatsApp.</div>
    </div>''',
    ben="Primero entendemos tu caso. Después, el plan.",
    name="Charla inicial de 30 minutos",
    desc="Nos contás cómo trabajás hoy y qué te quita tiempo. En 30 minutos te proponemos por dónde empezar: una tarea, un circuito o un tablero concreto.",
    link="https://calendly.com/must-consulting/30min",
))

E = "01 · Emprendimientos y oficinas"
P.append(dict(
    code="MC-01", coll=E, variant="ivory", icon="Mail",
    title="Consultas y mails en orden",
    q="¿Respondés las mismas consultas una y otra vez?",
    mock=rows("Bandeja ordenada", [
        ("Reply", "Respuesta modelo: precios", "Lista", "ok"),
        ("Reply", "Respuesta modelo: horarios", "Lista", "ok"),
        ("BellRing", "Seguimiento a cliente", "Mañana", "soft"),
    ]),
    ben="Menos repetición. Más continuidad en la atención.",
    name="Consultas y mails en orden",
    desc="Organizamos el correo y preparamos respuestas modelo, reglas y recordatorios para dar seguimiento. Menos repetición y más continuidad en la atención.",
    link="https://must-consulting.com/#problemas",
))
P.append(dict(
    code="MC-02", coll=E, variant="ivory", icon="CalendarClock",
    title="Avisos de cobros, turnos y vencimientos",
    q="¿Se te pasan cobros, turnos o vencimientos?",
    mock=rows("Próximos avisos", [
        ("Wallet", "Cobro a cliente", "Hoy", "warn"),
        ("Clock", "Turno de las 15:30", "Mañana", "soft"),
        ("CalendarClock", "Pago a proveedor", "En 3 días", "soft"),
    ]),
    ben="Pendientes visibles antes de que se vuelvan urgentes.",
    name="Avisos de cobros, turnos y vencimientos",
    desc="Centralizamos las fechas importantes y configuramos avisos para vos o tu equipo. Los pendientes quedan a la vista antes de que se vuelvan urgentes.",
    link="https://must-consulting.com/#problemas",
))
P.append(dict(
    code="MC-03", coll=E, variant="ivory", icon="ClipboardList",
    title="Registro de pedidos y clientes",
    q="¿Los pedidos quedan repartidos entre chats y notas?",
    mock=table(["Pedido", "Cliente", "Estado"], [
        ["#128", "Cliente A", chip("En preparación", "soft")],
        ["#129", "Cliente B", chip("Entregado", "ok")],
        ["#130", "Cliente C", chip("A confirmar", "warn")],
    ]),
    ben="Cada pedido tiene un lugar y un seguimiento claro.",
    name="Registro de pedidos y clientes",
    desc="Armamos un registro compartido con cliente, pedido, estado y próxima acción, para que cada pedido tenga un lugar y un seguimiento claro.",
    link="https://must-consulting.com/#problemas",
))
P.append(dict(
    code="MC-04", coll=E, variant="ivory", icon="Zap",
    title="Cargas y documentos automáticos",
    q="¿Copiás los mismos datos en varios lugares?",
    mock=flow([
        ("ClipboardList", "Formulario", "Cargás una vez"),
        ("FileSpreadsheet", "Planilla", "Se completa sola"),
        ("FileText", "Documento", "Listo para enviar"),
    ], "Sin copiar y pegar entre archivos."),
    ben="Menos pasos manuales y menos errores de transcripción.",
    name="Cargas y documentos automáticos",
    desc="Conectamos formularios y planillas, y automatizamos cargas o documentos repetitivos cuando las herramientas lo permiten. Menos pasos manuales y menos errores.",
    link="https://must-consulting.com/#servicios",
))
P.append(dict(
    code="MC-05", coll=E, variant="ivory", icon="FolderOpen",
    title="Digitalización de papeles y archivos",
    q="¿Papeles, archivos y versiones se mezclan?",
    mock=f'''<div class="mock">
      <div class="mhead">Carpeta compartida</div>
      <ul class="tree">
        <li>{ic("FolderOpen", 28, TEAL)}<b>Clientes</b></li>
        <li class="in">{ic("Folder", 26, TEAL)}Presupuestos 2026</li>
        <li class="in2">{ic("FileText", 26, MUTED)}Presupuesto_ClienteA_v2.pdf {chip("Vigente", "ok")}</li>
        <li class="in">{ic("Folder", 26, TEAL)}Facturas 2026</li>
      </ul>
    </div>''',
    ben="Documentos disponibles y una forma común de guardarlos.",
    name="Digitalización de papeles y archivos",
    desc="Digitalizamos registros y definimos carpetas, nombres y accesos para encontrar la información. Documentos disponibles y una forma común de guardarlos.",
    link="https://must-consulting.com/#servicios",
))
P.append(dict(
    code="MC-06", coll=E, variant="ivory", icon="ChartColumn",
    title="Control simple de números y stock",
    q="¿No tenés a mano tus números o tu stock?",
    mock=f'''<div class="mock">
      <div class="mhead" style="display:flex;justify-content:space-between"><span>Mi negocio · Este mes</span><span class="tiny">Ejemplo ilustrativo</span></div>
      <div class="tiles3">
        <div><small>Ingresos</small><b class="up">{ic("TrendingUp", 26, TEAL, 2.2)} En alza</b></div>
        <div><small>Gastos</small><b>Al día</b></div>
        <div><small>Stock bajo</small><b>2 productos</b></div>
      </div>
      <div class="bars">{bars([0.45, 0.62, 0.55, 0.78, 0.7, 0.92], 5)}</div>
    </div>''',
    ben="Una vista práctica de lo que necesitás seguir.",
    name="Control simple de números y stock",
    desc="Preparamos un control sencillo de ingresos, gastos, pedidos o existencias, con resúmenes y alertas útiles. Una vista práctica de lo que necesitás seguir.",
    link="https://must-consulting.com/#servicios",
))

Y = "02 · PyMEs"
P.append(dict(
    code="MC-07", coll=Y, variant="navy", icon="LayoutDashboard",
    title="Tableros de control en Power BI",
    q="¿Cada área tiene sus números y no coinciden?",
    mock=f'''<div class="mock">
      <div class="mhead" style="display:flex;justify-content:space-between"><span>Visión de gestión</span><span class="tiny">Ejemplo ilustrativo</span></div>
      <div class="tiles3">
        <div><small>Ventas vs. objetivo</small><b>103 %</b></div>
        <div><small>Entregas a tiempo</small><b>94 %</b></div>
        <div><small>Stock crítico</small><b>3</b></div>
      </div>
      <div class="bars">{bars([0.38, 0.5, 0.46, 0.62, 0.7, 0.84, 0.95], 5)}</div>
    </div>''',
    ben="Una base común para seguir resultados y decidir.",
    name="Tableros de control en Power BI",
    desc="Unificamos criterios y fuentes para construir dashboards en Power BI con indicadores de ventas, gastos, stock u operación. Una base común para seguir resultados y decidir.",
    link="https://must-consulting.com/#servicios",
))
P.append(dict(
    code="MC-08", coll=Y, variant="navy", icon="Timer",
    title="Reportes automáticos",
    q="¿Preparar los reportes lleva horas cada semana?",
    mock=rows("Reportes de la semana", [
        ("Send", "Reporte semanal de ventas", "Enviado solo", "ok"),
        ("FileSpreadsheet", "Consolidado de stock", "Actualizado", "ok"),
        ("ClipboardCheck", "Control de datos", "Revisado", "soft"),
    ]),
    ben="Menos armado manual. Más tiempo para analizar.",
    name="Reportes automáticos",
    desc="Automatizamos la preparación y consolidación de datos, con controles y actualizaciones según las fuentes disponibles. Menos armado manual y más tiempo para analizar.",
    link="https://must-consulting.com/#servicios",
))
P.append(dict(
    code="MC-09", coll=Y, variant="navy", icon="Route",
    title="Circuitos entre áreas",
    q="¿Los pedidos se demoran entre áreas?",
    mock=flow([
        ("UserRound", "Ventas", "Carga el pedido"),
        ("Warehouse", "Depósito", "Prepara y avisa"),
        ("Receipt", "Administración", "Factura y cierra"),
    ], "Responsables, estados y avisos en cada paso."),
    ben="Seguimiento de punta a punta y desvíos más visibles.",
    name="Circuitos entre áreas",
    desc="Revisamos el circuito, identificamos trabas y definimos responsables, estados, avisos y puntos de control. Seguimiento de punta a punta y desvíos más visibles.",
    link="https://must-consulting.com/#servicios",
))
P.append(dict(
    code="MC-10", coll=Y, variant="navy", icon="Users",
    title="Procesos y procedimientos documentados",
    q="¿El trabajo depende de quien sabe hacerlo?",
    mock=f'''<div class="mock">
      <div class="mhead" style="display:flex;justify-content:space-between;align-items:center"><span>Procedimiento: recepción de pedidos</span>{chip("Responsable: Ventas", "soft")}</div>
      <ol class="steps">
        <li><span>1</span>Recibir y registrar el pedido</li>
        <li><span>2</span>Confirmar stock y plazo</li>
        <li><span>3</span>Avisar al cliente</li>
      </ol>
    </div>''',
    ben="Una manera de trabajar clara y más fácil de sostener.",
    name="Procesos y procedimientos documentados",
    desc="Documentamos procesos y procedimientos, definimos roles y acompañamos al equipo en su adopción. Una manera de trabajar clara y más fácil de sostener.",
    link="https://must-consulting.com/#servicios",
))
P.append(dict(
    code="MC-11", coll=Y, variant="navy", icon="ShieldCheck",
    title="Preparación para ISO 9001",
    q="Procedimientos, controles, registros e indicadores para fortalecer la gestión.",
    mock=rows("Preparación del sistema de gestión", [
        ("FileCheck", "Procesos documentados", "Listo", "ok"),
        ("ClipboardCheck", "Registros y evidencias", "Listo", "ok"),
        ("Search", "Auditoría interna", "Planificada", "soft"),
    ]),
    ben="No emitimos certificaciones: acompañamos la preparación.",
    name="Preparación para ISO 9001",
    desc="Acompañamos la organización de procedimientos, controles, registros e indicadores para fortalecer la gestión y preparar sistemas como ISO 9001. El alcance se define según la necesidad; el acompañamiento no incluye emitir certificaciones.",
    link="https://must-consulting.com/#servicios",
))

# ------------------------------------------------------------------ estilos
CSS = f"""
@font-face {{ font-family: Inter; font-weight: 100 900; src: url(file://{SHARED}/inter-latin.woff2) format("woff2"); }}
* {{ box-sizing: border-box; }}
body {{ margin: 0; background: #888; font-family: Inter, sans-serif; display: flex; flex-wrap: wrap; gap: 20px; padding: 20px; }}
.placa {{ width: 1080px; height: 1080px; padding: 70px 72px 56px; display: flex; flex-direction: column; position: relative; overflow: hidden; }}
.ivory {{ background: {IVORY}; color: {NAVY}; }}
.navy {{ background: {NAVY2}; color: #fff; }}
.teal {{ background: {TEAL}; color: #fff; }}
.top {{ display: flex; justify-content: space-between; align-items: center; }}
.logo {{ display: inline-block; position: relative; width: 210px; aspect-ratio: 1445/478; overflow: hidden; }}
.logo img {{ position: absolute; max-width: none; width: 150.3114%; left: -24.1522%; top: -26.1506%; }}
.coll {{ font-size: 21px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; border-radius: 99px; padding: 9px 20px; }}
.ivory .coll {{ background: {SURF}; color: {TEAL_D}; }}
.navy .coll {{ background: rgba(255,255,255,.1); color: {TEAL_L}; border: 1.5px solid rgba(255,255,255,.18); }}
.teal .coll {{ background: rgba(255,255,255,.16); color: #fff; }}
.hero {{ display: flex; gap: 26px; align-items: flex-start; margin-top: 52px; }}
.hicon {{ width: 92px; height: 92px; border-radius: 99px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }}
.ivory .hicon {{ background: {TEAL}; }}
.navy .hicon {{ background: {TEAL}; }}
.teal .hicon {{ background: #fff; }}
h1 {{ font-size: 64px; line-height: 1.04; letter-spacing: -0.03em; margin: 0; font-weight: 700; text-wrap: balance; }}
.q {{ font-size: 30px; line-height: 1.3; margin: 22px 0 0; font-weight: 600; text-wrap: pretty; }}
.ivory .q {{ color: {TEAL_D}; }}
.navy .q {{ color: {TEAL_L}; }}
.teal .q {{ color: {SURF}; }}
.stage {{ flex: 1; display: flex; align-items: center; }}
.mock {{ width: 100%; background: #fff; color: {NAVY}; border-radius: 30px; border: 2px solid {LINE}; padding: 28px 32px; box-shadow: 0 10px 0 -4px rgba(0,0,0,.08); }}
.ivory .mock {{ box-shadow: 0 10px 0 -4px #DCE5E5; }}
.mhead {{ font-size: 22px; font-weight: 700; color: {MUTED}; letter-spacing: .04em; margin-bottom: 8px; }}
.tiny {{ font-size: 17px; font-weight: 500; color: {MUTED}; letter-spacing: 0; }}
.mrows {{ list-style: none; margin: 0; padding: 0; }}
.mrows li {{ display: flex; align-items: center; gap: 18px; padding: 15px 0; border-bottom: 2px solid {SURF}; font-size: 28px; }}
.mrows li:last-child {{ border-bottom: 0; padding-bottom: 4px; }}
.mrows .t {{ flex: 1; }}
.dot {{ width: 54px; height: 54px; border-radius: 99px; background: {SURF}; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }}
.dot.big {{ width: 66px; height: 66px; }}
.mchip {{ border-radius: 99px; padding: 6px 16px; font-size: 21px; font-weight: 600; white-space: nowrap; }}
.mchip.ok {{ background: {SURF}; color: {TEAL_D}; }}
.mchip.soft {{ background: {IVORY}; color: {NAVY2}; border: 2px solid {LINE}; }}
.mchip.warn {{ background: {NAVY2}; color: #fff; }}
.mflow {{ display: grid; grid-template-columns: 1fr 40px 1fr 40px 1fr; align-items: center; gap: 8px; }}
.fbox {{ border: 2px solid {LINE}; border-radius: 22px; padding: 22px 12px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; }}
.fbox b {{ font-size: 26px; }}
.fbox small {{ font-size: 19px; color: {MUTED}; line-height: 1.25; }}
.farrow {{ display: flex; justify-content: center; }}
.mcap {{ margin-top: 20px; display: flex; align-items: center; gap: 12px; font-size: 24px; color: {TEAL_D}; font-weight: 600; }}
.mtable {{ width: 100%; border-collapse: collapse; font-size: 27px; }}
.mtable th {{ text-align: left; font-size: 20px; color: {MUTED}; font-weight: 700; letter-spacing: .04em; padding: 0 8px 12px; border-bottom: 2px solid {LINE}; }}
.mtable td {{ padding: 17px 8px; border-bottom: 2px solid {SURF}; }}
.mtable tr:last-child td {{ border-bottom: 0; }}
.mtable td:first-child {{ font-weight: 700; color: {TEAL_D}; }}
.slots {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 10px; }}
.slots span {{ border: 2px solid {LINE}; border-radius: 16px; padding: 18px 10px; text-align: center; font-size: 26px; font-weight: 600; color: {NAVY2}; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }}
.slots span.on {{ background: {TEAL}; border-color: {TEAL}; color: #fff; }}
.tree {{ list-style: none; margin: 6px 0 0; padding: 0; font-size: 27px; }}
.tree li {{ display: flex; align-items: center; gap: 14px; padding: 12px 0; }}
.tree li.in {{ padding-left: 44px; }}
.tree li.in2 {{ padding-left: 88px; color: {MUTED}; font-size: 24px; }}
.tree .mchip {{ margin-left: 6px; }}
.tiles3 {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 10px; }}
.tiles3 div {{ border: 2px solid {LINE}; border-radius: 18px; padding: 16px 18px; }}
.tiles3 small {{ display: block; font-size: 20px; color: {MUTED}; font-weight: 600; }}
.tiles3 b {{ display: flex; align-items: center; gap: 6px; font-size: 32px; margin-top: 4px; letter-spacing: -0.02em; }}
.tiles3 b.up {{ font-size: 28px; color: {TEAL_D}; }}
.bars {{ display: flex; gap: 12px; align-items: flex-end; height: 120px; margin-top: 20px; }}
.bar {{ flex: 1; border-radius: 8px 8px 0 0; }}
.steps {{ list-style: none; margin: 10px 0 0; padding: 0; }}
.steps li {{ display: flex; align-items: center; gap: 18px; padding: 14px 0; font-size: 28px; border-bottom: 2px solid {SURF}; }}
.steps li:last-child {{ border-bottom: 0; }}
.steps span {{ width: 50px; height: 50px; border-radius: 99px; background: {TEAL}; color: #fff; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }}
.ben {{ display: flex; align-items: center; gap: 14px; font-size: 28px; font-weight: 650; line-height: 1.3; }}
.ivory .ben {{ color: {NAVY}; }}
.foot {{ margin-top: 26px; padding-top: 22px; display: flex; justify-content: space-between; align-items: center; font-size: 22px; font-weight: 600; }}
.ivory .foot {{ border-top: 2px solid {LINE}; color: {TEAL_D}; }}
.navy .foot, .teal .foot {{ border-top: 2px solid rgba(255,255,255,.2); color: #fff; }}
.foot .go {{ display: inline-flex; align-items: center; gap: 10px; }}
"""


def placa(p):
    v = p["variant"]
    icon_color = TEAL if v == "teal" else "#fff"
    check = TEAL_L if v != "ivory" else TEAL
    return f'''<section class="placa {v}" data-code="{p["code"]}">
  <div class="top">{logo(v)}<span class="coll">{p["coll"]}</span></div>
  <div class="hero"><span class="hicon">{ic(p["icon"], 46, icon_color, 1.9)}</span><div><h1>{p["title"]}</h1><p class="q">{p["q"]}</p></div></div>
  <div class="stage">{p["mock"]}</div>
  <div class="ben">{ic("CircleCheck", 34, check if v != "teal" else "#fff", 2.1)}<span>{p["ben"]}</span></div>
  <div class="foot"><span>must-consulting.com</span><span class="go">Consultá por este servicio {ic("ArrowRight", 26, "currentColor", 2.2)}</span></div>
</section>'''


html = f'''<!doctype html><html lang="es-AR"><head><meta charset="utf-8"><title>Placas WhatsApp Business · Must Consulting</title>
<style>{CSS}</style></head><body>{"".join(placa(p) for p in P)}</body></html>'''
(HERE / "placas.html").write_text(html, encoding="utf-8")

# Textos del catálogo (para copiar y pegar en WhatsApp Business)
lines = ["# Catálogo de WhatsApp Business · Must Consulting", "",
         "Cada producto: imagen (carpeta `png/`), nombre, descripción y enlace. El precio queda vacío.", ""]
current = None
for p in P:
    if p["coll"] != current:
        current = p["coll"]
        lines += [f"## Colección: {current.split(' · ')[-1]}", ""]
    lines += [f"### {p['code']} · {p['name']}", "",
              f"- **Imagen:** `png/{p['code']}.png`",
              f"- **Nombre:** {p['name']}",
              f"- **Descripción:** {p['desc']}",
              f"- **Enlace:** {p['link']}",
              f"- **Código del artículo:** {p['code']}", ""]
(HERE / "catalogo.md").write_text("\n".join(lines), encoding="utf-8")
print("ok", len(P), "placas")
