/*───────────────────────────────────────────────
  portfolio-website · main.js
  —————————————————————————————————————————————
  功能：
  1. 注入数据到页面（About / Projects / Edu / Skills / Contact）
  2. Hero logo 点击 → 词组展开
  3. 鼠标跟随光斑
  4. 滚到项目卡片时，背景 & accent 色彩根据项目动态变换
  5. reveal-on-scroll 动画
  6. 项目卡片点击跳转到详情页（如果有 demoUrl 就跳）
───────────────────────────────────────────── */

;(function(){
'use strict';

// ══════════════════════════════════════════════
// -1. 刷新回顶 + 从详情页返回时定位到对应项目卡
//     刷新 = 没有 hash → 强制回顶
//     带 #project-xxx hash = 从详情页"返回作品"过来的 → 滚到那张卡
// ══════════════════════════════════════════════
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// ══════════════════════════════════════════════
// 0. 入场淡入：尽早、独立触发，确保即使后续数据注入出错页面也可见
//    （CSS 用 html.js body { opacity:0 } 起手，这里负责点亮）
// ══════════════════════════════════════════════
function revealPage() { document.body.classList.add('page-ready'); }
requestAnimationFrame(() => requestAnimationFrame(revealPage));
window.addEventListener('load', revealPage);
setTimeout(revealPage, 1200);

// ══════════════════════════════════════════════
// 1. 注入数据
// ══════════════════════════════════════════════

// About
const prof = window.PORTFOLIO_PROFILE;
if (prof) {
  const aboutPos = document.getElementById('aboutPosition');
  const aboutInt = document.getElementById('aboutIntent');
  const aboutAvl = document.getElementById('aboutAvail');
  const wechatEl = document.getElementById('contactWechat');  // 改为微信
  const emailEl = document.getElementById('contactEmail');

  if (aboutPos) aboutPos.textContent = prof.position;
  if (aboutInt) aboutInt.textContent = prof.jobIntent || prof.intent;
  if (aboutAvl) aboutAvl.textContent = prof.jobAvail || prof.availability;
  if (wechatEl) wechatEl.textContent = prof.wechat;  // 只显示微信号
  if (emailEl) {
    emailEl.textContent = prof.email;
    emailEl.setAttribute('href', 'mailto:' + prof.email);
  }

  // Contact 密钥保护
  const contactLock = document.getElementById('contactLock');
  const contactContent = document.getElementById('contactContent');
  const contactKeyInput = document.getElementById('contactKey');
  const contactUnlockBtn = document.getElementById('contactUnlock');
  const lockError = document.getElementById('lockError');
  const correctKey = 'liuliu66';

  function unlockContact() {
    const inputKey = contactKeyInput.value.trim();
    if (inputKey === correctKey) {
      // 解锁成功（仅本次有效，刷新后重新上锁）
      contactLock.style.display = 'none';
      contactContent.style.display = 'grid';
      contactContent.classList.add('unlocked');
      // 显式浮现被 reveal 隐藏的联系方式（否则依赖滚动观察器，可能看不到）
      contactContent.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    } else {
      // 密钥错误
      lockError.textContent = '密钥错误，请重试';
      lockError.classList.add('show');
      contactKeyInput.value = '';
      contactKeyInput.focus();
      setTimeout(() => {
        lockError.classList.remove('show');
      }, 2000);
    }
  }

  // 每次进入页面都保持上锁状态：滚到联系区需重新填密钥
  // （不再用 sessionStorage 记住解锁，刷新即重新上锁）

  if (contactUnlockBtn) {
    contactUnlockBtn.addEventListener('click', unlockContact);
  }
  if (contactKeyInput) {
    contactKeyInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') unlockContact();
    });
  }

  // Hero 身份副行：取求职意向，简洁点明方向
  const heroRole = document.getElementById('heroRole');
  if (heroRole) heroRole.textContent = prof.intent;
}

// Hero keywords：英文说明逐词展开
const englishStatement = "Designing product experiences that make AI understandable, usable, and trustworthy.";
const words = englishStatement.split(' ');
const kwCon = document.getElementById('heroKeywords');
if (kwCon && words.length) {
  words.forEach((word, i) => {
    const s = document.createElement('span');
    s.className = 'kw';
    s.textContent = word;
    s.style.animationDelay = (i * 0.1) + 's';  // 每个词间隔 100ms
    kwCon.appendChild(s);
  });
}

// Education + Research - 表格式行对齐
const eduList = (prof && prof.education) || [];
const researchList = (prof && prof.research) || [];
const rowContainer = document.getElementById('eduTableRows');

if (rowContainer) {
  const maxRows = Math.max(eduList.length, researchList.length);

  for (let i = 0; i < maxRows; i++) {
    const row = document.createElement('div');
    row.className = 'edu-table-row reveal';

    // 左列：教育
    const leftCol = document.createElement('div');
    leftCol.className = 'edu-col-left';
    if (eduList[i]) {
      leftCol.innerHTML = `
        <h4 class="edu-name">
          ${eduList[i].school}
          <span class="edu-time-inline">${eduList[i].time}</span>
        </h4>
        <p class="edu-desc">${eduList[i].degree}</p>
      `;
    }

    // 右列：科研
    const rightCol = document.createElement('div');
    rightCol.className = 'edu-col-right';
    if (researchList[i]) {
      rightCol.innerHTML = `
        <h4 class="edu-name">${researchList[i].title}</h4>
        <p class="edu-desc">${researchList[i].desc}</p>
      `;
    }

    row.appendChild(leftCol);
    row.appendChild(rightCol);
    rowContainer.appendChild(row);
  }
}

// Skills
const skillList = (prof && prof.skills) || [];
const skillsCon = document.getElementById('skillsGrid');
if (skillsCon && skillList.length) {
  skillList.forEach(sg => {
    const div = document.createElement('div');
    div.className = 'skill-group reveal';
    const itemsHTML = sg.items.map(it => `<li>${it}</li>`).join('');
    div.innerHTML = `<h3>${sg.group}</h3><ul>${itemsHTML}</ul>`;
    skillsCon.appendChild(div);
  });
}

// Awards
const awardsList = (prof && prof.awards) || [];
const awardsCon = document.getElementById('awardsList');
if (awardsCon && awardsList.length) {
  awardsList.forEach(aw => {
    const sp = document.createElement('span');
    sp.className = 'award-chip';
    sp.textContent = aw;
    awardsCon.appendChild(sp);
  });
}

// Projects
const projects = window.PORTFOLIO_PROJECTS || [];
const projCon = document.getElementById('projectCards');
if (projCon && projects.length) {
  projects.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.id = 'project-' + p.id;
    card.dataset.projectId = p.id;
    card.dataset.accent = p.accent;
    card.dataset.bg = p.bg;
    card.dataset.mood = p.mood;

    // inline CSS 变量
    card.style.setProperty('--card-accent', p.accent);
    card.style.setProperty('--card-bg', p.bg);

    const tagsHTML = p.tags.map(t => `<span class="pc-tag">${t}</span>`).join('');

    // 视觉块：优先用真实截图，没有就降级到字符 cover
    const visualHTML = p.cardImage
      ? `<img class="pc-image" src="${p.cardImage}" alt="${p.title} preview" loading="lazy">`
      : `<div class="pc-cover">${p.cover}</div>`;

    card.innerHTML = `
      <div class="pc-body">
        <div class="pc-index">${String(idx+1).padStart(2,'0')}</div>
        <div class="pc-meta">${p.role}</div>
        <h3 class="pc-title">${p.title}</h3>
        <p class="pc-sub">${p.subtitle}</p>
        <div class="pc-tags">${tagsHTML}</div>
        <div class="pc-cta">
          <span>查看详情</span>
          <span>→</span>
        </div>
      </div>

      <div class="pc-visual${p.cardImage ? ' has-image' : ''}">
        ${visualHTML}
        <div class="pc-deco"></div>
      </div>
    `;

    // 点击卡片跳转到详情页（带淡出过渡）
    card.addEventListener('click', () => {
      navigateWithFade(`projects/${p.id}.html`);
    });

    projCon.appendChild(card);
  });

  // 处理 URL hash：从详情页"返回作品"过来时，自动滚到对应项目卡
  // 刷新时 → 清除 hash + 回到顶部
  (function handleEntryScroll(){
    var hash = window.location.hash;   // 形如 #project-kaoyan-portfolio

    // 如果 URL 带 #project- hash，判断是否来自详情页"返回"
    // 简单策略：有 hash 时先清掉（让后续刷新回到干净状态），然后滚过去
    // 用户真正想要的是：点"返回作品"时跳到对应卡片，但之后刷新不要保持这个位置
    if (hash && hash.indexOf('#project-') === 0) {
      var target = document.getElementById(hash.slice(1));
      if (target) {
        // 清除 hash（用 replaceState 不产生历史记录）
        history.replaceState(null, '', window.location.pathname);
        // 滚到目标卡片
        requestAnimationFrame(function(){
          requestAnimationFrame(function(){
            target.scrollIntoView({ behavior: 'auto', block: 'center' });
          });
        });
        return;
      }
    }
    // 无 hash 或目标不存在 → 滚到最顶
    window.scrollTo(0, 0);
  })();
}

// ══════════════════════════════════════════════
// 2. Hero logo 点击 → 展开关键词
// ══════════════════════════════════════════════
const heroStage = document.getElementById('heroStage');
let expanded = false;
if (heroStage) {
  heroStage.addEventListener('click', () => {
    if (expanded) return;
    heroStage.classList.add('expanded');
    expanded = true;
  });
}

// ══════════════════════════════════════════════
// 3. 鼠标跟随光点（优雅、柔和、拖尾感）
// ══════════════════════════════════════════════
const particleContainer = document.body;
let lastParticleTime = 0;
const particleInterval = 80; // 每 80ms 生成一次，更节制

document.addEventListener('mousemove', e => {
  const now = Date.now();
  if (now - lastParticleTime < particleInterval) return;
  lastParticleTime = now;

  // 只生成 1 个光点，更优雅
  createParticle(e.clientX, e.clientY);
});

function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.className = 'cursor-particle';

  // 轻微随机偏移
  const offsetX = (Math.random() - 0.5) * 8;
  const offsetY = (Math.random() - 0.5) * 8;

  particle.style.left = (x + offsetX) + 'px';
  particle.style.top = (y + offsetY) + 'px';

  particleContainer.appendChild(particle);

  // 动画结束后移除
  setTimeout(() => {
    particle.remove();
  }, 1200);
}

// ══════════════════════════════════════════════
// 4. 滚到项目卡片时，色彩注入
// ══════════════════════════════════════════════
function updateProjectAmbience() {
  // 找到视口中最靠近中心的 project-card
  const cards = Array.from(document.querySelectorAll('.project-card'));
  if (!cards.length) return;

  const mid = window.innerHeight / 2;
  let closest = null;
  let minDist = Infinity;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardMid = rect.top + rect.height / 2;
    const dist = Math.abs(cardMid - mid);
    if (dist < minDist && rect.top < window.innerHeight && rect.bottom > 0) {
      minDist = dist;
      closest = card;
    }
  });

  if (closest) {
    const accent = closest.dataset.accent || '#111111';
    const bg = closest.dataset.bg || '#fafaf7';
    const projectId = closest.dataset.projectId || '';
    document.documentElement.style.setProperty('--accent', accent);
    document.body.style.backgroundColor = bg;

    // 项目氛围切换：根据项目 id 给 body 加专属 class
    // 这样可以让 CSS 针对特定项目改变字体/光晕/背景纹理
    document.body.setAttribute('data-project-mood', projectId);
  } else {
    // 回到默认
    document.documentElement.style.setProperty('--accent', '#111111');
    document.body.style.backgroundColor = '#fafaf7';
    document.body.removeAttribute('data-project-mood');
  }
}

window.addEventListener('scroll', updateProjectAmbience, {passive:true});
updateProjectAmbience();

// ══════════════════════════════════════════════
// 4b. 顶部滚动进度条（随 --accent 一起变色）
// ══════════════════════════════════════════════
const scrollBar = document.getElementById('scrollProgress');
function updateScrollProgress() {
  if (!scrollBar) return;
  const doc = document.documentElement;
  const max = (doc.scrollHeight - doc.clientHeight) || 1;
  const pct = Math.min(1, Math.max(0, window.scrollY / max));
  scrollBar.style.width = (pct * 100) + '%';
}
window.addEventListener('scroll', updateScrollProgress, {passive:true});
window.addEventListener('resize', updateScrollProgress, {passive:true});
updateScrollProgress();

// ══════════════════════════════════════════════
// 5. reveal-on-scroll（IntersectionObserver + 同组错峰）
//    让每个区块里的元素依次、舒缓地浮现，而不是一次性弹出
// ══════════════════════════════════════════════
(function setupReveal(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  function reveal() {
    const items = Array.from(document.querySelectorAll('.reveal'))
      .filter(item => {
        const rect = item.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.85;
      });
    items.forEach(item => item.classList.add('in'));
  }
  window.addEventListener('scroll', reveal, {passive: true});
  reveal();
})();

// ══════════════════════════════════════════════
// 6. 点击音效反馈（柔和、即时响应、确保初始化）
// ══════════════════════════════════════════════
let audioContext;
let isAudioReady = false;

// 提前初始化音频上下文
function initAudio() {
  if (isAudioReady) return;
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    isAudioReady = true;
  } catch (e) {
    console.warn('Audio context init failed:', e);
  }
}

// 多种方式确保音频初始化
document.addEventListener('mousemove', initAudio, { once: true });
document.addEventListener('click', initAudio, { once: true });
document.addEventListener('touchstart', initAudio, { once: true });

function playClickSound() {
  if (!isAudioReady || !audioContext) {
    initAudio(); // 再次尝试初始化
    if (!isAudioReady || !audioContext) return;
  }

  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // 柔和音调
    oscillator.frequency.value = 650;
    oscillator.type = 'triangle';

    // 柔和音量包络
    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.08, now + 0.015); // 提高到 0.08 更容易听到
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    oscillator.start(now);
    oscillator.stop(now + 0.15);
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
}

// 为所有交互元素添加音效
document.addEventListener('click', e => {
  const target = e.target.closest('a, button, .project-card, .nav-name, .lock-btn, nav li');
  if (target) {
    playClickSound();
  }
}, { capture: true });

// ══════════════════════════════════════════════
// 7. 记住项目位置，返回时恢复
// ══════════════════════════════════════════════
// 点击项目卡片时记录 ID
document.addEventListener('click', e => {
  const card = e.target.closest('.project-card');
  if (card) {
    const projectId = card.dataset.projectId;
    if (projectId) {
      sessionStorage.setItem('lastViewedProject', projectId);
    }
  }
});

// 页面加载时，如果有记录的项目，滚动到该位置
window.addEventListener('load', () => {
  const lastProjectId = sessionStorage.getItem('lastViewedProject');
  if (lastProjectId && window.location.hash === '') {
    // 稍微延迟，确保页面完全渲染
    setTimeout(() => {
      const projectCard = document.querySelector(`.project-card[data-project-id="${lastProjectId}"]`);
      if (projectCard) {
        projectCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // 清除记录，避免重复滚动
        sessionStorage.removeItem('lastViewedProject');
      }
    }, 500);
  }
});

// ══════════════════════════════════════════════
function navigateWithFade(url) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) { window.location.href = url; return; }
  document.body.classList.add('page-leaving');
  setTimeout(() => { window.location.href = url; }, 520);
}

})();
