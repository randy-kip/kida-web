/* Services & Pricing — interactive industries tabs, scroll reveal, metric count-up */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // industry name -> case-study href (only where one exists)
  var LINKS = {
    'PI Associates OKC': 'case-studies/pi-associates.html',
    'Ask a Barrister': 'case-studies/ask-a-barrister.html',
    'Bail 2 GO': 'case-studies/client-10.html',
    'Cherokee CPA': 'case-studies/cherokee-cpa.html',
    'Beauty in the Books': 'case-studies/beauty-in-the-books.html',
    'Beva Homes': 'case-studies/beva-homes.html',
    'Mr. Rooter Ottawa': 'case-studies/mr-rooter.html',
    'Northern Inspections': 'case-studies/northern-inspections.html',
    'Bins4less USA': 'case-studies/bins4less.html',
    'LoudLion': 'case-studies/loudlion.html',
    'Custodia.care': 'case-studies/client-9.html'
  };

  var INDUSTRIES = [
    {
      name: 'Legal Services',
      clients: ['PI Associates OKC', 'Ask a Barrister', 'Bail 2 GO'],
      metric: 'Up to $1.4M pipeline value added',
      pricing: 'Setup $2,500 – $8,000 · Retainer $300 – $800/mo (optional)',
      pricingNote: 'Retainer covers ongoing maintenance, optimisation & support',
      stats: [
        { value: '+35%', label: 'Case capacity increase' },
        { value: '80%', label: 'Less manual intake work' },
        { value: '5 min', label: 'Doc generation (was 25 min)' },
        { value: '75%', label: 'Less data re-entry' }
      ],
      capabilities: ['AI document generation', 'Automated case intake', 'HIPAA / legal form automation', 'WhatsApp-guided document collection', 'OCR + AI document verification', 'Automated follow-up timelines', 'Records request tracking', 'CRM integration']
    },
    {
      name: 'Accounting & Bookkeeping',
      clients: ['Cherokee CPA', 'Beauty in the Books'],
      metric: '$45K+ annual capacity unlocked',
      pricing: 'Setup $1,500 – $5,000 · Retainer $200 – $600/mo (optional)',
      pricingNote: 'Scales with number of clients and document volume',
      stats: [
        { value: '4x', label: 'Document throughput' },
        { value: '90%', label: 'Processing time saved' },
        { value: '77%', label: 'Reporting time reduction' },
        { value: '0', label: 'Seasonal temp hires needed' }
      ],
      capabilities: ['Invoice & receipt OCR processing', 'Bank statement extraction', 'Automated client report generation', 'Accounting software integration', 'Validation & error-checking workflows', 'PDF report auto-delivery']
    },
    {
      name: 'Real Estate',
      clients: ['Beva Homes'],
      metric: '3x lead capacity with zero new hires',
      metric2: '$2.73M opportunity value flowing through the system within 2 months',
      pricing: 'Setup $1,500 – $4,500 · Retainer $200 – $600/mo (optional)',
      pricingNote: 'Or 5–12% commission on campaign-generated revenue',
      stats: [
        { value: 'Instant', label: 'Lead response time' },
        { value: '0', label: 'Leads lost to leakage' },
        { value: '6 mo.', label: 'Automated nurture period' },
        { value: '1 view', label: 'All sources in one place' }
      ],
      capabilities: ['Multi-source lead capture', 'CRM pipeline automation', 'Voice AI for inbound calls', 'Bilingual SMS/email sequences', 'Lead nurture (warm, cold, future)', 'Marketing campaign automation', 'Speed-to-lead workflows']
    },
    {
      name: 'Home Services & Plumbing',
      clients: ['Mr. Rooter Ottawa'],
      metric: '$250K+ revenue protected in 90 days',
      pricing: 'Setup $2,000 – $6,000 · Retainer $250 – $700/mo (optional)',
      pricingNote: 'Higher-end for multi-location or franchise deployments',
      stats: [
        { value: '1,515', label: 'Calls handled by AI' },
        { value: '<2 sec', label: 'Answer time 24/7' },
        { value: '98.7%', label: 'Positive sentiment' },
        { value: '$0', label: 'Extra headcount cost' }
      ],
      capabilities: ['24/7 AI voice agent', 'Appointment booking into CRM', 'Bilingual call handling', 'Emergency escalation logic', 'CRM + analytics integration', 'After-hours lead capture']
    },
    {
      name: 'Construction & Building Inspection',
      clients: ['Northern Inspections'],
      clientNotes: { 'Northern Inspections': 'Australia' },
      metric: '$72K+ extra annual revenue capacity',
      pricing: 'Setup $2,000 – $6,500 · Retainer $200 – $600/mo (optional)',
      pricingNote: 'Varies with code database complexity and report volume',
      stats: [
        { value: '2x', label: 'Weekly inspection capacity' },
        { value: '75%', label: 'Report time reduction' },
        { value: '98%+', label: 'Compliance accuracy' },
        { value: '60%', label: 'Faster client delivery' }
      ],
      capabilities: ['Automated report generation', 'Building code cross-referencing', 'Digital field data capture', 'Compliance database integration', 'Automated quality checks']
    },
    {
      name: 'Logistics & Waste Management',
      clients: ['Bins4less USA'],
      metric: 'Zero leads fall through the cracks',
      pricing: 'Setup $1,500 – $4,000 · Retainer $200 – $500/mo (optional)',
      pricingNote: 'Or ROI-based commission tied to lead conversion',
      stats: [
        { value: 'Auto', label: 'Lead routing & assignment' },
        { value: '100%', label: 'Lead source attribution' },
        { value: '3-step', label: 'Automated SMS follow-up' },
        { value: 'Live', label: 'ROI dashboard' }
      ],
      capabilities: ['Multi-source lead capture (FB, Google, Yelp)', 'CRM automation & pipeline management', 'Round-robin team assignment', 'Automated SMS sequences', 'Historical data reactivation', 'ROI attribution dashboards']
    },
    {
      name: 'Marketing & Agencies',
      clients: ['LoudLion'],
      metric: '1 person = output of 3–5 SDRs',
      pricing: 'Setup $1,500 – $5,000 · Retainer $200 – $600/mo (optional)',
      pricingNote: 'Higher for full outbound engine with AI research & scraping',
      stats: [
        { value: '35K+', label: 'Personalised emails sent' },
        { value: '95%', label: 'Manual research eliminated' },
        { value: '2,400', label: 'Emails/day one operator' },
        { value: '5x', label: 'SDR capacity multiplier' }
      ],
      capabilities: ['AI-powered outbound email engine', 'Prospect research automation', 'Social & ad library scraping', 'Hyper-personalised copywriting at scale', 'Outbound sequence management']
    },
    {
      name: 'Family Care & Social Services',
      clients: ['Custodia.care'],
      metric: 'ROI visible in month 1',
      pricing: 'Setup $1,200 – $3,500 · Retainer $150 – $400/mo (optional)',
      pricingNote: 'Scales with number of members and document types',
      stats: [
        { value: 'Instant', label: 'Onboarding (was 24h+)' },
        { value: '20 hrs', label: 'Admin saved per week' },
        { value: '0%', label: 'Document error rate' },
        { value: '\u221E', label: 'Concurrent signups handled' }
      ],
      capabilities: ['Automated onboarding workflows', 'Secure document vault creation', 'Legal form generation', 'Successor / handover automation', 'Smart file naming & organisation']
    }
  ];

  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  function elFrom(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }

  function clientChip(name, note) {
    // note is rendered inside the chip but outside the LINKS-keyed name, so the
    // case-study lookup above is never affected by display-only annotations.
    var suffix = note ? ' <span class="sp-chip-note">(' + esc(note) + ')</span>' : '';
    var href = LINKS[name];
    if (href) return '<a class="sp-chip" href="' + href + '">' + esc(name) + suffix + ' <span style="margin-left:6px;opacity:.6;">→</span></a>';
    return '<span class="sp-chip static">' + esc(name) + suffix + '</span>';
  }

  function statBox(s) {
    return '<div class="sp-stat"><div class="sp-stat-num">' + esc(s.value) + '</div>' +
           '<div class="sp-stat-label">' + esc(s.label) + '</div></div>';
  }

  function capTag(c) { return '<span class="sp-cap">' + esc(c) + '</span>'; }

  function buildIndustries() {
    var tabs = document.getElementById('sp-tabs');
    var panels = document.getElementById('sp-panels');
    if (!tabs || !panels) return;

    INDUSTRIES.forEach(function (ind, i) {
      var tab = elFrom('<button class="sp-tab' + (i === 0 ? ' active' : '') + '" data-i="' + i + '">' + esc(ind.name) + '</button>');
      tabs.appendChild(tab);

      var notes = ind.clientNotes || {};
      var chips = ind.clients.map(function (c) { return clientChip(c, notes[c]); }).join('');
      var badges = '<div class="sp-badge">' + esc(ind.metric) + '</div>';
      if (ind.metric2) badges += '<div class="sp-badge">' + esc(ind.metric2) + '</div>';
      var pricing = '';
      if (ind.pricing) {
        pricing += '<div class="sp-price-line"><span class="sp-price-mark">$</span>' + esc(ind.pricing) + '</div>';
        if (ind.pricingNote) pricing += '<p class="sp-price-note">' + esc(ind.pricingNote) + '</p>';
      }
      var stats = (ind.stats && ind.stats.length)
        ? '<div class="sp-stats">' + ind.stats.map(statBox).join('') + '</div>' : '';
      var caps = (ind.capabilities && ind.capabilities.length)
        ? '<div class="sp-caps">' + ind.capabilities.map(capTag).join('') + '</div>' : '';

      var panel = elFrom(
        '<div class="sp-panel' + (i === 0 ? ' active' : '') + '" data-i="' + i + '">' +
          '<div class="sp-ind-card">' +
            '<h3>' + esc(ind.name) + '</h3>' +
            '<div class="sp-ind-clients">' + chips + '</div>' +
            '<div class="sp-badges">' + badges + '</div>' +
            pricing + stats + caps +
          '</div>' +
        '</div>'
      );
      panels.appendChild(panel);
    });

    tabs.addEventListener('click', function (e) {
      var btn = e.target.closest('.sp-tab');
      if (!btn) return;
      var i = btn.getAttribute('data-i');
      tabs.querySelectorAll('.sp-tab').forEach(function (t) { t.classList.toggle('active', t === btn); });
      panels.querySelectorAll('.sp-panel').forEach(function (p) { p.classList.toggle('active', p.getAttribute('data-i') === i); });
    });
  }

  function scrollReveal() {
    var els = document.querySelectorAll('.reveal');
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); } });
    }, { threshold: 0.15 });
    els.forEach(function (el) { obs.observe(el); });
  }

  function countUp() {
    var nums = document.querySelectorAll('.sp-count');
    if (reduce) { nums.forEach(function (n) { n.textContent = n.getAttribute('data-target'); }); return; }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var n = en.target, target = parseInt(n.getAttribute('data-target'), 10), start = null, dur = 1100;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          n.textContent = Math.round(p * target);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        obs.unobserve(n);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { obs.observe(n); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildIndustries();
    scrollReveal();
    countUp();
  });
})();
