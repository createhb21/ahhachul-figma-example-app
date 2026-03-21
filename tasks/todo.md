## Ahhachul Figma Example App TODO (2026-03-22)

## This Run
- [x] Clone the empty remote repository and inspect its initial state
- [x] Bring over the packaged Vite app files needed for a clean repo
- [x] Normalize repo metadata and docs for this repository
- [x] Install dependencies and verify `npm run build` in the cloned repo
- [x] Smoke-test the rendered app from the cloned repo
- [x] Record review notes and lessons from this repo bootstrap run

## Review
- `npm install` completed successfully with 0 vulnerabilities on 2026-03-22.
- `npm run build` passed on 2026-03-22 in the cloned repository; Vite emitted a large-chunk warning because the app is still one large JSX bundle, but production output was generated successfully.
- `npm run preview -- --host 127.0.0.1 --port 4173` served the built app, and Playwright verified the home screen rendered, console errors were absent, and the bottom `지하철` tab transitioned correctly.
