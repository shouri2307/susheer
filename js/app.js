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
    add(id, q = 1) { const c = load(); c[id] = Math.min(10, (c[id] || 0) + q); save(c); SM.refreshCart(); SM.thanks(); },
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
  SM.visual = (p, cls = '') => {
    if (p.img) return `<div class="vis photo ${p.fit ? 'fit' : ''} ${cls}"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>`;
    const im = p.photo ? `<img class="stock" src="${p.photo}" alt="${p.name}" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">` : '';
    return `<div class="vis ${p.photo ? 'hasimg' : ''} ${cls}" style="--c:${p.color}"><span class="emo">${p.emoji}</span>${im}</div>`;
  };
  // live "sold" numbers (random, for the laughs)
  SM.sold = (min = 900, max = 9000) => { const n = Math.floor(min + Math.random() * (max - min)); return `<span class="js-n" data-n="${n}">${n.toLocaleString('en-IN')}</span>`; };
  setInterval(() => document.querySelectorAll('.js-n').forEach(el => { const n = +el.dataset.n + 1 + Math.floor(Math.random() * 9); el.dataset.n = n; el.textContent = n.toLocaleString('en-IN'); }), 1800);
  SM.card = p => {
    const off = Math.round((1 - p.price / p.mrp) * 100);
    return `<article class="card ${p.flash ? 'flash' : ''} ${p.hot ? 'hot' : ''}">
      <a href="product.html?id=${p.id}" class="card-link">
        ${p.bogo ? '<span class="ribbon">BUY 1 GET 1 FREE</span>' : ''}${p.hot ? '<span class="hottag">🔥 HOT</span>' : ''}${p.rank ? `<span class="rankbadge r${p.rank.n > 3 ? 'x' : p.rank.n}">${p.rank.label}</span>` : ''}
        ${SM.visual(p)}
        <h3>${p.name}</h3>
        <div class="rate"><span class="star">${p.rating} ★</span><span class="rv">(${p.reviews.toLocaleString('en-IN')})</span></div>
        <div class="price"><b>${inr(p.price)}</b><s>${inr(p.mrp)}</s><span class="off">${off}% off</span></div>
        ${p.taglines ? `<span class="tagline" data-p="${p.id}">${p.taglines[0]}</span>` : ''}
        ${p.hot || p.flash ? `<div class="sold">🔥 ${SM.sold(p.hot ? 1200 : 3000, p.hot ? 4800 : 9000)} sold in last hour · selling fast!</div>` : ''}
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
      <span class="fb-msg" id="fbMsg"></span>
      <span class="fb-timer" id="fbTimer">--:--:--</span>
      <a class="fb-btn" id="fbBtn" href="product.html?id=0">Buy now →</a>
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
        <div><b>Shop</b><a href="index.html?cat=helicopters">Helicopters</a><a href="index.html?cat=cars">Cars</a><a href="index.html?cat=planes">Planes</a><a href="index.html?cat=jaggu">Jaggu 🔥</a><a href="index.html?cat=grocery">Grocery</a><a href="index.html?cat=mobiles">Mobiles</a><a href="index.html?cat=womens">Fashion</a><a href="product.html?id=0">Flash Sale</a></div>
        <div><b>Mall</b><a href="about.html">About the Mall</a><a href="about.html#gallery">Gallery</a><a href="cart.html">Cart</a></div>
      </div>
      <p class="fine">Susheer Shopping Mall is a parody project made for fun and is not affiliated with any real retailer. No real orders, payments or humans are sold. Product photos are from Wikimedia Commons (free licences). 😄</p>
    </footer>
    <aside class="salesman" id="salesman" aria-live="polite">
      <button class="x" aria-label="Dismiss Mr. KK" id="salesX">×</button>
      <div class="kk-wrap" id="kkWrap"><img class="kk-photo" src="assets/salesman-full.jpg" alt="Mr. KK"><div class="kkfx" id="kkFx"></div><span class="kk-name">MR. KK</span></div>
      <div class="bub"><span class="who">Mr. KK says:</span><p id="salesTxt"></p>
        <div class="srow"><a id="salesGo" href="#" class="sgo">View offer</a><button id="salesAdd" class="sadd">Add 🛒</button></div></div>
    </aside>
    <div class="thanks" id="thanks" aria-hidden="true">
      <div class="t-face"><div class="t-zoom"><img src="assets/salesman-full.jpg" alt=""></div><span class="t-heart">❤️</span></div>
      <div class="t-txt">Thank you boss! 😘</div>
    </div>
    <aside class="jagpop" id="jagpop">
      <button class="x" aria-label="Close" id="jagX">×</button>
      <a href="product.html?id=${D.LOCAL_JAG}"><img src="assets/jagadeesh-flash.jpg" alt="Local Langadeesh flash sale">
        <div class="jp-t"><span class="jp-tag">⚡ LOCAL FLASH SALE</span><b>Local Langadeesh is selling out EXTREMELY fast!</b>
        <small><span id="jagLeft">7</span> left · DM <u>Global Langadeesh</u> for contact details</small></div></a>
    </aside>
    <aside class="mallpop" id="mallpop">
      <button class="x" aria-label="Close" id="mallX">×</button>
      <img id="mallImg" src="" alt="Susheer Shopping Mall">
      <div class="mp-t"><b>Plz visit Bowenpally Mall</b><span id="mallLine">for world rate experience</span></div>
    </aside>`);
  SM.refreshCart();

  // flash bar rotates through every flash-sale item
  const FB = [
    ['<b>SUSHEER FOR SALE</b> — FLASH SALE FOR <b>₹50K ONLY</b> — ONE-ON-ONE: <b>BUY 1, GET 1 FREE!</b>', 0],
    ['🥈 <b>LOCAL LANGADEESH</b> — #2 MOST SOLD — FLASH SALE <b>₹75K</b> — <b>SELLING OUT FAST!</b>', D.LOCAL_JAG],
    ['🏆 <b>GLOBAL LANGADEESH</b> — #1 MOST SOLD EVER — FLASH SALE <b>₹1 CRORE</b> — <b>ONLY 1 LEFT!</b>', 1]
  ];
  let fbi = 0;
  const fbShow = () => { const m = $('#fbMsg'); m.style.animation = 'none'; void m.offsetWidth; m.style.animation = ''; m.innerHTML = FB[fbi][0]; $('#fbBtn').href = 'product.html?id=' + FB[fbi][1]; fbi = (fbi + 1) % FB.length; };
  fbShow(); setInterval(fbShow, 4800);

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
  // Mr. KK reacts around his real photo with floating emoji
  const FX = { kiss: ['😘', '❤️', '💖', '💗'], wink: ['😉', '✨', '⭐'], wow: ['😱', '💦', '❗'], happy: ['😄', '🎉', '✨'] };
  SM.kkMood = (m, ms = 0) => {
    const w = $('#kkWrap'), fx = $('#kkFx'); if (!w || !FX[m]) return;
    w.dataset.mood = m; setTimeout(() => { if (w.dataset.mood === m) w.dataset.mood = ''; }, ms || 1600);
    for (let i = 0; i < 6; i++) setTimeout(() => {
      const e = document.createElement('span'); e.textContent = pick(FX[m]);
      e.style.cssText = `left:${15 + Math.random() * 70}%;font-size:${16 + Math.random() * 14}px`; fx.appendChild(e); setTimeout(() => e.remove(), 1800);
    }, i * 220);
  };
  const showSales = () => {
    if (document.hidden || sales.matches(':hover')) return schedule();
    const pool = P.filter(p => !p.flash);
    curP = Math.random() < 0.18 ? P[0] : pick(pool);
    $('#salesTxt').textContent = curP.flash
      ? 'SUSHEER himself is on FLASH SALE — ₹50,000 only and BUY 1 GET 1 FREE! Run!!'
      : pick(pitches)(curP);
    $('#salesGo').href = 'product.html?id=' + curP.id;
    sales.classList.add('show');
    salesTimer = setTimeout(hideSales, 8500);
  };
  const hideSales = () => { sales.classList.remove('show'); schedule(); };
  const schedule = () => { clearTimeout(salesTimer); salesTimer = setTimeout(showSales, 6000 + Math.random() * 9000); };
  $('#salesX').onclick = () => { SM.kkMood('wow', 900); sales.classList.remove('show'); clearTimeout(salesTimer); schedule(); };
  $('#salesAdd').onclick = () => { if (curP) { SM.cart.add(curP.id); SM.kkMood('kiss', 2600); SM.toast('Mr. KK added ' + curP.short + ' to your cart 😎'); } };
  $('#kkWrap').addEventListener('mouseenter', () => SM.kkMood('wink', 1600));
  sales.addEventListener('mouseleave', () => { clearTimeout(salesTimer); salesTimer = setTimeout(hideSales, 4000); });
  salesTimer = setTimeout(showSales, 3500);

  /* ---------- random mall photos ---------- */
  const malls = ['assets/mall-main.jpg', 'assets/mall.jpg', 'assets/mall-street.jpg', 'assets/mall-top.jpg', 'assets/mall-entrance.jpg', 'assets/mall-atrium.jpg', 'assets/mall-heli.jpg'].concat(Array.from({ length: 12 }, (_, i) => `assets/mall-in-${i + 1}.jpg`));
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

  /* ---------- salesman thank-you zoom (face -> lips + heart) ---------- */
  const th = $('#thanks'); let thT;
  SM.thanks = () => {
    if (th.classList.contains('show')) return;
    th.querySelectorAll('.fh').forEach(h => h.remove());
    for (let i = 0; i < 14; i++) {
      const h = document.createElement('span'); h.className = 'fh'; h.textContent = pick(['❤️', '💖', '💗', '😘']);
      h.style.cssText = `left:${10 + Math.random() * 80}%;animation-delay:${0.9 + Math.random() * 1.2}s;font-size:${22 + Math.random() * 30}px`;
      th.appendChild(h);
    }
    th.classList.add('show'); clearTimeout(thT);
    thT = setTimeout(() => th.classList.remove('show'), 3200);
  };

  /* ---------- Local Langadeesh flash-sale side popup ---------- */
  const jp = $('#jagpop'); let left = 7;
  const showJag = () => {
    if (!document.hidden) {
      left = 2 + Math.floor(Math.random() * 9); $('#jagLeft').textContent = left;
      jp.classList.add('show'); setTimeout(() => jp.classList.remove('show'), 7500);
    }
    setTimeout(showJag, 13000 + Math.random() * 14000);
  };
  $('#jagX').onclick = () => jp.classList.remove('show');
  setTimeout(showJag, 6500);

  SM.malls = malls;
})();
