import { widgetWindow } from "novadesk";
import * as system from "system";

// ─────────────────────────────────────────────────────────────
// Bitmap Examples — Main Process
//
// Sends live system metrics (CPU, Memory, Battery) and ticking
// counter feeds every 100ms so that the UI can update multi-digit
// bitmap counters and sprite sheet frame meters in real time.
// ─────────────────────────────────────────────────────────────

const myWindow = new widgetWindow({
    id:              "bitmapExamples",
    width:           1150,
    height:          1500,
    script:          "ui/script.ui.js",
    backgroundColor: "rgba(12, 14, 22, 0.98)",
});

let tick = 0;

setInterval(function () {
    tick++;

    const cpu  = system.cpu.usage();            // 0–100
    const mem  = system.memory.usagePercent();  // 0–100
    const now  = new Date();
    const secs = now.getSeconds();
    const count = tick % 1000;

    ipcMain.send("data:tick", JSON.stringify({
        tick:  tick,
        cpu:   cpu,
        mem:   mem,
        secs:  secs,
        count: count,
    }));
}, 1000);
