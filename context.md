# Portfolio Site — Project Context

## Owner
**Karan Kumar** — IIT Madras student, Game Designer & Product Builder.  
Currently: Game Designer @ Convegenius (Feb 2026–Present).  
Email: karankumarofficial66@gmail.com | GitHub: Karan26-web | LinkedIn: karan-kumar-4360a82b4

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19.2.3 (Create React App) |
| Language | JavaScript (no TypeScript) |
| Styling | Bootstrap 5 + custom CSS (`src/styles/futuristic.css`) |
| Layout | React Bootstrap grid (`Container / Row / Col`) |
| Animation | Framer Motion 12.35.1 |
| 3D / WebGL | Three.js 0.184.0 |
| Icons | react-icons 5.6.0, react-bootstrap-icons 1.11.6 |
| Email | @emailjs/browser 4.4.1 |
| Build | react-scripts 5.0.1 |

**No Tailwind, no TypeScript, no Next.js, no shadcn.**  
All components are `.js` / `.jsx` under `src/components/` (flat, no `ui/` subfolder).

---

## Project Structure

```
src/
├── App.js                  # Root — mounts all sections, cursor, glitch overlay
├── App.css                 # Font-face declarations (Centra Bold/Medium/Book)
├── index.js                # React DOM root
├── styles/
│   └── futuristic.css      # ~3300-line master stylesheet (all custom styles)
├── assets/
│   ├── font/               # Centra No2 (Bold, Medium, Book) TTF files
│   └── img/                # header-img.svg (floating astronaut), project images
└── components/
    ├── NavBar.js            # Fixed navbar with orbit-indicator active link tracker
    ├── Banner.js            # Hero section — WebGL waves + starfield + astronaut
    ├── About.js             # Three-pillar about cards
    ├── Experience.js        # Work timeline (Convegenius, Cosmic Sole)
    ├── Projects.js          # Project grid — maps to ProjectCard
    ├── ProjectCard.js       # Individual project card with tilt effect
    ├── Skills.js            # Three-orbit cosmic skill visualiser
    ├── Leadership.js        # Nebula Pioneers / Space Club secretary role
    ├── AISection.js         # AI/ML skills + tools grid
    ├── Contact.js           # Social contact buttons (LinkedIn, GitHub, WhatsApp, Email)
    ├── SectionHeading.js    # Reusable animated section title
    ├── ShootingStars.js     # Fixed global starfield (520 stars) + 18 meteor trails
    ├── CosmicFooter.js      # Parallax footer with blackhole trigger + social links
    ├── Meteor.jsx           # Meteor animation component
    ├── SpaceHorizon.js      # Space horizon visual
    ├── WebGLShader.js       # Three.js rainbow wave shader (hero background)
    └── LiquidGlass.js       # Glass morphism: GlassFilter SVG + GlassLayers + GlassButton
```

---

## Design System

### Color Variables (`futuristic.css :root`)
```css
--bg-1: #0b0f1a   /* deepest background */
--bg-2: #1a1f3a   /* mid background */
--bg-3: #2e1a47   /* accent background */
--text-main: #f4f7ff
--text-soft: #bbcaea
--cyan: #57ecff
--neon-blue: #4f8dff
--purple: #ab70ff
--glass: rgba(22, 28, 56, 0.48)
--glass-border: rgba(143, 190, 255, 0.24)
```

### Body Background
```css
body {
  background:
    radial-gradient(circle at 12% 12%, rgba(87,236,255,0.14), transparent 28%),
    radial-gradient(circle at 85% 14%, rgba(171,112,255,0.2), transparent 34%),
    linear-gradient(140deg, var(--bg-1) 0%, var(--bg-2) 52%, var(--bg-3) 100%);
}
```

### Key CSS Classes
- `.hero-neo` — hero section (min-height: 100vh)
- `.glass-card` — frosted glass card used in About, Contact, etc.
- `.neo-section` — standard section wrapper (padding: 100px 0)
- `.hero-cta` / `.glow-btn` — primary CTA buttons (gradient blue/cyan)
- `.ghost-btn` — secondary outline button (project cards)
- `.neo-social-btn` — 36×36px circular icon buttons in navbar
- `.contact-social-btn` — pill social buttons in contact section
- `.star` / `.starfield` — twinkling star dots
- `.shooting-star` — meteor trail animation
- `.glitch-overlay` — full-screen scanline overlay (activated on blackhole trigger)
- `.moon-cursor` — custom cursor tracking mouse position

### Fonts
- Primary: `Centra No2` (local), fallback `Exo 2` (Google Fonts)
- Display: `Orbitron` (Google Fonts, headings / section labels)

---

## Component Details

### `App.js`
- Tracks mouse position for custom cursor (`moon-cursor`)
- Sets `--scroll-y` CSS var on scroll (used for parallax)
- Renders: `GlassFilter` (SVG, hidden) → `ShootingStars` → `glitch-overlay` → all sections

### `Banner.js` (Hero)
- Background: `#000` with two `WebGLShader` instances (top + bottom waves)
- Extra slim strip `(height: 160px, top: 0)` with a third WebGLShader just below navbar
- 200 twinkling stars with random size/opacity/delay
- Animated `hero-planet` + `hero-planet-ring` (Framer Motion)
- Astronaut image (`header-img.svg`) in right column
- CTA button uses `GlassLayers` for liquid glass effect

### `WebGLShader.js`
- Props: `position` — `"bottom"` (default) or `"top"` (flipped with `scaleY(-1)`)
- Fragment shader: sine-wave chromatic aberration — single white ray splitting to RGB
- Uniforms: `xScale: 0.45`, `yScale: 0.55`, `distortion: 0.06`
- Solid black clear color (`#000000`), full alpha renderer
- Canvas fills 55% height of its container, anchored to the `position` edge

### `LiquidGlass.js`
- `GlassFilter` — hidden SVG with `#glass-distortion` filter (fractal noise + specular + displacement). Must be rendered once in `App.js`.
- `GlassLayers` — three absolutely-positioned `<span>` elements: blur layer, tint layer, inset-glow layer. Drop inside any `position: relative` element.
- `GlassButton` — convenience wrapper that renders an `<a>` or `<button>` with GlassLayers inside.
- Applied to: hero CTA, project ghost buttons, navbar social icons, contact social buttons.

### `ShootingStars.js`
- Renders `position: fixed` so stars/meteors appear on every section while scrolling
- 520 twinkling stars: ~8% are "feature" stars (2.8–4.2px, high glow), rest are small (0.6–2.2px)
- 18 meteor trails with random position, duration (4.5–9s), and delay (0–14s)

### `Skills.js`
Three concentric orbit rings visualised with CSS/Framer Motion:
- Inner: C++, Python, JavaScript, MongoDB
- Mid: Git, Node.js, Express, Flask, Docker, Vue
- Outer: Figma, GitHub, User Research, Design Systems

### `CosmicFooter.js`
- Three parallax star layers (far / bright / footer stars)
- Blackhole trigger button → adds `.blackhole-glitch` to `document.body` → triggers glitch animation
- Social links match Contact section

---

## Content

### Projects (in `Projects.js`)
| Name | Stack | Links |
|---|---|---|
| VillageMela | Game Design, HTML, CSS, JS | GitHub + Live |
| Missing Pages | Game Design, HTML, CSS, JS | GitHub + Live |
| WanderLust | Node.js, Express, MongoDB, Cloudinary, EJS | GitHub + Live |
| QuizForge | Python, Flask, SQLAlchemy, Jinja2, Chart.js | GitHub |
| BDM Capstone | Data preprocessing, SQL analysis | GitHub |
| Lattice Finance Dashboard | React 18, Vite, Tailwind, Recharts, Context API | GitHub + Live |

### Experience
| Role | Company | Period |
|---|---|---|
| Game Designer | Convegenius | Feb 2026 – Present |
| Product Designer | Cosmic Sole | Jan 2025 |

### Leadership
- **Secretary, Nebula Pioneers (Space Club)** — IIT Madras

---

## Patterns & Conventions

- **No TypeScript** — all files are `.js` / `.jsx`
- **No Tailwind** — styles are either Bootstrap classes or custom CSS classes from `futuristic.css`
- **Inline styles** are used only for dynamic values (position, transform, zIndex) or one-off overrides
- **Framer Motion** handles all entrance animations (`initial` → `animate`, `whileInView`)
- **React Bootstrap** (`Container`, `Row`, `Col`) provides the responsive grid
- **Glass effect** is applied by inserting `<GlassLayers />` inside a button/anchor that has `position: relative; background: transparent`
- **Section IDs**: `#home`, `#about`, `#experience`, `#projects`, `#skills`, `#leadership`, `#ai`, `#contact`
- Custom cursor (`moon-cursor`) requires `cursor: none` on `body`

---

## Known Customisations (Added by Claude)

- `WebGLShader.js` — Three.js WebGL wave shader, space-themed chromatic aberration
- `LiquidGlass.js` — SVG filter + glass morphism layers for all buttons
- `ShootingStars.js` — Upgraded from 3 meteors to 520 stars + 18 meteors, fixed/global
- `Banner.js` — Three WebGL canvas instances (top, bottom, navbar-trim), 200 banner stars
- `three` added to `package.json` dependencies
