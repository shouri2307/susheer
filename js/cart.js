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
    const cp = (() => { try { return JSON.parse(localStorage.getItem('susheer_coupon')); } catch (e) { return null; } })();
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
    const cdisc = cp ? Math.round(total * cp.pct / 100) : 0;
    window.__cartTotal = total - cdisc;
    main.innerHTML = `<div class="cart-wrap"><div><div class="sec-h" style="margin-top:20px"><h2>Your cart (${SM.cart.count()} items${free ? ' + ' + free + ' free' : ''})</h2></div>${lines}</div>
      <aside class="sum"><h3>Price details</h3>
        <div class="r"><span>Price</span><span>${inr(mrp)}</span></div>
        <div class="r"><span>Discount</span><span style="color:var(--green)">− ${inr(mrp - total)}</span></div>
        ${cp ? `<div class="r"><span>🎡 Coupon ${cp.code} (${cp.pct}%)</span><span style="color:var(--green)">− ${inr(cdisc)}</span></div>` : '<div class="r"><span>🎡 Coupon</span><a href="#" id="spinNav" style="color:var(--gold)">Spin to win one</a></div>'}
        <div class="r"><span>Delivery</span><span style="color:var(--green)">FREE</span></div>
        <div class="r t"><span>Total</span><span>${inr(total - cdisc)}</span></div>
        <button class="btn buy block" id="place" style="margin-top:14px">Place order</button>
        <p style="font-size:11px;color:var(--soft);margin-top:10px">Parody checkout — nothing is actually charged or shipped.</p>
      </aside></div>`;
  }

  document.addEventListener('click', e => {
    const rm = e.target.closest('[data-rm]'), q = e.target.closest('[data-q]');
    if (rm) { SM.cart.set(rm.dataset.rm, 0); render(); }
    if (q) { SM.cart.set(q.dataset.q, (SM.cart.get()[q.dataset.q] || 0) + +q.dataset.d); render(); }
    if (e.target.id === 'place') {
      SM.cart.clear(); SM.confetti(260); setTimeout(() => SM.confetti(160), 600);
      try { localStorage.removeItem('susheer_coupon'); } catch (e) {}
      main.innerHTML = `<div class="done"><div style="font-size:90px">🎉</div><h2>Order placed!</h2><p style="color:var(--soft)">Thank you for shopping at <b>Useless Shopping Mall</b>.<br>Plz visit Maisammaguda Mall for world rate experience.</p><p style="margin-top:22px"><a class="btn pri" href="index.html">Keep shopping</a></p></div>`;
    }
  });
  render();

  /* ---------- Susheer Pay: fake payment gateway with a QR code ---------- */
  function loadQR(cb) {
    if (window.QRCode) return cb();
    const sc = document.createElement('script'); sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'; sc.onload = cb; document.head.appendChild(sc);
  }
  function openPay(total) {
    const el = document.createElement('div'); el.className = 'paybg'; el.id = 'paybg';
    el.innerHTML = `<div class="paycard"><button class="xx" id="payX" aria-label="Close">×</button>
      <div class="pay-h"><b>Susheer Pay</b><small>Secure* checkout</small></div>
      <div class="pay-amt">${inr(total)}</div>
      <p class="pay-sub">Scan this QR code with any scanner app to pay</p>
      <div class="qrbox" id="qrbox"><span class="qrload">Generating QR…</span></div>
      <div class="pay-timer">QR expires in <b id="payT">04:59</b></div>
      <button class="btn buy block" id="payDone">I have paid ✔</button>
      <p class="pay-fine">*Parody gateway. No money is taken. Scanning the QR may cause laughter.</p></div>`;
    document.body.appendChild(el);
    loadQR(() => { const box = document.getElementById('qrbox'); if (!box) return; box.innerHTML = ''; new QRCode(box, { text: location.origin + '/scan.html', width: 190, height: 190, colorDark: '#14102b', colorLight: '#ffffff' }); });
    let left = 299; const t = setInterval(() => { const x = document.getElementById('payT'); if (!x) return clearInterval(t); left = left > 0 ? left - 1 : 299; x.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0'); }, 1000);
  }
  document.addEventListener('click', e => {
    if (e.target.id === 'place') { e.stopImmediatePropagation(); openPay(window.__cartTotal || 0); return; }
    if (e.target.id === 'payX' || e.target.id === 'paybg') { const b = document.getElementById('paybg'); if (b) b.remove(); return; }
    if (e.target.id === 'payDone') {
      const b = document.getElementById('paybg'); if (b) b.remove();
      SM.cart.clear(); SM.confetti(260); setTimeout(() => SM.confetti(160), 600);
      try { localStorage.removeItem('susheer_coupon'); } catch (err) {}
      main.innerHTML = `<div class="done"><div style="font-size:90px">🎉</div><h2>Order placed!</h2><p style="color:var(--soft)">Thank you for shopping at <b>Useless Shopping Mall</b>.<br>Plz visit Maisammaguda Mall for world rate experience.</p><p style="margin-top:22px"><a class="btn pri" href="index.html">Keep shopping</a></p></div>`;
    }
  }, true);
})();
