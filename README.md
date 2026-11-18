# H M Vishwas — Portfolio

Vite + React + TypeScript portfolio for H M Vishwas.

**Software Developer | AI/ML Enthusiast | Cybersecurity & DevSecOps Engineer**

## Sections

1. Home · 2. About · 3. Experience · 4. Education · 5. Skills ·
6. Featured Projects · 7. Recent Projects · 8. All Projects (with filters) · 9. Contact

## Editing content

All content (projects, GitHub / live links, skills, experience, education) lives in
[`src/data.ts`](src/data.ts). Project images are in `src/assets/projects/`.

- Add a live link to any project with the `live: "https://…"` field — it appears under the project automatically.
- Replace an image by overwriting the matching file in `src/assets/projects/` (keep the same file name).
- GitHub repo URLs are built from the repo name in `gh("repo-name")` — fix any that differ from your real repo names.

## 3D tilt

Project images tilt in 3D under the cursor (`TiltImage` in `src/main.tsx`, styles under
"3D TILT" in `src/styles.css`). It is used only on project images, and is automatically
disabled on touch devices and for users with *reduce motion* enabled.

## Run

```bash
npm install
npm run dev
```

Production build (output in `dist/`, uses a relative base so it works on any host):

```bash
npm run build
npm run preview
```
