# Avatar Guide

## Core Rule

Official avatars are fixed assets. AI must never:
- Recreate avatars from memory or description
- Redesign avatar visual identity
- Reinterpret what an avatar looks like
- Generate avatar images using AI tools

If avatar files are unavailable, use placeholder elements.
Avatar identity comes from stored files, not AI generation.

## Asset Location

Production avatar assets belong in:
  assets/avatars/

This directory is a protected path. Claude Code does not access or
modify it without explicit user confirmation.

## Placeholder Policy

When avatar assets are not yet present:
- Use a labeled placeholder box (e.g., [HFK AVATAR])
- Use a neutral color fill with the avatar name as text
- Never attempt to generate a substitute image

## Current Avatars

(None registered yet. Add avatar file entries here as assets are added.)

## Avatar Usage in Templates

Templates reference avatar assets by relative path from the public/
directory. Avatar paths must be stable — do not move or rename avatar
files once templates reference them.
