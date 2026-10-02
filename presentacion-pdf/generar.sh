#!/usr/bin/env bash
# Regenera "Must Consulting - Presentacion.pdf" a partir de build.py.
set -euo pipefail
cd "$(dirname "$0")"
python3 build.py
node render.mjs
python3 finalize.py
