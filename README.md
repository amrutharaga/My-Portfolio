# Amrutha Raga Kankipati — Portfolio

Personal portfolio site for **Amrutha Raga Kankipati**, Physical Therapist and
MS Kinesiology candidate (Kansas City, MO).

Built with **React 18**, **Vite**, **Tailwind CSS v4**, **Three.js**
(via react-three-fiber + drei) and **Framer Motion**.

Live: <https://amrutharaga.github.io/My-Portfolio/>

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # production build into dist/
npm run preview  # serve the production build locally
npm run deploy   # manual one-off publish to the gh-pages branch
```

## Deploying to GitHub Pages

The repo ships with a GitHub Actions workflow at
`.github/workflows/deploy.yml`. **Every push to `main` builds and publishes the
site automatically.**

One-time setup on GitHub:

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main`. The site appears at
   `https://amrutharaga.github.io/My-Portfolio/` in a minute or two.

### Manual alternative

If you would rather not use Actions, `npm run deploy` builds the site and pushes
`dist/` to a `gh-pages` branch. In that case set **Settings → Pages → Source** to
**Deploy from a branch → `gh-pages` / root**.

### If you rename the repo

The site is served from a subpath, so the base URL must match the repo name.
Update both:

- `vite.config.js` → `const BASE = '/<new-repo-name>/'`
- `package.json` → `"homepage"`

For a user site (a repo named `amrutharaga.github.io`), set `BASE` to `'/'`.

## Editing the content

All copy — summary, skills, jobs, education, contact details — lives in a single
file: [`src/data/content.js`](src/data/content.js). Edit it and the whole site
updates; no component changes required.

To swap the résumé download, replace
`public/Amrutha-Raga-Kankipati-Resume.pdf` and update `profile.resumeFile` in
`src/data/content.js`.

## Structure

```
src/
  App.jsx               page composition
  data/content.js       all site copy
  hooks/                prefers-reduced-motion
  components/
    Scene3D.jsx         Three.js hero scene (lazy-loaded)
    Nav.jsx  Hero.jsx  About.jsx  Skills.jsx
    Experience.jsx  Education.jsx  Contact.jsx  Footer.jsx
    Section.jsx         shared section shell + scroll reveals
```

The 3D scene is code-split out of the initial bundle and fully respects
`prefers-reduced-motion`.
