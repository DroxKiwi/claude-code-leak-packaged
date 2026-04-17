#!/bin/sh
set -e

echo "Starting Drox terminal CLI (web frontend removed from fork scope)..."
exec bun /app/src/entrypoints/cli.tsx "$@"
