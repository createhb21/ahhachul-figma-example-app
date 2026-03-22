## Routing + Code Splitting TODO (2026-03-22)

## This Run
- [x] Inspect the current single-file screen structure and identify routing candidates
- [x] Add top-level route structure for home, subway, community, lost, my, and search
- [x] Route home search triggers to a dedicated search page
- [x] Make the my page reachable as a real route with the bottom tab shell
- [x] Introduce lazy-loaded route wrappers and verify chunk output
- [x] Smoke-test broken page flows in a browser
- [x] Record review notes and lessons from this routing refactor

## Review
- Added `HashRouter`-based top-level routes for `/`, `/subway`, `/community`, `/lost`, `/my`, and `/search`, with a shared mobile shell and bottom tab links for the main tabs.
- Replaced the old home-local search toggle with real navigation to `/search`, and kept search state in the URL query string so direct hash entry like `#/search?q=강남역` works.
- `npm run build` now emits multiple route chunks (`HomeRoute`, `SubwayRoute`, `CommunityRoute`, `LostRoute`, `MyRoute`, `SearchRoute`) in addition to the shared `MusinsaStyleApp` bundle.
- Playwright verified these browser flows on 2026-03-22 with console errors at 0: home render, home search bar to `#/search`, direct `#/search?q=강남역`, direct `#/my`, and bottom nav transition from `#/my` to `#/subway`.

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
