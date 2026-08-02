# Gymsick — Brand & UI Design System

## 1. Brand Identity & Creative Direction

### Visual Vibe
* **Core Keywords:** Raw, High-Voltage, Industrial, Authentic, Street-Athletic, Premium Dark-Mode.
* **Design Ethos:** Stark, high-contrast streetwear aesthetic applied to fitness. Generous dark space layered with gritty athletic photography, punchy neon-lime accents, and ultra-wide futuristic display typography.
* **Tone of Voice:** Direct, intense, bold, and authoritative.

---

## 2. Color System

The color palette relies on a pitch-black canvas to maximize the contrast of pure white text and high-intensity neon lime.

| Token | Hex | Usage |
| :--- | :--- | :--- |
| `color-bg-base` | `#0A0A0A` | Primary full-screen canvas and backgrounds |
| `color-bg-surface` | `#141414` | Cards, elevated containers, and UI panels |
| `color-bg-elevated` | `#1F1F1F` | Hover states, modals, and input fields |
| `color-accent-lime` | `#DDFB00` | High-priority CTAs, primary headlines, left-border accents |
| `color-text-primary` | `#FFFFFF` | Core headings and high-contrast labels |
| `color-text-secondary`| `#A0A0A0` | Subtitles, descriptive copy, and body text |
| `color-text-muted` | `#666666` | Disabled states, subtle borders, metadata |

### CSS Variables
```css
:root {
  --bg-base: #0A0A0A;
  --bg-surface: #141414;
  --bg-elevated: #1F1F1F;
  --accent-lime: #DDFB00;
  --text-primary: #FFFFFF;
  --text-secondary: #A0A0A0;
  --text-muted: #666666;
}
```

---

## 3. Typography System

### Font Pairings
* **Display / Headings:** Ultra-wide, geometric, heavy-weight sans-serif (e.g., *Druk Wide*, *Extended Geometric Sans*, or *Orbitron*).
* **Subtitles & Tags:** Clean, industrial uppercase sans-serif with wide tracking (e.g., *Oswald* or *Montserrat*).
* **Body / UI:** Legible, neutral modern sans-serif (e.g., *Inter*, *DM Sans*, or *Roboto*).

### Hierarchy & Rules
* **Hero Title (`H1`):** All-caps, ultra-wide letter spacing (`0.05em`), `font-weight: 900`. Use alternating **Neon Lime** and **White** on separate lines for maximum visual impact.
* **Section Header (`H2`):** All-caps, `font-weight: 800`, `letter-spacing: 0.04em`, pure white.
* **Tagline / Subheader (`H3`):** All-caps, `font-weight: 600`, `letter-spacing: 0.15em`, secondary gray (`#A0A0A0`).
* **Body Copy (`p`):** Standard line-height (`1.6`), `font-weight: 400`, neutral secondary text color.

---

## 4. UI Components & Layout

### Buttons & Call-to-Actions (CTAs)
* **Shape:** Sharp `0px` border-radius corners for an industrial, aggressive look.
* **Primary Button (Accent Bar Style):**
  * Background: Dark Surface (`#141414`)
  * Left Border Accent: `4px solid #DDFB00`
  * Text: All-caps, `font-weight: 700`, `letter-spacing: 0.1em`, Pure White (`#FFFFFF`)
  * Hover State: Solid background switch to `#DDFB00` with dark text (`#0A0A0A`).

```css
.btn-primary {
  background-color: var(--bg-surface);
  border: none;
  border-left: 4px solid var(--accent-lime);
  color: var(--text-primary);
  padding: 16px 32px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--accent-lime);
  color: var(--bg-base);
}
```

### Photography & Graphic Layering
* **Image Treatment:** Dark, moody, high-contrast photography (e.g., chalked hands, iron barbells, dramatic studio shadows).
* **Background Integration:** Blend imagery into the `#0A0A0A` canvas using radial or linear dark gradient overlays (`rgba(10, 10, 10, 0.8)` to `rgba(10, 10, 10, 0.2)`).
* **Watermark Background Typography:** Place giant, low-opacity (`3% - 5%`) brand text behind foreground elements for depth.

---

## 5. Motion & Micro-Interactions System

The animation language is snappy, high-contrast, and responsive. Transitions avoid sluggish easing in favor of punchy, immediate motion that feels athletic and sharp.

### A. Easing & Timing Tokens
* **Standard Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (Quick acceleration with a smooth, snappy deceleration).
* **Speed Fast:** `150ms` (Buttons, toggles, borders).
* **Speed Medium:** `300ms` (Cards, image zooms, modal popups).
* **Speed Slow:** `600ms` (Page-load reveals, scroll-triggered text animations).

---

### B. Button Click & Hover Animations

#### 1. Neon Accent Bar Slide (`.btn-primary`)
* **Hover State:** The `4px` neon-lime left border expands rapidly to fill the entire background of the button, while the text color transitions from white to pitch-black.
* **Active / Click State (`:active`):** The button physically compresses by `2px` downward (`translateY(2px)`) to mimic a heavy mechanical click.

```css
.btn-primary {
  background-color: var(--bg-surface);
  border: none;
  border-left: 4px solid var(--accent-lime);
  color: var(--text-primary);
  padding: 16px 32px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  overflow: hidden;
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

/* Fill background with lime on hover */
.btn-primary:hover {
  background-color: var(--accent-lime);
  color: var(--bg-base);
  box-shadow: 0 0 15px rgba(221, 251, 0, 0.25); /* Subtle high-voltage glow */
}

/* Mechanical press-down effect on click */
.btn-primary:active {
  transform: translateY(2px) scale(0.99);
  box-shadow: none;
}
```

---

### C. Card & Imagery Micro-Interactions

#### 1. Athletic Card Hover (Blog, Class, & Trainer Cards)
* **Hover State:** When hovering over a card container, the background image undergoes a **subtle slow zoom** (`scale(1.05)`), while the typography lifts slightly (`translateY(-4px)`).
* **Border Accent:** A top or bottom `2px` neon-lime accent line fades in from `opacity: 0` to `opacity: 1`.

```css
.card-container {
  background: var(--bg-surface);
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border-bottom: 2px solid transparent;
}

.card-container:hover {
  border-bottom-color: var(--accent-lime);
  transform: translateY(-4px);
}

.card-container .card-image {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.card-container:hover .card-image {
  transform: scale(1.05);
}
```

---

### D. Scroll & Entrance Animations
* **Text Reveal:** Large headlines animate upward (`translateY(20px)` to `0px`) while fading from `opacity: 0` to `1` over `500ms` as they enter the viewport.
* **Staggered Lists:** Features, pricing cards, or blog feeds reveal sequentially with a `100ms` stagger delay between items.

---

## 6. AI Prompt for UI / Page Generation

Use the prompt below when generating UI components, landing page layouts, or marketing visuals in AI tools (e.g., v0, Midjourney, Claude Code, or Figma AI):

```text
Create a bold, high-contrast dark-mode landing page interface for a modern gym and fitness brand in an industrial streetwear aesthetic. 

- Backgrounds must use deep charcoal and pitch-black (#0A0A0A to #141414) with subtle high-contrast athletic photography layered underneath using dark gradient overlays.
- Use an electric neon-lime accent color (#DDFB00) sparingly for primary CTA accents, keyword highlights, and decorative left-hand button borders.
- Typography must feature an ultra-wide, blocky, heavy-weight geometric display font in ALL CAPS for main headlines, alternating between bright neon-lime and white across lines. Subheadings should be uppercase with wide letter tracking.
- Buttons should have sharp 0px border-radius edges, dark surface backgrounds, bold uppercase labels, and a thick neon-lime left border accent. Include snappy hover states where the accent color expands to fill the background.
- Overall vibe: Energetic, authentic, rugged, modern, and high-voltage.
```
