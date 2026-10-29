# Solstice Makers Fair — Event Website UI Concept

An original event website UI concept for a fictional weekend makers & craft fair: a home page built around featured makers and planning, a schedule & workshops page with a real two-day program table, and a tickets page where pass tiers state everything included and an order summary travels with the form.

**Live demo:** https://brittanynation.github.io/makers-fair-event-site/
- Home: https://brittanynation.github.io/makers-fair-event-site/
- Schedule & Workshops: https://brittanynation.github.io/makers-fair-event-site/schedule.html
- Tickets & Passes: https://brittanynation.github.io/makers-fair-event-site/tickets.html

## Roles this supports

Built to support applications for **UI Designer**, **Front-End Designer**, **Web Designer**, and **Junior UI/UX Designer** roles — event and visitor-facing website work that sits between visual design and front-end implementation.

## What it demonstrates

- **Event information architecture** — one job per page: Home ("who will be there, and why go"), Schedule & Workshops ("what happens, when, and for whom"), Tickets & Passes ("what it costs, all-in")
- **Plan-ability as design content** — stall numbers, hall locations, payment notes, workshop levels, lengths, and seats-left counts are treated as first-class content, not fine print, because an event site succeeds when a visitor can plan a day from it
- **Trust through specifics** — four labeled fair-at-a-glance numbers, pass cards that list everything included before the price is acted on, access notes stated before tickets rather than after, and a stated "no fees added at the end" rule
- **Designed states, not just screens** — a pre-selected Weekend Pass tier with badge, border, and label, workshop add-on rows with seats-left notes, and an order summary whose total is repeated on the review button
- **Honest form design** — a mock ticket form that says what an email will be used for before submission, marks workshops as optional, and states plainly that no real ticket sale or submission happens
- **Accessibility-minded choices** — contrast-safe berry/raspberry/periwinkle pairings, badges and selected states that use words and borders, never color alone, skip link, `aria-current` navigation, a real `<table>` for the weekend schedule, native `<details>` FAQs, and real labels on every field
- **Responsive layout** — stat, maker, and tier grids step down cleanly on small screens, and the schedule tables scroll horizontally while remaining readable on phones
- **Semantic, framework-free build** — hand-written HTML/CSS, one stylesheet, vanilla JavaScript powers the ticket flow, no external images; all visuals are CSS-only

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| Berry | `#571C3A` | Header, headings, primary actions, stat band |
| Raspberry | `#C73A5E` | Calls to action, selected states, highlights |
| Periwinkle | `#8A9DE0` | Workshop & info accents, secondary badges |
| Blush | `#F9E2E7` | Soft accents, badges, form add-on rows |
| Paper | `#FFFBF7` | Page background |
| Ink | `#2B1824` | Body text |

## Contents

| Page | What it covers |
| --- | --- |
| `index.html` | Home — hero with date/hall/hours, fair-at-a-glance stats, six featured maker cards, shop/make/eat experiences, design notes and palette |
| `schedule.html` | Schedule & Workshops — Saturday and Sunday program tables, workshop cards with level/length/seats, venue and access notes |
| `tickets.html` | Tickets & Passes — three pass tiers with a selected state, ticket selection form UI with workshop add-ons, travelling order summary, and plain-word FAQs |

## Workflow note

My design workflow runs in **Sketch and Webflow**, where I design interfaces and systems visually. This demo is hand-built in HTML/CSS to show the same event-site thinking — plan-ability, clear pass pricing, and an honest order flow — expressed directly in code.

## Files

- `index.html` — home / landing for the concept
- `schedule.html` — schedule & workshops view
- `tickets.html` — tickets & passes / order form view
- `styles.css` — design tokens and all component styles
- `og-image.png` — 1200×627 social preview image in the project palette

## Note

This is an original portfolio concept created by Brittany Nation. Solstice Makers Fair is a fictional event; this project is not affiliated with any real fair, venue, or maker. All names, makers, dates, prices, and figures shown are sample data, and the site sells no real tickets.

## Working ticket flow

`tickets.js` makes the order form real: pass tier cards (and workshop links on the schedule page) pre-fill the form, pass type, quantity, and workshop add-ons update the order summary and total live, the form validates name and email, and submitting ends in a confirmation state with a generated order reference. Front-end demo only — no real tickets are sold.
