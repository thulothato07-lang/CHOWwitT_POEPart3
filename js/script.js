/* =========================================================
   CHOWwit_T Clothing — script.js  (Part 3)
   Accordion, scroll animation, dynamic products + search/sort,
   lightbox gallery, Leaflet map, validated contact + enquiry forms.
   ========================================================= */
'use strict';

(() => {
    // ---- Settings you can change ------------------------------------
    const RECIPIENT = 'info@chowwit_t.com'; // contact form email goes here
    const BULK_MIN = 10;                    // bulk discount threshold (demo rule)
    const BULK_DISCOUNT = 0.1;              // 10% (demo rule)
    const SHOP = [-25.7461, 28.1881];       // map pin (approx. Francis Baard St, Pretoria)

    // Demo product data. Stock levels are placeholders for the assignment.
    const PRODUCTS = [
        { name: 'HOODIES', cat: 'hoodies', price: 450, alt: 'CHOWwit_T hoodie', desc: 'COMFORTABLE WARM HOODIES',
          imgs: ['hoodie-1.jpg', 'hoodie-2.jpg'] },
        { name: 'T-SHIRTS', cat: 'tshirts', price: 300, alt: 'CHOWwit_T T-shirt', desc: 'STYLISH TEES FOR EVERY OCCASION.',
          imgs: ['t-shirt-1.jpg', 't-shirt-2.jpg', 't-shirt-3.jpg'] },
        { name: 'DENIM JACKETS', cat: 'denim', price: 750, alt: 'CHOWwit_T denim jacket', desc: 'COMPLETE YOUR OUTFIT WITH OUR STYLISH DENIM JACKETS.',
          imgs: ['denim-jacket-1.jpg', 'denim-jacket-2.jpg'] },
        { name: 'DENIM PANTS', cat: 'denim', price: 600, alt: 'CHOWwit_T denim pants', desc: 'STYLISH AND COMFORTABLE DENIM PANTS FOR EVERY OCCASION.',
          imgs: ['denim-pants-1.jpg', 'denim-pants-2.jpg'] }
    ];
    const CATALOG = { // used by the enquiry form response
        'Hoodie': { price: 450, stock: 'In stock' },
        'T-Shirt': { price: 300, stock: 'In stock' },
        'Denim': { price: 600, stock: 'Limited stock', from: true }
    };

    // ---- Helpers ----------------------------------------------------
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const rand = n => 'R' + n.toLocaleString('en-ZA', { maximumFractionDigits: 2 });
    function el(tag, attrs = {}, ...kids) {
        const n = document.createElement(tag);
        for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
        n.append(...kids);
        return n;
    }

    // ---- Navigation: mark current page ------------------------------
    const page = location.pathname.split('/').pop() || 'index.html';
    $$('nav a').forEach(a => { if (a.getAttribute('href') === page) a.setAttribute('aria-current', 'page'); });

    // ---- Scroll-in animation (CSS transition + IntersectionObserver)
    const io = 'IntersectionObserver' in window
        ? new IntersectionObserver(entries => entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        }), { threshold: 0.1 })
        : null;
    function reveal(nodes) {
        nodes.forEach(n => { n.classList.add('reveal'); io ? io.observe(n) : n.classList.add('visible'); });
    }
    reveal($$('main .hero, main > section, .contact-info p, .contact-details'));

    // ---- Accordion (About page) built with DOM manipulation ---------
    function accordion() {
        const root = $('.about-section');
        if (!root) return;
        const kids = [...root.children];
        root.replaceChildren();
        let panel = null, n = 0;
        kids.forEach(k => {
            if (k.tagName === 'H3') {
                n++;
                root.append(el('button', { type: 'button', class: 'acc-btn', 'aria-expanded': String(n === 1), 'aria-controls': 'acc-' + n }, k.textContent));
                panel = el('div', { class: 'acc-panel', id: 'acc-' + n });
                if (n !== 1) panel.hidden = true;
                root.append(panel);
            } else (panel || root).append(k);
        });
        root.addEventListener('click', e => {
            const b = e.target.closest('.acc-btn');
            if (!b) return;
            const open = b.getAttribute('aria-expanded') === 'true';
            b.setAttribute('aria-expanded', String(!open));
            $('#' + b.getAttribute('aria-controls')).hidden = open;
        });
    }

    // ---- Dynamic product listing + search / filter / sort -----------
    const card = p => el('div', { class: 'card' },
        el('h3', {}, p.name),
        el('p', { class: 'price' }, `Price: ${rand(p.price)}`),
        ...p.imgs.map((f, i) => el('img', { src: 'images/' + f, alt: `${p.alt}, view ${i + 1}`, class: 'gallery-img', loading: 'lazy', tabindex: '0' })),
        el('p', {}, p.desc));

    function products() {
        const grid = $('#product-grid');
        if (!grid) return;
        const q = $('#search'), cat = $('#category'), sort = $('#sort'), count = $('#result-count');
        const draw = () => {
            const term = q.value.trim().toLowerCase();
            const list = PRODUCTS.filter(p => (cat.value === 'all' || p.cat === cat.value) &&
                `${p.name} ${p.desc}`.toLowerCase().includes(term));
            if (sort.value === 'low') list.sort((a, b) => a.price - b.price);
            if (sort.value === 'high') list.sort((a, b) => b.price - a.price);
            if (sort.value === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
            grid.replaceChildren(...list.map(card));
            count.textContent = list.length ? `${list.length} product${list.length > 1 ? 's' : ''} found` : 'No products match your search.';
            reveal($$('.card', grid));
        };
        [q, cat, sort].forEach(c => c.addEventListener('input', draw));
        draw();
    }

    // ---- Lightbox gallery -------------------------------------------
    function lightbox() {
        if (!$('.gallery-img') && !$('#product-grid')) return;
        const img = el('img'), cap = el('p');
        const close = el('button', { type: 'button', class: 'lb-close', 'aria-label': 'Close image' }, '×');
        const box = el('div', { class: 'lightbox', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Image viewer' }, close, img, cap);
        box.hidden = true;
        document.body.append(box);
        const hide = () => { box.hidden = true; document.body.classList.remove('no-scroll'); };
        const show = t => { img.src = t.src; img.alt = t.alt; cap.textContent = t.alt; box.hidden = false; document.body.classList.add('no-scroll'); close.focus(); };
        box.addEventListener('click', e => { if (e.target !== img) hide(); });
        document.addEventListener('click', e => { const t = e.target.closest('.gallery-img'); if (t) show(t); });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && !box.hidden) hide();
            if (e.key === 'Enter' && e.target.matches && e.target.matches('.gallery-img')) show(e.target);
        });
    }

    // ---- Interactive map (Leaflet + OpenStreetMap) ------------------
    function shopMap() {
        const m = $('#map');
        if (!m || !window.L) return;
        const map = L.map(m).setView(SHOP, 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19, attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        L.marker(SHOP).addTo(map).bindPopup('<b>CHOWwit_T Clothing</b><br>123 Francis Baard Street, Pretoria').openPopup();
    }

    // ---- Form validation --------------------------------------------
    const rules = {
        name: v => /^[A-Za-zÀ-ÿ' -]{2,60}$/.test(v) ? '' : 'Enter your full name (2–60 letters).',
        email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Enter a valid email address, e.g. name@example.com.',
        phone: v => v === '' || /^(\+27|0)[1-9]\d{8}$/.test(v.replace(/[\s-]/g, '')) ? '' : 'Enter a valid South African number, e.g. 072 123 4567 or +27 72 123 4567.',
        type: v => v ? '' : 'Please choose a message type.',
        quantity: v => Number.isInteger(+v) && +v >= 1 && +v <= 100 ? '' : 'Quantity must be a whole number from 1 to 100.',
        date: v => !v || new Date(v) >= new Date(new Date().toDateString()) ? '' : 'Choose today or a future date.',
        message: v => v.length < 10 ? 'Message must be at least 10 characters.' : v.length > 500 ? 'Message must be 500 characters or fewer.' : ''
    };

    function check(f) { // validate one field and show / clear its error message
        const msg = rules[f.name](f.value.trim());
        let box = f.nextElementSibling;
        if (!box || !box.classList.contains('error')) {
            box = el('span', { class: 'error', id: f.id + '-error', role: 'alert' });
            f.after(box);
        }
        box.textContent = msg;
        f.setAttribute('aria-invalid', String(!!msg));
        msg ? f.setAttribute('aria-describedby', box.id) : f.removeAttribute('aria-describedby');
        return msg;
    }
    function validate(form) {
        const bad = $$('[name]', form).filter(f => rules[f.name] && check(f));
        if (bad.length) bad[0].focus();
        return !bad.length;
    }
    function wire(form) { // re-check a field as the user edits it
        form.addEventListener('input', e => { if (e.target.name && rules[e.target.name]) check(e.target); });
    }

    // ---- Contact form: compile an email the visitor can send --------
    function contactForm() {
        const f = $('#contact-form');
        if (!f) return;
        wire(f);
        f.addEventListener('submit', e => {
            e.preventDefault();
            if (!validate(f)) return;
            const d = Object.fromEntries(new FormData(f));
            const subject = `[${d.type}] Message from ${d.name}`;
            const body = `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone || 'Not provided'}\nMessage type: ${d.type}\n\n${d.message}`;
            const href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            $('#contact-response').replaceChildren(
                el('h3', {}, 'Your email is ready'),
                el('p', {}, 'Check the details below, then press Send Email to open it in your email app.'),
                el('pre', {}, `To: ${RECIPIENT}\nSubject: ${subject}\n\n${body}`),
                el('a', { class: 'btn', href }, 'Send Email'));
        });
    }

    // ---- Enquiry form: instant cost / availability + AJAX submit ----
    function enquiryForm() {
        const f = $('#enquiry-form');
        if (!f) return;
        wire(f);
        f.addEventListener('submit', async e => {
            e.preventDefault();
            if (!validate(f)) return;
            const d = Object.fromEntries(new FormData(f));
            const out = $('#enquiry-response');
            const item = CATALOG[d.product];
            const lines = [];
            if (item) {
                const qty = +d.quantity;
                const sub = item.price * qty;
                const disc = qty >= BULK_MIN ? sub * BULK_DISCOUNT : 0;
                lines.push(`${d.product} × ${qty}: ${item.from ? 'from ' : ''}${rand(sub)}`);
                if (disc) lines.push(`Bulk discount (${BULK_MIN}+ items): −${rand(disc)}`);
                lines.push(`Estimated total: ${item.from ? 'from ' : ''}${rand(sub - disc)}`, `Availability: ${item.stock}`);
            } else {
                lines.push(`${d.product}: we will prepare a personal quote for you.`);
            }
            if (d.date) lines.push(`Preferred date: ${d.date}`);
            const status = el('p', { class: 'status' }, 'Sending your enquiry…');
            out.replaceChildren(el('h3', {}, `Thank you, ${d.name}`), el('ul', {}, ...lines.map(l => el('li', {}, l))), status);
            const btn = $('button[type="submit"]', f);
            btn.disabled = true;
            try { // AJAX: send without reloading the page
                const r = await fetch(f.action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } });
                status.textContent = r.ok ? 'Your enquiry was sent. We will reply within 24–48 hours.'
                    : 'We could not send your enquiry online right now. Please email us instead.';
            } catch {
                status.textContent = 'We could not send your enquiry online right now. Please email us instead.';
            }
            btn.disabled = false;
        });
    }

    accordion(); products(); lightbox(); shopMap(); contactForm(); enquiryForm();
})();