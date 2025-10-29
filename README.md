## Mico Roaquin • Portfolio

Welcome to my responsive portfolio site showcasing my personal software projects and creative design work. Built with plain HTML/CSS/JS, enhanced with a couple of lightweight libraries and custom Web Components.

### Features
- **Multi‑page layout**
- **Responsive UI**
- **Interactive sections**
- **Lightweight visuals**

### Project Structure
```
Portfolio/
├─ index.html              # Landing page
├─ projects.html           # Software projects grid with expand/pin
├─ creative.html           # Creative designs
├─ style.css               # Global styles, animations, layout, & components
├─ script.js               # Smooth scroll, section observer, panel pin/unpin
├─ components/
│  ├─ navbar.js           # <custom-navbar> responsive menu Web Component
│  └─ dot-pattern.js      # <dot-pattern> animated canvas background
├─ libs/                  # Local vendor assets
│  ├─ tailwindcss.js      # Utility classes
│  ├─ feather-icons.js    # Icon set used across pages
│  ├─ three.r134.min.js   # Three.js (dependency of Vanta)
│  └─ vanta-dots.js       # Vanta Dots effect
└─ images/
   ├─ sprites/            # Skill icons
   └─ projects/           # Project thumbnails and poster assets
```

### Tech Stack
- **HTML5**, **CSS3**, **JavaScript (ES6)**
- **Feather Icons** for icons
- **Tailwind utility runtime** (local `libs/tailwindcss.js`)
- Optional visuals: **Vanta Dots** (`libs/vanta-dots.js`) and **Three.js**

### Getting Started
- Option 1: Open `index.html` directly in your browser.
- Option 2 (recommended for development): Use a local web server.

Example with VS Code Live Server:
1. Install the “Live Server” extension
2. Right‑click `index.html` → “Open with Live Server”

Or with a quick Python server:
```bash
python -m http.server 8000
# then visit http://localhost:8000
```

### Usage Notes
- The navbar links in `components/navbar.js` point to `index.html` hash sections (`#home`, `#about`, `#work`, `#contact`). They also render a mobile menu on small screens.
- The projects and creative pages use expandable “pinned” panels; click a card to expand, then use the Back button or press Escape to collapse.
- Image modal: click thumbnails inside expanded panels to open the modal; click outside or press Escape to close.

### Credits
- Icons: Feather Icons (`libs/feather-icons.js`)
- Utilities: Tailwind runtime (`libs/tailwindcss.js`)
- Visuals: Vanta Dots (`https://www.vantajs.com`) and Three.js (`https://threejs.org/`)

### 📄 License
This project is provided as‑is. If you plan to open‑source it, add a license (e.g., MIT) here.
