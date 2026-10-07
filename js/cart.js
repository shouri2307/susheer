(function () {
  const { SM, SM_DATA: D } = window, P = D.products, $ = SM.$, inr = SM.inr;
  const main = $('#main');

  function render() {
    const c = SM.cart.get(), ids = Object.keys(c).filter(i => P[i]);
    if (!ids.length) {
      main.innerHTML = `<div class="done"><div style="font-size:80px">🛒</div><h2>Your Susheer cart is empty</h2><p style="color:var(--soft)">Even the helicopters are waiting for you.</p><p style="margin-top:20px"><a class="btn pri" href="index.html">Go shopping</a></p></div>`;
      return;
    }
    let mrp = 0, total = 0, free = 0;
    const lines = ids.map(i => {
      const p = P[i], q = c[i]; mrp += p.mrp * q; total += p.price * q; if (p.bogo) free += q;
      return `<div class="line">${SM.visual(p)}
        <div><a href="product.html?id=${p.id}"><h3>${p.name}</h3></a>
          <div style="color:var(--soft);font-size:13px">${inr(p.price)} each</div>
          ${p.bogo ? `<div class="sub">🎁 + ${q} FREE (Buy 1 Get 1)</div>` : ''}
          <button class="rm" data-rm="${i}">Remove</button></div>
        <div class="stepper"><button data-q="${i}" data-d="-1">−</button><span>${q}</span><button data-q="${i}" data-d="1">+</button></div>
      </div>`;
    }).join('');
    main.innerHTML = `<div class="cart-wrap"><div><div class="sec-h" style="margin-top:20px"><h2>Your cart (${SM.cart.count()} items${free ? ' + ' + free + ' free' : ''})</h2></div>${lines}</div>
      <aside class="sum"><h3>Price details</h3>
        <div class="r"><span>Price</span><span>${inr(mrp)}</span></div>
        <div class="r"><span>Discount</span><span style="color:var(--green)">− ${inr(mrp - total)}</span></div>
        <div class="r"><span>Delivery</span><span style="color:var(--green)">FREE</span></div>
        <div class="r t"><span>Total</span><span>${inr(total)}</span></div>
        <button class="btn buy block" id="place" style="margin-top:14px">Place order</button>
        <p style="font-size:11px;color:var(--soft);margin-top:10px">Parody checkout — nothing is actually charged or shipped.</p>
      </aside></div>`;
  }

  document.addEventListener('click', e => {
    const rm = e.target.closest('[data-rm]'), q = e.target.closest('[data-q]');
    if (rm) { SM.cart.set(rm.dataset.rm, 0); render(); }
    if (q) { SM.cart.set(q.dataset.q, (SM.cart.get()[q.dataset.q] || 0) + +q.dataset.d); render(); }
    if (e.target.id === 'place') {
      SM.cart.clear();
      main.innerHTML = `<div class="done"><div style="font-size:90px">🎉</div><h2>Order placed!</h2><p style="color:var(--soft)">Thank you for shopping at <b>Susheer Shopping Mall</b>.<br>Plz visit Bowenpally Mall for world rate experience.</p><p style="margin-top:22px"><a class="btn pri" href="index.html">Keep shopping</a></p></div>`;
    }
  });
  render();
})();
