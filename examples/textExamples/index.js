import { widgetWindow } from "novadesk";
import * as system from "system";

// ─────────────────────────────────────────────────────────────
// Text Examples — Main Process
//
// Sends a slow tick stream and pulsing angle values every 100ms
// so that the UI can animate font gradients, glowing shadows,
// and live dynamic text properties in real time.
// ─────────────────────────────────────────────────────────────

const myWindow = new widgetWindow({
    id:              "textExamples",
    width:           1150,
    height:          1800,
    script:          "ui/script.ui.js",
    backgroundColor: "rgba(12, 14, 22, 0.98)",
});

let tick = 0;

setInterval(function () {
    tick++;

    const angle = (tick * 2) % 360;
    const pulse = Math.round(127 + 127 * Math.sin(tick * 0.08));

    ipcMain.send("data:tick", JSON.stringify({
        tick:  tick,
        angle: angle,
        pulse: pulse,
    }));
}, 100);
