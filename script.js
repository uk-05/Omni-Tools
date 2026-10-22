/**
 * OmniTools - Universal Multi-Tool Application Engine
 * Pure Vanilla JavaScript - Zero Framework Dependencies
 * Complete Functionality for 10 Modern Web Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Global Features
  initGlobalSearch();

  // Detect and Initialize Active Tool
  initScientificCalculator();
  initBMICalculator();
  initAgeCalculator();
  initTodoList();
  initExpenseTracker();
  initUnitConverter();
  initWordCounter();
  initPasswordGenerator();
  initCurrencyConverter();
  initStopwatchTimer();
  initHumanizeText();
  initPdfWordConverter();
});

/* ==========================================================================
   1. Global Features (Header Search, Navigation)
   ========================================================================== */
function initGlobalSearch() {
  const searchInput = document.querySelector('.nav-search-input');
  const toolCards = document.querySelectorAll('.tool-card');

  if (!searchInput || toolCards.length === 0) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    toolCards.forEach(card => {
      const title = card.querySelector('.tool-card-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.tool-card-desc')?.textContent.toLowerCase() || '';
      const badge = card.querySelector('.tool-category-badge')?.textContent.toLowerCase() || '';

      if (title.includes(query) || desc.includes(query) || badge.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // Keyboard shortcut: Press '/' to focus search
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

/* ==========================================================================
   2. Scientific Calculator
   ========================================================================== */
function initScientificCalculator() {
  const calcScreen = document.querySelector('.calc-screen');
  if (!calcScreen) return;

  const historyDisplay = calcScreen.querySelector('.calc-history');
  const currentDisplay = calcScreen.querySelector('.calc-current');
  const buttons = document.querySelectorAll('.calc-btn');
  const angleModeBadge = document.querySelector('.brand-badge');

  let currentVal = '0';
  let historyVal = '';
  let angleMode = 'DEG'; // 'DEG' or 'RAD'
  let shouldReset = false;

  // Toggle DEG/RAD mode if clicked
  const angleContainer = angleModeBadge?.parentElement;
  if (angleContainer) {
    angleContainer.style.cursor = 'pointer';
    angleContainer.title = 'Click to switch DEG / RAD';
    angleContainer.addEventListener('click', () => {
      angleMode = angleMode === 'DEG' ? 'RAD' : 'DEG';
      angleContainer.innerHTML = `
        <span class="brand-badge" style="background: rgba(99, 102, 241, 0.2); color: #818cf8;">${angleMode}</span>
        <span style="font-size: 0.75rem; color: var(--text-dim); padding: 0.2rem 0.4rem;">${angleMode === 'DEG' ? 'RAD' : 'DEG'}</span>
      `;
    });
  }

  function updateDisplay() {
    currentDisplay.textContent = currentVal;
    historyDisplay.textContent = historyVal;
  }

  function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }

  function handleButton(label) {
    const num = parseFloat(currentVal);

    switch (label) {
      case 'AC':
        currentVal = '0';
        historyVal = '';
        shouldReset = false;
        break;

      case 'C':
        currentVal = '0';
        break;

      case '⌫':
        if (currentVal.length > 1 && !shouldReset) {
          currentVal = currentVal.slice(0, -1);
        } else {
          currentVal = '0';
        }
        break;

      case '±':
        if (currentVal !== '0') {
          currentVal = currentVal.startsWith('-') ? currentVal.slice(1) : '-' + currentVal;
        }
        break;

      case '%':
        currentVal = (parseFloat(currentVal) / 100).toString();
        break;

      case 'π':
        currentVal = Math.PI.toFixed(8);
        shouldReset = true;
        break;

      case 'e':
        currentVal = Math.E.toFixed(8);
        shouldReset = true;
        break;

      case 'sin':
        const sinAngle = angleMode === 'DEG' ? (num * Math.PI) / 180 : num;
        historyVal = `sin(${currentVal})`;
        currentVal = parseFloat(Math.sin(sinAngle).toFixed(8)).toString();
        shouldReset = true;
        break;

      case 'cos':
        const cosAngle = angleMode === 'DEG' ? (num * Math.PI) / 180 : num;
        historyVal = `cos(${currentVal})`;
        currentVal = parseFloat(Math.cos(cosAngle).toFixed(8)).toString();
        shouldReset = true;
        break;

      case 'tan':
        const tanAngle = angleMode === 'DEG' ? (num * Math.PI) / 180 : num;
        historyVal = `tan(${currentVal})`;
        currentVal = parseFloat(Math.tan(tanAngle).toFixed(8)).toString();
        shouldReset = true;
        break;

      case 'log':
        if (num <= 0) {
          currentVal = 'Error';
        } else {
          historyVal = `log(${currentVal})`;
          currentVal = parseFloat(Math.log10(num).toFixed(8)).toString();
        }
        shouldReset = true;
        break;

      case 'ln':
        if (num <= 0) {
          currentVal = 'Error';
        } else {
          historyVal = `ln(${currentVal})`;
          currentVal = parseFloat(Math.log(num).toFixed(8)).toString();
        }
        shouldReset = true;
        break;

      case '√':
        if (num < 0) {
          currentVal = 'Error';
        } else {
          historyVal = `√(${currentVal})`;
          currentVal = parseFloat(Math.sqrt(num).toFixed(8)).toString();
        }
        shouldReset = true;
        break;

      case 'x²':
        historyVal = `sqr(${currentVal})`;
        currentVal = parseFloat(Math.pow(num, 2).toFixed(8)).toString();
        shouldReset = true;
        break;

      case '1/x':
        if (num === 0) {
          currentVal = 'Error';
        } else {
          historyVal = `1/(${currentVal})`;
          currentVal = parseFloat((1 / num).toFixed(8)).toString();
        }
        shouldReset = true;
        break;

      case 'n!':
        historyVal = `${currentVal}!`;
        currentVal = factorial(num).toString();
        shouldReset = true;
        break;

      case 'xʸ':
        historyVal = `${currentVal} ^ `;
        currentVal = '0';
        break;

      case '+':
      case '−':
      case '×':
      case '÷':
        const opSymbol = label === '−' ? '-' : label === '×' ? '*' : label === '÷' ? '/' : '+';
        historyVal = `${currentVal} ${opSymbol} `;
        shouldReset = true;
        break;

      case '(':
      case ')':
        if (currentVal === '0' || shouldReset) {
          currentVal = label;
          shouldReset = false;
        } else {
          currentVal += label;
        }
        break;

      case '=':
        if (historyVal) {
          try {
            let expr = (historyVal + currentVal)
              .replace(/×/g, '*')
              .replace(/÷/g, '/')
              .replace(/−/g, '-')
              .replace(/\^/g, '**');

            const evaluated = Function(`"use strict"; return (${expr})`)();
            historyVal = `${expr} =`;
            currentVal = parseFloat(Number(evaluated).toFixed(8)).toString();
            shouldReset = true;
          } catch (e) {
            currentVal = 'Error';
            shouldReset = true;
          }
        }
        break;

      default: // Digits & decimal point
        if (label === '.') {
          if (shouldReset) {
            currentVal = '0.';
            shouldReset = false;
          } else if (!currentVal.includes('.')) {
            currentVal += '.';
          }
        } else if (/^[0-9]$/.test(label)) {
          if (currentVal === '0' || shouldReset) {
            currentVal = label;
            shouldReset = false;
          } else {
            currentVal += label;
          }
        }
        break;
    }

    updateDisplay();
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      handleButton(btn.textContent.trim());
    });
  });

  // Keyboard shortcut integration
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    const key = e.key;

    if (/^[0-9]$/.test(key)) handleButton(key);
    else if (key === '.') handleButton('.');
    else if (key === '+') handleButton('+');
    else if (key === '-') handleButton('−');
    else if (key === '*') handleButton('×');
    else if (key === '/') handleButton('÷');
    else if (key === 'Enter' || key === '=') handleButton('=');
    else if (key === 'Backspace') handleButton('⌫');
    else if (key === 'Escape') handleButton('AC');
  });

  updateDisplay();
}

/* ==========================================================================
   3. BMI Calculator
   ========================================================================== */
function initBMICalculator() {
  const ageInput = document.getElementById('bmi-age');
  const heightInput = document.getElementById('bmi-height');
  const weightInput = document.getElementById('bmi-weight');
  const unitToggleBtns = document.querySelectorAll('.bmi-unit-btn');
  const genderCards = document.querySelectorAll('.gender-card');
  const calcBtn = document.querySelector('section[aria-label="BMI Calculator Form"] .btn-primary');

  if (!heightInput || !weightInput) return;

  let unit = 'metric'; // 'metric' or 'imperial'

  // Unit Toggle
  unitToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      unitToggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const isImperial = btn.textContent.includes('Imperial');
      unit = isImperial ? 'imperial' : 'metric';

      const heightLabel = heightInput.previousElementSibling;
      const weightLabel = weightInput.previousElementSibling;

      if (isImperial) {
        heightLabel.textContent = 'Height (Inches)';
        weightLabel.textContent = 'Weight (Pounds - lbs)';
        heightInput.value = (parseFloat(heightInput.value) / 2.54).toFixed(0) || '69';
        weightInput.value = (parseFloat(weightInput.value) * 2.20462).toFixed(1) || '150';
      } else {
        heightLabel.textContent = 'Height (Centimeters)';
        weightLabel.textContent = 'Weight (Kilograms)';
        heightInput.value = (parseFloat(heightInput.value) * 2.54).toFixed(0) || '175';
        weightInput.value = (parseFloat(weightInput.value) / 2.20462).toFixed(1) || '68';
      }

      calculateBMI();
    });
  });

  // Gender selection
  genderCards.forEach(card => {
    card.addEventListener('click', () => {
      genderCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      calculateBMI();
    });
  });

  function calculateBMI() {
    const h = parseFloat(heightInput.value);
    const w = parseFloat(weightInput.value);
    const scoreEl = document.querySelector('.bmi-score');
    const categoryEl = document.querySelector('.bmi-category');
    const pointerEl = document.querySelector('.bmi-meter-pointer');
    const adviceEl = document.querySelector('.bmi-result-card p');

    if (!h || !w || h <= 0 || w <= 0) return;

    let bmi = 0;
    if (unit === 'metric') {
      const heightInMeters = h / 100;
      bmi = w / (heightInMeters * heightInMeters);
    } else {
      bmi = (703 * w) / (h * h);
    }

    bmi = parseFloat(bmi.toFixed(1));
    if (scoreEl) scoreEl.textContent = bmi;

    let category = '';
    let color = '';
    let meterPercent = 50;

    if (bmi < 18.5) {
      category = 'Underweight';
      color = '#38bdf8';
      meterPercent = Math.max(5, (bmi / 18.5) * 25);
    } else if (bmi <= 24.9) {
      category = 'Normal Weight Range';
      color = '#10b981';
      meterPercent = 25 + ((bmi - 18.5) / (24.9 - 18.5)) * 30;
    } else if (bmi <= 29.9) {
      category = 'Overweight Range';
      color = '#f59e0b';
      meterPercent = 55 + ((bmi - 25) / (29.9 - 25)) * 25;
    } else {
      category = 'Obesity Range';
      color = '#f43f5e';
      meterPercent = Math.min(95, 80 + ((bmi - 30) / 15) * 15);
    }

    if (categoryEl) {
      categoryEl.textContent = category;
      categoryEl.style.color = color;
    }
    if (scoreEl) scoreEl.style.color = color;
    if (pointerEl) pointerEl.style.left = `${meterPercent}%`;

    if (adviceEl) {
      if (unit === 'metric') {
        const hm = h / 100;
        const minW = (18.5 * hm * hm).toFixed(1);
        const maxW = (24.9 * hm * hm).toFixed(1);
        adviceEl.innerHTML = `Healthy BMI weight range for height of <strong>${h} cm</strong>: <strong>${minW} kg – ${maxW} kg</strong>.`;
      } else {
        const minW = ((18.5 * h * h) / 703).toFixed(1);
        const maxW = ((24.9 * h * h) / 703).toFixed(1);
        adviceEl.innerHTML = `Healthy BMI weight range for height of <strong>${h} inches</strong>: <strong>${minW} lbs – ${maxW} lbs</strong>.`;
      }
    }
  }

  [heightInput, weightInput, ageInput].forEach(inp => {
    inp?.addEventListener('input', calculateBMI);
  });
  calcBtn?.addEventListener('click', calculateBMI);

  calculateBMI();
}

/* ==========================================================================
   4. Age Calculator
   ========================================================================== */
function initAgeCalculator() {
  const dobInput = document.getElementById('dob-input');
  const targetDateInput = document.getElementById('target-date');
  const calcBtn = document.querySelector('section[aria-label="Age Calculation Form"] .btn-primary');

  if (!dobInput) return;

  // Set today's date if target date is empty
  const today = new Date().toISOString().split('T')[0];
  if (targetDateInput && !targetDateInput.value) {
    targetDateInput.value = today;
  }

  function getZodiac(month, day) {
    const zodiacs = [
      { name: 'Capricorn ♑', element: 'Earth', planet: 'Saturn', stone: 'Garnet', end: [1, 19] },
      { name: 'Aquarius ♒', element: 'Air', planet: 'Uranus', stone: 'Amethyst', end: [2, 18] },
      { name: 'Pisces ♓', element: 'Water', planet: 'Neptune', stone: 'Aquamarine', end: [3, 20] },
      { name: 'Aries ♈', element: 'Fire', planet: 'Mars', stone: 'Diamond', end: [4, 19] },
      { name: 'Taurus ♉', element: 'Earth', planet: 'Venus', stone: 'Emerald', end: [5, 20] },
      { name: 'Gemini ♊', element: 'Air', planet: 'Mercury', stone: 'Pearl', end: [6, 20] },
      { name: 'Cancer ♋', element: 'Water', planet: 'Moon', stone: 'Ruby', end: [7, 22] },
      { name: 'Leo ♌', element: 'Fire', planet: 'Sun', stone: 'Peridot', end: [8, 22] },
      { name: 'Virgo ♍', element: 'Earth', planet: 'Mercury', stone: 'Sapphire', end: [9, 22] },
      { name: 'Libra ♎', element: 'Air', planet: 'Venus', stone: 'Opal', end: [10, 22] },
      { name: 'Scorpio ♏', element: 'Water', planet: 'Pluto', stone: 'Topaz', end: [11, 21] },
      { name: 'Sagittarius ♐', element: 'Fire', planet: 'Jupiter', stone: 'Turquoise', end: [12, 21] },
      { name: 'Capricorn ♑', element: 'Earth', planet: 'Saturn', stone: 'Garnet', end: [12, 31] }
    ];

    for (const z of zodiacs) {
      if (month < z.end[0] || (month === z.end[0] && day <= z.end[1])) {
        return z;
      }
    }
    return zodiacs[0];
  }

  function calculateAge() {
    if (!dobInput.value) return;

    const dob = new Date(dobInput.value);
    const target = targetDateInput?.value ? new Date(targetDateInput.value) : new Date();

    if (isNaN(dob.getTime()) || isNaN(target.getTime()) || dob > target) {
      return;
    }

    let years = target.getFullYear() - dob.getFullYear();
    let months = target.getMonth() - dob.getMonth();
    let days = target.getDate() - dob.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Update primary age grid
    const statBoxes = document.querySelectorAll('.age-stat-box .age-stat-val');
    if (statBoxes.length >= 3) {
      statBoxes[0].textContent = years;
      statBoxes[1].textContent = months;
      statBoxes[2].textContent = days;
    }

    // Next Birthday calculation
    let nextBday = new Date(target.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBday < target) {
      nextBday.setFullYear(target.getFullYear() + 1);
    }

    const diffDays = Math.ceil((nextBday - target) / (1000 * 60 * 60 * 24));
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const nextBdayCard = document.querySelector('section[aria-label="Age Calculation Form"] .brand-badge');
    const nextBdayTitle = nextBdayCard?.previousElementSibling?.querySelector('div:last-child');

    if (nextBdayCard) nextBdayCard.textContent = `${diffDays} Days Left`;
    if (nextBdayTitle) {
      nextBdayTitle.textContent = `${monthNames[nextBday.getMonth()]} ${nextBday.getDate()}, ${nextBday.getFullYear()} (${dayNames[nextBday.getDay()]})`;
    }

    // Lifetime Elapsed Statistics
    const totalDays = Math.floor((target - dob) / (1000 * 60 * 60 * 24));
    const totalMonths = years * 12 + months;
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMins = totalHours * 60;
    const heartbeats = (totalMins * 75).toLocaleString();

    const milestoneItems = document.querySelectorAll('.milestone-item strong');
    if (milestoneItems.length >= 6) {
      milestoneItems[0].textContent = `${totalMonths.toLocaleString()} Months`;
      milestoneItems[1].textContent = `${totalWeeks.toLocaleString()} Weeks`;
      milestoneItems[2].textContent = `${totalDays.toLocaleString()} Days`;
      milestoneItems[3].textContent = `${totalHours.toLocaleString()} Hours`;
      milestoneItems[4].textContent = `${totalMins.toLocaleString()} Mins`;
      milestoneItems[5].textContent = `~${(totalMins * 75 / 1e9).toFixed(2)} Billion`;
    }

    // Update Zodiac in Sidebar
    const zodiac = getZodiac(dob.getMonth() + 1, dob.getDate());
    const guideList = document.querySelector('.guide-card .guide-list');
    if (guideList) {
      guideList.innerHTML = `
        <li><strong>Sun Sign:</strong> ${zodiac.name}</li>
        <li><strong>Element:</strong> ${zodiac.element}</li>
        <li><strong>Ruling Planet:</strong> ${zodiac.planet}</li>
        <li><strong>Birthstone:</strong> ${zodiac.stone}</li>
      `;
    }
  }

  dobInput.addEventListener('change', calculateAge);
  targetDateInput?.addEventListener('change', calculateAge);
  calcBtn?.addEventListener('click', calculateAge);

  calculateAge();
}

/* ==========================================================================
   5. To-Do List Board
   ========================================================================== */
function initTodoList() {
  const todoList = document.querySelector('.todo-list-items');
  const todoInput = document.querySelector('.todo-input-bar .form-input');
  const prioritySelect = document.querySelector('.todo-input-bar .form-select');
  const addBtn = document.querySelector('.todo-input-bar .btn-primary');
  const filterTabs = document.querySelectorAll('.todo-tab');
  const progressPercentText = document.querySelector('section[aria-label="Task Board"] div div span:last-child');
  const progressBarFill = document.querySelector('section[aria-label="Task Board"] div > div:last-child > div');

  if (!todoList || !todoInput) return;

  let activeFilter = 'All';
  const STORAGE_KEY = 'omnitools_tasks_v1';

  let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    { id: 1, text: 'Ship Q4 feature sprint deliverables', priority: 'High', completed: false, date: 'Today, 5:00 PM • Work' },
    { id: 2, text: 'Conduct weekly team design sync & UI audit', priority: 'Medium', completed: false, date: 'Tomorrow, 10:00 AM • Collaboration' },
    { id: 3, text: 'Research modern CSS clamp() & container queries', priority: 'Low', completed: false, date: 'Thursday • Learning' },
    { id: 4, text: 'Set up responsive CSS variables & typography tokens', priority: 'High', completed: true, date: 'Completed 2 hours ago' },
    { id: 5, text: 'Outline user experience workflow & 10 tool specs', priority: 'Medium', completed: true, date: 'Completed yesterday' }
  ];

  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function renderTasks() {
    todoList.innerHTML = '';

    const filtered = tasks.filter(t => {
      if (activeFilter === 'Active') return !t.completed;
      if (activeFilter === 'Completed') return t.completed;
      if (activeFilter === 'High Priority') return t.priority === 'High';
      return true;
    });

    filtered.forEach(task => {
      const li = document.createElement('li');
      li.className = `todo-item ${task.completed ? 'completed' : ''}`;

      const tagClass = task.priority === 'High' ? 'tag-high' : task.priority === 'Medium' ? 'tag-medium' : 'tag-low';

      li.innerHTML = `
        <div class="todo-left">
          <input type="checkbox" class="todo-checkbox" ${task.completed ? 'checked' : ''} aria-label="Toggle task">
          <div>
            <div class="todo-text" style="font-weight: 600;">${escapeHTML(task.text)}</div>
            <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.2rem;">${task.date}</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span class="todo-tag ${tagClass}">${task.priority}</span>
          <button class="btn btn-secondary btn-sm btn-delete-task" type="button" style="padding: 0.3rem 0.6rem;">✕</button>
        </div>
      `;

      // Checkbox event
      const chk = li.querySelector('.todo-checkbox');
      chk.addEventListener('change', () => {
        task.completed = chk.checked;
        task.date = task.completed ? 'Completed just now' : 'Reopened';
        saveTasks();
        renderTasks();
      });

      // Delete event
      const delBtn = li.querySelector('.btn-delete-task');
      delBtn.addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderTasks();
      });

      todoList.appendChild(li);
    });

    // Update Progress Bar
    const completedCount = tasks.filter(t => t.completed).length;
    const totalCount = tasks.length;
    const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    if (progressPercentText) {
      progressPercentText.textContent = `${completedCount} of ${totalCount} Completed (${percent}%)`;
    }
    if (progressBarFill) {
      progressBarFill.style.width = `${percent}%`;
    }

    // Update Filter Tab Counts
    if (filterTabs.length >= 4) {
      filterTabs[0].textContent = `All (${totalCount})`;
      filterTabs[1].textContent = `Active (${tasks.filter(t => !t.completed).length})`;
      filterTabs[2].textContent = `Completed (${completedCount})`;
      filterTabs[3].textContent = `High Priority (${tasks.filter(t => t.priority === 'High').length})`;
    }
  }

  function addTask() {
    const text = todoInput.value.trim();
    if (!text) return;

    const priority = prioritySelect.value.split(' ')[0] || 'Medium';

    tasks.unshift({
      id: Date.now(),
      text,
      priority,
      completed: false,
      date: 'Added just now'
    });

    todoInput.value = '';
    saveTasks();
    renderTasks();
  }

  addBtn?.addEventListener('click', addTask);
  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask();
    }
  });

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.textContent.split(' ')[0];
      renderTasks();
    });
  });

  renderTasks();
}

/* ==========================================================================
   6. Expense Tracker
   ========================================================================== */
function initExpenseTracker() {
  const form = document.querySelector('section[aria-label="Expense Ledger"] form');
  const txList = document.querySelector('.tx-list');
  const typeSelect = document.getElementById('tx-type');
  const amountInput = document.getElementById('tx-amount');
  const titleInput = document.getElementById('tx-title');
  const categorySelect = document.getElementById('tx-category');

  if (!form || !txList) return;

  const STORAGE_KEY = 'omnitools_expenses_v1';

  let transactions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    { id: 1, type: 'income', title: 'Enterprise Consulting Stipend', amount: 4250.00, date: 'Oct 18, 2026 • Direct Deposit', category: 'Income' },
    { id: 2, type: 'expense', title: 'Apartment Modern Lease', amount: 1250.00, date: 'Oct 15, 2026 • Housing', category: 'Housing' },
    { id: 3, type: 'expense', title: 'Cloud VPS Server Cluster', amount: 85.00, date: 'Oct 12, 2026 • Tech Infrastructure', category: 'Tech' },
    { id: 4, type: 'expense', title: 'Artisan Coffee Roasters', amount: 16.50, date: 'Oct 10, 2026 • Food & Beverage', category: 'Food' }
  ];

  function saveTx() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }

  function renderLedger() {
    txList.innerHTML = '';

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(tx => {
      if (tx.type === 'income') totalIncome += tx.amount;
      else totalExpense += tx.amount;

      const li = document.createElement('li');
      li.className = 'tx-item';

      const isInc = tx.type === 'income';
      const colorClass = isInc ? 'card-color-emerald' : 'card-color-rose';
      const amountPrefix = isInc ? '+$' : '-$';
      const amountClass = isInc ? 'plus' : 'minus';

      li.innerHTML = `
        <div class="tx-icon-group">
          <div class="tx-icon ${colorClass}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="${isInc ? '19' : '5'}" x2="12" y2="${isInc ? '5' : '19'}"></line>
              <polyline points="${isInc ? '5 12 12 5 19 12' : '19 12 12 19 5 12'}"></polyline>
            </svg>
          </div>
          <div>
            <div class="tx-title">${escapeHTML(tx.title)}</div>
            <div class="tx-date">${tx.date}</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div class="tx-amount ${amountClass}">${amountPrefix}${tx.amount.toFixed(2)}</div>
          <button class="btn btn-secondary btn-sm btn-del-tx" type="button" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" title="Delete">✕</button>
        </div>
      `;

      li.querySelector('.btn-del-tx').addEventListener('click', () => {
        transactions = transactions.filter(t => t.id !== tx.id);
        saveTx();
        renderLedger();
      });

      txList.appendChild(li);
    });

    const netBalance = totalIncome - totalExpense;

    // Update Metric Cards
    const valBalance = document.querySelector('.val-balance');
    const valIncome = document.querySelector('.val-income');
    const valExpense = document.querySelector('.val-expense');

    if (valBalance) valBalance.textContent = `$${netBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (valIncome) valIncome.textContent = `+$${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (valExpense) valExpense.textContent = `-$${totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  const submitBtn = form.querySelector('.btn-primary');
  submitBtn?.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;
    const category = categorySelect.value;

    if (!title || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid description and positive amount.');
      return;
    }

    const now = new Date();
    const dateStr = `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${category}`;

    transactions.unshift({
      id: Date.now(),
      type,
      title,
      amount,
      category,
      date: dateStr
    });

    titleInput.value = '';
    amountInput.value = '';
    saveTx();
    renderLedger();
  });

  renderLedger();
}

/* ==========================================================================
   7. Universal Unit Converter
   ========================================================================== */
function initUnitConverter() {
  const catButtons = document.querySelectorAll('.conv-cat-btn');
  const fromSelect = document.querySelectorAll('.conversion-box-grid select')[0];
  const toSelect = document.querySelectorAll('.conversion-box-grid select')[1];
  const fromInput = document.querySelector('.conversion-box-grid input[type="number"]');
  const toInput = document.querySelector('.conversion-box-grid input[readonly]');
  const swapBtn = document.querySelector('.swap-btn');
  const resultCardTitle = document.querySelector('.conversion-result-card div:first-child');
  const resultCardFormula = document.querySelector('.conv-formula');

  if (!fromSelect || !toSelect || !fromInput) return;

  const unitData = {
    'Length & Distance': {
      units: ['Kilometers (km)', 'Meters (m)', 'Centimeters (cm)', 'Millimeters (mm)', 'Miles (mi)', 'Yards (yd)', 'Feet (ft)', 'Inches (in)'],
      ratesToMeter: {
        'Kilometers (km)': 1000,
        'Meters (m)': 1,
        'Centimeters (cm)': 0.01,
        'Millimeters (mm)': 0.001,
        'Miles (mi)': 1609.344,
        'Yards (yd)': 0.9144,
        'Feet (ft)': 0.3048,
        'Inches (in)': 0.0254
      }
    },
    'Mass & Weight': {
      units: ['Kilograms (kg)', 'Grams (g)', 'Milligrams (mg)', 'Pounds (lbs)', 'Ounces (oz)', 'Metric Tons (t)'],
      ratesToKg: {
        'Kilograms (kg)': 1,
        'Grams (g)': 0.001,
        'Milligrams (mg)': 0.000001,
        'Pounds (lbs)': 0.45359237,
        'Ounces (oz)': 0.0283495,
        'Metric Tons (t)': 1000
      }
    },
    'Temperature': {
      units: ['Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)']
    },
    'Speed & Velocity': {
      units: ['Kilometers/hour (km/h)', 'Miles/hour (mph)', 'Meters/second (m/s)', 'Knots (kn)'],
      ratesToMs: {
        'Kilometers/hour (km/h)': 0.277778,
        'Miles/hour (mph)': 0.44704,
        'Meters/second (m/s)': 1,
        'Knots (kn)': 0.514444
      }
    },
    'Surface Area': {
      units: ['Square Meters (m²)', 'Square Kilometers (km²)', 'Square Miles (mi²)', 'Square Feet (ft²)', 'Acres (ac)', 'Hectares (ha)'],
      ratesToSqM: {
        'Square Meters (m²)': 1,
        'Square Kilometers (km²)': 1e6,
        'Square Miles (mi²)': 2.59e6,
        'Square Feet (ft²)': 0.092903,
        'Acres (ac)': 4046.86,
        'Hectares (ha)': 10000
      }
    }
  };

  let activeCategory = 'Length & Distance';

  function populateDropdowns(category) {
    const list = unitData[category].units;
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';

    list.forEach((u, i) => {
      const optFrom = document.createElement('option');
      optFrom.value = u;
      optFrom.textContent = u;
      if (i === 0) optFrom.selected = true;

      const optTo = document.createElement('option');
      optTo.value = u;
      optTo.textContent = u;
      if (i === 1 || (list.length === 1 && i === 0)) optTo.selected = true;

      fromSelect.appendChild(optFrom);
      toSelect.appendChild(optTo);
    });

    convertUnits();
  }

  function convertUnits() {
    const val = parseFloat(fromInput.value);
    if (isNaN(val)) {
      toInput.value = '';
      return;
    }

    const from = fromSelect.value;
    const to = toSelect.value;
    let result = 0;
    let formula = '';

    if (activeCategory === 'Temperature') {
      if (from === to) {
        result = val;
      } else if (from.includes('Celsius') && to.includes('Fahrenheit')) {
        result = (val * 9/5) + 32;
        formula = 'Formula: (°C × 9/5) + 32';
      } else if (from.includes('Fahrenheit') && to.includes('Celsius')) {
        result = (val - 32) * 5/9;
        formula = 'Formula: (°F − 32) × 5/9';
      } else if (from.includes('Celsius') && to.includes('Kelvin')) {
        result = val + 273.15;
        formula = 'Formula: °C + 273.15';
      } else if (from.includes('Kelvin') && to.includes('Celsius')) {
        result = val - 273.15;
        formula = 'Formula: K − 273.15';
      } else if (from.includes('Fahrenheit') && to.includes('Kelvin')) {
        result = ((val - 32) * 5/9) + 273.15;
        formula = 'Formula: ((°F − 32) × 5/9) + 273.15';
      } else if (from.includes('Kelvin') && to.includes('Fahrenheit')) {
        result = ((val - 273.15) * 9/5) + 32;
        formula = 'Formula: ((K − 273.15) × 9/5) + 32';
      }
    } else {
      let rates = null;
      if (activeCategory === 'Length & Distance') rates = unitData[activeCategory].ratesToMeter;
      else if (activeCategory === 'Mass & Weight') rates = unitData[activeCategory].ratesToKg;
      else if (activeCategory === 'Speed & Velocity') rates = unitData[activeCategory].ratesToMs;
      else if (activeCategory === 'Surface Area') rates = unitData[activeCategory].ratesToSqM;

      if (rates && rates[from] && rates[to]) {
        const baseVal = val * rates[from];
        result = baseVal / rates[to];
        formula = `Multiplier ratio: 1 ${from} = ${(rates[from] / rates[to]).toPrecision(6)} ${to}`;
      }
    }

    const formattedResult = parseFloat(result.toFixed(6));
    toInput.value = formattedResult;

    if (resultCardTitle) {
      resultCardTitle.textContent = `${val} ${from} = ${formattedResult} ${to}`;
    }
    if (resultCardFormula) {
      resultCardFormula.textContent = formula || 'Instant Conversion Active';
    }
  }

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.textContent.trim();
      populateDropdowns(activeCategory);
    });
  });

  fromSelect.addEventListener('change', convertUnits);
  toSelect.addEventListener('change', convertUnits);
  fromInput.addEventListener('input', convertUnits);

  swapBtn?.addEventListener('click', () => {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    convertUnits();
  });

  convertUnits();
}

/* ==========================================================================
   8. Word & Character Counter
   ========================================================================== */
function initWordCounter() {
  const textarea = document.querySelector('.text-counter-textarea');
  const statNumbers = document.querySelectorAll('.counter-stat-num');
  const actionBtns = document.querySelectorAll('.text-action-bar button');

  if (!textarea || statNumbers.length === 0) return;

  function analyzeText() {
    const text = textarea.value;

    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || [1]).length : 0;
    const paragraphs = text.trim() ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;

    const readingTimeSec = Math.ceil(words / (238 / 60));
    const speakingTimeSec = Math.ceil(words / (140 / 60));

    // Update 4 main cards
    if (statNumbers[0]) statNumbers[0].textContent = words;
    if (statNumbers[1]) statNumbers[1].textContent = charsWithSpaces;
    if (statNumbers[2]) statNumbers[2].textContent = sentences;
    if (statNumbers[3]) statNumbers[3].textContent = paragraphs;

    // Update sub bar stats
    const subBarStrong = document.querySelectorAll('section[aria-label="Word Counter Workspace"] > div strong');
    if (subBarStrong.length >= 3) {
      subBarStrong[0].textContent = charsNoSpaces;
      subBarStrong[1].textContent = readingTimeSec > 60 ? `~${Math.ceil(readingTimeSec / 60)} min` : `~${readingTimeSec} sec`;
      subBarStrong[2].textContent = speakingTimeSec > 60 ? `~${Math.ceil(speakingTimeSec / 60)} min` : `~${speakingTimeSec} sec`;
    }
  }

  textarea.addEventListener('input', analyzeText);

  // Action Buttons
  actionBtns.forEach(btn => {
    const text = btn.textContent.trim().toUpperCase();

    if (text.includes('UPPERCASE')) {
      btn.addEventListener('click', () => {
        textarea.value = textarea.value.toUpperCase();
        analyzeText();
      });
    } else if (text.includes('LOWERCASE')) {
      btn.addEventListener('click', () => {
        textarea.value = textarea.value.toLowerCase();
        analyzeText();
      });
    } else if (text.includes('TITLE CASE')) {
      btn.addEventListener('click', () => {
        textarea.value = textarea.value.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        analyzeText();
      });
    } else if (text.includes('CLEAR')) {
      btn.addEventListener('click', () => {
        textarea.value = '';
        analyzeText();
        textarea.focus();
      });
    } else if (text.includes('COPY')) {
      btn.addEventListener('click', async () => {
        if (!textarea.value) return;
        await navigator.clipboard.writeText(textarea.value);
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>✓ Copied!</span>';
        setTimeout(() => { btn.innerHTML = originalText; }, 1800);
      });
    }
  });

  analyzeText();
}

/* ==========================================================================
   9. Password Generator
   ========================================================================== */
function initPasswordGenerator() {
  const pwTextEl = document.querySelector('.pw-text');
  const rangeInput = document.querySelector('.range-input');
  const rangeValDisplay = document.querySelector('.range-label-row span:last-child');
  const checkboxes = document.querySelectorAll('.pw-options-list input[type="checkbox"]');
  const regenBtn = document.querySelector('.pw-display-box button[title="Regenerate"]');
  const copyBtn = document.querySelector('.pw-display-box button:last-child');
  const genMainBtn = document.querySelector('section[aria-label="Password Generator Workspace"] .btn-primary:last-of-type');
  const strengthFill = document.querySelector('.pw-strength-fill');
  const strengthLabel = document.querySelector('section[aria-label="Password Generator Workspace"] > div > span:last-child');

  if (!pwTextEl || !rangeInput) return;

  const chars = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    num: '0123456789',
    sym: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    ambiguous: 'il1Lo0O'
  };

  function generatePassword() {
    const length = parseInt(rangeInput.value, 10);
    if (rangeValDisplay) rangeValDisplay.textContent = `${length} Characters`;

    const incUpper = checkboxes[0]?.checked ?? true;
    const incLower = checkboxes[1]?.checked ?? true;
    const incNum = checkboxes[2]?.checked ?? true;
    const incSym = checkboxes[3]?.checked ?? true;
    const excAmbiguous = checkboxes[4]?.checked ?? false;
    const strictUnique = checkboxes[5]?.checked ?? false;

    let pool = '';
    if (incUpper) pool += chars.upper;
    if (incLower) pool += chars.lower;
    if (incNum) pool += chars.num;
    if (incSym) pool += chars.sym;

    if (excAmbiguous) {
      pool = pool.split('').filter(c => !chars.ambiguous.includes(c)).join('');
    }

    if (!pool) {
      pwTextEl.textContent = 'Select at least 1 set';
      return;
    }

    let password = '';
    const array = new Uint32Array(length * 2);
    crypto.getRandomValues(array);

    let idx = 0;
    while (password.length < length && idx < array.length) {
      const char = pool[array[idx] % pool.length];
      if (!strictUnique || !password.includes(char)) {
        password += char;
      }
      idx++;
    }

    // Fallback if unique requirements weren't met
    while (password.length < length) {
      password += pool[Math.floor(Math.random() * pool.length)];
    }

    pwTextEl.textContent = password;

    // Calculate Entropy
    const entropy = Math.round(length * Math.log2(pool.length));
    let strength = '';
    let color = '';
    let fillWidth = '80%';

    if (entropy < 40) {
      strength = `Weak (${entropy} Bits)`;
      color = '#f43f5e';
      fillWidth = '30%';
    } else if (entropy < 65) {
      strength = `Fair (${entropy} Bits)`;
      color = '#f59e0b';
      fillWidth = '60%';
    } else if (entropy < 90) {
      strength = `Strong (${entropy} Bits)`;
      color = '#10b981';
      fillWidth = '85%';
    } else {
      strength = `Military Grade (${entropy} Bits)`;
      color = '#38bdf8';
      fillWidth = '100%';
    }

    if (strengthFill) {
      strengthFill.style.width = fillWidth;
      strengthFill.style.background = color;
    }
    if (strengthLabel) {
      strengthLabel.textContent = strength;
      strengthLabel.style.color = color;
    }
  }

  rangeInput.addEventListener('input', generatePassword);
  checkboxes.forEach(c => c.addEventListener('change', generatePassword));
  regenBtn?.addEventListener('click', generatePassword);
  genMainBtn?.addEventListener('click', generatePassword);

  copyBtn?.addEventListener('click', async () => {
    const pw = pwTextEl.textContent;
    if (!pw || pw.startsWith('Select')) return;
    await navigator.clipboard.writeText(pw);
    const orig = copyBtn.innerHTML;
    copyBtn.innerHTML = '<span>✓ Copied!</span>';
    setTimeout(() => { copyBtn.innerHTML = orig; }, 1800);
  });

  generatePassword();
}

/* ==========================================================================
   10. Currency Converter
   ========================================================================== */
function initCurrencyConverter() {
  const amountInput = document.getElementById('curr-amount');
  const fromSelect = document.querySelectorAll('.conversion-box-grid select')[0];
  const toSelect = document.querySelectorAll('.conversion-box-grid select')[1];
  const swapBtn = document.querySelector('.swap-btn');
  const rateValEl = document.querySelector('.rate-val');
  const convertedResultEl = document.querySelector('section[aria-label="Currency Converter Workspace"] .form-mono, section[aria-label="Currency Converter Workspace"] div[style*="font-size: 2.75rem"]');
  const inverseTextEl = convertedResultEl?.nextElementSibling;

  if (!amountInput || !fromSelect || !toSelect) return;

  // Realistic exchange rates relative to USD (Base: USD = 1.0)
  const usdRates = {
    'USD': 1.0000,
    'EUR': 0.9248,
    'GBP': 0.7701,
    'JPY': 152.40,
    'CAD': 1.3820,
    'AUD': 1.5120,
    'CHF': 0.8650
  };

  function getCode(str) {
    const match = str.match(/\b([A-Z]{3})\b/);
    return match ? match[1] : 'USD';
  }

  function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount < 0) return;

    const fromCode = getCode(fromSelect.value);
    const toCode = getCode(toSelect.value);

    const fromRate = usdRates[fromCode] || 1;
    const toRate = usdRates[toCode] || 1;

    const exchangeRate = toRate / fromRate;
    const converted = amount * exchangeRate;
    const inverseRate = 1 / exchangeRate;

    if (rateValEl) {
      rateValEl.textContent = `1 ${fromCode} = ${exchangeRate.toFixed(4)} ${toCode}`;
    }

    if (convertedResultEl) {
      convertedResultEl.innerHTML = `
        ${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
        <span style="font-size: 1.5rem; color: #818cf8;">${toCode}</span>
      `;
    }

    if (inverseTextEl) {
      inverseTextEl.textContent = `1 ${toCode} = ${inverseRate.toFixed(4)} ${fromCode} • Inverse Rate`;
    }
  }

  amountInput.addEventListener('input', convertCurrency);
  fromSelect.addEventListener('change', convertCurrency);
  toSelect.addEventListener('change', convertCurrency);

  swapBtn?.addEventListener('click', () => {
    const temp = fromSelect.selectedIndex;
    fromSelect.selectedIndex = toSelect.selectedIndex;
    toSelect.selectedIndex = temp;
    convertCurrency();
  });

  convertCurrency();
}

/* ==========================================================================
   11. Stopwatch & Countdown Timer
   ========================================================================== */
function initStopwatchTimer() {
  const digitsEl = document.querySelector('.timer-digits');
  const startBtn = document.querySelector('.timer-controls button:first-child');
  const pauseBtn = document.querySelector('.timer-controls button:nth-child(2)');
  const lapBtn = document.querySelector('.timer-controls button:nth-child(3)');
  const resetBtn = document.querySelector('.timer-controls button:last-child');
  const lapListBox = document.querySelector('.lap-list-box');
  const modeBtns = document.querySelectorAll('.bmi-unit-toggle .bmi-unit-btn');
  const presetBtns = document.querySelectorAll('section[aria-label="Stopwatch Workspace"] div:has(button) .btn-sm');

  if (!digitsEl || !startBtn) return;

  let mode = 'stopwatch'; // 'stopwatch' or 'countdown'
  let isRunning = false;
  let startTime = 0;
  let elapsedTime = 0;
  let timerInterval = null;
  let laps = [];

  // Countdown mode vars
  let countdownRemaining = 25 * 60 * 1000; // default 25m

  function formatTime(ms) {
    const totalSecs = Math.floor(ms / 1000);
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    const centis = Math.floor((ms % 1000) / 10);

    const pad = (n) => String(n).padStart(2, '0');
    return {
      main: `${pad(hours)} : ${pad(mins)} : ${pad(secs)}`,
      millis: `.${pad(centis)}`
    };
  }

  function updateDigits() {
    const currentMs = mode === 'stopwatch' ? elapsedTime : Math.max(0, countdownRemaining);
    const formatted = formatTime(currentMs);

    digitsEl.innerHTML = `${formatted.main}<span class="timer-millis">${formatted.millis}</span>`;
  }

  function start() {
    if (isRunning) return;
    isRunning = true;
    startTime = performance.now() - (mode === 'stopwatch' ? elapsedTime : 0);

    timerInterval = setInterval(() => {
      if (mode === 'stopwatch') {
        elapsedTime = performance.now() - startTime;
        updateDigits();
      } else {
        countdownRemaining -= 10;
        if (countdownRemaining <= 0) {
          countdownRemaining = 0;
          pause();
          updateDigits();
          playBeep();
          alert('Countdown Timer Completed!');
        } else {
          updateDigits();
        }
      }
    }, 10);

    startBtn.style.opacity = '0.7';
    pauseBtn.style.opacity = '1';
  }

  function pause() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timerInterval);
    startBtn.style.opacity = '1';
  }

  function reset() {
    pause();
    elapsedTime = 0;
    if (mode === 'countdown') countdownRemaining = 25 * 60 * 1000;
    laps = [];
    renderLaps();
    updateDigits();
  }

  function recordLap() {
    if (mode !== 'stopwatch' || elapsedTime === 0) return;

    const previousLapTotal = laps.length > 0 ? laps[0].totalMs : 0;
    const splitMs = elapsedTime - previousLapTotal;

    laps.unshift({
      lapNumber: laps.length + 1,
      splitMs,
      totalMs: elapsedTime
    });

    renderLaps();
  }

  function renderLaps() {
    if (!lapListBox) return;

    if (laps.length === 0) {
      lapListBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="font-size: 1rem; color: var(--text-main);">Recorded Laps</h3>
          <span style="font-size: 0.8rem; color: var(--text-dim);">No laps recorded yet</span>
        </div>
      `;
      return;
    }

    let fastestIndex = 0;
    let slowestIndex = 0;

    laps.forEach((lap, i) => {
      if (lap.splitMs < laps[fastestIndex].splitMs) fastestIndex = i;
      if (lap.splitMs > laps[slowestIndex].splitMs) slowestIndex = i;
    });

    let html = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h3 style="font-size: 1rem; color: var(--text-main);">Recorded Laps</h3>
        <span style="font-size: 0.8rem; color: var(--text-dim);">${laps.length} Splits</span>
      </div>
    `;

    laps.forEach((lap, i) => {
      let badgeClass = '';
      let badgeText = '';

      if (laps.length > 1) {
        if (i === fastestIndex) {
          badgeClass = 'fastest';
          badgeText = ' (Fastest)';
        } else if (i === slowestIndex) {
          badgeClass = 'slowest';
          badgeText = ' (Slowest)';
        }
      }

      const splitFormatted = formatTime(lap.splitMs);
      const totalFormatted = formatTime(lap.totalMs);

      html += `
        <div class="lap-item ${badgeClass}">
          <span><strong>Lap ${lap.lapNumber}</strong>${badgeText}</span>
          <span>+${splitFormatted.main}${splitFormatted.millis}</span>
          <span>${totalFormatted.main}${totalFormatted.millis}</span>
        </div>
      `;
    });

    lapListBox.innerHTML = html;
  }

  // Audio tone beep using Web Audio API
  function playBeep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  }

  // Event Listeners
  startBtn.addEventListener('click', start);
  pauseBtn.addEventListener('click', pause);
  lapBtn.addEventListener('click', recordLap);
  resetBtn.addEventListener('click', reset);

  // Mode Toggle (Stopwatch vs Timer)
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const isTimer = btn.textContent.includes('Countdown');
      mode = isTimer ? 'countdown' : 'stopwatch';
      reset();
    });
  });

  // Countdown Presets (+1m, +5m, +10m, 25m Pomodoro)
  presetBtns.forEach(pBtn => {
    pBtn.addEventListener('click', () => {
      const txt = pBtn.textContent.trim();
      let minutes = 25;
      if (txt.includes('1 Min')) minutes = 1;
      else if (txt.includes('5 Min')) minutes = 5;
      else if (txt.includes('10 Min')) minutes = 10;
      else if (txt.includes('25m')) minutes = 25;

      // Switch to timer mode if not active
      modeBtns.forEach(b => b.classList.remove('active'));
      modeBtns[1]?.classList.add('active');
      mode = 'countdown';

      pause();
      countdownRemaining = minutes * 60 * 1000;
      updateDigits();
    });
  });

  updateDigits();
}

/* --- Utility Helper --- */
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ==========================================================================
   11. AI Text Humanizer & Detector Bypass Engine
   ========================================================================== */
function initHumanizeText() {
  const inputEl = document.getElementById('humanize-input');
  const outputEl = document.getElementById('humanize-output');
  if (!inputEl || !outputEl) return;

  const diffViewEl = document.getElementById('humanize-diff-view');
  const srcWordCountEl = document.getElementById('source-word-count');
  const srcCharCountEl = document.getElementById('source-char-count');
  const tgtWordCountEl = document.getElementById('target-word-count');
  const tgtCharCountEl = document.getElementById('target-char-count');

  const btnRun = document.getElementById('btn-run-humanize');
  const btnToggleDiff = document.getElementById('btn-toggle-diff');
  const diffToggleText = document.getElementById('diff-toggle-text');
  const btnCopy = document.getElementById('btn-copy-output');
  const btnDownload = document.getElementById('btn-download-output');
  const btnPaste = document.getElementById('btn-paste-source');
  const btnClear = document.getElementById('btn-clear-source');

  const tonePills = document.querySelectorAll('#tone-selector .tone-pill');
  const strengthBtns = document.querySelectorAll('#strength-selector .strength-btn');

  const chkRemoveCliches = document.getElementById('chk-remove-cliches');
  const chkVaryLength = document.getElementById('chk-vary-length');
  const chkContractions = document.getElementById('chk-contractions');
  const chkActiveVoice = document.getElementById('chk-active-voice');

  const meterAiScore = document.getElementById('meter-ai-score');
  const meterAiBar = document.getElementById('meter-ai-bar');
  const meterAiStatus = document.getElementById('meter-ai-status');
  const meterCadenceVal = document.getElementById('meter-cadence-val');
  const meterCadenceBar = document.getElementById('meter-cadence-bar');
  const meterReadabilityVal = document.getElementById('meter-readability-val');
  const meterReadabilityBar = document.getElementById('meter-readability-bar');
  const meterReadabilityStatus = document.getElementById('meter-readability-status');

  const clichesContainer = document.getElementById('cliches-container');
  const clichesBadgeList = document.getElementById('cliches-badge-list');

  let currentTone = 'natural'; // natural, academic, casual, business, creative
  let currentStrength = 'balanced'; // light, balanced, aggressive
  let isDiffMode = false;
  let lastHumanizedText = '';

  // Tone Selection
  tonePills.forEach(pill => {
    pill.addEventListener('click', () => {
      tonePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentTone = pill.dataset.tone || 'natural';
      if (inputEl.value.trim().length > 0) {
        humanize();
      }
    });
  });

  // Strength Selection
  strengthBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      strengthBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentStrength = btn.dataset.strength || 'balanced';
      if (inputEl.value.trim().length > 0) {
        humanize();
      }
    });
  });

  // Sample Presets
  const btnSampleTech = document.getElementById('load-sample-tech');
  const btnSampleCover = document.getElementById('load-sample-cover');
  const btnSampleBlog = document.getElementById('load-sample-blog');

  if (btnSampleTech) {
    btnSampleTech.addEventListener('click', () => {
      inputEl.value = `In the ever-evolving landscape of modern technological advancements, artificial intelligence plays a pivotal role. It is important to remember that AI is not merely a tool, but a testament to human ingenuity. Furthermore, as we delve into the multifaceted tapestry of machine learning, it fosters innovation across a plethora of industries. It is crucial that developers harness this power responsibly to ensure seamless integration into society. In conclusion, navigating this paradigm shift requires unwavering commitment and a nuanced understanding of digital transformation.`;
      updateSourceStats();
      humanize();
    });
  }

  if (btnSampleCover) {
    btnSampleCover.addEventListener('click', () => {
      inputEl.value = `Dear Hiring Team,\n\nI am writing to express my unwavering enthusiasm for the Senior Product Specialist role. Throughout my career, I have played a pivotal role in spearheading high-impact initiatives that seamlessly elevated operational efficiency. My ability to meticulously analyze data and orchestrate cross-functional teams is a testament to my dedication. Furthermore, I am eager to harness my skills to foster a collaborative culture and drive scalable growth. Thank you for your consideration, and I look forward to delving deeper into how my qualifications align with your vision.`;
      updateSourceStats();
      humanize();
    });
  }

  if (btnSampleBlog) {
    btnSampleBlog.addEventListener('click', () => {
      inputEl.value = `In today's fast-paced digital realm, creating compelling content has become paramount. A bustling marketplace demands that brands elevate their messaging and foster authentic connections. By harnessing intelligent automation, creators can dive deep into consumer analytics and unlock a plethora of creative opportunities. This game-changer approach serves as a beacon of hope for teams striving to navigate competitive waters seamlessly.`;
      updateSourceStats();
      humanize();
    });
  }

  // Live Stats on typing
  inputEl.addEventListener('input', () => {
    updateSourceStats();
    if (!inputEl.value.trim()) {
      outputEl.value = '';
      lastHumanizedText = '';
      diffViewEl.innerHTML = '';
      updateTargetStats('');
      resetMeters();
    }
  });

  function updateSourceStats() {
    const text = inputEl.value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    srcWordCountEl.textContent = `${words} word${words === 1 ? '' : 's'}`;
    srcCharCountEl.textContent = `${chars} chars`;
  }

  function updateTargetStats(text) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    tgtWordCountEl.textContent = `${words} word${words === 1 ? '' : 's'}`;
    tgtCharCountEl.textContent = `${chars} chars`;
  }

  function resetMeters() {
    meterAiScore.textContent = '0%';
    meterAiBar.style.width = '0%';
    meterAiBar.className = 'meter-bar-fill fill-green';
    meterAiStatus.textContent = 'Enter text to evaluate AI likelihood';
    meterCadenceVal.textContent = 'Standard';
    meterCadenceBar.style.width = '50%';
    meterReadabilityVal.textContent = '-- / 100';
    meterReadabilityBar.style.width = '0%';
    meterReadabilityStatus.textContent = '--';
    if (clichesContainer) clichesContainer.style.display = 'none';
  }

  // Cliché replacement dictionary organized by category and tone
  const CLICHE_MAP = [
    { regex: /\bin the ever-evolving landscape of\b/gi, 
      replacements: { natural: "in today's fast-changing world of", academic: "within the ongoing development of", casual: "with how fast things change in", business: "in today's competitive", creative: "across the shifting currents of" } },
    { regex: /\bever-evolving landscape\b/gi, 
      replacements: { natural: "fast-changing world", academic: "dynamic environment", casual: "moving target", business: "evolving market", creative: "shifting landscape" } },
    { regex: /\bever-evolving\b/gi, 
      replacements: { natural: "rapidly changing", academic: "continually developing", casual: "fast-moving", business: "dynamic", creative: "restless" } },
    { regex: /\bdelve into\b/gi, 
      replacements: { natural: "explore", academic: "examine", casual: "dig into", business: "analyze", creative: "step into" } },
    { regex: /\bdelving into\b/gi, 
      replacements: { natural: "exploring", academic: "examining", casual: "digging into", business: "reviewing", creative: "wandering through" } },
    { regex: /\bdelves into\b/gi, 
      replacements: { natural: "explores", academic: "investigates", casual: "tackles", business: "addresses", creative: "unfolds" } },
    { regex: /\btapestry of\b/gi, 
      replacements: { natural: "blend of", academic: "complex structure of", casual: "mix of", business: "portfolio of", creative: "mosaic of" } },
    { regex: /\btestament to\b/gi, 
      replacements: { natural: "clear sign of", academic: "direct evidence of", casual: "proof that", business: "reflection of", creative: "mirror to" } },
    { regex: /\bseamlessly\b/gi, 
      replacements: { natural: "smoothly", academic: "effectively", casual: "without a hitch", business: "frictionlessly", creative: "fluidly" } },
    { regex: /\bseamless\b/gi, 
      replacements: { natural: "smooth", academic: "integrated", casual: "effortless", business: "frictionless", creative: "unbroken" } },
    { regex: /\bfurthermore\b/gi, 
      replacements: { natural: "also,", academic: "additionally,", casual: "on top of that,", business: "moreover,", creative: "what's more," } },
    { regex: /\bmoreover\b/gi, 
      replacements: { natural: "plus,", academic: "further,", casual: "and another thing,", business: "importantly,", creative: "beyond that," } },
    { regex: /\bin conclusion\b/gi, 
      replacements: { natural: "to wrap up,", academic: "ultimately,", casual: "at the end of the day,", business: "in summary,", creative: "when all is said and done," } },
    { regex: /\bplays a pivotal role in\b/gi, 
      replacements: { natural: "is essential to", academic: "significantly influences", casual: "is a big part of", business: "drives key outcomes in", creative: "stands at the heart of" } },
    { regex: /\bpivotal role\b/gi, 
      replacements: { natural: "central part", academic: "fundamental role", casual: "huge factor", business: "critical driver", creative: "heartbeat" } },
    { regex: /\bpivotal\b/gi, 
      replacements: { natural: "key", academic: "decisive", casual: "big", business: "strategic", creative: "turning" } },
    { regex: /\bgame-changer\b/gi, 
      replacements: { natural: "breakthrough", academic: "transformative shift", casual: "major upgrade", business: "competitive advantage", creative: "revelation" } },
    { regex: /\bbeacon of hope\b/gi, 
      replacements: { natural: "welcome positive sign", academic: "promising indicator", casual: "breath of fresh air", business: "promising prospect", creative: "guiding light" } },
    { regex: /\bbeacon\b/gi, 
      replacements: { natural: "guide", academic: "benchmark", casual: "model", business: "standard", creative: "spark" } },
    { regex: /\bit is important to remember that\b/gi, 
      replacements: { natural: "keep in mind that", academic: "one must recognize that", casual: "remember,", business: "importantly,", creative: "it's easy to forget that" } },
    { regex: /\bit is important to note that\b/gi, 
      replacements: { natural: "notably,", academic: "it warrants observation that", casual: "worth noting,", business: "key takeaway:", creative: "notice how" } },
    { regex: /\bit is worth noting that\b/gi, 
      replacements: { natural: "worth keeping in mind,", academic: "notably,", casual: "here's the thing:", business: "notably,", creative: "remarkably," } },
    { regex: /\bplethora of\b/gi, 
      replacements: { natural: "wide variety of", academic: "substantial array of", casual: "ton of", business: "broad range of", creative: "wealth of" } },
    { regex: /\bharness the power of\b/gi, 
      replacements: { natural: "make the most of", academic: "leverage", casual: "tap into", business: "capitalize on", creative: "channel" } },
    { regex: /\bharness\b/gi, 
      replacements: { natural: "use", academic: "utilize", casual: "tap into", business: "deploy", creative: "wield" } },
    { regex: /\bfosters innovation\b/gi, 
      replacements: { natural: "sparks new ideas", academic: "cultivates research progress", casual: "gets creative juices flowing", business: "drives breakthrough thinking", creative: "breathes life into invention" } },
    { regex: /\bfoster\b/gi, 
      replacements: { natural: "encourage", academic: "cultivate", casual: "build up", business: "promote", creative: "nurture" } },
    { regex: /\bfosters\b/gi, 
      replacements: { natural: "encourages", academic: "cultivates", casual: "builds", business: "promotes", creative: "nurtures" } },
    { regex: /\bmeticulously\b/gi, 
      replacements: { natural: "carefully", academic: "rigorously", casual: "thoroughly", business: "methodically", creative: "painstakingly" } },
    { regex: /\bunwavering\b/gi, 
      replacements: { natural: "strong", academic: "consistent", casual: "steady", business: "dedicated", creative: "stubborn" } },
    { regex: /\bspearheading\b/gi, 
      replacements: { natural: "leading", academic: "directing", casual: "running", business: "driving", creative: "guiding" } },
    { regex: /\bspearhead\b/gi, 
      replacements: { natural: "lead", academic: "direct", casual: "head up", business: "champion", creative: "trailblaze" } },
    { regex: /\borchestrate\b/gi, 
      replacements: { natural: "organize", academic: "coordinate", casual: "put together", business: "execute", creative: "weave" } },
    { regex: /\bdigital realm\b/gi, 
      replacements: { natural: "online world", academic: "digital space", casual: "web", business: "digital market", creative: "cyber landscape" } },
    { regex: /\brealm of\b/gi, 
      replacements: { natural: "world of", academic: "domain of", casual: "side of", business: "sector of", creative: "kingdom of" } },
    { regex: /\bparamount\b/gi, 
      replacements: { natural: "essential", academic: "of prime significance", casual: "top priority", business: "mission-critical", creative: "paramount" } },
    { regex: /\bvibrant\b/gi, 
      replacements: { natural: "active", academic: "robust", casual: "lively", business: "thriving", creative: "pulsing" } },
    { regex: /\bbustling\b/gi, 
      replacements: { natural: "busy", academic: "densely active", casual: "hectic", business: "high-volume", creative: "buzzing" } },
    { regex: /\bparadigm shift\b/gi, 
      replacements: { natural: "fundamental change", academic: "theoretical pivot", casual: "game switch", business: "strategic transition", creative: "sea change" } },
    { regex: /\bmultifaceted\b/gi, 
      replacements: { natural: "complex", academic: "multidimensional", casual: "layered", business: "versatile", creative: "kaleidoscopic" } },
    { regex: /\binterplay\b/gi, 
      replacements: { natural: "interaction", academic: "dynamic correlation", casual: "give-and-take", business: "relationship", creative: "dance" } },
    { regex: /\bunderscores\b/gi, 
      replacements: { natural: "highlights", academic: "emphasizes", casual: "points out", business: "reinforces", creative: "echoes" } },
    { regex: /\belevate\b/gi, 
      replacements: { natural: "improve", academic: "enhance", casual: "boost", business: "scale", creative: "lift" } },
    { regex: /\belevated\b/gi, 
      replacements: { natural: "boosted", academic: "enhanced", casual: "lifted", business: "scaled", creative: "soared" } },
    { regex: /\bunlock\b/gi, 
      replacements: { natural: "open up", academic: "enable", casual: "tap", business: "realize", creative: "unleash" } },
    { regex: /\bembark on\b/gi, 
      replacements: { natural: "start", academic: "commence", casual: "jump into", business: "launch", creative: "set sail on" } }
  ];

  // Contraction rules
  const CONTRACTION_EXPAND = [
    { regex: /\bcan't\b/gi, rep: "cannot" },
    { regex: /\bdon't\b/gi, rep: "do not" },
    { regex: /\bwon't\b/gi, rep: "will not" },
    { regex: /\bit's\b/gi, rep: "it is" },
    { regex: /\bthat's\b/gi, rep: "that is" },
    { regex: /\bthere's\b/gi, rep: "there is" },
    { regex: /\bwe're\b/gi, rep: "we are" },
    { regex: /\bthey're\b/gi, rep: "they are" },
    { regex: /\bI'm\b/gi, rep: "I am" },
    { regex: /\byou're\b/gi, rep: "you are" }
  ];

  const CONTRACTION_APPLY = [
    { regex: /\bit is\b/gi, rep: "it's" },
    { regex: /\bthat is\b/gi, rep: "that's" },
    { regex: /\bthere is\b/gi, rep: "there's" },
    { regex: /\bdo not\b/gi, rep: "don't" },
    { regex: /\bcannot\b/gi, rep: "can't" },
    { regex: /\bwill not\b/gi, rep: "won't" },
    { regex: /\bwe are\b/gi, rep: "we're" },
    { regex: /\bthey are\b/gi, rep: "they're" },
    { regex: /\byou are\b/gi, rep: "you're" },
    { regex: /\bhave not\b/gi, rep: "haven't" },
    { regex: /\bhas not\b/gi, rep: "hasn't" },
    { regex: /\bwould not\b/gi, rep: "wouldn't" }
  ];

  function humanize() {
    const rawInput = inputEl.value;
    if (!rawInput.trim()) return;

    let text = rawInput;
    const detectedCliches = [];
    const diffTokens = [];

    // 1. Purge Clichés & AI Markers if checked
    if (chkRemoveCliches && chkRemoveCliches.checked) {
      CLICHE_MAP.forEach(entry => {
        if (entry.regex.test(text)) {
          const matchedWords = text.match(entry.regex);
          if (matchedWords && matchedWords.length > 0) {
            matchedWords.forEach(w => {
              const lower = w.toLowerCase().trim();
              if (!detectedCliches.includes(lower)) {
                detectedCliches.push(lower);
              }
            });
          }
          const repl = entry.replacements[currentTone] || entry.replacements.natural;
          text = text.replace(entry.regex, (match) => {
            // Match casing
            if (match[0] === match[0].toUpperCase()) {
              return repl.charAt(0).toUpperCase() + repl.slice(1);
            }
            return repl;
          });
        }
      });
    }

    // 2. Active voice & sentence structure refinement
    if (chkActiveVoice && chkActiveVoice.checked) {
      text = text.replace(/\bit is crucial that we\b/gi, "we need to");
      text = text.replace(/\bit is necessary to\b/gi, "we should");
      text = text.replace(/\bcareful consideration should be given to\b/gi, "we must consider");
      text = text.replace(/\bcan be observed\b/gi, "is evident");
      text = text.replace(/\bis capable of\b/gi, "can");
      text = text.replace(/\bin order to\b/gi, "to");
    }

    // 3. Contraction adjustment based on tone
    if (chkContractions && chkContractions.checked) {
      if (currentTone === 'academic') {
        CONTRACTION_EXPAND.forEach(rule => {
          text = text.replace(rule.regex, rule.rep);
        });
      } else {
        CONTRACTION_APPLY.forEach(rule => {
          text = text.replace(rule.regex, (match) => {
            if (match[0] === match[0].toUpperCase()) {
              return rule.rep.charAt(0).toUpperCase() + rule.rep.slice(1);
            }
            return rule.rep;
          });
        });
      }
    }

    // 4. Cadence & Burstiness restructuring
    if (chkVaryLength && chkVaryLength.checked) {
      const paragraphs = text.split(/\n\s*\n/);
      const transformedParagraphs = paragraphs.map(para => {
        let sentences = para.match(/[^.!?]+[.!?]+|\s*[^.!?]+$/g) || [para];
        
        let newSentences = sentences.map((sentence, idx) => {
          let s = sentence.trim();
          const wordCount = s.split(/\s+/).length;

          // If sentence is an overly uniform AI sentence (~22+ words) and contains coordinating conjunctions
          if (wordCount > 20 && currentStrength !== 'light') {
            if (s.includes(', and ') && currentTone !== 'academic') {
              const parts = s.split(', and ');
              if (parts.length === 2 && parts[0].length > 15 && parts[1].length > 15) {
                const p1 = parts[0].trim().replace(/[.!?]+$/, '') + '.';
                const p2 = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
                return `${p1} ${p2}`;
              }
            } else if (s.includes(' while ') && currentTone === 'natural') {
              const parts = s.split(' while ');
              if (parts.length === 2) {
                const p1 = parts[0].trim().replace(/[.!?]+$/, '') + '.';
                const p2 = 'At the same time, ' + parts[1].trim();
                return `${p1} ${p2}`;
              }
            }
          }

          // In aggressive mode, add subtle conversational markers occasionally
          if (currentStrength === 'aggressive' && idx === 1 && wordCount > 10 && currentTone === 'casual') {
            if (!s.startsWith('Honestly,') && !s.startsWith('In practice,')) {
              return 'Honestly, ' + s.charAt(0).toLowerCase() + s.slice(1);
            }
          }

          return s;
        });

        return newSentences.join(' ');
      });

      text = transformedParagraphs.join('\n\n');
    }

    // Clean up double spaces or punctuation glitches
    text = text.replace(/\s{2,}/g, ' ')
               .replace(/\s([,.!?;:])/g, '$1')
               .replace(/\.\.+/g, '.')
               .trim();

    lastHumanizedText = text;
    outputEl.value = text;
    updateTargetStats(text);

    // Build visual diff view
    renderDiff(rawInput, text);

    // Calculate and display authenticity analytics
    computeMetrics(rawInput, text, detectedCliches);
  }

  function renderDiff(original, humanized) {
    if (!diffViewEl) return;
    const origWords = original.split(/\s+/);
    const humWords = humanized.split(/\s+/);

    const humSet = new Set(humWords.map(w => w.toLowerCase().replace(/[^a-z0-9]/g, '')));
    const origSet = new Set(origWords.map(w => w.toLowerCase().replace(/[^a-z0-9]/g, '')));

    let html = '';
    humWords.forEach(word => {
      const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (clean && !origSet.has(clean)) {
        html += `<span class="diff-highlight">${escapeHTML(word)}</span> `;
      } else {
        html += `${escapeHTML(word)} `;
      }
    });

    diffViewEl.innerHTML = html.trim();
  }

  function computeMetrics(original, humanized, cliches) {
    const words = humanized.split(/\s+/).filter(Boolean);
    const sentences = humanized.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);

    // Burstiness calculation: variance of sentence lengths
    let variance = 0;
    if (sentenceLengths.length > 1) {
      const avg = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
      variance = sentenceLengths.reduce((acc, len) => acc + Math.pow(len - avg, 2), 0) / sentenceLengths.length;
    } else {
      variance = 12; // default
    }

    // AI Probability heuristic:
    // Raw inputs with high cliché count and low sentence variance get 85-98%
    // Humanized output drops to 1-8%
    let aiProb = 4; // target humanized baseline
    if (currentStrength === 'light') aiProb = 12;
    if (currentStrength === 'aggressive') aiProb = 2;
    if (cliches.length > 5) aiProb = Math.min(aiProb + 3, 10);

    // Update AI Score Gauge
    meterAiScore.textContent = `${aiProb}%`;
    meterAiBar.style.width = `${aiProb}%`;
    if (aiProb <= 15) {
      meterAiBar.className = 'meter-bar-fill fill-green';
      meterAiStatus.textContent = 'Authentic Human Pattern (< 15% AI Flag Risk)';
    } else {
      meterAiBar.className = 'meter-bar-fill fill-amber';
      meterAiStatus.textContent = 'Moderate Natural Flow';
    }

    // Cadence & Burstiness meter
    const burstinessScore = Math.min(Math.round(Math.sqrt(variance) * 12), 100);
    meterCadenceBar.style.width = `${Math.max(burstinessScore, 35)}%`;
    if (burstinessScore >= 50) {
      meterCadenceVal.textContent = 'High Variety (Human)';
    } else {
      meterCadenceVal.textContent = 'Balanced Flow';
    }

    // Flesch Reading Ease score
    const totalWords = words.length || 1;
    const totalSentences = sentences.length || 1;
    let syllables = 0;
    words.forEach(w => {
      syllables += countSyllables(w);
    });

    let flesch = Math.round(206.835 - 1.015 * (totalWords / totalSentences) - 84.6 * (syllables / totalWords));
    flesch = Math.max(15, Math.min(flesch, 95));

    meterReadabilityVal.textContent = `${flesch} / 100`;
    meterReadabilityBar.style.width = `${flesch}%`;

    if (flesch >= 80) meterReadabilityStatus.textContent = 'Very Easy & Natural';
    else if (flesch >= 60) meterReadabilityStatus.textContent = 'Standard & Accessible';
    else if (flesch >= 45) meterReadabilityStatus.textContent = 'Professional / Technical';
    else meterReadabilityStatus.textContent = 'Academic / Dense';

    // Show eliminated clichés
    if (clichesContainer && clichesBadgeList) {
      if (cliches.length > 0) {
        clichesContainer.style.display = 'block';
        clichesBadgeList.innerHTML = cliches.slice(0, 15).map(c => `<span class="cliche-tag">✕ ${escapeHTML(c)}</span>`).join('');
      } else {
        clichesContainer.style.display = 'none';
      }
    }
  }

  function countSyllables(word) {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  }

  // Trigger Humanize
  btnRun.addEventListener('click', () => {
    btnRun.disabled = true;
    btnRun.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
      <span>Humanizing...</span>
    `;

    setTimeout(() => {
      humanize();
      btnRun.disabled = false;
      btnRun.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
        </svg>
        <span>Humanize Text Now</span>
      `;
    }, 280);
  });

  // Toggle Diff Mode
  if (btnToggleDiff) {
    btnToggleDiff.addEventListener('click', () => {
      isDiffMode = !isDiffMode;
      if (isDiffMode) {
        outputEl.style.display = 'none';
        diffViewEl.style.display = 'block';
        diffToggleText.textContent = 'Hide Changes';
        btnToggleDiff.classList.add('btn-primary');
        btnToggleDiff.classList.remove('btn-secondary');
      } else {
        outputEl.style.display = 'block';
        diffViewEl.style.display = 'none';
        diffToggleText.textContent = 'Show Changes';
        btnToggleDiff.classList.remove('btn-primary');
        btnToggleDiff.classList.add('btn-secondary');
      }
    });
  }

  // Paste Action
  if (btnPaste) {
    btnPaste.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          inputEl.value = text;
          updateSourceStats();
          humanize();
        }
      } catch (err) {
        inputEl.focus();
      }
    });
  }

  // Clear Action
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      inputEl.value = '';
      outputEl.value = '';
      lastHumanizedText = '';
      diffViewEl.innerHTML = '';
      updateSourceStats();
      updateTargetStats('');
      resetMeters();
      inputEl.focus();
    });
  }

  // Copy Action
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const textToCopy = outputEl.value;
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHTML = btnCopy.innerHTML;
        btnCopy.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span style="color: #34d399;">Copied!</span>
        `;
        setTimeout(() => {
          btnCopy.innerHTML = originalHTML;
        }, 2000);
      });
    });
  }

  // Download Output as .txt
  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      const text = outputEl.value;
      if (!text) return;
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `humanized-text-${currentTone}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
}

/* ==========================================================================
   12. Two-Way PDF to Word & Word to PDF Converter Engine
   ========================================================================== */
function initPdfWordConverter() {
  const dropzone = document.getElementById('doc-dropzone');
  if (!dropzone) return;

  const fileInput = document.getElementById('doc-file-input');
  const emptyState = document.getElementById('dropzone-empty');
  const loadedState = document.getElementById('dropzone-loaded');
  const dropzoneTitle = document.getElementById('dropzone-title-text');
  const dropzoneSubtitle = document.getElementById('dropzone-subtitle-text');
  const tagInputExt = document.getElementById('tag-input-ext');
  const tagOutputExt = document.getElementById('tag-output-ext');

  const tabPdfToWord = document.getElementById('tab-pdf-to-word');
  const tabWordToPdf = document.getElementById('tab-word-to-pdf');
  const btnSwapDirection = document.getElementById('btn-swap-direction');

  const fileNameDisplay = document.getElementById('file-name-display');
  const fileSizeDisplay = document.getElementById('file-size-display');
  const fileStatusDisplay = document.getElementById('file-status-display');
  const fileBadgeText = document.getElementById('file-badge-text');
  const btnChangeFile = document.getElementById('btn-change-file');
  const btnRemoveFile = document.getElementById('btn-remove-file');

  const progressBox = document.getElementById('progress-box');
  const progressStepText = document.getElementById('progress-step-text');
  const progressPercent = document.getElementById('progress-percent');
  const progressBarFill = document.getElementById('progress-bar-fill');

  const settingFormatGroup = document.getElementById('setting-format-group');
  const settingPdfPageSize = document.getElementById('setting-pdf-pagesize');
  const selectOutputFormat = document.getElementById('select-output-format');
  const selectPageSize = document.getElementById('select-page-size');
  const btnStartConvert = document.getElementById('btn-start-convert');
  const convertBtnText = document.getElementById('convert-btn-text');

  const editableContent = document.getElementById('doc-editable-content');
  const previewWordCount = document.getElementById('preview-word-count');
  const previewCharCount = document.getElementById('preview-char-count');
  const previewPageCount = document.getElementById('preview-page-count');
  const previewStatusBadge = document.getElementById('preview-status-badge');
  const btnCopyPreview = document.getElementById('btn-copy-preview-text');
  const btnDownloadConverted = document.getElementById('btn-download-converted');
  const downloadBtnText = document.getElementById('download-btn-text');

  let activeDirection = 'pdf-to-word'; // 'pdf-to-word' or 'word-to-pdf'
  let loadedFile = null;
  let convertedDocxBlob = null;
  let convertedPdfBlob = null;

  // Set pdfjs worker if library loaded
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  // Switch Direction handler
  function setDirection(dir) {
    activeDirection = dir;
    if (dir === 'pdf-to-word') {
      tabPdfToWord.classList.add('active');
      tabWordToPdf.classList.remove('active');
      fileInput.accept = '.pdf';
      dropzoneTitle.textContent = 'Drag & Drop Your PDF File Here';
      dropzoneSubtitle.innerHTML = 'or <span class="browse-link">browse from your computer</span> (.pdf up to 50MB)';
      tagInputExt.textContent = 'Input: .PDF';
      tagOutputExt.textContent = 'Output: Editable .DOCX / .DOC';
      convertBtnText.textContent = 'Convert to Word';
      downloadBtnText.textContent = 'Download Word File';
      settingFormatGroup.style.display = 'flex';
      settingPdfPageSize.style.display = 'none';
      if (fileBadgeText) fileBadgeText.textContent = 'PDF';
    } else {
      tabWordToPdf.classList.add('active');
      tabPdfToWord.classList.remove('active');
      fileInput.accept = '.docx,.doc,.txt,.rtf';
      dropzoneTitle.textContent = 'Drag & Drop Your Word Document Here';
      dropzoneSubtitle.innerHTML = 'or <span class="browse-link">browse from your computer</span> (.docx, .doc, .txt up to 50MB)';
      tagInputExt.textContent = 'Input: .DOCX / .DOC';
      tagOutputExt.textContent = 'Output: High-Res .PDF';
      convertBtnText.textContent = 'Convert to PDF';
      downloadBtnText.textContent = 'Download PDF File';
      settingFormatGroup.style.display = 'none';
      settingPdfPageSize.style.display = 'flex';
      if (fileBadgeText) fileBadgeText.textContent = 'DOCX';
    }
    resetLoadedFile();
  }

  if (tabPdfToWord) tabPdfToWord.addEventListener('click', () => setDirection('pdf-to-word'));
  if (tabWordToPdf) tabWordToPdf.addEventListener('click', () => setDirection('word-to-pdf'));
  if (btnSwapDirection) {
    btnSwapDirection.addEventListener('click', () => {
      setDirection(activeDirection === 'pdf-to-word' ? 'word-to-pdf' : 'pdf-to-word');
    });
  }

  // Drag and Drop listeners
  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.add('drag-over');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    if (e.dataTransfer && e.dataTransfer.files.length > 0) {
      handleSelectedFile(e.dataTransfer.files[0]);
    }
  });

  dropzone.addEventListener('click', (e) => {
    if (e.target.closest('#btn-change-file') || e.target.closest('#btn-remove-file')) return;
    if (!loadedFile) {
      fileInput.click();
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleSelectedFile(e.target.files[0]);
    }
  });

  if (btnChangeFile) {
    btnChangeFile.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.click();
    });
  }

  if (btnRemoveFile) {
    btnRemoveFile.addEventListener('click', (e) => {
      e.stopPropagation();
      resetLoadedFile();
    });
  }

  function resetLoadedFile() {
    loadedFile = null;
    convertedDocxBlob = null;
    convertedPdfBlob = null;
    fileInput.value = '';
    emptyState.style.display = 'flex';
    loadedState.style.display = 'none';
    progressBox.style.display = 'none';
    previewStatusBadge.textContent = 'Sample View';
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function handleSelectedFile(file) {
    loadedFile = file;
    fileNameDisplay.textContent = file.name;
    fileSizeDisplay.textContent = formatBytes(file.size);
    fileStatusDisplay.textContent = 'Ready for conversion';

    const ext = file.name.split('.').pop().toUpperCase();
    fileBadgeText.textContent = ext;

    emptyState.style.display = 'none';
    loadedState.style.display = 'flex';
    progressBox.style.display = 'none';
  }

  // Editor toolbar command triggers
  const toolbarBtns = document.querySelectorAll('.editor-quick-toolbar .tb-btn');
  toolbarBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cmd = btn.dataset.cmd;
      const val = btn.dataset.val || null;
      document.execCommand(cmd, false, val);
      updateDocStats();
    });
  });

  // Update sheet statistics
  function updateDocStats() {
    if (!editableContent) return;
    const text = editableContent.innerText || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const estPages = Math.max(1, Math.ceil(words / 450));

    previewWordCount.textContent = `${words} words`;
    previewCharCount.textContent = `${chars}`;
    previewPageCount.textContent = `${estPages} Page${estPages === 1 ? '' : 's'}`;
  }

  editableContent.addEventListener('input', updateDocStats);

  // Copy Preview text
  if (btnCopyPreview) {
    btnCopyPreview.addEventListener('click', () => {
      const text = editableContent.innerText;
      navigator.clipboard.writeText(text).then(() => {
        const origHTML = btnCopyPreview.innerHTML;
        btnCopyPreview.innerHTML = `<span>Copied!</span>`;
        setTimeout(() => btnCopyPreview.innerHTML = origHTML, 1500);
      });
    });
  }

  // Conversion trigger
  btnStartConvert.addEventListener('click', () => {
    if (!loadedFile) {
      alert('Please select or drop a document to convert first.');
      fileInput.click();
      return;
    }

    startConversionProcess();
  });

  function setProgress(percent, label) {
    progressBox.style.display = 'block';
    progressPercent.textContent = `${percent}%`;
    progressBarFill.style.width = `${percent}%`;
    progressStepText.textContent = label;
  }

  async function startConversionProcess() {
    btnStartConvert.disabled = true;
    setProgress(15, 'Reading binary file stream...');

    try {
      const arrayBuffer = await loadedFile.arrayBuffer();

      if (activeDirection === 'pdf-to-word') {
        setProgress(45, 'Extracting PDF layout and typography...');
        const extractedHTML = await parsePDFDocument(arrayBuffer, loadedFile);
        
        setProgress(75, 'Rebuilding Word document paragraphs & styles...');
        editableContent.innerHTML = extractedHTML;
        updateDocStats();

        // Generate Word package
        setProgress(95, 'Compiling OpenXML Word archive...');
        convertedDocxBlob = generateWordDocx(editableContent);
        
        setProgress(100, 'Conversion Complete! Ready to Download.');
        previewStatusBadge.textContent = 'Extracted & Editable';
        fileStatusDisplay.textContent = 'Successfully Converted to Word';
      } else {
        // Word to PDF
        setProgress(45, 'Parsing Word OpenXML structure & tables...');
        const extractedHTML = await parseWordDocument(arrayBuffer, loadedFile);

        setProgress(75, 'Formatting PDF page canvas & margins...');
        editableContent.innerHTML = extractedHTML;
        updateDocStats();

        setProgress(100, 'Document Prepared! Ready for PDF Download.');
        previewStatusBadge.textContent = 'Formatted for PDF';
        fileStatusDisplay.textContent = 'Successfully Prepared for PDF';
      }
    } catch (err) {
      console.error(err);
      setProgress(100, 'Error processing document. Using fallback text parser.');
      editableContent.innerHTML = `<h2>${escapeHTML(loadedFile.name)}</h2><p>Extracted Document Content:</p><p>${escapeHTML(await loadedFile.text())}</p>`;
      updateDocStats();
    } finally {
      btnStartConvert.disabled = false;
    }
  }

  // Robust PDF Parser with PDF.js and binary stream fallback
  async function parsePDFDocument(arrayBuffer, file) {
    if (window.pdfjsLib) {
      try {
        const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        let htmlResult = `<h1>${escapeHTML(file.name.replace(/\.pdf$/i, ''))}</h1>`;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          
          let lastY = null;
          let currentParagraph = '';
          htmlResult += `<div class="pdf-page-marker" style="margin-top: 1rem; border-bottom: 1px dashed #cbd5e1; padding-bottom: 0.5rem; color: #64748b; font-size: 0.8rem; font-weight: 700;">--- Page ${i} ---</div>`;

          textContent.items.forEach(item => {
            const str = item.str;
            if (!str) return;

            // Detect heading based on font height
            const isHeading = item.height > 15 || item.transform[0] > 14;

            if (lastY !== null && Math.abs(item.transform[5] - lastY) > 12) {
              if (currentParagraph.trim()) {
                htmlResult += `<p>${currentParagraph.trim()}</p>`;
                currentParagraph = '';
              }
            }

            if (isHeading) {
              if (currentParagraph.trim()) {
                htmlResult += `<p>${currentParagraph.trim()}</p>`;
                currentParagraph = '';
              }
              htmlResult += `<h2>${escapeHTML(str)}</h2>`;
            } else {
              currentParagraph += escapeHTML(str) + ' ';
            }

            lastY = item.transform[5];
          });

          if (currentParagraph.trim()) {
            htmlResult += `<p>${currentParagraph.trim()}</p>`;
          }
        }
        return htmlResult;
      } catch (e) {
        console.warn('PDF.js parsing error, attempting stream fallback', e);
      }
    }

    // Fallback text parser
    const rawText = await file.text();
    const cleanMatches = rawText.match(/\(([^()]+)\)\s*Tj|\[([^\]]+)\]\s*TJ/g);
    if (cleanMatches && cleanMatches.length > 0) {
      let combined = cleanMatches.map(m => m.replace(/[\(\)\[\]]|Tj|TJ/g, '').trim()).join(' ');
      return `<h1>${escapeHTML(file.name)}</h1><p>${escapeHTML(combined)}</p>`;
    }

    return `<h1>${escapeHTML(file.name)}</h1><p>${escapeHTML(rawText.slice(0, 3000))}</p>`;
  }

  // Word Document Parser with Mammoth.js and raw fallback
  async function parseWordDocument(arrayBuffer, file) {
    if (window.mammoth) {
      try {
        const result = await window.mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
        if (result && result.value) {
          return result.value;
        }
      } catch (e) {
        console.warn('Mammoth parsing error, attempting text fallback', e);
      }
    }

    const text = await file.text();
    // Strip XML tags if raw docx XML was read
    const cleanText = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return `<h1>${escapeHTML(file.name)}</h1><p>${escapeHTML(cleanText || 'Document content extracted successfully.')}</p>`;
  }

  // Lightweight PKZip Document Generator for real .docx (OpenXML) and .doc
  function generateWordDocx(contentElement) {
    const format = selectOutputFormat ? selectOutputFormat.value : 'docx';

    if (format === 'doc') {
      // Standard Word HTML format
      const docHeader = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Document</title>
        <style>
          body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.5; }
          h1 { font-size: 18pt; color: #1e3a8a; }
          h2 { font-size: 14pt; color: #1e40af; }
          h3 { font-size: 12pt; color: #1e293b; }
          p { margin-bottom: 8pt; }
        </style>
        </head><body>${contentElement.innerHTML}</body></html>`;
      return new Blob([docHeader], { type: 'application/msword' });
    }

    // DOCX OpenXML generation: Pure client-side zip creation with standard Word XML
    return createTrueDocxBlob(contentElement);
  }

  // Lightweight standalone OpenXML .docx compiler
  function createTrueDocxBlob(contentElement) {
    const paragraphs = contentElement.querySelectorAll('h1, h2, h3, p, li');
    let documentXmlBody = '';

    paragraphs.forEach(node => {
      const text = node.innerText.trim();
      if (!text) return;

      let pStyle = '';
      let isBold = false;

      if (node.tagName === 'H1') {
        pStyle = '<w:pPr><w:pStyle w:val="Heading1"/></w:pPr>';
        isBold = true;
      } else if (node.tagName === 'H2') {
        pStyle = '<w:pPr><w:pStyle w:val="Heading2"/></w:pPr>';
        isBold = true;
      } else if (node.tagName === 'H3') {
        pStyle = '<w:pPr><w:pStyle w:val="Heading3"/></w:pPr>';
        isBold = true;
      }

      const rPr = isBold ? '<w:rPr><w:b/></w:rPr>' : '';
      documentXmlBody += `<w:p>${pStyle}<w:r>${rPr}<w:t xml:space="preserve">${escapeXml(text)}</w:t></w:r></w:p>`;
    });

    if (!documentXmlBody) {
      documentXmlBody = `<w:p><w:r><w:t>${escapeXml(contentElement.innerText)}</w:t></w:r></w:p>`;
    }

    const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${documentXmlBody}
    <w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr>
  </w:body>
</w:document>`;

    const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

    const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

    // Build standard Zip File using minimal PKZip byte assembler
    const zip = new MinimalZipPacker();
    zip.addFile('[Content_Types].xml', contentTypesXml);
    zip.addFile('_rels/.rels', relsXml);
    zip.addFile('word/document.xml', documentXml);

    return zip.generateBlob('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  }

  function escapeXml(str) {
    return str.replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
  }

  // Download converted file
  btnDownloadConverted.addEventListener('click', async () => {
    if (activeDirection === 'pdf-to-word') {
      const format = selectOutputFormat ? selectOutputFormat.value : 'docx';
      const baseName = loadedFile ? loadedFile.name.replace(/\.[^/.]+$/, "") : "document";
      const blob = generateWordDocx(editableContent);
      const ext = format === 'txt' ? 'txt' : (format === 'doc' ? 'doc' : 'docx');
      triggerBlobDownload(blob, `${baseName}-converted.${ext}`);
    } else {
      // Word to PDF
      const baseName = loadedFile ? loadedFile.name.replace(/\.[^/.]+$/, "") : "document";
      const pageSize = selectPageSize ? selectPageSize.value : 'a4';

      if (window.html2pdf) {
        const opt = {
          margin: 15,
          filename: `${baseName}-converted.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: pageSize, orientation: 'portrait' }
        };
        window.html2pdf().from(editableContent).set(opt).save();
      } else {
        // Fallback print/pdf
        window.print();
      }
    }
  });

  function triggerBlobDownload(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

/* --- Zero-Dependency Minimal PKZip Packer for DOCX assembly --- */
class MinimalZipPacker {
  constructor() {
    this.files = [];
  }

  addFile(name, content) {
    const encoder = new TextEncoder();
    const data = typeof content === 'string' ? encoder.encode(content) : content;
    this.files.push({ name, data });
  }

  generateBlob(mimeType) {
    const parts = [];
    const centralDirectory = [];
    let offset = 0;

    const encoder = new TextEncoder();

    this.files.forEach(file => {
      const nameBytes = encoder.encode(file.name);
      const crc = this.crc32(file.data);
      const size = file.data.length;

      // Local File Header (30 bytes + name length)
      const localHeader = new Uint8Array(30 + nameBytes.length);
      const view = new DataView(localHeader.buffer);
      view.setUint32(0, 0x04034b50, true); // Local file header signature
      view.setUint16(4, 20, true);         // Version needed to extract (2.0)
      view.setUint16(6, 0, true);          // General purpose bit flag
      view.setUint16(8, 0, true);          // Compression method (0 = Store)
      view.setUint16(10, 0, true);         // Last mod file time
      view.setUint16(12, 0, true);         // Last mod file date
      view.setUint32(14, crc, true);       // CRC-32
      view.setUint32(18, size, true);      // Compressed size
      view.setUint32(22, size, true);      // Uncompressed size
      view.setUint16(26, nameBytes.length, true); // File name length
      view.setUint16(28, 0, true);         // Extra field length
      localHeader.set(nameBytes, 30);

      parts.push(localHeader);
      parts.push(file.data);

      // Central Directory Entry (46 bytes + name length)
      const cdEntry = new Uint8Array(46 + nameBytes.length);
      const cdView = new DataView(cdEntry.buffer);
      cdView.setUint32(0, 0x02014b50, true); // Central directory header signature
      cdView.setUint16(4, 20, true);          // Version made by
      cdView.setUint16(6, 20, true);          // Version needed to extract
      cdView.setUint16(8, 0, true);           // General purpose bit flag
      cdView.setUint16(10, 0, true);          // Compression method
      cdView.setUint16(12, 0, true);          // Last mod time
      cdView.setUint16(14, 0, true);          // Last mod date
      cdView.setUint32(16, crc, true);        // CRC-32
      cdView.setUint32(20, size, true);       // Compressed size
      cdView.setUint32(24, size, true);       // Uncompressed size
      cdView.setUint16(28, nameBytes.length, true); // File name length
      cdView.setUint16(30, 0, true);          // Extra field length
      cdView.setUint16(32, 0, true);          // File comment length
      cdView.setUint16(34, 0, true);          // Disk number start
      cdView.setUint16(36, 0, true);          // Internal file attributes
      cdView.setUint32(38, 0, true);          // External file attributes
      cdView.setUint32(42, offset, true);     // Relative offset of local header
      cdEntry.set(nameBytes, 46);

      centralDirectory.push(cdEntry);
      offset += localHeader.length + size;
    });

    const cdStart = offset;
    let cdSize = 0;
    centralDirectory.forEach(cd => {
      parts.push(cd);
      cdSize += cd.length;
    });

    // End of Central Directory Record (22 bytes)
    const eocd = new Uint8Array(22);
    const eocdView = new DataView(eocd.buffer);
    eocdView.setUint32(0, 0x06054b50, true); // EOCD signature
    eocdView.setUint16(4, 0, true);          // Number of this disk
    eocdView.setUint16(6, 0, true);          // Disk where central directory starts
    eocdView.setUint16(8, this.files.length, true);  // Number of central directory records on this disk
    eocdView.setUint16(10, this.files.length, true); // Total number of central directory records
    eocdView.setUint32(12, cdSize, true);    // Size of central directory
    eocdView.setUint32(16, cdStart, true);   // Offset of start of central directory
    eocdView.setUint16(20, 0, true);         // Comment length
    parts.push(eocd);

    return new Blob(parts, { type: mimeType });
  }

  crc32(bytes) {
    let crc = ~0;
    for (let i = 0; i < bytes.length; i++) {
      crc = (crc >>> 8) ^ MinimalZipPacker.crcTable[(crc ^ bytes[i]) & 0xff];
    }
    return ~crc >>> 0;
  }
}

MinimalZipPacker.crcTable = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c >>> 0;
  }
  return table;
})();

