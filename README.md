# CrystalAowlan.com — starter bundle

## Quick start
1) Create a GitHub repo (recommended name: `crystalaowlan.github.io`) and set **Pages** → Deploy from branch → `main`.
2) Upload all files in this bundle to the repo root.
3) Put your images into the `images/` folder:
   - **suno-banner.png** — your header banner (rename your current banner to this).
   - **copyright-badge.png** — your footer badge.
4) Open `index.html` and replace `YOUTUBE_URL_HERE` and `SUNO_URL_HERE` with your real links.
5) (Optional) In `music.html`, change the YouTube `VIDEO_ID` to one of your videos. Add Suno links.
6) In GitHub Pages → set the **Custom domain** to `crystalaowlan.com`.
7) In Cloudflare DNS → add the records GitHub shows you. Enable HTTPS (it will auto‑issue after DNS propagates).

## Notes
- The design is mobile‑first, accessible (alt text, landmarks), and kept simple for easy edits.
- Update text anywhere by editing the `.html` files in GitHub’s web editor.
- You can add more gallery images by copying the `<img>` lines in `art.html`.