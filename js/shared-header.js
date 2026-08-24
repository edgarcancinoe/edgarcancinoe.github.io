document.addEventListener('DOMContentLoaded', async () => {
  const slot = document.getElementById('site-header');
  if (!slot) return;
  try {
    const res = await fetch('partials/header.html');
    if (!res.ok) throw new Error(res.status);
    slot.innerHTML = await res.text();
  } catch (e) {
    console.error('Failed to load header:', e);
    return;
  }

  const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
  const navPage = page === 'research' ? 'projects' : page;
  const active = 'text-[var(--brand)]';
  const inactive = 'text-[var(--fg-subtle)] hover:text-[var(--fg-primary)] transition-colors';

  slot.querySelectorAll('[data-nav]').forEach(link => {
    const isActive = link.dataset.nav === navPage;
    link.classList.remove(...link.classList);
    if (link.closest('[data-nav-links]')) {
      link.className = `text-sm font-medium ${isActive ? active : inactive}`;
    } else {
      link.className = `py-2 ${isActive ? active + ' font-semibold' : ''}`;
      if (!link.nextElementSibling?.classList?.contains('flex')) {
        link.classList.add('border-b', 'border-[var(--bd-muted)]/60');
      }
    }
  });

  const menuBtn = slot.querySelector('#mobileMenuBtn');
  const menu = slot.querySelector('#mobileMenu');
  const iconOpen = slot.querySelector('#iconHamburger');
  const iconClose = slot.querySelector('#iconClose');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      const open = !menu.classList.contains('hidden');
      menu.classList.toggle('hidden', open);
      iconOpen?.classList.toggle('hidden', !open);
      iconClose?.classList.toggle('hidden', open);
      menuBtn.setAttribute('aria-expanded', String(!open));
    });
  }

  slot.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.dataset.copy);
      const orig = btn.innerHTML;
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';
      setTimeout(() => { btn.innerHTML = orig; }, 1500);
    });
  });
});
