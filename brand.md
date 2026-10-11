# Forensyra brand guide

Keep this short and consistent. It is the reference for how Forensyra looks and
sounds across the website, GitHub, and social posts.

## Identity

| Element | Value |
| --- | --- |
| Name | **FORENSYRA** (always uppercase, one word) |
| Descriptor | Digital Evidence & DFIR Collective |
| Tagline | Where Digital Truth Takes Form. |
| Motto | Preserve the Trace. Prove the Story. |

## Logo

- Files: `Photos/fav_icon.png` (master, 4096px), `public/brand-mark.png` (web
  mark, 768px — the header, footer, intro, and homepage hero all use this),
  `src/app/icon.png` (favicon), `src/app/apple-icon.png` (touch icon).
- The mark is circular and already sized to sit inside a circle — always show it
  as-is. Do not stretch it, recolour it, or place it on a busy background.
- There are no crown or other decorative emblem icons in the UI; the brand mark
  is the only symbol used.

## Colour

Navy & gold luxury palette. Tokens live in `src/app/globals.css`.

| Token | Hex | Use |
| --- | --- | --- |
| `background` | `#071827` | Page background (deep navy) |
| `surface` | `#0d2238` | Dark panels |
| `surface-2` | `#122b46` | Cards on dark |
| `elevated` | `#193654` | Elevated surface |
| `border` | `#1f3a5a` | Dividers and outlines |
| `border-gold` | `rgba(230,182,79,0.28)` | Branded hairline |
| `foreground` | `#f5f4f0` | Primary text on dark |
| `muted` | `#b7c4d2` | Secondary text on dark |
| `ink` | `#071827` | Text placed on gold fills |
| `accent` | `#e6b64f` | Brand gold |
| `accent-2` | `#f5d58a` | Light gold |
| `accent-deep` | `#a97f22` | Gold for text on light |
| `accent-ink` | `#8a6417` | Accessible gold for small text on light |
| `light` | `#f3f5f6` | Light section background |
| `light-2` | `#eceff2` | Second off-white surface |
| `light-card` | `#ffffff` | Light card background |
| `light-ink` | `#102741` | Primary text on light |
| `light-muted` | `#4d5f75` | Secondary text on light |
| `light-border` | `#dde3e9` | Light divider |
| `success` | `#6fae86` | Positive states |
| `warning` | `#e6b64f` | Pinned / attention |
| `danger` | `#d98a8a` | Errors |

## Type

- **Display:** Playfair Display — headings (`.font-display`).
- **Sans:** Inter — body and UI.
- **Mono:** IBM Plex Mono — labels, stats, metadata, uppercase eyebrows.
- Headings and display type scale fluidly with `clamp()`.

## Imagery

- **No stock photography.** Heroes, page headers and section panels use the
  brand mark itself, via `BrandBackdrop` and `BrandPlate` in
  `src/components/brand-visual.tsx`.
- Watermarks sit at or below ~10% opacity and always underneath the content;
  plates hold the mark at 90% with a soft gold glow.
- Never invent portraits, credentials or documentary case imagery.

## Voice

- Precise and calm. Evidence-led, never sensational.
- Prefer "shows", "indicates", "preserved" over "proves" (except our motto).
- Always legal and ethical: practice cases and public sample evidence only.
