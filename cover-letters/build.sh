#!/usr/bin/env bash
# Build cover letter HTML from markdown, styled to match the CV.
#
# Usage:
#   ./build.sh                     build every *.md in this directory (except template.md)
#   ./build.sh 2026-companyname.md build just that one
#
# Requires pandoc (brew install pandoc).
set -euo pipefail
cd "$(dirname "$0")"

files=("$@")
if [ ${#files[@]} -eq 0 ]; then
    shopt -s nullglob
    files=(*.md)
    shopt -u nullglob
fi

for f in "${files[@]}"; do
    [ "$f" = "template.md" ] && continue
    out="${f%.md}.html"
    pandoc "$f" --template=template.html --standalone --wrap=none -o "$out"
    echo "Built $out"
done
