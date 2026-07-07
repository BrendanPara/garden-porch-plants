# Garden Porch Plants

A simple static website for a local plant resale page. It is designed as an onboarding page for buyers coming from Facebook Marketplace.

## Plant identification notes

These IDs are based on the supplied photos and should be treated as practical listing labels, not a formal botanical confirmation.

- Photos 1, 3, 8, and 11 appear to be tropical hibiscus (`Hibiscus rosa-sinensis`).
- Photos 2, 4, 9, and 10 appear to be Arabian jasmine / sambac jasmine (`Jasminum sambac`).
- Photos 5, 6, and 7 appear to be a double-flowered jasmine, likely a double `Jasminum sambac` type such as Grand Duke jasmine.

## Files

- `index.html` - page content and plant inventory cards
- `styles.css` - layout, responsive design, and visual styling
- `script.js` - category filtering for plant cards
- `plant-*.jpg` - stock photos supplied for the current inventory

## Local preview

Open `index.html` in a browser, or run a local static server from this folder.

```powershell
node server.mjs
```

Then open `http://127.0.0.1:4173`.

## Verification

```powershell
node verify.mjs
node verify-http.mjs
```
