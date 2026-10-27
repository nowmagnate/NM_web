# Template fonts

The 24 templates' typefaces, committed to the repo as latin-subset `woff2` files
and loaded with `next/font/local`. They are here so that a build never has to
reach Google.

## Why they are local

`next/font/google` fetches Google's CSS during `next build` and parses it. The
response sometimes comes back with font URLs that have no file extension
(`fonts.gstatic.com/l/font?kit=...`), and the loader then crashes with
`Cannot read properties of null (reading '1')` in
`@next/font/dist/google/loader.js`. The build fails although nothing in the
project is wrong, and passes on a retry. The studio's own fonts in `src/fonts`
were moved to local files for the same reason; this folder does the same for the
templates.

## What is here

| File | Used by |
| --- | --- |
| `manifest.json` | Written by the fetch script: for every file, its weight descriptor, its real variation axes, size, SHA-256 and where it came from |
| `OFL-LICENSE.txt` | The licence all of these families are released under (SIL OFL 1.1) |
| `*.woff2` | One file per family. Most are variable fonts, so a single file covers the whole weight range; `DMSerifDisplay-400` and `InstrumentSerif-400` are static |

Each template's `fonts.ts` points at these files with a relative path
(`../kit/fonts/Epilogue-Variable.woff2`) and gives the same CSS variables
(`--tpl-font-display`, `--tpl-font-body`), `display: "swap"` and a metric-matched
fallback as before.

## Only the `latin` subset

Each file is Google's `latin` subset (basic Latin, Latin-1 including accented
Western European letters, common punctuation, `€`, `£`). That is what the
studio's own fonts do, and it covers the US, Canada and Western Europe the
templates are sold into. Letters from the `latin-ext` set (for example Polish `ł`
or Czech `ř`) and from Greek or Cyrillic fall back to the system font. If a
template ever needs them, add the extra subset (a second `@font-face` with a
`unicode-range`, see `next/font/local`'s `src` array) rather than switching back.

## Adding or refreshing a family

```bash
node scripts/fetch-template-fonts.mjs          # fetch whatever is missing
node scripts/fetch-template-fonts.mjs --force  # refetch everything
```

Add the family and its weights to the `FAMILIES` list at the top of the script
first. It asks Google for exactly what `next/font/google` would have asked for,
downloads into a fresh temporary directory, rejects anything that is not a
woff2 of a sensible size, reads the font's real weight range, and updates
`manifest.json`. Then use the file and the `weight` from the manifest in the
template's `fonts.ts`.

## One rule that is easy to break

`next/font/local` uses the name of the constant a font is assigned to as its CSS
`font-family` name, and every template's CSS is on the page at once (the
registry loads all 24). So the constants must be unique across templates, which
is why they are `interiorDesignerDisplay`, `dentalPracticeBody` and so on, never
a bare `display` or `body`. Two templates with the same constant name would
merge into one font family and one would render in the other's typeface.

Do not add `next/font/google` back anywhere in `src/`.
