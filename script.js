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
