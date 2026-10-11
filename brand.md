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
| `background` | `#0d1b2a` | Page background (navy blue) |
| `surface` | `#1b365d` | Cards and panels (ocean blue) |
| `surface-2` | `#24446f` | Raised surfaces |
| `border` | `#2e4a73` | Dividers and outlines |
| `foreground` | `#f5ebdd` | Primary text (ivory) |
| `muted` | `#93a3bb` | Secondary text |
| `ink` | `#0d1b2a` | Text placed on gold fills |
| `accent` | `#c99a47` | Brand accent (antique gold) |
| `accent-2` | `#e6c17a` | Secondary accent (champagne gold) |
| `accent-deep` | `#9a7524` | Accessible text on gold |
| `accent-2-deep` | `#b98f3a` | Accessible text on champagne |
| `success` | `#8fbf9f` | Positive states |
| `warning` | `#e6c17a` | Pinned / attention |

## Type

- **Sans:** Geist — body and headings.
- **Mono:** Geist Mono — labels, hex/binary accents, uppercase eyebrows.

## Voice

- Precise and calm. Evidence-led, never sensational.
- Prefer "shows", "indicates", "preserved" over "proves" (except our motto).
- Always legal and ethical: practice cases and public sample evidence only.
