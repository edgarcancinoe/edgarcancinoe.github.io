document.addEventListener('DOMContentLoaded', async () => {
  const includeNodes = document.querySelectorAll('[data-include]');
  await Promise.all(Array.from(includeNodes).map(async (node) => {
    const url = node.getAttribute('data-include');
    if (!url) return;
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
      const html = await res.text();
      node.innerHTML = html;
      node.classList.add('project-card');
      node.removeAttribute('data-include');
    } catch (err) {
      console.error(err);
      node.innerHTML = `<div class="text-red-400 text-sm">Failed to load: ${url}</div>`;
    }
  }));

  // After all cards are loaded, collect badges and wire up filters
  initializeFiltering();
});

function initializeFiltering() {
  const cards = Array.from(document.querySelectorAll('.project-card'));
  // Extract badges: only small badge spans (class contains 'text-xs') inside a card
  const allBadges = new Set();
  cards.forEach((card) => {
    const spans = card.querySelectorAll('span.text-xs, span[class*="text-xs"]');
    const badges = new Set();
    spans.forEach((s) => {
      const text = s.textContent.trim();
      if (!text) return;
      // Exclude obvious non-badges if needed (none for now)
      badges.add(text);
      allBadges.add(text);
    });
    card.dataset.badges = Array.from(badges).join('|');
  });

  // Populate badge filter dropdown
  const badgeSelect = document.getElementById('badgeFilter');
  const chipsContainer = document.getElementById('filterChips');
  if (badgeSelect) {
    const sorted = Array.from(allBadges).sort((a, b) => a.localeCompare(b));
    for (const badge of sorted) {
      const opt = document.createElement('option');
      opt.value = badge;
      opt.textContent = badge;
      badgeSelect.appendChild(opt);
    }
    // Also render clickable chips for badges
    if (chipsContainer) {
      chipsContainer.innerHTML = '';
      for (const badge of sorted) {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'px-2 py-1 bg-[#38e07b]/10 text-[#9fe4b8] text-xs rounded-full border border-[#38e07b]/30 hover:border-[#38e07b] hover:text-white transition-colors';
        chip.textContent = badge;
        chip.addEventListener('click', () => {
          setBadge(badge);
          applyFilter();
        });
        chipsContainer.appendChild(chip);
      }
    }
  }

  const categorySelect = document.getElementById('categoryFilter');
  let selectedBadge = badgeSelect ? badgeSelect.value : 'all';

  const setBadge = (badge) => {
    selectedBadge = badge;
    if (badgeSelect) badgeSelect.value = badge;
  };

  // Make badges inside cards clickable for filtering
  cards.forEach((card) => {
    const badgeSpans = card.querySelectorAll('span.text-xs, span[class*="text-xs"]');
    badgeSpans.forEach((el) => {
      el.setAttribute('role', 'button');
      el.classList.add('cursor-pointer');
      el.addEventListener('click', (e) => {
        const txt = el.textContent.trim();
        if (!txt) return;
        setBadge(txt);
        applyFilter();
      });
    });
  });

  const updateChipActive = () => {
    if (!chipsContainer) return;
    const children = chipsContainer.querySelectorAll('button');
    children.forEach((btn) => {
      const isActive = selectedBadge !== 'all' && btn.textContent.trim() === selectedBadge;
      btn.classList.toggle('bg-[#38e07b]/20', isActive);
      btn.classList.toggle('text-[#38e07b]', isActive);
      btn.classList.toggle('border-[#38e07b]', isActive);
    });
  };

  const applyFilter = () => {
    const category = categorySelect ? categorySelect.value : 'all';
    const badge = selectedBadge || 'all';
    cards.forEach((card) => {
      const matchesCategory = category === 'all' || card.dataset.category === category;
      const cardBadges = card.dataset.badges || '';
      const matchesBadge = badge === 'all' || cardBadges.split('|').includes(badge);
      const visible = matchesCategory && matchesBadge;
      card.style.display = visible ? '' : 'none';
    });

    // Hide entire sections whose cards are all hidden
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      const sectionCards = section.querySelectorAll('.project-card');
      let anyVisible = false;
      sectionCards.forEach((c) => { if (c.style.display !== 'none') anyVisible = true; });
      section.style.display = anyVisible ? '' : 'none';
    });

    updateChipActive();
  };

  categorySelect && categorySelect.addEventListener('change', applyFilter);
  badgeSelect && badgeSelect.addEventListener('change', (e) => {
    selectedBadge = badgeSelect.value;
    applyFilter();
  });
  const resetBtn = document.getElementById('resetFilters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      // reset both filters
      selectedBadge = 'all';
      if (badgeSelect) badgeSelect.value = 'all';
      if (categorySelect) categorySelect.value = 'all';
      applyFilter();
    });
  }
  // Initial filter state: show all by default
  applyFilter();
}
