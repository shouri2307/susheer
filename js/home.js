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

  // deals rail
  const shuffled = P.filter(p => !p.flash).sort(() => Math.random() - .5).slice(0, 14);
  $('#deals').innerHTML = [P[0], P[1], ...shuffled].map(SM.card).join('');

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
    $('#grid').innerHTML = r.length ? r.slice(0, st.shown).map(SM.card).join('') : '<div class="empty">Nothing found. Even Susheer can\'t find that. Try another search.</div>';
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
