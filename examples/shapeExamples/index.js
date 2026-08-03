import { widgetWindow } from "novadesk";
import * as system from "system";

// ─────────────────────────────────────────────────────────────
// Shape Examples — Main Process
//
// Sends live CPU/memory metrics and a ticking wave every 100ms
// to allow smooth rendering of dynamic shapes (e.g. morphing
// curves, sweeping arcs, and rotating dash-patterns).
// ─────────────────────────────────────────────────────────────

const myWindow = new widgetWindow({
    id:              "shapeExamples",
    width:           1150,
    height:          1850,
    script:          "ui/script.ui.js",
    backgroundColor: "rgba(12, 12, 16, 0.98)", // Dark premium cosmic background
});

let tick = 0;

setInterval(function () {
    tick++;

    const cpu  = system.cpu.usage();          // 0–100
    const mem  = system.memory.usagePercent(); // 0–100
    const wave = Math.sin(tick * 0.05);        // smooth wave -1 to 1

    ipcMain.send("data:tick", JSON.stringify({
        cpu:  cpu,
        mem:  mem,
        wave: wave,
        tick: tick,
    }));
}, 1000);
