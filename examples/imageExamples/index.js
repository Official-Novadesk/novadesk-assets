import { widgetWindow } from "novadesk";
import * as system from "system";

// ─────────────────────────────────────────────────────────────
// Image Examples — Main Process
//
// Sends a slow pulsing wave (0–255) and a tick counter so that
// the UI can animate imageAlpha, imageTint, colorMatrix, and
// other dynamic image properties in real time.
// ─────────────────────────────────────────────────────────────

const myWindow = new widgetWindow({
    id:              "imageExamples",
    width:           1150,
    height:          2100,
    script:          "ui/script.ui.js",
    backgroundColor: "rgba(10, 12, 18, 0.98)",
});

let tick = 0;

setInterval(function () {
    tick++;

    // Slow pulse 0–255 over ~6 seconds
    const pulse = Math.round(127 + 127 * Math.sin(tick * 0.06));

    // Slow hue-shift wave (0–360 degrees)
    const hue = (tick * 1.5) % 360;

    ipcMain.send("data:tick", JSON.stringify({
        tick:  tick,
        pulse: pulse,
        hue:   hue,
    }));
}, 100);
