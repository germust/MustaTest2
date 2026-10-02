"""Agrega título, autor y tema al PDF y controla páginas, enlaces y transparencias."""
from pathlib import Path
from pypdf import PdfReader, PdfWriter

HERE = Path(__file__).resolve().parent
SRC = HERE / "presentacion-sin-metadatos.pdf"
OUT = HERE / "Must Consulting - Presentacion.pdf"

writer = PdfWriter(clone_from=PdfReader(SRC))
writer.add_metadata({
    "/Title": "Must Consulting | Soluciones para emprendedores, profesionales y PyMEs",
    "/Author": "Must Consulting · Germán Mustafha",
    "/Subject": "Procesos, digitalización, automatización e indicadores",
    "/Keywords": "Must Consulting, emprendedores, profesionales independientes, oficinas, PyMEs, Rosario, Power BI, ISO 9001",
})
with OUT.open("wb") as f:
    writer.write(f)

reader = PdfReader(OUT)
links = sum(1 for pg in reader.pages for a in (pg.get("/Annots") or []) if a.get_object().get("/Subtype") == "/Link")
# Las sombras con desenfoque se guardan con máscaras de transparencia y algunos visores
# de celular las dibujan como rectángulos oscuros: tiene que dar 0.
masks = sum(
    1
    for pg in reader.pages
    for gs in (pg["/Resources"].get("/ExtGState") or {}).values()
    if "/SMask" in gs.get_object() and gs.get_object()["/SMask"] != "/None"
)
print(f"{OUT.name}: {len(reader.pages)} páginas, {OUT.stat().st_size // 1024} KB, {links} enlaces, {masks} máscaras de transparencia")
