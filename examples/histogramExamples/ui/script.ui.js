// ─────────────────────────────────────────────────────────────
// Histogram Examples — UI Script
//
//  Row 1  – data: static array vs live empty          y: 20
//  Row 2  – primaryColor formats (solid, rgba, grad)  y: 220
//  Row 3  – data2: dual-channel + three colors        y: 420
//  Row 4  – bothColor behavior                        y: 620
//  Row 5  – autoRange: false (0-100) vs true          y: 820
//  Row 6  – graphStart: "left" vs "right"             y: 1020
//  Row 7  – graphOrientation: vertical vs horizontal  y: 1220
//  Row 8  – flip: false vs true                       y: 1420
//  Row 9  – Tooltip options                           y: 1620
//  Row 10 – Mouse events + drag                       y: 1820
//  Row 11 – show / pixelHitTest                       y: 2060
// ─────────────────────────────────────────────────────────────

const PAD    = 20;
const COL_W  = 460;
const COL2_X = 500;
const HH     = 140;     // histogram height
const RSEP   = 40;
const GAP    = 22;

const LBL_CLR  = "#aaaaaa";
const HEAD_CLR = "#ffffff";

function heading(id, x, y, text) {
    ui.addText({ id: id, x: x, y: y, text: text,
        fontSize: 13, fontColor: HEAD_CLR, fontWeight: 600 });
}
function caption(id, x, y, text) {
    ui.addText({ id: id, x: x, y: y, text: text,
        fontSize: 11, fontColor: LBL_CLR });
}
function lbl(id, x, y, text) {
    ui.addText({ id: id, x: x, y: y, text: text,
        fontSize: 12, fontColor: "#dddddd" });
}

// Static demo data — 460 values so it fills a full-width histogram
var STATIC = [];
for (var s = 0; s < 460; s++) {
    STATIC.push(30 + 40 * Math.abs(Math.sin(s * 0.12)) +
                20 * Math.abs(Math.sin(s * 0.05)));
}

var STATIC2 = [];
for (var s2 = 0; s2 < 460; s2++) {
    STATIC2.push(20 + 35 * Math.abs(Math.cos(s2 * 0.10)) +
                 15 * Math.abs(Math.sin(s2 * 0.07)));
}

ui.beginUpdate();

// ═══════════════════════════════════════════════════════════
// ROW 1 — data: static vs live
// ═══════════════════════════════════════════════════════════
var R1 = 20;
heading("h1", PAD, R1, "1 · data — static array vs empty (fills live, 1 value per pixel)");

// Left — pre-loaded static array
// Each element of data maps to exactly one 1px-wide column
ui.addHistogram({
    id: "ex-static", x: PAD, y: R1 + GAP,
    width: COL_W, height: HH,
    data: STATIC,          // 460 values → fills all 460px columns
    primaryColor: "#00b4ff",
    autoRange: false,
    backgroundColor: "rgba(255,255,255,0.05)",
});
caption("c1a", PAD, R1 + GAP + HH + 4,
    "data: [460 values] — each element = 1 pixel column. Columns fill left-to-right.");

// Right — live, starts empty
ui.addHistogram({
    id: "ex-live", x: COL2_X, y: R1 + GAP,
    width: COL_W, height: HH,
    data: [],              // empty on create — grows with each CPU tick
    primaryColor: "#00ff88",
    autoRange: false,
    graphStart: "right",
    backgroundColor: "rgba(255,255,255,0.05)",
});
caption("c1b", COL2_X, R1 + GAP + HH + 4,
    "data: [] — starts empty, fills with live CPU. Width = 460 → shows last 460 seconds.");

var R1_BOT = R1 + GAP + HH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 2 — primaryColor formats
// ═══════════════════════════════════════════════════════════
var R2 = R1_BOT + RSEP;
heading("h2", PAD, R2, "2 · primaryColor — solid, rgba, hex+alpha, linearGradient, radialGradient");

var R2_DATA = [
    { id: "pc-named",  color: "limegreen",                               lbl: "\"limegreen\" — named CSS color" },
    { id: "pc-hex",    color: "#ff6600",                                  lbl: "\"#ff6600\" — #RRGGBB" },
    { id: "pc-hex8",   color: "#9966ffcc",                               lbl: "\"#9966ffcc\" — #RRGGBBAA (80% opaque)" },
    { id: "pc-rgba",   color: "rgba(0,180,255,0.75)",                    lbl: "\"rgba(0,180,255,0.75)\" — float alpha" },
    { id: "pc-lgrad",  color: "linearGradient(90, #00ff88, #007744)",    lbl: "\"linearGradient(90, ...)\" — vertical gradient" },
    { id: "pc-radial", color: "radialGradient(circle, #ffaa00, #ff3300)",lbl: "\"radialGradient(circle, ...)\"" },
];

for (var i = 0; i < R2_DATA.length; i++) {
    var rh = 36;
    var ry = R2 + GAP + i * (rh + 8);
    ui.addHistogram({
        id: R2_DATA[i].id, x: PAD, y: ry,
        width: 340, height: rh,
        data: STATIC,
        primaryColor: R2_DATA[i].color,
        autoRange: false,
        backgroundColor: "rgba(255,255,255,0.05)",
    });
    lbl("rl2-" + i, PAD + 350, ry + rh / 2 - 7, R2_DATA[i].lbl);
}
var R2_BOT = R2 + GAP + R2_DATA.length * 44 + 4;
caption("c2", PAD, R2_BOT,
    "Gradient bounds = full element rect. Alpha extracted from color string automatically.");

// ═══════════════════════════════════════════════════════════
// ROW 3 — data2: dual-channel + three colors
// ═══════════════════════════════════════════════════════════
var R3 = R2_BOT + 18 + RSEP;
heading("h3", PAD, R3, "3 · data2 — dual-channel mode (primary + secondary + overlap)");

// Left — single channel (no data2) — only primaryColor
ui.addHistogram({
    id: "ex-single", x: PAD, y: R3 + GAP,
    width: COL_W, height: HH,
    data: STATIC,
    // No data2 → single channel, only primaryColor used
    primaryColor: "#00ff88",
    autoRange: false,
    backgroundColor: "rgba(255,255,255,0.05)",
});
caption("c3a", PAD, R3 + GAP + HH + 4,
    "Single channel (no data2) — only primaryColor used");

// Right — dual channel (data + data2) — three zones visible
ui.addHistogram({
    id: "ex-dual", x: COL2_X, y: R3 + GAP,
    width: COL_W, height: HH,
    data:  STATIC,    // primary dataset (CPU-like wave)
    data2: STATIC2,   // secondary dataset (MEM-like wave)
    // Zone 1: where primary > secondary → primaryColor
    primaryColor:   "#00ff88",
    // Zone 2: where secondary > primary → secondaryColor
    secondaryColor: "#00b4ff",
    // Zone 3: overlap (min of both) → bothColor
    bothColor:      "#ffaa00",
    autoRange: false,
    backgroundColor: "rgba(255,255,255,0.05)",
});
lbl("rl3a", COL2_X + 4, R3 + GAP + HH + 4, "● primaryColor  ● secondaryColor  ● bothColor (overlap)");
caption("c3b", COL2_X, R3 + GAP + HH + 18,
    "data2 enables 3-zone rendering: primary-only (green), secondary-only (blue), overlap (amber)");

var R3_BOT = R3 + GAP + HH + 34;

// ═══════════════════════════════════════════════════════════
// ROW 4 — bothColor behavior (three color variants side by side)
// ═══════════════════════════════════════════════════════════
var R4 = R3_BOT + RSEP;
heading("h4", PAD, R4, "4 · bothColor — overlap zone color. secondaryColor / primaryColor above it");

// Left — classic green/red/yellow palette (energy comparison style)
ui.addHistogram({
    id: "ex-both-classic", x: PAD, y: R4 + GAP,
    width: COL_W, height: HH,
    data:  STATIC,
    data2: STATIC2,
    primaryColor:   "#00ff00",    // bright green — primary only
    secondaryColor: "#ff3333",    // red — secondary only
    bothColor:      "#ffff00",    // yellow — overlap
    autoRange: false,
    backgroundColor: "rgba(255,255,255,0.05)",
});
caption("c4a", PAD, R4 + GAP + HH + 4,
    "Classic green/red/yellow — bothColor sits at base, primary or secondary stacks above");

// Right — gradient bothColor + transparent primary
ui.addHistogram({
    id: "ex-both-grad", x: COL2_X, y: R4 + GAP,
    width: COL_W, height: HH,
    data:  STATIC,
    data2: STATIC2,
    primaryColor:   "rgba(0,255,136,0.90)",
    secondaryColor: "rgba(0,180,255,0.90)",
    // bothColor: gradient across element rect
    bothColor: "linearGradient(90, #ff6600, #ff0080)",
    autoRange: false,
    backgroundColor: "rgba(255,255,255,0.05)",
});
caption("c4b", COL2_X, R4 + GAP + HH + 4,
    "bothColor: linearGradient — gradient spans full element rect");

var R4_BOT = R4 + GAP + HH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 5 — autoRange: false vs true
// ═══════════════════════════════════════════════════════════
var R5 = R4_BOT + RSEP;
heading("h5", PAD, R5, "5 · autoRange — fixed 0-100 scale vs data-driven scale");

// Left — autoRange: false — scale fixed 0-100
// Data ranges 30-90, so bars use 30-90% of height
ui.addHistogram({
    id: "ex-ar-fixed", x: PAD, y: R5 + GAP,
    width: COL_W, height: HH,
    data: STATIC,
    primaryColor: "#00b4ff",
    autoRange: false,    // 0-100 fixed — bars use ~30-90% of height
    backgroundColor: "rgba(255,255,255,0.05)",
});
caption("c5a", PAD, R5 + GAP + HH + 4,
    "autoRange: false — fixed 0-100. Data ~30-90 leaves empty space at top.");

// Right — autoRange: true — scale fitted to actual data min/max
ui.addHistogram({
    id: "ex-ar-auto", x: COL2_X, y: R5 + GAP,
    width: COL_W, height: HH,
    data: STATIC,
    primaryColor: "#ff6600",
    autoRange: true,     // min/max calculated from data → bars fill full height
    backgroundColor: "rgba(255,255,255,0.05)",
});
caption("c5b", COL2_X, R5 + GAP + HH + 4,
    "autoRange: true — scale from data min to max. Bars fill full height.");

var R5_BOT = R5 + GAP + HH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 6 — graphStart: "left" vs "right"
// ═══════════════════════════════════════════════════════════
var R6 = R5_BOT + RSEP;
heading("h6", PAD, R6, "6 · graphStart — which edge the newest data point is placed at");

// Left — "right": newest data at right edge (standard)
ui.addHistogram({
    id: "ex-gs-right", x: PAD, y: R6 + GAP,
    width: COL_W, height: HH,
    data: [],
    primaryColor: "#00b4ff",
    autoRange: false,
    graphStart: "right",    // newest column on the right
    backgroundColor: "rgba(255,255,255,0.05)",
});
caption("c6a", PAD, R6 + GAP + HH + 4,
    "graphStart: \"right\" — newest CPU reading at right edge, history builds left");

// Right — "left": newest data at left edge
ui.addHistogram({
    id: "ex-gs-left", x: COL2_X, y: R6 + GAP,
    width: COL_W, height: HH,
    data: [],
    primaryColor: "#ff6600",
    autoRange: false,
    graphStart: "left",     // newest column on the left
    backgroundColor: "rgba(255,255,255,0.05)",
});
caption("c6b", COL2_X, R6 + GAP + HH + 4,
    "graphStart: \"left\" — newest CPU reading at left edge");

var R6_BOT = R6 + GAP + HH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 7 — graphOrientation: "vertical" vs "horizontal"
// ═══════════════════════════════════════════════════════════
var R7 = R6_BOT + RSEP;
heading("h7", PAD, R7, "7 · graphOrientation — column axis: \"vertical\" vs \"horizontal\"");

// Left — "vertical" (default): columns, fills bottom→top
ui.addHistogram({
    id: "ex-go-vert", x: PAD, y: R7 + GAP,
    width: COL_W, height: HH,
    data: [],
    primaryColor: "#00b4ff",
    autoRange: false,
    graphStart: "right",
    graphOrientation: "vertical",    // 1px-wide columns, bars grow upward
    backgroundColor: "rgba(255,255,255,0.05)",
});
caption("c7a", PAD, R7 + GAP + HH + 4,
    "graphOrientation: \"vertical\" — 1px-wide columns, bars fill bottom→top (default)");

// Right — "horizontal": rows, bars fill right→left
// Use a tall narrow element to show the row-based layout
ui.addHistogram({
    id: "ex-go-horiz", x: COL2_X, y: R7 + GAP,
    width: 120, height: HH + 60,     // tall narrow — height = samples visible
    data: [],
    primaryColor: "#ff6600",
    autoRange: false,
    graphStart: "right",
    graphOrientation: "horizontal",  // 1px-high rows, bars grow left from right edge
    backgroundColor: "rgba(255,255,255,0.05)",
});
lbl("rl7", COL2_X + 130, R7 + GAP + 10,
    "Each row = 1 data point");
lbl("rl7b", COL2_X + 130, R7 + GAP + 30,
    "Bar grows left from");
lbl("rl7c", COL2_X + 130, R7 + GAP + 50,
    "the right edge.");
lbl("rl7d", COL2_X + 130, R7 + GAP + 70,
    "Width = value scale.");
lbl("rl7e", COL2_X + 130, R7 + GAP + 90,
    "Height = # of samples.");
caption("c7b", COL2_X, R7 + GAP + HH + 70,
    "graphOrientation: \"horizontal\" — 1px-high rows. Height = samples. Width = bar scale.");

var R7_BOT = R7 + GAP + HH + 90;

// ═══════════════════════════════════════════════════════════
// ROW 8 — flip: false vs true
// ═══════════════════════════════════════════════════════════
var R8 = R7_BOT + RSEP;
heading("h8", PAD, R8, "8 · flip — invert fill direction");

// Left — flip: false (default) — bars grow from bottom up
ui.addHistogram({
    id: "ex-flip-off", x: PAD, y: R8 + GAP,
    width: COL_W, height: HH,
    data: STATIC,
    primaryColor: "#00b4ff",
    autoRange: false,
    flip: false,     // bars fill bottom → top (default)
    backgroundColor: "rgba(255,255,255,0.05)",
});
caption("c8a", PAD, R8 + GAP + HH + 4,
    "flip: false — bars fill bottom→top (default). High values = tall column.");

// Right — flip: true — bars grow from top down
ui.addHistogram({
    id: "ex-flip-on", x: COL2_X, y: R8 + GAP,
    width: COL_W, height: HH,
    data: STATIC,
    primaryColor: "#ff6600",
    autoRange: false,
    flip: true,      // bars fill top → bottom (inverted)
    backgroundColor: "rgba(255,255,255,0.05)",
});
caption("c8b", COL2_X, R8 + GAP + HH + 4,
    "flip: true — same data, bars fill top→bottom. High values = column hanging from top.");

var R8_BOT = R8 + GAP + HH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 9 — Tooltip options
// ═══════════════════════════════════════════════════════════
var R9 = R8_BOT + RSEP;
heading("h9", PAD, R9, "9 · Tooltip options — hover each histogram to see the tooltip");

// Standard tooltip with info icon
ui.addHistogram({
    id: "ex-tt-info", x: PAD, y: R9 + GAP,
    width: COL_W, height: HH,
    data: [],
    primaryColor: "#00ff88",
    autoRange: false,
    graphStart: "right",
    backgroundColor: "rgba(255,255,255,0.05)",
    tooltipTitle: "CPU Usage History",
    tooltipText: "Each column = 1 second of CPU data.\nNewest at the right.",
    tooltipIcon: "info",
    tooltipMaxWidth: 300,
});
caption("c9a", PAD, R9 + GAP + HH + 4,
    "tooltipTitle + tooltipText + tooltipIcon: \"info\" — hover to see");

// Balloon warning tooltip
ui.addHistogram({
    id: "ex-tt-warn", x: COL2_X, y: R9 + GAP,
    width: COL_W, height: HH,
    data:  [],
    data2: [],
    primaryColor:   "#00ff88",
    secondaryColor: "#00b4ff",
    bothColor:      "#ffaa00",
    autoRange: false,
    graphStart: "right",
    backgroundColor: "rgba(255,255,255,0.05)",
    tooltipTitle: "CPU vs Memory",
    tooltipText: "Green = CPU only\nBlue = Memory only\nAmber = Both high",
    tooltipIcon: "warning",
    tooltipBalloon: true,
});
caption("c9b", COL2_X, R9 + GAP + HH + 4,
    "tooltipBalloon: true · tooltipIcon: \"warning\" — balloon style");

var R9_BOT = R9 + GAP + HH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 10 — Mouse event callbacks
// ═══════════════════════════════════════════════════════════
var R10 = R9_BOT + RSEP;
heading("h10", PAD, R10, "10 · Mouse event callbacks — click, hover, scroll, drag");

// Shared status label
ui.addText({
    id: "mouse-status",
    x: PAD, y: R10 + GAP,
    text: "Interact with the histograms below — events appear here",
    fontSize: 12, fontColor: "#ffdd44",
});

function setStatus(msg) {
    ui.setElementProperties("mouse-status", { text: msg });
}

// Left — click + hover + scroll
ui.addHistogram({
    id: "ex-mc-click", x: PAD, y: R10 + GAP + 24,
    width: COL_W, height: HH,
    data: STATIC,
    primaryColor: "#00b4ff",
    autoRange: false,
    backgroundColor: "rgba(0,60,120,0.30)",
    mouseEventCursor: true, mouseEventCursorName: "hand",
    tooltipTitle: "Clickable Histogram",
    tooltipText: "Left/right click · double-click · hover · scroll wheel",
    tooltipIcon: "info",
    // onLeftMouseUp: left button released
    onLeftMouseUp: function () {
        setStatus("ex-mc-click → onLeftMouseUp (left click)");
    },
    // onLeftMouseDown: left button pressed
    onLeftMouseDown: function () {
        setStatus("ex-mc-click → onLeftMouseDown (pressed)");
    },
    // onLeftDoubleClick: double-click
    onLeftDoubleClick: function () {
        setStatus("ex-mc-click → onLeftDoubleClick! (double-clicked)");
    },
    // onRightMouseUp: right click
    onRightMouseUp: function () {
        setStatus("ex-mc-click → onRightMouseUp (right click)");
    },
    // onMouseOver: cursor enters — tint histogram white
    onMouseOver: function () {
        ui.setElementProperties("ex-mc-click", { primaryColor: "#ffffff" });
        setStatus("ex-mc-click → onMouseOver (columns turned white)");
    },
    // onMouseLeave: cursor exits — restore color
    onMouseLeave: function () {
        ui.setElementProperties("ex-mc-click", { primaryColor: "#00b4ff" });
        setStatus("ex-mc-click → onMouseLeave (colour restored)");
    },
    // onScrollUp / onScrollDown: mouse wheel
    onScrollUp: function () {
        setStatus("ex-mc-click → onScrollUp (wheel up)");
    },
    onScrollDown: function () {
        setStatus("ex-mc-click → onScrollDown (wheel down)");
    },
});
caption("c10a", PAD, R10 + GAP + 24 + HH + 4,
    "Left/right/double-click · hover changes colour · scroll wheel");

// Right — drag: __offsetXPercent tracks horizontal position
ui.addHistogram({
    id: "ex-mc-drag", x: COL2_X, y: R10 + GAP + 24,
    width: COL_W, height: HH,
    data: STATIC,
    primaryColor: "#ff6600",
    autoRange: false,
    backgroundColor: "rgba(80,30,0,0.30)",
    mouseEventCursor: true, mouseEventCursorName: "size_we",
    tooltipTitle: "Drag Histogram",
    tooltipText: "Drag to inspect column position.\n__offsetXPercent = column index %",
    tooltipIcon: "info",
    // onDragStart: drag begins — highlight
    onDragStart: function (e) {
        ui.setElementProperties("ex-mc-drag", { primaryColor: "#ffffff" });
        setStatus("onDragStart  x:" + e.__offsetX + "px  col:" +
                  e.__offsetXPercent + "%  y:" + e.__offsetYPercent + "%");
    },
    // onDrag: fires continuously — __offsetXPercent / 100 = column fraction
    onDrag: function (e) {
        setStatus("onDrag  x:" + e.__offsetX + "px  col:" + e.__offsetXPercent +
                  "%  y:" + e.__offsetYPercent + "% (value ≈ " +
                  Math.round(100 - e.__offsetYPercent) + "%)");
    },
    // onDragEnd: restore colour
    onDragEnd: function () {
        ui.setElementProperties("ex-mc-drag", { primaryColor: "#ff6600" });
        setStatus("onDragEnd — released");
    },
    // onMiddleMouseUp: middle button
    onMiddleMouseUp: function () {
        setStatus("onMiddleMouseUp fired");
    },
});
caption("c10b", COL2_X, R10 + GAP + 24 + HH + 4,
    "Drag shows column index (__offsetXPercent) and approx value (__offsetYPercent)");

var R10_BOT = R10 + GAP + 24 + HH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 11 — show / pixelHitTest
// ═══════════════════════════════════════════════════════════
var R11 = R10_BOT + RSEP;
heading("h11", PAD, R11, "11 · show / pixelHitTest — visibility toggle & pixel-accurate clicks");

// show/hide toggle
ui.addHistogram({
    id: "ex-show", x: PAD, y: R11 + GAP,
    width: COL_W - 86, height: HH,
    data: STATIC,
    primaryColor: "#9966ff",
    autoRange: false,
    backgroundColor: "rgba(153,102,255,0.15)",
    show: true,
});
ui.addText({
    id: "btn-show",
    x: PAD + COL_W - 80, y: R11 + GAP + HH / 2 - 12,
    text: "Hide", fontSize: 13, fontColor: "#ffffff",
    backgroundColor: "rgba(100,70,200,0.75)",
    backgroundColorRadius: 6, padding: [10, 6, 10, 6],
    mouseEventCursor: true, mouseEventCursorName: "hand",
    onLeftMouseUp: function () {
        var vis  = ui.getElementProperty("ex-show", "show");
        var next = !vis;
        ui.setElementProperties("ex-show",  { show: next });
        ui.setElementProperties("btn-show", { text: next ? "Hide" : "Show" });
        setStatus("ex-show → show: " + next);
    },
});
caption("c11a", PAD, R11 + GAP + HH + 6,
    "show: false hides without removing the element from memory");

// pixelHitTest — click only fires on drawn columns, not empty bounding box
// Low-value data — columns only reach ~15% of height, top 85% is empty
var LOW_DATA = [];
for (var p = 0; p < 460; p++) LOW_DATA.push(10 + 5 * Math.abs(Math.sin(p * 0.15)));

ui.addHistogram({
    id: "ex-pht", x: COL2_X, y: R11 + GAP,
    width: COL_W, height: HH,
    data: LOW_DATA,
    primaryColor: "#00ff88",
    autoRange: false,
    // pixelHitTest: true — click only registers on drawn pixel columns
    // clicking the large empty area at the top does nothing
    pixelHitTest: true,
    mouseEventCursor: true, mouseEventCursorName: "cross",
    onLeftMouseUp: function () {
        setStatus("ex-pht → clicked ON a drawn column — pixelHitTest confirmed");
    },
    tooltipTitle: "pixelHitTest: true",
    tooltipText: "Columns are 10-15% of height.\nClicking the empty top area fires nothing.\nClick directly on the green columns.",
    tooltipIcon: "info",
});
caption("c11b", COL2_X, R11 + GAP + HH + 6,
    "pixelHitTest: true · columns at 10-15% height — top 85% ignores clicks");

// ═══════════════════════════════════════════════════════════
// Close batch — everything above rendered in one pass
// ═══════════════════════════════════════════════════════════
ui.endUpdate();


// ═══════════════════════════════════════════════════════════
// LIVE DATA LISTENER
// Receives "data:tick" from index.js every second
// ═══════════════════════════════════════════════════════════
ipcRenderer.on("data:tick", function (event, payloadArg) {
    var raw = (payloadArg === undefined) ? event : payloadArg;
    var d;
    try { d = JSON.parse(raw); } catch (e) { return; }

    ui.beginUpdate();
    // Row 1 right — live empty fill
    ui.setElementProperties("ex-live", {
        data: d.cpuHistory,
    });
    ui.setElementProperties("c1b", {
        text: "data: [] live — CPU " + d.cpu.toFixed(1) + "% · " +
              d.cpuHistory.length + " pts collected",
    });

    // Row 6 — graphStart comparison (live)
    ui.setElementProperties("ex-gs-right", { data: d.cpuHistory });
    ui.setElementProperties("ex-gs-left",  { data: d.cpuHistory });

    // Row 7 — graphOrientation comparison (live)
    ui.setElementProperties("ex-go-vert",  { data: d.cpuHistory });
    ui.setElementProperties("ex-go-horiz", { data: d.cpuHistory });

    // Row 9 — tooltip histograms (live)
    ui.setElementProperties("ex-tt-info", { data: d.cpuHistory });
    ui.setElementProperties("ex-tt-warn", {
        data:  d.cpuHistory,
        data2: d.memHistory,
        tooltipText: "CPU: " + d.cpu.toFixed(1) +
                     "%\nMEM: " + d.mem.toFixed(1) + "%",
    });
    ui.endUpdate();
});
