// ─────────────────────────────────────────────────────────────
// Rotator Examples — UI Script
//
// Layout rules:
//   Window width:  1020px
//   Left margin:   20px
//   Dial size:     180×180px (needle.png scaled via element width/height)
//   Row separation: 60px between last caption of one row and heading of next
//
// Angle constants (radians):
//   -135° = -2.3562   +270° = 4.7124   -90° = -1.5708
//    360° =  6.2832    180° = 3.1416    90° = 1.5708
// ─────────────────────────────────────────────────────────────

const PAD    = 20;
const W      = 1150;        // window width
const NEEDLE = "./assets/needle.png";
const D      = 220;         // dial size — must match needle.png natural size
const HALF   = 110;         // pivot = centre of 220×220 needle image

// Radian constants
const PI      = Math.PI;
const DEG135  = -2.35619449;
const DEG270  =  4.71238898;
const DEG360  =  6.28318531;

const LBL  = "#aaaaaa";
const HEAD = "#ffffff";

function heading(id, x, y, text) {
    ui.addText({ id: id, x: x, y: y, text: text,
        fontSize: 13, fontColor: HEAD, fontWeight: 600 });
}
function cap(id, x, y, text) {
    ui.addText({ id: id, x: x, y: y, text: text,
        fontSize: 11, fontColor: LBL, width: 200 });
}
function dialBg(id, x, y) {
    ui.addShape({ id: id, shapeType: "ellipse",
        x: x, y: y, width: D, height: D,
        fillColor:   "rgba(255,255,255,0.04)",
        strokeColor: "rgba(255,255,255,0.25)",
        strokeWidth: 1.5 });
}
function rotator(id, x, y, value, minV, maxV, sa, ra, tint, remainder) {
    var opts = {
        id: id, x: x, y: y,
        width: D, height: D,
        rotatorImageName: NEEDLE,
        offsetX: HALF, offsetY: HALF,
        value: value, minValue: minV, maxValue: maxV,
        startAngle: sa, rotationAngle: ra,
        imageAlpha: 230,
    };
    if (tint)      opts.imageTint      = tint;
    if (remainder) opts.valueRemainder = remainder;
    ui.addRotator(opts);
}

// ── Helper: evenly space N dials across window width ─────────
// size: diameter of each dial. Returns array of x positions.
function xPositions(count, size) {
    if (!size) size = D;
    var xs = [];
    var totalW   = count * size;
    var totalGap = W - PAD * 2 - totalW;
    var gap      = (count > 1) ? Math.floor(totalGap / (count - 1)) : 0;
    for (var i = 0; i < count; i++) {
        xs.push(PAD + i * (size + gap));
    }
    return xs;
}

var ROW_GAP  = 60;   // gap between caption line of one row and heading of next
var HEAD_H   = 22;   // heading text height
var CAP_H    = 32;   // caption area height (two lines)

// Y cursor — advances after each row
var Y = 20;

ui.beginUpdate();

// ═══════════════════════════════════════════════════════════
// ROW 1 — value: 0, 25, 50, 75, 100
// 5 dials across full width
// ═══════════════════════════════════════════════════════════
heading("h1", PAD, Y, "1 · value — 0%, 25%, 50%, 75%, 100% on a 270° gauge");
Y += HEAD_H;

// 5 dials — use 180px size so they fit across 1020px
var S1   = 180;
var H1   = 90;
var r1x  = xPositions(5, S1);
var r1v  = [0, 25, 50, 75, 100];
var r1cl = ["#555555","#ff3333","#ffaa00","#00cc66","#00b4ff"];
var r1lb = ["value: 0","value: 25","value: 50","value: 75","value: 100"];

for (var i = 0; i < 5; i++) {
    dialBg("r1bg" + i, r1x[i], Y);
    ui.addRotator({
        id: "r1-" + i, x: r1x[i], y: Y,
        width: S1, height: S1,
        rotatorImageName: NEEDLE,
        offsetX: H1, offsetY: H1,
        value: r1v[i], minValue: 0, maxValue: 100,
        startAngle: DEG135, rotationAngle: DEG270,
        imageAlpha: 230, imageTint: r1cl[i],
    });
    cap("r1lb" + i, r1x[i], Y + S1 + 4, r1lb[i]);
}
Y += S1 + CAP_H + ROW_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 2 — startAngle: 4 positions, all at value = 0
// ═══════════════════════════════════════════════════════════
heading("h2", PAD, Y, "2 · startAngle — needle position when value = 0 (radians)");
Y += HEAD_H;

var r2x  = xPositions(4);
var r2sa = [0, -PI/2, PI, DEG135];
var r2ra = [DEG360, DEG360, DEG360, DEG270];
var r2lb = ["0  (3 o'clock)", "-π/2  (12 o'clock)", "π  (9 o'clock)", "-135°  (gauge start)"];

for (var i2 = 0; i2 < 4; i2++) {
    dialBg("r2bg" + i2, r2x[i2], Y);
    rotator("r2-" + i2, r2x[i2], Y, 0, 0, 100, r2sa[i2], r2ra[i2], null);
    cap("r2lb" + i2, r2x[i2], Y + D + 4, "startAngle:\n" + r2lb[i2]);
}
Y += D + CAP_H + ROW_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 3 — rotationAngle: 90°, 180°, 270°, 360° — all at 50%
// ═══════════════════════════════════════════════════════════
heading("h3", PAD, Y, "3 · rotationAngle — total sweep in radians (needle at 50%)");
Y += HEAD_H;

var r3x  = xPositions(4);
var r3sa = [-PI/4, -PI/2, DEG135, 0];
var r3ra = [PI/2,  PI,    DEG270, DEG360];
var r3lb = ["90°  (π/2)", "180°  (π)", "270°  (classic)", "360°  (full circle)"];

for (var i3 = 0; i3 < 4; i3++) {
    dialBg("r3bg" + i3, r3x[i3], Y);
    rotator("r3-" + i3, r3x[i3], Y, 50, 0, 100, r3sa[i3], r3ra[i3], null);
    cap("r3lb" + i3, r3x[i3], Y + D + 4, "rotationAngle:\n" + r3lb[i3]);
}
Y += D + CAP_H + ROW_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 4 — offsetX / offsetY: pivot position effect
// 4 dials — all value=50, different pivots
// ═══════════════════════════════════════════════════════════
heading("h4", PAD, Y, "4 · offsetX / offsetY — pivot point inside the image (pixels from top-left)");
Y += HEAD_H;

var r4x = xPositions(4);
var r4ox = [HALF, HALF, 10,    0];
var r4oy = [HALF, 10,   HALF,  0];
var r4lb = [
    "offsetX:" + HALF + " offsetY:" + HALF + "\nImage centre (correct)",
    "offsetX:" + HALF + " offsetY:10\nPivot near top",
    "offsetX:10 offsetY:" + HALF + "\nPivot near left",
    "offsetX:0 offsetY:0\nTop-left corner",
];

for (var i4 = 0; i4 < 4; i4++) {
    dialBg("r4bg" + i4, r4x[i4], Y);
    ui.addRotator({
        id: "r4-" + i4,
        x: r4x[i4], y: Y,
        width: D, height: D,
        rotatorImageName: NEEDLE,
        offsetX: r4ox[i4], offsetY: r4oy[i4],
        value: 50, minValue: 0, maxValue: 100,
        startAngle: DEG135, rotationAngle: DEG270,
        imageAlpha: 230,
    });
    cap("r4lb" + i4, r4x[i4], Y + D + 4, r4lb[i4]);
}
Y += D + CAP_H + ROW_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 5 — minValue / maxValue: custom scale endpoints
// 3 dials, all visually at the same needle angle (75% of sweep)
// ═══════════════════════════════════════════════════════════
heading("h5", PAD, Y, "5 · minValue / maxValue — all three needles at 75% of their scale");
Y += HEAD_H;

var r5x = xPositions(3);

// 0-1 fraction: value 0.75
dialBg("r5bg0", r5x[0], Y);
rotator("r5-frac", r5x[0], Y, 0.75, 0, 1, DEG135, DEG270, "#00b4ff");
cap("r5lb0", r5x[0], Y + D + 4, "minValue:0  maxValue:1\nvalue:0.75  → 75%");

// 0-100 percent: value 75
dialBg("r5bg1", r5x[1], Y);
rotator("r5-pct", r5x[1], Y, 75, 0, 100, DEG135, DEG270, "#00ff88");
cap("r5lb1", r5x[1], Y + D + 4, "minValue:0  maxValue:100\nvalue:75  → 75%");

// 20-120 temperature: value 95 → (95-20)/(120-20)=75%
dialBg("r5bg2", r5x[2], Y);
rotator("r5-temp", r5x[2], Y, 95, 20, 120, DEG135, DEG270, "#ff6600");
cap("r5lb2", r5x[2], Y + D + 4, "minValue:20  maxValue:120\nvalue:95°C  → 75%");

Y += D + CAP_H + ROW_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 6 — valueRemainder: modulo / clock mode
// 3 dials
// ═══════════════════════════════════════════════════════════
heading("h6", PAD, Y, "6 · valueRemainder — modulo mode wraps the needle cyclically");
Y += HEAD_H;

var r6x = xPositions(3);

// Seconds hand (wraps every 60)
dialBg("r6bg0", r6x[0], Y);
ui.addRotator({
    id: "r6-secs",
    x: r6x[0], y: Y,
    width: D, height: D,
    rotatorImageName: NEEDLE,
    offsetX: HALF, offsetY: HALF,
    value: 0,
    valueRemainder: 60,
    startAngle: -PI / 2, rotationAngle: DEG360,
    imageAlpha: 230, imageTint: "#ffffff",
});
cap("r6lb0", r6x[0], Y + D + 4, "valueRemainder: 60\nSeconds hand — wraps every 60");

// Minute hand (wraps every 3600)
dialBg("r6bg1", r6x[1], Y);
ui.addRotator({
    id: "r6-mins",
    x: r6x[1], y: Y,
    width: D, height: D,
    rotatorImageName: NEEDLE,
    offsetX: HALF, offsetY: HALF,
    value: 0,
    valueRemainder: 3600,
    startAngle: -PI / 2, rotationAngle: DEG360,
    imageAlpha: 230, imageTint: "#00ff88",
});
cap("r6lb1", r6x[1], Y + D + 4, "valueRemainder: 3600\nMinute hand — wraps every 3600s");

// Disabled (valueRemainder: 0) — standard min/max mode
dialBg("r6bg2", r6x[2], Y);
ui.addRotator({
    id: "r6-std",
    x: r6x[2], y: Y,
    width: D, height: D,
    rotatorImageName: NEEDLE,
    offsetX: HALF, offsetY: HALF,
    value: 30, minValue: 0, maxValue: 60,
    valueRemainder: 0,
    startAngle: -PI / 2, rotationAngle: DEG360,
    imageAlpha: 230, imageTint: "#9966ff",
});
cap("r6lb2", r6x[2], Y + D + 4, "valueRemainder: 0 (disabled)\nvalue:30, range 0-60 = 50%");

Y += D + CAP_H + ROW_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 7 — imageAlpha, grayscale, imageTint
// 5 dials
// ═══════════════════════════════════════════════════════════
heading("h7", PAD, Y, "7 · imageAlpha / grayscale / imageTint — inherited image options");
Y += HEAD_H;

// 5 dials — use 180px size
var S7   = 180;
var H7   = 90;
var r7x  = xPositions(5, S7);
var r7al = [255, 160, 80, 255, 255];
var r7gs = [false, false, false, true, false];
var r7ti = [null, null, null, null, "#ff6600"];
var r7lb = [
    "imageAlpha: 255\nFully opaque",
    "imageAlpha: 160\n63% opacity",
    "imageAlpha: 80\n31% opacity",
    "grayscale: true\nColor removed",
    "imageTint: \"#ff6600\"\nOrange overlay",
];

for (var i7 = 0; i7 < 5; i7++) {
    dialBg("r7bg" + i7, r7x[i7], Y);
    var o7 = {
        id: "r7-" + i7,
        x: r7x[i7], y: Y,
        width: S7, height: S7,
        rotatorImageName: NEEDLE,
        offsetX: H7, offsetY: H7,
        value: 50, minValue: 0, maxValue: 100,
        startAngle: DEG135, rotationAngle: DEG270,
        imageAlpha: r7al[i7],
        grayscale:  r7gs[i7],
    };
    if (r7ti[i7]) o7.imageTint = r7ti[i7];
    ui.addRotator(o7);
    cap("r7lb" + i7, r7x[i7], Y + S7 + 4, r7lb[i7]);
}
Y += S7 + CAP_H + ROW_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 8 — Live CPU & Memory gauges (270° sweep)
// ═══════════════════════════════════════════════════════════
heading("h8", PAD, Y, "8 · Live gauges — CPU (left) & Memory (right), 270° sweep");
Y += HEAD_H;

var gaugeSize = 220;   // matches needle.png natural size exactly
var gaugeHalf = 110;   // pivot = image centre
var gCpuX     = 140;
var gMemX     = W / 2 + 140;

// CPU dial
ui.addShape({
    id: "r8bg-cpu", shapeType: "ellipse",
    x: gCpuX, y: Y, width: gaugeSize, height: gaugeSize,
    fillColor: "rgba(255,255,255,0.04)",
    strokeColor: "rgba(255,255,255,0.25)", strokeWidth: 1.5,
});
// Tick labels
ui.addText({ id: "r8-c0",  x: gCpuX + 4,              y: Y + gaugeHalf + 30, text: "0",   fontSize: 12, fontColor: "#888" });
ui.addText({ id: "r8-c25", x: gCpuX + 24,             y: Y + 50,             text: "25",  fontSize: 12, fontColor: "#888" });
ui.addText({ id: "r8-c50", x: gCpuX + gaugeHalf - 10, y: Y + 10,             text: "50",  fontSize: 12, fontColor: "#888" });
ui.addText({ id: "r8-c75", x: gCpuX + gaugeSize - 38, y: Y + 50,             text: "75",  fontSize: 12, fontColor: "#888" });
ui.addText({ id: "r8-c100",x: gCpuX + gaugeSize - 28, y: Y + gaugeHalf + 30, text: "100", fontSize: 12, fontColor: "#888" });

ui.addRotator({
    id: "live-cpu",
    x: gCpuX, y: Y,
    width: gaugeSize, height: gaugeSize,
    rotatorImageName: NEEDLE,
    offsetX: gaugeHalf, offsetY: gaugeHalf,
    value: 0, minValue: 0, maxValue: 100,
    startAngle: DEG135, rotationAngle: DEG270,
    imageAlpha: 240, imageTint: "#00b4ff",
});
ui.addText({ id: "cpu-readout", x: gCpuX + gaugeHalf - 40, y: Y + gaugeSize + 8,
    text: "CPU  —", fontSize: 16, fontColor: "#00b4ff" });

// Memory dial
ui.addShape({
    id: "r8bg-mem", shapeType: "ellipse",
    x: gMemX, y: Y, width: gaugeSize, height: gaugeSize,
    fillColor: "rgba(255,255,255,0.04)",
    strokeColor: "rgba(255,255,255,0.25)", strokeWidth: 1.5,
});
ui.addRotator({
    id: "live-mem",
    x: gMemX, y: Y,
    width: gaugeSize, height: gaugeSize,
    rotatorImageName: NEEDLE,
    offsetX: gaugeHalf, offsetY: gaugeHalf,
    value: 0, minValue: 0, maxValue: 100,
    startAngle: DEG135, rotationAngle: DEG270,
    imageAlpha: 240, imageTint: "#00ff88",
});
ui.addText({ id: "mem-readout", x: gMemX + gaugeHalf - 40, y: Y + gaugeSize + 8,
    text: "MEM  —", fontSize: 16, fontColor: "#00ff88" });

Y += gaugeSize + 36;

// ═══════════════════════════════════════════════════════════
// ROW 9 — Tooltip + Mouse events
// ═══════════════════════════════════════════════════════════
heading("h9", PAD, Y, "9 · Tooltip + Mouse events — click, scroll, drag");
Y += HEAD_H;

ui.addText({
    id: "mouse-status", x: PAD, y: Y,
    text: "Interact with the gauges below — events appear here",
    fontSize: 12, fontColor: "#ffdd44",
});
Y += 24;

var r9x = xPositions(2);

// Left — tooltip + click to increment + scroll
dialBg("r9bg0", r9x[0] + 50, Y);
ui.addRotator({
    id: "r9-click",
    x: r9x[0] + 50, y: Y,
    width: D, height: D,
    rotatorImageName: NEEDLE,
    offsetX: HALF, offsetY: HALF,
    value: 40, minValue: 0, maxValue: 100,
    startAngle: DEG135, rotationAngle: DEG270,
    imageAlpha: 230,
    tooltipTitle: "Click / Scroll Gauge",
    tooltipText:  "Left-click: +10\nDouble-click: reset to 0\nScroll: ±5",
    tooltipIcon:  "info",
    mouseEventCursor: true, mouseEventCursorName: "hand",
    onLeftMouseUp: function () {
        var v = ui.getElementProperty("r9-click", "value");
        var n = Math.min(100, v + 10);
        ui.setElementProperties("r9-click", { value: n });
        ui.setElementProperties("mouse-status", { text: "onLeftMouseUp → value: " + n });
    },
    onLeftDoubleClick: function () {
        ui.setElementProperties("r9-click", { value: 0 });
        ui.setElementProperties("mouse-status", { text: "onLeftDoubleClick → value reset to 0" });
    },
    onRightMouseUp: function () {
        ui.setElementProperties("mouse-status", { text: "onRightMouseUp fired" });
    },
    onMouseOver: function () {
        ui.setElementProperties("r9-click", { imageTint: "#ffffff" });
        ui.setElementProperties("mouse-status", { text: "onMouseOver — needle white" });
    },
    onMouseLeave: function () {
        ui.setElementProperties("r9-click", { imageTint: null });
        ui.setElementProperties("mouse-status", { text: "onMouseLeave — tint removed" });
    },
    onScrollUp: function () {
        var v = ui.getElementProperty("r9-click", "value");
        var n = Math.min(100, v + 5);
        ui.setElementProperties("r9-click", { value: n });
        ui.setElementProperties("mouse-status", { text: "onScrollUp → value: " + n });
    },
    onScrollDown: function () {
        var v = ui.getElementProperty("r9-click", "value");
        var n = Math.max(0, v - 5);
        ui.setElementProperties("r9-click", { value: n });
        ui.setElementProperties("mouse-status", { text: "onScrollDown → value: " + n });
    },
});
cap("r9lb0", r9x[0] + 50, Y + D + 4, "Left-click +10\nDouble-click reset · Scroll ±5");

// Right — drag to set value
dialBg("r9bg1", r9x[1] + 50, Y);
ui.addRotator({
    id: "r9-drag",
    x: r9x[1] + 50, y: Y,
    width: D, height: D,
    rotatorImageName: NEEDLE,
    offsetX: HALF, offsetY: HALF,
    value: 60, minValue: 0, maxValue: 100,
    startAngle: DEG135, rotationAngle: DEG270,
    imageAlpha: 230, imageTint: "#ff6600",
    tooltipTitle: "Drag Gauge",
    tooltipText:  "Drag left/right to set value.\nMiddle-click resets to 50.",
    tooltipIcon:  "info",
    mouseEventCursor: true, mouseEventCursorName: "size_we",
    onDragStart: function (e) {
        ui.setElementProperties("r9-drag", { imageTint: "#ffffff" });
        ui.setElementProperties("mouse-status", {
            text: "onDragStart  x:" + e.__offsetX + "px  (" + e.__offsetXPercent + "%)",
        });
    },
    onDrag: function (e) {
        var v = e.__offsetXPercent;
        ui.setElementProperties("r9-drag", { value: v });
        ui.setElementProperties("mouse-status", {
            text: "onDrag → " + e.__offsetXPercent + "% → value: " + v,
        });
    },
    onDragEnd: function () {
        ui.setElementProperties("r9-drag", { imageTint: "#ff6600" });
        ui.setElementProperties("mouse-status", { text: "onDragEnd — tint restored" });
    },
    onMiddleMouseUp: function () {
        ui.setElementProperties("r9-drag", { value: 50 });
        ui.setElementProperties("mouse-status", { text: "onMiddleMouseUp → value: 50" });
    },
});
cap("r9lb1", r9x[1] + 50, Y + D + 4, "Drag left/right sets value\nMiddle-click → 50");

// ═══════════════════════════════════════════════════════════
// End batch
// ═══════════════════════════════════════════════════════════
ui.endUpdate();


// ═══════════════════════════════════════════════════════════
// LIVE DATA LISTENER  — batched update every 100ms
// ═══════════════════════════════════════════════════════════
ipcRenderer.on("data:tick", function (event, payloadArg) {
    var raw = (payloadArg === undefined) ? event : payloadArg;
    var d;
    try { d = JSON.parse(raw); } catch (e) { return; }

    var cpu = d.cpu;
    var mem = d.mem;
    var cc  = cpu < 50 ? "#00b4ff" : cpu < 80 ? "#ffaa00" : "#ff3333";
    var mc  = mem < 50 ? "#00ff88" : mem < 80 ? "#ffaa00" : "#ff3333";

    var now  = new Date();
    var secs = now.getSeconds() + now.getMilliseconds() / 1000;
    var mins = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    // Batch all live updates in one render pass
    ui.beginUpdate();

    ui.setElementProperties("r6-secs", { value: secs });
    ui.setElementProperties("r6-mins", { value: mins });

    ui.setElementProperties("live-cpu",    { value: cpu, imageTint: cc });
    ui.setElementProperties("live-mem",    { value: mem, imageTint: mc });
    ui.setElementProperties("cpu-readout", { text: "CPU  " + cpu.toFixed(1) + "%", fontColor: cc });
    ui.setElementProperties("mem-readout", { text: "MEM  " + mem.toFixed(1) + "%", fontColor: mc });

    ui.endUpdate();
});
