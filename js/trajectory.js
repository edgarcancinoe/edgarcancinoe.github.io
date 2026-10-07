// Trajectory chart: education and experience as bars on a time axis, projects as dots grouped by institution.
// Replaces the static timeline list inside #trajectory-chart (which stays as the no-JS fallback).
(function () {
const mount = document.getElementById('trajectory-chart');
if (!mount) return;
const R = mount.dataset.root || '';
const P = (title, href, year, org) => ({ title, href, year, org });
// Newest first. Months are approximate where the CV only gives years.
const DATA = [
  { id: 'msc', kind: 'edu', from: 2024.67, to: 2026.67, years: '2024 — 2026', logo: 'emai',
    title: 'MSc Artificial Intelligence', org: 'Erasmus Mundus · UPF Barcelona → Sapienza Rome → Univ. of Ljubljana',
    desc: 'Specialization in data science at the University of Ljubljana; thesis at ViCoS on perceptual guidance for vision-language-action models.',
    tags: ['VLA models', 'Diffusion models', 'Representation learning', 'Data science'],
    stations: [ // real stays: 6 months, 6 months, 12 months
      { key: 'UPF', name: 'UPF', full: 'UPF Barcelona', logo: 'upf', from: 2024.67, to: 2025.17 },
      { key: 'Sapienza', name: 'Sapienza', full: 'Sapienza Rome', logo: 'unirm', from: 2025.17, to: 2025.67 },
      { key: 'UL', name: 'Ljubljana', full: 'University of Ljubljana', logo: 'uol', from: 2025.67, to: 2026.67 },
    ],
    built: [
      P('PIU: Proximity-guided Identity Unlearning', 'research.html#piu', 2026, 'UL'),
      P('Expert Distillation for Perceptual Guidance', 'research.html#expert-distillation', 2026, 'UL'),
      P('Token Grounding in VLA Models', 'research.html#token-grounding', 2026, 'UL'),
      P('NoisyGNN: Robust GNNs Under Noisy Labels', 'projects/gnn_noisy_labels.html', 2025, 'Sapienza'),
      P('Uncertainty-Aware Road Obstacle Identification', 'projects/maybe_obstacle.html', 2025, 'Sapienza'),
      P('Embedded Sensor Monitoring System', 'projects/sapienza_iot.html', 2025, 'Sapienza'),
      P('IoT Smart Parking System', 'projects/smart_parking.html', 2025, 'Sapienza'),
      P('Image Synthesis via Score Matching', 'projects/score_based_generative_modeling.html', 2024, 'UPF'),
    ] },
  { id: 'rice', kind: 'exp', from: 2024.0, to: 2024.17, years: '2024 — 2024', logo: 'rice',
    title: 'Robotics Lab Assistant', org: 'Kavraki Lab · Rice University',
    desc: 'ROS system integrating motion planning with SceneGrasp for multi-object 3D reconstruction and grasp pose estimation from RGB-D; pick-and-place validated in simulation and on hardware.',
    tags: ['ROS', 'Motion planning', 'RGB-D grasping', 'UR5'],
    built: [P('SceneGrasp: 3D Reconstruction, Pose & Grasp', 'projects/scene_grasp.html', 2024, 'Rice')] },
  { id: 'sc', kind: 'exp', from: 2022.17, to: 2023.8, years: '2022 — 2023', logo: 'sc',
    title: 'Business Automation Intern', org: 'Steelcase',
    desc: 'Automation for internal business processes with Python, UiPath RPA, Power Automate and Excel VBA, in an Agile team.',
    tags: ['Python', 'UiPath RPA', 'Power Automate', 'Excel VBA'], built: [] },
  { id: 'bsc', kind: 'edu', from: 2021.6, to: 2024.45, years: '2021 — 2024', logo: 'tec',
    title: 'BSc Robotics & Digital Systems', org: 'Tecnológico de Monterrey',
    desc: 'Digital and embedded systems, intelligent and robotic systems, automation and control.',
    tags: ['ROS', 'Control', 'Computer vision', 'Embedded systems'],
    built: [
      P('Differential Drive Robotic Manipulator', 'projects/puzzlebot_manipulator.html', 2024, 'Tec'),
      P('EKF with Corner-Based Landmark Localisation', 'projects/ekf_corner_detection.html', 2024, 'Tec'),
      P('Image-Based Visual Control for a Mobile Robot', 'projects/ibvs.html', 2024, 'Tec'),
      P('Deep RL for Robotic Manipulation (DDPG + HER)', 'projects/xarm_ddpg_her.html', 2023, 'Tec'),
      P('Reinforcement Learning on xARM6 with ROS', 'projects/home_ddpg_ros.html', 2023, 'Tec'),
      P('xArm6 Visual Servoing', 'projects/xarm6_visual_servoing.html', 2023, 'Tec'),
      P('Autonomous Driving of a Mobile Robot', 'projects/self_driving_autonomous_vehicle.html', 2023, 'Tec'),
      P('Intelligent Air Pressure Control', 'projects/air_pressure_control.html', 2023, 'Tec'),
    ] },
];
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const logo = (f) => `<img src="${R}images/logos/${f}.webp" alt="" />`;
const tags = (t) => `<div class="at-tags at-mono">${t.map((x) => `<span class="at-tag">${esc(x)}</span>`).join('')}</div>`;

// ── Chart ──
const T0 = 2021.4, T1 = 2026.8;
const x = (t) => ((t - T0) / (T1 - T0)) * 100;
function chart(style = 'graphite', fill = 'exp') {
  const years = [2022, 2023, 2024, 2025, 2026];
  const ticks = years.map((y) => `<span class="tc-tick" style="left:${x(y)}%" data-p="${x(y)}"></span>`).join('');
  let i = 0;
  const bar = (sel, kind, label, lg, from, to, cls = '') =>
    `<button type="button" class="tc-bar ${kind} ${cls} ${to - from < 0.3 ? 'tiny' : ''} tc-grow" style="--i:${i++};left:${x(from)}%;width:${x(to) - x(from)}%" data-f="${from}" data-t="${to}" data-sel="${sel}" aria-pressed="false">${logo(lg)}<span class="t at-mono">${esc(label)}</span></button>`;
  const msc = DATA.find((d) => d.id === 'msc'), bsc = DATA.find((d) => d.id === 'bsc');
  const ticks3 = msc.stations.slice(1).map((st) => {
    const at = ((st.from - msc.from) / (msc.to - msc.from)) * 100;
    return `<i class="tc-tk t" style="--at:${at}%"></i><i class="tc-tk b" style="--at:${at}%"></i>`;
  }).join('');
  const edu = bar('bsc', 'edu', 'BSc Robotics · Tec', bsc.logo, bsc.from, bsc.to)
    + bar('msc', 'edu', 'MSc AI · Erasmus Mundus', msc.logo, msc.from, msc.to).replace('</button>', ticks3 + '</button>');
  const exp = DATA.filter((d) => d.kind === 'exp').map((d) => bar(d.id, 'exp', d.id === 'rice' ? 'Rice' : 'Steelcase', d.logo, d.from, d.to)).join('');

  // Projects grouped under the institution that produced them.
  const groups = [
    { sel: 'bsc', label: 'Tec', at: 2023.5, ps: bsc.built.filter((p) => p.year === 2023) },
    { sel: 'rice', label: 'Rice', at: 2024.085, ps: DATA.find((d) => d.id === 'rice').built },
    { sel: 'bsc', label: 'Tec', at: 2024.33, ps: bsc.built.filter((p) => p.year === 2024) },
    ...msc.stations.map((st) => ({ sel: 'msc:' + st.key, label: st.name, at: (st.from + st.to) / 2, ps: msc.built.filter((p) => p.org === st.key) })),
  ];
  const STEP = 0.1;
  let j = 0, total = 0;
  const dots = groups.map((g) => {
    total += g.ps.length;
    const cols = g.ps.length; // one row per group: every group shares the same dot and label line
    const ds = g.ps.map((p, k) => {
      const t = g.at + (k - (cols - 1) / 2) * STEP, top = 22;
      return `<a class="tc-dot tc-pop ${g.sel.startsWith('msc') && p.year === 2026 ? 'r' : ''}" style="--i:${j++};left:${x(t)}%;top:${top}px" href="${R}${p.href}" data-sel="${g.sel}" data-tip="${esc(p.title)}" aria-label="${esc(p.title)}"></a>`;
    }).join('');
    const rows = 1;
    const half = (cols - 1) / 2 * STEP + 0.12;
    const hit = `<span class="tc-hit" data-sel="${g.sel}" style="left:${x(g.at - half)}%;width:${x(g.at + half) - x(g.at - half)}%;height:${rows * 18 + 32}px"></span>`;
    return hit + ds + `<button type="button" class="tc-glabel at-mono" style="left:${x(g.at)}%;top:36px" data-sel="${g.sel}" aria-pressed="false">${esc(g.label)}</button>`;
  }).join('');
  return `<div class="tc tc--${style}" data-fill="${fill}">
    <div class="tc-scroll"><div class="tc-grid">
      <span></span><div class="tc-ruler at-mono">${years.map((y) => `<span style="left:${x(y)}%">${y}</span>`).join('')}</div>
      <span class="tc-lane-k at-mono">Education</span><div class="tc-lane edu">${ticks}${edu}</div>
      <span class="tc-lane-k at-mono">Experience</span><div class="tc-lane exp">${ticks}${exp}</div>
      <span class="tc-lane-k at-mono">Projects · ${total}</span><div class="tc-lane out">${ticks}${dots}<span class="tc-tip at-mono"></span></div>
    </div></div>
    <div class="tc-detail" aria-live="polite"></div>
  </div>`;
}
function wireChart(root) {
  const detail = root.querySelector('.tc-detail');
  const tip = root.querySelector('.tc-tip');
  const msc = DATA.find((d) => d.id === 'msc');
  let selected = null;
  const owns = (sel, el) => el.dataset.sel === sel || (sel === 'msc' && el.dataset.sel.startsWith('msc')) || (el.dataset.sel === 'msc' && sel.startsWith('msc'));
  const clear = () => {
    selected = null;
    root.querySelectorAll('.tc-bar, .tc-glabel').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    root.querySelectorAll('.tc-dot, .tc-glabel').forEach((p) => p.classList.remove('dim', 'on'));
    detail.innerHTML = '';
  };
  const select = (sel) => {
    if (sel === selected) return;
    selected = sel;
    const [id, key] = sel.split(':');
    const d = DATA.find((e) => e.id === id);
    const st = key && d.stations.find((s) => s.key === key);
    const built = st ? d.built.filter((p) => p.org === key) : d.built;
    root.querySelectorAll('.tc-bar, .tc-glabel').forEach((b) => b.setAttribute('aria-pressed', String(owns(sel, b))));
    root.querySelectorAll('.tc-dot, .tc-glabel').forEach((p) => { p.classList.toggle('dim', !owns(sel, p)); p.classList.toggle('on', owns(sel, p)); });
    detail.innerHTML = `<span class="k at-mono">${st ? 'Erasmus Mundus' : d.years}</span><div class="body">
      <h3>${esc(st ? st.full : d.title)}</h3><p class="org at-mono">${esc(st ? 'MSc Artificial Intelligence · ' + d.years : d.org)}</p>
      ${st ? '' : `<p class="d">${esc(d.desc)}</p>${tags(d.tags)}`}
      ${!st && d.stations ? `<div class="tc-unis">${d.stations.map((u) => {
          const ps = d.built.filter((p) => p.org === u.key), mo = Math.round((u.to - u.from) * 12);
          return `<div class="tc-uni"><p class="h at-mono">${logo(u.logo)}<span>${esc(u.full)}</span></p><p class="m at-mono">${mo} months · ${String(ps.length).padStart(2, '0')} ${ps.length === 1 ? 'project' : 'projects'}</p>${ps.map((p) => `<a href="${R}${p.href}">${esc(p.title)}&nbsp;<span aria-hidden="true">→</span></a>`).join('')}</div>`;
        }).join('')}</div>`
      : built.length ? `<div class="tc-built">${built.map((p) => `<a href="${R}${p.href}">${esc(p.title)}&nbsp;<span aria-hidden="true">→</span></a>`).join('')}</div>`
                     : (st ? '' : `<p class="org at-mono" style="margin-top:12px">Industry role · no public projects</p>`)}
    </div>`;
  };
  // Hover (or click/tap/focus) selects, and the selection stays after the pointer leaves:
  // it only changes on another stage, and clears on an outside click, Escape, or back navigation.
  const preview = select, pin = select;
  const hideTip = () => tip.classList.remove('on');
  const reset = () => {
    clear(); hideTip();
    // A clicked dot keeps focus across navigation; focus re-shows its tooltip, so release it.
    if (document.activeElement && document.activeElement.classList.contains('tc-dot')) document.activeElement.blur();
  };
  root.querySelectorAll('.tc-bar, .tc-glabel, .tc-hit').forEach((b) => {
    b.addEventListener('click', () => pin(b.dataset.sel));
    b.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') preview(b.dataset.sel); });
    b.addEventListener('focus', () => preview(b.dataset.sel));
  });
  // Back/forward cache restores the page as it was left: start clean instead of frozen.
  window.addEventListener('pageshow', (e) => { if (e.persisted && root.isConnected) reset(); });
  window.addEventListener('pagehide', () => { if (root.isConnected) reset(); });
  root.querySelectorAll('.tc-dot').forEach((p) => {
    const show = () => { tip.textContent = p.dataset.tip; tip.style.left = p.style.left; tip.style.top = p.style.top; tip.classList.add('on'); };
    p.addEventListener('pointerenter', (e) => { show(); if (e.pointerType === 'mouse') preview(p.dataset.sel); }); p.addEventListener('focus', show);
    p.addEventListener('pointerleave', () => tip.classList.remove('on')); p.addEventListener('blur', () => tip.classList.remove('on'));
    p.addEventListener('click', () => tip.classList.remove('on'));
  });
  // Click/tap anywhere outside the chart's bars, dots and detail clears the selection; so does Escape.
  const outside = (e) => { if (!root.isConnected) return document.removeEventListener('pointerdown', outside); if (!e.target.closest('.tc-bar, .tc-glabel, .tc-hit, .tc-dot, .tc-detail')) reset(); };
  document.addEventListener('pointerdown', outside);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.isConnected) reset(); });
  // Snap bars and gridlines to whole pixels so 1px borders render evenly on both sides.
  const snap = () => {
    root.querySelectorAll('.tc-bar').forEach((b) => {
      const W = b.parentElement.clientWidth;
      const l = Math.round((x(+b.dataset.f) / 100) * W), r = Math.round((x(+b.dataset.t) / 100) * W);
      b.style.left = l + 'px'; b.style.width = (r - l) + 'px';
    });
    root.querySelectorAll('.tc-tick').forEach((t) => { t.style.left = Math.round((+t.dataset.p / 100) * t.parentElement.clientWidth) + 'px'; });
  };
  snap();
  new ResizeObserver(snap).observe(root.querySelector('.tc-grid'));
  clear();
}


mount.innerHTML = chart('graphite', 'exp');
wireChart(mount);
const tc = mount.querySelector('.tc');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { tc.classList.add('play'); io.disconnect(); } }, { rootMargin: '0px 0px -15% 0px' });
  io.observe(tc);
} else tc.classList.add('play');
})();
