# EMG — UI Design System

Derived from the EMG logo: a speeding shopping cart in an orange→gold gradient against dark charcoal, paired with a bold condensed wordmark.

## Color Tokens
| Token | Hex | Usage |
|---|---|---|
| `emg-orange` | `#FF7A00` | Primary CTA, links, accents |
| `emg-orange-dark` | `#E56600` | Hover states |
| `emg-gold` | `#FFC107` | Secondary accent, gradient partner, badges |
| `emg-charcoal` | `#1A1A1A` | Dark sections, headers, primary text |
| `emg-charcoal-light` | `#2A2A28` | Dark surface hover states |
| `emg-cream` | `#FFF8EC` | Light section backgrounds (alternate to white) |
| White | `#FFFFFF` | Base background, card surfaces |

Primary brand gradient: `linear-gradient(90deg, #FF7A00 0%, #FFC107 50%, #FF4D00 100%)` — used on the wordmark, primary buttons, stat blocks, and step icons.

## Typography
- **Headings:** Poppins (600-900 weight) — bold, geometric, mirrors the condensed weight of the EMG wordmark
- **Body:** Inter (400-600 weight) — high legibility at small sizes for listing cards/data-dense UI
- Scale: `text-sm` (14px) body/meta, `text-base`–`text-lg` card titles, `text-3xl`–`text-6xl` page/hero headings

## Logo Usage
- Always pair the cart mark with the gradient wordmark on light backgrounds; on dark backgrounds the tagline switches to cream (`#F4EAD8`) for contrast
- Minimum clear space: half the mark's height on all sides
- Mark-only variant (`variant="mark"`) for favicons, app icons, and tight nav spaces

## Components
- **Buttons:** fully rounded (`rounded-full`), 4 variants — `primary` (gradient fill), `secondary` (charcoal fill), `outline`, `ghost`. All lift (`-translate-y-0.5`) on hover for a "fast/responsive" feel.
- **Cards:** `rounded-2xl`, subtle `border-black/5`, hover state lifts + adds orange-tinted shadow (`shadow-orange-500/15`) — reinforces speed/energy without heavy skeuomorphism
- **Badges:** small pill, gradient fill for "Featured", charcoal fill for category tags
- **Inputs:** `rounded-xl`, neutral `#FAFAFA` fill, orange border on focus

## Motion Principles ("Speed, Growth, Easy Commerce")
- Page/section entrances: fade + slight upward translate (`opacity 0→1`, `y 20→0`), staggered per item
- Floating product cards in the hero loop continuously (`y` oscillation, 5-7s) to suggest a "live" marketplace
- Counters animate from 0 on scroll-into-view (stats section) for a sense of growth/momentum
- Hover states always include a transform (`-translate-y`, `scale`) — never color-only — to reinforce responsiveness

## Layout Grid
- Max content width: `max-w-7xl` (1280px) for marketplace-density pages, `max-w-3xl`/`max-w-4xl` for reading-focused pages (blog, legal, FAQ)
- Category/listing grids: 2 cols mobile → 3-5 cols desktop depending on card density
- Consistent section rhythm: `py-16`–`py-20` vertical spacing between homepage sections

## Iconography
- [Lucide](https://lucide.dev) icon set throughout for a clean, consistent line-icon language
- Category icons colored individually (orange/gold alternating) inside a tinted rounded-square chip — never raw, uncontained icons in listings/category UI
