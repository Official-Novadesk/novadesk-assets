import { widgetWindow } from "novadesk";
import * as system from "system";

// ─────────────────────────────────────────────────────────────
// Bar Examples — Main Process
//
// Sends live system metrics to the UI every second so the
// live demo bars update in real time.
// ─────────────────────────────────────────────────────────────

const myWindow = new widgetWindow({
    id:              "barExamples",
    width:           1020,
    height:          2400,
    script:          "ui/script.ui.js",
    backgroundColor: "rgba(18, 18, 24, 0.97)",
});

setInterval(function () {
    const cpu = system.cpu.usage();            // 0 – 100
    const mem = system.memory.usagePercent();  // 0 – 100

    ipcMain.send("data:tick", JSON.stringify({
        cpu: cpu,
        mem: mem,
    }));
}, 1000);
