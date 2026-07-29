import { widgetWindow } from "novadesk";
import * as system from "system";

// ─────────────────────────────────────────────────────────────
// Rotator Examples — Main Process
//
// Sends live CPU and memory every 500ms.
// Also sends a seconds counter for the clock demo
// and a slow wave for the animated sweep demos.
// ─────────────────────────────────────────────────────────────

const myWindow = new widgetWindow({
    id:              "rotatorExamples",
    width:           1200,
    height:          2900,
    script:          "ui/script.ui.js",
    backgroundColor: "rgba(18, 18, 24, 0.97)",
});

let tick = 0;

setInterval(function () {
    tick++;

    const cpu  = system.cpu.usage();          // 0–100
    const mem  = system.memory.usagePercent(); // 0–100
    const now  = new Date();
    const secs = now.getSeconds() +
                 now.getMilliseconds() / 1000; // smooth seconds 0–60
    const wave = 50 + 49 * Math.sin(tick * 0.15); // 1–99, slow wave

    ipcMain.send("data:tick", JSON.stringify({
        cpu:  cpu,
        mem:  mem,
        secs: secs,
        wave: wave,
    }));
}, 1000);
