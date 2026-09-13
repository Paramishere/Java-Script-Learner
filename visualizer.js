class VisualizerEngine {
  constructor() {
    this.eventLoopStep = 0;
    this.eventLoopTimer = null;
    this.eventLoopSteps = [
      {
        description: "1. Synchronous code: `console.log('Start')` enters Call Stack.",
        stack: ["console.log('Start')"],
        webApi: [],
        microtasks: [],
        macrotasks: [],
        output: "Start"
      },
      {
        description: "2. `setTimeout(..., 0)` is called. Timer offloaded to Web APIs!",
        stack: ["setTimeout(fn, 0)"],
        webApi: ["Timer (0ms)"],
        microtasks: [],
        macrotasks: [],
        output: ""
      },
      {
        description: "3. `Promise.resolve().then(...)` is called. Microtask pushed to Microtask Queue!",
        stack: ["Promise.then(...)"],
        webApi: [],
        microtasks: ["Promise Callback"],
        macrotasks: ["setTimeout Callback"],
        output: ""
      },
      {
        description: "4. Synchronous code: `console.log('End')` executes on Call Stack.",
        stack: ["console.log('End')"],
        webApi: [],
        microtasks: ["Promise Callback"],
        macrotasks: ["setTimeout Callback"],
        output: "End"
      },
      {
        description: "5. Call Stack is EMPTY! Event Loop checks queues. Microtask Queue has higher priority!",
        stack: [],
        webApi: [],
        microtasks: ["Promise Callback"],
        macrotasks: ["setTimeout Callback"],
        output: ""
      },
      {
        description: "6. Event Loop moves Promise callback to Call Stack: `console.log('Promise Microtask')`.",
        stack: ["Promise Callback"],
        webApi: [],
        microtasks: [],
        macrotasks: ["setTimeout Callback"],
        output: "Promise Microtask"
      },
      {
        description: "7. Microtask Queue is empty! Event Loop moves setTimeout callback to Call Stack.",
        stack: ["setTimeout Callback"],
        webApi: [],
        microtasks: [],
        macrotasks: [],
        output: "Timeout Task"
      },
      {
        description: "8. Call Stack & Queues are empty! Event loop returns to idle state.",
        stack: [],
        webApi: [],
        microtasks: [],
        macrotasks: [],
        output: "Finished execution cycle!"
      }
    ];
  }

  renderEventLoop(stepIndex) {
    const step = this.eventLoopSteps[stepIndex];
    if (!step) return;

    const descEl = document.getElementById("el-description");
    const stackEl = document.getElementById("el-callstack");
    const webApiEl = document.getElementById("el-webapi");
    const microEl = document.getElementById("el-microtask");
    const macroEl = document.getElementById("el-macrotask");
    const logsEl = document.getElementById("el-logs");

    if (descEl) descEl.textContent = step.description;

    if (stackEl) {
      stackEl.innerHTML = step.stack.length
        ? step.stack.map(s => `<div class="vis-item stack-item">${s}</div>`).join('')
        : `<div class="vis-empty">Stack Empty</div>`;
    }

    if (webApiEl) {
      webApiEl.innerHTML = step.webApi.length
        ? step.webApi.map(w => `<div class="vis-item webapi-item">${w}</div>`).join('')
        : `<div class="vis-empty">No Web APIs Active</div>`;
    }

    if (microEl) {
      microEl.innerHTML = step.microtasks.length
        ? step.microtasks.map(m => `<div class="vis-item micro-item">${m}</div>`).join('')
        : `<div class="vis-empty">Microtask Queue Empty</div>`;
    }

    if (macroEl) {
      macroEl.innerHTML = step.macrotasks.length
        ? step.macrotasks.map(m => `<div class="vis-item macro-item">${m}</div>`).join('')
        : `<div class="vis-empty">Task Queue Empty</div>`;
    }

    if (logsEl && step.output) {
      const line = document.createElement("div");
      line.className = "vis-log-line";
      line.textContent = `> ${step.output}`;
      logsEl.appendChild(line);
      logsEl.scrollTop = logsEl.scrollHeight;
    }
  }

  stepNextEventLoop() {
    if (this.eventLoopStep < this.eventLoopSteps.length - 1) {
      this.eventLoopStep++;
      this.renderEventLoop(this.eventLoopStep);
    } else {
      this.stopEventLoopAutoPlay();
    }
  }

  stepResetEventLoop() {
    this.stopEventLoopAutoPlay();
    this.eventLoopStep = 0;
    const logsEl = document.getElementById("el-logs");
    if (logsEl) logsEl.innerHTML = '';
    this.renderEventLoop(0);
  }

  toggleEventLoopAutoPlay() {
    const playBtn = document.getElementById("el-play-btn");
    if (this.eventLoopTimer) {
      this.stopEventLoopAutoPlay();
    } else {
      if (this.eventLoopStep >= this.eventLoopSteps.length - 1) {
        this.stepResetEventLoop();
      }
      if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
      this.eventLoopTimer = setInterval(() => {
        if (this.eventLoopStep < this.eventLoopSteps.length - 1) {
          this.stepNextEventLoop();
        } else {
          this.stopEventLoopAutoPlay();
        }
      }, 1600);
    }
  }

  stopEventLoopAutoPlay() {
    if (this.eventLoopTimer) {
      clearInterval(this.eventLoopTimer);
      this.eventLoopTimer = null;
    }
    const playBtn = document.getElementById("el-play-btn");
    if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-play"></i> Auto Play';
  }
}

const visEngine = new VisualizerEngine();
