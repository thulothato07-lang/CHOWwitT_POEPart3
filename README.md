# CHOWwit_T Clothing
-ST10513700 THULO THATO

## PROJECT OVERVIEW

CHOWwit_T was created in 2026 by an Entrepreneur called Thulo Thato.

### WEBSITE DEVELOPMENT PROPOSAL 1 — CHOWwit_T Clothing website (Selected Proposal)

**Organisation Overview**
CHOWwit_T Clothing is a developing South African streetwear and lifestyle clothing brand that aims to provide fashionable, affordable, and high-quality apparel for young people. The brand focuses on products such as hoodies, T-shirts, caps, and other casual wear that reflect modern urban culture. Currently, the business has limited online visibility and relies mainly on word-of-mouth marketing and social media promotion.

**Purpose of website**
The purpose of the website is to create a professional online presence for CHOWwit_T Clothing and make it easier for customers to browse products, learn about the brand, and submit enquiries. The website will also improve customer communication and support future online sales opportunities.

**Website Goals and Objectives**
- Present the brand professionally.
- Display available clothing products.
- Allow customers to send product enquiries.
- Provide contact information and store locations.
- Increase brand awareness and customer engagement.

**Proposed Features**
The website contains five pages:
- Home: Introduction and featured products.
- About: Brand history and mission.
- Products/Services: Clothing categories and descriptions.
- Enquiries: Customer enquiry form.
- Contact: Contact details and store locations.

Additional features include a navigation menu, responsive layout, styled buttons, and a simple JavaScript file for future enhancements.

**Target Audience**
Young adults between the ages of 16 and 35 who are interested in streetwear, fashion, and affordable clothing in South Africa.

**Colour Scheme and Typography**
- Colours: Black, white, and red.
- Typography: Arial and sans-serif fonts for readability and a modern appearance.

**Key Performance Indicators (KPIs)**
- Number of website visits.
- Number of enquiry form submissions.
- Time spent on product pages.
- Increase in social media interactions linked to the website.

**Timeline**

| Task | Duration |
|---|---|
| Planning and research | 1 day |
| HTML page development | 1 day |
| CSS styling | 1 day |
| Testing and GitHub upload | 0.5 day |

**Estimated Budget**
As this is a student project, development tools such as VS Code, GitHub, and Live Server are free. Estimated cost: R0 – R200 for optional internet and image resources.

---

### WEBSITE DEVELOPMENT PROPOSAL 2 — Thato Community Food Drive Website

**Organisation Overview**
Thato Community Food Drive is a local community initiative that supports families facing food insecurity in Johannesburg and surrounding areas. The organisation collects food donations, distributes food parcels, and coordinates volunteers who assist during outreach events. At present, communication is mainly done through WhatsApp and social media, which makes it difficult to manage information efficiently.

**Purpose of the Website**
The website will provide a central platform where community members can learn about the organisation, view ongoing projects, volunteer, and contact the organisers. It will improve transparency and make it easier for people to participate in donation and support activities.

**Website Goals**
- Raise awareness about food insecurity.
- Encourage volunteers to participate.
- Provide clear contact information.
- Share information about donation campaigns.
- Build trust within the community.

**Proposed Features**
- Home: Overview of the food drive and current campaign.
- About: Mission, vision, and community impact.
- Services: Food collection and distribution activities.
- Enquiry: Volunteer and donation enquiry form.
- Contact: Contact details and collection points.

The design is simple, accessible, and mobile-friendly.

**Target Audience**
Community members, volunteers, local businesses, donors, and non-profit supporters in Johannesburg.

**Colour Scheme and Typography**
- Colours: Green, white, and orange to represent hope, growth, and community support.
- Typography: Arial and Verdana for accessibility and readability.

**Key Performance Indicators (KPIs)**
- Number of volunteer enquiries.
- Number of donation-related enquiries.
- Website traffic from social media.
- Repeat visits to campaign pages.

**Timeline**

| Task | Duration |
|---|---|
| Research and planning | 1 day |
| Page development | 1 day |
| Styling and testing | 1 day |
| Final review and upload | 1 day |

**Estimated Budget**
The website can be developed using free tools and hosted on GitHub Pages for demonstration purposes. Estimated cost: R0 – R150.

---

### Proposal Decision

After evaluating both organisations, CHOWwit_T Clothing has been selected for the practical website development because it offers clear product presentation requirements, straightforward navigation, and is more suitable for demonstrating HTML, CSS, forms, and responsive design skills required for the PoE.

---

## SITE STRUCTURE

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Landing page with hero banner and brand introduction. |
| About | `about.html` | Brand story, mission, vision and beliefs (accordion). |
| Products | `products.html` | Product catalogue with search, category filter, sort and image lightbox. |
| Contact | `contact.html` | Contact details, interactive map and contact form. |
| Enquiries | `enquiries.html` | Enquiry form that returns a cost and availability response. |

**Other files:** `style.css` (external stylesheet), `script.js` (all JavaScript), `robots.txt`, `sitemap.xml`.

**Live site:** https://thulothato07-lang.github.io/CHOWwit_T-Clothing/ (GitHub Pages)

---

## CHANGELOG

### Part 3 — Enhancing Functionality and SEO

**JavaScript (`script.js`, linked with `defer` on every page)**
- **Added:** Accordion on `about.html`, built with DOM manipulation: each `<h3>` section is turned into a button and panel (`aria-expanded`, keyboard accessible). Without JavaScript the full text still displays.
- **Added:** Dynamic product listing on `products.html`, rendered from a JavaScript data array, with a live search box, category filter and sort (price low/high, A–Z).
- **Added:** Lightbox gallery: clicking (or pressing Enter on) any product image opens it larger; closes with the X button, Escape, or a click outside the image.
- **Added:** Interactive map on `contact.html` using Leaflet with OpenStreetMap tiles and a marker for 123 Francis Baard Street, Pretoria (Leaflet loaded from unpkg with integrity hashes).
- **Added:** Animations and transitions: scroll-in fade/slide using CSS transitions triggered by an `IntersectionObserver`, accordion and response-box fade-in keyframes, and a `prefers-reduced-motion` override.
- **Added:** Current page highlighted in the navigation using `aria-current="page"`.

**Forms**
- **Added (`enquiries.html`):** Quantity and preferred date fields. On valid submission the page shows an instant response with the estimated cost (bulk discount at 10+ items), availability, and an acknowledgement. The form `action` points to a Formspree endpoint and the data is sent asynchronously with `fetch` (AJAX); the page shows a message if sending fails.
- **Added (`contact.html`):** General message form (name, email, optional phone, message type, message up to 500 characters). Once validated, the details are compiled into an email addressed to the recipient set in `script.js` and shown as a preview with a **Send Email** button that opens the visitor's email app (`mailto:`).
- **Added:** HTML5 validation attributes (`required`, `minlength`, `maxlength`, `pattern`, `type="email"`, `type="tel"`, `type="number"`, `min`, `max`, `type="date"`) plus JavaScript validation: name format, email format, South African phone format, quantity range, future-only dates, message length. Error messages appear beside each field (`role="alert"`, `aria-invalid`) and clear as the user corrects them.
- **Note:** Stock levels, the bulk discount rule and the Formspree form ID are placeholder values for this assignment and are set at the top of `script.js` and in the form `action`.

**SEO**
- **Keyword research and meta tags:** Every page has a unique, keyword-focused `<title>`, `meta description` and `meta keywords` (streetwear, South Africa, hoodies, denim, Pretoria).
- **Header tags:** Each page now has exactly one `<h1>`; sections use `<h2>`/`<h3>` in order.
- **Image optimisation:** Images renamed with descriptive file names (for example `IndexImages.png` became `chowwit-t-logo.png`, `DenimJ.jpg` became `denim-jacket-1.jpg`) and alt text made descriptive; product images use `loading="lazy"`.
- **URL structure:** All pages renamed to lowercase, descriptive file names (`Service.html` became `products.html`, `Enquiries.html` became `enquiries.html`, `Index.html` became `index.html`), which also avoids case-sensitivity errors on hosting. All internal links updated.
- **Internal linking:** Header and footer navigation on every page plus in-content links.
- **Mobile-friendliness:** Viewport meta tag and responsive breakpoints from Part 2, with the new toolbar, map and forms included.
- **Off-page and local SEO:** Open Graph tags for social sharing, canonical URLs, and `ClothingStore` structured data (JSON-LD) with the Pretoria address on the home page. Backlinks would be built after launch by linking the live site from the brand's social media profiles.
- **robots.txt and sitemap.xml:** Added, listing all five pages.
- **Page speed:** Scripts use `defer`, one shared CSS file and one shared JS file, lazy-loaded images.
- **Security:** No inline scripts, all visitor input written to the page with `textContent` (never `innerHTML`), `referrer` meta policy, Leaflet loaded with Subresource Integrity, and HTTPS provided by the hosting platform.

**Deployment**
- Deployed on GitHub Pages (Settings, Pages, deploy from the `main` branch, root folder).

**Corrections and structure changes made while updating Part 2 work**
- **Changed:** Header brand text on `enquiries.html` and `contact.html` changed from `<h1>`/`<h2>` to `<p class="brand">` (styled identically in `style.css`) so each page has a single, meaningful `<h1>`.
- **Changed:** `about.html` had no `<h1>`; one was added.
- **Changed:** The Contact page hero heading text and the Enquiries hero heading were promoted to `<h1>` for the same reason.

---

### Part 2 — CSS Styling and Responsive Design

- **Added:** External stylesheet `style.css`, linked to all five HTML pages via `<link rel="stylesheet" href="style.css">`.
- **Added:** CSS custom properties (`:root` variables) for the brand colour scheme (black, white, red), typography scale, and spacing scale, so all pages share one consistent design system.
- **Added:** Base/reset styles (box-sizing, margin/padding reset, base font and line-height) applied site-wide for cross-browser consistency.
- **Added:** Typography styling using `font-family`, `font-size`, `font-weight`, `line-height`, and `letter-spacing` across headings, paragraphs, and navigation links.
- **Added:** Flexbox layout for the header and navigation bar, and CSS Grid layout for the product cards on the Products page and the contact details on the Contact page.
- **Added:** Visual styling — colour, background-colour, border, and box-shadow — on cards, buttons, and form fields, plus `:hover`, `:focus`, and `:active` pseudo-classes on links, buttons, and form inputs for interactivity.
- **Added:** Responsive design with two breakpoints (900px for tablet, 600px for mobile), relative units (`rem`, `em`, `%`) throughout, a single-column product grid on mobile, and a stacked header/nav on small screens.
- **Added:** `Index.html` — this page was referenced by the navigation menu on every other page but did not exist in the Part 1 submission; it has now been created as the site's home page.

### Corrections carried over from Part 1 feedback

- **Fixed (About.html):** An unclosed `<footer` tag was missing its closing angle bracket, which broke the rendering of the rest of the page. Corrected to `<footer>`.
- **Fixed (About.html):** The page contained a second, incorrectly nested `<header>` element wrapping the "Who We Are" content; this has been removed so the biography content sits inside `<main>` as a single `<section class="about-section">`.
- **Fixed (Contact.html):** A malformed bold tag (`<b></b>Contact></b>`) produced invalid HTML and a stray `>` character in the visible text. Corrected to a properly closed `<b>Contact</b>`.
- **Fixed (Contact.html):** A single-cell `<table>` was being used purely for layout instead of content. Replaced with semantic `<div>` containers styled with CSS Grid.
- **Fixed (Enquiries.html):** The opening `<main` tag was missing its closing angle bracket, and a second, redundant `<main class="enquiry-page">` was nested inside it. Consolidated into a single, correctly closed `<main class="enquiry-page">`.
- **Fixed (Enquiries.html):** A duplicate `</main>` closing tag and a stray navigation menu placed outside the page footer (after `</main>`, outside any landmark) were removed; navigation now appears once in the header and once in the footer, consistent with the other pages.
- **Fixed (Service.html):** `<section Class="hero">` used an invalid capitalised `Class` attribute, which browsers ignore; corrected to lowercase `class="hero"` so the hero styling now applies.
- **Fixed (Service.html):** The "Denim Pants" product was nested inside the same `<div class="card">` as "Denim Jackets" instead of being its own card. Split into two separate `.card` elements so the product grid displays four cards correctly.
- **Fixed (Service.html):** Duplicate `<main>` elements (one for content, a second one only for the navigation) were consolidated; the footer navigation now lives inside `<footer>` for consistency with the rest of the site.
- **Standardised:** Navigation markup (order, labels, and placement in header + footer) is now identical across all five pages.

---

## REFERENCES

MDN Web Docs. (2026). *HTML basics*. Available at: https://developer.mozilla.org/

MDN Web Docs. (2026). *CSS Grid Layout*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout

MDN Web Docs. (2026). *Flexbox*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox

MDN Web Docs. (2026). *Using media queries*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries

W3Schools. (2026). *CSS Tutorial*. Available at: https://www.w3schools.com/css/

W3Schools. (2026). *CSS Responsive Web Design*. Available at: https://www.w3schools.com/css/css_rwd_intro.asp

World Wide Web Consortium (W3C). (2026). *Web Accessibility Initiative*. Available at: https://www.w3.org/WAI/

W3Schools. (2026). *HTML Forms*. Available at: https://www.w3schools.com/html/html_forms.asp

Leaflet. (2026). *Leaflet: an open-source JavaScript library for interactive maps*. Available at: https://leafletjs.com/

OpenStreetMap contributors. (2026). *OpenStreetMap*. Available at: https://www.openstreetmap.org/

MDN Web Docs. (2026). *Client-side form validation*. Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation

MDN Web Docs. (2026). *Intersection Observer API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

Google Search Central. (2026). *SEO Starter Guide*. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide

GitHub Docs. (2026). *GitHub Pages*. Available at: https://docs.github.com/en/pages

Formspree. (2026). *Formspree documentation*. Available at: https://help.formspree.io/# CHOWwitT_POEPart3
