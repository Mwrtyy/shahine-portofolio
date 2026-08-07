# SHAHINE — Interactive Video Editor Portfolio

A production-oriented frontend portfolio built around an interactive premium smartphone. The phone is a real procedural 3D object and its screen is a real React interface — not a static texture.

## Stack

- React 19 + Vite
- Three.js through `@react-three/fiber`
- `@react-three/drei` for production-ready R3F helpers (`Html`, `RoundedBox`, adaptive DPR)
- Native CSS + SVG displacement/backdrop refraction with a blur fallback
- No external 3D model, no stock imagery, no fake clients or awards

## Run

```bash
npm install
npm run dev
npm run build
```

## Add Shahine's real work

Edit `src/data/projects.js` and replace each placeholder with real metadata.

Put optimized assets in `public/work/` and point each project at them, for example:

```js
{
  id: 'project-name',
  title: 'PROJECT NAME',
  category: 'TIKTOK / REEL',
  year: '2026',
  summary: 'Short factual description.',
  role: 'EDIT / PACING / FX',
  video: '/work/project-name.mp4',
  poster: '/work/project-name.webp',
  tone: 'graphite',
}
```

Recommended delivery: H.264 MP4 or WebM, 9:16, compressed for web; lightweight WebP/AVIF poster. The video component lazy-attaches video URLs near the viewport and pauses previews when offscreen.

## Add real contact details

Replace the disabled placeholders in `src/components/PhoneUI.jsx`. Do not publish fabricated handles or email addresses.

## Performance / accessibility decisions

- DPR is capped and lower on small screens.
- Expensive 3D glass accent is removed on small screens and for reduced-motion users.
- No secondary animation library or smooth-scroll hijacker.
- Native scroll remains predictable.
- `prefers-reduced-motion` is respected.
- Functional navigation is standard DOM inside the 3D screen.
- Video previews are not all autoplayed simultaneously.

## Open-source research / attribution

The implementation was researched before construction rather than approximating complex systems blindly:

- `pmndrs/react-three-fiber` — MIT. Declarative Three.js renderer.
- `pmndrs/drei` — MIT. Production-ready helpers used directly.
- `shuding/liquid-glass` — MIT. The project informed the use of SVG displacement in `backdrop-filter`. This repository uses an original, smaller filter configuration and does not vendor the source file.

See `NOTICE.md` for links and license notes.

## Important browser note

SVG filters inside `backdrop-filter` are strongest in Chromium-based browsers. Other browsers receive a layered blur/specular glass fallback. The 3D optical glass material remains WebGL-based across modern browsers.
