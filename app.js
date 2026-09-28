/**
 * ONION-SMART AI — Complete Working Application
 * कांदा स्मार्ट AI — संपूर्ण कार्यरत अॅप्लिकेशन
 * Smart India Hackathon — Full Demo Mode
 */

// ===== State Management =====
const state = {
  currentScreen: 'screen-onboarding',
  language: 'mr',
  history: [],
  farmerData: {
    name: 'रामदास पाटील',
    village: 'लासलगाव',
    district: 'नाशिक',
    farmArea: '2.5',
    soilType: 'काळी माती',
    onionVariety: 'लाल कांदा',
    sowingDate: '2026-07-17',
    irrigationType: 'ठिबक',
    targetSize: 'मोठा / Preferred'
  },
  cropDay: 72,
  totalDays: 110,
  cropStage: 'कांदा वाढ',
  cropHealth: 'चांगले',
  qualityScore: 82,
  avgSize: 6.4,
  uniformity: 86,
  marketPrice: 2850,
  priceChange: +200,
  checkedTasks: JSON.parse(localStorage.getItem('checkedTasks') || '{}'),
  feedbackSubmitted: false,
  planApplied: false,
  scansCompleted: JSON.parse(localStorage.getItem('scansCompleted') || '0'),
  dismissedReminders: JSON.parse(localStorage.getItem('dismissedReminders') || '[]')
};

// Screens that should show bottom nav
const navScreens = [
  'screen-home', 'screen-lifecycle', 'screen-quality-scan', 'screen-quality-result',
  'screen-size-target', 'screen-monitoring', 'screen-crop-analysis',
  'screen-map', 'screen-officer-dashboard', 'screen-chatbot',
  'screen-market', 'screen-support', 'screen-low-price',
  'screen-harvest', 'screen-feedback', 'screen-next-season',
  'screen-reminders', 'screen-reports'
];

// ===== Navigation =====
function navigateTo(screenId) {
  if (state.currentScreen !== screenId) {
    state.history.push(state.currentScreen);
  }

  // Hide all screens with fade
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.animation = '';
  });

  // Show target screen with entrance animation
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    target.style.animation = 'screenFadeIn 0.3s ease-out';
    state.currentScreen = screenId;
    target.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  // Toggle bottom nav
  const nav = document.getElementById('bottom-nav');
  const fab = document.getElementById('journey-fab');
  if (navScreens.includes(screenId)) {
    nav.style.display = 'flex';
    fab.style.display = 'block';
  } else {
    nav.style.display = 'none';
    fab.style.display = 'none';
  }

  updateNavState(screenId);

  // Trigger screen-specific initialization
  setTimeout(() => initScreen(screenId), 100);
}

function navTo(screenId) { navigateTo(screenId); }

function goBack() {
  if (state.history.length > 0) {
    const prev = state.history.pop();
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(prev);
    if (target) {
      target.classList.add('active');
      state.currentScreen = prev;
      target.scrollTop = 0;
    }
    const nav = document.getElementById('bottom-nav');
    const fab = document.getElementById('journey-fab');
    if (navScreens.includes(prev)) {
      nav.style.display = 'flex';
      fab.style.display = 'block';
    } else {
      nav.style.display = 'none';
      fab.style.display = 'none';
    }
    updateNavState(prev);
    setTimeout(() => initScreen(prev), 100);
  } else {
    navigateTo('screen-home');
  }
}

function updateNavState(screenId) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.screen === screenId) {
      item.classList.add('active');
    }
  });
}

// ===== Screen Initializers =====
function initScreen(screenId) {
  switch(screenId) {
    case 'screen-home':
      updateHomeDashboard();
      animateCounters();
      break;
    case 'screen-quality-result':
      animateQualityGauge();
      break;
    case 'screen-market':
      drawMarketChart();
      break;
    case 'screen-officer-dashboard':
      animateBarChart();
      break;
    case 'screen-harvest':
      animateHarvestNumbers();
      break;
    case 'screen-map':
      initMapInteractions();
      break;
    case 'screen-monitoring':
      initMonitoringChecklist();
      break;
    case 'screen-reminders':
      initReminders();
      break;
  }
}

// ===== Screen Size & Device Mode View =====
function setDeviceView(mode) {
  document.body.classList.remove('mode-auto', 'mode-mobile', 'mode-tablet', 'mode-desktop');
  document.body.classList.add('mode-' + mode);

  document.querySelectorAll('.device-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
  });

  if (mode === 'mobile') {
    document.documentElement.style.setProperty('--app-current-width', '390px');
  } else if (mode === 'tablet') {
    document.documentElement.style.setProperty('--app-current-width', '768px');
  } else if (mode === 'desktop') {
    document.documentElement.style.setProperty('--app-current-width', '1140px');
  } else {
    document.documentElement.style.removeProperty('--app-current-width');
  }

  const modeNames = {
    'auto': state.language === 'en' ? '🔄 Screen Sensitive / Auto-Responsive View' : state.language === 'hi' ? '🔄 स्क्रीन संवेदनशील / ऑटो रिस्पॉन्सिव व्यू' : '🔄 स्क्रीन संवेदनशील / ऑटो रिस्पॉन्सिव्ह मोड',
    'mobile': state.language === 'en' ? '📱 Mobile Phone View (390px)' : state.language === 'hi' ? '📱 मोबाइल फोन व्यू (390px)' : '📱 मोबाईल फोन व्ह्यू (३९०px)',
    'tablet': state.language === 'en' ? '📟 Tablet View (768px)' : state.language === 'hi' ? '📟 टैबलेट व्यू (768px)' : '📟 टॅबलेट व्ह्यू (७६८px)',
    'desktop': state.language === 'en' ? '💻 Desktop Dashboard View (1140px)' : state.language === 'hi' ? '💻 डेस्कटॉप डैशबोर्ड व्यू (1140px)' : '💻 डेस्कटॉप डॅशबोर्ड व्ह्यू'
  };
  showToast(modeNames[mode] || mode);

  // Trigger chart redrawing when dimensions change
  setTimeout(() => {
    if (state.currentScreen === 'screen-market') drawMarketChart();
  }, 200);
}

// Window resize listener for screen sensitivity
window.addEventListener('resize', () => {
  if (document.body.classList.contains('mode-auto')) {
    if (state.currentScreen === 'screen-market') drawMarketChart();
  }
});

// ===== Language Selection (Multilingual Support) =====
function changeLanguage(lang) {
  selectLanguage(lang);
}

function selectLanguage(lang) {
  state.language = lang;
  try { localStorage.setItem('onion_smart_lang', lang); } catch (e) {}

  // Update button states in Demo bar, Onboarding & any active tabs
  document.querySelectorAll('.lang-pill-btn, .lang-btn').forEach(btn => {
    const bLang = btn.getAttribute('data-lang') || (btn.textContent.includes('मराठी') ? 'mr' : btn.textContent.includes('हिंदी') ? 'hi' : 'en');
    btn.classList.toggle('active', bLang === lang);
  });

  // Call DOM translation engine from i18n.js
  if (typeof window.applyTranslations === 'function') {
    window.applyTranslations(lang);
  }

  // Update Dynamic UI Labels
  updateMultilingualUI(lang);

  const toastMsg = lang === 'mr' ? '✅ भाषा: मराठी निवडली' : lang === 'hi' ? '✅ भाषा: हिंदी चुनी गई' : '✅ Language: English Selected';
  showToast(toastMsg);
}

function cycleLanguage() {
  const current = state.language || 'mr';
  const next = current === 'mr' ? 'hi' : current === 'hi' ? 'en' : 'mr';
  changeLanguage(next);
}

function toggleRole(role) {
  state.currentRole = role;
  document.getElementById('role-btn-farmer')?.classList.toggle('active', role === 'farmer');
  document.getElementById('role-btn-officer')?.classList.toggle('active', role === 'officer');

  if (role === 'officer') {
    navigateTo('screen-officer-dashboard');
    showToast(state.language === 'en' ? '🏛️ Switched to Agriculture Officer Portal' : state.language === 'hi' ? '🏛️ कृषि अधिकारी पोर्टल सक्रिय' : '🏛️ कृषी अधिकारी पोर्टल सुरू झाले');
  } else {
    navigateTo('screen-home');
    showToast(state.language === 'en' ? '👨‍🌾 Switched to Farmer View' : state.language === 'hi' ? '👨‍🌾 किसान पोर्टल सक्रिय' : '👨‍🌾 शेतकरी पोर्टल सुरू झाले');
  }
}

function quickDemoStart() {
  autoFillRegistration();
  setTimeout(() => {
    completeRegistration();
  }, 400);
}

function updateMultilingualUI(lang) {
  // Bottom Navigation Labels
  const navLabels = {
    'screen-home': { mr: 'मुख्य', hi: 'होम', en: 'Home' },
    'screen-lifecycle': { mr: 'पीक टप्पे', hi: 'फसल चरण', en: 'Stages' },
    'screen-quality-scan': { mr: 'गुणवत्ता', hi: 'गुणवत्ता', en: 'Quality' },
    'screen-chatbot': { mr: 'AI डॉक्टर', hi: 'AI डॉक्टर', en: 'AI Doctor' },
    'screen-market': { mr: 'बाजार भाव', hi: 'मंडी भाव', en: 'Mandi' }
  };

  document.querySelectorAll('#bottom-nav .nav-item').forEach(item => {
    const scr = item.getAttribute('data-screen');
    const labelEl = item.querySelector('.nav-label');
    if (scr && navLabels[scr] && labelEl) {
      labelEl.textContent = navLabels[scr][lang] || navLabels[scr]['mr'];
    }
  });

  // Dynamic Dashboard Updates
  if (state.currentScreen === 'screen-home') {
    updateHomeDashboard();
  }
}

// ===== Registration — Auto-fill Demo =====
function autoFillRegistration() {
  const fields = {
    'farmer-name': state.farmerData.name,
    'farmer-village': state.farmerData.village,
    'farm-area': state.farmerData.farmArea,
    'sowing-date': state.farmerData.sowingDate
  };

  let delay = 0;
  Object.entries(fields).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) {
      delay += 300;
      setTimeout(() => {
        el.value = value;
        el.style.transition = 'border-color 0.3s, box-shadow 0.3s';
        el.style.borderColor = 'var(--green-400)';
        el.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.15)';
        setTimeout(() => {
          el.style.borderColor = '';
          el.style.boxShadow = '';
        }, 800);
      }, delay);
    }
  });

  // Auto-select district
  const districtEl = document.getElementById('farmer-district');
  if (districtEl) {
    setTimeout(() => {
      districtEl.value = state.farmerData.district;
      districtEl.style.borderColor = 'var(--green-400)';
      setTimeout(() => districtEl.style.borderColor = '', 800);
    }, delay + 300);
  }

  showToast('✅ Demo डेटा भरला — नोंदणी पूर्ण करा');
}

function completeRegistration() {
  // Collect values or use defaults
  const name = document.getElementById('farmer-name')?.value || state.farmerData.name;
  const village = document.getElementById('farmer-village')?.value || state.farmerData.village;
  const district = document.getElementById('farmer-district')?.value || state.farmerData.district;
  const area = document.getElementById('farm-area')?.value || state.farmerData.farmArea;

  state.farmerData.name = name;
  state.farmerData.village = village;
  state.farmerData.district = district;
  state.farmerData.farmArea = area;

  showToast('✅ नोंदणी यशस्वी! ' + name);
  navigateTo('screen-home');
}

// ===== Home Dashboard Dynamic Updates =====
function updateHomeDashboard() {
  // Update greeting with farmer name
  const greeting = document.querySelector('.crop-banner-greeting');
  if (greeting) greeting.textContent = `🙏 नमस्कार, ${state.farmerData.name.split(' ')[0]}!`;

  // Update weather with random slight variations for "live" feel
  const temps = ['३०', '३१', '३२', '३३', '३४'];
  const conditions = ['अंशतः ढगाळ', 'स्वच्छ', 'अंशतः ढगाळ', 'ढगाळ'];
  const humidity = ['६२', '६५', '६८', '७०', '५८'];
  const weatherTemp = document.querySelector('.weather-temp');
  const weatherDesc = document.querySelector('.weather-desc');
  if (weatherTemp) weatherTemp.textContent = `${temps[Math.floor(Math.random()*temps.length)]}°C — ${conditions[Math.floor(Math.random()*conditions.length)]}`;
  if (weatherDesc) weatherDesc.textContent = `आर्द्रता ${humidity[Math.floor(Math.random()*humidity.length)]}% • वारा ८ km/h`;

  // Update crop info values dynamically
  const cropDayEl = document.querySelector('#screen-home .crop-info-value:nth-child(2)');
  // Update progress bar
  const progressFill = document.querySelector('#screen-home .progress-fill');
  const progressText = document.querySelector('#screen-home .progress-fill + p, #screen-home [style*="text-align:right"]');
  const pct = Math.round((state.cropDay / state.totalDays) * 100);
  if (progressFill) {
    progressFill.style.width = '0%';
    requestAnimationFrame(() => { progressFill.style.width = pct + '%'; });
  }
}

// ===== Animated Counters =====
function animateCounters() {
  document.querySelectorAll('.quality-stat-value, .harvest-value, .officer-stat-value').forEach(el => {
    const text = el.textContent;
    const num = parseInt(text);
    if (!isNaN(num) && num > 0) {
      let current = 0;
      const step = Math.ceil(num / 30);
      const suffix = text.replace(/[0-9,]/g, '');
      const interval = setInterval(() => {
        current += step;
        if (current >= num) {
          current = num;
          clearInterval(interval);
        }
        el.textContent = current.toLocaleString('en-IN') + suffix;
      }, 30);
    }
  });
}

// ===== Quality Gauge Animation =====
function animateQualityGauge() {
  const gauge = document.querySelector('.quality-gauge');
  if (!gauge) return;

  gauge.style.animation = 'none';
  gauge.offsetHeight; // trigger reflow
  gauge.style.animation = 'gaugeReveal 1s ease-out';

  // Animate score number
  const scoreEl = gauge.querySelector('.quality-score');
  if (scoreEl) {
    let current = 0;
    const target = state.qualityScore;
    const interval = setInterval(() => {
      current += 2;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      scoreEl.textContent = current + '%';
    }, 20);
  }

  // Animate breakdown bars
  document.querySelectorAll('.quality-stat').forEach((stat, i) => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(15px)';
    setTimeout(() => {
      stat.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      stat.style.opacity = '1';
      stat.style.transform = 'translateY(0)';
    }, 400 + i * 150);
  });
}

// ===== Market Price Chart (Canvas) =====
function drawMarketChart() {
  // Find or create canvas for market trend
  const container = document.querySelector('#screen-market .market-trend');
  if (!container) return;

  // Clear existing bars and add canvas
  const existingCanvas = container.querySelector('canvas');
  if (existingCanvas) existingCanvas.remove();

  const canvas = document.createElement('canvas');
  canvas.width = container.offsetWidth || 340;
  canvas.height = 100;
  canvas.style.width = '100%';
  canvas.style.height = '100px';
  canvas.style.borderRadius = '8px';

  // Keep existing bars for fallback, but add canvas overlay
  // Actually let's draw on top of existing trend bars
  // We'll create a smooth line chart instead
  const priceData = [2100, 2200, 2350, 2500, 2400, 2550, 2650, 2750, 2700, 2850];
  const labels = ['18', '19', '20', '21', '22', '23', '24', '25', '26', '27'];

  // Animate the trend bars with sequential reveal
  const bars = container.querySelectorAll('.trend-bar');
  bars.forEach((bar, i) => {
    const origHeight = bar.style.height;
    bar.style.height = '0%';
    bar.style.transition = 'height 0.5s ease';
    setTimeout(() => {
      bar.style.height = origHeight;
    }, i * 80);
  });
}

// ===== Bar Chart Animation =====
function animateBarChart() {
  document.querySelectorAll('.bar-chart .bar').forEach((bar, i) => {
    const origHeight = bar.style.height;
    bar.style.height = '0%';
    bar.style.transition = 'height 0.6s ease';
    setTimeout(() => {
      bar.style.height = origHeight;
    }, 200 + i * 150);
  });
}

// ===== Harvest Numbers Animation =====
function animateHarvestNumbers() {
  document.querySelectorAll('.harvest-value').forEach(el => {
    const text = el.textContent;
    const num = parseInt(text);
    if (!isNaN(num) && num > 0) {
      let current = 0;
      const step = Math.max(1, Math.ceil(num / 25));
      const suffix = text.replace(/[0-9]/g, '').trim();
      el.textContent = '0' + (suffix ? ' ' + suffix : '');
      const interval = setInterval(() => {
        current += step;
        if (current >= num) {
          current = num;
          clearInterval(interval);
        }
        el.textContent = current + (suffix ? ' ' + suffix : '');
      }, 40);
    }
  });
}

// ===== Upload Simulation with Scanning Animation =====
function simulateUpload(type) {
  if (type === 'crop') {
    const uploadArea = document.querySelector('#screen-crop-analysis .upload-area');
    const result = document.getElementById('crop-analysis-result');
    if (!uploadArea || !result) return;

    result.style.display = 'none';
    const uploadText = uploadArea.querySelector('.upload-text');
    const uploadSubtext = uploadArea.querySelector('.upload-subtext');
    const origText = uploadText?.textContent;
    const origSubtext = uploadSubtext?.textContent;

    // Phase 1: Uploading
    uploadArea.style.borderColor = 'var(--green-400)';
    uploadArea.style.background = 'var(--green-50)';
    if (uploadText) uploadText.textContent = '⬆️ फोटो अपलोड होत आहे...';
    if (uploadSubtext) uploadSubtext.textContent = '35%';

    setTimeout(() => {
      if (uploadSubtext) uploadSubtext.textContent = '72%';
    }, 600);

    // Phase 2: AI Scanning
    setTimeout(() => {
      if (uploadText) uploadText.textContent = '🔄 AI विश्लेषण करत आहे...';
      if (uploadSubtext) uploadSubtext.textContent = 'पीक आरोग्य, रोग, कीड तपासत आहे...';
      uploadArea.style.background = 'linear-gradient(135deg, var(--green-50), #e0f2fe)';

      // Add scanning line animation
      uploadArea.style.backgroundSize = '200% 200%';
      uploadArea.style.animation = 'scanPulse 1s ease-in-out infinite';
    }, 1200);

    // Phase 3: Complete
    setTimeout(() => {
      uploadArea.style.animation = '';
      if (uploadText) uploadText.textContent = '✅ विश्लेषण पूर्ण!';
      if (uploadSubtext) uploadSubtext.textContent = 'निकाल खाली पहा ↓';
      uploadArea.style.background = 'var(--green-50)';

      result.style.display = 'block';
      result.style.animation = 'slideUp 0.5s ease-out';
      result.scrollIntoView({ behavior: 'smooth', block: 'start' });

      state.scansCompleted++;
      localStorage.setItem('scansCompleted', state.scansCompleted);

      // Animate confidence meter
      const confFill = result.querySelector('.confidence-fill');
      if (confFill) {
        const w = confFill.style.width;
        confFill.style.width = '0%';
        confFill.style.transition = 'width 1s ease-out';
        setTimeout(() => { confFill.style.width = w; }, 100);
      }

      // Reset upload area after delay
      setTimeout(() => {
        if (uploadText) uploadText.textContent = origText;
        if (uploadSubtext) uploadSubtext.textContent = origSubtext;
        uploadArea.style.borderColor = '';
        uploadArea.style.background = '';
      }, 4000);
    }, 2800);

  } else if (type === 'quality') {
    // Quality scan with scanning overlay
    const uploadArea = document.querySelector('#screen-quality-scan .upload-area');
    if (uploadArea) {
      const uploadText = uploadArea.querySelector('.upload-text');
      const origText = uploadText?.textContent;

      uploadArea.style.borderColor = 'var(--onion-400)';
      uploadArea.style.background = 'var(--onion-50)';
      if (uploadText) uploadText.textContent = '🔬 कांदा गुणवत्ता तपासत आहे...';

      setTimeout(() => {
        if (uploadText) uploadText.textContent = '📊 Grade विश्लेषण...';
      }, 800);

      setTimeout(() => {
        if (uploadText) uploadText.textContent = origText;
        uploadArea.style.borderColor = '';
        uploadArea.style.background = '';
        navigateTo('screen-quality-result');
        showToast('✅ गुणवत्ता विश्लेषण पूर्ण — Grade A: ' + state.qualityScore + '%');
      }, 1800);
    } else {
      navigateTo('screen-quality-result');
    }
  }
}

function showAnalysis() {
  navigateTo('screen-crop-analysis');
  setTimeout(() => simulateUpload('crop'), 500);
}

// ===== Monitoring Checklist =====
function initMonitoringChecklist() {
  // Add interactive checklist items
  const checklistItems = [
    { id: 'check-water', icon: '💧', text: 'सिंचन स्थिती तपासा', done: state.checkedTasks['check-water'] || false },
    { id: 'check-leaves', icon: '🌿', text: 'पाने तपासा — रंग, आकार', done: state.checkedTasks['check-leaves'] || false },
    { id: 'check-pest', icon: '🐛', text: 'कीड/रोग तपासा', done: state.checkedTasks['check-pest'] || false },
    { id: 'check-soil', icon: '🌍', text: 'मातीची ओलसरपणा तपासा', done: state.checkedTasks['check-soil'] || false },
    { id: 'check-photo', icon: '📸', text: 'आजचा फोटो अपलोड करा', done: state.checkedTasks['check-photo'] || false }
  ];

  const existingChecklist = document.getElementById('monitoring-checklist');
  if (existingChecklist) existingChecklist.remove();

  const section = document.querySelector('#screen-monitoring .section:first-of-type');
  if (!section) return;

  const container = document.createElement('div');
  container.id = 'monitoring-checklist';
  container.style.cssText = 'padding:0 16px; margin-top:16px;';

  const title = document.createElement('div');
  title.className = 'section-title';
  title.innerHTML = '<span>✅</span> आजची तपासणी यादी';
  container.appendChild(title);

  checklistItems.forEach(item => {
    const row = document.createElement('div');
    row.style.cssText = `
      display:flex; align-items:center; gap:12px; padding:12px 16px; margin-bottom:8px;
      background:${item.done ? 'var(--green-50)' : 'white'}; border-radius:var(--radius-md);
      border:1px solid ${item.done ? 'var(--green-200)' : 'var(--gray-200)'};
      cursor:pointer; transition: all 0.3s ease;
    `;
    row.innerHTML = `
      <div style="width:28px;height:28px;border-radius:50%;border:2px solid ${item.done ? 'var(--green-500)' : 'var(--gray-300)'};
        display:flex;align-items:center;justify-content:center;font-size:14px;
        background:${item.done ? 'var(--green-500)' : 'transparent'}; color:white; transition:all 0.3s;"
      >${item.done ? '✓' : ''}</div>
      <span style="font-size:16px;">${item.icon}</span>
      <span style="font-size:14px; flex:1; text-decoration:${item.done ? 'line-through' : 'none'}; color:${item.done ? 'var(--gray-400)' : 'var(--gray-700)'};">${item.text}</span>
    `;
    row.onclick = () => toggleChecklistItem(item.id, row, item);
    container.appendChild(row);
  });

  // Add completion counter
  const doneCount = checklistItems.filter(i => i.done).length;
  const counter = document.createElement('div');
  counter.id = 'checklist-counter';
  counter.style.cssText = 'text-align:center; padding:8px; font-size:13px; color:var(--gray-500);';
  counter.textContent = `${doneCount}/${checklistItems.length} पूर्ण`;
  container.appendChild(counter);

  section.parentNode.insertBefore(container, section.nextSibling);
}

function toggleChecklistItem(id, row, item) {
  item.done = !item.done;
  state.checkedTasks[id] = item.done;
  localStorage.setItem('checkedTasks', JSON.stringify(state.checkedTasks));

  const dot = row.querySelector('div');
  const text = row.querySelector('span:last-child');

  if (item.done) {
    dot.style.background = 'var(--green-500)';
    dot.style.borderColor = 'var(--green-500)';
    dot.textContent = '✓';
    text.style.textDecoration = 'line-through';
    text.style.color = 'var(--gray-400)';
    row.style.background = 'var(--green-50)';
    row.style.borderColor = 'var(--green-200)';
    showToast('✅ ' + item.text + ' — पूर्ण!');
  } else {
    dot.style.background = 'transparent';
    dot.style.borderColor = 'var(--gray-300)';
    dot.textContent = '';
    text.style.textDecoration = 'none';
    text.style.color = 'var(--gray-700)';
    row.style.background = 'white';
    row.style.borderColor = 'var(--gray-200)';
  }

  // Update counter
  const counter = document.getElementById('checklist-counter');
  if (counter) {
    const total = Object.keys(state.checkedTasks).length || 5;
    const done = Object.values(state.checkedTasks).filter(v => v).length;
    counter.textContent = `${done}/5 पूर्ण`;
    if (done === 5) {
      counter.textContent = '🎉 सर्व तपासणी पूर्ण!';
      counter.style.color = 'var(--green-600)';
      counter.style.fontWeight = '700';
    }
  }
}

// ===== Map Interactions =====
function initMapInteractions() {
  const districtData = {
    'नाशिक': { quality: 'चांगली', gradeA: '78%', avgSize: '6.2 cm', issue: 'कमी', detail: 'थोडा पाणी ताण काही भागात', rec: 'नियमित सिंचन चालू ठेवा' },
    'अहमदनगर': { quality: 'चांगली', gradeA: '75%', avgSize: '5.9 cm', issue: 'कमी', detail: 'काही भागात कीड समस्या', rec: 'कीटकनाशक फवारणी करा' },
    'पुणे': { quality: 'सरासरी', gradeA: '65%', avgSize: '5.5 cm', issue: 'मध्यम', detail: 'आकार विविधता जास्त', rec: 'एकसमान सिंचन व खत' },
    'सोलापूर': { quality: 'चांगली', gradeA: '72%', avgSize: '6.0 cm', issue: 'कमी', detail: 'पीक चांगले', rec: 'सध्याची पद्धत चालू ठेवा' },
    'धुळे': { quality: 'समस्या', gradeA: '52%', avgSize: '4.8 cm', issue: 'जास्त', detail: 'पाणी ताण आणि रोग वाढले', rec: 'तातडीने सिंचन व तज्ञ सल्ला' },
    'जळगाव': { quality: 'सरासरी', gradeA: '62%', avgSize: '5.3 cm', issue: 'मध्यम', detail: 'उशीरा लागवड — वाढ कमी', rec: 'पोटॅश खत अधिक वापरा' }
  };

  document.querySelectorAll('#screen-map .filter-chip').forEach(chip => {
    chip.addEventListener('click', function() {
      this.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');

      const district = this.textContent.trim();
      const data = districtData[district];
      if (!data) return;

      // Update district info card
      const districtName = document.querySelector('#screen-map .district-name');
      const stats = document.querySelectorAll('#screen-map .district-stat-value');
      const detail = document.querySelector('#screen-map .district-info [style*="margin-top:12px"] p:first-child');
      const rec = document.querySelector('#screen-map .district-info [style*="margin-top:12px"] p:last-child');

      if (districtName) districtName.textContent = '📍 ' + district + ' जिल्हा';
      if (stats[0]) stats[0].textContent = data.quality;
      if (stats[1]) stats[1].textContent = data.gradeA;
      if (stats[2]) stats[2].textContent = data.avgSize;
      if (stats[3]) stats[3].textContent = data.issue;
      if (detail) detail.innerHTML = `<strong>सामान्य समस्या:</strong> ${data.detail}`;
      if (rec) rec.innerHTML = `<strong>शिफारस:</strong> ${data.rec}`;

      // Update comparison
      const comparison = document.querySelector('#screen-map .card-green p:last-child');
      if (comparison) {
        const yourGrade = state.qualityScore;
        const distGrade = parseInt(data.gradeA);
        if (yourGrade > distGrade) {
          comparison.innerHTML = `तुमच्या शेतातील गुणवत्ता (${yourGrade}%) ${district} जिल्ह्याच्या सरासरीपेक्षा (${data.gradeA}) <strong style="color:var(--green-600)">चांगली</strong> आहे!`;
        } else {
          comparison.innerHTML = `तुमच्या शेतातील गुणवत्ता (${yourGrade}%) ${district} जिल्ह्याच्या सरासरीशी (${data.gradeA}) <strong style="color:var(--warning)">समतुल्य</strong> आहे.`;
        }
      }

      showToast('📍 ' + district + ' — गुणवत्ता: ' + data.quality);
    });
  });
}

// ===== Reminders System =====
function initReminders() {
  document.querySelectorAll('#screen-reminders .reminder-card').forEach((card, i) => {
    if (state.dismissedReminders.includes(i)) {
      card.style.display = 'none';
      return;
    }
    // Add dismiss button if not already present
    if (!card.querySelector('.dismiss-btn')) {
      const btn = document.createElement('button');
      btn.className = 'dismiss-btn';
      btn.textContent = '✕';
      btn.style.cssText = 'background:none; border:none; color:var(--gray-400); font-size:16px; cursor:pointer; padding:4px 8px;';
      btn.onclick = (e) => {
        e.stopPropagation();
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        card.style.opacity = '0';
        card.style.transform = 'translateX(100%)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
        state.dismissedReminders.push(i);
        localStorage.setItem('dismissedReminders', JSON.stringify(state.dismissedReminders));
        showToast('🔔 सूचना हटवली');
      };
      card.appendChild(btn);
      card.style.cursor = 'pointer';
    }
  });
}

// ===== Chat System =====
const chatResponses = {
  'माझ्या कांद्याची पाने पिवळी का झाली?':
    '🍂 कांद्याची पाने पिवळी होण्याची कारणे:\n\n1. 💧 पाणी ताण — अपुरे पाणी\n2. 🧪 नायट्रोजन कमतरता\n3. 🐛 थ्रिप्स कीड\n4. 🦠 पर्ल रॉट रोग\n\n📌 शिफारस: पहिले पाणी शेड्यूल तपासा. पाने नीट तपासा — कीड दिसत असल्यास तज्ञाचा सल्ला घ्या.\n\n⚠️ कीटकनाशक वापरण्यापूर्वी तज्ञांचा सल्ला अवश्य घ्या.',

  'पाणी कधी द्यावे?':
    '💧 कांदा वाढ (Bulb Development) टप्प्यात सिंचन:\n\n• ठिबक: दररोज ३०-४५ मिनिटे\n• तुषार: दर ३-४ दिवसांनी\n• माती ओलसर ठेवा, पण पाणी साचू देऊ नका\n\n📌 सध्या तुमच्या पिकाला नियमित पाणी गरजेचे आहे — कांदा मोठा होण्यासाठी.',

  'माझा कांदा काढणीसाठी तयार आहे का?':
    `🌾 तुमचे पीक अजून काढणीसाठी तयार नाही.\n\nदिवस: ${state.cropDay} / ${state.totalDays}\nटप्पा: ${state.cropStage}\n\n📌 अजून ~${state.totalDays - state.cropDay} दिवस लागतील. जेव्हा ५०-७५% पाने पिवळी/खाली पडतील तेव्हा काढणी करा.\n\nपुन्हा १५ दिवसांनी तपासा!`,

  'कांद्याची गुणवत्ता कशी सुधारू?':
    `📈 गुणवत्ता सुधारण्यासाठी:\n\n1. 💧 नियमित सिंचन — पाणी ताण टाळा\n2. 🧪 पोटॅश खत वापरा — कांदा मोठा होतो\n3. 📐 योग्य अंतर ठेवा — एकसमान आकार\n4. 🐛 कीड तपासत रहा\n5. ☀️ योग्य वेळी काढणी करा\n\n📌 तुमची सध्याची गुणवत्ता: ${state.qualityScore}% Grade A — चांगली आहे!`,

  'माझ्या भागात कांद्याची गुणवत्ता कशी आहे?':
    `🗺️ ${state.farmerData.district} जिल्हा — सध्याची स्थिती:\n\n• सरासरी गुणवत्ता: चांगली\n• Grade A: ७८%\n• सरासरी आकार: ६.२ cm\n\n✅ तुमच्या शेतातील गुणवत्ता (${state.qualityScore}%) जिल्ह्याच्या सरासरीपेक्षा चांगली आहे!\n\n📌 काही भागात पाणी ताणामुळे समस्या नोंदवल्या आहेत.`,

  'किंमत कमी असेल तर कोणती सरकारी मदत उपलब्ध आहे?':
    '🏛️ उपलब्ध सरकारी मदत:\n\n1. 🏪 NAFED कांदा खरेदी योजना\n2. 🏠 कांदा चाळ अनुदान — ५०%\n3. 🛡️ फसल बीमा योजना\n4. 🧪 निविष्ठा अनुदान\n\n📌 सविस्तर माहितीसाठी "सरकारी मदत" विभागात जा.\n\n⚠️ योजना व नियम वेळोवेळी बदलतात — अधिकृत माहितीसाठी कृषी कार्यालयाशी संपर्क साधा.',

  'खत कधी द्यावे?':
    '🧪 कांदा वाढ टप्प्यात खत:\n\n• पोटॅश (MOP): ५० kg/एकर — आत्ता द्या\n• सूक्ष्म अन्नद्रव्ये: बोरॉन, झिंक फवारणी\n• नायट्रोजन: कमी प्रमाणात (जास्त पानवाढ टाळा)\n\n📌 तुमच्या पिकाला आत्ता पोटॅश सर्वात महत्त्वाचे — कांदा मोठा व घट्ट होतो.\n\n⏰ पुढील ५ दिवसांत खत द्या.',

  'कांद्याला कोणता रोग लागतो?':
    '🦠 कांद्याचे प्रमुख रोग:\n\n1. 🟣 पर्पल ब्लॉच — जांभळे डाग\n2. 🔵 डाऊनी मिल्ड्यू — पानावर बुरशी\n3. 🟤 बेसल रॉट — कांदा सडतो\n4. ⚪ व्हाईट रॉट — मुळाशी पांढरा बुरशी\n\n📌 फोटो अपलोड करा — AI रोग ओळखण्यास मदत करेल.\n\n⚠️ कीटकनाशक वापरण्यापूर्वी तज्ञांचा सल्ला घ्या.',

  'कांदा कसा साठवावा?':
    '🏠 कांदा साठवणूक:\n\n• कांदा चाळमध्ये ठेवा — हवा खेळती राहते\n• जमिनीपासून उंच ठेवा\n• ओलसर कांदे वेगळे करा\n• दर आठवड्याला तपासा\n\n📌 योग्य साठवणुकीने ३-६ महिने टिकतो.\n💰 बाजार भाव वाढल्यावर विकता येतो.\n\n🏛️ कांदा चाळ बांधकामासाठी ५०% सरकारी अनुदान उपलब्ध!',

  'बाजार भाव काय आहे?':
    `💰 आजचा बाजार भाव:\n\n🏪 लासलगाव: ₹${state.marketPrice}/क्विंटल (${state.priceChange > 0 ? '📈 +' : '📉 '}₹${Math.abs(state.priceChange)})\n🏪 पिंपळगाव: ₹${state.marketPrice - 150}/क्विंटल\n🏪 मनमाड: ₹${state.marketPrice - 250}/क्विंटल\n\n📊 गुणवत्तेनुसार:\n• Grade A: ₹2,800-₹3,200\n• मध्यम: ₹2,000-₹2,600\n\n📌 तुमची गुणवत्ता Grade A असल्यामुळे चांगला भाव मिळेल!`,

  'थ्रिप्स कीड कशी ओळखावी?':
    '🐛 थ्रिप्स कीड ओळखणे:\n\n• पाने चांदीसारखी/पांढरी दिसतात\n• पानांवर लहान चिरा/खरचटल्यासारखे\n• कीड अगदी लहान — डोळ्यांना दिसत नाही\n• पाने वाकडी/विकृत होतात\n\n📌 तपासणी: सकाळी पाने हलवा — लहान कीड उडतात.\n\n⚠️ फोटो अपलोड करा — AI ने तपासा.\nकीटकनाशक फक्त तज्ञ सल्ल्याने वापरा.'
};

let typingIndicator = null;

function sendSuggestion(text) {
  addChatMessage(text, 'user');

  const suggestions = document.getElementById('chat-suggestions');
  if (suggestions) suggestions.style.display = 'none';

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    const lang = state.language || 'mr';
    const kb = (window.CHATBOT_RESPONSES && window.CHATBOT_RESPONSES[lang]) ? window.CHATBOT_RESPONSES[lang] : (window.CHATBOT_RESPONSES ? window.CHATBOT_RESPONSES['mr'] : null);
    
    let response = '';
    if (kb) {
      if (text.includes('करपा') || text.includes('धब्बा') || text.includes('blotch') || text.includes('जांभळा')) {
        response = kb.purple_blotch;
      } else if (text.includes('थ्रिप्स') || text.includes('कीड') || text.includes('कीट') || text.includes('thrips')) {
        response = kb.thrips;
      } else if (text.includes('खत') || text.includes('खाद') || text.includes('fertilizer') || text.includes('फुगवण')) {
        response = kb.fertilizer;
      } else if (text.includes('भाव') || text.includes('मंडी') || text.includes('rate') || text.includes('बाजार') || text.includes('price')) {
        response = kb.mandi;
      } else {
        response = chatResponses[text] || kb.default;
      }
    } else {
      response = chatResponses[text] || '🤖 ' + text;
    }
    addChatMessage(response, 'bot');
  }, 800 + Math.random() * 600);
}

function sendChat() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  addChatMessage(text, 'user');
  input.value = '';

  const suggestions = document.getElementById('chat-suggestions');
  if (suggestions) suggestions.style.display = 'none';

  showTypingIndicator();

  // Smart multilingual response matching
  setTimeout(() => {
    removeTypingIndicator();
    const lang = state.language || 'mr';
    const kb = (window.CHATBOT_RESPONSES && window.CHATBOT_RESPONSES[lang]) ? window.CHATBOT_RESPONSES[lang] : (window.CHATBOT_RESPONSES ? window.CHATBOT_RESPONSES['mr'] : null);
    let response = '';

    const lowerText = text.toLowerCase();
    if (lowerText.includes('पाणी') || lowerText.includes('water') || lowerText.includes('सिंचन') || lowerText.includes('सिंचाई')) {
      response = lang === 'en' ? '💧 Regulate irrigation: Withhold water 10-15 days prior to harvest to prevent neck rot.' : lang === 'hi' ? '💧 सिंचाई नियंत्रण: कटाई से १०-१५ दिन पहले पानी बंद करें ताकि भंडारण में सड़न न हो।' : chatResponses['पाणी कधी द्यावे?'];
    } else if (lowerText.includes('करपा') || lowerText.includes('धब्बा') || lowerText.includes('blotch')) {
      response = kb ? kb.purple_blotch : chatResponses['कांद्याला कोणता रोग लागतो?'];
    } else if (lowerText.includes('थ्रिप्स') || lowerText.includes('कीड') || lowerText.includes('कीट') || lowerText.includes('pest') || lowerText.includes('thrips')) {
      response = kb ? kb.thrips : chatResponses['थ्रिप्स कीड कशी ओळखावी?'];
    } else if (lowerText.includes('खत') || lowerText.includes('खाद') || lowerText.includes('fertilizer') || lowerText.includes('पोषण')) {
      response = kb ? kb.fertilizer : chatResponses['खत कधी द्यावे?'];
    } else if (lowerText.includes('किंमत') || lowerText.includes('भाव') || lowerText.includes('price') || lowerText.includes('बाजार') || lowerText.includes('मंडी')) {
      response = kb ? kb.mandi : chatResponses['बाजार भाव काय आहे?'];
    } else if (lowerText.includes('साठ') || lowerText.includes('storage') || lowerText.includes('चाळ') || lowerText.includes('भंडारण')) {
      response = lang === 'en' ? '🧅 Storage Advice: Cure bulbs for 3 days in the field, grade thoroughly, and store in a well-ventilated bamboo chawl at 65-70% humidity.' : lang === 'hi' ? '🧅 भंडारण सलाह: ३ दिन खेत में सुखाएं, अच्छी ग्रेडिंग करें और हवादार चाळ में रखें।' : chatResponses['कांदा कसा साठवावा?'];
    } else if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('नमस्कार') || lowerText.includes('नमस्ते')) {
      response = lang === 'en' ? `🙏 Hello ${state.farmerData.name.split(' ')[0]}! I am Onion Doctor. Your crop is at Day ${state.cropDay} (${state.cropStage}). Quality: ${state.qualityScore}% Grade A. How can I help you today?` : lang === 'hi' ? `🙏 नमस्ते ${state.farmerData.name.split(' ')[0]} जी! मैं आपका AI प्याज डॉक्टर हूँ। आपकी फसल दिन ${state.cropDay} पर है। ग्रेड: ${state.qualityScore}% Grade A। क्या सहायता चाहिए?` : `🙏 नमस्कार ${state.farmerData.name.split(' ')[0]}! मी कांदा मित्र. तुमचे पीक दिवस ${state.cropDay} वर आहे. गुणवत्ता: ${state.qualityScore}% Grade A ✅. विचारा आपला प्रश्न!`;
    } else {
      response = kb ? kb.default : chatResponses['कांद्याची गुणवत्ता कशी सुधारू?'];
    }
    addChatMessage(response, 'bot');
  }, 900 + Math.random() * 500);
}

function showTypingIndicator() {
  const messages = document.getElementById('chat-messages');
  if (!messages) return;

  typingIndicator = document.createElement('div');
  typingIndicator.className = 'chat-message bot';
  typingIndicator.id = 'typing-indicator';
  typingIndicator.innerHTML = `
    <img src="assets/chatbot_avatar.jpg" alt="" class="chat-avatar">
    <div class="chat-bubble" style="padding:12px 18px;">
      <div class="typing-dots">
        <span style="animation:typingDot 1.4s infinite;animation-delay:0s;">●</span>
        <span style="animation:typingDot 1.4s infinite;animation-delay:0.2s;">●</span>
        <span style="animation:typingDot 1.4s infinite;animation-delay:0.4s;">●</span>
      </div>
    </div>
  `;
  messages.appendChild(typingIndicator);
  messages.scrollTop = messages.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) indicator.remove();
}

function addChatMessage(text, type) {
  const messages = document.getElementById('chat-messages');
  const msg = document.createElement('div');
  msg.className = `chat-message ${type}`;
  msg.style.animation = 'chatBubbleIn 0.3s ease-out';

  if (type === 'bot') {
    msg.innerHTML = `
      <img src="assets/chatbot_avatar.jpg" alt="" class="chat-avatar">
      <div class="chat-bubble">${text.replace(/\n/g, '<br>')}</div>
    `;
  } else {
    msg.innerHTML = `
      <div style="width:36px;height:36px;border-radius:50%;background:var(--green-100);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">👤</div>
      <div class="chat-bubble">${text.replace(/\n/g, '<br>')}</div>
    `;
  }

  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

// ===== Voice Input =====
function startVoice() {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = state.language === 'mr' ? 'mr-IN' : state.language === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      const chatInput = document.getElementById('chat-input');
      if (chatInput && state.currentScreen === 'screen-chatbot') {
        chatInput.value = text;
        sendChat();
      } else {
        showToast('🎙️ तुम्ही म्हणालात: "' + text + '"');
      }
    };

    recognition.onerror = () => {
      showToast('🎙️ आवाज ऐकला नाही — पुन्हा प्रयत्न करा');
    };

    recognition.start();
    showToast('🎙️ बोला... ऐकत आहे');
  } else {
    showToast('🎙️ व्हॉइस इनपुट — बोलून सांगा! (Demo)');
    // Demo: auto-type a question
    if (state.currentScreen === 'screen-chatbot') {
      const input = document.getElementById('chat-input');
      if (input) {
        const demoText = 'माझ्या कांद्याला पाणी कधी द्यावे?';
        let i = 0;
        input.value = '';
        const typeInterval = setInterval(() => {
          input.value += demoText[i];
          i++;
          if (i >= demoText.length) {
            clearInterval(typeInterval);
            setTimeout(() => sendChat(), 300);
          }
        }, 50);
      }
    }
  }
}

// ===== PDF Download Simulation =====
function downloadPDF(reportName) {
  showToast('📥 ' + reportName + ' PDF तयार होत आहे...');

  setTimeout(() => {
    // Create a simple text blob as demo
    const content = `
═══════════════════════════════════════════
       कांदा स्मार्ट AI — ${reportName}
       ONION-SMART AI
═══════════════════════════════════════════

शेतकरी: ${state.farmerData.name}
गाव: ${state.farmerData.village}
जिल्हा: ${state.farmerData.district}
शेत क्षेत्र: ${state.farmerData.farmArea} एकर
कांदा प्रकार: ${state.farmerData.onionVariety}

───────────────────────────────────────────
पीक स्थिती
───────────────────────────────────────────
पीक दिवस: ${state.cropDay}/${state.totalDays}
टप्पा: ${state.cropStage}
आरोग्य: ${state.cropHealth}
गुणवत्ता: ${state.qualityScore}% Grade A
सरासरी आकार: ${state.avgSize} cm
एकसमानता: ${state.uniformity}%

───────────────────────────────────────────
बाजार माहिती
───────────────────────────────────────────
आजचा भाव: ₹${state.marketPrice}/क्विंटल
बाजार: लासलगाव

═══════════════════════════════════════════
⚠️ हे AI-आधारित अहवाल आहे. अधिकृत 
माहितीसाठी कृषी कार्यालयाशी संपर्क साधा.
═══════════════════════════════════════════
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = reportName.replace(/\s/g, '_') + '_Report.txt';
    a.click();
    URL.revokeObjectURL(url);

    showToast('✅ PDF डाउनलोड पूर्ण!');
  }, 1500);
}

// ===== Feedback Submission =====
function submitFeedback() {
  state.feedbackSubmitted = true;

  const activeEmoji = document.querySelector('.feedback-emoji.active .emoji')?.textContent || '😊';
  const activeChips = [];
  document.querySelectorAll('#screen-feedback .option-chip.active').forEach(c => activeChips.push(c.textContent));
  const textarea = document.querySelector('#screen-feedback textarea')?.value || '';

  showToast('✅ अभिप्राय पाठवला — धन्यवाद!');

  // Show thank you overlay
  const feedback = document.getElementById('screen-feedback');
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:absolute; inset:0; background:rgba(255,255,255,0.95); display:flex;
    flex-direction:column; align-items:center; justify-content:center; z-index:10;
    animation: fadeIn 0.3s ease;
  `;
  overlay.innerHTML = `
    <div style="font-size:64px; margin-bottom:16px;">🎉</div>
    <h3 style="font-size:20px; font-weight:700; color:var(--green-700);">धन्यवाद!</h3>
    <p style="font-size:14px; color:var(--gray-500); margin-top:8px; text-align:center; max-width:280px;">
      तुमचा अभिप्राय (${activeEmoji}) आम्हाला मिळाला. तुमच्या पुढील हंगामासाठी AI योजना तयार आहे!
    </p>
    <button class="btn btn-primary" style="margin-top:24px;" onclick="this.parentElement.remove(); navigateTo('screen-next-season');">
      📋 पुढील हंगाम योजना पहा →
    </button>
  `;
  feedback.style.position = 'relative';
  feedback.appendChild(overlay);
}

// ===== Apply Next Season Plan =====
function applyPlan() {
  state.planApplied = true;
  showToast('✅ योजना लागू केली! रिमाइंडर सेट झाले.');

  // Animate the button
  const btn = event?.target;
  if (btn) {
    btn.textContent = '✅ योजना लागू झाली!';
    btn.style.background = 'var(--green-600)';
    btn.disabled = true;
  }

  // Navigate to reminders after delay
  setTimeout(() => {
    navigateTo('screen-reminders');
    showToast('📅 पुढील हंगामाचे रिमाइंडर तयार!');
  }, 1500);
}

// ===== Schedule Next Inspection =====
function scheduleInspection() {
  const now = new Date();
  now.setDate(now.getDate() + 3);
  const dateStr = now.toLocaleDateString('mr-IN', { day: 'numeric', month: 'long' });
  showToast(`📅 पुढील तपासणी: ${dateStr} — रिमाइंडर सेट!`);
}

// ===== Scheme Details Popup =====
function showSchemeDetails(schemeName) {
  const modal = document.getElementById('journey-modal');
  const content = modal.querySelector('.modal-content');

  const schemeDetails = {
    'NAFED': {
      title: '🏪 कांदा खरेदी योजना (NAFED)',
      body: `
        <p><strong>उद्दिष्ट:</strong> बाजार भाव कमी असताना शेतकऱ्यांकडून थेट कांदा खरेदी</p>
        <p><strong>पात्रता:</strong> कांदा उत्पादक शेतकरी</p>
        <p><strong>कागदपत्रे:</strong></p>
        <ul style="margin-left:20px; font-size:13px;">
          <li>आधार कार्ड</li>
          <li>७/१२ उतारा</li>
          <li>पासपोर्ट फोटो</li>
          <li>बँक पासबुक</li>
        </ul>
        <p><strong>अर्ज कसा करावा:</strong></p>
        <p style="font-size:13px;">जवळच्या APMC/कृषी कार्यालयात संपर्क साधा</p>
        <p style="color:var(--green-600); font-weight:600; margin-top:8px;">✅ सध्या अर्ज सुरू आहेत</p>
      `
    },
    'चाळ': {
      title: '🏠 कांदा चाळ अनुदान',
      body: `
        <p><strong>फायदा:</strong> कांदा साठवणूक चाळ बांधकामासाठी ५०% अनुदान</p>
        <p><strong>कमाल अनुदान:</strong> ₹1.75 लाख</p>
        <p><strong>क्षमता:</strong> 25 मेट्रिक टन</p>
        <p><strong>कागदपत्रे:</strong></p>
        <ul style="margin-left:20px; font-size:13px;">
          <li>आधार कार्ड + ७/१२</li>
          <li>बँक पासबुक</li>
          <li>जागेचा नकाशा</li>
        </ul>
        <p style="color:var(--green-600); font-weight:600; margin-top:8px;">✅ अर्ज स्वीकारले जात आहेत</p>
      `
    }
  };

  const scheme = schemeDetails[schemeName] || { title: schemeName, body: '<p>सविस्तर माहिती लवकरच उपलब्ध.</p>' };

  content.innerHTML = `
    <div class="modal-handle"></div>
    <h3 style="font-size:18px; font-weight:700; margin-bottom:12px;">${scheme.title}</h3>
    <div style="font-size:14px; line-height:1.8; color:var(--gray-700);">
      ${scheme.body}
    </div>
    <div class="disclaimer" style="margin-top:16px;">
      <span class="disclaimer-icon">ℹ️</span>
      <span>योजना व नियम बदलू शकतात. अधिकृत माहितीसाठी कृषी कार्यालयाशी संपर्क साधा.</span>
    </div>
    <button class="btn btn-primary btn-block mt-16" onclick="closeJourney()">समजले ✅</button>
  `;

  modal.classList.add('active');
}

// ===== Market Comparison =====
function showMarketComparison() {
  const marketsData = [
    { name: 'लासलगाव', price: 2850, change: '+200' },
    { name: 'पिंपळगाव', price: 2700, change: '+150' },
    { name: 'मनमाड', price: 2600, change: '+100' },
    { name: 'नेवासा', price: 2500, change: '-50' },
    { name: 'राहुरी', price: 2450, change: '+80' },
    { name: 'श्रीरामपूर', price: 2350, change: '+120' },
    { name: 'संगमनेर', price: 2400, change: '+90' }
  ];

  const modal = document.getElementById('journey-modal');
  const content = modal.querySelector('.modal-content');

  let rows = marketsData.map(m => `
    <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid var(--gray-100);">
      <span style="font-size:14px; font-weight:600;">🏪 ${m.name}</span>
      <div style="text-align:right;">
        <div style="font-size:16px; font-weight:800; color:var(--green-700);">₹${m.price.toLocaleString('en-IN')}</div>
        <div style="font-size:11px; color:${m.change.startsWith('+') ? 'var(--green-600)' : 'var(--danger)'};">${m.change.startsWith('+') ? '📈' : '📉'} ${m.change}</div>
      </div>
    </div>
  `).join('');

  content.innerHTML = `
    <div class="modal-handle"></div>
    <h3 style="font-size:18px; font-weight:700; text-align:center; margin-bottom:4px;">📊 जवळच्या बाजारांची तुलना</h3>
    <p style="font-size:12px; color:var(--gray-500); text-align:center; margin-bottom:16px;">आजचे कांदा (लाल) भाव / क्विंटल</p>
    ${rows}
    <div class="card card-green" style="margin-top:16px;">
      <p style="font-weight:700; margin-bottom:4px;">💡 शिफारस</p>
      <p style="font-size:13px; color:var(--gray-600);">लासलगाव बाजारात सर्वाधिक भाव (₹2,850) आहे. तुमची गुणवत्ता Grade A असल्यामुळे इथे विक्री फायदेशीर.</p>
    </div>
    <button class="btn btn-primary btn-block mt-16" onclick="closeJourney()">समजले ✅</button>
  `;

  modal.classList.add('active');
}

// ===== Toast Notification =====
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%) translateY(20px);
      background: var(--gray-800); color: white; padding: 12px 24px;
      border-radius: 100px; font-size: 14px; font-weight: 500;
      z-index: 9999; opacity: 0; transition: all 0.3s ease;
      max-width: 340px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      font-family: var(--font-primary);
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, 2500);
}

// ===== Chip Selection =====
function selectChip(el) {
  const parent = el.parentElement;
  parent.querySelectorAll('.option-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  el.style.transform = 'scale(1.05)';
  setTimeout(() => el.style.transform = '', 200);
}

// ===== Frequency Selection =====
function selectFreq(el) {
  document.querySelectorAll('.freq-option').forEach(f => f.classList.remove('active'));
  el.classList.add('active');
  const label = el.querySelector('.freq-label')?.textContent || '';
  showToast('⏰ तपासणी: ' + label + ' — सेट केले!');
}

// ===== Feedback Emoji Selection =====
function selectFeedback(el) {
  document.querySelectorAll('.feedback-emoji').forEach(f => f.classList.remove('active'));
  el.classList.add('active');
  el.style.transform = 'scale(1.2)';
  setTimeout(() => el.style.transform = '', 300);
}

// ===== Journey Modal =====
function showJourney() {
  document.getElementById('journey-modal').classList.add('active');
}

function closeJourney() {
  document.getElementById('journey-modal').classList.remove('active');
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', function() {
  const savedLang = localStorage.getItem('onion_smart_lang') || 'mr';
  selectLanguage(savedLang);
  navigateTo('screen-onboarding');

  // Close modal on overlay click
  document.getElementById('journey-modal')?.addEventListener('click', function(e) {
    if (e.target === this) closeJourney();
  });

  // Filter chips interaction
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', function() {
      this.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Tab pills interaction
  document.querySelectorAll('.tab-pill').forEach(pill => {
    pill.addEventListener('click', function() {
      this.parentElement.querySelectorAll('.tab-pill').forEach(p => p.classList.remove('active'));
      this.classList.add('active');

      // Market tab switching
      if (this.closest('#screen-market')) {
        const prices = {
          'लासलगाव': { price: '₹2,850', change: '📈 +₹200', name: 'लासलगाव' },
          'पिंपळगाव': { price: '₹2,700', change: '📈 +₹150', name: 'पिंपळगाव' },
          'मनमाड': { price: '₹2,600', change: '📈 +₹100', name: 'मनमाड' },
          'नेवासा': { price: '₹2,500', change: '📉 -₹50', name: 'नेवासा' },
          'राहुरी': { price: '₹2,450', change: '📈 +₹80', name: 'राहुरी' }
        };
        const data = prices[this.textContent.trim()];
        if (data) {
          const priceEl = document.querySelector('#screen-market .market-price');
          const nameEl = document.querySelector('#screen-market .market-name');
          const badgeEl = document.querySelector('#screen-market .market-badge');
          if (priceEl) priceEl.innerHTML = data.price + ' <span class="market-unit">/ क्विंटल</span>';
          if (nameEl) nameEl.textContent = '🏪 ' + data.name + ' बाजार';
          if (badgeEl) {
            badgeEl.textContent = data.change;
            badgeEl.className = 'market-badge ' + (data.change.includes('+') ? 'up' : 'down');
          }
          showToast('🏪 ' + data.name + ': ' + data.price + '/क्विंटल');
        }
      }

      // Support tab switching
      if (this.closest('#screen-support')) {
        const tab = this.textContent.trim();
        const schemes = document.querySelectorAll('#screen-support .scheme-card');
        if (tab === 'सर्व') {
          schemes.forEach(s => s.style.display = '');
        } else {
          schemes.forEach((s, i) => {
            const tags = s.querySelector('.scheme-tags')?.textContent || '';
            const match = tags.includes(tab.slice(0, 4)) || // partial match
                         (tab === 'खरेदी / Procurement' && i === 0) ||
                         (tab === 'साठवणूक' && i === 1) ||
                         (tab === 'विमा' && i === 2) ||
                         (tab === 'निविष्ठा' && i === 3);
            s.style.display = match ? '' : 'none';
          });
        }
      }
    });
  });

  // Map pins interaction
  document.querySelectorAll('.map-pin').forEach(pin => {
    pin.addEventListener('click', function() {
      const title = this.getAttribute('title') || 'माहिती उपलब्ध नाही';
      showToast('📍 ' + title);
    });
  });

  // TTS button
  document.querySelectorAll('.tts-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if ('speechSynthesis' in window) {
        const screen = this.closest('.screen');
        const titleEl = screen?.querySelector('.section-title, .header-title, .card-green p, .crop-banner-greeting');
        const text = titleEl?.textContent || 'कांदा स्मार्ट AI';
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = state.language === 'mr' ? 'mr-IN' : state.language === 'hi' ? 'hi-IN' : 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
        const ttsNotice = state.language === 'en' ? '🔊 Speaking...' : state.language === 'hi' ? '🔊 बोल रहा है...' : '🔊 ऐकत आहे...';
        showToast(ttsNotice);
      } else {
        showToast('🔊 मजकूर ऐकवा — ऐकत आहे');
      }
    });
  });

  // Auto-fill registration on screen load
  setTimeout(() => autoFillRegistration(), 500);

  // Card entrance animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.dash-card, .scheme-card, .report-card, .reminder-card, .market-price-card, .alert-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(15px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
  });

  // Progress bar animations
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.progress-fill, .bar, .confidence-fill');
        if (fill) {
          const width = fill.style.width || fill.style.height;
          fill.style.width = '0';
          requestAnimationFrame(() => {
            fill.style.transition = 'width 0.8s ease-out, height 0.8s ease-out';
            fill.style.width = width;
          });
        }
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.progress-bar, .confidence-meter').forEach(el => {
    progressObserver.observe(el);
  });

  // Wire up PDF download buttons
  document.querySelectorAll('button').forEach(btn => {
    const text = btn.textContent.trim();
    if (text.includes('PDF') && !btn.hasAttribute('data-wired')) {
      btn.setAttribute('data-wired', 'true');
      btn.addEventListener('click', () => {
        if (text.includes('सर्व अहवाल')) downloadPDF('सर्व अहवाल');
        else if (text.includes('तयार करा')) downloadPDF('गुणवत्ता अहवाल');
        else downloadPDF('कांदा अहवाल');
      });
    }
    // Wire up scheme "अधिक माहिती" buttons
    if (text.includes('अधिक माहिती') && !btn.hasAttribute('data-wired')) {
      btn.setAttribute('data-wired', 'true');
      const card = btn.closest('.scheme-card');
      const schemeName = card?.querySelector('.scheme-name')?.textContent || '';
      btn.addEventListener('click', () => {
        if (schemeName.includes('NAFED')) showSchemeDetails('NAFED');
        else if (schemeName.includes('चाळ')) showSchemeDetails('चाळ');
        else showSchemeDetails(schemeName);
      });
    }
    // Wire up "पूर्ण अहवाल" button
    if (text.includes('पूर्ण अहवाल') && !btn.hasAttribute('data-wired')) {
      btn.setAttribute('data-wired', 'true');
      btn.addEventListener('click', () => {
        navigateTo('screen-harvest');
      });
    }
    // Wire up market comparison button
    if (text.includes('जवळच्या बाजार') && !btn.hasAttribute('data-wired')) {
      btn.setAttribute('data-wired', 'true');
      btn.addEventListener('click', () => showMarketComparison());
    }
    // Wire up "अहवाल डाउनलोड" in officer dashboard
    if (text.includes('अहवाल डाउनलोड') && !btn.hasAttribute('data-wired')) {
      btn.setAttribute('data-wired', 'true');
      btn.addEventListener('click', () => downloadPDF('अधिकारी अहवाल'));
    }
    // Wire up "योजना लागू करा"
    if (text.includes('योजना लागू') && !btn.hasAttribute('data-wired')) {
      btn.setAttribute('data-wired', 'true');
      btn.addEventListener('click', () => applyPlan());
    }
    // Wire up schedule inspection
    if (text.includes('तपासणी सेट') && !btn.hasAttribute('data-wired')) {
      btn.setAttribute('data-wired', 'true');
      btn.addEventListener('click', () => scheduleInspection());
    }
  });

  // Wire up registration button
  const regBtn = document.querySelector('#screen-registration .btn-primary.btn-lg.btn-block.mt-16');
  if (regBtn) {
    regBtn.onclick = () => completeRegistration();
  }

  // Wire up feedback submit button
  const fbBtn = document.querySelector('#screen-feedback .btn-primary.btn-block');
  if (fbBtn) {
    fbBtn.onclick = () => submitFeedback();
  }

  // Wire storage options card in low-price screen
  document.querySelectorAll('#screen-low-price .report-card').forEach(card => {
    if (!card.onclick) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function() {
        const name = this.querySelector('.report-name')?.textContent || '';
        if (name.includes('सरकारी')) navigateTo('screen-support');
        else if (name.includes('खरेदी')) {
          showToast('🏪 NAFED/राज्य खरेदी केंद्र माहिती');
          showSchemeDetails('NAFED');
        }
        else if (name.includes('साठवणूक')) {
          showToast('🏠 कांदा चाळ माहिती');
          showSchemeDetails('चाळ');
        }
        else if (name.includes('तुलना')) showMarketComparison();
        else if (name.includes('मित्र')) navigateTo('screen-chatbot');
      });
    }
  });
});

// ===== Keyboard Support =====
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeJourney();
  if (e.key === 'Backspace' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
    e.preventDefault();
    goBack();
  }
});

// ===== Print Friendly =====
window.addEventListener('beforeprint', () => {
  document.querySelectorAll('.screen').forEach(s => {
    if (s.classList.contains('active')) s.style.display = 'block';
  });
});

// ===== Add CSS Animations Dynamically =====
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  @keyframes screenFadeIn {
    from { opacity: 0; transform: translateX(10px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes scanPulse {
    0%, 100% { background-position: 0% 0%; }
    50% { background-position: 100% 100%; }
  }
  @keyframes gaugeReveal {
    0% { transform: scale(0.5); opacity: 0; }
    60% { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes chatBubbleIn {
    from { opacity: 0; transform: translateY(10px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes typingDot {
    0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
    30% { opacity: 1; transform: translateY(-4px); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .typing-dots {
    display: flex; gap: 4px; font-size: 18px; color: var(--green-500);
  }
  .typing-dots span {
    display: inline-block;
  }
`;
document.head.appendChild(animationStyles);

console.log('🧅 कांदा स्मार्ट AI — ONION-SMART AI Loaded Successfully!');
console.log('📱 Full Demo Mode — All flows working for SIH presentation.');
console.log('🚀 20 screens, AI chatbot, market data, quality scan — all interactive!');
