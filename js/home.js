(function () {
  const { SM, SM_DATA: D } = window, P = D.products, $ = SM.$;
  const qs = new URLSearchParams(location.search);
  const st = { cat: qs.get('cat') || '', q: (qs.get('q') || '').toLowerCase().trim(), sort: 'pop', min: '', max: '', shown: 24 };
  const STEP = 24;

  $('#statN').textContent = P.length + '+';
  $('#statD').textContent = D.CATS.length;

  // hero: crossfading mall photos
  const bg = $('#heroBg');
  const pics = ['assets/mall.jpg', 'assets/mall-street.jpg', 'assets/mall-top.jpg', 'assets/mall-entrance.jpg', 'assets/mall-atrium.jpg', 'assets/mall-heli.jpg', 'assets/mall-main.jpg'];
  bg.innerHTML = pics.map(s => `<i style="background-image:url(${s})"></i>`).join('');
  let hi = 0; const hs = bg.children;
  const flip = () => { [...hs].forEach(e => e.classList.remove('on')); void hs[hi].offsetWidth; hs[hi].classList.add('on'); hi = (hi + 1) % hs.length; };
  flip(); setInterval(flip, 5000);

  // flash-sale row for the Jaggu items
  $('#flashRow').innerHTML = [D.LOCAL_JAG, D.LOCAL_LANG, D.GLOBAL_LANG].map(i => P[i]).map(p => `<a class="fr" href="product.html?id=${p.id}">
    <img src="${p.img}" alt="${p.name}"><div><span class="hottag" style="position:static">⚡ FLASH</span><b>${p.name}</b><span class="tagline" data-p="${p.id}">${p.taglines[0]}</span>
    <span class="frp">${SM.inr(p.price)} <s>${SM.inr(p.mrp)}</s></span><small>🔥 ${SM.sold(900, 6000)} sold · ends in <span class="js-timer">--:--:--</span></small></div></a>`).join('');

  // deals rail
  const shuffled = P.filter(p => !p.flash).sort(() => Math.random() - .5).slice(0, 14);
  $('#deals').innerHTML = [P[0], P[1], P[D.LOCAL_JAG], P[D.LOCAL_LANG], P[D.GLOBAL_LANG], ...shuffled].map(SM.card).join('');

  // category chips + sidebar
  const counts = {}; P.forEach(p => counts[p.cat] = (counts[p.cat] || 0) + 1);
  const chip = (id, label, icon) => `<a href="#" data-cat="${id}" class="${st.cat === id ? 'on' : ''}">${icon} ${label}</a>`;
  const renderNav = () => {
    $('#chips').innerHTML = chip('', 'All', '🏬') + D.CATS.map(c => chip(c.id, c.label, c.icon)).join('');
    $('#side').innerHTML = `<h4>Departments</h4>` +
      [{ id: '', label: 'All departments', icon: '🏬' }, ...D.CATS].map(c => `<a href="#" data-cat="${c.id}" class="cat ${st.cat === c.id ? 'on' : ''}"><span>${c.icon}</span>${c.label}<small>${c.id ? counts[c.id] : P.length}</small></a>`).join('') +
      `<h4 style="margin-top:18px">Price (₹)</h4><div class="price-f"><input type="number" id="pmin" placeholder="Min" value="${st.min}"><input type="number" id="pmax" placeholder="Max" value="${st.max}"></div>`;
  };

  function list() {
    let r = P.filter(p => (!st.cat || p.cat === st.cat) && (!st.q || (p.name + ' ' + p.catLabel).toLowerCase().includes(st.q)) &&
      (!st.min || p.price >= +st.min) && (!st.max || p.price <= +st.max));
    const s = {
      lo: (a, b) => a.price - b.price, hi: (a, b) => b.price - a.price, rate: (a, b) => b.rating - a.rating,
      disc: (a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp, pop: (a, b) => b.reviews - a.reviews
    }[st.sort];
    return r.sort(s);
  }
  function render(reset) {
    if (reset) st.shown = STEP;
    const r = list(), cat = D.CATS.find(c => c.id === st.cat);
    $('#title').textContent = st.q ? `Results for "${st.q}"` : cat ? cat.icon + ' Susheer ' + cat.label : 'All Susheer products';
    $('#count').textContent = r.length + ' Susheer products';
    $('#grid').innerHTML = r.length ? r.slice(0, st.shown).map((p, i) => (i && i % 12 === 0 ? SM.factCard() : '') + SM.card(p)).join('') : '<div class="empty">Nothing found. Even Susheer can\'t find that. Try another search.</div>';
    $('#more').style.display = r.length > st.shown ? '' : 'none';
    renderNav();
  }

  document.addEventListener('click', e => {
    const a = e.target.closest('[data-cat]'); if (!a) return;
    e.preventDefault(); st.cat = a.dataset.cat; render(true);
    history.replaceState(null, '', st.cat ? '?cat=' + st.cat : location.pathname);
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
  });
  document.addEventListener('input', e => {
    if (e.target.id === 'pmin' || e.target.id === 'pmax') {
      st.min = $('#pmin').value; st.max = $('#pmax').value;
      clearTimeout(render.t); render.t = setTimeout(() => { const f = document.activeElement.id; render(true); const el = document.getElementById(f); if (el) { el.focus(); el.setSelectionRange(99, 99); } }, 350);
    }
  });
  $('#sort').onchange = e => { st.sort = e.target.value; render(true); };
  $('#more').onclick = () => { st.shown += STEP; render(); };
  render(true);
  if (st.cat || st.q) window.addEventListener('load', () => { document.documentElement.style.scrollBehavior = 'auto'; document.getElementById('shop').scrollIntoView(); document.documentElement.style.scrollBehavior = ''; });
})();

// typewriter, category band, floating emojis, rotating fact bar
(function () {
  const { SM, SM_DATA: D } = window, $ = SM.$;
  const words = ['Apples 🍎', 'Helicopters 🚁', 'Sofas 🛋️', 'Luxury Aircraft ✈️', 'Smartphones 📱', 'Sports Cars 🏎️', 'Jaggu 🔥', 'Biryani Masala 🍛', 'Yachts 🛥️'];
  let wi = 0, ci = 0, del = false; const el = $('#typer');
  (function type() {
    const w = words[wi]; ci += del ? -1 : 1; el.textContent = w.slice(0, ci);
    let t = del ? 40 : 90;
    if (!del && ci === w.length) { del = true; t = 1400; } else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; t = 300; }
    setTimeout(type, t);
  })();
  const pill = D.CATS.map(c => `<a href="index.html?cat=${c.id}">${c.icon} ${c.label}</a>`).join('');
  $('#catband').innerHTML = `<div>${pill}${pill}</div>`;
  const hero = $('#hero'); ['🚁', '🍎', '🚗', '✈️', '🛋️', '📱', '🛍️', '🥭', '🎁'].forEach((e, i) => {
    const f = document.createElement('span'); f.className = 'float-emo'; f.textContent = e;
    f.style.cssText = `left:${6 + i * 10.5}%;bottom:-40px;animation-duration:${14 + (i % 4) * 4}s;animation-delay:${-i * 3}s;font-size:${26 + (i % 3) * 10}px`; hero.appendChild(f);
  });
  const ft = $('#factTxt'); const nf = () => { const f = SM.facts[Math.floor(Math.random() * SM.facts.length)]; ft.style.animation = 'none'; void ft.offsetWidth; ft.style.animation = ''; ft.textContent = f[0] + ' ' + f[1]; };
  nf(); setInterval(nf, 7000);
})();
