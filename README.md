# Nibble

A private, elegant recipe website by Damien Dufour.

## Deploy to GitHub Pages
1. Create a new GitHub repository (for example `nibble`).
2. Upload all files in this folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. GitHub will provide your public Pages URL.

## Password
The site uses a client-side password gate. Password: `nibble2026!`

**Important:** GitHub Pages is static hosting, so this is a convenience/privacy gate rather than strong security. A determined technical user can inspect the site source and recover or bypass the client-side protection. For true access control, deploy behind a service such as Cloudflare Access, Netlify password protection, or a small authenticated backend.

## Features
- Responsive recipe cards
- Serving-size scaler (2 / 4 / 6 / 8)
- Persistent shopping checklist
- Recipe-specific plating guides
- Printable recipe view
- Session-based lock/unlock
