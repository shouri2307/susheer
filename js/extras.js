/* Engagement extras: support chat + feedback, spin wheel, social proof, fun facts, tilt, confetti, glow */
(function () {
  const { SM, SM_DATA: D } = window, P = D.products, $ = SM.$, pick = SM.pick, inr = SM.inr;
  const safe = (fn, d) => { try { return fn(); } catch (e) { return d; } };

  /* ---------- rotating taglines (Jaggu items) ---------- */
  setInterval(() => document.querySelectorAll('.tagline[data-p]').forEach(el => {
    const t = P[+el.dataset.p].taglines, i = ((+el.dataset.i || 0) + 1) % t.length;
    el.dataset.i = i; el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; el.textContent = t[i];
  }), 2800);

  /* ---------- mall PA announcements (funny) ---------- */
  const PA = [
    'Attention shoppers: a helicopter is parked in Aisle 4. Please do not honk.',
    'Will the owner of a very confident hoodie please come to the Flash Sale counter.',
    'Lost & Found: one (1) wallet, three (3) selfies, and one (1) size-L diaper belonging to Mr. DD.',
    'Flash sale alert: Susheer is ₹50K only. Mr. KK is already smiling.',
    'The food court biryani has been sold out 4 times today. Please do not cry.',
    'Reminder: Jagadeesh, our #1 most sold product ever, is non-refundable, non-returnable and non-negotiable.',
    'Customer in Aisle 7: your cart has 14 aircraft. We are proud of you.',
    'Security to Gate 2: someone asked for a discount on the escalator.',
    'Mr. Diaper Dilip is selling out fast. Admirers, please form a single line.',
    'Parents: Mr. Diaper Dilip is available in sizes S, M, L and XL. Pampers sold separately.',
    'Aisle 9: someone asked Mr. DD if he is leak-proof. He confirmed. Applause.',
    'Allen Sully has submitted a chit. And a pull request. Both are suspiciously well-formatted.',
    'Silent Satyam is fed up. Again. Please offer him tea and a quiet corner.',
    'CR Jaggu is standing in the same spot repeating one line. Please do not run him over (he respawns anyway).',
    'Smiley Shouri has kicked another benchmark. Please repair the wall.',
    'Chearean.c has compiled his code on the first try. Please remain calm and applaud quietly.',
    'Mr. KK has finished cleaning the canteen. Well, he has started a nap near it. Please do not disturb.',
    'Vishneamon is available at the Gadget Counter. Please do not hand him anything you want to keep closed.',
    'Long Jump Harish is making milkshakes in the food court. Please stand back from the jump zone.',
    'Chetaku Rohit has parked his Chetak in the atrium after doing 100+ km/h in the parking lot. The horn has been confiscated. Again.',
    'Lean Baddie is spotting someone on the bench press. The aura is being felt by all floors.',
    'Sullileni Sridhar will perform on Level 2 shortly. Earplugs available at Aisle 9.',
    'Susheer, our #3 bestseller, is signing autographs at the Flash Sale counter.',
    'Plz visit Bowenpally Mall for world rate experience. This message repeats every 40 seconds.'
  ];
  document.body.insertAdjacentHTML('beforeend', '<div class="pa" id="pa" role="status"><span class="sp">📢</span><span><b>MALL ANNOUNCEMENT:</b> <span id="paTxt"></span></span></div>');
  const showPA = () => {
    if (!document.hidden) { $('#paTxt').textContent = pick(PA); const el = $('#pa'); el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 6500); }
    setTimeout(showPA, 30000 + Math.random() * 25000);
  };
  setTimeout(showPA, 15000);

  /* ---------- fun facts (also used by home.js) ---------- */
  SM.facts = [
    ['🚁', 'The Susheer Shopping Mall rooftop has more helicopters than the nearest three bus stops combined.'],
    ['🍎', 'An apple a day keeps the doctor away — a Susheer Apple a day keeps the cashier busy.'],
    ['🐙', 'Octopuses have three hearts. Mr. KK has one, and it belongs to our customers. 😘'],
    ['🛒', 'The first shopping cart was invented in 1937 in Oklahoma. Ours has a helicopter lane.'],
    ['🍯', 'Honey never spoils. Susheer Honey (500 g) also never spoils — we sell it too fast.'],
    ['🏬', 'Bowenpally Mall is the only mall where you can buy aircraft and a banana in the same bill.'],
    ['⏰', 'Flash sale prices reset every midnight. Mr. KK stays up to watch the counter.'],
    ['📱', 'More people own a mobile phone than a toothbrush. Buy both at Susheer — we have it all.'],
    ['🥭', 'Mangoes are the national fruit of India. Susheer Mangoes are the national fruit of Bowenpally.'],
    ['✈️', 'A Boeing 747 has about 6 million parts. Our Passenger Airliner ships with all of them. Mostly.'],
    ['😴', 'Cats sleep 70% of their lives. Susheer Cat Scratcher Tower is built for the other 30%.'],
    ['🍌', 'Bananas are berries; strawberries are not. Susheer Fruit Dept. has opinions about this.'],
    ['🎯', '9 out of 10 shoppers at Susheer Mall say "Plz visit Bowenpally Mall for world rate experience."'],
    ['👶', 'Mr. Diaper Dilip absorbs 99% of your problems. The other 1% is the EMI.'],
    ['🧠', 'Fun fact: this entire mall was built with pure confidence and CSS.']
  ];
  SM.factCard = () => { const f = pick(SM.facts); return `<div class="factcard"><span class="fe">${f[0]}</span><div><small>Susheer fun fact</small><p>${f[1]}</p></div></div>`; };

  /* ---------- cursor glow + card tilt (desktop only) ---------- */
  if (matchMedia('(hover:hover)').matches) {
    const g = document.createElement('div'); g.className = 'glow'; document.body.appendChild(g);
    addEventListener('mousemove', e => { g.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; }, { passive: true });
    document.addEventListener('mousemove', e => {
      const c = e.target.closest && e.target.closest('.card'); if (!c || c.classList.contains('factcard')) return;
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg'); c.style.setProperty('--rx', (-y * 9).toFixed(2) + 'deg');
    }, { passive: true });
    document.addEventListener('mouseout', e => { const c = e.target.closest && e.target.closest('.card'); if (c && !c.contains(e.relatedTarget)) { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); } });
  }

  /* ---------- confetti ---------- */
  SM.confetti = (n = 160) => {
    const cv = document.createElement('canvas'); cv.className = 'confetti'; cv.width = innerWidth; cv.height = innerHeight; document.body.appendChild(cv);
    const x = cv.getContext('2d'), cols = ['#ffd23f', '#ff3d81', '#7c5cff', '#27e1ff', '#2ee59d', '#fff'];
    const ps = Array.from({ length: n }, () => ({ x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight * .6, vx: (Math.random() - .5) * 16, vy: -8 - Math.random() * 14, s: 5 + Math.random() * 7, c: pick(cols), r: Math.random() * 6, vr: (Math.random() - .5) * .4 }));
    let t = 0; (function f() {
      x.clearRect(0, 0, cv.width, cv.height); t++;
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .42; p.vx *= .992; p.r += p.vr; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * .6); x.restore(); });
      if (t < 170) requestAnimationFrame(f); else cv.remove();
    })();
  };

  /* ---------- Mr. KK reacts to every add-to-cart ---------- */
  const baseThanks = SM.thanks;
  SM.thanks = () => { if (document.getElementById('salesman').classList.contains('show')) SM.kkMood && SM.kkMood('kiss', 2600); baseThanks(); };

  /* ---------- social proof toasts ---------- */
  const names = ['Ramesh', 'Priya', 'Venkat', 'Anjali', 'Sai', 'Lakshmi', 'Rahul', 'Fatima', 'Kiran', 'Divya', 'Arjun', 'Meena', 'Ganesh', 'Sneha'];
  const places = ['Bowenpally', 'Secunderabad', 'Kukatpally', 'Begumpet', 'Alwal', 'Madhapur', 'Tarnaka', 'Marredpally'];
  const verbs = ['just bought', 'just added to cart', 'is eyeing', 'just ordered'];
  const proof = document.createElement('div'); proof.className = 'proof'; document.body.appendChild(proof);
  const showProof = () => {
    if (!document.hidden) {
      const p = pick(P.filter(x => x.id > 1)), thumb = p.photo ? `background-image:url(${p.photo})` : '';
      proof.innerHTML = `<div class="pi" style="${thumb}">${p.photo ? '' : p.emoji}</div><div><b>${pick(names)}</b> from ${pick(places)} ${pick(verbs)}<br><b>${p.short}</b><small>${1 + Math.floor(Math.random() * 29)} minutes ago · verified ✔</small></div>`;
      proof.classList.add('show'); setTimeout(() => proof.classList.remove('show'), 5200);
    }
    setTimeout(showProof, 11000 + Math.random() * 9000);
  };
  setTimeout(showProof, 8000);

  /* ---------- support chat + feedback ---------- */
  document.body.insertAdjacentHTML('beforeend', `
    <button class="fab" id="fab" aria-label="Open Ganda Chatbot"><span class="kkmini"><img src="assets/ganda.jpg" alt="Ganda Chatbot"></span><i>Ganda Bot</i></button>
    <div class="gandareveal" id="gandaReveal" aria-hidden="true"><img src="assets/ganda.jpg" alt=""><span>GANDA CHATBOT</span></div>
    <section class="chat" id="chat" aria-label="Ganda Chatbot">
      <div class="chat-h"><span class="av"><img src="assets/ganda.jpg" alt="Ganda Chatbot"></span><div><b>Ganda Chatbot · Customer Support</b><small>🟢 Online · replies in 2 seconds</small></div><button id="chatX" aria-label="Close">×</button></div>
      <div class="chat-b" id="chatB"></div>
      <div class="qr" id="qr"></div>
      <form class="chat-f" id="chatF"><input id="chatI" placeholder="Ask the Ganda Chatbot anything…" autocomplete="off"><button>Send</button></form>
    </section>`);
  const chat = $('#chat'), body = $('#chatB'), qr = $('#qr');
  const say = (t, who = 'bot', html) => { const m = document.createElement('div'); m.className = 'msg ' + who; if (html) m.innerHTML = t; else m.textContent = t; body.appendChild(m); body.scrollTop = body.scrollHeight; return m; };
  const typing = cb => { const t = document.createElement('div'); t.className = 'msg bot typing'; t.innerHTML = '<i></i><i></i><i></i>'; body.appendChild(t); body.scrollTop = 1e6; setTimeout(() => { t.remove(); cb(); }, 600 + Math.random() * 500); };
  const chips = a => { qr.innerHTML = a.map(x => `<button>${x}</button>`).join(''); };
  const MAIN = ['🚚 Delivery', '↩️ Refunds', '🎡 Discounts', '🚁 Helicopters', '⭐ Give feedback'];
  const KB = [
    [/deliver|ship|track|order status|where.*order/, 'We deliver within 30 minutes in Bowenpally, same-day across Hyderabad. Orders above ₹1 crore are delivered by helicopter. 🚁 (Yes, really. Pilot not included.)'],
    [/refund|return|replace|cancel/, '7-day returns on everything except Jagadeesh — he is one of a kind and non-returnable. 😄 Refunds reach your Susheer Pay in 2 minutes (in our imagination).'],
    [/discount|offer|coupon|deal|cheap|sale|wheel|spin/, 'Spin the wheel for a coupon! 🎡 Tap the "Spin & Win" button at the top. Also: Susheer is on FLASH SALE for ₹50K — buy 1 get 1 FREE.'],
    [/heli|plane|jet|aircraft|car\b|cars|boat|yacht|bike/, 'Our Helicopters, Cars, Planes, Bikes and Boats departments are live! Check the sidebar on the shop page. Test flights on the rooftop every Sunday. ✈️'],
    [/jagadeesh|langadeesh|dilip|diaper|\bdd\b|jaggu/, 'Ah, the legends! 🏆 Jagadeesh is the #1 most sold product in Susheer Mall history (₹1 crore, only 1 left!). 🥈 Mr. Diaper Dilip (Mr. DD) is #2 and on flash sale — fully absorbent, Pampers sold separately. 🥉 Susheer himself is #3. DM Jagadeesh for contact details. 📩'],
    [/susheer|flash|50k|50,000/, 'Susheer himself is our #3 best-seller! 🥉 Flash sale: ₹50,000, BUY 1 GET 1 FREE. Mr. DD and Jagadeesh are on flash sale too!'],
    [/\bkk\b|salesman|canteen|clean/, 'Mr. KK is our Senior Salesman, Canteen Cleaner and professional Napper. 😴 Hardworking index: 2%. Zoom in on him on the "Meet Mr. KK" page — available for hire at ₹9,999/day (work not guaranteed), never for sale.'],
    [/chearean|coder|programm|developer|\bcode\b|best product/, 'Chearean.c is our BEST PRODUCT 👑 — programmer, coder and all-rounder, 4.9★ from 1,00,000 ratings and perfectly expensive (₹5 crore). Compiles on the first try. 💻'],
    [/vishne|doraemon|gadget|batsm|opener/, 'Vishneamon (#4 best-seller) opens gadgets AND batsmen. Hand him a box or a bat, he opens it. Pancake tower on request. 🔧🏏'],
    [/harish|long jump|milkshake|shake/, 'Long Jump Harish (#5) jumps long and makes milkshakes. Book him (Bulley) as a service for ₹14,999/day. Landing not guaranteed, milkshake is. 🏃🥤'],
    [/rohit|chetak|chapri|kadha/, 'Chetaku Rohit, our Official Chapri (#6), rides at a minimum of 100 km/h and sells Rohit\'s Special Kadha. Horn included. 🛵🍵'],
    [/baddie|gym|aura|lean/, 'Lean Baddie (#7) does gym and baddiness. Aura +1000, lean mode permanent. 💪😎'],
    [/sridhar|sullileni|sing|dance/, 'Sullileni Sridhar (#8) sings and dances. Book him per show for ₹39,999. 🎤💃'],
    [/allen|sully|chit/, 'Allen Sully (#12) specialises in chits and coding: tiny notes, tidy commits. Chits sold separately. 📝💻'],
    [/shouri|smiley|kick|benchmark/, 'Smiley Shouri (#10) is the benchmark of product standards — a professional butt-kicker who smiles throughout. Just a notch below Chearean.c. 😁🦵'],
    [/satyam|silent|fed up|grumbl/, 'Silent Satyam (#12, last on the charts) specialises in getting fed up. Repeatedly. Tea helps, briefly. 😩☕'],
    [/cr jaggu|npc|gta/, 'CR Jaggu (#11) is a premier GTA NPC. Stands still, repeats one line, respawns after every run-over. 🎮'],
    [/pay|upi|card|cod|cash|qr|gateway/, 'At checkout, scan the Susheer Pay QR code to pay. Fair warning: the QR leads somewhere funny. We accept hugs but they do not clear the bill. 🤗😂'],
    [/hi\b|hello|hey|namaste|yo\b/, 'Hello boss! 😘 I\'m the Ganda Chatbot. How can I help you today?'],
    [/thank|thanks|tq/, 'Thank you boss! Plz visit Bowenpally Mall for world rate experience. 💖'],
    [/where|address|location|bowenpally|visit|open/, 'Susheer Shopping Mall is in Bowenpally, Hyderabad. Open 9 AM – 11 PM. Look for the tall glowing tower with helicopters on top. 🏬']
  ];
  const feedback = () => {
    say('How was your Susheer experience? Tap a star:');
    const st = document.createElement('div'); st.className = 'msg bot'; st.innerHTML = '<div class="stars">' + [1, 2, 3, 4, 5].map(n => `<button data-s="${n}">⭐</button>`).join('') + '</div>'; body.appendChild(st); body.scrollTop = 1e6;
    st.addEventListener('click', e => {
      const b = e.target.closest('[data-s]'); if (!b) return; const n = +b.dataset.s;
      st.querySelectorAll('button').forEach((x, i) => x.classList.toggle('on', i < n)); st.style.pointerEvents = 'none';
      safe(() => { const f = JSON.parse(localStorage.getItem('susheer_feedback') || '[]'); f.push({ stars: n, at: Date.now() }); localStorage.setItem('susheer_feedback', JSON.stringify(f)); });
      say(n + ' ⭐', 'me');
      typing(() => { say(n >= 4 ? 'Wow, thank you boss! 😘 Want to tell us what you loved? Type below.' : 'Oops, sorry about that! 😢 Tell us what went wrong — type below and the Ganda Chatbot will fix it (she says).'); SM.confetti && n >= 4 && SM.confetti(60); });
      awaitFeedback = true;
    });
  };
  let awaitFeedback = false;
  const reply = txt => {
    typing(() => {
      if (awaitFeedback) { awaitFeedback = false; safe(() => { const f = JSON.parse(localStorage.getItem('susheer_feedback') || '[]'); f.push({ text: txt.slice(0, 500), at: Date.now() }); localStorage.setItem('susheer_feedback', JSON.stringify(f)); }); say('Got it, noted! Your feedback goes straight to the Ganda Chatbot. 💌'); chips(MAIN); return; }
      const t = txt.toLowerCase();
      if (/feedback|rate|review|complain|suggest/.test(t)) return feedback();
      const hit = KB.find(k => k[0].test(t));
      say(hit ? hit[1] : pick(['Hmm, the Ganda Chatbot is scratching her head 🤔. Try asking about delivery, refunds, discounts or helicopters!', 'I did not get that, boss. But I can help with delivery, refunds, discounts and flying machines. 🚁']));
      chips(MAIN);
    });
  };
  let greeted = false;
  const revealEl = $('#gandaReveal');
  let revealT = 0;
  // her photo flashes full-screen, then fades away slowly while the chat opens (driven by JS, so it works even with reduced-motion settings)
  const reveal = () => {
    cancelAnimationFrame(revealT); revealEl.style.display = 'grid'; revealEl.style.opacity = 1;
    const t0 = performance.now(), HOLD = 1100, FADE = 1500;
    const step = now => {
      const t = now - t0;
      if (t < HOLD) { revealT = requestAnimationFrame(step); return; }
      const k = Math.min(1, (t - HOLD) / FADE); revealEl.style.opacity = 1 - k;
      if (k < 1) revealT = requestAnimationFrame(step); else revealEl.style.display = 'none';
    };
    revealT = requestAnimationFrame(step);
    setTimeout(() => { if (revealEl.style.display !== 'none' && document.hidden) { revealEl.style.opacity = 0; revealEl.style.display = 'none'; } }, HOLD + FADE + 400);   // safety net for background tabs
  };
  const open = () => {
    reveal();
    setTimeout(() => {
      chat.classList.add('open');
      if (!greeted) { greeted = true; say('Namaste boss! 🙏 I\'m the Ganda Chatbot, your Susheer support. Ask me anything or pick a topic below.'); chips(MAIN); }
      $('#chatI').focus();
    }, 900);
  };

  $('#fab').onclick = () => (chat.classList.contains('open') ? chat.classList.remove('open') : open());
  $('#chatX').onclick = () => chat.classList.remove('open');
  qr.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const t = b.textContent.replace(/^[^\w]+/, ''); say(b.textContent, 'me'); chips([]); reply(t); });
  $('#chatF').onsubmit = e => { e.preventDefault(); const i = $('#chatI'), v = i.value.trim(); if (!v) return; say(v, 'me'); i.value = ''; chips([]); reply(v); };

  /* ---------- spin & win wheel ---------- */
  const SEG = [
    { t: '5% OFF', p: 5, c: '#7c5cff' }, { t: '10% OFF', p: 10, c: '#ff3d81' }, { t: 'TRY AGAIN', p: 0, c: '#2b2f5e' }, { t: '15% OFF', p: 15, c: '#00b894' },
    { t: '20% OFF', p: 20, c: '#e17055' }, { t: 'FREE 🚁*', p: 0, c: '#0984e3', joke: 1 }, { t: '25% OFF', p: 25, c: '#fdcb6e' }, { t: '50% OFF!', p: 50, c: '#d63031' }
  ];
  const WEIGHT = [18, 18, 14, 14, 10, 6, 10, 2];
  document.body.insertAdjacentHTML('beforeend', `
    <div class="wheel-bg" id="wheelBg"><div class="wheel-card"><button class="xx" id="wheelX" aria-label="Close">×</button>
      <h2>🎡 Spin & Win!</h2><p>Mr. KK's lucky wheel — one coupon per visit, applied automatically in your cart.</p>
      <div class="wheel-box"><canvas id="wheelC" width="600" height="600"></canvas></div>
      <div class="wheel-res" id="wheelRes">Ready? Tap SPIN!</div>
      <button class="btn pri" id="spinGo">SPIN NOW</button></div></div>`);
  const cv = $('#wheelC'), cx = cv.getContext('2d');
  (function draw() {
    const n = SEG.length, a = Math.PI * 2 / n; cx.translate(300, 300);
    SEG.forEach((s, i) => {
      cx.beginPath(); cx.moveTo(0, 0); cx.arc(0, 0, 296, i * a - Math.PI / 2 - a / 2, (i + 1) * a - Math.PI / 2 - a / 2); cx.fillStyle = s.c; cx.fill(); cx.strokeStyle = 'rgba(255,255,255,.5)'; cx.lineWidth = 3; cx.stroke();
      cx.save(); cx.rotate(i * a); cx.fillStyle = '#fff'; cx.font = '900 25px Inter,sans-serif'; cx.textAlign = 'center'; cx.shadowColor = 'rgba(0,0,0,.6)'; cx.shadowBlur = 6; cx.fillText(s.t, 0, -205); cx.restore();
    });
    cx.beginPath(); cx.arc(0, 0, 46, 0, 7); cx.fillStyle = '#14102b'; cx.fill(); cx.lineWidth = 6; cx.strokeStyle = '#ffd23f'; cx.stroke(); cx.fillStyle = '#ffd23f'; cx.font = '900 28px Inter'; cx.textAlign = 'center'; cx.fillText('KK', 0, 10);
  })();
  const bg = $('#wheelBg'); let spinning = false, rot = 0, spinsUsed = 0;
  const MAXSPIN = 3, hasCoupon = () => !!safe(() => JSON.parse(localStorage.getItem('susheer_coupon')), null);
  const lockBtn = msg => { const b = $('#spinGo'); b.disabled = true; b.textContent = msg; b.style.opacity = .6; b.style.cursor = 'not-allowed'; };
  const openWheel = () => { bg.classList.add('open'); const c = safe(() => JSON.parse(localStorage.getItem('susheer_coupon')), null); if (c) { $('#wheelRes').innerHTML = `You already hold <b>${c.code}</b> (−${c.pct}%) — it's waiting in your cart! 🛒`; lockBtn('Coupon claimed ✔'); } };
  $('#wheelX').onclick = () => bg.classList.remove('open');
  bg.addEventListener('click', e => { if (e.target === bg) bg.classList.remove('open'); });
  $('#spinGo').onclick = () => {
    if (spinning || spinsUsed >= MAXSPIN || hasCoupon()) return; spinning = true; spinsUsed++; $('#wheelRes').textContent = 'Spinning… 🤞';
    let r = Math.random() * WEIGHT.reduce((a, b) => a + b), idx = 0; while ((r -= WEIGHT[idx]) > 0) idx++;
    const a = 360 / SEG.length; rot += 360 * 6 + (360 - idx * a) - (rot % 360);
    cv.style.transform = `rotate(${rot}deg)`;
    setTimeout(() => {
      spinning = false; const s = SEG[idx];
      if (s.p) { const code = 'KK' + s.p; safe(() => localStorage.setItem('susheer_coupon', JSON.stringify({ code, pct: s.p }))); $('#wheelRes').innerHTML = `🎉 You won <b>${s.p}% OFF</b>! Code <b>${code}</b> is applied in your cart.`; SM.confetti(); if (SM.kkMood) SM.kkMood('kiss', 2000); }
      else if (s.joke) $('#wheelRes').textContent = '🚁 FREE helicopter* — *terms: you must pay for the helicopter. Try again!';
      else $('#wheelRes').textContent = 'So close! Spin again, boss 😅';
      if (s.p) lockBtn('Coupon claimed ✔'); else if (spinsUsed >= MAXSPIN) lockBtn('No spins left — come back later');
    }, 4600);
  };
  // header entry + auto-open once per session
  const nav = document.querySelector('.top nav'); if (nav) nav.insertAdjacentHTML('afterbegin', '<a href="#" id="spinNav" class="spinbtn">🎡 Spin & Win</a>');
  document.addEventListener('click', e => { if (e.target.closest('#spinNav')) { e.preventDefault(); openWheel(); } });
  if (!safe(() => localStorage.getItem('wheel_seen')) && !hasCoupon()) setTimeout(() => { safe(() => localStorage.setItem('wheel_seen', 1)); if (!chat.classList.contains('open')) openWheel(); }, 28000);
})();
