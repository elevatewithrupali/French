// ============================================================
// FRENCH C1 MISSION — APP.JS
// ============================================================

// ---- STATE ----
const STATE_KEY = 'frenchC1State';

function loadState() {
  try {
    const s = localStorage.getItem(STATE_KEY);
    return s ? JSON.parse(s) : null;
  } catch(e) { return null; }
}

function saveState(state) {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

function defaultState() {
  return {
    currentDay: 1,
    completedDays: [],
    scores: [],       // [{day, reading, writing, listening, speaking}]
    notes: [],        // [{day, text}]
    promptIdx: 0,
    topicIdx: 0,
    testIdx: 0,
    testAnswered: false,
  };
}

let state = loadState() || defaultState();

// ---- NAVIGATION ----
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.dataset.page;
    navigate(page);
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(`page-${page}`);
  if (el) el.classList.add('active');
  if (page === 'progress') renderRadarChart();
}

// ---- RENDER DASHBOARD ----
function renderDashboard() {
  const day = state.currentDay;
  const phase = getPhase(day);
  const hours = state.completedDays.length * 8;
  const pct = Math.round((state.completedDays.length / 40) * 100);

  document.getElementById('stat-day').textContent = day;
  document.getElementById('stat-phase').textContent = phase;
  document.getElementById('stat-phase-label').textContent = PHASES[phase].label;
  document.getElementById('stat-hours').textContent = hours;
  document.getElementById('sidebar-day-num').textContent = day;
  document.getElementById('current-phase-badge').textContent = `Phase ${phase}`;
  document.getElementById('progress-pct').textContent = pct + '%';
  document.getElementById('main-progress-bar').style.width = pct + '%';

  renderTodaySchedule(day);
  renderCalendar();
  highlightActivePhase(phase);
}

function renderTodaySchedule(day) {
  const schedKey = `phase${getPhase(day)}`;
  const sched = SCHEDULES[schedKey];
  const container = document.getElementById('todays-schedule');
  container.innerHTML = '';
  sched.forEach(item => {
    if (item.type === 'break') return;
    const el = document.createElement('div');
    el.className = `sched-item ${item.type}`;
    el.innerHTML = `
      <span class="sched-time">${item.time}</span>
      <span class="sched-name">${item.name}</span>
      <span class="sched-duration">1h</span>
    `;
    container.appendChild(el);
  });
}

function renderCalendar() {
  const grid = document.getElementById('calendar-grid');
  grid.innerHTML = '';
  for (let d = 1; d <= 40; d++) {
    const div = document.createElement('div');
    const phaseClass = getPhaseDayClass(d);
    const isCompleted = state.completedDays.includes(d);
    const isToday = d === state.currentDay;
    div.className = `cal-day ${phaseClass} ${isCompleted ? 'completed' : ''} ${isToday ? 'today' : ''}`;
    div.innerHTML = `<span class="day-num">${d}</span><span class="day-phase">P${getPhase(d)}</span>`;
    div.title = `Day ${d} — Phase ${getPhase(d)}: ${PHASES[getPhase(d)].label}`;
    grid.appendChild(div);
  }
}

function highlightActivePhase(phase) {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`ph${i}`);
    if (el) el.classList.toggle('active-phase', i === phase);
  }
}

// ---- ADVANCE DAY ----
document.getElementById('advance-day-btn').addEventListener('click', () => {
  if (!state.completedDays.includes(state.currentDay)) {
    state.completedDays.push(state.currentDay);
  }
  if (state.currentDay < 40) state.currentDay++;
  saveState(state);
  renderDashboard();
});

// ---- SCHEDULE PAGE ----
document.querySelectorAll('.sched-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.sched-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderSchedule(tab.dataset.sched);
  });
});

function renderSchedule(key) {
  const blocks = SCHEDULES[key];
  const container = document.getElementById('schedule-content');
  container.innerHTML = '';
  blocks.forEach(b => {
    if (b.type === 'break') {
      const div = document.createElement('div');
      div.className = 'time-block';
      div.style.opacity = '0.4';
      div.innerHTML = `<div class="time-block-time">${b.time}</div><div class="time-block-content"><h3>— Break / Passive Immersion —</h3><p>Rest, eat, or play French radio in the background.</p></div>`;
      container.appendChild(div);
      return;
    }
    const tagMap = { grammar:'tag-grammar', vocab:'tag-vocab', reading:'tag-read', writing:'tag-write', listening:'tag-listen', speaking:'tag-speak', exam:'tag-exam' };
    const div = document.createElement('div');
    div.className = 'time-block';
    div.innerHTML = `
      <div class="time-block-time">${b.time}</div>
      <div class="time-block-content">
        <h3>${b.name}</h3>
        <p>${b.desc}</p>
      </div>
      <span class="time-block-tag ${tagMap[b.type] || ''}">${b.tag}</span>
    `;
    container.appendChild(div);
  });
}

// ---- VOCABULARY CLUSTERS ----
function renderTopicClusters() {
  const container = document.getElementById('topic-clusters');
  container.innerHTML = '';
  TOPIC_CLUSTERS.forEach(cluster => {
    const div = document.createElement('div');
    div.className = 'topic-cluster';
    div.innerHTML = `<h3>${cluster.name}</h3><ul>${cluster.words.map(w => `<li>${w}</li>`).join('')}</ul>`;
    container.appendChild(div);
  });
}

// ---- GRAMMAR CHECKLIST ----
function renderGrammarChecklist() {
  const container = document.getElementById('grammar-checklist');
  container.innerHTML = '';
  const phClasses = ['ph1','ph2','ph3','ph4'];
  Object.entries(GRAMMAR_ITEMS).forEach(([section, items], idx) => {
    const div = document.createElement('div');
    div.className = `grammar-section ${phClasses[idx]}`;
    div.innerHTML = `<h3>${section}</h3><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
    container.appendChild(div);
  });
}

// ---- WRITING PROMPTS ----
let promptIdx = state.promptIdx || 0;
function renderWritingPrompt() {
  const p = WRITING_PROMPTS[promptIdx % WRITING_PROMPTS.length];
  const container = document.getElementById('writing-prompts');
  container.innerHTML = `
    <div class="writing-prompt-card">
      <div class="writing-prompt-type">${p.type}</div>
      ${p.prompt}
    </div>`;
}
document.getElementById('new-prompt-btn').addEventListener('click', () => {
  promptIdx = (promptIdx + 1) % WRITING_PROMPTS.length;
  state.promptIdx = promptIdx;
  saveState(state);
  renderWritingPrompt();
});

// ---- SPEAKING TOPICS ----
let topicIdx = state.topicIdx || 0;
function renderSpeakingTopic() {
  const t = SPEAKING_TOPICS[topicIdx % SPEAKING_TOPICS.length];
  const container = document.getElementById('speaking-topics');
  container.innerHTML = `
    <div class="speaking-topic-card">
      <div class="speaking-topic-level">Niveau ${t.level}</div>
      ${t.topic}
    </div>`;
}
document.getElementById('new-topic-btn').addEventListener('click', () => {
  topicIdx = (topicIdx + 1) % SPEAKING_TOPICS.length;
  state.topicIdx = topicIdx;
  saveState(state);
  renderSpeakingTopic();
});

// ---- MINI TEST ----
let testIdx = state.testIdx || 0;
let testAnswered = false;

function renderMiniTest() {
  const t = MINI_TESTS[testIdx % MINI_TESTS.length];
  testAnswered = false;
  const container = document.getElementById('mini-test-container');
  container.innerHTML = `
    <div class="mini-test">
      <div class="mini-test-passage">${t.passage}</div>
      <div class="mini-test-question">${t.question}</div>
      <div class="mini-test-options">
        ${t.options.map((opt, i) => `<button class="mini-test-option" data-idx="${i}">${String.fromCharCode(65+i)}. ${opt}</button>`).join('')}
      </div>
      <div id="mini-test-feedback"></div>
      <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
        <button class="btn-secondary" id="next-test-btn">Next Question →</button>
      </div>
    </div>`;

  document.querySelectorAll('.mini-test-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (testAnswered) return;
      testAnswered = true;
      const chosen = parseInt(btn.dataset.idx);
      const correct = t.answer;
      document.querySelectorAll('.mini-test-option').forEach((b, i) => {
        if (i === correct) b.classList.add('correct');
        else if (i === chosen && chosen !== correct) b.classList.add('wrong');
        b.disabled = true;
      });
      const fb = document.getElementById('mini-test-feedback');
      if (chosen === correct) {
        fb.className = 'mini-test-feedback correct';
        fb.textContent = '✓ Correct ! ' + t.explanation;
      } else {
        fb.className = 'mini-test-feedback wrong';
        fb.textContent = '✗ Incorrect. ' + t.explanation;
      }
    });
  });

  document.getElementById('next-test-btn').addEventListener('click', () => {
    testIdx = (testIdx + 1) % MINI_TESTS.length;
    state.testIdx = testIdx;
    saveState(state);
    renderMiniTest();
  });
}

// ---- PROGRESS / SCORES ----
document.getElementById('save-scores-btn').addEventListener('click', () => {
  const r = parseInt(document.getElementById('score-reading').value) || 0;
  const w = parseInt(document.getElementById('score-writing').value) || 0;
  const l = parseInt(document.getElementById('score-listening').value) || 0;
  const s = parseInt(document.getElementById('score-speaking').value) || 0;
  if (!r && !w && !l && !s) return;
  state.scores.push({ day: state.currentDay, reading: r, writing: w, listening: l, speaking: s });
  saveState(state);
  renderScoreHistory();
  renderRadarChart();
  ['score-reading','score-writing','score-listening','score-speaking'].forEach(id => { document.getElementById(id).value = ''; });
});

function renderScoreHistory() {
  const container = document.getElementById('score-history');
  container.innerHTML = '';
  [...state.scores].reverse().forEach(entry => {
    const div = document.createElement('div');
    div.className = 'score-entry';
    div.innerHTML = `
      <div class="score-entry-day">Day ${entry.day}</div>
      <div class="score-entry-skills">
        <span class="score-pill">Read: ${entry.reading}</span>
        <span class="score-pill">Write: ${entry.writing}</span>
        <span class="score-pill">Listen: ${entry.listening}</span>
        <span class="score-pill">Speak: ${entry.speaking}</span>
      </div>`;
    container.appendChild(div);
  });
  if (!state.scores.length) container.innerHTML = '<p style="color:var(--text-muted);font-size:0.8rem">No scores logged yet.</p>';
}

// ---- RADAR CHART ----
function renderRadarChart() {
  const canvas = document.getElementById('radar-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = 400; canvas.height = 300;
  ctx.clearRect(0, 0, 400, 300);

  // Get latest scores or defaults
  const latest = state.scores.length ? state.scores[state.scores.length - 1] : { reading: 0, writing: 0, listening: 0, speaking: 0 };
  const skills = ['Reading', 'Writing', 'Listening', 'Speaking'];
  const values = [latest.reading || 0, latest.writing || 0, latest.listening || 0, latest.speaking || 0];
  const max = 100;
  const cx = 200, cy = 155, r = 110;
  const angles = skills.map((_, i) => (i * Math.PI * 2 / 4) - Math.PI / 2);

  // Draw grid
  for (let level = 1; level <= 5; level++) {
    ctx.beginPath();
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1;
    angles.forEach((angle, i) => {
      const rr = r * level / 5;
      const x = cx + rr * Math.cos(angle);
      const y = cy + rr * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.stroke();
  }

  // Draw axes
  angles.forEach(angle => {
    ctx.beginPath();
    ctx.strokeStyle = '#3a3a3a';
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    ctx.stroke();
  });

  // Draw data
  ctx.beginPath();
  ctx.fillStyle = 'rgba(201,168,76,0.2)';
  ctx.strokeStyle = '#c9a84c';
  ctx.lineWidth = 2;
  angles.forEach((angle, i) => {
    const rr = r * values[i] / max;
    const x = cx + rr * Math.cos(angle);
    const y = cy + rr * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Draw dots
  angles.forEach((angle, i) => {
    const rr = r * values[i] / max;
    const x = cx + rr * Math.cos(angle);
    const y = cy + rr * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#c9a84c';
    ctx.fill();
  });

  // Labels
  ctx.fillStyle = '#7a7060';
  ctx.font = '12px DM Mono, monospace';
  ctx.textAlign = 'center';
  angles.forEach((angle, i) => {
    const lx = cx + (r + 22) * Math.cos(angle);
    const ly = cy + (r + 22) * Math.sin(angle);
    ctx.fillText(skills[i], lx, ly + 4);
    ctx.fillStyle = '#c9a84c';
    ctx.font = 'bold 11px DM Mono, monospace';
    ctx.fillText(values[i], lx, ly + 16);
    ctx.fillStyle = '#7a7060';
    ctx.font = '12px DM Mono, monospace';
  });

  // Center label
  ctx.fillStyle = '#c9a84c';
  ctx.font = 'bold 14px DM Mono, monospace';
  ctx.textAlign = 'center';
  const avg = Math.round(values.reduce((a, b) => a + b, 0) / 4);
  ctx.fillText(avg ? `Avg: ${avg}` : 'No data', cx, cy + 5);
}

// ---- NOTES ----
document.getElementById('save-notes-btn').addEventListener('click', () => {
  const text = document.getElementById('daily-notes').value.trim();
  if (!text) return;
  state.notes.push({ day: state.currentDay, text });
  saveState(state);
  renderNotes();
  document.getElementById('daily-notes').value = '';
});

function renderNotes() {
  const container = document.getElementById('notes-history');
  container.innerHTML = '';
  [...state.notes].reverse().slice(0, 10).forEach(n => {
    const div = document.createElement('div');
    div.className = 'note-entry';
    div.innerHTML = `<div class="note-entry-day">Day ${n.day}</div>${n.text}`;
    container.appendChild(div);
  });
}

// ---- INIT ALL ----
function init() {
  renderDashboard();
  renderSchedule('phase1');
  renderTopicClusters();
  renderGrammarChecklist();
  renderWritingPrompt();
  renderSpeakingTopic();
  renderMiniTest();
  renderScoreHistory();
  renderNotes();
}

init();
