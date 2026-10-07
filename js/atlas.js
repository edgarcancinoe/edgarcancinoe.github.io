// Atlas — shared page behaviour: scroll reveals, play-when-visible video, copy buttons.
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal .rv blocks once as they enter the viewport.
  const reveals = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('show');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('show'));
  }

  // Videos play only while mostly on screen; never autoplay with reduced motion.
  const videos = document.querySelectorAll('video[data-autoplay-visible]');
  videos.forEach((v) => { v.muted = true; v.loop = true; v.playsInline = true; });
  if (!reduced && videos.length && 'IntersectionObserver' in window) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
        if (isIntersecting && intersectionRatio >= 0.35) target.play().catch(() => {});
        else target.pause();
      });
    }, { threshold: [0, 0.35] });
    videos.forEach((v) => vio.observe(v));
  }

  // Copy-to-clipboard buttons.
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    const label = btn.textContent;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.textContent = 'Copied';
      } catch {
        btn.textContent = 'Failed';
      }
      setTimeout(() => { btn.textContent = label; }, 1500);
    });
  });
})();
