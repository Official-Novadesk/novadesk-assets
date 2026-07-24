import { widgetWindow } from "novadesk";
import * as system from "system";

// ─────────────────────────────────────────────────────────────
// AreaGraph Examples — Main Process
//
// This file creates the widget window and drives all the live
// data that the UI script displays.
//
// One timer tick fires every second and sends fresh CPU and
// memory readings to the UI via IPC messages.
// ─────────────────────────────────────────────────────────────

const myWindow = new widgetWindow({
    id:              "areaGraphExamples",
    width:           1020,
    height:          1020,
    script:          "ui/script.ui.js",
    backgroundColor: "rgba(18, 18, 24, 0.97)",
});

// ── Live data history arrays ──────────────────────────────────
const cpuHistory  = [];
const memHistory  = [];
const waveHistory = [];

let tick = 0;

// ── Periodic data tick (every 1 second) ───────────────────────
setInterval(function () {
    tick++;

    // Real system metrics
    const cpu = system.cpu.usage();                 // 0 – 100
    const mem = system.memory.usagePercent();       // 0 – 100

    // Synthetic animated wave for the wave demo graph
    const wave = 50 + 45 * Math.sin(tick * 0.25);  // 5 – 95

    cpuHistory.push(cpu);
    memHistory.push(mem);
    waveHistory.push(wave);

    // Send all data to the UI in one message
    ipcMain.send("data:tick", JSON.stringify({
        cpu:         cpu,
        mem:         mem,
        wave:        wave,
        cpuHistory:  cpuHistory,
        memHistory:  memHistory,
        waveHistory: waveHistory,
    }));
}, 1000);
