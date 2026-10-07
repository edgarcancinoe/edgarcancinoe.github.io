// Corner bot: a BotAvatar that watches the cursor, glances at playing videos, sleeps at night,
// and opens a menu (topics, Q&A from data/bot-qa.json) with quick-action circles beside it.
// Build: npm run build:bot  →  js/bot.js
import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BotAvatar } from 'bot-avatars';

const SIZE = 72;
// bot-avatars only follows a pointer within ~3 head-widths (1 head-width = size / 1.5).
// Past that, relay a stand-in pointer just inside the full-strength radius, in the real direction,
// so the eyes and head track the cursor out to REACH.
const UNIT = SIZE / 1.5;
const REACH = 850; // px from the bot's face; beyond this the bot ignores the cursor
const GLANCE_EVERY = [5000, 9000]; // ms between glances at a playing video (random in range)
const GLANCE_FOR = 2200; // ms it holds a glance
const EMAIL = 'edgarcancinoe@gmail.com';

const TOPICS = [
  { n: '01', label: 'AI', href: 'projects.html#computer-vision' },
  { n: '02', label: 'Robotics', href: 'projects.html#robotics' },
  { n: '03', label: 'Generative', href: 'research.html#piu' },
];

// Visitor's local night: the bot starts asleep and wakes when the cursor comes near.
const isNight = () => { const h = new Date().getHours(); return h >= 23 || h < 6; };

const faceCenter = (el) => {
  const r = el.getBoundingClientRect();
  return [r.left + r.width / 2, r.top + r.height / 2 + 0.1 * UNIT];
};
// Feed the library a pointer just beside the face, in the direction of (x, y).
const lookToward = (el, x, y) => {
  const [cx, cy] = faceCenter(el);
  const dx = x - cx, dy = y - cy, k = (0.98 * UNIT) / (Math.hypot(dx, dy) || 1);
  document.dispatchEvent(new PointerEvent('pointermove', { clientX: cx + dx * k, clientY: cy + dy * k, pointerType: 'mouse' }));
};
// A pointer far away: the library lets go and the bot returns to its idle gaze.
const letGo = () => document.dispatchEvent(new PointerEvent('pointermove', { clientX: -1e5, clientY: -1e5, pointerType: 'mouse' }));

const playingVideo = () => {
  let best = null, area = 0;
  document.querySelectorAll('video').forEach((v) => {
    if (v.paused) return;
    const r = v.getBoundingClientRect();
    const w = Math.min(r.right, innerWidth) - Math.max(r.left, 0);
    const h = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
    if (w > 0 && h > 0 && w * h > area) { area = w * h; best = v; }
  });
  return best;
};

function useGaze(face, setNear, asleep) {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let near = false, glancing = null, timer = 0;
    const aimAtGlance = () => {
      const r = glancing.getBoundingClientRect();
      lookToward(face.current, r.left + r.width / 2, r.top + r.height / 2);
    };
    const onMove = (e) => {
      if (!e.isTrusted || e.pointerType !== 'mouse' || !face.current) return;
      const [cx, cy] = faceCenter(face.current);
      const d = Math.hypot(e.clientX - cx, e.clientY - cy);
      const n = d <= REACH;
      if (n !== near) { near = n; setNear(n); }
      if (!n) { if (glancing) aimAtGlance(); return; } // far: idle, or keep the glance steady
      glancing = null;
      if (d >= 2.5 * UNIT) lookToward(face.current, e.clientX, e.clientY); // close range is the library's
    };
    const onScroll = () => { if (glancing && face.current) aimAtGlance(); };
    const schedule = () => {
      timer = setTimeout(() => {
        const v = !near && !asleep.current && face.current && playingVideo();
        if (!v) return schedule();
        glancing = v;
        aimAtGlance();
        timer = setTimeout(() => { glancing = null; letGo(); schedule(); }, GLANCE_FOR);
      }, GLANCE_EVERY[0] + Math.random() * (GLANCE_EVERY[1] - GLANCE_EVERY[0]));
    };
    // window bubble runs after the library's document listener, so the stand-in wins.
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    schedule();
    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [face, setNear, asleep]);
}

const Icon = ({ children }) => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">{children}</svg>
);
const ACTIONS = [
  { label: 'Email', href: () => `mailto:${EMAIL}`, icon: <Icon><rect x="1.5" y="3" width="13" height="10" rx="1" /><path d="M1.8 3.5 8 8.5l6.2-5" /></Icon> },
  { label: 'CV', href: (root) => `${root}res/Jose_E_Hernandez_CV.pdf`, ext: true, icon: <Icon><path d="M3.5 1.5h6l3 3v10h-9z" /><path d="M8 6.5v5M5.8 9.3 8 11.5l2.2-2.2" /></Icon> },
  { label: 'GitHub', href: () => 'https://github.com/edgarcancinoe', ext: true, icon: <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg> },
];

function CornerBot({ root }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(null); // index into qa, or null for the main menu
  const [qa, setQa] = useState([]);
  const [near, setNear] = useState(false);
  const [night, setNight] = useState(isNight);
  const wrap = useRef(null);
  const face = useRef(null);
  const timer = useRef(0);
  const pinned = useRef(false); // set by a click: hover-out no longer closes the menu

  const asleep = night && !near && !open;
  const asleepRef = useRef(asleep);
  asleepRef.current = asleep;
  useGaze(face, setNear, asleepRef);

  useEffect(() => {
    const id = setInterval(() => setNight(isNight()), 60000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    fetch(`${root}data/bot-qa.json`).then((r) => (r.ok ? r.json() : [])).then(setQa).catch(() => {});
  }, [root]);

  const close = () => { clearTimeout(timer.current); pinned.current = false; setOpen(false); setView(null); };
  // Hover intent: open at once, close after a short grace so the pointer can travel into the menu.
  const show = () => { clearTimeout(timer.current); setOpen(true); };
  const hide = (delay = 160) => {
    if (pinned.current) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(close, delay);
  };
  const ask = (i) => { pinned.current = true; setView(i); };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (view !== null) setView(null); else close();
    };
    const onDown = (e) => { if (!wrap.current.contains(e.target)) close(); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown); };
  }, [open, view]);

  const item = view !== null ? qa[view] : null;
  const ext = (href) => /^https?:|\.pdf$/.test(href);
  const rel = (href) => (/^(https?:|mailto:)/.test(href) ? href : root + href);

  return (
    <div
      ref={wrap}
      className="at-bot"
      data-open={open ? '' : undefined}
      onPointerEnter={(e) => e.pointerType === 'mouse' && show()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && hide()}
      onBlur={(e) => { if (!wrap.current.contains(e.relatedTarget)) hide(0); }}
    >
      <div id="at-bot-menu" className="at-bot-menu at-mono" role="dialog" aria-label="Explore and ask" inert={!open}>
        {item ? (
          <div className="ans" key={view}>
            <button type="button" className="back" onClick={() => setView(null)}>← Back</button>
            <p className="qq">{item.q}</p>
            <p className={item.a ? 'aa' : 'aa todo'}>{item.a || 'Answer coming soon.'}</p>
            {item.link && (
              <a className="more" href={rel(item.link.href)} {...(ext(item.link.href) ? { target: '_blank', rel: 'noopener' } : {})}>
                {item.link.label} {ext(item.link.href) ? '↗' : '→'}
              </a>
            )}
          </div>
        ) : (
          <>
            <span className="h">Explore</span>
            {TOPICS.map((t) => (
              <a key={t.n} href={root + t.href} onClick={close}>
                <span className="n">{t.n}</span>
                <span>{t.label}</span>
                <span className="go" aria-hidden="true">→</span>
              </a>
            ))}
            {qa.length > 0 && <span className="h">Ask</span>}
            {qa.map((q, i) => (
              <button type="button" key={q.q} className="q" onClick={() => ask(i)}>
                <span className="n">?</span>
                <span className="qt">{q.q}</span>
                <span className="go" aria-hidden="true">→</span>
              </button>
            ))}
          </>
        )}
      </div>

      <div className="at-bot-acts" aria-label="Quick actions" inert={!open}>
        {ACTIONS.map((a, i) => (
          <a
            key={a.label}
            className="at-bot-act"
            style={{ '--i': i }}
            href={a.href(root)}
            aria-label={a.label}
            data-tip={a.label}
            {...(a.ext ? { target: '_blank', rel: 'noopener' } : {})}
          >
            {a.icon}
          </a>
        ))}
      </div>

      <button
        type="button"
        ref={face}
        className="at-bot-btn"
        aria-label="Explore and ask"
        aria-expanded={open}
        aria-controls="at-bot-menu"
        // Capture phase: toggle here and stop the click before it reaches the avatar's own hop.
        onClickCapture={(e) => {
          e.stopPropagation();
          if (open && pinned.current) close(); else { pinned.current = true; setOpen(true); }
        }}
      >
        <BotAvatar
          type="mech"
          size={SIZE}
          theme="light"
          color="#e5401b"
          saturation={1}
          brightness={1}
          jumpEvery={0}
          state={asleep ? 'sleeping' : 'default'}
        />
      </button>
    </div>
  );
}

const mount = document.getElementById('at-bot');
if (mount) createRoot(mount).render(<CornerBot root={mount.dataset.root || ''} />);
