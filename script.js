/* =========================================================
   Lunelle — demo bedsheet storefront
   ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const fmt = n => "₹" + Math.round(n).toLocaleString("en-IN");

/* ---------- Data ---------- */
const PRODUCTS = [
  { id: 1, name: "Cloud Percale Sheet Set", cat: "cotton", pattern: "solid", price: 3499, old: 4299, rating: 4.9, reviews: 2140, badge: "Bestseller",
    thread: "400 thread count percale weave", tags: ["crisp", "neutral", "hot", "solid"],
    desc: "Cool, crisp and matte — like slipping into a freshly made hotel bed every night.",
    colors: [["White", "#f4f1ea"], ["Oat", "#e3d5c0"], ["Sage", "#b5c1a6"], ["Mist", "#c8d3dc"]] },
  { id: 2, name: "Sateen Luxe Sheet Set", cat: "cotton", pattern: "solid", price: 4299, rating: 4.8, reviews: 1580, badge: "New",
    thread: "600 thread count sateen weave", tags: ["soft", "cold", "solid"],
    desc: "A silky, lustrous drape with a buttery hand-feel that keeps you cosy on cooler nights.",
    colors: [["Ivory", "#efe7d8"], ["Blush", "#e8c6bd"], ["Charcoal", "#5d5853"], ["Navy", "#3d4a63"]] },
  { id: 3, name: "Riviera Stripe Sheet Set", cat: "cotton", pattern: "stripe", price: 2799, old: 3299, rating: 4.7, reviews: 860, badge: "Sale",
    thread: "300 thread count yarn-dyed cotton", tags: ["crisp", "neutral", "pattern"],
    desc: "Breezy coastal stripes, yarn-dyed so the colour stays rich wash after wash.",
    colors: [["Sky", "#a9c3d6"], ["Terracotta", "#d49a7e"], ["Olive", "#a3a77f"]] },
  { id: 4, name: "Stonewashed Linen Set", cat: "linen", pattern: "waffle", price: 5999, rating: 4.9, reviews: 1320, badge: "Bestseller",
    thread: "100% French flax, stonewashed", tags: ["hot", "crisp", "solid"],
    desc: "Effortlessly rumpled, naturally temperature-regulating and softer with every wash.",
    colors: [["Flax", "#d8c9ae"], ["Clay", "#c98f74"], ["Eucalyptus", "#9db0a0"], ["Slate", "#8b939b"]] },
  { id: 5, name: "Gingham Linen Duvet Set", cat: "linen", pattern: "check", price: 6499, old: 7499, rating: 4.7, reviews: 410,
    thread: "Linen-cotton blend, garment washed", tags: ["hot", "crisp", "pattern"],
    desc: "Countryside gingham in a breathable linen blend. Includes duvet cover and two shams.",
    colors: [["Rose", "#e2b3ad"], ["Sage", "#a9b89b"], ["Ochre", "#d9b56e"]] },
  { id: 6, name: "Mulberry Silk Sheet Set", cat: "silk", pattern: "solid", price: 12999, rating: 5.0, reviews: 640, badge: "Luxe",
    thread: "22 momme grade 6A mulberry silk", tags: ["silky", "neutral", "cold", "solid"],
    desc: "Liquid-smooth silk that's kind to skin and hair, and naturally thermoregulating.",
    colors: [["Champagne", "#e6d2b5"], ["Pearl", "#ece8e2"], ["Dusty Rose", "#d2a39c"], ["Midnight", "#34364a"]] },
  { id: 7, name: "Silk Pillowcase Duo", cat: "silk", pattern: "solid", price: 3299, rating: 4.9, reviews: 2900,
    thread: "19 momme mulberry silk, set of 2", tags: ["silky", "neutral", "solid"],
    desc: "Wake up with smoother hair and skin. Hidden zip closure and envelope finish.",
    colors: [["Champagne", "#e6d2b5"], ["Lilac", "#c7b5d3"], ["Pearl", "#ece8e2"]] },
  { id: 8, name: "Bamboo Cooling Sheet Set", cat: "bamboo", pattern: "solid", price: 4799, old: 5499, rating: 4.8, reviews: 1910, badge: "Cooling",
    thread: "100% bamboo lyocell twill", tags: ["hot", "silky", "soft", "solid"],
    desc: "Up to 3° cooler than cotton, moisture-wicking and impossibly smooth.",
    colors: [["Glacier", "#c5d6e0"], ["Sand", "#ddd0bb"], ["Lavender", "#c8bed9"], ["Graphite", "#6c6f75"]] },
  { id: 9, name: "Bamboo Dot Sheet Set", cat: "bamboo", pattern: "dots", price: 3999, rating: 4.6, reviews: 520,
    thread: "Bamboo-cotton blend, printed", tags: ["hot", "soft", "pattern"],
    desc: "Playful micro-dots on a cool bamboo blend — a gentle pop of pattern for any room.",
    colors: [["Mint", "#bcd6c8"], ["Peach", "#f0c8b0"], ["Cloud", "#e4e7ec"]] },
  { id: 10, name: "Brushed Flannel Set", cat: "cotton", pattern: "check", price: 3799, rating: 4.8, reviews: 730, badge: "Cozy",
    thread: "170 GSM double-brushed cotton", tags: ["cold", "soft", "pattern"],
    desc: "Fireside-warm flannel, double brushed for a fuzzy, cloud-like feel on winter nights.",
    colors: [["Forest", "#5f7563"], ["Wine", "#8a4b52"], ["Camel", "#c19a6b"]] },
  { id: 11, name: "Wildflower Print Set", cat: "cotton", pattern: "floral", price: 3299, old: 3999, rating: 4.7, reviews: 390,
    thread: "300 thread count organic cotton", tags: ["neutral", "soft", "pattern"],
    desc: "A hand-drawn meadow print on GOTS organic cotton — spring, all year round.",
    colors: [["Cream", "#f1e6d2"], ["Sky", "#b7cfe0"], ["Blush", "#ecc7c0"]] },
  { id: 12, name: "The Complete Bed Bundle", cat: "cotton", pattern: "solid", price: 8999, old: 12499, rating: 4.9, reviews: 1120, badge: "Bundle",
    thread: "Fitted, flat, duvet cover + 4 pillowcases", tags: ["neutral", "crisp", "soft", "solid"],
    desc: "Everything your bed needs in one box, in our bestselling 400 TC percale.",
    colors: [["White", "#f4f1ea"], ["Oat", "#e3d5c0"], ["Sage", "#b5c1a6"]] },
];

const SIZES = [["Single", 0.7], ["Double", 0.9], ["Queen", 1], ["King", 1.2]];
const sizePrice = (base, size) => {
  const m = (SIZES.find(s => s[0] === size) || SIZES[2])[1];
  return Math.round((base * m) / 100) * 100 - 1;
};

const FABRICS = {
  cotton: { title: "Egyptian Cotton", color: "#e9dfd0", pattern: "stripe",
    desc: "Long-staple cotton spun into smooth, strong yarns. Choose percale for a crisp, cool feel or sateen for a silky sheen.",
    meters: { Softness: 80, Breathability: 85, Durability: 90, Coolness: 70 } },
  linen: { title: "French Linen", color: "#b9c4a8", pattern: "waffle",
    desc: "Woven from European flax, linen is highly breathable, moisture-wicking and gets softer every single wash.",
    meters: { Softness: 65, Breathability: 98, Durability: 95, Coolness: 92 } },
  silk: { title: "Mulberry Silk", color: "#dcb0a8", pattern: "solid",
    desc: "The smoothest natural fibre. Hypoallergenic, gentle on skin and hair, and naturally regulates temperature.",
    meters: { Softness: 98, Breathability: 75, Durability: 60, Coolness: 80 } },
  bamboo: { title: "Bamboo Lyocell", color: "#a9bccd", pattern: "dots",
    desc: "Made from sustainably grown bamboo in a closed-loop process. Silky, cooling and perfect for hot sleepers.",
    meters: { Softness: 92, Breathability: 90, Durability: 75, Coolness: 96 } },
};

const REVIEWS = [
  ["Priya S.", "Bengaluru", "Cloud Percale", "I've tried every 'luxury' sheet out there. These are the first that genuinely feel like a five-star hotel."],
  ["Arjun M.", "Mumbai", "Bamboo Cooling", "Mumbai summers used to wreck my sleep. The bamboo set is noticeably cooler — no more flipping the pillow."],
  ["Neha K.", "Delhi", "Mulberry Silk", "My hair is less frizzy and my skin feels amazing. Worth every rupee, and the colour is gorgeous."],
  ["Rahul V.", "Pune", "Stonewashed Linen", "Softer than I expected from linen and it only gets better. The Eucalyptus shade is so calming."],
  ["Ananya D.", "Kolkata", "Complete Bundle", "Ordered the bundle for our new flat. Everything matched perfectly and arrived beautifully packed."],
  ["Kabir J.", "Jaipur", "Brushed Flannel", "Like sleeping inside a warm hug. Hasn't pilled at all after a whole winter of washes."],
];

const QUIZ = [
  { q: "How do you usually sleep?", opts: [["🔥", "Hot", "I kick the covers off", "hot"], ["😌", "Just right", "Comfortable most nights", "neutral"], ["🥶", "Cold", "I love being bundled up", "cold"]] },
  { q: "What feel do you love?", opts: [["🧺", "Crisp", "Cool & matte", "crisp"], ["☁️", "Soft", "Brushed & cosy", "soft"], ["✨", "Silky", "Smooth & lustrous", "silky"]] },
  { q: "And your style?", opts: [["⬜", "Solid", "Calm & classic", "solid"], ["🌼", "Patterned", "A little personality", "pattern"], ["🎁", "Surprise me", "Show me the best", "any"]] },
];

const HERO_COLORS = [["Oat", "#e3d5c0"], ["Sage", "#b5c1a6"], ["Blush", "#e8c6bd"], ["Mist", "#c8d3dc"], ["Terracotta", "#d49a7e"], ["Navy", "#3d4a63"]];

/* ---------- Colour helpers ---------- */
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const t = amt < 0 ? 0 : 255, p = Math.abs(amt);
  r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}
const tint = hex => shade(hex, 0.62);

/* ---------- SVG generators ---------- */
let uid = 0;
function patternDef(id, pattern, color) {
  const d = shade(color, -0.22), l = shade(color, 0.45);
  const base = s => `<rect width="${s}" height="${s}" fill="${color}"/>`;
  switch (pattern) {
    case "stripe": return `<pattern id="${id}" width="16" height="16" patternUnits="userSpaceOnUse">${base(16)}<rect width="6" height="16" fill="${d}" opacity=".45"/></pattern>`;
    case "check": return `<pattern id="${id}" width="22" height="22" patternUnits="userSpaceOnUse">${base(22)}<rect width="22" height="8" fill="${d}" opacity=".3"/><rect width="8" height="22" fill="${d}" opacity=".3"/></pattern>`;
    case "dots": return `<pattern id="${id}" width="14" height="14" patternUnits="userSpaceOnUse">${base(14)}<circle cx="7" cy="7" r="2.2" fill="${l}"/></pattern>`;
    case "waffle": return `<pattern id="${id}" width="9" height="9" patternUnits="userSpaceOnUse">${base(9)}<path d="M0 .5H9M.5 0V9" stroke="${d}" stroke-opacity=".25"/></pattern>`;
    case "floral": return `<pattern id="${id}" width="30" height="30" patternUnits="userSpaceOnUse">${base(30)}<g fill="${d}" opacity=".45"><circle cx="8" cy="5" r="2.4"/><circle cx="8" cy="11" r="2.4"/><circle cx="5" cy="8" r="2.4"/><circle cx="11" cy="8" r="2.4"/></g><circle cx="8" cy="8" r="1.6" fill="${l}"/><g fill="${d}" opacity=".3"><circle cx="23" cy="20" r="1.8"/><circle cx="23" cy="25" r="1.8"/><circle cx="20.5" cy="22.5" r="1.8"/><circle cx="25.5" cy="22.5" r="1.8"/></g></pattern>`;
    default: return `<pattern id="${id}" width="10" height="10" patternUnits="userSpaceOnUse">${base(10)}</pattern>`;
  }
}

// Stack of folded sheets. layers: [{color, pattern}] bottom → top
function sheetSVG(color, pattern, layers) {
  layers = layers || [{ color, pattern }, { color, pattern }, { color, pattern }];
  const k = ++uid;
  const n = layers.length;
  const h = 46, gap = 40, w = 240, x = 30;
  const topY = 30, height = topY + (n - 1) * gap + h + 30;
  let defs = `<linearGradient id="g${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient>`;
  let body = `<ellipse cx="150" cy="${topY + (n - 1) * gap + h + 10}" rx="128" ry="10" fill="#000" opacity=".1"/>`;
  layers.forEach((L, i) => {
    const pid = `p${k}_${i}`;
    defs += patternDef(pid, L.pattern, L.color);
    const y = topY + (n - 1 - i) * gap;
    const dark = shade(L.color, -0.28);
    const isTop = i === n - 1;
    body += `<g class="${isTop ? "sheet-top" : ""}">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="url(#${pid})"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="url(#g${k})"/>
      <path d="M${x + 12} ${y + h * 0.58}H${x + w - 12}" stroke="${dark}" stroke-opacity=".28" stroke-width="1.4"/>
      <path d="M${x + 4} ${y + 10}Q${x} ${y + h / 2} ${x + 4} ${y + h - 10}" stroke="${dark}" stroke-opacity=".3" fill="none" stroke-width="2"/>
      ${isTop ? `<rect x="${x + 150}" y="${y - 2}" width="28" height="${h + 4}" rx="3" fill="#f7f1e7"/><rect x="${x + 154}" y="${y + 12}" width="20" height="20" rx="2" fill="#2b2622" opacity=".85"/><text x="${x + 164}" y="${y + 26}" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="12" font-weight="600" fill="#f7f1e7">L</text>` : ""}
    </g>`;
  });
  return `<svg viewBox="0 0 300 ${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>${defs}</defs>${body}</svg>`;
}

// Draped fabric swatch for fabric guide
function drapeSVG(color, pattern) {
  const k = ++uid;
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${patternDef("d" + k, pattern, color)}
    <linearGradient id="dg${k}" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".15"/><stop offset=".25" stop-color="#fff" stop-opacity=".25"/><stop offset=".45" stop-color="#000" stop-opacity=".12"/><stop offset=".7" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient></defs>
    <rect width="400" height="300" fill="url(#d${k})"/><rect width="400" height="300" fill="url(#dg${k})"/>
    <path d="M0 220 Q100 180 200 230 T400 210 V300 H0Z" fill="#000" opacity=".07"/></svg>`;
}

/* ---------- Storage ---------- */
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
let cart = store.get("lunelle-cart", []);
let wishlist = store.get("lunelle-wish", []);
const byId = id => PRODUCTS.find(p => p.id === id);

/* ---------- Toast ---------- */
function toast(msg, icon = "✓") {
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `<span>${icon}</span>${msg}`;
  $("#toastWrap").appendChild(t);
  setTimeout(() => t.remove(), 3100);
}

/* ---------- Header ---------- */
const header = $("#header");
addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 30), { passive: true });

const menuToggle = $("#menuToggle"), mobileNav = $("#mobileNav");
function setMenu(open) {
  mobileNav.classList.toggle("open", open);
  menuToggle.classList.toggle("open", open);
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.classList.toggle("locked", open);
}
menuToggle.addEventListener("click", () => setMenu(!mobileNav.classList.contains("open")));
$$("#mobileNav a").forEach(a => a.addEventListener("click", () => setMenu(false)));
addEventListener("resize", () => { if (innerWidth > 860 && mobileNav.classList.contains("open")) setMenu(false); });

// Active nav link
const navLinks = $$(".nav a");
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
["shop", "collections", "fabrics", "quiz", "reviews"].forEach(id => sectionObs.observe(document.getElementById(id)));

/* ---------- Ripple ---------- */
document.addEventListener("click", e => {
  const btn = e.target.closest(".btn");
  if (!btn) return;
  const r = btn.getBoundingClientRect(), s = Math.max(r.width, r.height);
  const span = document.createElement("span");
  span.className = "ripple";
  span.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
  btn.appendChild(span);
  setTimeout(() => span.remove(), 600);
});

/* ---------- Reveal & counters ---------- */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const siblings = $$(".reveal", e.target.parentElement);
    e.target.style.transitionDelay = Math.min(siblings.indexOf(e.target), 5) * 0.08 + "s";
    e.target.classList.add("in");
    revealObs.unobserve(e.target);
  });
}, { threshold: 0.12 });
$$(".reveal").forEach(el => revealObs.observe(el));

function countUp(el) {
  const target = parseFloat(el.dataset.count), dec = +el.dataset.decimals || 0;
  const start = performance.now(), dur = 1800;
  const step = now => {
    const p = Math.min((now - start) / dur, 1), eased = 1 - Math.pow(1 - p, 4);
    const v = target * eased;
    el.textContent = dec ? v.toFixed(dec) : Math.round(v).toLocaleString("en-IN") + (target >= 1000 && p === 1 ? "+" : "");
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const countObs = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { countUp(e.target); countObs.unobserve(e.target); }
}), { threshold: 0.6 });
$$("[data-count]").forEach(el => countObs.observe(el));

/* ---------- Hero bed ---------- */
const heroSw = $("#heroSwatches");
let heroIdx = 0, heroAuto;
function setBed(i) {
  heroIdx = i;
  const [name, hex] = HERO_COLORS[i];
  $(".bed-duvet").style.fill = hex;
  $(".bed-fold").style.fill = shade(hex, 0.3);
  $$(".bed-pillow").forEach(p => (p.style.fill = shade(hex, 0.55)));
  $("#bedColorName").textContent = name;
  $$(".swatch", heroSw).forEach((s, j) => s.classList.toggle("active", j === i));
}
heroSw.innerHTML = HERO_COLORS.map(([n, h]) => `<button class="swatch" style="background:${h}" title="${n}" aria-label="${n}"></button>`).join("");
$$(".swatch", heroSw).forEach((s, i) => s.addEventListener("click", () => { clearInterval(heroAuto); setBed(i); }));
setBed(0);
heroAuto = setInterval(() => setBed((heroIdx + 1) % HERO_COLORS.length), 3200);

// tilt
const bedCard = $(".bed-card");
const heroVisual = $(".hero-visual");
heroVisual.addEventListener("mousemove", e => {
  const r = heroVisual.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
  bedCard.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
});
heroVisual.addEventListener("mouseleave", () => (bedCard.style.transform = ""));

/* ---------- Collections & promo art ---------- */
$$(".collection-art").forEach(el => (el.innerHTML = sheetSVG(el.dataset.color, el.dataset.pattern)));
$("#promoArt").innerHTML = sheetSVG(null, null, [
  { color: "#e3d5c0", pattern: "solid" }, { color: "#f4f1ea", pattern: "waffle" },
  { color: "#b5c1a6", pattern: "solid" }, { color: "#e8c6bd", pattern: "stripe" },
]);
$$(".collection").forEach(c => c.addEventListener("click", () => setFilter(c.dataset.filter)));

/* ---------- Product grid ---------- */
const grid = $("#productGrid");
let filter = "all", sort = "featured";
const cardColor = {}; // selected colour index per product card

function stars(r) { const f = Math.round(r); return "★".repeat(f) + "☆".repeat(5 - f); }

function productCard(p, i) {
  const ci = cardColor[p.id] || 0, [, hex] = p.colors[ci];
  const wished = wishlist.includes(p.id);
  return `<article class="product" data-id="${p.id}" style="--pbg:${tint(hex)};animation-delay:${i * 0.06}s">
    <div class="product-media" data-qv>
      ${p.badge ? `<span class="p-badge ${p.old ? "sale" : ""}">${p.badge}</span>` : ""}
      <button class="wish ${wished ? "on" : ""}" aria-label="Add to wishlist"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg></button>
      <div class="pm-svg">${sheetSVG(hex, p.pattern)}</div>
      <button class="quick-btn">Quick View</button>
    </div>
    <div class="product-body">
      <div class="p-top"><span class="p-cat">${p.cat}</span>
        <div class="swatches">${p.colors.map(([n, h], j) => `<button class="swatch sm ${j === ci ? "active" : ""}" style="background:${h}" title="${n}" data-ci="${j}" aria-label="${n}"></button>`).join("")}</div>
      </div>
      <h3 class="p-name" data-qv>${p.name}</h3>
      <div class="rating"><span class="stars">${stars(p.rating)}</span>${p.rating} (${p.reviews.toLocaleString("en-IN")})</div>
      <div class="p-bottom">
        <div class="price-row"><span class="price">${fmt(p.price)}</span>${p.old ? `<span class="old">${fmt(p.old)}</span>` : ""}</div>
        <button class="add-btn" aria-label="Add to cart">+</button>
      </div>
    </div>
  </article>`;
}

function renderGrid() {
  let list = PRODUCTS.filter(p => filter === "all" || p.cat === filter);
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  grid.innerHTML = list.map(productCard).join("");
  $("#emptyState").hidden = list.length > 0;
}

function setFilter(f) {
  filter = f;
  $$("#filterChips .chip").forEach(c => c.classList.toggle("active", c.dataset.filter === f));
  renderGrid();
}
$("#filterChips").addEventListener("click", e => { const c = e.target.closest(".chip"); if (c) setFilter(c.dataset.filter); });
$("#sortSelect").addEventListener("change", e => { sort = e.target.value; renderGrid(); });

grid.addEventListener("click", e => {
  const card = e.target.closest(".product");
  if (!card) return;
  const p = byId(+card.dataset.id);

  const sw = e.target.closest(".swatch");
  if (sw) {
    const ci = +sw.dataset.ci;
    cardColor[p.id] = ci;
    const hex = p.colors[ci][1];
    card.style.setProperty("--pbg", tint(hex));
    $(".pm-svg", card).innerHTML = sheetSVG(hex, p.pattern);
    $$(".swatch", card).forEach(s => s.classList.toggle("active", s === sw));
    return;
  }
  const wish = e.target.closest(".wish");
  if (wish) { toggleWish(p.id); wish.classList.toggle("on", wishlist.includes(p.id)); return; }
  const add = e.target.closest(".add-btn");
  if (add) {
    const ci = cardColor[p.id] || 0;
    addToCart(p.id, ci, "Queen", 1, add);
    add.classList.add("added"); add.textContent = "✓";
    setTimeout(() => { add.classList.remove("added"); add.textContent = "+"; }, 1400);
    return;
  }
  if (e.target.closest("[data-qv], .quick-btn")) openQuickView(p.id, cardColor[p.id] || 0);
});

renderGrid();

/* ---------- Wishlist ---------- */
function toggleWish(id) {
  const on = wishlist.includes(id);
  wishlist = on ? wishlist.filter(x => x !== id) : [...wishlist, id];
  store.set("lunelle-wish", wishlist);
  toast(on ? "Removed from wishlist" : "Saved to wishlist", on ? "♡" : "♥");
  updateBadges(); renderWish();
}
function renderWish() {
  const box = $("#wishItems");
  if (!wishlist.length) {
    box.innerHTML = `<div class="empty-cart"><div class="big">♡</div><p>Your wishlist is empty.<br/>Tap the heart on any product to save it.</p></div>`;
    return;
  }
  box.innerHTML = wishlist.map(id => {
    const p = byId(id), hex = p.colors[0][1];
    return `<div class="cart-item" data-id="${id}">
      <div class="ci-media" style="--pbg:${tint(hex)}">${sheetSVG(hex, p.pattern)}</div>
      <div><div class="ci-name">${p.name}</div><div class="ci-meta">${fmt(p.price)}</div>
        <button class="btn btn-primary small" data-wadd>Add to cart</button></div>
      <div class="ci-right"><button class="ci-remove" data-wrm>Remove</button></div>
    </div>`;
  }).join("");
}
$("#wishItems").addEventListener("click", e => {
  const item = e.target.closest(".cart-item"); if (!item) return;
  const id = +item.dataset.id;
  if (e.target.closest("[data-wrm]")) { toggleWish(id); syncWishButtons(); }
  if (e.target.closest("[data-wadd]")) addToCart(id, 0, "Queen", 1, e.target.closest("[data-wadd]"));
});
function syncWishButtons() { $$(".product").forEach(c => $(".wish", c).classList.toggle("on", wishlist.includes(+c.dataset.id))); }

/* ---------- Cart ---------- */
const SHIP_FREE = 4999;
const cartTotal = () => cart.reduce((s, i) => s + i.price * i.qty, 0);
const cartQty = () => cart.reduce((s, i) => s + i.qty, 0);

function addToCart(id, ci, size, qty, fromEl) {
  const p = byId(id);
  const key = `${id}-${ci}-${size}`;
  const existing = cart.find(i => i.key === key);
  if (existing) existing.qty += qty;
  else cart.push({ key, id, ci, size, qty, price: sizePrice(p.price, size) });
  store.set("lunelle-cart", cart);
  if (fromEl) flyToCart(fromEl, p.colors[ci][1]);
  setTimeout(() => { updateBadges(true); renderCart(); }, fromEl ? 700 : 0);
  toast(`${p.name} added to cart`);
}

function flyToCart(fromEl, color) {
  const a = fromEl.getBoundingClientRect(), b = $("#cartBtn").getBoundingClientRect();
  const dot = document.createElement("div");
  dot.className = "fly-dot";
  dot.style.background = color;
  dot.style.left = a.left + a.width / 2 - 11 + "px";
  dot.style.top = a.top + a.height / 2 - 11 + "px";
  document.body.appendChild(dot);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
  dot.animate([
    { transform: "translate(0,0) scale(1)" },
    { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 120}px) scale(1.3)`, offset: 0.5 },
    { transform: `translate(${dx}px, ${dy}px) scale(.3)`, opacity: 0.6 },
  ], { duration: 700, easing: "cubic-bezier(.5,0,.5,1)" }).onfinish = () => dot.remove();
}

function updateBadges(bump) {
  const c = $("#cartCount"), w = $("#wishCount"), q = cartQty();
  c.textContent = q; c.classList.toggle("show", q > 0);
  w.textContent = wishlist.length; w.classList.toggle("show", wishlist.length > 0);
  if (bump) { c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump"); }
}

function renderCart() {
  const box = $("#cartItems"), total = cartTotal();
  $("#cartHeadCount").textContent = cart.length ? `(${cartQty()})` : "";
  $("#cartSubtotal").textContent = fmt(total);
  const left = SHIP_FREE - total;
  $("#shipMsg").innerHTML = left > 0 ? `You're <b>${fmt(left)}</b> away from free shipping` : "🎉 You've unlocked <b>free shipping!</b>";
  $("#shipBar").style.width = Math.min(100, (total / SHIP_FREE) * 100) + "%";
  $("#checkoutBtn").disabled = !cart.length;
  $("#checkoutBtn").style.opacity = cart.length ? 1 : 0.5;
  if (!cart.length) {
    box.innerHTML = `<div class="empty-cart"><div class="big">🛏️</div><p>Your cart is feeling a little empty.</p><a href="#shop" class="btn btn-primary" data-close>Start Shopping</a></div>`;
    return;
  }
  box.innerHTML = cart.map(i => {
    const p = byId(i.id), [cn, hex] = p.colors[i.ci];
    return `<div class="cart-item" data-key="${i.key}">
      <div class="ci-media" style="--pbg:${tint(hex)}">${sheetSVG(hex, p.pattern)}</div>
      <div>
        <div class="ci-name">${p.name}</div>
        <div class="ci-meta"><span class="swatch sm" style="background:${hex}"></span>${cn} · ${i.size}</div>
        <div class="qty"><button data-q="-1" aria-label="Decrease">−</button><span>${i.qty}</span><button data-q="1" aria-label="Increase">+</button></div>
      </div>
      <div class="ci-right"><b>${fmt(i.price * i.qty)}</b><button class="ci-remove">Remove</button></div>
    </div>`;
  }).join("");
}

$("#cartItems").addEventListener("click", e => {
  const row = e.target.closest(".cart-item"); if (!row) return;
  const item = cart.find(i => i.key === row.dataset.key);
  const q = e.target.closest("[data-q]");
  const remove = () => {
    row.classList.add("removing");
    setTimeout(() => { cart = cart.filter(i => i !== item); store.set("lunelle-cart", cart); renderCart(); updateBadges(); }, 380);
  };
  if (q) {
    item.qty += +q.dataset.q;
    if (item.qty < 1) return remove();
    store.set("lunelle-cart", cart); renderCart(); updateBadges();
  }
  if (e.target.closest(".ci-remove")) remove();
});

/* ---------- Panels (drawers / modals / search) ---------- */
const overlay = $("#overlay");
function openPanel(el) {
  if (mobileNav.classList.contains("open")) setMenu(false);
  closeAll(true);
  el.classList.add("open");
  if (!el.classList.contains("search-overlay")) overlay.classList.add("show");
  document.body.classList.add("locked");
}
function closeAll(silent) {
  $$(".drawer.open, .modal.open, .search-overlay.open").forEach(el => el.classList.remove("open"));
  overlay.classList.remove("show");
  if (!silent) document.body.classList.remove("locked");
  if ($("#checkout").dataset.done) resetCheckout();
}
overlay.addEventListener("click", () => closeAll());
$$(".modal").forEach(m => m.addEventListener("click", e => { if (e.target === m) closeAll(); }));
document.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeAll(); });
// Swipe to dismiss: drawers slide right, bottom sheets slide down
function swipeToClose(el, axis, getScroller) {
  let start = null;
  el.addEventListener("touchstart", e => {
    const sc = getScroller ? getScroller() : null;
    start = sc && sc.scrollTop > 0 ? null : { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });
  el.addEventListener("touchend", e => {
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x, dy = e.changedTouches[0].clientY - start.y;
    if (axis === "x" ? dx > 90 && Math.abs(dy) < 60 : dy > 110 && Math.abs(dx) < 60) closeAll();
    start = null;
  });
}
$$(".drawer").forEach(d => swipeToClose(d, "x"));
$$(".modal-card").forEach(c => swipeToClose(c, "y", () => c));

document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closeAll(); setMenu(false); }
  if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); openSearch(); }
});
$("#cartBtn").addEventListener("click", () => { renderCart(); openPanel($("#cartDrawer")); });
$("#wishBtn").addEventListener("click", () => { renderWish(); openPanel($("#wishDrawer")); });

/* ---------- Quick view ---------- */
const qv = { id: null, ci: 0, size: "Queen", qty: 1 };
function renderQV() {
  const p = byId(qv.id), [cn, hex] = p.colors[qv.ci];
  $("#qvMedia").style.setProperty("--pbg", tint(hex));
  $("#qvMedia").innerHTML = sheetSVG(hex, p.pattern);
  $("#qvCat").textContent = p.cat;
  $("#qvName").textContent = p.name;
  $("#qvRating").innerHTML = `<span class="stars">${stars(p.rating)}</span>${p.rating} · ${p.reviews.toLocaleString("en-IN")} reviews`;
  const price = sizePrice(p.price, qv.size);
  $("#qvPrice").textContent = fmt(price);
  $("#qvOld").textContent = p.old ? fmt(sizePrice(p.old, qv.size)) : "";
  $("#qvDesc").textContent = p.desc;
  $("#qvThread").textContent = p.thread;
  $("#qvColorName").textContent = cn;
  $("#qvSwatches").innerHTML = p.colors.map(([n, h], j) => `<button class="swatch ${j === qv.ci ? "active" : ""}" style="background:${h}" title="${n}" data-ci="${j}"></button>`).join("");
  $("#qvSizes").innerHTML = SIZES.map(([s]) => `<button class="size ${s === qv.size ? "active" : ""}" data-size="${s}">${s}</button>`).join("");
  $("#qvQty span").textContent = qv.qty;
  $("#qvAdd").textContent = `Add to Cart — ${fmt(price * qv.qty)}`;
}
function openQuickView(id, ci = 0) {
  Object.assign(qv, { id, ci, size: "Queen", qty: 1 });
  renderQV();
  openPanel($("#quickView"));
}
$("#qvSwatches").addEventListener("click", e => { const s = e.target.closest(".swatch"); if (s) { qv.ci = +s.dataset.ci; renderQV(); } });
$("#qvSizes").addEventListener("click", e => { const s = e.target.closest(".size"); if (s) { qv.size = s.dataset.size; renderQV(); } });
$("#qvQty").addEventListener("click", e => { const b = e.target.closest("[data-step]"); if (b) { qv.qty = Math.max(1, qv.qty + +b.dataset.step); renderQV(); } });
$("#qvAdd").addEventListener("click", e => {
  addToCart(qv.id, qv.ci, qv.size, qv.qty, e.currentTarget);
  setTimeout(() => { closeAll(); }, 450);
});
$("#bundleBtn").addEventListener("click", () => openQuickView(12));

/* ---------- Search ---------- */
const searchOv = $("#searchOverlay"), searchIn = $("#searchInput");
function openSearch() { openPanel(searchOv); searchIn.value = ""; renderSearch(""); setTimeout(() => searchIn.focus(), 100); }
$("#searchBtn").addEventListener("click", openSearch);
function renderSearch(q) {
  q = q.trim().toLowerCase();
  const hits = PRODUCTS.filter(p => !q || [p.name, p.cat, p.desc, p.thread, ...p.colors.map(c => c[0])].join(" ").toLowerCase().includes(q));
  $("#searchResults").innerHTML = hits.length ? hits.map((p, i) => {
    const hex = p.colors[0][1];
    return `<button class="search-hit" data-id="${p.id}" style="animation-delay:${i * 0.03}s"><div class="ci-media" style="--pbg:${tint(hex)}">${sheetSVG(hex, p.pattern)}</div><div><b>${p.name}</b><small>${p.cat} · ${fmt(p.price)}</small></div></button>`;
  }).join("") : `<p class="search-empty">No results for “${q}”. Try “linen”, “silk” or “sage”.</p>`;
}
searchIn.addEventListener("input", () => renderSearch(searchIn.value));
$("#searchResults").addEventListener("click", e => { const h = e.target.closest(".search-hit"); if (h) openQuickView(+h.dataset.id); });

/* ---------- Countdown ---------- */
const promoEnd = Date.now() + ((2 * 24 + 13) * 3600 + 47 * 60) * 1000;
function tick() {
  let s = Math.max(0, Math.floor((promoEnd - Date.now()) / 1000));
  const v = { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
  $$("#countdown b").forEach(b => (b.textContent = String(v[b.dataset.unit]).padStart(2, "0")));
}
tick(); setInterval(tick, 1000);

/* ---------- Fabric guide ---------- */
function setFabric(key, btn) {
  const f = FABRICS[key];
  $$("#fabricTabs button").forEach(b => b.classList.toggle("active", b === btn));
  const ind = $("#tabIndicator");
  ind.style.width = btn.offsetWidth + "px";
  ind.style.transform = `translateX(${btn.offsetLeft}px)`;
  const panel = $("#fabricPanel");
  panel.classList.remove("swap"); void panel.offsetWidth; panel.classList.add("swap");
  $("#fabricSwatch").innerHTML = drapeSVG(f.color, f.pattern);
  $("#fabricTitle").textContent = f.title;
  $("#fabricDesc").textContent = f.desc;
  $("#fabricMeters").innerHTML = Object.entries(f.meters).map(([k, v]) =>
    `<div><div class="meter-top"><span>${k}</span><b>${v}%</b></div><div class="meter-bar"><span data-w="${v}"></span></div></div>`).join("");
  requestAnimationFrame(() => requestAnimationFrame(() => $$("#fabricMeters [data-w]").forEach(s => (s.style.width = s.dataset.w + "%"))));
  $("#fabricShop").innerHTML = `Shop ${f.title} <span class="arrow">→</span>`;
  $("#fabricShop").onclick = () => setFilter(key);
}
$("#fabricTabs").addEventListener("click", e => { const b = e.target.closest("button"); if (b) setFabric(b.dataset.fabric, b); });
const firstTab = $("#fabricTabs button");
setFabric("cotton", firstTab);
addEventListener("resize", () => { const a = $("#fabricTabs button.active"); setFabric(a.dataset.fabric, a); });
// Re-run meter animation when guide scrolls into view
new IntersectionObserver((en, o) => en.forEach(e => { if (e.isIntersecting) { const a = $("#fabricTabs button.active"); setFabric(a.dataset.fabric, a); o.disconnect(); } }), { threshold: 0.4 }).observe($("#fabrics"));

/* ---------- Quiz ---------- */
let quizStep = 0, answers = [];
function renderQuiz() {
  const body = $("#quizBody");
  $("#quizBar").style.width = (quizStep / QUIZ.length) * 100 + "%";
  if (quizStep < QUIZ.length) {
    const q = QUIZ[quizStep];
    body.innerHTML = `<div class="quiz-q"><h3>${q.q}</h3><div class="quiz-opts">${q.opts.map(([emo, t, s, tag]) =>
      `<button class="quiz-opt" data-tag="${tag}"><span class="emo">${emo}</span><b>${t}</b><small>${s}</small></button>`).join("")}</div></div>`;
    return;
  }
  // score products
  const scored = PRODUCTS.map(p => ({ p, s: answers.reduce((acc, t) => acc + (t === "any" ? 0 : p.tags.includes(t) ? 1 : 0), 0) + p.rating / 10 }));
  const best = scored.sort((a, b) => b.s - a.s)[0].p, hex = best.colors[0][1];
  body.innerHTML = `<div class="quiz-result">
    <div class="qr-media" style="--pbg:${tint(hex)}">${sheetSVG(hex, best.pattern)}</div>
    <div><p class="eyebrow">Your perfect match</p><h3>${best.name}</h3><p>${best.desc}</p>
      <div class="btns"><button class="btn btn-light" data-see="${best.id}">View — ${fmt(best.price)}</button><button class="btn btn-ghost" data-retake>Retake quiz</button></div></div>
  </div>`;
}
$("#quizBody").addEventListener("click", e => {
  const o = e.target.closest(".quiz-opt");
  if (o) { answers.push(o.dataset.tag); quizStep++; setTimeout(renderQuiz, 150); return; }
  const see = e.target.closest("[data-see]");
  if (see) openQuickView(+see.dataset.see);
  if (e.target.closest("[data-retake]")) { quizStep = 0; answers = []; renderQuiz(); }
});
renderQuiz();

/* ---------- Reviews carousel ---------- */
const AV = ["#b86b4b", "#7f9274", "#6b7a99", "#a77a5b", "#9a6f8a", "#5f7563"];
$("#carouselTrack").innerHTML = REVIEWS.map(([n, city, prod, text], i) => `<div class="review"><div class="review-inner">
  <span class="stars">★★★★★</span><blockquote>“${text}”</blockquote>
  <div class="reviewer"><div class="avatar" style="background:${AV[i]}">${n[0]}</div><div><b>${n}</b><small>${city} · ${prod}</small></div></div>
</div></div>`).join("");
let rIdx = 0, rTimer;
const perView = () => (innerWidth <= 600 ? 1 : innerWidth <= 1024 ? 2 : 3);
const maxIdx = () => REVIEWS.length - perView();
function goReview(i) {
  rIdx = (i + maxIdx() + 1) % (maxIdx() + 1);
  $("#carouselTrack").style.transform = `translateX(-${(rIdx * 100) / perView()}%)`;
  $("#carouselDots").innerHTML = Array.from({ length: maxIdx() + 1 }, (_, j) => `<button class="${j === rIdx ? "active" : ""}" data-i="${j}" aria-label="Review ${j + 1}"></button>`).join("");
}
function autoReviews() { clearInterval(rTimer); rTimer = setInterval(() => goReview(rIdx + 1), 5000); }
$("#prevReview").addEventListener("click", () => { goReview(rIdx - 1); autoReviews(); });
$("#nextReview").addEventListener("click", () => { goReview(rIdx + 1); autoReviews(); });
$("#carouselDots").addEventListener("click", e => { const d = e.target.closest("[data-i]"); if (d) { goReview(+d.dataset.i); autoReviews(); } });
// swipe
let sx = null;
$("#carousel").addEventListener("touchstart", e => (sx = e.touches[0].clientX), { passive: true });
$("#carousel").addEventListener("touchend", e => {
  if (sx === null) return;
  const dx = e.changedTouches[0].clientX - sx;
  if (Math.abs(dx) > 40) { goReview(rIdx + (dx < 0 ? 1 : -1)); autoReviews(); }
  sx = null;
});
addEventListener("resize", () => goReview(Math.min(rIdx, maxIdx())));
goReview(0); autoReviews();

/* ---------- Newsletter ---------- */
$("#newsletterForm").addEventListener("submit", e => {
  e.preventDefault();
  e.target.reset();
  toast("You're on the list! Use DREAM15 at checkout.", "💌");
  confetti(80);
});

/* ---------- Checkout ---------- */
const co = $("#checkout");
let discount = 0;
function setStep(n) {
  $$("#steps .step").forEach((s, i) => { s.classList.toggle("active", i === n); s.classList.toggle("done", i < n); });
  $$(".co-step").forEach((s, i) => s.classList.toggle("active", i === n));
  co.querySelector(".checkout-card").classList.toggle("done", n === 2);
  co.querySelector(".modal-card").scrollTop = 0;
}
function totals() {
  const sub = cartTotal();
  const disc = Math.round(sub * discount);
  let ship = +($("input[name=ship]:checked")?.value || 0);
  if (ship === 0 && sub - disc < SHIP_FREE) ship = 99;
  const pay = $("#payTabs .active")?.dataset.pay;
  const fee = pay === "cod" ? 49 : 0;
  return { sub, disc, ship: ship + fee, total: sub - disc + ship + fee };
}
function renderSummary() {
  $("#sumItems").innerHTML = cart.map(i => {
    const p = byId(i.id), [cn, hex] = p.colors[i.ci];
    return `<div class="sum-item"><div class="ci-media" style="--pbg:${tint(hex)}">${sheetSVG(hex, p.pattern)}<i>${i.qty}</i></div><div>${p.name}<small>${cn} · ${i.size}</small></div><b>${fmt(i.price * i.qty)}</b></div>`;
  }).join("");
  const t = totals();
  $("#sumSub").textContent = fmt(t.sub);
  $("#sumDiscRow").hidden = !t.disc;
  $("#sumDisc").textContent = "−" + fmt(t.disc);
  $("#sumShip").textContent = t.ship ? fmt(t.ship) : "Free";
  $("#sumTotal").textContent = fmt(t.total);
  $("#sumToggleTotal").textContent = fmt(t.total);
  $("#payAmount").textContent = fmt(t.total);
}
function resetCheckout() {
  delete co.dataset.done;
  $("#shipForm").reset(); $("#payForm").reset();
  discount = 0; $("#promoInput").value = "";
  updateCardPreview();
  setStep(0);
}
$("#checkoutBtn").addEventListener("click", () => {
  if (!cart.length) return;
  setStep(0); renderSummary(); openPanel(co);
});
$$("input[name=ship]").forEach(r => r.addEventListener("change", renderSummary));
$("#sumToggle").addEventListener("click", () => {
  const box = $("#checkoutSummary"), open = !box.classList.contains("expanded");
  box.classList.toggle("expanded", open);
  $("#sumToggle").setAttribute("aria-expanded", open);
  $("#sumToggle u").textContent = open ? "Hide order summary" : "Show order summary";
});
$("#applyPromo").addEventListener("click", () => {
  const code = $("#promoInput").value.trim().toUpperCase();
  if (code === "DREAM15") { discount = 0.15; toast("Promo applied — 15% off!", "🎉"); }
  else { discount = 0; toast("That code isn't valid", "⚠️"); }
  renderSummary();
});

function validate(form) {
  let ok = true;
  $$("input", form).forEach(inp => {
    const field = inp.closest(".field");
    if (!field || inp.offsetParent === null) return;
    const valid = inp.checkValidity() && (!inp.required || inp.value.trim());
    field.classList.toggle("invalid", !valid);
    if (!valid) ok = false;
  });
  return ok;
}
$("#shipForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!validate(e.target)) return toast("Please complete the highlighted fields", "⚠️");
  setStep(1); renderSummary();
});
$("#backToShip").addEventListener("click", () => setStep(0));
$("#payTabs").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  $$("#payTabs button").forEach(x => x.classList.toggle("active", x === b));
  $$(".pay-panel").forEach(p => p.classList.toggle("active", p.dataset.panel === b.dataset.pay));
  renderSummary();
});

// card preview
const cnum = $("#cnum"), cname = $("#cname"), cexp = $("#cexp"), ccvv = $("#ccvv");
function updateCardPreview() {
  const d = cnum.value.replace(/\D/g, "").padEnd(16, "•");
  $("#cpNum").textContent = d.match(/.{1,4}/g).join(" ");
  $("#cpName").textContent = cname.value.toUpperCase() || "YOUR NAME";
  $("#cpExp").textContent = cexp.value || "MM/YY";
  $("#cpCvv").textContent = ccvv.value.replace(/./g, "•") || "•••";
}
cnum.addEventListener("input", () => { cnum.value = cnum.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})(?=.)/g, "$1 "); updateCardPreview(); });
cexp.addEventListener("input", () => { let v = cexp.value.replace(/\D/g, "").slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2); cexp.value = v; updateCardPreview(); });
ccvv.addEventListener("input", () => { ccvv.value = ccvv.value.replace(/\D/g, ""); updateCardPreview(); });
cname.addEventListener("input", updateCardPreview);
ccvv.addEventListener("focus", () => $("#cardPreview").classList.add("flip"));
ccvv.addEventListener("blur", () => $("#cardPreview").classList.remove("flip"));

$("#payForm").addEventListener("submit", e => {
  e.preventDefault();
  const method = $("#payTabs .active").dataset.pay;
  let ok = true;
  const mark = (inp, cond) => { inp.closest(".field").classList.toggle("invalid", !cond); if (!cond) ok = false; };
  if (method === "card") {
    mark(cnum, cnum.value.replace(/\D/g, "").length === 16);
    mark(cname, cname.value.trim().length > 1);
    mark(cexp, /^(0[1-9]|1[0-2])\/\d{2}$/.test(cexp.value));
    mark(ccvv, ccvv.value.length === 3);
  } else if (method === "upi") {
    const upi = $("input[name=upi]");
    mark(upi, /^[\w.-]+@[\w]+$/.test(upi.value.trim()));
  }
  if (!ok) return toast("Please check your payment details", "⚠️");

  const btn = $("#payBtn");
  btn.classList.add("loading");
  setTimeout(() => {
    btn.classList.remove("loading");
    const f = new FormData($("#shipForm"));
    $("#successName").textContent = f.get("first");
    $("#successEmail").textContent = f.get("email");
    $("#orderId").textContent = "#LN" + Math.floor(100000 + Math.random() * 900000);
    co.dataset.done = "1";
    setStep(2);
    confetti(160);
    cart = []; store.set("lunelle-cart", cart); updateBadges(); renderCart();
  }, 1700);
});

/* ---------- Confetti ---------- */
const cv = $("#confetti"), cx = cv.getContext("2d");
let parts = [], confettiRunning = false;
function confetti(n = 120) {
  cv.width = innerWidth; cv.height = innerHeight;
  const cols = ["#b86b4b", "#7f9274", "#e8c6bd", "#d9b56e", "#c8d3dc", "#2b2622"];
  for (let i = 0; i < n; i++) parts.push({
    x: innerWidth / 2 + (Math.random() - 0.5) * 200, y: innerHeight * 0.45,
    vx: (Math.random() - 0.5) * 16, vy: Math.random() * -16 - 4,
    r: Math.random() * 6 + 4, c: cols[i % cols.length], rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, life: 0,
  });
  if (!confettiRunning) { confettiRunning = true; requestAnimationFrame(drawConfetti); }
}
function drawConfetti() {
  cx.clearRect(0, 0, cv.width, cv.height);
  parts.forEach(p => {
    p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;
    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot); cx.fillStyle = p.c;
    cx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); cx.restore();
  });
  parts = parts.filter(p => p.y < cv.height + 20 && p.life < 400);
  if (parts.length) requestAnimationFrame(drawConfetti);
  else { confettiRunning = false; cx.clearRect(0, 0, cv.width, cv.height); }
}

/* ---------- Init ---------- */
updateBadges(); renderCart(); renderWish();
