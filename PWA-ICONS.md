PWA icon instructions

1) Create PNG icons at the project root:
   - `logo-192.png` (192x192)
   - `logo-512.png` (512x512)

   You can convert your existing `logo.jpeg` to PNG using an image editor or an online converter.

2) Place `logo-192.png` and `logo-512.png` in the project root (same folder as `index.html`).

3) Re-deploy or re-upload your project and re-scan in PWABuilder. Confirm the manifest is reachable at:
   - `https://<your-site>/manifest.json`

4) If PWABuilder still reports issues, check the manifest URL in the browser and confirm:
   - HTTP status is 200
   - Response Content-Type is `application/json` (or `application/manifest+json`)
   - The icons `logo-192.png` and `logo-512.png` are reachable (200)

5) If you're uploading a ZIP to PWABuilder, ensure `manifest.json`, `index.html`, `logo-192.png`, and `logo-512.png` are all at the top-level of the ZIP.

If you'd like, I can convert `logo.jpeg` into PNGs and add them now if you give me the image file path or provide the image.
