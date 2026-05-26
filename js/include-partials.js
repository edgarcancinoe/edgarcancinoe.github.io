document.addEventListener('DOMContentLoaded', async () => {
  const includeNodes = document.querySelectorAll('[data-include]');
  await Promise.all(Array.from(includeNodes).map(async (node) => {
    const url = node.getAttribute('data-include');
    if (!url) return;
    try {
      const cachedHtml = sessionStorage.getItem(`project-card:${url}`);
      const html = cachedHtml || await fetchPartial(url);
      node.innerHTML = html;
      node.classList.add('project-card');
      node.removeAttribute('data-include');
      if (!cachedHtml) sessionStorage.setItem(`project-card:${url}`, html);
    } catch (err) {
      console.error(err);
      node.innerHTML = `<div class="text-red-400 text-sm">Failed to load: ${url}</div>`;
    }
  }));

  // After all cards are loaded, collect badges and wire up filters
  initializeFiltering();
  initializePreviewMedia();
});

async function fetchPartial(url) {
  const res = await fetch(url, { cache: 'force-cache' });
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
  return await res.text();
}

function initializePreviewMedia() {
  const videos = Array.from(document.querySelectorAll('video[data-autoplay-visible]'));
  if (!videos.length) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  videos.forEach((video) => {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    if (prefersReduced) {
      video.removeAttribute('autoplay');
      video.pause();
      return;
    }
  });
  if (prefersReduced) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: [0, 0.35, 0.75] });
  videos.forEach((video) => io.observe(video));
}

function initializeFiltering() {
  const cards = Array.from(document.querySelectorAll('.project-card'));
  const getOrgBadge = (card) => card.querySelector('div.absolute.top-2.left-2');

  // Enhance institution badge size inside each project card (padding, icon, text)
  cards.forEach((card) => {
    const badge = getOrgBadge(card);
    if (!badge) return;
    // Normalize container spacing and vertical size (fixed height, no wrapping)
    badge.classList.remove('py-1.5');
    badge.classList.add('px-2.5', 'py-1', 'gap-2', 'items-center', 'h-7', 'whitespace-nowrap');
    // Enlarge logo icon
    const img = badge.querySelector('img');
    if (img) {
      // Normalize to consistent size and padding
      img.classList.remove('h-6', 'w-6');
      img.classList.add('h-4', 'w-4', 'rounded-full', 'object-contain', 'bg-white', 'p-0.5', 'shrink-0');
    }
    // Enlarge org name text
    const label = badge.querySelector('span');
    if (label) label.classList.add('text-xs', 'leading-none');
  });

  // Containers for chip groups
  const categoryChips = document.getElementById('categoryChips');
  const orgChips = document.getElementById('orgChips');
  const yearChips = document.getElementById('yearChips');
  const keywordChips = document.getElementById('keywordChips');

  // Collect sets
  const allOrgs = new Set();
  const allYears = new Set();
  const allKeywords = new Set();

  // Helper: detect year
  const isYear = (txt) => /^\d{4}$/.test(txt);

  // Extract metadata from each card
  cards.forEach((card) => {
    // Grab org label inside the org badge (supports text-xs or text-sm)
    const orgSpan = getOrgBadge(card)?.querySelector('span');
    const org = orgSpan ? orgSpan.textContent.trim() : '';
    if (org) {
      card.dataset.org = org;
      allOrgs.add(org);
    }

    // Collect all small spans as candidates
    const spans = Array.from(card.querySelectorAll('span.text-xs, span[class*="text-xs"]'));
    const keywords = new Set();
    let year = '';
    spans.forEach((s) => {
      const text = s.textContent.trim();
      if (!text) return;
      if (text === org) return; // skip org
      if (isYear(text)) {
        year = text;
        allYears.add(text);
        return;
      }
      keywords.add(text);
      allKeywords.add(text);
    });
    if (year) card.dataset.year = year;
    card.dataset.keywords = Array.from(keywords).join('|');
  });

  // Sort helpers
  const sortAlpha = (a, b) => a.localeCompare(b);
  const sortDescNum = (a, b) => Number(b) - Number(a);

  // Render chips (generic)
  const renderChips = (container, items, styleFn, clickFn, isActiveFn) => {
    if (!container) return;
    container.innerHTML = '';
    items.forEach((item) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = item;
      btn.setAttribute('data-value', item);
      btn.className = styleFn(false);
      btn.addEventListener('click', () => clickFn(item));
      container.appendChild(btn);
    });
    // Store a method to update active styles
    container.updateActive = () => {
      const buttons = container.querySelectorAll('button');
      buttons.forEach((btn) => {
        const val = btn.getAttribute('data-value') || btn.textContent.trim();
        const active = isActiveFn(val);
        btn.className = styleFn(active);
      });
    };
  };

  // Selected filters
  let selected = { category: 'All', org: 'All', year: 'All', keyword: 'All' };

  // Chip style functions (keep chips sized to content)
  const orgStyle = (active) => `inline-flex self-start items-center gap-2 px-2.5 py-1 rounded-full border whitespace-nowrap text-xs ${active ? 'bg-[#eceff3] text-[#181c20] border-[#4f5660] font-semibold' : 'bg-[#ffffff] text-[#48515c] border-[#cfd6de]'}`;
  const categoryStyle = (active) => `px-3 py-1 text-xs sm:text-sm rounded-full border ${active ? 'bg-[#eceff3] text-[#181c20] border-[#4f5660]' : 'bg-[#ffffff] text-[#626b75] border-[#cfd6de]'} hover:border-[#4f5660] transition-colors`;
  // Make years visually consistent with the neutral card badge styling.
  const yearStyle = (active) => `px-2.5 py-1 text-xs rounded-full border ${active ? 'bg-[#eceff3] text-[#181c20] border-[#4f5660] font-semibold' : 'bg-[#ffffff] text-[#626b75] border-[#cfd6de]'} hover:border-[#4f5660] transition-colors`;
  const keywordStyle = (active) => `px-2 py-1 text-xs rounded-full border ${active ? 'bg-[#eceff3] text-[#181c20] border-[#4f5660] font-semibold' : 'bg-[#ffffff] text-[#626b75] border-[#cfd6de]'} hover:border-[#4f5660] transition-colors`;

  const applyFilter = () => {
    const category = selected.category || 'All';
    cards.forEach((card) => {
      const matchCategory = category === 'All' || card.dataset.category === category;
      const matchOrg = selected.org === 'All' || (card.dataset.org || '') === selected.org;
      const matchYear = selected.year === 'All' || (card.dataset.year || '') === selected.year;
      const cardKeywords = (card.dataset.keywords || '').split('|').filter(Boolean);
      const matchKeyword = selected.keyword === 'All' || cardKeywords.includes(selected.keyword);
      const visible = matchCategory && matchOrg && matchYear && matchKeyword;
      card.style.display = visible ? '' : 'none';

      // Highlight in-card org badge when selected
      const orgBadge = getOrgBadge(card);
      if (orgBadge) {
        if (selected.org !== 'All' && (card.dataset.org || '') === selected.org) {
          orgBadge.classList.add('border-[#4f5660]');
        } else {
          orgBadge.classList.remove('border-[#4f5660]');
        }
        // Ensure org label keeps intended text style
        const orgLabel = orgBadge.querySelector('span');
        if (orgLabel) {
          orgLabel.classList.remove('text-white');
          orgLabel.classList.add('text-[#16202b]');
        }
      }

      // Highlight in-card year/keyword badges when selected
      const badgeSpans = card.querySelectorAll('span.text-xs, span[class*="text-xs"]');
      badgeSpans.forEach((el) => {
        const txt = (el.textContent || '').trim();
        // Do not alter the org label's own span styling here
        if (txt === (card.dataset.org || '')) return;

        // Enforce consistent vertical sizing and alignment in all states
        el.classList.add('inline-flex', 'items-center', 'py-1', 'leading-none', 'rounded-full', 'border');

        const isYearSel = selected.year !== 'All' && txt === selected.year;
        const isKeywordSel = selected.keyword !== 'All' && txt === selected.keyword;
        if (isYearSel || isKeywordSel) {
          el.classList.add('bg-[#eceff3]', 'border-[#4f5660]', 'font-semibold');
          el.classList.remove('border-transparent');
        } else {
          // Keep dimensions identical by keeping a transparent border when inactive
          el.classList.add('border-transparent');
          el.classList.remove('bg-[#eceff3]', 'border-[#4f5660]', 'font-semibold');
        }
      });
    });

    // Hide sections with no visible cards
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      const sectionCards = section.querySelectorAll('.project-card');
      // Only toggle visibility for sections that actually contain project cards
      if (sectionCards.length > 0) {
        let anyVisible = false;
        sectionCards.forEach((c) => { if (c.style.display !== 'none') anyVisible = true; });
        section.style.display = anyVisible ? '' : 'none';
      }
    });

    // Update chip active styles
    categoryChips && categoryChips.updateActive && categoryChips.updateActive();
    orgChips && orgChips.updateActive && orgChips.updateActive();
    yearChips && yearChips.updateActive && yearChips.updateActive();
    keywordChips && keywordChips.updateActive && keywordChips.updateActive();
  };

  // Category chips
  const categories = ['All', 'Artificial Intelligence', 'Robotics', 'Signal Processing / Embedded Systems'];
  const onCategoryClick = (val) => { selected.category = (selected.category === val ? 'All' : val); applyFilter(); };
  renderChips(categoryChips, categories, categoryStyle, onCategoryClick, (v) => selected.category === v);

  // Click handlers
  const onOrgClick = (val) => { selected.org = (selected.org === val ? 'All' : val); applyFilter(); };
  const onYearClick = (val) => { selected.year = (selected.year === val ? 'All' : val); applyFilter(); };
  const onKeywordClick = (val) => { selected.keyword = (selected.keyword === val ? 'All' : val); applyFilter(); };

  // Mapping organization -> logo filename in images/logos/
  const orgLogoMap = {
    'Tec de Monterrey': 'tec.webp',
    'Sapienza University': 'unirm.webp',
    'Personal': 'images/fototec.webp',
    'Rice University': 'rice.webp',
    'University of London': 'uol.webp',
    'UPF': 'upf.webp',
    'Pompeu Fabra University': 'upf.webp',
    'DeepLearning.AI': 'dlai.webp',
    'CS50': 'cs50.webp',
    'EMAI': 'emai.webp',
    'SC': 'sc.webp'
  };

  // Specialized render for org chips with logos
  const renderOrgChips = (container, items) => {
    if (!container) return;
    container.innerHTML = '';
    items.forEach((org) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('data-value', org);
      btn.className = orgStyle(false);
      const logo = orgLogoMap[org];
      let src = '';
      if (logo) {
        src = logo.includes('/') ? logo : `images/logos/${logo}`;
      }
      const imgHtml = src ? `<img alt="${org} Logo" class="h-5 w-5 rounded-full object-contain bg-white p-0.5" src="${src}"/>` : '';
      btn.innerHTML = `${imgHtml}<span class="text-sm">${org}</span>`;
      btn.addEventListener('click', () => onOrgClick(org));
      container.appendChild(btn);
    });
    container.updateActive = () => {
      const buttons = container.querySelectorAll('button');
      buttons.forEach((btn) => {
        const active = btn.getAttribute('data-value') === selected.org;
        btn.className = orgStyle(active);
      });
    };
  };

  // Render groups
  renderOrgChips(orgChips, Array.from(allOrgs).sort(sortAlpha));
  renderChips(yearChips, Array.from(allYears).sort(sortDescNum), yearStyle, onYearClick, (v) => selected.year === v);
  renderChips(keywordChips, Array.from(allKeywords).sort(sortAlpha), keywordStyle, onKeywordClick, (v) => selected.keyword === v);

  // Make badges inside cards clickable for filtering by the right group
  cards.forEach((card) => {
    // 1) Organization badge (may use text-sm). Target the whole badge container.
    const orgBadge = getOrgBadge(card);
    if (orgBadge) {
      const orgLabel = orgBadge.querySelector('span');
      const orgText = orgLabel ? orgLabel.textContent.trim() : '';
      if (orgText) {
        orgBadge.setAttribute('role', 'button');
        orgBadge.classList.add('cursor-pointer');
        orgBadge.addEventListener('click', () => { onOrgClick(orgText); });
      }
    }

    // 2) Year and keyword chips (generally text-xs) remain clickable
    const badgeSpans = card.querySelectorAll('span.text-xs, span[class*="text-xs"]');
    badgeSpans.forEach((el) => {
      const txt = el.textContent.trim();
      if (!txt) return;
      el.setAttribute('role', 'button');
      el.classList.add('cursor-pointer');
      el.addEventListener('click', () => {
        if (isYear(txt)) {
          onYearClick(txt);
        } else if (txt !== (card.dataset.org || '')) {
          onKeywordClick(txt);
        }
      });
    });
  });

  // Initial filter state
  applyFilter();
}
