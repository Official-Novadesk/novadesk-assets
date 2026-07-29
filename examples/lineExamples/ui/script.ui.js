// ─────────────────────────────────────────────────────────────
// Line Examples — UI Script
//
//  Row 1  – data: static array vs live empty          y: 20
//  Row 2  – lineColor: solid, rgba, hex, gradient     y: 220
//  Row 3  – lineWidth: 1 → 5                          y: 420
//  Row 4  – lineCount: multi-line overlay             y: 620
//  Row 5  – lineScale: per-line multiplier            y: 820
//  Row 6  – rangeMin / rangeMax / autoRange           y: 1020
//  Row 7  – maxPoints: rolling window                 y: 1220
//  Row 8  – graphStart: "left" vs "right"             y: 1420
//  Row 9  – graphOrientation: vertical vs horizontal  y: 1620
//  Row 10 – flip                                      y: 1820
//  Row 11 – horizontalLines / horizontalLineColor     y: 2020
//  Row 12 – transformStroke: "normal" vs "fixed"      y: 2220
//  Row 13 – Tooltip + Mouse events + show/pixelHitTest y: 2420
// ─────────────────────────────────────────────────────────────

const PAD    = 20;
const COL_W  = 460;
const COL2_X = 500;
const LH     = 150;    // line graph height
const RSEP   = 40;     // row separator
const GAP    = 22;     // heading → first element

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

// Static wave-like demo data
const STATIC = [20,35,55,40,70,60,80,50,90,65,75,45,60,30,50,40,70,55,35,20];

ui.beginUpdate();

// ═══════════════════════════════════════════════════════════
// ROW 1 — data: static array vs live empty
// ═══════════════════════════════════════════════════════════
var R1 = 20;
heading("h1", PAD, R1, "1 · data — static array vs empty array (fills live)");

// Left — pre-loaded static array
ui.addLine({
    id: "ex-data-static", x: PAD, y: R1 + GAP,
    width: COL_W, height: LH,
    // data: pass any array of numbers — plotted in order, index 0 at oldest end
    data:      STATIC,
    rangeMin:  0, rangeMax: 100,
    lineColor: "#00b4ff", lineWidth: 2,
    backgroundColor: "rgba(255,255,255,0.05)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
});
caption("c1a", PAD, R1 + GAP + LH + 4,
    "data: [...20 values] — plotted immediately on startup");

// Right — starts empty, fills tick by tick
ui.addLine({
    id: "ex-data-live", x: COL2_X, y: R1 + GAP,
    width: COL_W, height: LH,
    // Empty on creation — updated each second via setElementProperties
    data:       [],
    rangeMin:   0, rangeMax: 100,
    maxPoints:  20,
    graphStart: "right",
    lineColor:  "#00ff88", lineWidth: 2,
    backgroundColor: "rgba(255,255,255,0.05)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
});
caption("c1b", COL2_X, R1 + GAP + LH + 4,
    "data: [] — starts empty, fills with live CPU each second");

var R1_BOT = R1 + GAP + LH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 2 — lineColor formats
// ═══════════════════════════════════════════════════════════
var R2 = R1_BOT + RSEP;
heading("h2", PAD, R2, "2 · lineColor — named, hex, rgba, linearGradient, radialGradient");

var R2_LINES = [
    { id: "lc-named",   color: "dodgerblue",                              lbl: "\"dodgerblue\" — CSS named color" },
    { id: "lc-hex",     color: "#ff6600",                                  lbl: "\"#ff6600\" — #RRGGBB" },
    { id: "lc-hex8",    color: "#9966ffcc",                               lbl: "\"#9966ffcc\" — #RRGGBBAA (80% opaque)" },
    { id: "lc-rgba",    color: "rgba(0,255,136,0.70)",                    lbl: "\"rgba(0,255,136,0.70)\" — float alpha" },
    { id: "lc-grad",    color: "linearGradient(0, #ff0080, #00b4ff)",     lbl: "\"linearGradient(0, pink, blue)\"" },
    { id: "lc-radial",  color: "radialGradient(circle, #ffffff, #9966ff)",lbl: "\"radialGradient(circle, white, purple)\"" },
];

for (var i = 0; i < R2_LINES.length; i++) {
    var lineH = 38;
    var ly = R2 + GAP + i * (lineH + 8);
    ui.addLine({
        id: R2_LINES[i].id, x: PAD, y: ly,
        width: 340, height: lineH,
        data: STATIC,
        rangeMin: 0, rangeMax: 100,
        lineColor: R2_LINES[i].color, lineWidth: 2,
        backgroundColor: "rgba(255,255,255,0.05)",
    });
    lbl("ll2-" + i, PAD + 350, ly + lineH / 2 - 7, R2_LINES[i].lbl);
}
var R2_BOT = R2 + GAP + R2_LINES.length * 46 + 4;
caption("c2", PAD, R2_BOT,
    "Gradient bounds = full element rect. Alpha is extracted from the color string automatically.");

// ═══════════════════════════════════════════════════════════
// ROW 3 — lineWidth: 1 → 5
// ═══════════════════════════════════════════════════════════
var R3 = R2_BOT + 18 + RSEP;
heading("h3", PAD, R3, "3 · lineWidth — stroke thickness in pixels (min: 1)");

var WIDTHS = [1, 2, 3, 5];
for (var w = 0; w < WIDTHS.length; w++) {
    var wh = 40;
    var wy = R3 + GAP + w * (wh + 8);
    ui.addLine({
        id: "lw-" + w, x: PAD, y: wy,
        width: COL_W, height: wh,
        data: STATIC,
        rangeMin: 0, rangeMax: 100,
        lineColor: "#00b4ff", lineWidth: WIDTHS[w],
        backgroundColor: "rgba(255,255,255,0.05)",
    });
    lbl("lwl-" + w, COL2_X, wy + wh / 2 - 7,
        "lineWidth: " + WIDTHS[w] + (WIDTHS[w] === 1 ? " — minimum / default" : ""));
}
var R3_BOT = R3 + GAP + WIDTHS.length * 48 + 4;
caption("c3", PAD, R3_BOT,
    "Values below 1 are clamped to 1 at parse time. Also affects pixelHitTest click tolerance.");

// ═══════════════════════════════════════════════════════════
// ROW 4 — lineCount: multi-line overlay
// ═══════════════════════════════════════════════════════════
var R4 = R3_BOT + 18 + RSEP;
heading("h4", PAD, R4, "4 · lineCount — multiple lines on one graph");

// Left — 2 lines (CPU + Memory)
ui.addLine({
    id: "ex-dual", x: PAD, y: R4 + GAP,
    width: COL_W, height: LH,
    // lineCount: 2 — enables data2, lineColor2
    lineCount:  2,
    data:       [],     // line 1: CPU (updated live)
    data2:      [],     // line 2: Memory (updated live)
    lineColor:  "#00b4ff",   // line 1 color
    lineColor2: "#00ff88",   // line 2 color
    lineWidth:  2,
    rangeMin: 0, rangeMax: 100,
    maxPoints: 30,
    graphStart: "right",
    backgroundColor: "rgba(255,255,255,0.05)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
});
lbl("ll4a", PAD + 4, R4 + GAP + 4, "● CPU");
lbl("ll4b", PAD + 60, R4 + GAP + 4, "● MEM");
caption("c4a", PAD, R4 + GAP + LH + 4,
    "lineCount: 2 · data + data2 · lineColor + lineColor2 — 2 lines, 1 element");

// Right — 3 lines (CPU, Memory, Wave)
ui.addLine({
    id: "ex-triple", x: COL2_X, y: R4 + GAP,
    width: COL_W, height: LH,
    lineCount:  3,
    data:       [],
    data2:      [],
    data3:      [],
    lineColor:  "#00b4ff",
    lineColor2: "#00ff88",
    lineColor3: "linearGradient(0, #ff0080, #ffaa00)",
    lineWidth:  2,
    rangeMin: 0, rangeMax: 100,
    maxPoints: 30,
    graphStart: "right",
    backgroundColor: "rgba(255,255,255,0.05)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
});
lbl("ll4c", COL2_X + 4, R4 + GAP + 4, "● CPU  ● MEM  ● Wave");
caption("c4b", COL2_X, R4 + GAP + LH + 4,
    "lineCount: 3 · data + data2 + data3 · lineColor3 with gradient");

var R4_BOT = R4 + GAP + LH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 5 — lineScale: per-line multiplier
// ═══════════════════════════════════════════════════════════
var R5 = R4_BOT + RSEP;
heading("h5", PAD, R5, "5 · lineScale — per-line value multiplier before Y-axis mapping");

// Left — same data, lineScale1=1.0 vs lineScale2=0.5
// Both lines use same CPU data but line2 appears at half height
ui.addLine({
    id: "ex-scale-half", x: PAD, y: R5 + GAP,
    width: COL_W, height: LH,
    lineCount:  2,
    data:       STATIC,
    data2:      STATIC,
    lineColor:  "#00b4ff",
    lineColor2: "#ff6600",
    // lineScale: 1.0 — values used as-is
    lineScale:  1.0,
    // lineScale2: 0.5 — every value halved before plotting
    lineScale2: 0.5,
    lineWidth:  2,
    rangeMin: 0, rangeMax: 100,
    backgroundColor: "rgba(255,255,255,0.05)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
});
caption("c5a", PAD, R5 + GAP + LH + 4,
    "Same data: lineScale: 1.0 (blue) vs lineScale2: 0.5 (orange) — orange appears at half height");

// Right — mixing units: bytes and KB on same graph
// lineScale converts bytes to KB so both lines fit 0-100 KB scale
var bytesData = [10000, 25000, 45000, 30000, 60000, 75000, 50000, 40000,
                 80000, 65000, 90000, 70000, 85000, 60000, 40000, 55000];
var kbData    = [10, 25, 45, 30, 60, 75, 50, 40, 80, 65, 90, 70, 85, 60, 40, 55];

ui.addLine({
    id: "ex-scale-units", x: COL2_X, y: R5 + GAP,
    width: COL_W, height: LH,
    lineCount:  2,
    data:       bytesData,   // bytes/sec
    data2:      kbData,      // KB/sec (same actual values)
    lineColor:  "#9966ff",
    lineColor2: "#ff6600",
    // lineScale: 0.001 converts bytes → KB so both fit 0-100 KB scale
    lineScale:  0.001,
    lineScale2: 1.0,
    lineWidth:  2,
    rangeMin: 0, rangeMax: 100,
    backgroundColor: "rgba(255,255,255,0.05)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
});
caption("c5b", COL2_X, R5 + GAP + LH + 4,
    "lineScale: 0.001 converts bytes→KB (purple). lineScale2: 1.0 already in KB (orange). Lines overlap.");

var R5_BOT = R5 + GAP + LH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 6 — rangeMin / rangeMax / autoRange
// ═══════════════════════════════════════════════════════════
var R6 = R5_BOT + RSEP;
heading("h6", PAD, R6, "6 · rangeMin / rangeMax / autoRange — Y-axis scale control");

// Left — fixed 0-100 scale (data 30-70 uses only middle portion)
ui.addLine({
    id: "ex-range-fixed", x: PAD, y: R6 + GAP,
    width: COL_W, height: LH,
    data: [30,35,40,50,45,60,55,65,70,60,55,50,45,40,35],
    rangeMin:  0,
    rangeMax:  100,
    autoRange: false,
    lineColor: "#00b4ff", lineWidth: 2,
    backgroundColor: "rgba(255,255,255,0.05)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
});
caption("c6a", PAD, R6 + GAP + LH + 4,
    "autoRange: false · rangeMin: 0 · rangeMax: 100 — data 30-70 uses middle portion only");

// Right — autoRange: true (data fills full height)
ui.addLine({
    id: "ex-range-auto", x: COL2_X, y: R6 + GAP,
    width: COL_W, height: LH,
    data: [30,35,40,50,45,60,55,65,70,60,55,50,45,40,35],
    rangeMin:  0,    // ignored
    rangeMax:  100,  // ignored
    autoRange: true,
    lineColor: "#ff6600", lineWidth: 2,
    backgroundColor: "rgba(255,255,255,0.05)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
});
caption("c6b", COL2_X, R6 + GAP + LH + 4,
    "autoRange: true — min/max calculated from data (30-70), line fills full height");

var R6_BOT = R6 + GAP + LH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 7 — maxPoints: rolling window
// ═══════════════════════════════════════════════════════════
var R7 = R6_BOT + RSEP;
heading("h7", PAD, R7, "7 · maxPoints — rolling window size (0 = unlimited)");

// Left — maxPoints: 10 (only last 10 visible)
ui.addLine({
    id: "ex-mp-10", x: PAD, y: R7 + GAP,
    width: COL_W, height: LH,
    data: [], rangeMin: 0, rangeMax: 100,
    maxPoints: 10,
    graphStart: "right",
    lineColor: "#00b4ff", lineWidth: 2,
    backgroundColor: "rgba(255,255,255,0.05)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
});
caption("c7a", PAD, R7 + GAP + LH + 4,
    "maxPoints: 10 — wider point spacing, shows only last 10 CPU values");

// Right — maxPoints: 40 (denser, longer history)
ui.addLine({
    id: "ex-mp-40", x: COL2_X, y: R7 + GAP,
    width: COL_W, height: LH,
    data: [], rangeMin: 0, rangeMax: 100,
    maxPoints: 40,
    graphStart: "right",
    lineColor: "#00ff88", lineWidth: 2,
    backgroundColor: "rgba(255,255,255,0.05)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
});
caption("c7b", COL2_X, R7 + GAP + LH + 4,
    "maxPoints: 40 — tighter spacing, shows last 40 CPU values");

var R7_BOT = R7 + GAP + LH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 8 — graphStart: "left" vs "right"
// ═══════════════════════════════════════════════════════════
var R8 = R7_BOT + RSEP;
heading("h8", PAD, R8, "8 · graphStart — which edge newest data appears on");

// Left — "right" (default): newest on right, history scrolls left
ui.addLine({
    id: "ex-gs-right", x: PAD, y: R8 + GAP,
    width: COL_W, height: LH,
    data: [], rangeMin: 0, rangeMax: 100,
    maxPoints: 20,
    graphStart: "right",   // newest point anchored to right edge
    lineColor: "#00b4ff", lineWidth: 2,
    backgroundColor: "rgba(255,255,255,0.05)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
});
caption("c8a", PAD, R8 + GAP + LH + 4,
    "graphStart: \"right\" — newest CPU value always at the right edge (standard)");

// Right — "left": newest on left, history scrolls right
ui.addLine({
    id: "ex-gs-left", x: COL2_X, y: R8 + GAP,
    width: COL_W, height: LH,
    data: [], rangeMin: 0, rangeMax: 100,
    maxPoints: 20,
    graphStart: "left",    // newest point anchored to left edge
    lineColor: "#ff6600", lineWidth: 2,
    backgroundColor: "rgba(255,255,255,0.05)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
});
caption("c8b", COL2_X, R8 + GAP + LH + 4,
    "graphStart: \"left\" — newest CPU value always at the left edge");

var R8_BOT = R8 + GAP + LH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 9 — graphOrientation: "vertical" vs "horizontal"
// ═══════════════════════════════════════════════════════════
var R9 = R8_BOT + RSEP;
heading("h9", PAD, R9, "9 · graphOrientation — vertical (X=time) vs horizontal (Y=time)");

// Left — "vertical" (default): time on X axis, values on Y
ui.addLine({
    id: "ex-go-vert", x: PAD, y: R9 + GAP,
    width: COL_W, height: LH,
    data: [], rangeMin: 0, rangeMax: 100,
    maxPoints: 30,
    graphStart: "right",
    graphOrientation: "vertical",   // standard left→right scroll
    lineColor: "#00b4ff", lineWidth: 2,
    backgroundColor: "rgba(255,255,255,0.05)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
});
caption("c9a", PAD, R9 + GAP + LH + 4,
    "graphOrientation: \"vertical\" — standard horizontal time-series (default)");

// Right — "horizontal": time on Y axis, values on X (vertical scrolling bar)
ui.addLine({
    id: "ex-go-horiz", x: COL2_X + 180, y: R9 + GAP,
    width: 60, height: LH,     // tall narrow column
    data: [], rangeMin: 0, rangeMax: 100,
    maxPoints: 30,
    graphOrientation: "horizontal",  // data scrolls vertically
    graphStart: "right",
    lineColor: "#ff6600", lineWidth: 2,
    backgroundColor: "rgba(255,255,255,0.05)",
});
caption("c9b", COL2_X, R9 + GAP + LH + 4,
    "graphOrientation: \"horizontal\" — data scrolls downward (narrow vertical column)");

var R9_BOT = R9 + GAP + LH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 10 — flip: invert the value axis
// ═══════════════════════════════════════════════════════════
var R10 = R9_BOT + RSEP;
heading("h10", PAD, R10, "10 · flip — invert the value axis");

// Left — flip: false (high values at top, default)
ui.addLine({
    id: "ex-flip-off", x: PAD, y: R10 + GAP,
    width: COL_W, height: LH,
    data: STATIC, rangeMin: 0, rangeMax: 100,
    lineColor: "#00b4ff", lineWidth: 2,
    flip: false,    // high values at top (normal)
    backgroundColor: "rgba(255,255,255,0.05)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
});
caption("c10a", PAD, R10 + GAP + LH + 4,
    "flip: false — high values appear at the TOP (default)");

// Right — flip: true (high values at bottom)
ui.addLine({
    id: "ex-flip-on", x: COL2_X, y: R10 + GAP,
    width: COL_W, height: LH,
    data: STATIC, rangeMin: 0, rangeMax: 100,
    lineColor: "#ff6600", lineWidth: 2,
    flip: true,     // high values at bottom (inverted)
    backgroundColor: "rgba(255,255,255,0.05)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
});
caption("c10b", COL2_X, R10 + GAP + LH + 4,
    "flip: true — same data but Y axis inverted, high values at BOTTOM");

var R10_BOT = R10 + GAP + LH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 11 — horizontalLines / horizontalLineColor
// ═══════════════════════════════════════════════════════════
var R11 = R10_BOT + RSEP;
heading("h11", PAD, R11, "11 · horizontalLines / horizontalLineColor — 4 reference lines");

// Left — no horizontal lines
ui.addLine({
    id: "ex-hl-off", x: PAD, y: R11 + GAP,
    width: COL_W, height: LH,
    data: STATIC, rangeMin: 0, rangeMax: 100,
    lineColor: "#00b4ff", lineWidth: 2,
    horizontalLines: false,    // no reference lines
    backgroundColor: "rgba(255,255,255,0.05)",
});
caption("c11a", PAD, R11 + GAP + LH + 4,
    "horizontalLines: false — clean, no reference lines");

// Right — horizontal lines with visible color
ui.addLine({
    id: "ex-hl-on", x: COL2_X, y: R11 + GAP,
    width: COL_W, height: LH,
    data: STATIC, rangeMin: 0, rangeMax: 100,
    lineColor: "#00ff88", lineWidth: 2,
    // horizontalLines: true — draws 4 lines dividing height into 5 zones
    horizontalLines: true,
    // horizontalLineColor: color of the 4 reference lines
    horizontalLineColor: "rgba(255,255,255,0.30)",
    backgroundColor: "rgba(255,255,255,0.05)",
});
caption("c11b", COL2_X, R11 + GAP + LH + 4,
    "horizontalLines: true · horizontalLineColor: rgba(255,255,255,0.30) — 4 lines, always 1px thick");

var R11_BOT = R11 + GAP + LH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 12 — transformStroke: "normal" vs "fixed"
// ═══════════════════════════════════════════════════════════
var R12 = R11_BOT + RSEP;
heading("h12", PAD, R12, "12 · transformStroke — how stroke width behaves under transforms");

// Left — "normal": stroke scales with transformMatrix
ui.addLine({
    id: "ex-ts-normal", x: PAD, y: R12 + GAP,
    width: COL_W, height: LH,
    data: STATIC, rangeMin: 0, rangeMax: 100,
    lineColor: "#00b4ff", lineWidth: 2,
    // transformStroke: "normal" — stroke scales with the transform (default)
    // lineWidth: 2 with scale 1.5× → rendered as ~3px
    transformStroke: "normal",
    transformMatrix: [1.5, 0, 0, 1, 0, 0],    // horizontal stretch 1.5×
    backgroundColor: "rgba(255,255,255,0.05)",
});
caption("c12a", PAD, R12 + GAP + LH + 4,
    "transformStroke: \"normal\" + 1.5× horizontal stretch — stroke scales up to ~3px");

// Right — "fixed": stroke always exactly lineWidth pixels
ui.addLine({
    id: "ex-ts-fixed", x: COL2_X, y: R12 + GAP,
    width: COL_W, height: LH,
    data: STATIC, rangeMin: 0, rangeMax: 100,
    lineColor: "#ff6600", lineWidth: 2,
    // transformStroke: "fixed" — stroke stays exactly 2px regardless of transform
    transformStroke: "fixed",
    transformMatrix: [1.5, 0, 0, 1, 0, 0],    // same stretch
    backgroundColor: "rgba(255,255,255,0.05)",
});
caption("c12b", COL2_X, R12 + GAP + LH + 4,
    "transformStroke: \"fixed\" + same 1.5× stretch — stroke stays exactly 2px");

var R12_BOT = R12 + GAP + LH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 13 — Tooltip options
// ═══════════════════════════════════════════════════════════
var R13 = R12_BOT + RSEP;
heading("h13", PAD, R13, "13 · Tooltip options — hover each line to see the tooltip");

// Standard tooltip with title + info icon
ui.addLine({
    id: "ex-tt-info", x: PAD, y: R13 + GAP,
    width: COL_W, height: LH,
    data: STATIC, rangeMin: 0, rangeMax: 100,
    lineColor: "#00b4ff", lineWidth: 2,
    backgroundColor: "rgba(255,255,255,0.05)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
    tooltipTitle: "CPU Usage History",
    tooltipText: "Shows the last 20 CPU readings.\nHover to see this tooltip.",
    tooltipIcon: "info",
    tooltipMaxWidth: 300,
});
caption("c13a", PAD, R13 + GAP + LH + 4,
    "tooltipTitle + tooltipText + tooltipIcon: \"info\" — hover to see");

// Balloon tooltip with warning icon
ui.addLine({
    id: "ex-tt-warn", x: COL2_X, y: R13 + GAP,
    width: COL_W, height: LH,
    data: STATIC, rangeMin: 0, rangeMax: 100,
    lineColor: "#ff3333", lineWidth: 2,
    backgroundColor: "rgba(255,255,255,0.05)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
    tooltipTitle: "High CPU Detected",
    tooltipText: "CPU is running hot.\nConsider closing background apps.",
    tooltipIcon: "warning",
    tooltipBalloon: true,
    tooltipDisabled: false,
});
caption("c13b", COL2_X, R13 + GAP + LH + 4,
    "tooltipBalloon: true · tooltipIcon: \"warning\" — hover to see balloon");

var R13_BOT = R13 + GAP + LH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 14 — Mouse event callbacks
// ═══════════════════════════════════════════════════════════
var R14 = R13_BOT + RSEP;
heading("h14", PAD, R14, "14 · Mouse event callbacks — click, hover, scroll, drag on lines");

// Shared status label updated by all callbacks
ui.addText({
    id: "mouse-status",
    x: PAD, y: R14 + GAP,
    text: "Interact with the line graphs below — events appear here",
    fontSize: 12, fontColor: "#ffdd44",
});

function setStatus(msg) {
    ui.setElementProperties("mouse-status", { text: msg });
}

// Left — click + hover color change
ui.addLine({
    id: "ex-mc-click", x: PAD, y: R14 + GAP + 24,
    width: COL_W, height: LH,
    data: STATIC, rangeMin: 0, rangeMax: 100,
    lineColor: "#00b4ff", lineWidth: 2,
    backgroundColor: "rgba(0,60,120,0.30)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
    mouseEventCursor: true, mouseEventCursorName: "hand",
    tooltipTitle: "Clickable Line",
    tooltipText: "Left/right click · double-click · hover · scroll wheel",
    tooltipIcon: "info",
    // onLeftMouseUp fires when left button is released on the element
    onLeftMouseUp: function () {
        setStatus("ex-mc-click → onLeftMouseUp (left click)");
    },
    // onLeftMouseDown fires when left button is pressed
    onLeftMouseDown: function () {
        setStatus("ex-mc-click → onLeftMouseDown (pressed)");
    },
    // onLeftDoubleClick fires on a double-click
    onLeftDoubleClick: function () {
        setStatus("ex-mc-click → onLeftDoubleClick! (double-clicked)");
    },
    // onRightMouseUp fires on right click
    onRightMouseUp: function () {
        setStatus("ex-mc-click → onRightMouseUp (right click)");
    },
    // onMouseOver fires once when cursor enters — change line color
    onMouseOver: function () {
        ui.setElementProperties("ex-mc-click", { lineColor: "#ffffff" });
        setStatus("ex-mc-click → onMouseOver (line turned white)");
    },
    // onMouseLeave fires once when cursor exits — restore color
    onMouseLeave: function () {
        ui.setElementProperties("ex-mc-click", { lineColor: "#00b4ff" });
        setStatus("ex-mc-click → onMouseLeave (colour restored)");
    },
    // onScrollUp / onScrollDown fire on mouse wheel
    onScrollUp: function () {
        setStatus("ex-mc-click → onScrollUp (wheel up)");
    },
    onScrollDown: function () {
        setStatus("ex-mc-click → onScrollDown (wheel down)");
    },
});
caption("c14a", PAD, R14 + GAP + 24 + LH + 4,
    "Left/right/double-click · hover changes colour · scroll wheel");

// Right — drag events — drag position shown in status
ui.addLine({
    id: "ex-mc-drag", x: COL2_X, y: R14 + GAP + 24,
    width: COL_W, height: LH,
    data: STATIC, rangeMin: 0, rangeMax: 100,
    lineColor: "#ff6600", lineWidth: 2,
    backgroundColor: "rgba(80,30,0,0.30)",
    horizontalLines: true,
    horizontalLineColor: "rgba(255,255,255,0.10)",
    mouseEventCursor: true, mouseEventCursorName: "size_we",
    tooltipTitle: "Drag Line",
    tooltipText: "Drag left/right to see event data.\nMiddle-click to log Y percent.",
    tooltipIcon: "info",
    // onDragStart: drag begins — highlight line
    onDragStart: function (e) {
        ui.setElementProperties("ex-mc-drag", { lineColor: "#ffffff" });
        setStatus("onDragStart  x:" + e.__offsetX + "px  y:" + e.__offsetY +
                  "px  (" + e.__offsetXPercent + "% · " + e.__offsetYPercent + "%)");
    },
    // onDrag: fires continuously — shows live position
    // __offsetXPercent and __offsetYPercent are integers 0-100
    onDrag: function (e) {
        setStatus("onDrag  x:" + e.__offsetX + "px  y:" + e.__offsetY +
                  "px  (" + e.__offsetXPercent + "% · " + e.__offsetYPercent + "%)");
    },
    // onDragEnd: drag released — restore colour
    onDragEnd: function () {
        ui.setElementProperties("ex-mc-drag", { lineColor: "#ff6600" });
        setStatus("onDragEnd — released (colour restored)");
    },
    // onMiddleMouseUp: middle mouse button
    onMiddleMouseUp: function () {
        setStatus("onMiddleMouseUp fired on drag line");
    },
});
caption("c14b", COL2_X, R14 + GAP + 24 + LH + 4,
    "Drag to see __offsetX / __offsetXPercent · __offsetYPercent (0-100 int) · middle-click");

var R14_BOT = R14 + GAP + 24 + LH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 15 — show / pixelHitTest
// ═══════════════════════════════════════════════════════════
var R15 = R14_BOT + RSEP;
heading("h15", PAD, R15, "15 · show / pixelHitTest — visibility toggle & line-accurate clicks");

// show / hide toggle
ui.addLine({
    id: "ex-show", x: PAD, y: R15 + GAP,
    width: COL_W - 86, height: LH,
    data: STATIC, rangeMin: 0, rangeMax: 100,
    lineColor: "#9966ff", lineWidth: 2,
    backgroundColor: "rgba(153,102,255,0.15)",
    show: true,
});
ui.addText({
    id: "btn-show",
    x: PAD + COL_W - 80, y: R15 + GAP + LH / 2 - 12,
    text: "Hide", fontSize: 13, fontColor: "#ffffff",
    backgroundColor: "rgba(100,70,200,0.75)",
    backgroundColorRadius: 6, padding: [10, 6, 10, 6],
    mouseEventCursor: true, mouseEventCursorName: "hand",
    onLeftMouseUp: function () {
        var vis  = ui.getElementProperty("ex-show", "show");
        var next = !vis;
        ui.setElementProperties("ex-show",  { show: next });
        ui.setElementProperties("btn-show", { text: next ? "Hide" : "Show" });
        setStatus("ex-show → show set to " + next);
    },
});
caption("c15a", PAD, R15 + GAP + LH + 4,
    "show: false hides without removing the element. Click to toggle.");

// pixelHitTest — click only registers near the actual line, not the whole bounding box
ui.addLine({
    id: "ex-pht", x: COL2_X, y: R15 + GAP,
    width: COL_W, height: LH,
    // Low-value data — line sits near the bottom. Clicking the empty top area does nothing.
    data: [10,12,15,11,14,13,16,12,10,14,11,15,13,12,10],
    rangeMin: 0, rangeMax: 100,
    lineColor: "#00ff88", lineWidth: 3,
    // pixelHitTest: true — click must land within lineWidth/2 + 1px of the line path
    pixelHitTest: true,
    mouseEventCursor: true, mouseEventCursorName: "cross",
    onLeftMouseUp: function () {
        setStatus("ex-pht → clicked ON the line — pixelHitTest confirmed");
    },
    tooltipTitle: "pixelHitTest: true",
    tooltipText: "Line sits at bottom 10-16%. Click the empty top area — nothing fires.\nClick directly on the line to trigger.",
    tooltipIcon: "info",
});
caption("c15b", COL2_X, R15 + GAP + LH + 4,
    "pixelHitTest: true · line at 10-16% — clicking empty top area does nothing");

var R15_BOT = R15 + GAP + LH + 20;

// ═══════════════════════════════════════════════════════════
// End batch — all elements above rendered in one pass
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
    ui.setElementProperties("ex-data-live", {
        data: d.cpuHistory,
    });
    ui.setElementProperties("c1b", {
        text: "data: [] live — CPU " + d.cpu.toFixed(1) + "% · " +
              d.cpuHistory.length + " pts collected",
    });

    // Row 4 — dual and triple live lines
    ui.setElementProperties("ex-dual", {
        data:  d.cpuHistory,
        data2: d.memHistory,
    });
    ui.setElementProperties("ex-triple", {
        data:  d.cpuHistory,
        data2: d.memHistory,
        data3: d.waveHistory,
    });

    // Row 7 — maxPoints comparison
    ui.setElementProperties("ex-mp-10", { data: d.cpuHistory });
    ui.setElementProperties("ex-mp-40", { data: d.cpuHistory });

    // Row 8 — graphStart comparison
    ui.setElementProperties("ex-gs-right", { data: d.cpuHistory });
    ui.setElementProperties("ex-gs-left",  { data: d.cpuHistory });

    // Row 9 — graphOrientation comparison
    ui.setElementProperties("ex-go-vert",  { data: d.cpuHistory });
    ui.setElementProperties("ex-go-horiz", { data: d.cpuHistory });

    // Row 13 — keep tooltip fresh
    ui.setElementProperties("ex-tt-info", {
        tooltipText: "CPU: " + d.cpu.toFixed(1) + "% · MEM: " + d.mem.toFixed(1) + "%",
    });
    ui.endUpdate();
});
