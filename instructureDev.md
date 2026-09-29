# instructureDev.md — Maintenance Guide for Qi's Portfolio

**Project name:** `rifqi-portofolio`
**Project version:** `2.0.0`
(Both are defined in `package.json` — see section 16.)

This document is the practical maintenance guide for this portfolio website.
It is written for a beginner developer. Every editable piece of content lives in
**one** central data file, and every image lives in **one** folder.

> Line numbers below were accurate when this document was written. They may shift
> as the project evolves, so always use the **object names / identifiers** as the
> primary way to find things.

---

## 1. Where everything lives

| What | Where |
| --- | --- |
| All portfolio content (text, dates, image names, links) | `src/data/portfolio.ts` |
| All images (profile, certificates, documentation photos) | `public/assets/` |
| Page composition (which sections appear, in which order) | `src/app/page.tsx` |
| Visual building blocks | `src/components/` |
| Global styles and colour tokens | `src/app/globals.css` |

---

## 2. The image folder (IMPORTANT)

There is exactly **ONE** image folder:

```
public/assets/
```

- Put **every** image file directly inside `public/assets/`.
- Do **NOT** create subfolders such as `public/assets/projects/`,
  `public/assets/experience/`, `public/assets/certifications/`, etc.
- Do **NOT** rename the supplied files. The website references them by their
  exact file name (including upper/lower case and extension).

Examples of correct placement:

```
public/assets/QiPhoto.PNG
public/assets/SertiAgentic.png
public/assets/DocOP1.jpg
public/assets/SertiJWD1.png
```

If an image file is missing from `public/assets/`, the website will not break.
It shows a grey tile labelled `Image pending: <filename>` so you can see exactly
which file still needs to be added.

No database is used. The site is fully static / content-driven.

---

## 3. The central data file

Open `src/data/portfolio.ts`. This single file controls all content.

Main exported blocks (with approximate line numbers):

| Export | Line | What it controls |
| --- | --- | --- |
| `YOUTUBE_PLACEHOLDER` | 8 | The placeholder string `paste_youtube_url_here` |
| `navSections` | 27 | Navigation labels and mobile quick-access items |
| `profile` | 38 | Name, role and profile photo file name |
| `aboutParagraphs` | 45 | The About Me text |
| `projects` | 63 | All project timeline entries |
| `experiences` | 164 | All experience entries |
| `educations` | 213 | Education timeline |
| `certificationsIntro` | 245 | Certifications section intro sentence |
| `certifications` | 248 | The three BNSP certifications |
| `softSkills` | 275 | Soft skill pills |
| `hardSkills` | 292 | Hard skill badges |
| `contacts` | 309 | WhatsApp / Instagram / LinkedIn / Website links |
| `qiAi` | 340 | The Qi AI "COMING SOON" text |
| `footerText` | 347 | Footer copyright line |

---

## 4. How to change each kind of content

### 4.1 Profile photo

1. Place the new file in `public/assets/`.
2. Open `src/data/portfolio.ts`, find `export const profile` (line ~38).
3. Change `photo: "QiPhoto.PNG"` to your new file name.
4. Update `photoAlt` to describe the new photo.

### 4.2 A project certificate image

1. Put the certificate file in `public/assets/`.
2. In `src/data/portfolio.ts` find the `projects` array (line ~63).
3. Find the object with the matching `id` (see the table in section 6).
4. Change its `certificate.file` value to the new file name.
5. If the shape changed, update `certificate.aspect` to `"7:5"` or `"16:9"`.

### 4.3 Project gallery images

1. Put the photo files in `public/assets/`.
2. In the matching project object, edit the `images: [ ... ]` array.
3. List file names in the order you want them displayed.

### 4.4 Experience certificate / gallery images

Same as 4.2 and 4.3, but inside the `experiences` array (line ~164).
Note: the first experience (`id: "teras-inspirasi")` intentionally has
`certificate: null`. Keep it `null` — no certificate exists for it.

### 4.5 Certification images

1. Put both document images in `public/assets/`.
2. In `certifications` (line ~248), find the matching `id`.
3. Edit its `images: ["file1.png", "file2.png"]` tuple (exactly two images).

---

## 5. Adding or removing a gallery image

To **add** a photo to a gallery: append the file name to that entry's `images`
array, e.g.

```ts
images: ["DocOP1.jpg", "DocOP2.jpg", "DocOP3.jpg", "DocOP4.jpg", "DocOP5.jpg"],
```

To **remove** a photo: delete its name from the array.

- If you remove all images, leave the array empty: `images: []`.
  The website then shows the "No document available" block automatically.
- You never need to touch any component when adding/removing images.

---

## 6. Which object is which project / experience

### Projects (`projects` array)

| `id` | Title | Line |
| --- | --- | --- |
| `ai-agents-developer` | AI Agents Developer | 65 |
| `pemateri-operator-multimedia` | Pemateri/Narasumber Pelatihan Operator Multimedia | 76 |
| `digital-video-editor-dcc` | Digital Video Editor – Digital Creative Center | 86 |
| `crew-hima-bahasa-inggris` | Crew Operator Multimedia – Himpunan Mahasiswa Bahasa Inggris UBSI | 97 |
| `crew-himama-fair` | Crew Operator Multimedia & Video Editor – Himpunan Mahasiswa Manajemen UBSI | 108 |
| `crew-kspm` | Crew Operator Multimedia – Kelompok Studi Pasar Modal UBSI | 118 |
| `crew-teras-inspirasi-dbj` | Crew Operator Multimedia – Teras Inspirasi X Distrik Berisik Jakarta | 128 |
| `revitalisasi-masjid-kramat-98` | Revitalisasi Masjid UBSI Kramat 98 | 139 |

### Experiences (`experiences` array)

| `id` | Title | Line |
| --- | --- | --- |
| `teras-inspirasi` | Crew Operator Multimedia – Teras Inspirasi | 166 |
| `guru-tik-smpn97` | Guru TIK – SMP Negeri 97 Jakarta | 177 |
| `guru-trauma-healing` | Guru Trauma Healing – SDN Talaga 1 Cianjur | 187 |

---

## 7. YouTube videos

The website never stores or plays MP4 files. It only embeds YouTube players.

### 7.1 The placeholder

Every entry that has a video currently contains:

```ts
youtubeUrl: "paste_youtube_url_here",
```

While the placeholder is present, the video block shows a clean development
notice ("Video not connected yet") instead of a broken player. This is expected
and intentional.

### 7.2 How to replace a placeholder

Example — connecting the video for **AI Agents Developer**:

1. Open `src/data/portfolio.ts`.
2. Find the object with `id: "ai-agents-developer"` (line ~65).
3. Replace `youtubeUrl: "paste_youtube_url_here"` with the real URL, e.g.
   `youtubeUrl: "https://www.youtube.com/watch?v=XXXXXXXXXXX"`.
4. Save the file.
5. Run the project again and confirm the embedded player appears.

Accepted URL formats: `watch?v=`, `youtu.be/`, `/shorts/`, `/embed/`, or the bare
11-character video id. Vertical (portrait) videos keep a 9:16 frame; horizontal
videos use 16:9. Set `videoOrientation: "vertical"` or `"horizontal"` to match.

### 7.3 Where placeholders appear

Search the file for `paste_youtube_url_here` (or the constant
`YOUTUBE_PLACEHOLDER` on line 8). Occurrences:

- Projects: `ai-agents-developer`, `pemateri-operator-multimedia`,
  `digital-video-editor-dcc`, `crew-himama-fair`, `crew-kspm`
- Experiences: `teras-inspirasi`, `guru-tik-smpn97`, `guru-trauma-healing`

Entries with `youtubeUrl: null` have **no** video on purpose and show the
"No video available" block. Do not add a placeholder to them unless a video
actually exists.

---

## 8. Updating certification information

In `certifications` (line ~248) each object has:

- `title` — certification name
- `issued` — issue date text
- `expired` — expiry date text
- `expiredState` — `true` shows the red **EXPIRED** stamp and badge
- `images` — the two document images

If a certification expires later, set `expiredState: true`. The certification
stays visible but is clearly marked as expired.

---

## 9. Updating contact links

In `contacts` (line ~309):

- **WhatsApp** uses a click-to-chat URL built from the phone number:
  `https://wa.me/62` + the number without its leading `0`.
  For `089668500021` the URL is `https://wa.me/6289668500021`.
- Instagram / LinkedIn / Website are plain `https://` URLs.

All four open in a new tab with `rel="noopener noreferrer"`.

---

## 10. The Qi AI "COMING SOON" section

The section is a **visual placeholder only**. It contains no input, no button,
no API call and no chatbot logic, on purpose.

- Text is edited in `qiAi` (line ~340): `title`, `status`, `description`.
- The visual is `src/components/ComingSoonAI.tsx`.

When the real AI feature is built later, replace the internals of
`ComingSoonAI.tsx` (and wire it to your backend). Until then, do not add
interactive controls to this section.

---

## 11. Navigation and sections

- Section order and ids are rendered in `src/app/page.tsx`.
- Navigation labels and the mobile quick-access selection are in `navSections`
  (line ~27). `mobileQuickAccess: true` puts an item in the mobile top row;
  `false` puts it in the hamburger menu.
- Clicking a nav item smooth-scrolls to the matching section id
  (`about`, `projects`, `experience`, `educations`, `certifications`, `skills`,
  `contact`, `qi-ai`).

---

## 12. Run the project locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install     # first time only
npm run dev     # start development server
```

Then open http://localhost:3000.

---

## 13. Build the project

```bash
npm run build   # production build into .next/
npm run start   # serve the production build locally
```

The build must complete without errors before deploying.

---

## 14. Deploy to Vercel or Netlify

The project needs no structural changes for either platform.

**Vercel (recommended):**
1. Push this folder to a Git repository.
2. In Vercel, "Add New Project" and import the repository.
3. Vercel auto-detects Next.js. Keep the defaults
   (build command `npm run build`, output handled automatically).
4. Deploy.

**Netlify:**
1. Push this folder to a Git repository.
2. In Netlify, "Add new site" → "Import an existing project".
3. Use Netlify's Next.js integration with build command `npm run build`.
4. Deploy.

Remember: after deploying, add your image files to `public/assets/` in the
repository (or commit them before pushing) so they are included in the build.

---

## 15. Quick reference — common tasks

| Task | File | Identifier |
| --- | --- | --- |
| Change About text | `src/data/portfolio.ts` | `aboutParagraphs` |
| Change a project title/date | `src/data/portfolio.ts` | `projects` → matching `id` |
| Add a documentation photo | `public/assets/` + `portfolio.ts` | entry `images` array |
| Connect a YouTube video | `src/data/portfolio.ts` | entry `youtubeUrl` |
| Mark a certification expired | `src/data/portfolio.ts` | `expiredState` |
| Change a contact link | `src/data/portfolio.ts` | `contacts` |
| Change colours | `src/app/globals.css` | `@theme` block |
| Change footer text | `src/data/portfolio.ts` | `footerText` |
| Change navbar logo | `public/assets/` + `portfolio.ts` | `profile.logo` |
| Change a skill icon/logo | `src/data/portfolio.ts` | `softSkills` / `hardSkills` |

---

## 16. Project name and version

The project identity is defined in `package.json` at the repository root:

```json
{
  "name": "rifqi-portofolio",
  "version": "1.0.0"
}
```

- Change only these two fields to rename/re-version the project.
- Do **not** change the versions of `next`, `react`, `tailwindcss`, etc. unless
  you intentionally want a framework upgrade.

---

## 17. Image lightbox / gallery viewer (v2.0.0)

### How it works

- One shared, **generic** gallery viewer is mounted once, in
  `src/app/layout.tsx`, via `<LightboxProvider>`
  (component: `src/components/LightboxProvider.tsx`).
- The reusable image model lives in `src/lib/lightbox.ts`:
  `{ src, alt, type }` where `type` is `"photo" | "certificate" | "document"`.
  Collections are built with the `toLightboxItems()` helper, so projects,
  experiences and certifications all use the **same** viewer — there is no
  per-section lightbox logic.
- Any image rendered with `<AssetImage gallery={...} galleryIndex={n} />`
  becomes a button. Clicking it opens the viewer at that image, centered over
  a dimmed, blurred backdrop, with a scale/opacity/blur "materialize" entrance.
- **Previous / next:** collections with 2+ images show circular prev/next
  controls plus a `n / total` counter, and respond to `←` / `→` arrow keys.
  Single-image collections (e.g. a project certificate) show **no** arrows.
  Navigating swaps the media inside the open viewer — the modal is not
  recreated and never needs to be closed to see the next image.
- **Swipe (touch):** drag the image left/right to move between images.
  A ~56px threshold (hysteresis) prevents accidental navigation, and dragging
  past the first/last image rubber-bands back instead of navigating.
- Closing: click the darkened area **outside** the image, or press **ESC**.
  Clicking the image itself does **not** close it. There is no "X" button.
- While open, background scrolling is locked; the previous scroll position is
  restored on close. Keyboard focus returns to the thumbnail that opened it.
- **Missing files never produce a blank lightbox.** If a source 404s, the
  viewer shows a controlled "This image is currently unavailable" tile with
  the expected path, and the rest of the page keeps working.

### Which images open the viewer

| Image type | Component | Collection size |
| --- | --- | --- |
| Project documentation photos | `PhotoGallery.tsx` | all photos of that project |
| Experience documentation photos | `PhotoGallery.tsx` | all photos of that experience |
| Project / experience certificates | `ProjectCertificate.tsx` | 1 (no arrows) |
| Certification documents | `CertificationAccordion.tsx` | 2 (arrows shown) |
| Profile photo (decorative portrait) | `AboutSection.tsx` | not zoomable |
| Navbar logo | `Navbar.tsx` | not zoomable |

To make another image open the viewer, pass `gallery` + `galleryIndex` to its
`<AssetImage>`. Images that failed to load ("Image pending" tiles) are never
clickable.

### Certificate lightbox troubleshooting

If a certificate opens but shows the "unavailable" tile:

1. Confirm the file name in `src/data/portfolio.ts`
   (`certificate.file`, or `certifications[].images`) matches the file in
   `public/assets/` **exactly**, including upper/lower case and extension.
2. Confirm the file actually exists in `public/assets/` (no subfolders).
3. Reload the page — a file added while the page was open is not picked up
   until reload, because a failed load is remembered for that page session.
4. The viewer itself is shared, so if photos work but certificates do not, the
   cause is almost always a path/name mismatch, not the viewer.

---

## 18. Navbar logo (Logo_Qi.png)

- The logo file must live in the single assets folder:
  `public/assets/Logo_Qi.png`
- The reference is in `src/data/portfolio.ts` → `profile.logo` (used by
  `src/components/Navbar.tsx`).
- The text next to the logo is `profile.name` ("Muhammad Rifqi Asy'ari").
- The logo is rendered inside a fixed circular frame with `object-contain`,
  so it is never stretched or distorted.
- If `Logo_Qi.png` is missing, the frame simply stays empty (no substitute
  image is shown). Drop the real file into `public/assets/` to activate it.

**To change the logo later:** replace the file at the same path, or point
`profile.logo` at a different file name inside `public/assets/`.

---

## 19. Skill graphics and logos

Both lists live in `src/data/portfolio.ts`.

### Soft skills (`softSkills`)

Each entry is `{ name, icon }`. The `icon` key maps to a lucide icon inside
`src/components/SkillBadge.tsx` (`ICONS` map):

| `icon` key | Meaning | lucide icon |
| --- | --- | --- |
| `communication` | speech / communication | `MessagesSquare` |
| `leadership` | people / direction | `Users` |
| `analysis` | chart / data | `ChartColumn` |
| `creative` | idea / lightbulb | `Lightbulb` |
| `reflection` | review / growth | `RefreshCcw` |

To change a graphic, change the `icon` key in the data and, if needed, add a
new key + lucide icon to the `ICONS` map.

### Hard skills (`hardSkills`) — developer-supplied logos (v2.0.0)

Each entry is `{ name, logo, monogram }`.

- `logo` is an explicit file name that **you** place in the single assets
  folder `public/assets/`. No icon library or internet search is used.
  Required files:

  | Skill | File |
  | --- | --- |
  | Python | `logoPython.png` |
  | Visual Studio Code | `logoVSCode.png` |
  | Adobe Premiere Pro | `logoPR.png` |
  | Adobe After Effects | `logoAE.png` |
  | Open Broadcaster Software | `logoOBS.png` |
  | vMix | `logovMix.png` |

- Logos are normalized into a fixed tile with `object-contain`, so aspect
  ratio is preserved and no logo visually dominates because of its source
  dimensions. Source files are never modified.
- While a logo file is absent, a plain text monogram (`monogram`) is shown in
  the same tile — never a substitute or random graphic.
- Rendered by `src/components/SkillLogo.tsx`. To change a logo, replace the
  file at the same path or edit the `logo` value in `portfolio.ts`.

---

## 20. Mobile navigation and section IDs

### How it connects

- All sections and their ids are listed in `navSections`
  (`src/data/portfolio.ts`): `about`, `projects`, `experience`, `educations`,
  `certifications`, `skills`, `contact`, `qi-ai`.
- The same ids are used as `<section id="...">` in `src/app/page.tsx`.
  A nav link `#id` only works if a section with that exact id exists.
- Desktop links and the mobile quick-access row use normal anchor links plus
  CSS smooth scrolling (`html { scroll-behavior: smooth }` in
  `src/app/globals.css`).
- The hamburger panel (`src/components/MobileMenu.tsx`) lists **only the
  sections that are not already in the mobile quick-access row** — no item is
  ever duplicated. Together the row (`mobileQuickAccess: true`) and the panel
  cover all eight sections. Because closing the panel unmounts the clicked
  link, the component scrolls explicitly with `scrollIntoView` inside
  `handleNavigate` instead of relying on the browser's default anchor jump.

### Troubleshooting

- **A menu item does not scroll:** confirm the section id exists in
  `src/app/page.tsx` and matches the `navSections` entry exactly.
- **Menu does not close after tapping:** the close happens in
  `handleNavigate`; make sure new links use it (not a bare `onClick`).
- **Menu hidden on desktop / visible on desktop:** the panel and hamburger are
  `lg:hidden`; the desktop bar is `hidden lg:block`. Adjust the `lg` breakpoint
  in one place only if you change it.
- **Menu off-screen:** the panel is `absolute right-0 w-56` inside the header
  padding; keep `right-0` and a modest width.
- **Scroll lands under the navbar:** each section has `scroll-margin-top`
  (see `section[id]` in `src/app/globals.css`). Increase it if the navbar grows.
