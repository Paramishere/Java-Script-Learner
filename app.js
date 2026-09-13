class JSApp {
  constructor() {
    this.currentModuleIndex = 0;
    this.currentLessonIndex = 0;
    this.userProgress = this.loadProgress();
    this.logs = [];

    this.initElements();
    this.initEventListeners();
    this.renderCurriculumSidebar();
    this.loadLesson(0, 0);
    this.updateUserStats();
    this.renderCheatsheet();
  }

  loadProgress() {
    const saved = localStorage.getItem("js_mastery_progress");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
    return {
      completedLessons: {},
      xp: 0,
      streak: 1,
      lastLogin: new Date().toDateString()
    };
  }

  saveProgress() {
    localStorage.setItem("js_mastery_progress", JSON.stringify(this.userProgress));
    this.updateUserStats();
  }

  updateUserStats() {
    const totalLessons = CURRICULUM.reduce((sum, m) => sum + m.lessons.length, 0);
    const completedCount = Object.keys(this.userProgress.completedLessons).length;
    const percent = Math.round((completedCount / totalLessons) * 100);

    const xpEl = document.getElementById("user-xp");
    const streakEl = document.getElementById("user-streak");
    const progressText = document.getElementById("progress-percent");
    const progressBar = document.getElementById("progress-bar-fill");

    if (xpEl) xpEl.textContent = `${this.userProgress.xp} XP`;
    if (streakEl) streakEl.textContent = `${this.userProgress.streak} Day Streak`;
    if (progressText) progressText.textContent = `${percent}% Completed`;
    if (progressBar) progressBar.style.width = `${percent}%`;
  }

  initElements() {
    this.sidebar = document.getElementById("curriculum-sidebar");
    this.lessonTitle = document.getElementById("lesson-title");
    this.lessonModule = document.getElementById("lesson-module-tag");
    this.lessonContent = document.getElementById("lesson-content");
    this.codeEditor = document.getElementById("code-editor");
    this.consoleOutput = document.getElementById("console-output");
    this.challengeBox = document.getElementById("challenge-instructions");
    this.challengeStatus = document.getElementById("challenge-status");
    this.quizContainer = document.getElementById("quiz-container");
  }

  initEventListeners() {
    // Run Code Button
    document.getElementById("run-code-btn")?.addEventListener("click", () => this.runCode());

    // Reset Code Button
    document.getElementById("reset-code-btn")?.addEventListener("click", () => this.resetCode());

    // Submit Challenge Button
    document.getElementById("submit-challenge-btn")?.addEventListener("click", () => this.verifyChallenge());

    // Show Solution Button
    document.getElementById("show-solution-btn")?.addEventListener("click", () => this.toggleSolution());

    // Navigation Buttons
    document.getElementById("prev-lesson-btn")?.addEventListener("click", () => this.navigateLesson(-1));
    document.getElementById("next-lesson-btn")?.addEventListener("click", () => this.navigateLesson(1));

    // Tab Switching
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const tab = e.currentTarget.dataset.tab;
        this.switchTab(tab);
      });
    });

    // Cheatsheet Search
    document.getElementById("cheatsheet-search")?.addEventListener("input", (e) => {
      this.filterCheatsheet(e.target.value.toLowerCase());
    });

    // Modal Controls
    document.getElementById("open-cheatsheet-btn")?.addEventListener("click", () => {
      document.getElementById("cheatsheet-modal")?.classList.add("active");
    });
    document.getElementById("close-cheatsheet-btn")?.addEventListener("click", () => {
      document.getElementById("cheatsheet-modal")?.classList.remove("active");
    });

    // Mobile Sidebar Toggle
    document.getElementById("toggle-sidebar-btn")?.addEventListener("click", () => {
      this.sidebar?.classList.toggle("open");
    });

    // Event Loop Visualizer Controls
    document.getElementById("el-next-btn")?.addEventListener("click", () => visEngine.stepNextEventLoop());
    document.getElementById("el-reset-btn")?.addEventListener("click", () => visEngine.stepResetEventLoop());
    document.getElementById("el-play-btn")?.addEventListener("click", () => visEngine.toggleEventLoopAutoPlay());
  }

  renderCurriculumSidebar() {
    if (!this.sidebar) return;
    this.sidebar.innerHTML = "";

    CURRICULUM.forEach((mod, modIdx) => {
      const group = document.createElement("div");
      group.className = "sidebar-module-group";

      const header = document.createElement("div");
      header.className = "module-header";
      header.innerHTML = `
        <span><i class="${mod.icon}"></i> ${mod.title}</span>
        <i class="fa-solid fa-chevron-down toggle-icon"></i>
      `;

      const list = document.createElement("div");
      list.className = "module-lesson-list";

      mod.lessons.forEach((les, lesIdx) => {
        const item = document.createElement("div");
        const isDone = this.userProgress.completedLessons[les.id];
        const isActive = modIdx === this.currentModuleIndex && lesIdx === this.currentLessonIndex;

        item.className = `lesson-item ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`;
        item.innerHTML = `
          <i class="${isDone ? 'fa-solid fa-circle-check text-success' : 'fa-regular fa-circle'}"></i>
          <span>${les.title}</span>
        `;

        item.addEventListener("click", () => {
          this.loadLesson(modIdx, lesIdx);
          if (window.innerWidth < 768) {
            this.sidebar.classList.remove("open");
          }
        });

        list.appendChild(item);
      });

      header.addEventListener("click", () => {
        list.classList.toggle("collapsed");
        header.querySelector(".toggle-icon").classList.toggle("rotated");
      });

      group.appendChild(header);
      group.appendChild(list);
      this.sidebar.appendChild(group);
    });
  }

  loadLesson(modIdx, lesIdx) {
    this.currentModuleIndex = modIdx;
    this.currentLessonIndex = lesIdx;

    const mod = CURRICULUM[modIdx];
    const lesson = mod.lessons[lesIdx];

    if (this.lessonModule) this.lessonModule.textContent = mod.title;
    if (this.lessonTitle) this.lessonTitle.textContent = lesson.title;

    if (this.lessonContent) {
      this.lessonContent.innerHTML = this.parseMarkdown(lesson.content);
    }

    if (this.codeEditor) {
      this.codeEditor.value = lesson.starterCode;
    }

    if (this.challengeBox) {
      this.challengeBox.innerHTML = `
        <div class="challenge-title"><i class="fa-solid fa-trophy"></i> Challenge:</div>
        <p>${lesson.challenge.instructions}</p>
        <div id="solution-box" class="solution-box hidden">
          <strong>Reference Solution:</strong>
          <pre><code>${this.escapeHtml(lesson.challenge.solution)}</code></pre>
        </div>
      `;
    }

    if (this.challengeStatus) {
      this.challengeStatus.className = "challenge-status";
      this.challengeStatus.innerHTML = `<i class="fa-solid fa-info-circle"></i> Complete the code in the editor and click <strong>Verify Challenge</strong>.`;
    }

    this.clearConsole();
    this.renderQuiz(lesson.quiz);
    this.renderCurriculumSidebar();

    // Reset visualizer if on visualizer tab
    visEngine.stepResetEventLoop();
  }

  parseMarkdown(text) {
    let html = text;
    // Code blocks
    html = html.replace(/```javascript([\s\S]*?)```/g, (match, code) => {
      return `<pre class="code-block"><code>${this.escapeHtml(code.trim())}</code></pre>`;
    });
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    // Bold & Italics
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    return html;
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  clearConsole() {
    this.logs = [];
    if (this.consoleOutput) {
      this.consoleOutput.innerHTML = `<div class="console-welcome">> Ready to execute JavaScript...</div>`;
    }
  }

  runCode() {
    this.clearConsole();
    const code = this.codeEditor.value;
    const capturedLogs = [];

    // Safe Console Interceptor
    const customConsole = {
      log: (...args) => {
        const text = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
        capturedLogs.push(text);
        this.appendConsoleOutput(text, 'log');
      },
      warn: (...args) => {
        const text = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
        capturedLogs.push(text);
        this.appendConsoleOutput(text, 'warn');
      },
      error: (...args) => {
        const text = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
        capturedLogs.push(text);
        this.appendConsoleOutput(text, 'error');
      },
      table: (data) => {
        const text = JSON.stringify(data, null, 2);
        capturedLogs.push(text);
        this.appendConsoleOutput(text, 'log');
      }
    };

    try {
      // Execute in isolated function context with custom console
      const runFn = new Function('console', 'localStorage', code);
      runFn(customConsole, window.localStorage);
    } catch (err) {
      this.appendConsoleOutput(`Runtime Error: ${err.message}`, 'error');
    }

    this.logs = capturedLogs;
    return capturedLogs;
  }

  appendConsoleOutput(text, type = 'log') {
    if (!this.consoleOutput) return;
    const welcome = this.consoleOutput.querySelector(".console-welcome");
    if (welcome) welcome.remove();

    const line = document.createElement("div");
    line.className = `console-line console-${type}`;
    line.innerHTML = `<span class="console-prefix">></span> <pre>${this.escapeHtml(text)}</pre>`;
    this.consoleOutput.appendChild(line);
    this.consoleOutput.scrollTop = this.consoleOutput.scrollHeight;
  }

  resetCode() {
    const lesson = CURRICULUM[this.currentModuleIndex].lessons[this.currentLessonIndex];
    this.codeEditor.value = lesson.starterCode;
    this.clearConsole();
  }

  verifyChallenge() {
    const lesson = CURRICULUM[this.currentModuleIndex].lessons[this.currentLessonIndex];
    const logs = this.runCode();
    let userScope = {};

    try {
      const code = this.codeEditor.value;
      const fn = new Function('console', `${code}; return { ${this.extractDeclaredVars(code)} };`);
      userScope = fn({ log: () => {}, warn: () => {}, error: () => {} }) || {};
    } catch (e) {
      // scope extraction fallback
    }

    const passed = lesson.challenge.test(logs, this.codeEditor.value, userScope);

    if (passed) {
      this.challengeStatus.className = "challenge-status status-success";
      this.challengeStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> <strong>Awesome!</strong> Challenge passed successfully (+50 XP).`;

      if (!this.userProgress.completedLessons[lesson.id]) {
        this.userProgress.completedLessons[lesson.id] = true;
        this.userProgress.xp += 50;
        this.saveProgress();
        this.renderCurriculumSidebar();
      }
    } else {
      this.challengeStatus.className = "challenge-status status-error";
      this.challengeStatus.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <strong>Not quite there yet!</strong> Check your code logic or click "Show Solution" for guidance.`;
    }
  }

  extractDeclaredVars(code) {
    const matches = code.match(/(?:const|let|var)\s+([a-zA-Z0-9_$]+)/g) || [];
    return matches.map(m => m.split(/\s+/)[1]).filter(Boolean).join(', ');
  }

  toggleSolution() {
    const solBox = document.getElementById("solution-box");
    if (solBox) solBox.classList.toggle("hidden");
  }

  renderQuiz(quizItems) {
    if (!this.quizContainer) return;
    if (!quizItems || quizItems.length === 0) {
      this.quizContainer.innerHTML = `<div class="quiz-empty">No quiz for this lesson.</div>`;
      return;
    }

    this.quizContainer.innerHTML = quizItems.map((q, qIdx) => `
      <div class="quiz-card" data-quiz-idx="${qIdx}">
        <div class="quiz-question"><strong>Q${qIdx + 1}:</strong> ${q.question}</div>
        <div class="quiz-options">
          ${q.options.map((opt, oIdx) => `
            <button class="quiz-option-btn" data-q="${qIdx}" data-o="${oIdx}">
              ${opt}
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback hidden" id="quiz-fb-${qIdx}"></div>
      </div>
    `).join('');

    this.quizContainer.querySelectorAll(".quiz-option-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const qIdx = parseInt(e.currentTarget.dataset.q);
        const oIdx = parseInt(e.currentTarget.dataset.o);
        this.checkQuizAnswer(qIdx, oIdx, quizItems[qIdx]);
      });
    });
  }

  checkQuizAnswer(qIdx, selectedIdx, questionObj) {
    const card = this.quizContainer.querySelector(`[data-quiz-idx="${qIdx}"]`);
    const fb = card.querySelector(`#quiz-fb-${qIdx}`);
    const btns = card.querySelectorAll(".quiz-option-btn");

    btns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === questionObj.answer) {
        btn.classList.add("correct");
      } else if (idx === selectedIdx) {
        btn.classList.add("incorrect");
      }
    });

    fb.classList.remove("hidden");
    if (selectedIdx === questionObj.answer) {
      fb.className = "quiz-feedback fb-correct";
      fb.innerHTML = `<i class="fa-solid fa-check"></i> Correct! ${questionObj.explanation}`;
      this.userProgress.xp += 10;
      this.saveProgress();
    } else {
      fb.className = "quiz-feedback fb-incorrect";
      fb.innerHTML = `<i class="fa-solid fa-xmark"></i> Incorrect. ${questionObj.explanation}`;
    }
  }

  switchTab(tabId) {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));

    const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const targetPane = document.getElementById(`tab-${tabId}`);

    if (targetBtn) targetBtn.classList.add("active");
    if (targetPane) targetPane.classList.add("active");

    if (tabId === 'visualizer') {
      visEngine.renderEventLoop(0);
    }
  }

  navigateLesson(direction) {
    let modIdx = this.currentModuleIndex;
    let lesIdx = this.currentLessonIndex + direction;

    if (lesIdx < 0) {
      if (modIdx > 0) {
        modIdx--;
        lesIdx = CURRICULUM[modIdx].lessons.length - 1;
      } else return;
    } else if (lesIdx >= CURRICULUM[modIdx].lessons.length) {
      if (modIdx < CURRICULUM.length - 1) {
        modIdx++;
        lesIdx = 0;
      } else return;
    }

    this.loadLesson(modIdx, lesIdx);
  }

  renderCheatsheet() {
    const listEl = document.getElementById("cheatsheet-list");
    if (!listEl) return;

    listEl.innerHTML = CHEATSHEET_DATA.map(cat => `
      <div class="cs-category">
        <h3 class="cs-cat-title"><i class="fa-solid fa-bookmark"></i> ${cat.category}</h3>
        <div class="cs-grid">
          ${cat.items.map(item => `
            <div class="cs-card">
              <h4>${item.title}</h4>
              <pre><code>${this.escapeHtml(item.code)}</code></pre>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  filterCheatsheet(query) {
    const cards = document.querySelectorAll(".cs-card");
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
}

// Global initialization
window.addEventListener("DOMContentLoaded", () => {
  window.app = new JSApp();
});
