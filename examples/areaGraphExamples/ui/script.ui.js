// ─────────────────────────────────────────────────────────────
// AreaGraph Examples — UI Script
//
// LAYOUT  (two columns of 460px, 20px gap, 20px outer margin)
//
//  Row 1 – data: static vs live                  y: 30
//  Row 2 – lineColor & lineWidth                 y: 210
//  Row 3 – fillColor styles                      y: 390
//  Row 4 – gridVisible / gridX / gridY           y: 570
//  Row 5 – autoRange / minValue / maxValue       y: 750
//  Row 6 – graphStart / flip / maxPoints (live)  y: 930
//  Row 7 – backgroundColor & padding             y: 1110
//  Row 8 – General Element Options               y: 1290
//  Row 9 – Tooltip options                       y: 1470
//  Row 10– Mouse event callbacks                 y: 1650
// ─────────────────────────────────────────────────────────────

const PAD      = 20;
const COL_W    = 460;
const COL_GAP  = 20;
const COL2_X   = PAD + COL_W + COL_GAP;
const GH       = 120;
const ROW_STEP = 180;
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

const STATIC = [10,20,45,35,60,50,75,55,80,65,90,70,85,60,40,55,30,45,20,35];

// ── Batch all initial element creation into one render pass ──
// ui.beginUpdate() defers rendering until ui.endUpdate() is called.
// This prevents a flash of partially-built UI on startup and is
// the recommended pattern whenever creating multiple elements at once.
ui.beginUpdate();

// ═════════════════════════════════════════════════════════════
// ROW 1 — data: static array vs live empty array
// ═════════════════════════════════════════════════════════════
var R1 = 30;
heading("h1", PAD, R1, "1 · data — static array vs empty (fills with live CPU each second)");

ui.addAreaGraph({
    id: "ex-data-static", x: PAD, y: R1+22,
    width: COL_W, height: GH,
    data: STATIC, minValue: 0, maxValue: 100,
    lineColor: "#00b4ff", lineWidth: 2,
    fillColor: "rgba(0,180,255,0.18)",
    gridColor: "rgba(255,255,255,0.10)", gridX: 46, gridY: 40,
});
caption("c1a", PAD, R1+22+GH+4,
    "data: [...20 values...] — plotted immediately at startup");

ui.addAreaGraph({
    id: "ex-data-live", x: COL2_X, y: R1+22,
    width: COL_W, height: GH,
    data: [], minValue: 0, maxValue: 100,
    maxPoints: 20, graphStart: "right",
    lineColor: "#00ff88", lineWidth: 2,
    fillColor: "rgba(0,255,136,0.18)",
    gridColor: "rgba(255,255,255,0.10)", gridX: 46, gridY: 40,
});
caption("c1b", COL2_X, R1+22+GH+4,
    "data: [] — starts empty, fills with live CPU. Waiting for first tick…");


// ═════════════════════════════════════════════════════════════
// ROW 2 — lineColor & lineWidth
// ═════════════════════════════════════════════════════════════
var R2 = R1 + ROW_STEP;
heading("h2", PAD, R2, "2 · lineColor & lineWidth — hex, gradient, thin vs thick");

ui.addAreaGraph({
    id: "ex-line-thin", x: PAD, y: R2+22,
    width: COL_W, height: GH,
    data: STATIC, minValue: 0, maxValue: 100,
    lineColor: "#ff6600", lineWidth: 1,
    fillColor: "rgba(255,102,0,0.15)",
    gridColor: "rgba(255,255,255,0.08)", gridX: 46, gridY: 40,
});
caption("c2a", PAD, R2+22+GH+4,
    "lineWidth: 1  lineColor: \"#ff6600\" — default thin stroke");

ui.addAreaGraph({
    id: "ex-line-thick", x: COL2_X, y: R2+22,
    width: COL_W, height: GH,
    data: STATIC, minValue: 0, maxValue: 100,
    lineColor: "linearGradient(0, #ff0080, #9966ff, #00b4ff)",
    lineWidth: 3,
    fillColor: "rgba(153,102,255,0.15)",
    gridColor: "rgba(255,255,255,0.08)", gridX: 46, gridY: 40,
});
caption("c2b", COL2_X, R2+22+GH+4,
    "lineWidth: 3  lineColor: linearGradient(0, pink→purple→blue)");


// ═════════════════════════════════════════════════════════════
// ROW 3 — fillColor styles
// ═════════════════════════════════════════════════════════════
var R3 = R2 + ROW_STEP;
heading("h3", PAD, R3, "3 · fillColor — rgba solid, vertical gradient, radial gradient");

ui.addAreaGraph({
    id: "ex-fill-rgba", x: PAD, y: R3+22,
    width: COL_W, height: GH,
    data: STATIC, minValue: 0, maxValue: 100,
    lineColor: "#00ff88", lineWidth: 2,
    fillColor: "rgba(0,255,136,0.25)",
    gridColor: "rgba(255,255,255,0.08)", gridX: 46, gridY: 40,
});
caption("c3a", PAD, R3+22+GH+4,
    "fillColor: \"rgba(0,255,136,0.25)\" — plain semi-transparent fill");

ui.addAreaGraph({
    id: "ex-fill-gradient", x: COL2_X, y: R3+22,
    width: COL_W, height: GH,
    data: STATIC, minValue: 0, maxValue: 100,
    lineColor: "#9966ff", lineWidth: 2,
    fillColor: "linearGradient(90, rgba(153,102,255,0.55), rgba(153,102,255,0.02))",
    gridColor: "rgba(255,255,255,0.08)", gridX: 46, gridY: 40,
});
caption("c3b", COL2_X, R3+22+GH+4,
    "fillColor: linearGradient(90, ...) — bright at top, fades to transparent");


// ═════════════════════════════════════════════════════════════
// ROW 4 — gridVisible / gridX / gridY
// ═════════════════════════════════════════════════════════════
var R4 = R3 + ROW_STEP;
heading("h4", PAD, R4, "4 · gridVisible / gridX / gridY — grid control");

ui.addAreaGraph({
    id: "ex-grid-off", x: PAD, y: R4+22,
    width: COL_W, height: GH,
    data: STATIC, minValue: 0, maxValue: 100,
    lineColor: "#00b4ff", lineWidth: 2,
    fillColor: "rgba(0,180,255,0.18)",
    gridVisible: false,
});
caption("c4a", PAD, R4+22+GH+4,
    "gridVisible: false — no grid lines at all");

ui.addAreaGraph({
    id: "ex-grid-custom", x: COL2_X, y: R4+22,
    width: COL_W, height: GH,
    data: STATIC, minValue: 0, maxValue: 100,
    lineColor: "#ffaa00", lineWidth: 2,
    fillColor: "rgba(255,170,0,0.15)",
    gridVisible: true,
    gridX: 0,
    gridY: 30,
    gridColor: "rgba(255,170,0,0.30)",
});
caption("c4b", COL2_X, R4+22+GH+4,
    "gridX: 0 (vertical off) · gridY: 30 · tinted gridColor");


// ═════════════════════════════════════════════════════════════
// ROW 5 — autoRange / minValue / maxValue
// ═════════════════════════════════════════════════════════════
var R5 = R4 + ROW_STEP;
heading("h5", PAD, R5, "5 · minValue / maxValue / autoRange — Y-axis scale control");

ui.addAreaGraph({
    id: "ex-range-fixed", x: PAD, y: R5+22,
    width: COL_W, height: GH,
    data: [30,35,40,50,45,60,55,65,70,60,55,50,45,40,35],
    minValue: 0, maxValue: 100, autoRange: false,
    lineColor: "#00b4ff", lineWidth: 2,
    fillColor: "rgba(0,180,255,0.18)",
    gridColor: "rgba(255,255,255,0.10)", gridX: 46, gridY: 30,
});
caption("c5a", PAD, R5+22+GH+4,
    "autoRange: false · min: 0 · max: 100 — data 30-70, scale stays fixed");

ui.addAreaGraph({
    id: "ex-range-auto", x: COL2_X, y: R5+22,
    width: COL_W, height: GH,
    data: [30,35,40,50,45,60,55,65,70,60,55,50,45,40,35],
    minValue: 0, maxValue: 100, autoRange: true,
    lineColor: "#ff6600", lineWidth: 2,
    fillColor: "rgba(255,102,0,0.18)",
    gridColor: "rgba(255,255,255,0.10)", gridX: 46, gridY: 30,
});
caption("c5b", COL2_X, R5+22+GH+4,
    "autoRange: true — same data, min/max auto-calculated (30-70), fills height");


// ═════════════════════════════════════════════════════════════
// ROW 6 — graphStart / flip / maxPoints (live)
// ═════════════════════════════════════════════════════════════
var R6 = R5 + ROW_STEP;
heading("h6", PAD, R6, "6 · graphStart / flip / maxPoints — live scrolling");

ui.addAreaGraph({
    id: "ex-scroll-right", x: PAD, y: R6+22,
    width: COL_W, height: GH,
    data: [], minValue: 0, maxValue: 100,
    maxPoints: 30, graphStart: "right",
    lineColor: "#00b4ff", lineWidth: 2,
    fillColor: "rgba(0,180,255,0.18)",
    gridColor: "rgba(255,255,255,0.10)", gridX: 46, gridY: 40,
});
caption("c6a", PAD, R6+22+GH+4,
    "graphStart: \"right\" · maxPoints: 30 — newest CPU value anchored right");

ui.addAreaGraph({
    id: "ex-scroll-flip", x: COL2_X, y: R6+22,
    width: COL_W, height: GH,
    data: [], minValue: 0, maxValue: 100,
    maxPoints: 30, graphStart: "right", flip: true,
    lineColor: "#ff6600", lineWidth: 2,
    fillColor: "rgba(255,102,0,0.18)",
    gridColor: "rgba(255,255,255,0.10)", gridX: 46, gridY: 40,
});
caption("c6b", COL2_X, R6+22+GH+4,
    "flip: true — same live data but Y axis inverted (high values go down)");


// ═════════════════════════════════════════════════════════════
// ROW 7 — backgroundColor & padding
// ═════════════════════════════════════════════════════════════
var R7 = R6 + ROW_STEP;
heading("h7", PAD, R7, "7 · backgroundColor & padding — inherited element options");

ui.addAreaGraph({
    id: "ex-bg-solid", x: PAD, y: R7+22,
    width: COL_W, height: GH,
    data: STATIC, minValue: 0, maxValue: 100,
    lineColor: "#ffffff", lineWidth: 2,
    fillColor: "rgba(255,255,255,0.12)",
    gridColor: "rgba(255,255,255,0.15)", gridX: 46, gridY: 40,
    gridVisible: false,
    backgroundColor: "rgba(0,100,180,0.40)",
    backgroundColorRadius: 10,
});
caption("c7a", PAD, R7+22+GH+4,
    "backgroundColor: rgba(0,100,180,0.40) · backgroundColorRadius: 10");

ui.addAreaGraph({
    id: "ex-bg-gradient", x: COL2_X, y: R7+22,
    width: COL_W, height: GH,
    data: STATIC, minValue: 0, maxValue: 100,
    lineColor: "#ffffff", lineWidth: 2,
    fillColor: "rgba(255,255,255,0.12)",
    gridColor: "rgba(255,255,255,0.15)", gridX: 46, gridY: 40,
    gridVisible: false,
    backgroundColor: "linearGradient(0, #ff8c00, #ff0080)",
    backgroundColorRadius: 10,
    padding: [12, 12, 12, 12],
});
caption("c7b", COL2_X, R7+22+GH+4,
    "linearGradient background · padding: [12,12,12,12] — graph inset from edges");


// ═════════════════════════════════════════════════════════════
// ROW 8 — General Element Options
//   show · rotate · bevel · transformMatrix · antiAlias · group
// ═════════════════════════════════════════════════════════════
var R8 = R7 + ROW_STEP;
heading("h8", PAD, R8, "8 · General Element Options — show, rotate, bevel, transformMatrix");

// Left — rotate + bevelType
ui.addAreaGraph({
    id: "ex-gen-rotate", x: PAD+30, y: R8+30,
    width: COL_W - 60, height: GH - 20,
    data: STATIC, minValue: 0, maxValue: 100,
    lineColor: "#00b4ff", lineWidth: 2,
    fillColor: "rgba(0,180,255,0.20)",
    gridColor: "rgba(255,255,255,0.10)", gridX: 46, gridY: 40,
    // rotate: spins the whole element around its centre (degrees)
    rotate: 3,
    // bevelType: draws a 3-D edge around the background
    // options: "none" | "raised" | "sunken" | "emboss" | "pillow"
    backgroundColor: "rgba(20,30,50,0.70)",
    backgroundColorRadius: 8,
    bevelType: "raised",
    bevelWidth: 2,
    bevelColor: "rgba(255,255,255,0.35)",
    bevelColor2: "rgba(0,0,0,0.50)",
    // group: label used for batch setElementProperties / removeElements
    group: "demo-group",
});
caption("c8a", PAD, R8+22+GH+18,
    "rotate: 3  bevelType: \"raised\"  bevelWidth: 2  group: \"demo-group\"");

// Right — transformMatrix + antiAlias: false
ui.addAreaGraph({
    id: "ex-gen-matrix", x: COL2_X, y: R8+22,
    width: COL_W, height: GH,
    data: STATIC, minValue: 0, maxValue: 100,
    lineColor: "#ff6600", lineWidth: 2,
    fillColor: "rgba(255,102,0,0.18)",
    gridColor: "rgba(255,255,255,0.08)", gridX: 46, gridY: 40,
    // transformMatrix: [m11, m12, m21, m22, dx, dy]
    // This applies a subtle horizontal shear (m12: 0.04)
    transformMatrix: [1, 0.04, 0, 1, 0, 0],
    // antiAlias: false — turns off smooth edges (useful to compare)
    antiAlias: false,
});
caption("c8b", COL2_X, R8+22+GH+4,
    "transformMatrix: [1, 0.04, 0, 1, 0, 0] (shear)  antiAlias: false");


// ═════════════════════════════════════════════════════════════
// ROW 9 — Tooltip options
//   tooltipText · tooltipTitle · tooltipIcon · tooltipBalloon
// ═════════════════════════════════════════════════════════════
var R9 = R8 + ROW_STEP;
heading("h9", PAD, R9, "9 · Tooltip options — hover over each graph to see the tooltip");

// Left — standard tooltip with title + info icon
ui.addAreaGraph({
    id: "ex-tooltip-standard", x: PAD, y: R9+22,
    width: COL_W, height: GH,
    data: STATIC, minValue: 0, maxValue: 100,
    lineColor: "#00ff88", lineWidth: 2,
    fillColor: "rgba(0,255,136,0.18)",
    gridColor: "rgba(255,255,255,0.10)", gridX: 46, gridY: 40,
    // tooltipTitle: bold heading inside the tooltip popup
    tooltipTitle: "CPU Usage History",
    // tooltipText: the body text — supports multi-line with \n
    tooltipText: "This graph shows the last 20 CPU readings.\nHover any graph to see its tooltip.",
    // tooltipIcon: icon shown next to the title
    // valid values: "none" | "info" | "warning" | "error"
    tooltipIcon: "info",
    // tooltipMaxWidth: wraps text beyond this pixel width
    tooltipMaxWidth: 300,
});
caption("c9a", PAD, R9+22+GH+4,
    "tooltipTitle + tooltipText + tooltipIcon: \"info\" — hover to see");

// Right — balloon tooltip with warning icon + disabled tooltip demo toggle
ui.addAreaGraph({
    id: "ex-tooltip-balloon", x: COL2_X, y: R9+22,
    width: COL_W, height: GH,
    data: STATIC, minValue: 0, maxValue: 100,
    lineColor: "#ffaa00", lineWidth: 2,
    fillColor: "rgba(255,170,0,0.18)",
    gridColor: "rgba(255,255,255,0.10)", gridX: 46, gridY: 40,
    tooltipTitle: "Memory Pressure",
    tooltipText: "High memory usage detected.\nConsider closing unused applications.",
    tooltipIcon: "warning",
    // tooltipBalloon: true draws a cartoon speech-bubble style tooltip
    tooltipBalloon: true,
    // tooltipDisabled: false — tooltip is active (set true to suppress it)
    tooltipDisabled: false,
});
caption("c9b", COL2_X, R9+22+GH+4,
    "tooltipBalloon: true · tooltipIcon: \"warning\" — hover to see balloon");


// ═════════════════════════════════════════════════════════════
// ROW 10 — Mouse event callbacks
//   onLeftMouseUp · onRightMouseUp · onMouseOver · onMouseLeave
//   onScrollUp · onScrollDown · onDrag
// ═════════════════════════════════════════════════════════════
var R10 = R9 + ROW_STEP;
heading("h10", PAD, R10, "10 · Mouse event callbacks — click, hover, scroll, drag on graphs");

// Shared status label — updated by all mouse callbacks below
ui.addText({
    id: "mouse-status",
    x: PAD, y: R10 + 22,
    text: "Interact with the graphs below — events will appear here",
    fontSize: 12,
    fontColor: "#ffdd44",
});

function setStatus(msg) {
    ui.setElementProperties("mouse-status", { text: msg });
}

// Left — click, hover, scroll events
ui.addAreaGraph({
    id: "ex-mouse-click", x: PAD, y: R10+44,
    width: COL_W, height: GH,
    data: STATIC, minValue: 0, maxValue: 100,
    lineColor: "#00b4ff", lineWidth: 2,
    fillColor: "rgba(0,180,255,0.18)",
    gridColor: "rgba(255,255,255,0.10)", gridX: 46, gridY: 40,
    backgroundColor: "rgba(0,60,120,0.30)",
    backgroundColorRadius: 6,
    // Cursor changes to a hand when the mouse is over this element
    mouseEventCursor: true,
    mouseEventCursorName: "hand",
    // onLeftMouseUp: fires when the left mouse button is released on the element
    onLeftMouseUp: function () {
        setStatus("ex-mouse-click → onLeftMouseUp fired  (left click released)");
    },
    // onLeftMouseDown: fires when the left button is pressed down
    onLeftMouseDown: function () {
        setStatus("ex-mouse-click → onLeftMouseDown fired (left button pressed)");
    },
    // onLeftDoubleClick: fires on a double-click
    onLeftDoubleClick: function () {
        setStatus("ex-mouse-click → onLeftDoubleClick fired! (double-clicked)");
    },
    // onRightMouseUp: fires when the right mouse button is released
    onRightMouseUp: function () {
        setStatus("ex-mouse-click → onRightMouseUp fired  (right click)");
    },
    // onMouseOver: fires once when the cursor first enters the element
    onMouseOver: function () {
        ui.setElementProperties("ex-mouse-click", {
            lineColor: "#ffffff",
        });
        setStatus("ex-mouse-click → onMouseOver (cursor entered — line turned white)");
    },
    // onMouseLeave: fires once when the cursor exits the element
    onMouseLeave: function () {
        ui.setElementProperties("ex-mouse-click", {
            lineColor: "#00b4ff",
        });
        setStatus("ex-mouse-click → onMouseLeave (cursor left — line restored)");
    },
    // onScrollUp / onScrollDown: fires on mouse wheel scroll over element
    onScrollUp: function () {
        setStatus("ex-mouse-click → onScrollUp fired (scrolled up)");
    },
    onScrollDown: function () {
        setStatus("ex-mouse-click → onScrollDown fired (scrolled down)");
    },
});
caption("c10a", PAD, R10+44+GH+4,
    "Left/right click · double-click · hover (line changes white) · scroll wheel");

// Right — drag events (acts as a scrub bar showing drag position)
// Drag state
var isDragging = false;

ui.addAreaGraph({
    id: "ex-mouse-drag", x: COL2_X, y: R10+44,
    width: COL_W, height: GH,
    data: STATIC, minValue: 0, maxValue: 100,
    lineColor: "#ff6600", lineWidth: 2,
    fillColor: "rgba(255,102,0,0.18)",
    gridColor: "rgba(255,255,255,0.10)", gridX: 46, gridY: 40,
    backgroundColor: "rgba(80,30,0,0.30)",
    backgroundColorRadius: 6,
    mouseEventCursor: true,
    mouseEventCursorName: "size_we",
    // onDragStart: fires once when the user clicks and begins dragging
    // Event properties use double-underscore prefix: __offsetX, __offsetY,
    // __offsetXPercent, __offsetYPercent (integer 0-100, not 0.0-1.0)
    onDragStart: function (e) {
        isDragging = true;
        ui.setElementProperties("ex-mouse-drag", { lineColor: "#ffffff" });
        setStatus(
            "ex-mouse-drag → onDragStart  x:" + e.__offsetX +
            "px  (" + e.__offsetXPercent + "% across)"
        );
    },
    // onDrag: fires continuously while the user holds and moves the mouse
    onDrag: function (e) {
        setStatus(
            "ex-mouse-drag → onDrag  x:" + e.__offsetX +
            "px  y:" + e.__offsetY +
            "px  (" + e.__offsetXPercent + "% · " + e.__offsetYPercent + "%)"
        );
    },
    // onDragEnd: fires once when the mouse button is released after dragging
    onDragEnd: function () {
        isDragging = false;
        ui.setElementProperties("ex-mouse-drag", { lineColor: "#ff6600" });
        setStatus("ex-mouse-drag → onDragEnd (released — line colour restored)");
    },
    // Middle mouse button example
    onMiddleMouseUp: function () {
        setStatus("ex-mouse-drag → onMiddleMouseUp fired (middle button clicked)");
    },
});
caption("c10b", COL2_X, R10+44+GH+4,
    "Drag across graph to see __offsetX / __offsetXPercent · middle-click supported");

// ── show / hide toggle demo (below the mouse section) ────────
var R10B = R10 + ROW_STEP + 30;
heading("h10b", PAD, R10B, "11 · show / pixelHitTest — visibility toggle & pixel-accurate click");

// This graph can be shown/hidden by clicking the button next to it
ui.addAreaGraph({
    id: "ex-show-toggle", x: PAD, y: R10B+22,
    width: COL_W - 80, height: GH,
    data: STATIC, minValue: 0, maxValue: 100,
    lineColor: "#9966ff", lineWidth: 2,
    fillColor: "rgba(153,102,255,0.20)",
    gridColor: "rgba(255,255,255,0.10)", gridX: 46, gridY: 40,
    // show: true by default — set false to hide without removing the element
    show: true,
});

// Toggle button next to the graph
ui.addText({
    id: "btn-show-toggle",
    x: PAD + COL_W - 72, y: R10B + 22 + GH/2 - 12,
    text: "Hide",
    fontSize: 13, fontColor: "#ffffff",
    backgroundColor: "rgba(100,70,200,0.70)",
    backgroundColorRadius: 6,
    padding: [10, 6, 10, 6],
    mouseEventCursor: true,
    mouseEventCursorName: "hand",
    onLeftMouseUp: function () {
        // Read current visibility and flip it
        var isVisible = ui.getElementProperty("ex-show-toggle", "show");
        var nextVisible = !isVisible;
        ui.setElementProperties("ex-show-toggle", { show: nextVisible });
        ui.setElementProperties("btn-show-toggle", { text: nextVisible ? "Hide" : "Show" });
        setStatus("ex-show-toggle → show set to " + nextVisible);
    },
});
caption("c10c", PAD, R10B+22+GH+4,
    "show: true/false — click the button to toggle visibility. Element is preserved.");

// Right — pixelHitTest: true (only the filled shape area triggers clicks)
ui.addAreaGraph({
    id: "ex-pixel-hit", x: COL2_X, y: R10B+22,
    width: COL_W, height: GH,
    data: STATIC, minValue: 0, maxValue: 100,
    lineColor: "#00ff88", lineWidth: 2,
    fillColor: "rgba(0,255,136,0.35)",
    gridColor: "rgba(255,255,255,0.10)", gridX: 46, gridY: 40,
    // pixelHitTest: true — click only registers inside the actual filled polygon
    // clicks in empty (unfilled) areas of the bounding box are ignored
    pixelHitTest: true,
    mouseEventCursor: true,
    mouseEventCursorName: "cross",
    onLeftMouseUp: function () {
        setStatus("ex-pixel-hit → onLeftMouseUp — click was INSIDE the filled area");
    },
    tooltipTitle: "pixelHitTest: true",
    tooltipText: "Only clicks inside the filled area register.\nClicking in the empty top region does nothing.",
    tooltipIcon: "info",
});
caption("c10d", COL2_X, R10B+22+GH+4,
    "pixelHitTest: true — click only fires inside the filled polygon, not the bounding box");


// ═════════════════════════════════════════════════════════════
// LIVE DATA LISTENER
// Receives "data:tick" from index.js every second
// and updates all graphs that need live CPU data
// ═════════════════════════════════════════════════════════════

// ── Close the batch — all elements above are now rendered together ──
ui.endUpdate();

ipcRenderer.on("data:tick", function (event, payloadArg) {
    var raw = (payloadArg === undefined) ? event : payloadArg;
    var d;
    try { d = JSON.parse(raw); } catch (e) { return; }

    // ── Row 1 right: empty → filling ─────────────────────────
    ui.setElementProperties("ex-data-live", { data: d.cpuHistory });
    ui.setElementProperties("c1b", {
        text: "data: [] live — CPU " + d.cpu.toFixed(1) + "% · " +
              d.cpuHistory.length + " pts collected so far",
    });

    // ── Row 6: live scrolling graphs ─────────────────────────
    ui.setElementProperties("ex-scroll-right", { data: d.cpuHistory });
    ui.setElementProperties("ex-scroll-flip",  { data: d.cpuHistory });

    // ── Tooltip text on standard tooltip — update live value ──
    ui.setElementProperties("ex-tooltip-standard", {
        tooltipText: "Current CPU: " + d.cpu.toFixed(1) +
                     "%\nHover any graph to see its tooltip.",
    });
});
