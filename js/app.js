/* Shared chrome + cart + salesman + mall popups for every page */
(function () {
  const D = window.SM_DATA, P = D.products;
  const SM = (window.SM = {});
  const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
  const $ = (s, r = document) => r.querySelector(s);
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const safe = (fn, d) => { try { return fn(); } catch (e) { return d; } };
  SM.inr = inr; SM.$ = $; SM.pick = pick;

  /* ---------- cart ---------- */
  const load = () => safe(() => JSON.parse(localStorage.getItem('susheer_cart') || '{}'), {});
  const save = c => safe(() => localStorage.setItem('susheer_cart', JSON.stringify(c)));
  SM.cart = {
    get: load,
    count() { return Object.values(load()).reduce((a, b) => a + b, 0); },
    add(id, q = 1) { const c = load(); c[id] = Math.min(10, (c[id] || 0) + q); save(c); SM.refreshCart(); },
    set(id, q) { const c = load(); if (q <= 0) delete c[id]; else c[id] = Math.min(10, q); save(c); SM.refreshCart(); },
    clear() { save({}); SM.refreshCart(); }
  };
  SM.refreshCart = () => { const b = $('#cartCount'); if (b) { b.textContent = SM.cart.count(); b.classList.toggle('zero', !SM.cart.count()); } };

  /* ---------- toast ---------- */
  SM.toast = msg => {
    const t = document.createElement('div');
    t.className = 'toast'; t.textContent = msg;
    $('#toasts').appendChild(t);
    setTimeout(() => t.classList.add('out'), 2200);
    setTimeout(() => t.remove(), 2700);
  };

  /* ---------- product card ---------- */
  SM.visual = (p, cls = '') => p.img
    ? `<div class="vis photo ${cls}"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>`
    : `<div class="vis ${cls}" style="--c:${p.color}"><span class="emo">${p.emoji}</span></div>`;
  SM.card = p => {
    const off = Math.round((1 - p.price / p.mrp) * 100);
    return `<article class="card ${p.flash ? 'flash' : ''}">
      <a href="product.html?id=${p.id}" class="card-link">
        ${p.bogo ? '<span class="ribbon">BUY 1 GET 1 FREE</span>' : ''}
        ${SM.visual(p)}
        <h3>${p.name}</h3>
        <div class="rate"><span class="star">${p.rating} ★</span><span class="rv">(${p.reviews.toLocaleString('en-IN')})</span></div>
        <div class="price"><b>${inr(p.price)}</b><s>${inr(p.mrp)}</s><span class="off">${off}% off</span></div>
      </a>
      <button class="add" data-add="${p.id}">Add to cart</button>
    </article>`;
  };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-add]'); if (!b) return;
    e.preventDefault();
    const p = P[+b.dataset.add];
    SM.cart.add(p.id, 1);
    SM.toast('Added: ' + p.short + (p.bogo ? ' (+1 FREE 🎁)' : ''));
  });

  /* ---------- chrome ---------- */
  const here = location.pathname.split('/').pop() || 'index.html';
  const nav = (h, t) => `<a href="${h}" class="${here === h ? 'on' : ''}">${t}</a>`;
  const MALL_PHRASE = '🏬 SUSHEER SHOPPING MALL ✦ Bowenpally ✦ World Rate Experience ✦ 🚁 Helicopters for Sale ✦ ✈️ Luxury Aircraft ✦ ';
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="roam" aria-hidden="true"><div class="roam-track">${(`<span>${MALL_PHRASE}</span>`).repeat(8)}</div></div>
    <div class="flashbar">
      <span class="fb-fire">🔥</span>
      <b>SUSHEER FOR SALE</b> — FLASH SALE FOR <b>₹50K ONLY</b> — <b>BUY NOW, GET 1 FREE!</b>
      <span class="fb-timer" id="fbTimer">--:--:--</span>
      <a class="fb-btn" href="product.html?id=0">Buy now →</a>
    </div>
    <header class="top">
      <a href="index.html" class="logo"><img src="assets/mall-main.jpg" alt=""><span><i>Susheer</i><em>Shopping Mall</em></span></a>
      <form class="search" action="index.html" method="get"><input name="q" placeholder="Search Susheer apples, Susheer sofas, Susheer everything…" aria-label="Search" value="${safe(() => new URLSearchParams(location.search).get('q') || '', '').replace(/"/g, '')}"><button aria-label="Search">🔍</button></form>
      <nav>${nav('index.html', 'Shop')}${nav('about.html', 'The Mall')}${nav('cart.html', 'Cart <span id="cartCount" class="badge zero">0</span>')}</nav>
    </header>
    <div id="toasts"></div>`);
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="foot">
      <div class="foot-in">
        <div><div class="flogo">Susheer Shopping Mall</div><p>Plz visit <b>Bowenpally Mall</b> for world rate experience.</p></div>
        <div><b>Shop</b><a href="index.html?cat=grocery">Grocery</a><a href="index.html?cat=mobiles">Mobiles</a><a href="index.html?cat=womens">Fashion</a><a href="product.html?id=0">Flash Sale</a></div>
        <div><b>Mall</b><a href="about.html">About the Mall</a><a href="about.html#gallery">Gallery</a><a href="cart.html">Cart</a></div>
      </div>
      <p class="fine">Susheer Shopping Mall is a parody project made for fun and is not affiliated with any real retailer. No real orders, payments or humans are sold. 😄</p>
    </footer>
    <aside class="salesman" id="salesman" aria-live="polite">
      <button class="x" aria-label="Dismiss salesman" id="salesX">×</button>
      <img src="assets/salesman-full.jpg" alt="Susheer salesman">
      <div class="bub"><span class="who">Susheer Salesman says:</span><p id="salesTxt"></p>
        <div class="srow"><a id="salesGo" href="#" class="sgo">View offer</a><button id="salesAdd" class="sadd">Add 🛒</button></div></div>
    </aside>
    <aside class="mallpop" id="mallpop">
      <button class="x" aria-label="Close" id="mallX">×</button>
      <img id="mallImg" src="" alt="Susheer Shopping Mall">
      <div class="mp-t"><b>Plz visit Bowenpally Mall</b><span id="mallLine">for world rate experience</span></div>
    </aside>`);
  SM.refreshCart();

  // countdown in flash bar (resets every day at midnight)
  const tick = () => {
    const n = new Date(), e = new Date(n); e.setHours(23, 59, 59, 999);
    let s = Math.floor((e - n) / 1000); const h = Math.floor(s / 3600); s %= 3600;
    const t = [h, Math.floor(s / 60), s % 60].map(v => String(v).padStart(2, '0')).join(':');
    document.querySelectorAll('#fbTimer,.js-timer').forEach(el => (el.textContent = t));
  };
  tick(); setInterval(tick, 1000);

  /* ---------- salesman: random product pitches ---------- */
  const pitches = [
    p => `Bhai! ${p.short} for just ${inr(p.price)} — ${Math.round((1 - p.price / p.mrp) * 100)}% off, only today!`,
    p => `Psst… you need ${p.short}. Trust me, I'm the salesman. Only ${inr(p.price)}!`,
    p => `Mega offer! ${p.short} at ${inr(p.price)}. Last piece in the mall, hurry!`,
    p => `Boss, ${p.short}? Straight from Bowenpally Mall. Only ${inr(p.price)}, free delivery!`,
    p => `Arre wait! ${p.short} just dropped to ${inr(p.price)}. Even the helicopters are jealous.`,
    p => `Deal of the minute: ${p.short} — was ${inr(p.mrp)}, now ${inr(p.price)}. Don't blink!`,
    p => `Buy ${p.short} and I'll personally say "thanks bhai". That's a ${Math.round((1 - p.price / p.mrp) * 100)}% off deal!`
  ];
  const sales = $('#salesman'); let salesTimer, curP = null;
  const showSales = () => {
    if (document.hidden || sales.matches(':hover')) return schedule();
    const pool = P.filter(p => !p.flash);
    curP = Math.random() < 0.18 ? P[0] : pick(pool);
    $('#salesTxt').textContent = curP.flash
      ? 'SUSHEER himself is on FLASH SALE — ₹50,000 only and BUY 1 GET 1 FREE! Run!!'
      : pick(pitches)(curP);
    $('#salesGo').href = 'product.html?id=' + curP.id;
    sales.classList.add('show');
    salesTimer = setTimeout(hideSales, 8000);
  };
  const hideSales = () => { sales.classList.remove('show'); schedule(); };
  const schedule = () => { clearTimeout(salesTimer); salesTimer = setTimeout(showSales, 6000 + Math.random() * 9000); };
  $('#salesX').onclick = () => { sales.classList.remove('show'); clearTimeout(salesTimer); schedule(); };
  $('#salesAdd').onclick = () => { if (curP) { SM.cart.add(curP.id); SM.toast('Salesman added ' + curP.short + ' to your cart 😎'); } };
  sales.addEventListener('mouseleave', () => { clearTimeout(salesTimer); salesTimer = setTimeout(hideSales, 4000); });
  salesTimer = setTimeout(showSales, 3500);

  /* ---------- random mall photos ---------- */
  const malls = ['assets/mall-main.jpg', 'assets/mall.jpg', 'assets/mall-street.jpg', 'assets/mall-top.jpg', 'assets/mall-entrance.jpg', 'assets/mall-atrium.jpg', 'assets/mall-heli.jpg'];
  const lines = ['for world rate experience', 'where helicopters are for sale 🚁', 'shop like never before 🛍️', 'the mall everyone is talking about', 'Susheer-approved shopping ✨', 'luxury aircraft & lovely apples'];
  const mp = $('#mallpop'); let mpTimer;
  const showMall = () => {
    if (!document.hidden) {
      $('#mallImg').src = pick(malls); $('#mallLine').textContent = pick(lines);
      mp.classList.add('show'); setTimeout(() => mp.classList.remove('show'), 6500);
    }
    mpTimer = setTimeout(showMall, 16000 + Math.random() * 14000);
  };
  $('#mallX').onclick = () => mp.classList.remove('show');
  mp.addEventListener('click', e => { if (!e.target.closest('.x')) location.href = 'about.html'; });
  mpTimer = setTimeout(showMall, 9000);

  SM.malls = malls;
})();
