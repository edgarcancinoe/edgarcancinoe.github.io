// Walkthrough charts: SVG drawn at the container's real width, so text stays legible from phone to desktop.
window.atChart = (() => {
  const t = (x, y, s, o = {}) => `<text x="${x}" y="${y}" fill="${o.fill || 'var(--ink)'}" text-anchor="${o.a || 'start'}"${o.w ? ` font-weight="${o.w}"` : ''}${o.sans ? ' class="s"' : ''}>${s}</text>`;
  const svg = (w, h, body) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  // Redraw on width changes only: the new height must not trigger another pass.
  const draw = (id, f) => {
    const el = document.getElementById(id);
    let last = 0;
    new ResizeObserver(() => {
      const w = Math.round(el.clientWidth);
      if (w && w !== last) { last = w; el.innerHTML = f(w); }
    }).observe(el);
  };
  const TONE = { hi: 'fill="var(--red)"', base: 'fill="var(--ink2)"', dim: 'fill="var(--ink2)" opacity=".35"', ink: 'fill="var(--ink)"' };
  // groups: [[heading or null, [[label, value, tone], ...]], ...]. Labels move above the bars when there's no room beside them.
  const bars = (id, groups, { max = 100, fmt = (v) => `${v}%`, label = 120 } = {}) => draw(id, (W) => {
    const stack = W < label + 180, L = stack ? 6 : label, R = 52, rh = stack ? 46 : 30, bx = (v) => Math.max((W - L - R) * Math.min(v, max) / max, 2);
    let s = '', y = 0;
    for (const [g, rows] of groups) {
      if (g) { if (y) s += `<line x1="0" x2="${W}" y1="${y + 4}" y2="${y + 4}" stroke="var(--line)"/>`; s += t(0, y + 20, g.toUpperCase(), { fill: 'var(--ink2)' }); y += 26; }
      for (const [n, v, tone] of rows) {
        const hi = tone === 'hi', by = y + (stack ? 24 : 7);
        if (hi) s += `<rect x="0" y="${y}" width="${W}" height="${rh - 2}" fill="var(--red)" opacity=".07"/>`;
        s += t(stack ? 6 : L - 10, y + (stack ? 16 : 19), n, { a: stack ? 'start' : 'end', sans: true, fill: hi ? 'var(--red)' : 'var(--ink)', w: hi ? 650 : 0 });
        s += `<rect x="${L}" y="${by}" width="${W - L - R}" height="14" fill="var(--bg)"/><rect x="${L}" y="${by}" width="${bx(v)}" height="14" ${TONE[tone]}/>`;
        s += t(W - R + 8, by + 11, fmt(v), { fill: hi ? 'var(--red)' : 'var(--ink)' });
        y += rh;
      }
      y += 6;
    }
    return svg(W, y, s);
  });
  return { t, svg, draw, bars };
})();
