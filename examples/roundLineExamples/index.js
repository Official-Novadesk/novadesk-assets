import { widgetWindow } from "novadesk";
import * as system from "system";

// ─────────────────────────────────────────────────────────────
// RoundLine Examples — Main Process
//
// Sends live system metrics (CPU, Memory) and oscillating wave
// values every 100ms so that the UI can animate circular gauges,
// progress rings, and tapered arcs in real time.
// ─────────────────────────────────────────────────────────────

const myWindow = new widgetWindow({
    id:              "roundLineExamples",
    width:           1150,
    height:          1200,
    script:          "ui/script.ui.js",
    backgroundColor: "rgba(12, 14, 22, 0.98)",
});

let tick = 0;

setInterval(function () {
    tick++;

    const cpu   = system.cpu.usage();            // 0–100
    const mem   = system.memory.usagePercent();  // 0–100
    const wave  = (1 + Math.sin(tick * 0.05)) / 2; // smooth 0.0–1.0 wave
    const wave2 = (1 + Math.cos(tick * 0.08)) / 2; // secondary 0.0–1.0 wave

    ipcMain.send("data:tick", JSON.stringify({
        tick:  tick,
        cpu:   cpu,
        mem:   mem,
        wave:  wave,
        wave2: wave2,
    }));
}, 100);
