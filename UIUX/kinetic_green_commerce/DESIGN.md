---
name: Kinetic Green Commerce
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#3d4946'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#6d7a77'
  outline-variant: '#bdc9c5'
  surface-tint: '#006b5f'
  primary: '#00685d'
  on-primary: '#ffffff'
  primary-container: '#008376'
  on-primary-container: '#f4fffb'
  inverse-primary: '#72d8c8'
  secondary: '#555f6f'
  on-secondary: '#ffffff'
  secondary-container: '#d6e0f3'
  on-secondary-container: '#596373'
  tertiary: '#4648d4'
  on-tertiary: '#ffffff'
  tertiary-container: '#6063ee'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#8ff4e3'
  primary-fixed-dim: '#72d8c8'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005047'
  secondary-fixed: '#d9e3f6'
  secondary-fixed-dim: '#bdc7d9'
  on-secondary-fixed: '#121c2a'
  on-secondary-fixed-variant: '#3d4756'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Sora
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Sora
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-margin-mobile: 16px
  container-margin-desktop: 40px
  gutter: 16px
  stack-sm: 4px
  stack-md: 12px
  stack-lg: 24px
  section-gap: 48px
---

## Brand & Style

This design system is engineered for a "WhatsApp-first" commerce experience, blending the immediacy of chat with the polish of a high-end SaaS platform. The brand personality is **Modern, Friendly, and Trustworthy**, prioritizing a lightweight feel that doesn't overwhelm the user during mobile-speed browsing.

The visual style follows a **Modern Minimalist** approach with subtle **Glassmorphism** for navigational elements. It emphasizes:
- **High-Image Focus:** UI elements recede to let product photography lead.
- **Airy Whitespace:** Generous breathing room to reduce cognitive load in high-intent shopping moments.
- **Softness:** Large corner radii and smooth transitions to create an approachable, non-intimidating atmosphere.
- **Thumb-Driven UX:** Interaction patterns optimized for bottom-of-screen reachability.

## Colors

The palette is anchored by a **Vibrant Green** (`primary`), a sophisticated evolution of chat aesthetics that signals both familiarity and premium service. 

- **Primary:** Used for high-priority actions like "Add to Inquiry" or "Chat on WhatsApp."
- **Secondary (Deep Charcoal):** Provides professional weight for headings and text, ensuring high legibility.
- **Tertiary (Indigo):** Used sparingly for secondary call-to-actions or analytics highlights to differentiate SaaS features from commerce features.
- **Backgrounds:** Utilizes pure white (#FFFFFF) for cards and a very light neutral (#F9FAFB) for page backgrounds to maintain a crisp, clean environment.
- **Functional Colors:** Success and Error tones are softened with a 10% opacity background fill when used in alerts to remain "friendly" rather than "alarming."

## Typography

This design system utilizes a dual-font strategy to balance character with utility. 

- **Sora (Headlines):** A geometric sans-serif that brings a modern, tech-forward energy to the catalog headings. It features a larger x-height and distinctive shapes that feel friendly and "open."
- **Inter (Body & UI):** Chosen for its exceptional legibility on mobile screens. It handles dense data, product descriptions, and labels with a neutral, professional tone.

**Scalability:** On mobile devices, `headline-lg` should automatically downscale to the mobile variant to prevent awkward line breaks in product titles.

## Layout & Spacing

The layout employs a **Mobile-First Responsive Grid**. 

- **Mobile (Default):** A 2-column or 1-column fluid layout with 16px side margins. Key interactions (like the Inquiry Basket) are anchored to the bottom 25% of the screen for "easy-reach" thumb navigation.
- **Desktop:** A 12-column fixed grid (max-width: 1280px) with 24px gutters. Dashboard views transition into a sidebar-navigated layout.
- **Spacing Rhythm:** Based on an 8px baseline. Use `stack-md` (12px) for related items within a card and `stack-lg` (24px) for spacing between independent UI components.

## Elevation & Depth

To maintain the "Lightweight" feel, the design system avoids heavy shadows. Instead, it uses:

- **Tonal Layering:** Surfaces are differentiated by color (White vs. Light Gray) rather than depth. 
- **Soft Ambient Shadows:** Reserved only for floating elements like the "Bottom Sheet" or "Sticky CTA." Use a very diffused shadow: `0px 10px 30px rgba(0, 0, 0, 0.05)`.
- **Glassmorphism:** Navigation bars and selection trays use a `backdrop-filter: blur(12px)` with a semi-transparent white background (`rgba(255, 255, 255, 0.8)`). This keeps the user grounded in the catalog even when a menu is open.

## Shapes

The shape language is defined by **pronounced, friendly curves**. 

- **Standard Elements:** Buttons, input fields, and small cards use `rounded-md` (8px).
- **Primary Containers:** Product cards and dashboard modules use `rounded-lg` (16px) to emphasize the soft, modern aesthetic.
- **Floating Elements:** Bottom sheets and category chips use `rounded-xl` (24px) or "Pill" shapes to denote high interactivity and touch-friendliness.

## Components

### Product Cards
Image-dominant with a 1:1 or 4:5 aspect ratio. Product name and price are positioned below the image in `body-md` (bold) and `body-sm`. No borders; use a white background with a subtle 1px gray stroke (#F3F4F6) if placed on a white background.

### WhatsApp CTA Buttons
Primary action buttons are large (min-height: 56px) with a primary green background. They must include the WhatsApp icon to the left of the text. Use "Pill" shapes for these specific buttons to make them feel more "clickable" on mobile.

### Selection Tray (Inquiry Basket)
A sticky bottom-sheet component. It uses a glassmorphic background and displays a horizontal scroll of small thumbnails of selected items. It should include a "Send Inquiry" button that occupies the full width of the mobile screen.

### Category Chips
Small, pill-shaped labels used for filtering. 
- **Inactive:** Light gray background, charcoal text.
- **Active:** Secondary color (Charcoal) background, white text.

### Form Inputs & Upload Zones
Inputs use a `neutral-50` fill with no border unless focused. Focused state uses a 2px primary green border. Upload zones use a dashed border with a centered "Plus" icon and `body-sm` instructions.

### Dashboard Analytics Cards
White containers with `rounded-lg`. Use `headline-md` for the primary metric and `label-sm` with the tertiary indigo color for the metric title. Include a small sparkline graph at the bottom of the card for visual trend indication.