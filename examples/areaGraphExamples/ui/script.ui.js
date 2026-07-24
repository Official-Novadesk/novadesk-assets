// ─────────────────────────────────────────────────────────────
// AreaGraph Examples — UI Script
//
// This file builds every graph and label you see on screen.
// Each section is clearly labelled so beginners can jump
// straight to the property they want to learn about.
//
// LAYOUT  (two columns of 480px each, 20px gap)
//
//  Row 1 – Static data basics          (y: 50)
//  Row 2 – lineColor / lineWidth       (y: 230)
//  Row 3 – fillColor styles            (y: 410)
//  Row 4 – gridVisible / gridX / gridY (y: 590)
//  Row 5 – autoRange / minValue / maxValue (separate window tick)
//  Row 6 – graphStart / flip           (y: 770)  ← live, scrolling
// ─────────────────────────────────────────────────────────────

// ── Layout constants ─────────────────────────────────────────
const PAD       = 20;   // outer margin
const COL_W     = 460;  // width of each graph column
const COL_GAP   = 20;   // gap between columns
const COL2_X    = PAD + COL_W + COL_GAP;  // x start of right column
const GH        = 120;  // graph height for most examples
const ROW_H     = GH + 60; // graph height + label space
const LABEL_CLR = "#aaaaaa";
const HEAD_CLR  = "#ffffff";

// ── Helper: draw a section heading ───────────────────────────
function sectionHeading(id, x, y, text) {
    ui.addText({
        id:        id,
        x:         x,
        y:         y,
        text:      text,
        fontSize:  13,
        fontColor: HEAD_CLR,
        fontWeight: 600,
    });
}

// ── Helper: draw a caption below a graph ─────────────────────
function caption(id, x, y, text) {
    ui.addText({
        id:        id,
        x:         x,
        y:         y,
        text:      text,
        fontSize:  11,
        fontColor: LABEL_CLR,
    });
}

// ── Static sample data used in non-live examples ─────────────
const STATIC = [10, 20, 45, 35, 60, 50, 75, 55, 80, 65, 90, 70, 85, 60, 40, 55, 30, 45, 20, 35];


// ═════════════════════════════════════════════════════════════
// ROW 1 — data property basics  (y: 30)
// ═════════════════════════════════════════════════════════════
const R1_Y     = 30;
const R1_GY    = R1_Y + 22;

sectionHeading("h1", PAD, R1_Y, "1 · data — static array vs empty (waiting for live data)");

// Left — pre-loaded static array
ui.addAreaGraph({
    id:        "ex-data-static",
    x:         PAD,
    y:         R1_GY,
    width:     COL_W,
    height:    GH,
    // Pass an array of numbers — they are plotted in order,
    // index 0 on the left, last index on the right.
    data:      STATIC,
    minValue:  0,
    maxValue:  100,
    lineColor: "#00b4ff",
    lineWidth: 2,
    fillColor: "rgba(0, 180, 255, 0.18)",
    gridColor: "rgba(255,255,255,0.10)",
    gridX:     46,
    gridY:     40,
});
caption("c-data-static", PAD, R1_GY + GH + 4,
    "data: [...] — 20 values loaded at start. The graph shows them immediately.");

// Right — starts empty, fills in as live ticks arrive
ui.addAreaGraph({
    id:        "ex-data-live",
    x:         COL2_X,
    y:         R1_GY,
    width:     COL_W,
    height:    GH,
    // Empty array — graph waits for setElementProperties updates
    data:      [],
    minValue:  0,
    maxValue:  100,
    maxPoints: 20,
    lineColor: "#00ff88",
    lineWidth: 2,
    fillColor: "rgba(0, 255, 136, 0.18)",
    gridColor: "rgba(255,255,255,0.10)",
    gridX:     46,
    gridY:     40,
    graphStart: "right",
});
caption("c-data-live", COL2_X, R1_GY + GH + 4,
    "data: [] — starts empty. Fills with live CPU values every second.");


// ═════════════════════════════════════════════════════════════
// ROW 2 — lineColor & lineWidth  (y: R1_GY + GH + 60)
// ═════════════════════════════════════════════════════════════
const R2_Y  = R1_GY + GH + 60;
const R2_GY = R2_Y + 22;

sectionHeading("h2", PAD, R2_Y, "2 · lineColor & lineWidth — color formats and stroke thickness");

// Left — lineWidth comparison using two stacked thin-vs-thick labels
ui.addAreaGraph({
    id:        "ex-line-thin",
    x:         PAD,
    y:         R2_GY,
    width:     COL_W,
    height:    GH,
    data:      STATIC,
    minValue:  0,
    maxValue:  100,
    // lineWidth: 1 (default) — thin, precise stroke
    lineColor: "#ff6600",
    lineWidth: 1,
    fillColor: "rgba(255, 102, 0, 0.15)",
    gridColor: "rgba(255,255,255,0.08)",
    gridX:     46,
    gridY:     40,
    gridVisible: true,
});
caption("c-line-thin", PAD, R2_GY + GH + 4,
    "lineWidth: 1  lineColor: \"#ff6600\"  — thin default stroke");

// Right — thick line with gradient color
ui.addAreaGraph({
    id:        "ex-line-thick",
    x:         COL2_X,
    y:         R2_GY,
    width:     COL_W,
    height:    GH,
    data:      STATIC,
    minValue:  0,
    maxValue:  100,
    // linearGradient — color transitions horizontally across the line
    lineColor: "linearGradient(0, #ff0080, #9966ff, #00b4ff)",
    lineWidth: 3,
    fillColor: "rgba(153, 102, 255, 0.15)",
    gridColor: "rgba(255,255,255,0.08)",
    gridX:     46,
    gridY:     40,
    gridVisible: true,
});
caption("c-line-thick", COL2_X, R2_GY + GH + 4,
    "lineWidth: 3  lineColor: linearGradient(0, pink, purple, blue)");


// ═════════════════════════════════════════════════════════════
// ROW 3 — fillColor styles  (y: R2_GY + GH + 60)
// ═════════════════════════════════════════════════════════════
const R3_Y  = R2_GY + GH + 60;
const R3_GY = R3_Y + 22;

sectionHeading("h3", PAD, R3_Y, "3 · fillColor — solid, rgba, linear gradient, radial gradient");

// Left — solid rgba fill (most common pattern)
ui.addAreaGraph({
    id:        "ex-fill-rgba",
    x:         PAD,
    y:         R3_GY,
    width:     COL_W,
    height:    GH,
    data:      STATIC,
    minValue:  0,
    maxValue:  100,
    lineColor: "#00ff88",
    lineWidth: 2,
    // rgba() — fourth value is alpha (0.0 = transparent, 1.0 = solid)
    fillColor: "rgba(0, 255, 136, 0.25)",
    gridColor: "rgba(255,255,255,0.08)",
    gridX:     46,
    gridY:     40,
});
caption("c-fill-rgba", PAD, R3_GY + GH + 4,
    "fillColor: \"rgba(0, 255, 136, 0.25)\" — transparent green fill");

// Right — vertical linear gradient fill (bright at top, fades to invisible)
ui.addAreaGraph({
    id:        "ex-fill-gradient",
    x:         COL2_X,
    y:         R3_GY,
    width:     COL_W,
    height:    GH,
    data:      STATIC,
    minValue:  0,
    maxValue:  100,
    lineColor: "#9966ff",
    lineWidth: 2,
    // linearGradient(90, ...) — 90° means top → bottom
    // Starts bright purple at the line, fades to invisible at the bottom
    fillColor: "linearGradient(90, rgba(153,102,255,0.50), rgba(153,102,255,0.02))",
    gridColor: "rgba(255,255,255,0.08)",
    gridX:     46,
    gridY:     40,
});
caption("c-fill-gradient", COL2_X, R3_GY + GH + 4,
    "fillColor: linearGradient(90, ...) — fades from purple to transparent top→bottom");


// ═════════════════════════════════════════════════════════════
// ROW 4 — gridVisible / gridX / gridY  (y: R3_GY + GH + 60)
// ═════════════════════════════════════════════════════════════
const R4_Y  = R3_GY + GH + 60;
const R4_GY = R4_Y + 22;

sectionHeading("h4", PAD, R4_Y, "4 · gridVisible / gridX / gridY — grid line control");

// Left — grid OFF
ui.addAreaGraph({
    id:        "ex-grid-off",
    x:         PAD,
    y:         R4_GY,
    width:     COL_W,
    height:    GH,
    data:      STATIC,
    minValue:  0,
    maxValue:  100,
    lineColor: "#00b4ff",
    lineWidth: 2,
    fillColor: "rgba(0, 180, 255, 0.18)",
    // gridVisible: false turns off ALL grid lines regardless of gridX/gridY
    gridVisible: false,
});
caption("c-grid-off", PAD, R4_GY + GH + 4,
    "gridVisible: false — clean look with no grid lines");

// Right — custom grid spacing (horizontal lines only, no vertical)
ui.addAreaGraph({
    id:        "ex-grid-custom",
    x:         COL2_X,
    y:         R4_GY,
    width:     COL_W,
    height:    GH,
    data:      STATIC,
    minValue:  0,
    maxValue:  100,
    lineColor: "#ffaa00",
    lineWidth: 2,
    fillColor: "rgba(255, 170, 0, 0.15)",
    gridVisible: true,
    // gridX: 0 disables vertical lines
    // gridY: 30 draws horizontal lines every 30px → every 25 units on 0-100 scale
    gridX:     0,
    gridY:     30,
    gridColor: "rgba(255, 170, 0, 0.25)",
});
caption("c-grid-custom", COL2_X, R4_GY + GH + 4,
    "gridX: 0 (vertical off) · gridY: 30 (horizontal only) · tinted gridColor");


// ═════════════════════════════════════════════════════════════
// ROW 5 — minValue / maxValue / autoRange  (y: R4_GY + GH + 60)
// ═════════════════════════════════════════════════════════════
const R5_Y  = R4_GY + GH + 60;
const R5_GY = R5_Y + 22;

sectionHeading("h5", PAD, R5_Y, "5 · minValue / maxValue / autoRange — scale control");

// Left — fixed 0-100 scale (value 50 always at the vertical centre)
ui.addAreaGraph({
    id:        "ex-range-fixed",
    x:         PAD,
    y:         R5_GY,
    width:     COL_W,
    height:    GH,
    // Data only covers 30–70, but the graph shows full 0-100 scale
    data:      [30, 35, 40, 50, 45, 60, 55, 65, 70, 60, 55, 50, 45, 40, 35],
    minValue:  0,      // fixed bottom of scale
    maxValue:  100,    // fixed top of scale
    autoRange: false,  // use minValue / maxValue — NOT data-driven
    lineColor: "#00b4ff",
    lineWidth: 2,
    fillColor: "rgba(0, 180, 255, 0.18)",
    gridColor: "rgba(255,255,255,0.10)",
    gridX:     46,
    gridY:     30,   // lines at 25, 50, 75 on 0-100 scale
});
caption("c-range-fixed", PAD, R5_GY + GH + 4,
    "autoRange: false · minValue: 0 · maxValue: 100 — data 30-70 but scale fixed");

// Right — autoRange: true (graph fills its height regardless of actual values)
ui.addAreaGraph({
    id:        "ex-range-auto",
    x:         COL2_X,
    y:         R5_GY,
    width:     COL_W,
    height:    GH,
    // Same data as left graph — but autoRange zooms into the actual range
    data:      [30, 35, 40, 50, 45, 60, 55, 65, 70, 60, 55, 50, 45, 40, 35],
    minValue:  0,     // ignored when autoRange: true
    maxValue:  100,   // ignored when autoRange: true
    autoRange: true,  // min/max calculated from data (30 and 70 here)
    lineColor: "#ff6600",
    lineWidth: 2,
    fillColor: "rgba(255, 102, 0, 0.18)",
    gridColor: "rgba(255,255,255,0.10)",
    gridX:     46,
    gridY:     30,
});
caption("c-range-auto", COL2_X, R5_GY + GH + 4,
    "autoRange: true — same data but zooms to fit 30-70, fills full height");


// ═════════════════════════════════════════════════════════════
// ROW 6 — graphStart / flip / maxPoints (live scrolling)
// ═════════════════════════════════════════════════════════════
const R6_Y  = R5_GY + GH + 60;
const R6_GY = R6_Y + 22;

sectionHeading("h6", PAD, R6_Y, "6 · graphStart / flip / maxPoints — live scrolling graphs");

// Left — graphStart: "right" (default) — newest data on the right edge
ui.addAreaGraph({
    id:        "ex-scroll-right",
    x:         PAD,
    y:         R6_GY,
    width:     COL_W,
    height:    GH,
    data:      [],
    minValue:  0,
    maxValue:  100,
    // maxPoints: 30 — keeps a 30-second rolling window
    // Point spacing is reserved for 30 slots immediately (no reflow)
    maxPoints: 30,
    // graphStart: "right" — newest value always anchored to the right edge
    graphStart: "right",
    lineColor:  "#00b4ff",
    lineWidth:  2,
    fillColor:  "rgba(0, 180, 255, 0.18)",
    gridColor:  "rgba(255,255,255,0.10)",
    gridX:      46,
    gridY:      40,
});
caption("c-scroll-right", PAD, R6_GY + GH + 4,
    "graphStart: \"right\" · maxPoints: 30 — newest CPU value scrolls from right");

// Right — graphStart: "right" + flip: true — inverted Y axis
ui.addAreaGraph({
    id:        "ex-scroll-flip",
    x:         COL2_X,
    y:         R6_GY,
    width:     COL_W,
    height:    GH,
    data:      [],
    minValue:  0,
    maxValue:  100,
    maxPoints: 30,
    graphStart: "right",
    // flip: true — high values go DOWN, low values go UP (inverted Y axis)
    flip:       true,
    lineColor:  "#ff6600",
    lineWidth:  2,
    fillColor:  "rgba(255, 102, 0, 0.18)",
    gridColor:  "rgba(255,255,255,0.10)",
    gridX:      46,
    gridY:      40,
});
caption("c-scroll-flip", COL2_X, R6_GY + GH + 4,
    "flip: true — same CPU data but Y axis is inverted (high values point down)");


// ═════════════════════════════════════════════════════════════
// BONUS — backgroundColor & padding (cosmetic base options)
// ═════════════════════════════════════════════════════════════
const R7_Y  = R6_GY + GH + 60;
const R7_GY = R7_Y + 22;

sectionHeading("h7", PAD, R7_Y, "7 · backgroundColor & padding — inherited element options");

// Left — solid background color with rounded corners
ui.addAreaGraph({
    id:        "ex-bg-solid",
    x:         PAD,
    y:         R7_GY,
    width:     COL_W,
    height:    GH,
    data:      STATIC,
    minValue:  0,
    maxValue:  100,
    lineColor: "#ffffff",
    lineWidth: 2,
    fillColor: "rgba(255,255,255,0.12)",
    gridColor: "rgba(255,255,255,0.15)",
    gridX:     46,
    gridY:     40,
    // backgroundColor and backgroundColorRadius come from the
    // shared General Element Options (not areaGraph-specific)
    backgroundColor:       "rgba(0, 100, 180, 0.40)",
    backgroundColorRadius: 10,
    gridVisible: false,
});
caption("c-bg-solid", PAD, R7_GY + GH + 4,
    "backgroundColor: rgba(0,100,180,0.40) · backgroundColorRadius: 10");

// Right — gradient background + padding pushes graph inward
ui.addAreaGraph({
    id:        "ex-bg-gradient",
    x:         COL2_X,
    y:         R7_GY,
    width:     COL_W,
    height:    GH,
    data:      STATIC,
    minValue:  0,
    maxValue:  100,
    lineColor: "#ffffff",
    lineWidth: 2,
    fillColor: "rgba(255,255,255,0.12)",
    gridColor: "rgba(255,255,255,0.15)",
    gridX:     46,
    gridY:     40,
    backgroundColor:       "linearGradient(0, #ff8c00, #ff0080)",
    backgroundColorRadius: 10,
    // padding shrinks the graph drawing area inside the background
    padding:   [12, 12, 12, 12],
    gridVisible: false,
});
caption("c-bg-gradient", COL2_X, R7_GY + GH + 4,
    "linearGradient background · padding: [12,12,12,12] — graph inset from edges");


// ═════════════════════════════════════════════════════════════
// LIVE DATA — receive ticks and update the live graphs
// ═════════════════════════════════════════════════════════════
ipcRenderer.on("data:tick", function (event, payloadArg) {
    // Safely parse the JSON payload sent from index.js
    const raw = (payloadArg === undefined) ? event : payloadArg;
    let d;
    try { d = JSON.parse(raw); } catch (e) { return; }

    // ── Row 1 right: live CPU data (empty → filling) ──────────
    ui.setElementProperties("ex-data-live", {
        data: d.cpuHistory,
    });

    // ── Row 6 left: live CPU — graphStart "right" ─────────────
    ui.setElementProperties("ex-scroll-right", {
        data: d.cpuHistory,
    });

    // ── Row 6 right: live CPU — flip:true ─────────────────────
    ui.setElementProperties("ex-scroll-flip", {
        data: d.cpuHistory,
    });

    // ── Status label (reuse caption slot) ─────────────────────
    ui.setElementProperties("c-data-live", {
        text: "data: [] live — CPU " + d.cpu.toFixed(1) + "% · "
            + d.cpuHistory.length + " pts collected",
    });
});
