// ─────────────────────────────────────────────────────────────
// Bar Examples — UI Script
// Two columns: left x=20, right x=500  (each 460px wide)
// Rows are placed with explicit Y values calculated from
// actual content height — no fixed ROW_STEP to avoid overlap.
// ─────────────────────────────────────────────────────────────

const PAD    = 20;
const COL_W  = 460;
const COL2_X = 500;
const BH     = 28;        // standard bar height
const GAP    = 16;        // gap between heading and first element
const RSEP   = 40;        // separation between rows

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

ui.beginUpdate();

// ═══════════════════════════════════════════════════════════
// ROW 1 — value: 0.0 → 1.0
// content: 5 bars × 32px = 160px + heading(20) + caption(18) = 198px
// ═══════════════════════════════════════════════════════════
var R1_Y = 20;
heading("h1", PAD, R1_Y,
    "1 · value — normalized 0.0 (empty) to 1.0 (full)");

var V_VALS  = [0.0, 0.25, 0.5, 0.75, 1.0];
var V_LBLS  = ["0.0 — empty", "0.25 — quarter", "0.5 — half",
               "0.75 — three quarters", "1.0 — full"];
var V_CLRS  = ["#555555", "#ff3333", "#ffaa00", "#00cc66", "#00b4ff"];

for (var i = 0; i < V_VALS.length; i++) {
    var vy = R1_Y + GAP + i * 32;
    ui.addBar({
        id: "val-" + i, x: PAD, y: vy,
        width: COL_W, height: BH,
        value: V_VALS[i], barColor: V_CLRS[i],
        barCornerRadius: BH / 2,
        backgroundColor: "rgba(255,255,255,0.08)",
        backgroundColorRadius: BH / 2,
    });
    lbl("lv-" + i, COL2_X, vy + 6, V_LBLS[i]);
}
var R1_BOTTOM = R1_Y + GAP + V_VALS.length * 32 + 4;
caption("c1", PAD, R1_BOTTOM,
    "value: 0.0 draws nothing. Values outside 0-1 are clamped visually at render time.");

// ═══════════════════════════════════════════════════════════
// ROW 2 — orientation
// content: 1 horiz bar + 3 vert bars (120px tall) = ~160px
// ═══════════════════════════════════════════════════════════
var R2_Y = R1_BOTTOM + 18 + RSEP;
heading("h2", PAD, R2_Y,
    "2 · orientation — \"horizontal\" (left→right) vs \"vertical\" (bottom→top)");

var R2_GY = R2_Y + GAP;
ui.addBar({
    id: "orient-h", x: PAD, y: R2_GY,
    width: COL_W, height: BH,
    value: 0.65, orientation: "horizontal",
    barColor: "#00b4ff", barCornerRadius: BH / 2,
    backgroundColor: "rgba(255,255,255,0.08)",
    backgroundColorRadius: BH / 2,
});
caption("c2a", PAD, R2_GY + BH + 4,
    "orientation: \"horizontal\" — 65% fills from left edge");

var vBarW = 40; var vBarH = 120;
var vVals = [0.3, 0.6, 0.9];
var vClrs = ["#ff6600", "#ffaa00", "#00ff88"];
for (var j = 0; j < vVals.length; j++) {
    ui.addBar({
        id: "orient-v-" + j,
        x: COL2_X + j * 60, y: R2_GY,
        width: vBarW, height: vBarH,
        value: vVals[j], orientation: "vertical",
        barColor: vClrs[j], barCornerRadius: vBarW / 2,
        backgroundColor: "rgba(255,255,255,0.08)",
        backgroundColorRadius: vBarW / 2,
    });
    lbl("lv2-" + j, COL2_X + j * 60 + 4, R2_GY + vBarH + 4,
        (vVals[j] * 100) + "%");
}
var R2_BOTTOM = R2_GY + vBarH + 20;
caption("c2b", COL2_X, R2_BOTTOM,
    "orientation: \"vertical\" — fills bottom→top. Swap width & height.");

// ═══════════════════════════════════════════════════════════
// ROW 3 — barColor solid formats
// content: 5 bars × 34px = 170px
// ═══════════════════════════════════════════════════════════
var R3_Y = Math.max(R2_BOTTOM, R2_BOTTOM) + 18 + RSEP;
heading("h3", PAD, R3_Y,
    "3 · barColor — named, #RRGGBB, #RRGGBBAA, rgba()");

var R3_DATA = [
    { id: "bc-named",   color: "dodgerblue",            lbl: "\"dodgerblue\" — named CSS color" },
    { id: "bc-hex",     color: "#ff6600",               lbl: "\"#ff6600\" — #RRGGBB (fully opaque)" },
    { id: "bc-hex8",    color: "#9966ffaa",             lbl: "\"#9966ffaa\" — #RRGGBBAA (67% opacity)" },
    { id: "bc-rgba",    color: "rgba(0,255,136,0.55)",  lbl: "\"rgba(0,255,136,0.55)\" — float alpha" },
    { id: "bc-rgba255", color: "rgba(255,170,0,180)",   lbl: "\"rgba(255,170,0,180)\" — integer alpha 0-255" },
];
for (var k = 0; k < R3_DATA.length; k++) {
    var ky = R3_Y + GAP + k * 34;
    ui.addBar({
        id: R3_DATA[k].id, x: PAD, y: ky,
        width: 320, height: BH,
        value: 0.70, barColor: R3_DATA[k].color,
        barCornerRadius: 6,
        backgroundColor: "rgba(255,255,255,0.08)",
        backgroundColorRadius: 6,
    });
    lbl("lbl3-" + k, PAD + 330, ky + 7, R3_DATA[k].lbl);
}
var R3_BOTTOM = R3_Y + GAP + R3_DATA.length * 34 + 4;
caption("c3", PAD, R3_BOTTOM,
    "All formats extract alpha automatically. \"transparent\" draws no fill.");

// ═══════════════════════════════════════════════════════════
// ROW 4 — barColor gradients
// content: 3 linear bars × 48px + 2 right bars = ~160px
// ═══════════════════════════════════════════════════════════
var R4_Y = R3_BOTTOM + 18 + RSEP;
heading("h4", PAD, R4_Y,
    "4 · barColor gradients — linearGradient & radialGradient");

var R4_LINEAR = [
    { id: "bg-lin0",  color: "linearGradient(0, #ff0080, #9966ff, #00b4ff)", lbl: "angle 0° — left to right" },
    { id: "bg-lin90", color: "linearGradient(90, #00ff88, #ffaa00)",          lbl: "angle 90° — top to bottom" },
    { id: "bg-lin45", color: "linearGradient(45, #ff6600, #ffdd00)",          lbl: "angle 45° — diagonal" },
];
for (var a = 0; a < R4_LINEAR.length; a++) {
    var ay = R4_Y + GAP + a * 48;
    ui.addBar({
        id: R4_LINEAR[a].id, x: PAD, y: ay,
        width: COL_W, height: BH,
        value: 0.75, barColor: R4_LINEAR[a].color,
        barCornerRadius: 8,
        backgroundColor: "rgba(255,255,255,0.08)",
        backgroundColorRadius: 8,
    });
    caption("c4a-" + a, PAD, ay + BH + 2, R4_LINEAR[a].lbl);
}

ui.addBar({
    id: "bg-radial", x: COL2_X, y: R4_Y + GAP,
    width: COL_W, height: BH,
    value: 0.75, barColor: "radialGradient(circle, #ffffff, #9966ff)",
    barCornerRadius: 8,
    backgroundColor: "rgba(255,255,255,0.08)", backgroundColorRadius: 8,
});
caption("c4b", COL2_X, R4_Y + GAP + BH + 2, "radialGradient(circle, white, purple)");

ui.addBar({
    id: "bg-multi", x: COL2_X, y: R4_Y + GAP + 60,
    width: COL_W, height: BH,
    value: 0.80, barColor: "linearGradient(0, #ff0000, #ffaa00, #ffff00, #00ff00)",
    barCornerRadius: 8,
    backgroundColor: "rgba(255,255,255,0.08)", backgroundColorRadius: 8,
});
caption("c4c", COL2_X, R4_Y + GAP + 60 + BH + 2,
    "linearGradient 4-stop: red→orange→yellow→green");

var R4_BOTTOM = R4_Y + GAP + R4_LINEAR.length * 48 + 4;
caption("c4note", PAD, R4_BOTTOM,
    "Gradient bounds = fill rect. At low value the gradient compresses into the filled area.");

// ═══════════════════════════════════════════════════════════
// ROW 5 — barCornerRadius
// content: 4 horiz bars × 48px = 192px + 3 vert bars (110px)
// ═══════════════════════════════════════════════════════════
var R5_Y = R4_BOTTOM + 18 + RSEP;
heading("h5", PAD, R5_Y,
    "5 · barCornerRadius — 0 (sharp) to height/2 (pill)");

var RADII = [
    { id: "cr0",  r: 0,      lbl: "barCornerRadius: 0 — sharp rectangle (default)" },
    { id: "cr4",  r: 4,      lbl: "barCornerRadius: 4 — subtle rounding" },
    { id: "cr8",  r: 8,      lbl: "barCornerRadius: 8 — moderate rounding" },
    { id: "cr14", r: BH / 2, lbl: "barCornerRadius: " + (BH/2) + " (height/2) — pill shape" },
];
for (var b = 0; b < RADII.length; b++) {
    var by = R5_Y + GAP + b * 46;
    ui.addBar({
        id: RADII[b].id, x: PAD, y: by,
        width: COL_W, height: BH,
        value: 0.60, barColor: "#00b4ff",
        barCornerRadius: RADII[b].r,
        backgroundColor: "rgba(255,255,255,0.08)",
        backgroundColorRadius: RADII[b].r,
    });
    caption("c5-" + b, PAD, by + BH + 2, RADII[b].lbl);
}
var R5_LEFT_BOTTOM = R5_Y + GAP + RADII.length * 46;

// Right — vertical pill comparison
var vpW = 36; var vpH = 110;
var vpRadii  = [0, 4, vpW / 2];
var vpLabels = ["r: 0", "r: 4", "r: " + (vpW / 2)];
for (var bp = 0; bp < vpRadii.length; bp++) {
    ui.addBar({
        id: "vcr-" + bp,
        x: COL2_X + bp * 70, y: R5_Y + GAP,
        width: vpW, height: vpH,
        value: 0.65, orientation: "vertical",
        barColor: "#ff6600",
        barCornerRadius: vpRadii[bp],
        backgroundColor: "rgba(255,255,255,0.08)",
        backgroundColorRadius: vpRadii[bp],
    });
    lbl("lvcr-" + bp, COL2_X + bp * 70 + 2, R5_Y + GAP + vpH + 4, vpLabels[bp]);
}
caption("c5v", COL2_X, R5_Y + GAP + vpH + 22,
    "Vertical — set barCornerRadius = width/2 for pill shape");

var R5_BOTTOM = Math.max(R5_LEFT_BOTTOM, R5_Y + GAP + vpH + 40);

// ═══════════════════════════════════════════════════════════
// ROW 6 — backgroundColor & backgroundColorRadius
// content: 4 bars × 46px + 1 right bar = ~200px
// ═══════════════════════════════════════════════════════════
var R6_Y = R5_BOTTOM + 18 + RSEP;
heading("h6", PAD, R6_Y,
    "6 · backgroundColor & backgroundColorRadius — track styling");

var R6_BARS = [
    { id: "bg-none",  bg: null,                                               bgr: 0,    lbl: "no backgroundColor — bar floats without track" },
    { id: "bg-solid", bg: "rgba(255,255,255,0.12)",                           bgr: BH/2, lbl: "backgroundColor: rgba — semi-transparent track" },
    { id: "bg-dark",  bg: "rgba(0,0,0,0.55)",                                 bgr: BH/2, lbl: "backgroundColor: dark opaque track" },
    { id: "bg-grad",  bg: "linearGradient(0,rgba(0,180,255,0.28),rgba(0,180,255,0.04))", bgr: BH/2, lbl: "backgroundColor: linearGradient track" },
];
for (var c2 = 0; c2 < R6_BARS.length; c2++) {
    var cy = R6_Y + GAP + c2 * 46;
    var bOpt = {
        id: R6_BARS[c2].id, x: PAD, y: cy,
        width: COL_W, height: BH,
        value: 0.55, barColor: "#00ff88", barCornerRadius: BH / 2,
    };
    if (R6_BARS[c2].bg) {
        bOpt.backgroundColor       = R6_BARS[c2].bg;
        bOpt.backgroundColorRadius = R6_BARS[c2].bgr;
    }
    ui.addBar(bOpt);
    caption("c6-" + c2, PAD, cy + BH + 2, R6_BARS[c2].lbl);
}
var R6_BOTTOM = R6_Y + GAP + R6_BARS.length * 46 + 4;

// Right — padding demo
ui.addBar({
    id: "bg-pad", x: COL2_X, y: R6_Y + GAP,
    width: COL_W, height: BH + 12,
    value: 0.60, barColor: "#9966ff", barCornerRadius: 8,
    backgroundColor: "rgba(153,102,255,0.22)",
    backgroundColorRadius: 16,
    padding: [6, 6, 6, 6],
});
caption("c6r", COL2_X, R6_Y + GAP + BH + 22,
    "padding: [6,6,6,6] — fill shrinks inside the background track");

// ═══════════════════════════════════════════════════════════
// ROW 7 — bevel, rotate, transformMatrix
// ═══════════════════════════════════════════════════════════
var R7_Y = R6_BOTTOM + 18 + RSEP;
heading("h7", PAD, R7_Y,
    "7 · General Element Options — bevel, rotate, transformMatrix");

ui.addBar({
    id: "bevel-raised", x: PAD, y: R7_Y + GAP,
    width: COL_W, height: BH,
    value: 0.70, barColor: "#ffaa00", barCornerRadius: 4,
    backgroundColor: "rgba(255,170,0,0.20)", backgroundColorRadius: 4,
    bevelType: "raised", bevelWidth: 2,
    bevelColor: "rgba(255,255,255,0.40)", bevelColor2: "rgba(0,0,0,0.50)",
});
caption("c7a", PAD, R7_Y + GAP + BH + 2,
    "bevelType: \"raised\"  bevelWidth: 2");

ui.addBar({
    id: "bevel-sunken", x: PAD, y: R7_Y + GAP + 50,
    width: COL_W, height: BH,
    value: 0.70, barColor: "#00b4ff", barCornerRadius: 4,
    backgroundColor: "rgba(0,180,255,0.20)", backgroundColorRadius: 4,
    bevelType: "sunken", bevelWidth: 2,
    bevelColor: "rgba(0,0,0,0.50)", bevelColor2: "rgba(255,255,255,0.40)",
});
caption("c7b", PAD, R7_Y + GAP + 50 + BH + 2,
    "bevelType: \"sunken\"");

ui.addBar({
    id: "bar-rotate", x: COL2_X + 20, y: R7_Y + GAP,
    width: COL_W - 40, height: BH,
    value: 0.65, barColor: "#ff6600", barCornerRadius: BH / 2,
    backgroundColor: "rgba(255,255,255,0.08)",
    backgroundColorRadius: BH / 2,
    rotate: 4,
});
caption("c7c", COL2_X, R7_Y + GAP + BH + 8, "rotate: 4°");

ui.addBar({
    id: "bar-shear", x: COL2_X, y: R7_Y + GAP + 60,
    width: COL_W, height: BH,
    value: 0.65, barColor: "#9966ff", barCornerRadius: 6,
    backgroundColor: "rgba(255,255,255,0.08)", backgroundColorRadius: 6,
    transformMatrix: [1, 0.08, 0, 1, 0, 0],
});
caption("c7d", COL2_X, R7_Y + GAP + 60 + BH + 2,
    "transformMatrix: [1, 0.08, 0, 1, 0, 0] — horizontal shear");

var R7_BOTTOM = R7_Y + GAP + 60 + BH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 8 — Live bars
// ═══════════════════════════════════════════════════════════
var R8_Y = R7_BOTTOM + RSEP;
heading("h8", PAD, R8_Y,
    "8 · Live bars — CPU & Memory (updates every second)");

lbl("lbl-cpu", PAD, R8_Y + GAP + 5, "CPU");
ui.addBar({
    id: "live-cpu", x: PAD + 50, y: R8_Y + GAP,
    width: COL_W - 50, height: BH,
    value: 0, barColor: "#00b4ff", barCornerRadius: BH / 2,
    backgroundColor: "rgba(255,255,255,0.08)",
    backgroundColorRadius: BH / 2,
});
lbl("val-cpu", COL2_X + 4, R8_Y + GAP + 5, "—");

lbl("lbl-mem", PAD, R8_Y + GAP + 44, "MEM");
ui.addBar({
    id: "live-mem", x: PAD + 50, y: R8_Y + GAP + 40,
    width: COL_W - 50, height: BH,
    value: 0, barColor: "#00ff88", barCornerRadius: BH / 2,
    backgroundColor: "rgba(255,255,255,0.08)",
    backgroundColorRadius: BH / 2,
});
lbl("val-mem", COL2_X + 4, R8_Y + GAP + 44, "—");

// Vertical pair
ui.addBar({
    id: "live-cpu-v", x: COL2_X + 80, y: R8_Y + GAP,
    width: 36, height: 90, value: 0, orientation: "vertical",
    barColor: "#00b4ff", barCornerRadius: 18,
    backgroundColor: "rgba(255,255,255,0.08)", backgroundColorRadius: 18,
});
ui.addBar({
    id: "live-mem-v", x: COL2_X + 140, y: R8_Y + GAP,
    width: 36, height: 90, value: 0, orientation: "vertical",
    barColor: "#00ff88", barCornerRadius: 18,
    backgroundColor: "rgba(255,255,255,0.08)", backgroundColorRadius: 18,
});
lbl("lbl8v", COL2_X + 68, R8_Y + GAP + 96, "CPU    MEM");

var R8_BOTTOM = R8_Y + GAP + 115;
caption("c8", PAD, R8_BOTTOM,
    "Color: green < 50% · amber 50-80% · red > 80%");

// ═══════════════════════════════════════════════════════════
// ROW 9 — Tooltip options
// ═══════════════════════════════════════════════════════════
var R9_Y = R8_BOTTOM + 18 + RSEP;
heading("h9", PAD, R9_Y,
    "9 · Tooltip options — hover each bar to see the tooltip");

ui.addBar({
    id: "tt-standard", x: PAD, y: R9_Y + GAP,
    width: COL_W, height: BH,
    value: 0.60, barColor: "#00ff88", barCornerRadius: BH / 2,
    backgroundColor: "rgba(255,255,255,0.08)",
    backgroundColorRadius: BH / 2,
    tooltipTitle: "System Usage",
    tooltipText: "CPU and memory stats.\nHover to see this tooltip.",
    tooltipIcon: "info", tooltipMaxWidth: 280,
});
caption("c9a", PAD, R9_Y + GAP + BH + 4,
    "tooltipTitle + tooltipText + tooltipIcon: \"info\"");

ui.addBar({
    id: "tt-warning", x: PAD, y: R9_Y + GAP + 52,
    width: COL_W, height: BH,
    value: 0.88, barColor: "#ff3333", barCornerRadius: BH / 2,
    backgroundColor: "rgba(255,255,255,0.08)",
    backgroundColorRadius: BH / 2,
    tooltipTitle: "Critical CPU Load",
    tooltipText: "CPU at 88% — consider closing background apps.",
    tooltipIcon: "warning", tooltipBalloon: true,
});
caption("c9b", PAD, R9_Y + GAP + 52 + BH + 4,
    "tooltipBalloon: true · tooltipIcon: \"warning\"");

ui.addBar({
    id: "tt-disabled", x: COL2_X, y: R9_Y + GAP,
    width: COL_W, height: BH,
    value: 0.45, barColor: "#9966ff", barCornerRadius: BH / 2,
    backgroundColor: "rgba(255,255,255,0.08)",
    backgroundColorRadius: BH / 2,
    tooltipTitle: "Disk Usage",
    tooltipText: "This tooltip is suppressed by tooltipDisabled: true.",
    tooltipIcon: "error",
    tooltipDisabled: true,
});
caption("c9c", COL2_X, R9_Y + GAP + BH + 4,
    "tooltipDisabled: true — tooltip set but never shown");

var R9_BOTTOM = R9_Y + GAP + 52 + BH + 20;

// ═══════════════════════════════════════════════════════════
// ROW 10 — Mouse event callbacks
// ═══════════════════════════════════════════════════════════
var R10_Y = R9_BOTTOM + 18 + RSEP;
heading("h10", PAD, R10_Y,
    "10 · Mouse event callbacks — click, hover, scroll, drag");

ui.addText({
    id: "mouse-status", x: PAD, y: R10_Y + GAP,
    text: "Interact with bars below — events appear here",
    fontSize: 12, fontColor: "#ffdd44",
});

function setStatus(msg) {
    ui.setElementProperties("mouse-status", { text: msg });
}

var BH2 = BH + 6;
ui.addBar({
    id: "mc-click", x: PAD, y: R10_Y + GAP + 24,
    width: COL_W, height: BH2,
    value: 0.55, barColor: "#00b4ff", barCornerRadius: BH2 / 2,
    backgroundColor: "rgba(255,255,255,0.08)",
    backgroundColorRadius: BH2 / 2,
    mouseEventCursor: true, mouseEventCursorName: "hand",
    onLeftMouseUp:    function () { setStatus("mc-click → onLeftMouseUp"); },
    onLeftMouseDown:  function () { setStatus("mc-click → onLeftMouseDown"); },
    onLeftDoubleClick:function () { setStatus("mc-click → onLeftDoubleClick!"); },
    onRightMouseUp:   function () { setStatus("mc-click → onRightMouseUp"); },
    onMouseOver: function () {
        ui.setElementProperties("mc-click", { barColor: "#ffffff" });
        setStatus("mc-click → onMouseOver (bar turned white)");
    },
    onMouseLeave: function () {
        ui.setElementProperties("mc-click", { barColor: "#00b4ff" });
        setStatus("mc-click → onMouseLeave (colour restored)");
    },
    onScrollUp:   function () { setStatus("mc-click → onScrollUp"); },
    onScrollDown: function () { setStatus("mc-click → onScrollDown"); },
    tooltipTitle: "Interactive Bar",
    tooltipText: "Left/right click · double-click · hover · scroll",
    tooltipIcon: "info",
});
caption("c10a", PAD, R10_Y + GAP + 24 + BH2 + 4,
    "Left/right/double-click · hover changes colour · scroll wheel");

ui.addBar({
    id: "mc-drag", x: COL2_X, y: R10_Y + GAP + 24,
    width: COL_W, height: BH2,
    value: 0.40, barColor: "#ff6600", barCornerRadius: BH2 / 2,
    backgroundColor: "rgba(255,255,255,0.08)",
    backgroundColorRadius: BH2 / 2,
    mouseEventCursor: true, mouseEventCursorName: "size_we",
    onDragStart: function (e) {
        ui.setElementProperties("mc-drag", { barColor: "#ffffff" });
        setStatus("onDragStart  x:" + e.__offsetX + "px (" + e.__offsetXPercent + "%)");
    },
    onDrag: function (e) {
        var v = e.__offsetXPercent / 100;
        ui.setElementProperties("mc-drag", { value: v });
        setStatus("onDrag → " + e.__offsetXPercent + "% → value: " + v.toFixed(2));
    },
    onDragEnd: function () {
        ui.setElementProperties("mc-drag", { barColor: "#ff6600" });
        setStatus("onDragEnd — released");
    },
    onMiddleMouseUp: function () {
        ui.setElementProperties("mc-drag", { value: 0 });
        setStatus("onMiddleMouseUp — value reset to 0");
    },
    tooltipTitle: "Drag Bar",
    tooltipText: "Drag to set value · middle-click resets to 0",
    tooltipIcon: "info",
});
caption("c10b", COL2_X, R10_Y + GAP + 24 + BH2 + 4,
    "Drag sets value · __offsetXPercent/100 = value · middle-click resets");

var R10_BOTTOM = R10_Y + GAP + 24 + BH2 + 20;

// ═══════════════════════════════════════════════════════════
// ROW 11 — show/hide · pixelHitTest
// ═══════════════════════════════════════════════════════════
var R11_Y = R10_BOTTOM + 18 + RSEP;
heading("h11", PAD, R11_Y,
    "11 · show / pixelHitTest — visibility toggle & pixel-accurate clicks");

ui.addBar({
    id: "bar-show", x: PAD, y: R11_Y + GAP,
    width: COL_W - 86, height: BH,
    value: 0.65, barColor: "#9966ff", barCornerRadius: BH / 2,
    backgroundColor: "rgba(153,102,255,0.20)",
    backgroundColorRadius: BH / 2, show: true,
});
ui.addText({
    id: "btn-show",
    x: PAD + COL_W - 80, y: R11_Y + GAP + BH / 2 - 12,
    text: "Hide", fontSize: 13, fontColor: "#ffffff",
    backgroundColor: "rgba(100,70,200,0.75)",
    backgroundColorRadius: 6, padding: [10, 6, 10, 6],
    mouseEventCursor: true, mouseEventCursorName: "hand",
    onLeftMouseUp: function () {
        var vis = ui.getElementProperty("bar-show", "show");
        var next = !vis;
        ui.setElementProperties("bar-show", { show: next });
        ui.setElementProperties("btn-show",  { text: next ? "Hide" : "Show" });
        setStatus("bar-show → show: " + next);
    },
});
caption("c11a", PAD, R11_Y + GAP + BH + 6,
    "show: false hides without removing. Element stays in memory.");

ui.addBar({
    id: "bar-pht", x: COL2_X, y: R11_Y + GAP,
    width: COL_W, height: BH,
    value: 0.35, barColor: "#00ff88", barCornerRadius: BH / 2,
    backgroundColorRadius: BH / 2,
    pixelHitTest: true,
    mouseEventCursor: true, mouseEventCursorName: "cross",
    onLeftMouseUp: function () {
        setStatus("bar-pht → clicked INSIDE the 35% fill — pixelHitTest confirmed");
    },
    tooltipTitle: "pixelHitTest: true",
    tooltipText: "Only the filled 35% responds to clicks.\nThe empty 65% ignores them.",
    tooltipIcon: "info",
});
caption("c11b", COL2_X, R11_Y + GAP + BH + 6,
    "pixelHitTest: true · value: 0.35 — right 65% ignores clicks");

// ═══════════════════════════════════════════════════════════
// End batch — render everything above in one pass
// ═══════════════════════════════════════════════════════════
ui.endUpdate();


// ═══════════════════════════════════════════════════════════
// LIVE DATA LISTENER
// ═══════════════════════════════════════════════════════════
ipcRenderer.on("data:tick", function (event, payloadArg) {
    var raw = (payloadArg === undefined) ? event : payloadArg;
    var d;
    try { d = JSON.parse(raw); } catch (e) { return; }

    var cv = d.cpu / 100;
    var mv = d.mem / 100;

    var cc = cv < 0.5 ? "#00b4ff" : cv < 0.8 ? "#ffaa00" : "#ff3333";
    var mc = mv < 0.5 ? "#00ff88" : mv < 0.8 ? "#ffaa00" : "#ff3333";

    ui.beginUpdate();
    ui.setElementProperties("live-cpu",   { value: cv, barColor: cc });
    ui.setElementProperties("live-mem",   { value: mv, barColor: mc });
    ui.setElementProperties("live-cpu-v", { value: cv, barColor: cc });
    ui.setElementProperties("live-mem-v", { value: mv, barColor: mc });
    ui.setElementProperties("val-cpu",    { text: d.cpu.toFixed(1) + "%", fontColor: cc });
    ui.setElementProperties("val-mem",    { text: d.mem.toFixed(1) + "%", fontColor: mc });
    ui.setElementProperties("tt-standard", {
        tooltipText: "CPU: " + d.cpu.toFixed(1) + "%\nMEM: " + d.mem.toFixed(1) + "%",
    });
    ui.endUpdate();
});
