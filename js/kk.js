/* Mr. KK — hand-drawn, Ghibli-ish SVG salesman with moods: idle | talk | kiss | wink | wow | happy */
window.KK_SVG = function (mood) {
  const L = '#3a2620';
  return `<svg class="kk" data-mood="${mood || 'idle'}" viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg" aria-label="Mr. KK">
  <defs></defs>
  <ellipse cx="80" cy="196" rx="52" ry="5" fill="rgba(0,0,0,.28)"/>
  <g class="kk-body">
    <!-- shirt -->
    <path d="M18 200 C18 156 46 138 80 138 C114 138 142 156 142 200 Z" fill="#f6f1e7" stroke="${L}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M62 139 L80 176 L98 139 Z" fill="#c58a60" stroke="${L}" stroke-width="2"/>
    <path d="M58 138 L80 176 L66 150 Z M102 138 L80 176 L94 150 Z" fill="#fffdf8" stroke="${L}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M100 160 h16 v20 h-16 z" fill="none" stroke="#cfc6b6" stroke-width="1.6"/>
    <path d="M80 176 V200" stroke="#d9d0bf" stroke-width="1.6"/>
    <circle cx="80" cy="186" r="1.8" fill="#cfc6b6"/>
    <!-- hanging sunglasses -->
    <g transform="translate(76 168) rotate(-8)">
      <ellipse cx="-6" cy="0" rx="6.2" ry="4.6" fill="#1b1b22" stroke="#000" stroke-width="1"/>
      <ellipse cx="7" cy="0" rx="6.2" ry="4.6" fill="#1b1b22" stroke="#000" stroke-width="1"/>
      <path d="M0 -.5 h1" stroke="#000"/><path d="M-7 -3 q1.5 -1.4 3 -1" stroke="#7a86a8" stroke-width="1" fill="none"/>
    </g>
    <!-- neck + ears -->
    <rect x="67" y="116" width="26" height="28" rx="8" fill="#b97b52"/>
    <ellipse cx="41.5" cy="92" rx="6.5" ry="10" fill="#c58a60" stroke="${L}" stroke-width="2"/>
    <ellipse cx="118.5" cy="92" rx="6.5" ry="10" fill="#c58a60" stroke="${L}" stroke-width="2"/>
    <!-- face -->
    <path d="M42 80 C42 48 60 40 80 40 C100 40 118 48 118 80 C118 112 102 136 80 136 C58 136 42 112 42 80 Z" fill="#d49b6c" stroke="${L}" stroke-width="2.4"/>
    <!-- beard/stubble -->
    <path d="M44 96 C46 124 62 138 80 138 C98 138 114 124 116 96 C112 108 104 112 96 108 C90 104 70 104 64 108 C56 112 48 108 44 96 Z" fill="#3a2a24" opacity=".62"/>
    <!-- mustache -->
    <path d="M62 106 C70 98 76 102 80 104 C84 102 90 98 98 106 C92 106 86 107 80 107 C74 107 68 106 62 106 Z" fill="#241a17"/>
    <!-- cheeks -->
    <ellipse cx="55" cy="100" rx="8" ry="5" fill="#f0836a" opacity=".38"/><ellipse cx="105" cy="100" rx="8" ry="5" fill="#f0836a" opacity=".38"/>
    <!-- hair -->
    <path d="M40 84 C32 44 56 24 84 26 C112 26 134 44 120 86 C118 66 108 54 84 54 C62 54 46 62 40 84 Z" fill="#1c1716" stroke="${L}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M52 44 C62 20 100 14 118 44 C102 34 76 32 52 44 Z" fill="#1c1716"/>
    <path d="M70 34 q14 -8 30 0" stroke="#4a3d3a" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- brows -->
    <path d="M55 72 Q66 66 76 72" stroke="#1c1716" stroke-width="4.2" fill="none" stroke-linecap="round"/>
    <path d="M84 72 Q94 66 105 72" stroke="#1c1716" stroke-width="4.2" fill="none" stroke-linecap="round"/>
    <!-- eyes -->
    <g class="kk-eyes">
      <g class="e-l"><ellipse cx="66" cy="85" rx="6" ry="7.6" fill="#1b100d"/><circle cx="68" cy="82.4" r="2.2" fill="#fff"/></g>
      <g class="e-r"><ellipse cx="94" cy="85" rx="6" ry="7.6" fill="#1b100d"/><circle cx="96" cy="82.4" r="2.2" fill="#fff"/></g>
    </g>
    <path class="e-wink" d="M87 86 Q94 78 101 86" stroke="#1b100d" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path class="e-happy" d="M59 87 Q66 78 73 87 M87 87 Q94 78 101 87" stroke="#1b100d" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <!-- nose -->
    <path d="M78 90 Q75 100 78 101 Q80 102.5 82 101 Q85 100 82 90" fill="#c08158" stroke="${L}" stroke-width="1.6" stroke-linejoin="round" opacity=".9"/>
    <!-- mouths -->
    <path class="m-smile" d="M68 114 Q80 126 92 114" stroke="#6a2c28" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g class="m-talk"><ellipse cx="80" cy="116" rx="8" ry="5" fill="#4a1717"/><ellipse cx="80" cy="119" rx="4.5" ry="2.2" fill="#d6685f"/></g>
    <g class="m-kiss"><ellipse cx="80" cy="116" rx="4.6" ry="5.4" fill="#c4453f" stroke="#7a1f1f" stroke-width="1.4"/><path d="M80 112 v8" stroke="#7a1f1f" stroke-width="1"/></g>
    <ellipse class="m-wow" cx="80" cy="118" rx="6.4" ry="9" fill="#431414" stroke="#2a0a0a" stroke-width="1.6"/>
    <!-- effects -->
    <g class="kk-fx">
      <text class="h1" x="100" y="108" font-size="16">❤️</text><text class="h2" x="112" y="96" font-size="12">💖</text><text class="h3" x="92" y="92" font-size="10">💗</text>
      <text class="sp" x="108" y="72" font-size="16">✨</text>
      <text class="sw" x="116" y="62" font-size="14">💦</text>
    </g>
  </g>
</svg>`;
};
