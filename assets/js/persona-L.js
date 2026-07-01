/* =============================================================================
 * 刘碧依 (MINT-4931) 像素人格 "L" — 作品集详情页版
 * -----------------------------------------------------------------------------
 * API：
 *   mountPersonaL({ peek:'#personaPeek', figure:'#personaMover',
 *                   bubble:'#personaBubble', text:'#...', close:'#...' })
 *   renderPersonaL(container, opts)  // 仅渲染 SVG（保留向后兼容）
 * ============================================================================= */
(function (global) {
  const P = {
    bg1: '#020a14', bg2: '#08233d',
    primary: '#10b981', secondary: '#06b6d4', accent: '#bbf7d0',
    dark: '#020617', skin: '#f5d0bd', hair: '#1e3a8a', muted: '#9eb0cc'
  };
  const STYLE_ID = 'persona-L-style';
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const css = `
      @keyframes personaL-breathe{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
      @keyframes personaL-blink{0%,93%,100%{transform:scaleY(0)}95.5%,97%{transform:scaleY(1)}}
      .personaL-breathe{animation:personaL-breathe 3.4s ease-in-out infinite;transform-origin:center}
      .personaL-eyes{transition:transform .14s ease-out}
      .personaL-lid{transform-box:fill-box;transform-origin:top;animation:personaL-blink 6s ease-in-out infinite}
      @media (prefers-reduced-motion: reduce){
        .personaL-breathe,.personaL-lid{animation:none}
        .personaL-eyes{transition:none}
      }
    `;
    const s = document.createElement('style');
    s.id = STYLE_ID; s.textContent = css;
    document.head.appendChild(s);
  }

  function personaSVG(opts) {
    opts = opts || {};
    const p = P;
    const parts = [];
    const body = [];
    body.push(`
      <rect x="100" y="84" width="28" height="160" fill="${p.hair}"/>
      <rect x="232" y="84" width="28" height="160" fill="${p.hair}"/>
      <rect x="92" y="120" width="14" height="100" fill="${p.hair}" opacity=".9"/>
      <rect x="254" y="120" width="14" height="100" fill="${p.hair}" opacity=".9"/>`);
    body.push(`
      <rect x="150" y="150" width="60" height="24" fill="${p.skin}"/>
      <rect x="124" y="60" width="112" height="100" fill="${p.skin}"/>`);
    body.push(`<rect x="120" y="52" width="120" height="26" fill="${p.hair}"/>`);
    body.push(`
      <rect x="145" y="113" width="17" height="15" rx="2" fill="#eaf2ff"/>
      <rect x="198" y="113" width="17" height="15" rx="2" fill="#eaf2ff"/>
      <g class="personaL-eyes">
        <rect x="150" y="116" width="9" height="11" fill="#111827"/>
        <rect x="203" y="116" width="9" height="11" fill="#111827"/>
        <rect x="152" y="117" width="3" height="3" fill="#74e8ff"/>
        <rect x="205" y="117" width="3" height="3" fill="#74e8ff"/>
      </g>
      <rect class="personaL-lid" x="145" y="112" width="17" height="16" fill="${p.skin}"/>
      <rect class="personaL-lid" x="198" y="112" width="17" height="16" fill="${p.skin}"/>`);
    body.push(`<path d="M149 139 Q160 144 172 139" stroke="#5a3d46" stroke-width="4" fill="none"/>`);
    const blocks = [p.primary, p.secondary, p.accent, '#fb7185', '#84cc16', '#fde047'];
    body.push(`<rect x="120" y="170" width="120" height="88" fill="${p.bg2}"/>`);
    body.push(['✿', '❋', '✦', '✿', '❋'].map((t, i) =>
      `<text x="${130 + i * 22}" y="${204 + (i % 2) * 16}" font-size="16" fill="${blocks[i % blocks.length]}">${t}</text>`
    ).join(''));
    body.push(`<rect x="108" y="178" width="22" height="62" fill="${p.secondary}"/><rect x="230" y="178" width="22" height="62" fill="${p.accent}"/>`);
    body.push(`
      <rect x="100" y="100" width="22" height="50" fill="${p.primary}"/>
      <rect x="96" y="138" width="14" height="16" fill="${p.accent}"/>
      <rect x="238" y="100" width="22" height="50" fill="${p.primary}"/>
      <rect x="250" y="138" width="14" height="16" fill="${p.accent}"/>
      <rect x="118" y="68" width="124" height="14" fill="${p.primary}"/>`);
    body.push(`<text x="212" y="92" font-size="34" fill="${p.accent}">✿</text><rect x="216" y="92" width="14" height="6" fill="${p.primary}"/>`);
    parts.push(`<g class="personaL-breathe">${body.join('')}</g>`);
    var vb = opts.viewBox || '92 44 176 224';
    return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" style="width:100%;height:100%;display:block;overflow:visible">
      ${parts.join('')}
    </svg>`;
  }

  function renderPersonaL(container, opts) {
    injectStyle();
    if (typeof container === 'string') container = document.querySelector(container);
    if (!container) { console.warn('renderPersonaL: 容器不存在'); return; }
    container.innerHTML = personaSVG(opts);
  }

  function mountPersonaL(sel) {
    sel = sel || {};
    injectStyle();
    var peek = document.querySelector(sel.peek || '#personaPeek');
    var fig = document.querySelector(sel.figure || '#personaMover');
    var bubble = document.querySelector(sel.bubble || '#personaBubble');
    var bubbleText = document.querySelector(sel.text || '#personaBubbleText');
    var closeBtn = document.querySelector(sel.close || '#personaBubbleClose');
    if (!peek || !fig) return;

    fig.innerHTML = personaSVG({ viewBox: '92 44 176 224' });
    var eyes = fig.querySelector('.personaL-eyes');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var paused = false, offscreen = false, started = false;
    var typing = null, roamTimer = null, idx = -1;

    var spots = [
      { kind: 'bottom', x: 0.07, reveal: 0.66 },
      { kind: 'side',   edge: 'right', y: 0.18, reveal: 0.74, tilt: -7 },
      { kind: 'bottom', x: 0.80, reveal: 0.72 },
      { kind: 'side',   edge: 'right', y: 0.50, reveal: 0.70, tilt: -5 }
    ];

    function place(spot, hidden) {
      var pw = peek.clientWidth, ph = peek.clientHeight;
      var fw = fig.offsetWidth, fh = fig.offsetHeight;
      var tx, ty, rot = 0;
      if (spot.kind === 'bottom') {
        tx = spot.x * pw;
        ty = hidden ? ph + 6 : ph - fh * spot.reveal;
      } else {
        ty = spot.y * ph;
        rot = hidden ? 0 : (spot.tilt || 0);
        tx = hidden ? pw + 6 : pw - fw * spot.reveal;
      }
      fig.style.transform = 'translate(' + tx + 'px,' + ty + 'px) rotate(' + rot + 'deg)';
    }

    function scheduleNext(delay) { clearTimeout(roamTimer); roamTimer = setTimeout(showNext, delay); }
    function pickNext() {
      if (spots.length < 2) return 0;
      var n; do { n = Math.floor(Math.random() * spots.length); } while (n === idx); return n;
    }
    function showNext() {
      if (paused || offscreen || reduce) return;
      if (!peek.clientWidth || !peek.clientHeight) { scheduleNext(300); return; }
      started = true;
      idx = pickNext();
      var spot = spots[idx];
      fig.style.visibility = 'hidden';
      fig.style.transition = 'none';
      place(spot, true);
      void fig.offsetWidth;
      requestAnimationFrame(function () {
        fig.style.transition = '';
        fig.style.visibility = 'visible';
        place(spot, false);
      });
      roamTimer = setTimeout(function () {
        if (paused || offscreen) return;
        place(spot, true);
        setTimeout(function () { fig.style.visibility = 'hidden'; }, 1200);
        scheduleNext(2600 + Math.random() * 1800);
      }, 5200);
    }

    fig.style.transition = 'none';
    fig.style.visibility = 'hidden';
    place(spots[0], true);
    if (reduce) { fig.style.transition = ''; fig.style.visibility = 'visible'; place(spots[0], false); }
    else { scheduleNext(1000); }

    if (!reduce) {
      window.addEventListener('mousemove', function (e) {
        if (!eyes) return;
        var r = fig.getBoundingClientRect();
        if (!r.width) return;
        var cx = r.left + r.width * 0.5, cy = r.top + r.height * 0.30;
        var dx = e.clientX - cx, dy = e.clientY - cy;
        var d = Math.hypot(dx, dy) || 1;
        var ox = Math.max(-4, Math.min(4, dx / d * 4));
        var oy = Math.max(-2.5, Math.min(2.5, dy / d * 2.5));
        eyes.style.transform = 'translate(' + ox + 'px,' + oy + 'px)';
      }, { passive: true });
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          offscreen = !en.isIntersecting;
          if (offscreen) clearTimeout(roamTimer);
          else if (started && !paused && !reduce) scheduleNext(400);
        });
      }, { threshold: 0 }).observe(peek);
    }

    var INTRO = '我是刘碧依的像素人格 "L"。';

    function positionBubble() {
      var pw = peek.clientWidth, ph = peek.clientHeight;
      var m = fig.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
      var fx = m ? parseFloat(m[1]) : pw * 0.5;
      var fy = m ? parseFloat(m[2]) : ph * 0.6;
      var fw = fig.offsetWidth;
      if (fx > pw * 0.5) { bubble.style.right = (pw - fx + 10) + 'px'; bubble.style.left = 'auto'; }
      else { bubble.style.left = (fx + fw + 10) + 'px'; bubble.style.right = 'auto'; }
      bubble.style.bottom = Math.max(12, ph - fy - 4) + 'px';
      bubble.style.top = 'auto';
    }
    function runTypewriter(text) {
      clearInterval(typing);
      bubbleText.textContent = '';
      var i = 0;
      typing = setInterval(function () {
        bubbleText.textContent = text.slice(0, ++i);
        if (i >= text.length) { clearInterval(typing); bubble.classList.add('done'); }
      }, 55);
    }
    function openBubble() {
      paused = true; clearTimeout(roamTimer);
      positionBubble();
      bubble.hidden = false; bubble.classList.remove('done');
      requestAnimationFrame(function () { bubble.classList.add('in'); });
      runTypewriter(INTRO);
    }
    function closeBubble() {
      clearInterval(typing);
      bubble.classList.remove('in');
      setTimeout(function () { bubble.hidden = true; }, 300);
      paused = false;
      if (!reduce && !offscreen) scheduleNext(500);
    }
    if (bubble && bubbleText) {
      fig.addEventListener('click', function () { if (paused) closeBubble(); else openBubble(); });
      fig.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fig.click(); }
      });
      if (closeBtn) closeBtn.addEventListener('click', function (e) { e.stopPropagation(); closeBubble(); });
    }

    mountPixelRain(peek);
  }

  function mountPixelRain(peek) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var hero = peek.closest ? peek.closest('.detail-hero') : null;
    if (!hero) return;
    if (hero.querySelector('.pixel-rain')) return;
    var cv = document.createElement('canvas');
    cv.className = 'pixel-rain';
    cv.style.cssText = 'position:absolute;inset:0;z-index:0;pointer-events:none;';
    hero.insertBefore(cv, hero.firstChild);
    var ctx = cv.getContext('2d');
    var COLORS = ['#10b981', '#06b6d4', '#bbf7d0', '#74e8ff', '#b38cff'];
    var CELL = 9;
    var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var cols = 0, pileCap = 0, pile = [], drops = [];
    var raf = null, visible = true;
    function resize() {
      w = hero.clientWidth; h = hero.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      cv.style.width = w + 'px'; cv.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(w / CELL);
      pileCap = 2;
      pile = new Array(cols).fill(0);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    function spawn() {
      if (drops.length > Math.min(26, cols * 0.4)) return;
      var c = Math.floor(Math.random() * cols);
      drops.push({ c: c, y: -CELL, vy: 0.9 + Math.random() * 1.1, color: COLORS[(Math.random() * COLORS.length) | 0], bounced: false, alpha: 0.55 + Math.random() * 0.35 });
    }
    var lastSpawn = 0;
    function frame(ts) {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (ts - lastSpawn > 320) { spawn(); lastSpawn = ts; }
      ctx.clearRect(0, 0, w, h);
      for (var i = drops.length - 1; i >= 0; i--) {
        var d = drops[i];
        var floorY = h - (pile[d.c] + 1) * CELL;
        d.vy += 0.06; d.y += d.vy;
        if (d.y >= floorY) {
          if (!d.bounced && d.vy > 1.6) { d.y = floorY; d.vy = -d.vy * 0.32; d.bounced = true; }
          else { if (pile[d.c] < pileCap) pile[d.c]++; drops.splice(i, 1); continue; }
        }
        ctx.globalAlpha = d.alpha;
        ctx.fillStyle = d.color;
        ctx.fillRect(d.c * CELL + 1, d.y, CELL - 2, CELL - 2);
      }
      ctx.globalAlpha = 0.5;
      for (var c = 0; c < cols; c++) {
        for (var k = 0; k < pile[c]; k++) {
          ctx.fillStyle = COLORS[(c + k) % COLORS.length];
          ctx.fillRect(c * CELL + 1, h - (k + 1) * CELL, CELL - 2, CELL - 2);
        }
      }
      ctx.globalAlpha = 1;
      if (Math.random() < 0.04) {
        var rc = (Math.random() * cols) | 0;
        if (pile[rc] > 0) pile[rc]--;
      }
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (en) { visible = en.isIntersecting; });
      }, { threshold: 0 }).observe(hero);
    }
    raf = requestAnimationFrame(frame);
  }

  const PERSONA_L_META = {
    id: 'MINT-4931', name: 'L', author: '刘碧依', mbti: 'INTP',
    palette: '电子青绿',
    tags: ['观察者', '理性', '逻辑漂流者', '夜间思考者', '数字游民']
  };

  global.renderPersonaL = renderPersonaL;
  global.mountPersonaL = mountPersonaL;
  global.PERSONA_L_META = PERSONA_L_META;
})(window);
