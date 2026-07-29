import { widgetWindow } from "novadesk";
import * as system from "system";

// ─────────────────────────────────────────────────────────────
// Histogram Examples — Main Process
//
// Sends live CPU and memory data every second.
// Also produces a synthetic sine wave for wave demos.
// ─────────────────────────────────────────────────────────────

const myWindow = new widgetWindow({
    id:              "histogramExamples",
    width:           1020,
    height:          2800,
    script:          "ui/script.ui.js",
    backgroundColor: "rgba(18, 18, 24, 0.97)",
});

const cpuHistory  = [];
const memHistory  = [];
const waveHistory = [];
let tick = 0;

setInterval(function () {
    tick++;
    const cpu  = system.cpu.usage();
    const mem  = system.memory.usagePercent();
    const wave = 50 + 45 * Math.sin(tick * 0.3);

    cpuHistory.push(cpu);
    memHistory.push(mem);
    waveHistory.push(wave);

    ipcMain.send("data:tick", JSON.stringify({
        cpu:         cpu,
        mem:         mem,
        cpuHistory:  cpuHistory,
        memHistory:  memHistory,
        waveHistory: waveHistory,
    }));
}, 1000);
