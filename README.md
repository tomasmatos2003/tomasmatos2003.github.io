# tmato.es

Personal portfolio — static site (HTML/CSS/JS), no build step.
Palette from [pengrey.com](https://pengrey.com/about/), layout from [g0ncal0mf.com](https://g0ncal0mf.com/).

```
.
├── index.html
├── CNAME                 # custom domain (tmato.es)
├── .nojekyll             # tell Pages not to run Jekyll
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/tomatothink.gif   # you add this (see below)
```

## 1. Fill in your details

Search the project for `CHANGE_ME` and replace every match:

- GitHub / LinkedIn / email links (hero, contact, projects)
- Bachelor's degree name + dates (Education section)
- Add more certificates / projects / experience by duplicating a `<article class="card">…</article>` block

## 2. The GIF

The hero already works with **zero setup** — if `assets/img/tomatothink.gif`
is missing, the page automatically falls back to the live Klipy GIF.

To self-host it instead (recommended — no dependency on Klipy staying up):

```bash
curl -L -o assets/img/tomatothink.gif \
  "https://static2.klipy.com/ii/8ce8357c78ea940b9c2015daf05ce1a5/c0/5c/dnxlCw7W.gif"
```

Commit that file and the local copy is used automatically.

## 3. Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "portfolio"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Build and deployment**
→ Source: **Deploy from a branch** → Branch: **main** / **/(root)** → Save.

## 4. Point tmato.es at it

The `CNAME` file already contains `tmato.es`. At your domain registrar, add
these DNS records for the apex domain:

| Type  | Name | Value                     |
|-------|------|---------------------------|
| A     | @    | 185.199.108.153           |
| A     | @    | 185.199.109.153           |
| A     | @    | 185.199.110.153           |
| A     | @    | 185.199.111.153           |
| CNAME | www  | `<you>.github.io.`        |

Then in **Settings → Pages → Custom domain**, enter `tmato.es`, save, and
tick **Enforce HTTPS** once the certificate is issued (can take a few minutes).

> DNS/IPs above are GitHub's published Pages addresses — verify them against
> the current GitHub Pages docs when you set this up, in case they've changed.