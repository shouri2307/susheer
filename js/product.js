(function () {
  const { SM, SM_DATA: D } = window, P = D.products, $ = SM.$, inr = SM.inr;
  const id = +(new URLSearchParams(location.search).get('id') || 0);
  const p = P[id] || P[0];
  document.title = p.name + ' — Susheer Shopping Mall';
  const off = Math.round((1 - p.price / p.mrp) * 100);
  let qty = 1;

  $('#crumb').innerHTML = `<a href="index.html">Home</a> › <a href="index.html?cat=${p.cat}">${p.catLabel}</a> › ${p.name}`;

  const media = p.gallery
    ? `<div class="gal">${p.gallery.map(g => `<figure><img src="${g[0]}" alt="${g[1]}"><figcaption>${g[1]}</figcaption></figure>`).join('')}</div>`
    : p.bogo
    ? `<div class="gal">
         <figure><img src="${p.img}" alt="Susheer"><figcaption>Susheer #1</figcaption></figure>
         <figure><img src="${p.img}" alt="Susheer — free copy"><span class="free">🎁 FREE</span><figcaption>Susheer #2 (on the house)</figcaption></figure>
       </div>`
    : SM.visual(p, 'big');

  $('#pdp').innerHTML = `
    <div class="pdp-media">${media}</div>
    <div>
      <h1>${p.name}</h1>
      ${p.rank ? `<div class="rankbig r${p.rank.n > 3 ? 'x' : p.rank.n}">${p.rank.label} · <b>${p.rank.sold.toLocaleString('en-IN')}</b> sold all-time</div>` : ''}
      ${p.taglines ? `${p.hot ? '<span class="hotline">🔥 FRESH &amp; HOT</span>' : ''}<span class="tagline" data-p="${p.id}">${p.taglines[0]}</span>` : ''}
      <div class="rate" style="margin-top:10px;font-size:14px"><span class="star">${p.rating} ★</span><span class="rv">${p.reviews.toLocaleString('en-IN')} ratings</span></div>
      <div class="big-price">${inr(p.price)} <s>${inr(p.mrp)}</s> <span class="off">${off}% off</span></div>
      ${p.hot ? `<div class="hot-box">🔥 <b>HOT!</b> <b>${SM.sold(2000, 7000)}</b> sold in the last hour · 👀 <b class="js-view">47</b> people viewing right now · <b>Only 1 left in the mall!</b>${p.flash ? ' · ⚡ <b>FLASH SALE</b> ends in <b class="js-timer">--:--:--</b>' : ''}</div>` : ''}
      ${p.bogo ? `<div class="bogo-box">🔥 FLASH SALE ends in <b class="js-timer">--:--:--</b> · <b>BUY 1, GET 1 FREE!</b> Add one and the second is automatically free.</div>` : ''}
      <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="offers">
        <div><b>Bank offer:</b> 10% instant discount on Susheer Pay cards</div>
        <div><b>Free delivery</b> across Hyderabad · helicopter delivery on request 🚁</div>
        <div><b>Bowenpally pickup:</b> collect from Susheer Shopping Mall, world rate experience</div>
      </div>
      <div class="qty"><span>Quantity</span><div class="stepper"><button id="qm" aria-label="Less">−</button><span id="q">1</span><button id="qp" aria-label="More">+</button></div></div>
      <div class="btns">
        <button class="btn pri" id="add">🛒 Add to cart</button>
        <button class="btn buy" id="buy">⚡ Buy now</button>
      </div>
      <h3>About this item</h3>
      <p class="desc">${p.desc}</p>
    </div>`;

  const rv = [...D.REVIEWS].sort(() => Math.random() - .5).slice(0, 6);
  $('#pdp').insertAdjacentHTML('afterend', `<section class="reviews"><div class="sec-h"><h2>⭐ Customer reviews <span style="font-size:14px">(100% real*)</span></h2><span>*as real as this mall</span></div><div class="rev-grid">${rv.map(r => `<div class="rev"><div class="rh"><span>${r[0]}</span><span class="st">${'★'.repeat(r[1])}${'☆'.repeat(5 - r[1])}</span></div>${r[2]}<br><small>✔ Verified Susheer buyer</small></div>`).join('')}</div></section>`);
  setInterval(() => { const v = $('.js-view'); if (v) v.textContent = 30 + Math.floor(Math.random() * 60); }, 1500);
  $('#qm').onclick = () => { qty = Math.max(1, qty - 1); $('#q').textContent = qty; };
  $('#qp').onclick = () => { qty = Math.min(10, qty + 1); $('#q').textContent = qty; };
  $('#add').onclick = () => { SM.cart.add(p.id, qty); SM.toast('Added to cart: ' + p.short + (p.bogo ? ' (+1 FREE 🎁)' : '')); };
  $('#buy').onclick = () => { SM.cart.add(p.id, qty); location.href = 'cart.html'; };

  $('#related').innerHTML = P.filter(x => x.cat === p.cat && x.id !== p.id).sort(() => Math.random() - .5).slice(0, 8).map(SM.card).join('');
})();
