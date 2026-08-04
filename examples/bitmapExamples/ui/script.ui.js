// ─────────────────────────────────────────────────────────────
// Bitmap Examples — UI Script
//
// Demonstrates all Novadesk Bitmap Element features:
//   1. Multi-Digit Numbers (bitmapDigits, bitmapExtend, bitmapAlign, bitmapSeparation)
//   2. Sprite Sheet Frame Meters (bitmapFrames, bitmapZeroFrame, single-frame gauges)
//   3. Color Filters & Effects (imageTint, imageAlpha, grayscale, colorMatrix)
//   4. Real-Time Hardware Readouts (CPU, RAM, Live Clock Seconds)
//   5. Interactive Playground (scroll value, change digits/separation live)
// ─────────────────────────────────────────────────────────────

const PAD      = 28;
const W        = 1150;
const CARD_W   = 530;
const CARD_GAP = 30;

// Color Palette
const C_HEAD    = "#ffffff";
const C_SUB     = "#7a8ba0";
const C_BODY    = "#a0aec0";
const C_CYAN    = "#00ffff";
const C_PINK    = "#ff0055";
const C_GREEN   = "#00ff88";
const C_GOLD    = "#ffaa00";

const IMG_DIGITS  = "./assets/digits.png";
const IMG_BATTERY = "./assets/battery.png";
const IMG_METER   = "./assets/meter.png";

function card(id, x, y, w, h, title) {
    ui.addShape({
        id: id + "-bg",
        type: "rectangle",
        x: x, y: y, width: w, height: h,
        radius: 16,
        fillColor: "rgba(18, 22, 34, 0.85)",
        strokeColor: "rgba(255,255,255,0.07)",
        strokeWidth: 1.5
    });
    ui.addText({
        id: id + "-title",
        x: x + 18, y: y + 16,
        text: title,
        fontSize: 13,
        fontColor: C_HEAD,
        fontWeight: 700
    });
}

function label(id, x, y, text, color) {
    ui.addText({
        id: id, x: x + 55, y: y, text: text,
        fontSize: 10.5, fontColor: color || C_SUB, width: 115, align: "center"
    });
}

ui.beginUpdate();

// ─────────────────────────────────────────────────────────────
// HEADER ZONE
// ─────────────────────────────────────────────────────────────
ui.addText({
    id: "app-title",
    x: PAD, y: 28,
    text: "NOVADESK BITMAP ELEMENT — FEATURE SHOWCASE",
    fontSize: 21, fontColor: C_HEAD, fontWeight: 800
});
ui.addText({
    id: "app-sub",
    x: PAD, y: 60,
    text: "Sprite sheet frame meters, multi-digit digital readouts, alignment, and custom tracking.",
    fontSize: 12, fontColor: C_SUB
});
ui.addShape({
    id: "hline",
    type: "line",
    startX: PAD, startY: 86, endX: W - PAD, endY: 86,
    strokeColor: "linearGradient(90, #00ffff, #ff0055, rgba(0,0,0,0))",
    strokeWidth: 2
});

var Y = 102;

// ═══════════════════════════════════════════════════════════
// ROW 1 — Multi-Digit Number Displays & Alignment
// ═══════════════════════════════════════════════════════════
var R1H = 220;
card("r1-left", PAD, Y, CARD_W, R1H, "1 · Multi-Digit Number Displays (bitmapDigits)");

var x1 = PAD + 25;
var y1 = Y + 48;

// 1. Standard 3-Digit Counter (042)
ui.addBitmap({
    id: "b1-digits3",
    x: x1, y: y1,
    value: 42,
    bitmapImageName: IMG_DIGITS,
    bitmapFrames: 10,
    bitmapExtend: true,
    bitmapDigits: 3,
    maxValue: 999,
    bitmapSeparation: 0
});
label("c-b1-digits3", x1 + 10, y1 + 72, "3-Digit Display\nbitmapDigits: 3");

// 2. Tight Tracking (-6px separation)
ui.addBitmap({
    id: "b1-tight",
    x: x1 + 160, y: y1,
    value: 88,
    bitmapImageName: IMG_DIGITS,
    bitmapFrames: 10,
    bitmapExtend: true,
    bitmapDigits: 3,
    maxValue: 999,
    bitmapSeparation: -8
});
label("c-b1-tight", x1 + 160 + 10, y1 + 72, "Tight Tracking\nseparation: -8");

// 3. Spaced Digits (+10px separation)
ui.addBitmap({
    id: "b1-spaced",
    x: x1 + 320, y: y1,
    value: 123,
    bitmapImageName: IMG_DIGITS,
    bitmapFrames: 10,
    bitmapExtend: true,
    bitmapDigits: 3,
    maxValue: 999,
    bitmapSeparation: 10
});
label("c-b1-spaced", x1 + 320 + 15, y1 + 72, "Spaced Tracking\nseparation: +10");


// ── RIGHT: Alignment & Zero Frame ─────────────────────────────
card("r1-right", PAD + CARD_W + CARD_GAP, Y, CARD_W, R1H, "2 · Alignment & Zero Frame Modes");

var x2 = PAD + CARD_W + CARD_GAP + 25;

// 1. Left Aligned Digits
ui.addBitmap({
    id: "b2-left",
    x: x2, y: y1,
    value: 7,
    bitmapImageName: IMG_DIGITS,
    bitmapFrames: 10,
    bitmapExtend: true,
    bitmapDigits: 3,
    bitmapAlign: "left",
    maxValue: 999
});
label("c-b2-left", x2 + 10, y1 + 72, "Left Aligned\nbitmapAlign: 'left'");

// 2. Center Aligned Digits
ui.addBitmap({
    id: "b2-center",
    x: x2 + 160, y: y1,
    value: 7,
    bitmapImageName: IMG_DIGITS,
    bitmapFrames: 10,
    bitmapExtend: true,
    bitmapDigits: 3,
    bitmapAlign: "center",
    maxValue: 999
});
label("c-b2-center", x2 + 160 + 10, y1 + 72, "Center Aligned\nbitmapAlign: 'center'");

// 3. Right Aligned Digits
ui.addBitmap({
    id: "b2-right",
    x: x2 + 320, y: y1,
    value: 7,
    bitmapImageName: IMG_DIGITS,
    bitmapFrames: 10,
    bitmapExtend: true,
    bitmapDigits: 3,
    bitmapAlign: "right",
    maxValue: 999
});
label("c-b2-right", x2 + 320 + 10, y1 + 72, "Right Aligned\nbitmapAlign: 'right'");

Y += R1H + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 2 — Sprite Sheet Frame Meters (Single-Frame Gauge)
// ═══════════════════════════════════════════════════════════
var R2H = 220;

// ── LEFT: Battery Strip Meter (6 Frames) ────────────────────
card("r2-left-bat", PAD, Y, CARD_W, R2H, "3 · Battery Sprite Strip Meter (6 Frames)");

var y2 = Y + 48;

// Battery 0%
ui.addBitmap({
    id: "b3-bat-0",
    x: x1, y: y2 + 10,
    value: 0,
    bitmapImageName: IMG_BATTERY,
    bitmapFrames: 6,
    bitmapExtend: false,
    bitmapZeroFrame: true,
    maxValue: 100
});
label("c-b3-bat-0", x1 - 10, y2 + 55, "0% (Empty)\nframe 0");

// Battery 40%
ui.addBitmap({
    id: "b3-bat-40",
    x: x1 + 160, y: y2 + 10,
    value: 40,
    bitmapImageName: IMG_BATTERY,
    bitmapFrames: 6,
    bitmapExtend: false,
    bitmapZeroFrame: true,
    maxValue: 100
});
label("c-b3-bat-40", x1 + 160 - 10, y2 + 55, "40% (Medium)\nframe 2");

// Battery 100%
ui.addBitmap({
    id: "b3-bat-100",
    x: x1 + 320, y: y2 + 10,
    value: 100,
    bitmapImageName: IMG_BATTERY,
    bitmapFrames: 6,
    bitmapExtend: false,
    bitmapZeroFrame: true,
    maxValue: 100
});
label("c-b3-bat-100", x1 + 320 - 10, y2 + 55, "100% (Full)\nframe 5");


// ── RIGHT: Circular Arc Sprite Strip (10 Frames) ────────────
card("r2-right-meter", PAD + CARD_W + CARD_GAP, Y, CARD_W, R2H, "4 · Circular Arc Gauge Strip (10 Frames)");

// Meter 20%
ui.addBitmap({
    id: "b4-m-20",
    x: x2 + 10, y: y2,
    value: 20,
    bitmapImageName: IMG_METER,
    bitmapFrames: 10,
    bitmapExtend: false,
    maxValue: 100
});
label("c-b4-m-20", x2 - 10, y2 + 70, "20% Fill\nframe 2");

// Meter 60%
ui.addBitmap({
    id: "b4-m-60",
    x: x2 + 170, y: y2,
    value: 60,
    bitmapImageName: IMG_METER,
    bitmapFrames: 10,
    bitmapExtend: false,
    maxValue: 100
});
label("c-b4-m-60", x2 + 170 - 10, y2 + 70, "60% Fill\nframe 6");

// Meter 100%
ui.addBitmap({
    id: "b4-m-100",
    x: x2 + 330, y: y2,
    value: 100,
    bitmapImageName: IMG_METER,
    bitmapFrames: 10,
    bitmapExtend: false,
    maxValue: 100
});
label("c-b4-m-100", x2 + 330 - 10, y2 + 70, "100% Fill\nframe 9");

Y += R2H + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 3 — Color Filters & Effects (Tint, Alpha, Grayscale)
// ═══════════════════════════════════════════════════════════
var R3H = 220;

// ── LEFT: Tinting & Alpha ───────────────────────────────────
card("r3-left-filters", PAD, Y, CARD_W, R3H, "5 · Image Tinting & Opacity (imageTint, imageAlpha)");

var y3 = Y + 48;

// Cyan Tinted Digits
ui.addBitmap({
    id: "b5-tint-cyan",
    x: x1, y: y3,
    value: 77,
    bitmapImageName: IMG_DIGITS,
    bitmapFrames: 10,
    bitmapExtend: true,
    bitmapDigits: 2,
    imageTint: C_CYAN
});
label("c-b5-cyan", x1 - 10, y3 + 72, "Cyan Tint\nimageTint: '#00ffff'");

// Pink Tinted Battery
ui.addBitmap({
    id: "b5-tint-pink",
    x: x1 + 160, y: y3 + 10,
    value: 80,
    bitmapImageName: IMG_BATTERY,
    bitmapFrames: 6,
    bitmapExtend: false,
    imageTint: C_PINK
});
label("c-b5-pink", x1 + 160 - 10, y3 + 60, "Pink Tint\nimageTint: '#ff0055'");

// 50% Alpha Opacity
ui.addBitmap({
    id: "b5-alpha-50",
    x: x1 + 320, y: y3,
    value: 99,
    bitmapImageName: IMG_DIGITS,
    bitmapFrames: 10,
    bitmapExtend: true,
    bitmapDigits: 2,
    imageAlpha: 128
});
label("c-b5-alpha", x1 + 320 - 10, y3 + 72, "50% Opacity\nimageAlpha: 128");


// ── RIGHT: Grayscale & Invert Matrix ────────────────────────
card("r3-right-matrix", PAD + CARD_W + CARD_GAP, Y, CARD_W, R3H, "6 · Grayscale & Color Matrix Filters");

// Grayscale Digits
ui.addBitmap({
    id: "b6-grayscale",
    x: x2, y: y3,
    value: 50,
    bitmapImageName: IMG_DIGITS,
    bitmapFrames: 10,
    bitmapExtend: true,
    bitmapDigits: 2,
    grayscale: true
});
label("c-b6-gs", x2 - 10, y3 + 72, "Grayscale Mode\ngrayscale: true");

// Invert Color Matrix Digits
ui.addBitmap({
    id: "b6-matrix",
    x: x2 + 180, y: y3,
    value: 84,
    bitmapImageName: IMG_DIGITS,
    bitmapFrames: 10,
    bitmapExtend: true,
    bitmapDigits: 2,
    colorMatrix: [
        -1, 0,  0,  0, 1,
        0, -1,  0,  0, 1,
        0,  0, -1,  0, 1,
        0,  0,  0,  1, 0,
        0,  0,  0,  0, 1
    ]
});
label("c-b6-matrix", x2 + 180 - 10, y3 + 72, "Inverted Color Matrix\ncolorMatrix filter");

Y += R3H + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 4 — Real-Time Hardware Readouts (Live CPU, RAM & Clock)
// ═══════════════════════════════════════════════════════════
var R4H = 260;
card("r4-hardware", PAD, Y, W - PAD * 2, R4H, "7 · Real-Time System Metrics Readouts (Live Feed)");

var gY = Y + 48;
var cpuX = PAD + 60;
var ramX = PAD + 420;
var secX = PAD + 780;

// CPU Live Display (Digits + Meter)
ui.addBitmap({
    id: "live-cpu-digits",
    x: cpuX, y: gY,
    value: 0,
    bitmapImageName: IMG_DIGITS,
    bitmapFrames: 10,
    bitmapExtend: true,
    bitmapDigits: 3,
    maxValue: 100,
    imageTint: C_CYAN
});

ui.addBitmap({
    id: "live-cpu-bat",
    x: cpuX + 160, y: gY + 12,
    value: 0,
    bitmapImageName: IMG_BATTERY,
    bitmapFrames: 6,
    bitmapZeroFrame: true,
    maxValue: 100
});

ui.addText({
    id: "lbl-cpu-readout",
    x: cpuX + 115, y: gY + 80,
    text: "CPU: 0.0%",
    fontSize: 14, fontColor: C_HEAD, width: 230, align: "center", fontWeight: 800
});

// RAM Live Display (Digits + Gauge Meter)
ui.addBitmap({
    id: "live-ram-digits",
    x: ramX, y: gY,
    value: 0,
    bitmapImageName: IMG_DIGITS,
    bitmapFrames: 10,
    bitmapExtend: true,
    bitmapDigits: 3,
    maxValue: 100,
    imageTint: C_PINK
});

ui.addBitmap({
    id: "live-ram-meter",
    x: ramX + 160, y: gY,
    value: 0,
    bitmapImageName: IMG_METER,
    bitmapFrames: 10,
    maxValue: 100
});

ui.addText({
    id: "lbl-ram-readout",
    x: ramX + 115, y: gY + 80,
    text: "RAM: 0.0%",
    fontSize: 14, fontColor: C_HEAD, width: 230, align: "center", fontWeight: 800
});

// Live Seconds Counter Display
ui.addBitmap({
    id: "live-sec-digits",
    x: secX + 50, y: gY,
    value: 0,
    bitmapImageName: IMG_DIGITS,
    bitmapFrames: 10,
    bitmapExtend: true,
    bitmapDigits: 2,
    maxValue: 59,
    imageTint: C_GOLD
});

ui.addText({
    id: "lbl-sec-readout",
    x: secX + 100, y: gY + 80,
    text: "CLOCK SECONDS",
    fontSize: 12, fontColor: C_SUB, width: 200, align: "center", fontWeight: 700
});

ui.addText({
    id: "c-hw-info",
    x: PAD + 40, y: gY + 145,
    text: "Real-time updates via setElementProperties({ value: ... }) from main process data tick stream.",
    fontSize: 11, fontColor: C_SUB, width: 1000
});

Y += R4H + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 5 — Interactive Playground
// ═══════════════════════════════════════════════════════════
var R5H = 220;
card("r5-panel", PAD, Y, W - PAD * 2, R5H, "8 · Interactive Bitmap Playground");

var pX = PAD + 30;
var pY = Y + 48;

// Target Bitmap
ui.addBitmap({
    id: "play-target",
    x: pX, y: pY,
    value: 42,
    bitmapImageName: IMG_DIGITS,
    bitmapFrames: 10,
    bitmapExtend: true,
    bitmapDigits: 3,
    maxValue: 999,
    imageTint: C_GREEN,
    tooltipTitle: "Interactive Bitmap",
    tooltipText: "Scroll Up/Down: Change value live\nClick buttons to adjust digits & separation",
    mouseEventCursor: true,
    mouseEventCursorName: "hand",
    onScrollUp: function () {
        var v = ui.getElementProperty("play-target", "value");
        var next = Math.min(999, v + 5);
        ui.setElementProperties("play-target", { value: next });
        ui.setElementProperties("play-status", { text: "Value raised to " + next + " (via mouse scroll Up)" });
    },
    onScrollDown: function () {
        var v = ui.getElementProperty("play-target", "value");
        var next = Math.max(0, v - 5);
        ui.setElementProperties("play-target", { value: next });
        ui.setElementProperties("play-status", { text: "Value lowered to " + next + " (via mouse scroll Down)" });
    }
});

// Value Buttons
var btnX = pX + 220;
var btnY = pY;
var pValOpts = [0, 25, 50, 99, 100, 777];

ui.addText({
    id: "lbl-p-val",
    x: btnX, y: btnY - 5,
    text: "SET VALUE:",
    fontSize: 10.5, fontColor: C_HEAD, fontWeight: 700
});

function makePlayValBtn(i) {
    var bW = 46;
    var bC = btnX + i * 52 + bW / 2;
    ui.addShape({
        id: "btn-pv-" + i,
        type: "rectangle",
        x: btnX + i * 52, y: btnY + 18,
        width: bW, height: 28,
        radius: 6,
        fillColor: (pValOpts[i] === 42) ? "rgba(0,255,136,0.2)" : "rgba(255,255,255,0.04)",
        strokeColor: (pValOpts[i] === 42) ? C_GREEN : "rgba(255,255,255,0.15)",
        strokeWidth: (pValOpts[i] === 42) ? 2 : 1,
        mouseEventCursor: true,
        mouseEventCursorName: "hand",
        onLeftMouseUp: function () {
            ui.beginUpdate();
            ui.setElementProperties("play-target", { value: pValOpts[i] });
            for (var k = 0; k < pValOpts.length; k++) {
                var sel = (k === i);
                ui.setElementProperties("btn-pv-" + k, {
                    fillColor: sel ? "rgba(0,255,136,0.2)" : "rgba(255,255,255,0.04)",
                    strokeColor: sel ? C_GREEN : "rgba(255,255,255,0.15)",
                    strokeWidth: sel ? 2 : 1
                });
            }
            ui.setElementProperties("play-status", { text: "Value set to " + pValOpts[i] });
            ui.endUpdate();
        }
    });
    ui.addText({
        id: "lbl-btn-pv-" + i,
        x: bC, y: btnY + 25,
        text: String(pValOpts[i]), fontSize: 10, fontColor: C_HEAD, width: bW, align: "center", fontWeight: 600
    });
}
for (var pvi = 0; pvi < pValOpts.length; pvi++) { makePlayValBtn(pvi); }

// Separation Toggle Buttons
var sepY = btnY + 60;
ui.addText({
    id: "lbl-p-sep",
    x: btnX, y: sepY - 5,
    text: "TRACKING (SEPARATION):",
    fontSize: 10.5, fontColor: C_HEAD, fontWeight: 700
});

var sepOpts = [-8, -4, 0, 8];
var sepLbls = ["-8px", "-4px", "0px", "+8px"];
function makePlaySepBtn(i) {
    var sW = 60;
    var sC = btnX + i * 66 + sW / 2;
    ui.addShape({
        id: "btn-ps-" + i,
        type: "rectangle",
        x: btnX + i * 66, y: sepY + 18,
        width: sW, height: 28,
        radius: 6,
        fillColor: (sepOpts[i] === 0) ? "rgba(0,255,255,0.2)" : "rgba(255,255,255,0.04)",
        strokeColor: (sepOpts[i] === 0) ? C_CYAN : "rgba(255,255,255,0.15)",
        strokeWidth: (sepOpts[i] === 0) ? 2 : 1,
        mouseEventCursor: true,
        mouseEventCursorName: "hand",
        onLeftMouseUp: function () {
            ui.beginUpdate();
            ui.setElementProperties("play-target", { bitmapSeparation: sepOpts[i] });
            for (var k = 0; k < sepOpts.length; k++) {
                var sel = (k === i);
                ui.setElementProperties("btn-ps-" + k, {
                    fillColor: sel ? "rgba(0,255,255,0.2)" : "rgba(255,255,255,0.04)",
                    strokeColor: sel ? C_CYAN : "rgba(255,255,255,0.15)",
                    strokeWidth: sel ? 2 : 1
                });
            }
            ui.setElementProperties("play-status", { text: "Separation set to " + sepLbls[i] });
            ui.endUpdate();
        }
    });
    ui.addText({
        id: "lbl-btn-ps-" + i,
        x: sC, y: sepY + 25,
        text: sepLbls[i], fontSize: 10, fontColor: C_HEAD, width: sW, align: "center", fontWeight: 600
    });
}
for (var psi = 0; psi < sepOpts.length; psi++) { makePlaySepBtn(psi); }

// Status Text
ui.addText({
    id: "play-status",
    x: btnX, y: sepY + 62,
    text: "Interact with the controls above or scroll over the target bitmap on the left to change value live!",
    fontSize: 11.5, fontColor: C_SUB, width: 650
});

ui.endUpdate();

// ═══════════════════════════════════════════════════════════
// LIVE DATA AND ANIMATION LOOP (100ms Ticks)
// ═══════════════════════════════════════════════════════════
ipcRenderer.on("data:tick", function (event, payloadArg) {
    var raw = (payloadArg === undefined) ? event : payloadArg;
    var d;
    try { d = JSON.parse(raw); } catch (e) { return; }

    var cpu  = d.cpu;
    var mem  = d.mem;
    var secs = d.secs;

    ui.beginUpdate();

    // CPU Live Updates
    ui.setElementProperties("live-cpu-digits", { value: Math.round(cpu) });
    ui.setElementProperties("live-cpu-bat",    { value: cpu });
    ui.setElementProperties("lbl-cpu-readout", { text: "CPU: " + cpu.toFixed(1) + "%" });

    // RAM Live Updates
    ui.setElementProperties("live-ram-digits", { value: Math.round(mem) });
    ui.setElementProperties("live-ram-meter",  { value: mem });
    ui.setElementProperties("lbl-ram-readout", { text: "RAM: " + mem.toFixed(1) + "%" });

    // Seconds Live Updates
    ui.setElementProperties("live-sec-digits", { value: secs });

    ui.endUpdate();
});
