// ─────────────────────────────────────────────────────────────
// RoundLine Examples — UI Script
//
// Demonstrates all Novadesk RoundLine Element features:
//   1. Progress Values & Angle Sweeps (360°, 270°, 180°, counter-clockwise)
//   2. Line & Background Track Colors (solid, alpha, linear gradients)
//   3. Line Thickness & Tapering (thickness vs endThickness)
//   4. Line Caps, Dash Arrays & Ticks (round, flat, dashed, divided ticks)
//   5. Real-Time Hardware Gauges (CPU & RAM live metrics)
//   6. Interactive Playground (scroll thickness, toggle caps/ticks, click value)
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
    // Center of 110px ring is x + 55
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
    text: "NOVADESK ROUNDLINE ELEMENT — FEATURE SHOWCASE",
    fontSize: 21, fontColor: C_HEAD, fontWeight: 800
});
ui.addText({
    id: "app-sub",
    x: PAD, y: 60,
    text: "Hardware-accelerated circular progress indicators, gauges, tick meters, and tapered rings.",
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
var R_SIZE = 110;
var R_RAD  = 45;
var R_GAP  = 18;

// ═══════════════════════════════════════════════════════════
// ROW 1 — Angles & Values
// ═══════════════════════════════════════════════════════════
var R1H = 210;
card("r1-left", PAD, Y, CARD_W, R1H, "1 · Progress Values & Angle Sweeps");

var x1 = PAD + 18;
var y1 = Y + 48;

// 1. Full 360° Ring (75%)
ui.addRoundLine({
    id: "r1-full",
    x: x1, y: y1, width: R_SIZE, height: R_SIZE,
    radius: R_RAD, thickness: 10,
    value: 0.75,
    startAngle: -90, totalAngle: 360,
    lineColor: C_CYAN, lineColorBg: "rgba(255,255,255,0.08)",
    capType: "round"
});
label("c-r1-full", x1, y1 + R_SIZE + 6, "360° Ring (75%)\nstartAngle: -90°");

// 2. 270° Gauge (50%)
ui.addRoundLine({
    id: "r1-gauge",
    x: x1 + (R_SIZE + R_GAP), y: y1, width: R_SIZE, height: R_SIZE,
    radius: R_RAD, thickness: 10,
    value: 0.50,
    startAngle: 135, totalAngle: 270,
    lineColor: C_GREEN, lineColorBg: "rgba(255,255,255,0.08)",
    capType: "round"
});
label("c-r1-gauge", x1 + (R_SIZE + R_GAP), y1 + R_SIZE + 6, "270° Gauge (50%)\nstartAngle: 135°");

// 3. Counter-Clockwise (60%)
ui.addRoundLine({
    id: "r1-counter",
    x: x1 + (R_SIZE + R_GAP) * 2, y: y1, width: R_SIZE, height: R_SIZE,
    radius: R_RAD, thickness: 10,
    value: 0.60,
    startAngle: 90, totalAngle: 360, clockwise: false,
    lineColor: C_PINK, lineColorBg: "rgba(255,255,255,0.08)",
    capType: "round"
});
label("c-r1-counter", x1 + (R_SIZE + R_GAP) * 2, y1 + R_SIZE + 6, "Counter-Clockwise\nclockwise: false");

// 4. 180° Semi-circle (80%)
ui.addRoundLine({
    id: "r1-semi",
    x: x1 + (R_SIZE + R_GAP) * 3, y: y1, width: R_SIZE, height: R_SIZE,
    radius: R_RAD, thickness: 10,
    value: 0.80,
    startAngle: 180, totalAngle: 180,
    lineColor: C_GOLD, lineColorBg: "rgba(255,255,255,0.08)",
    capType: "round"
});
label("c-r1-semi", x1 + (R_SIZE + R_GAP) * 3, y1 + R_SIZE + 6, "180° Semi-circle\ntotalAngle: 180°");


// ── RIGHT: Colors & Gradients ────────────────────────────────
card("r1-right", PAD + CARD_W + CARD_GAP, Y, CARD_W, R1H, "2 · Line Colors, Tracks & Gradients");

var x2 = PAD + CARD_W + CARD_GAP + 18;

// 1. Solid Color
ui.addRoundLine({
    id: "r2-solid",
    x: x2, y: y1, width: R_SIZE, height: R_SIZE,
    radius: R_RAD, thickness: 10,
    value: 0.70,
    lineColor: "#00d4ff", lineColorBg: "rgba(0, 212, 255, 0.15)",
    capType: "round"
});
label("c-r2-solid", x2, y1 + R_SIZE + 6, "Solid Color + Track\nmatching alpha bg");

// 2. Active Gradient
ui.addRoundLine({
    id: "r2-grad-fg",
    x: x2 + (R_SIZE + R_GAP), y: y1, width: R_SIZE, height: R_SIZE,
    radius: R_RAD, thickness: 10,
    value: 0.85,
    startAngle: 135, totalAngle: 270,
    lineColor: "linearGradient(90, #ff0055, #ffaa00)",
    lineColorBg: "rgba(255,255,255,0.08)",
    capType: "round"
});
label("c-r2-grad-fg", x2 + (R_SIZE + R_GAP), y1 + R_SIZE + 6, "Linear Gradient\nActive Line");

// 3. Active + Track Gradient
ui.addRoundLine({
    id: "r2-grad-both",
    x: x2 + (R_SIZE + R_GAP) * 2, y: y1, width: R_SIZE, height: R_SIZE,
    radius: R_RAD, thickness: 10,
    value: 0.65,
    lineColor: "linearGradient(0, #00ffff, #00ff88)",
    lineColorBg: "linearGradient(0, #112233, #05111a)",
    capType: "round"
});
label("c-r2-grad-both", x2 + (R_SIZE + R_GAP) * 2, y1 + R_SIZE + 6, "Both Gradients\nActive + Background");

// 4. Alpha Transparency
ui.addRoundLine({
    id: "r2-alpha",
    x: x2 + (R_SIZE + R_GAP) * 3, y: y1, width: R_SIZE, height: R_SIZE,
    radius: R_RAD, thickness: 10,
    value: 0.90,
    lineColor: "rgba(255, 0, 128, 0.6)",
    lineColorBg: "rgba(255, 255, 255, 0.04)",
    capType: "round"
});
label("c-r2-alpha", x2 + (R_SIZE + R_GAP) * 3, y1 + R_SIZE + 6, "Alpha Transparency\n60% Opacity");

Y += R1H + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 2 — Thickness & Tapering  &  Caps, Dashes & Ticks
// ═══════════════════════════════════════════════════════════
var R2H = 210;

// ── LEFT: Line Thickness & Tapering ──────────────────────────
card("r2-left-taper", PAD, Y, CARD_W, R2H, "3 · Variable Thickness & Tapering");

var y2 = Y + 48;

// 1. Heavy Uniform (16px)
ui.addRoundLine({
    id: "r3-heavy",
    x: x1, y: y2, width: R_SIZE, height: R_SIZE,
    radius: R_RAD, thickness: 16,
    value: 0.70,
    lineColor: C_CYAN, lineColorBg: "rgba(255,255,255,0.08)",
    capType: "round"
});
label("c-r3-heavy", x1, y2 + R_SIZE + 6, "Heavy Uniform\nthickness: 16px");

// 2. Expanding Taper (2px -> 22px)
ui.addRoundLine({
    id: "r3-taper-exp",
    x: x1 + (R_SIZE + R_GAP), y: y2, width: R_SIZE, height: R_SIZE,
    radius: R_RAD, thickness: 2, endThickness: 22,
    value: 0.85,
    startAngle: 135, totalAngle: 270,
    lineColor: C_PINK, lineColorBg: "rgba(255,255,255,0.08)",
    capType: "round"
});
label("c-r3-taper-exp", x1 + (R_SIZE + R_GAP), y2 + R_SIZE + 6, "Expanding Taper\n2px → 22px");

// 3. Shrinking Taper (22px -> 3px)
ui.addRoundLine({
    id: "r3-taper-shr",
    x: x1 + (R_SIZE + R_GAP) * 2, y: y2, width: R_SIZE, height: R_SIZE,
    radius: R_RAD, thickness: 22, endThickness: 3,
    value: 0.80,
    startAngle: -90, totalAngle: 360,
    lineColor: C_GREEN, lineColorBg: "rgba(255,255,255,0.08)",
    capType: "round"
});
label("c-r3-taper-shr", x1 + (R_SIZE + R_GAP) * 2, y2 + R_SIZE + 6, "Shrinking Taper\n22px → 3px");

// 4. Ultra-thin Minimalist (3px)
ui.addRoundLine({
    id: "r3-thin",
    x: x1 + (R_SIZE + R_GAP) * 3, y: y2, width: R_SIZE, height: R_SIZE,
    radius: R_RAD, thickness: 3,
    value: 0.90,
    lineColor: C_GOLD, lineColorBg: "rgba(255,255,255,0.08)",
    capType: "round"
});
label("c-r3-thin", x1 + (R_SIZE + R_GAP) * 3, y2 + R_SIZE + 6, "Ultra-Thin\nthickness: 3px");


// ── RIGHT: Caps, Dashes & Ticks ──────────────────────────────
card("r2-right-caps", PAD + CARD_W + CARD_GAP, Y, CARD_W, R2H, "4 · Line Caps, Dash Patterns & Divided Ticks");

// 1. Round Caps
ui.addRoundLine({
    id: "r4-caps-round",
    x: x2, y: y2, width: R_SIZE, height: R_SIZE,
    radius: R_RAD, thickness: 12,
    value: 0.65,
    startAngle: 135, totalAngle: 270,
    lineColor: C_CYAN, lineColorBg: "rgba(255,255,255,0.08)",
    capType: "round"
});
label("c-r4-caps-round", x2, y2 + R_SIZE + 6, "Round Caps\ncapType: 'round'");

// 2. Flat Caps
ui.addRoundLine({
    id: "r4-caps-flat",
    x: x2 + (R_SIZE + R_GAP), y: y2, width: R_SIZE, height: R_SIZE,
    radius: R_RAD, thickness: 12,
    value: 0.65,
    startAngle: 135, totalAngle: 270,
    lineColor: C_PINK, lineColorBg: "rgba(255,255,255,0.08)",
    capType: "flat"
});
label("c-r4-caps-flat", x2 + (R_SIZE + R_GAP), y2 + R_SIZE + 6, "Flat Caps\ncapType: 'flat'");

// 3. Dashed Pattern
ui.addRoundLine({
    id: "r4-dashed",
    x: x2 + (R_SIZE + R_GAP) * 2, y: y2, width: R_SIZE, height: R_SIZE,
    radius: R_RAD, thickness: 6,
    value: 1.0,
    dashArray: [12, 6],
    lineColor: C_GOLD, lineColorBg: "rgba(255,255,255,0.08)"
});
label("c-r4-dashed", x2 + (R_SIZE + R_GAP) * 2, y2 + R_SIZE + 6, "Dashed Pattern\ndashArray: [12, 6]");

// 4. Divided Ticks
ui.addRoundLine({
    id: "r4-ticks",
    x: x2 + (R_SIZE + R_GAP) * 3, y: y2, width: R_SIZE, height: R_SIZE,
    radius: R_RAD, thickness: 10,
    value: 0.70,
    ticks: 16,
    lineColor: C_GREEN, lineColorBg: "rgba(255,255,255,0.08)"
});
label("c-r4-ticks", x2 + (R_SIZE + R_GAP) * 3, y2 + R_SIZE + 6, "Divided Ticks\nticks: 16");

Y += R2H + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 3 — Real-Time Hardware Gauges (CPU & RAM)
// ═══════════════════════════════════════════════════════════
var R3H = 300;
card("r3-gauges", PAD, Y, W - PAD * 2, R3H, "5 · Real-Time System Metrics Gauges (Driven by live CPU & RAM feed)");

var gY = Y + 48;
var gSize = 180;
var gRad  = 75;

// CPU Gauge
var cpuX = PAD + 100;
var cpuCenter = cpuX + gSize / 2; // 128 + 90 = 218
ui.addRoundLine({
    id: "gauge-cpu",
    x: cpuX, y: gY, width: gSize, height: gSize,
    radius: gRad, thickness: 16,
    value: 0.0,
    startAngle: 135, totalAngle: 270,
    lineColor: "linearGradient(90, #00ffff, #00ff88)",
    lineColorBg: "rgba(255,255,255,0.06)",
    capType: "round"
});
ui.addText({
    id: "lbl-cpu-title",
    x: cpuCenter, y: gY + 60, text: "CPU USAGE",
    fontSize: 11, fontColor: C_SUB, width: gSize, align: "center", fontWeight: 700
});
ui.addText({
    id: "val-cpu",
    x: cpuCenter, y: gY + 82, text: "0.0%",
    fontSize: 24, fontColor: C_HEAD, width: gSize, align: "center", fontWeight: 800
});

// RAM Gauge
var ramX = PAD + 460;
var ramCenter = ramX + gSize / 2; // 488 + 90 = 578
ui.addRoundLine({
    id: "gauge-ram",
    x: ramX, y: gY, width: gSize, height: gSize,
    radius: gRad, thickness: 16,
    value: 0.0,
    startAngle: 135, totalAngle: 270,
    lineColor: "linearGradient(90, #ff0055, #ffaa00)",
    lineColorBg: "rgba(255,255,255,0.06)",
    capType: "round"
});
ui.addText({
    id: "lbl-ram-title",
    x: ramCenter, y: gY + 60, text: "MEMORY USAGE",
    fontSize: 11, fontColor: C_SUB, width: gSize, align: "center", fontWeight: 700
});
ui.addText({
    id: "val-ram",
    x: ramCenter, y: gY + 82, text: "0.0%",
    fontSize: 24, fontColor: C_HEAD, width: gSize, align: "center", fontWeight: 800
});

// Tapered Oscillating Wave Ring
var waveX = PAD + 800;
var waveCenter = waveX + gSize / 2; // 828 + 90 = 918
ui.addRoundLine({
    id: "gauge-wave",
    x: waveX, y: gY, width: gSize, height: gSize,
    radius: gRad, thickness: 4, endThickness: 20,
    value: 0.5,
    startAngle: -90, totalAngle: 360,
    lineColor: "linearGradient(180, #00ffff, #aa44ff)",
    lineColorBg: "rgba(255,255,255,0.06)",
    capType: "round"
});
ui.addText({
    id: "lbl-wave-title",
    x: waveCenter, y: gY + 60, text: "LIVE WAVE",
    fontSize: 11, fontColor: C_SUB, width: gSize, align: "center", fontWeight: 700
});
ui.addText({
    id: "val-wave",
    x: waveCenter, y: gY + 82, text: "50%",
    fontSize: 24, fontColor: C_HEAD, width: gSize, align: "center", fontWeight: 800
});

ui.addText({
    id: "c-gauges-info",
    x: PAD + 40, y: gY + gSize + 16,
    text: "Smooth real-time value transitions updated via ipcRenderer tick loop.",
    fontSize: 11, fontColor: C_SUB, width: 1000
});

Y += R3H + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 4 — Interactive Playground
// ═══════════════════════════════════════════════════════════
var R4H = 220;
card("r4-panel", PAD, Y, W - PAD * 2, R4H, "6 · Interactive RoundLine Playground");

var pX = PAD + 25;
var pY = Y + 48;
var pSize = 130;

// Target RoundLine
ui.addRoundLine({
    id: "play-target",
    x: pX, y: pY, width: pSize, height: pSize,
    radius: 50, thickness: 12,
    value: 0.65,
    startAngle: 135, totalAngle: 270,
    lineColor: C_CYAN, lineColorBg: "rgba(255,255,255,0.08)",
    capType: "round",
    tooltipTitle: "Interactive RoundLine",
    tooltipText: "Scroll Up/Down: Change thickness\nClick value buttons: Change progress",
    mouseEventCursor: true,
    mouseEventCursorName: "hand",
    onScrollUp: function () {
        var t = ui.getElementProperty("play-target", "thickness");
        var next = Math.min(30, t + 2);
        ui.setElementProperties("play-target", { thickness: next });
        ui.setElementProperties("play-status", { text: "Thickness raised to " + next + "px (via mouse scroll Up)" });
    },
    onScrollDown: function () {
        var t = ui.getElementProperty("play-target", "thickness");
        var next = Math.max(2, t - 2);
        ui.setElementProperties("play-target", { thickness: next });
        ui.setElementProperties("play-status", { text: "Thickness lowered to " + next + "px (via mouse scroll Down)" });
    }
});

// Value Buttons
var btnX = pX + pSize + 40;
var btnY = pY + 5;
var valOpts = [0.0, 0.25, 0.50, 0.75, 1.0];
var valLbls = ["0%", "25%", "50%", "75%", "100%"];

ui.addText({
    id: "lbl-p-val",
    x: btnX, y: btnY - 5,
    text: "SET PROGRESS VALUE:",
    fontSize: 10.5, fontColor: C_HEAD, fontWeight: 700
});

function makeValBtn(i) {
    var bWidth = 48;
    var bCenter = btnX + i * 55 + bWidth / 2;
    ui.addShape({
        id: "btn-v-" + i,
        type: "rectangle",
        x: btnX + i * 55, y: btnY + 18,
        width: bWidth, height: 28,
        radius: 6,
        fillColor: (i === 3) ? "rgba(0,255,255,0.2)" : "rgba(255,255,255,0.04)",
        strokeColor: (i === 3) ? C_CYAN : "rgba(255,255,255,0.15)",
        strokeWidth: (i === 3) ? 2 : 1,
        mouseEventCursor: true,
        mouseEventCursorName: "hand",
        onLeftMouseUp: function () {
            ui.beginUpdate();
            ui.setElementProperties("play-target", { value: valOpts[i] });
            for (var k = 0; k < valOpts.length; k++) {
                var sel = (k === i);
                ui.setElementProperties("btn-v-" + k, {
                    fillColor: sel ? "rgba(0,255,255,0.2)" : "rgba(255,255,255,0.04)",
                    strokeColor: sel ? C_CYAN : "rgba(255,255,255,0.15)",
                    strokeWidth: sel ? 2 : 1
                });
            }
            ui.setElementProperties("play-status", { text: "Progress value set to " + valLbls[i] });
            ui.endUpdate();
        }
    });
    ui.addText({
        id: "lbl-btn-v-" + i,
        x: bCenter, y: btnY + 25,
        text: valLbls[i], fontSize: 10, fontColor: C_HEAD, width: bWidth, align: "center", fontWeight: 600
    });
}
for (var vi = 0; vi < valOpts.length; vi++) { makeValBtn(vi); }

// Cap Toggle Buttons
var capX = btnX + valOpts.length * 55 + 25;
ui.addText({
    id: "lbl-p-cap",
    x: capX, y: btnY - 5,
    text: "CAP TYPE:",
    fontSize: 10.5, fontColor: C_HEAD, fontWeight: 700
});

var capOpts = ["round", "flat"];
function makeCapBtn(i) {
    var cWidth = 58;
    var cCenter = capX + i * 65 + cWidth / 2;
    ui.addShape({
        id: "btn-cap-" + i,
        type: "rectangle",
        x: capX + i * 65, y: btnY + 18,
        width: cWidth, height: 28,
        radius: 6,
        fillColor: (i === 0) ? "rgba(255,0,85,0.2)" : "rgba(255,255,255,0.04)",
        strokeColor: (i === 0) ? C_PINK : "rgba(255,255,255,0.15)",
        strokeWidth: (i === 0) ? 2 : 1,
        mouseEventCursor: true,
        mouseEventCursorName: "hand",
        onLeftMouseUp: function () {
            ui.beginUpdate();
            ui.setElementProperties("play-target", { capType: capOpts[i] });
            for (var k = 0; k < capOpts.length; k++) {
                var sel = (k === i);
                ui.setElementProperties("btn-cap-" + k, {
                    fillColor: sel ? "rgba(255,0,85,0.2)" : "rgba(255,255,255,0.04)",
                    strokeColor: sel ? C_PINK : "rgba(255,255,255,0.15)",
                    strokeWidth: sel ? 2 : 1
                });
            }
            ui.setElementProperties("play-status", { text: "Cap type set to '" + capOpts[i] + "'" });
            ui.endUpdate();
        }
    });
    ui.addText({
        id: "lbl-btn-cap-" + i,
        x: cCenter, y: btnY + 25,
        text: capOpts[i], fontSize: 10, fontColor: C_HEAD, width: cWidth, align: "center", fontWeight: 600
    });
}
for (var ci = 0; ci < capOpts.length; ci++) { makeCapBtn(ci); }

// Tick Toggle Buttons
var tickY = btnY + 60;
ui.addText({
    id: "lbl-p-tick",
    x: btnX, y: tickY - 5,
    text: "TICKS DIVISION:",
    fontSize: 10.5, fontColor: C_HEAD, fontWeight: 700
});

var tickOpts = [0, 12, 24];
var tickLbls = ["None (0)", "12 Ticks", "24 Ticks"];
function makeTickBtn(i) {
    var tWidth = 78;
    var tCenter = btnX + i * 85 + tWidth / 2;
    ui.addShape({
        id: "btn-t-" + i,
        type: "rectangle",
        x: btnX + i * 85, y: tickY + 18,
        width: tWidth, height: 28,
        radius: 6,
        fillColor: (i === 0) ? "rgba(0,255,136,0.2)" : "rgba(255,255,255,0.04)",
        strokeColor: (i === 0) ? C_GREEN : "rgba(255,255,255,0.15)",
        strokeWidth: (i === 0) ? 2 : 1,
        mouseEventCursor: true,
        mouseEventCursorName: "hand",
        onLeftMouseUp: function () {
            ui.beginUpdate();
            ui.setElementProperties("play-target", { ticks: tickOpts[i] });
            for (var k = 0; k < tickOpts.length; k++) {
                var sel = (k === i);
                ui.setElementProperties("btn-t-" + k, {
                    fillColor: sel ? "rgba(0,255,136,0.2)" : "rgba(255,255,255,0.04)",
                    strokeColor: sel ? C_GREEN : "rgba(255,255,255,0.15)",
                    strokeWidth: sel ? 2 : 1
                });
            }
            ui.setElementProperties("play-status", { text: "Ticks set to " + tickLbls[i] });
            ui.endUpdate();
        }
    });
    ui.addText({
        id: "lbl-btn-t-" + i,
        x: tCenter, y: tickY + 25,
        text: tickLbls[i], fontSize: 10, fontColor: C_HEAD, width: tWidth, align: "center", fontWeight: 600
    });
}
for (var ti2 = 0; ti2 < tickOpts.length; ti2++) { makeTickBtn(ti2); }

// Status Text
ui.addText({
    id: "play-status",
    x: btnX, y: tickY + 62,
    text: "Interact with the playground controls above or scroll over the left ring to adjust thickness live!",
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

    var cpu   = d.cpu;
    var mem   = d.mem;
    var wave  = d.wave;  // 0.0 – 1.0

    ui.beginUpdate();

    // Update real-time gauges
    ui.setElementProperties("gauge-cpu", { value: cpu / 100 });
    ui.setElementProperties("val-cpu",   { text: cpu.toFixed(1) + "%" });

    ui.setElementProperties("gauge-ram", { value: mem / 100 });
    ui.setElementProperties("val-ram",   { text: mem.toFixed(1) + "%" });

    ui.setElementProperties("gauge-wave", { value: wave });
    ui.setElementProperties("val-wave",   { text: Math.round(wave * 100) + "%" });

    ui.endUpdate();
});
