// ─────────────────────────────────────────────────────────────
// Shape Examples — UI Script
//
// Demonstrates all Novadesk Shape Element features:
//   1. Basic shapes: rectangle, rounded corners, ellipses
//   2. Line features: line caps, line joins, dash patterns
//   3. Real-time metrics visualization using Arc shapes
//   4. Dynamic Bezier curve morphing (Quadratic & Cubic)
//   5. Complex SVG path rendering & marching-ants animations
//   6. Constructive Solid Geometry (CSG) shape combining
//   7. Interactive playground with mouse events & scroll adjustments
// ─────────────────────────────────────────────────────────────

const PAD = 30;
const W = 1150;

// Color Scheme Constants (Cosmic dark theme)
const COLOR_BG_CARD    = "rgba(20, 20, 30, 0.75)";
const COLOR_BORDER_CARD= "rgba(255, 255, 255, 0.08)";
const COLOR_TXT_HEAD   = "#ffffff";
const COLOR_TXT_SUB    = "#8e9bb0";
const COLOR_TXT_BODY   = "#a0aec0";
const COLOR_ACCENT_1   = "#00ffff"; // Cyan
const COLOR_ACCENT_2   = "#ff0055"; // Pink
const COLOR_ACCENT_3   = "#00ff88"; // Green
const COLOR_ACCENT_4   = "#ffaa00"; // Orange

function createCard(id, x, y, width, height, title) {
    // Card panel background
    ui.addShape({
        id: id + "-bg",
        type: "rectangle",
        x: x, y: y,
        width: width, height: height,
        radius: 16,
        fillColor: COLOR_BG_CARD,
        strokeColor: COLOR_BORDER_CARD,
        strokeWidth: 1.5,
        bevelType: "inset",
        bevelWidth: 1.5,
        bevelColor: "#ffffff",
        bevelAlpha: 15
    });

    // Card title
    ui.addText({
        id: id + "-title",
        x: x + 20, y: y + 18,
        text: title,
        fontSize: 14,
        fontColor: COLOR_TXT_HEAD,
        fontWeight: 700
    });
}

function label(id, x, y, text, color) {
    ui.addText({
        id: id,
        x: x, y: y,
        text: text,
        fontSize: 11,
        fontColor: color || COLOR_TXT_BODY,
        width: 150
    });
}

ui.beginUpdate();

// ═══════════════════════════════════════════════════════════
// HEADER ZONE
// ═══════════════════════════════════════════════════════════
ui.addText({
    id: "app-title",
    x: PAD, y: 30,
    text: "NOVADESK HARDWARE-ACCELERATED SHAPE ENGINE",
    fontSize: 22,
    fontColor: COLOR_TXT_HEAD,
    fontWeight: 800
});

ui.addText({
    id: "app-subtitle",
    x: PAD, y: 62,
    text: "Interactive demonstration of vector shapes, strokes, boolean operations, and real-time morphing.",
    fontSize: 12,
    fontColor: COLOR_TXT_SUB,
    fontWeight: 400
});

// Title bottom divider accent line
ui.addShape({
    id: "header-line",
    type: "line",
    startX: PAD, startY: 90,
    endX: W - PAD, endY: 90,
    strokeColor: "linearGradient(90, #00ffff, #ff0055, rgba(0,0,0,0))",
    strokeWidth: 2
});

var Y = 110;
var CARD_W = 530;
var CARD_GAP = 30;

// ═══════════════════════════════════════════════════════════
// ROW 1: Basic Geometries & Stroke/Line Attributes
// ═══════════════════════════════════════════════════════════
var r1h = 320;

// LEFT CARD: Rects & Ellipses
createCard("r1-left", PAD, Y, CARD_W, r1h, "1 · Basic Vector Geometries");

// Rounded Rectangle
ui.addShape({
    id: "r1-rect-1",
    type: "rectangle",
    x: PAD + 25, y: Y + 60,
    width: 90, height: 90,
    radius: 20,
    fillColor: "linearGradient(135, #ff0055, #7700ff)",
    strokeColor: "#ffffff",
    strokeWidth: 2
});
label("lbl-r1-rect-1", PAD + 25, Y + 165, "Rounded Rectangle\nGradient fill & Stroke", COLOR_TXT_SUB);

// Glass Rectangle with Inset Bevel
ui.addShape({
    id: "r1-rect-glass",
    type: "rectangle",
    x: PAD + 150, y: Y + 60,
    width: 90, height: 90,
    radius: 8,
    fillColor: "rgba(255, 255, 255, 0.04)",
    strokeColor: "rgba(255, 255, 255, 0.2)",
    strokeWidth: 1.5,
    bevelType: "inset",
    bevelWidth: 2,
    bevelColor: "#ffffff",
    bevelAlpha: 40
});
label("lbl-r1-rect-glass", PAD + 150, Y + 165, "Glass Panel\nGlassmorphism + Bevel", COLOR_TXT_SUB);

// Ellipse 1: Radial Gradient Fill
ui.addShape({
    id: "r1-ellipse-1",
    type: "ellipse",
    x: PAD + 275, y: Y + 60,
    width: 90, height: 90,
    fillColor: "radialGradient(circle, #00ffcc, #0044ff)",
    strokeColor: "rgba(255, 255, 255, 0.3)",
    strokeWidth: 1
});
label("lbl-r1-ellipse-1", PAD + 275, Y + 165, "Circle / Ellipse\nRadial gradient fill", COLOR_TXT_SUB);

// Ellipse 2: Rotated Hollow Ring
ui.addShape({
    id: "r1-ellipse-2",
    type: "ellipse",
    x: PAD + 400, y: Y + 75,
    width: 90, height: 60,
    fillColor: "rgba(0,0,0,0)",
    strokeColor: "linearGradient(0, #ffdd00, #ff5500)",
    strokeWidth: 4,
    rotate: 15
});
label("lbl-r1-ellipse-2", PAD + 400, Y + 165, "Rotated Ellipse\nGradient outline, 15°", COLOR_TXT_SUB);


// RIGHT CARD: Stroke & Line Attributes
createCard("r1-right", PAD + CARD_W + CARD_GAP, Y, CARD_W, r1h, "2 · Stroke Caps, Joins & Dashes");

var lx = PAD + CARD_W + CARD_GAP + 25;
var lineW = 160;

// Stroke Caps
ui.addShape({
    id: "stroke-cap-round",
    type: "line",
    startX: lx, startY: Y + 75,
    endX: lx + lineW, endY: Y + 75,
    strokeColor: COLOR_ACCENT_1,
    strokeWidth: 10,
    strokeStartCap: "Round",
    strokeEndCap: "Round"
});
label("lbl-cap-round", lx, Y + 92, "Caps: Round", COLOR_TXT_SUB);

ui.addShape({
    id: "stroke-cap-triangle",
    type: "line",
    startX: lx, startY: Y + 130,
    endX: lx + lineW, endY: Y + 130,
    strokeColor: COLOR_ACCENT_2,
    strokeWidth: 10,
    strokeStartCap: "Triangle",
    strokeEndCap: "Triangle"
});
label("lbl-cap-triangle", lx, Y + 147, "Caps: Triangle", COLOR_TXT_SUB);

ui.addShape({
    id: "stroke-dashes",
    type: "line",
    startX: lx, startY: Y + 185,
    endX: lx + lineW, endY: Y + 185,
    strokeColor: COLOR_ACCENT_3,
    strokeWidth: 5,
    strokeDashes: [10, 5],
    strokeDashCap: "Round"
});
label("lbl-dashes", lx, Y + 197, "Dashes: [10, 5], Round cap", COLOR_TXT_SUB);

// Joins (Zigzag path)
var zigzagX = lx + lineW + 35;
var zigzagPath = "M0 65 L45 0 L90 65 L135 0 L180 65";
ui.addShape({
    id: "stroke-join-showcase",
    type: "path",
    x: zigzagX, y: Y + 85,
    pathData: zigzagPath,
    fillColor: "rgba(0,0,0,0)",
    strokeColor: COLOR_ACCENT_4,
    strokeWidth: 10,
    strokeLineJoin: "Round"
});
label("lbl-join-text", zigzagX, Y + 165, "Line Joins: Round\n(Supports Bevel/Miter)", COLOR_TXT_SUB);


Y += r1h + CARD_GAP;
var ROW2_Y = Y;

// ═══════════════════════════════════════════════════════════
// ROW 2: Arcs as Progress Gauges & Bezier Curves Morphing
// ═══════════════════════════════════════════════════════════
var r2h = 360;

// LEFT CARD: Vector Arcs
createCard("r2-left", PAD, Y, CARD_W, r2h, "3 · Vector Arc Gauges (Real-Time System Metrics)");

// Gauge 1: CPU (Arc)
ui.addShape({
    id: "cpu-arc-bg",
    type: "arc",
    x: PAD + 40, y: Y + 65,
    width: 170, height: 170,
    startAngle: 135, endAngle: 405,
    clockwise: true,
    fillColor: "rgba(0,0,0,0)",
    strokeColor: "rgba(255,255,255,0.05)",
    strokeWidth: 14
});

ui.addShape({
    id: "cpu-arc-fg",
    type: "arc",
    x: PAD + 40, y: Y + 65,
    width: 170, height: 170,
    startAngle: 135, endAngle: 135,
    clockwise: true,
    fillColor: "rgba(0,0,0,0)",
    strokeColor: "linearGradient(90, #00ffff, #00ff88)",
    strokeWidth: 14,
    strokeStartCap: "Round",
    strokeEndCap: "Round"
});

ui.addText({
    id: "cpu-lbl",
    x: PAD + 95, y: Y + 125,
    text: "CPU",
    fontSize: 12,
    fontColor: COLOR_TXT_SUB,
    fontWeight: 600
});

ui.addText({
    id: "cpu-val",
    x: PAD + 80, y: Y + 145,
    text: "0.0%",
    fontSize: 22,
    fontColor: "#ffffff",
    fontWeight: 800
});

// Gauge 2: MEM (Arc)
ui.addShape({
    id: "mem-arc-bg",
    type: "arc",
    x: PAD + 290, y: Y + 65,
    width: 170, height: 170,
    startAngle: 135, endAngle: 405,
    clockwise: true,
    fillColor: "rgba(0,0,0,0)",
    strokeColor: "rgba(255,255,255,0.05)",
    strokeWidth: 14
});

ui.addShape({
    id: "mem-arc-fg",
    type: "arc",
    x: PAD + 290, y: Y + 65,
    width: 170, height: 170,
    startAngle: 135, endAngle: 135,
    clockwise: true,
    fillColor: "rgba(0,0,0,0)",
    strokeColor: "linearGradient(90, #7700ff, #ff0055)",
    strokeWidth: 14,
    strokeStartCap: "Round",
    strokeEndCap: "Round"
});

ui.addText({
    id: "mem-lbl",
    x: PAD + 345, y: Y + 125,
    text: "MEMORY",
    fontSize: 12,
    fontColor: COLOR_TXT_SUB,
    fontWeight: 600
});

ui.addText({
    id: "mem-val",
    x: PAD + 330, y: Y + 145,
    text: "0.0%",
    fontSize: 22,
    fontColor: "#ffffff",
    fontWeight: 800
});

label("lbl-gauges-desc", PAD + 60, Y + 260, "Arc shapes with startAngle/endAngle in degrees.\nNo images or assets used, rendered procedurally.", COLOR_TXT_SUB);
ui.setElementProperties("lbl-gauges-desc", { width: 400 });


// RIGHT CARD: Morphing Curves
createCard("r2-right", PAD + CARD_W + CARD_GAP, Y, CARD_W, r2h, "4 · Real-Time Morphing Bezier Curves");

var cx = PAD + CARD_W + CARD_GAP + 25;

// Section Label
label("lbl-curves-inst", cx, Y + 50, "Direct2D Quadratic and Cubic Bezier Curves.\nWhite lines track moving control handles.", COLOR_TXT_SUB);
ui.setElementProperties("lbl-curves-inst", { width: 450 });

// Quadratic Bezier Setup
// start (cx, Y+190) -> end (cx+220, Y+190). Control (cx+110, Y+130)
ui.addShape({
    id: "curve-quad",
    type: "curve",
    startX: cx, startY: Y + 200,
    endX: cx + 220, endY: Y + 200,
    controlX: cx + 110, controlY: Y + 120,
    curveType: "quadratic",
    fillColor: "rgba(0,0,0,0)",
    strokeColor: COLOR_ACCENT_1,
    strokeWidth: 4
});

ui.addShape({
    id: "quad-line1",
    type: "line",
    startX: cx, startY: Y + 200,
    endX: cx + 110, endY: Y + 120,
    strokeColor: "rgba(255,255,255,0.15)",
    strokeWidth: 1.5
});
ui.addShape({
    id: "quad-line2",
    type: "line",
    startX: cx + 220, startY: Y + 200,
    endX: cx + 110, endY: Y + 120,
    strokeColor: "rgba(255,255,255,0.15)",
    strokeWidth: 1.5
});
ui.addShape({
    id: "quad-handle",
    type: "ellipse",
    x: cx + 105, y: Y + 115,
    width: 10, height: 10,
    fillColor: "#ffffff",
    strokeColor: COLOR_ACCENT_1,
    strokeWidth: 1.5
});
label("lbl-quad-curve", cx + 50, Y + 225, "Quadratic (Single Control)", COLOR_TXT_SUB);

// Cubic Bezier Setup
var cbx = cx + 250;
ui.addShape({
    id: "curve-cubic",
    type: "curve",
    startX: cbx, startY: Y + 200,
    endX: cbx + 220, endY: Y + 200,
    controlX: cbx + 50, controlY: Y + 120,
    control2X: cbx + 170, control2Y: cbx + 280, // will be updated dynamically
    curveType: "cubic",
    fillColor: "rgba(0,0,0,0)",
    strokeColor: COLOR_ACCENT_2,
    strokeWidth: 4
});

ui.addShape({
    id: "cubic-line1",
    type: "line",
    startX: cbx, startY: Y + 200,
    endX: cbx + 50, endY: Y + 120,
    strokeColor: "rgba(255,255,255,0.15)",
    strokeWidth: 1.5
});
ui.addShape({
    id: "cubic-line2",
    type: "line",
    startX: cbx + 220, startY: Y + 200,
    endX: cbx + 170, endY: Y + 280,
    strokeColor: "rgba(255,255,255,0.15)",
    strokeWidth: 1.5
});
ui.addShape({
    id: "cubic-handle1",
    type: "ellipse",
    x: cbx + 45, y: Y + 115,
    width: 10, height: 10,
    fillColor: "#ffffff",
    strokeColor: COLOR_ACCENT_2,
    strokeWidth: 1.5
});
ui.addShape({
    id: "cubic-handle2",
    type: "ellipse",
    x: cbx + 165, y: Y + 275,
    width: 10, height: 10,
    fillColor: "#ffffff",
    strokeColor: COLOR_ACCENT_2,
    strokeWidth: 1.5
});
label("lbl-cubic-curve", cbx + 50, Y + 225, "Cubic (Two Control Points)", COLOR_TXT_SUB);

Y += r2h + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 3: SVG Paths & CSG Combinations
// ═══════════════════════════════════════════════════════════
var r3h = 380;

// LEFT CARD: SVG Paths
createCard("r3-left", PAD, Y, CARD_W, r3h, "5 · SVG Custom Paths & Marching Ants");

// Drawing a star path
ui.addShape({
    id: "svg-star",
    type: "path",
    x: PAD + 40, y: Y + 65,
    pathData: "M50 5 L61 39 L98 39 L68 59 L79 93 L50 72 L21 93 L32 59 L2 39 L39 39 Z",
    fillColor: "rgba(0, 255, 204, 0.08)",
    strokeColor: "linearGradient(45, #00ffcc, #0077ff)",
    strokeWidth: 3,
    strokeLineJoin: "Round"
});
label("lbl-svg-star", PAD + 25, Y + 185, "Procedural SVG Star\nRounded line joins", COLOR_TXT_SUB);

// Marching Ants Panel
ui.addShape({
    id: "marching-ants-border",
    type: "rectangle",
    x: PAD + 230, y: Y + 65,
    width: 260, height: 160,
    radius: 12,
    fillColor: "rgba(255, 255, 255, 0.02)",
    strokeColor: COLOR_ACCENT_1,
    strokeWidth: 2,
    strokeDashes: [10, 6],
    strokeDashCap: "Flat"
});

ui.addText({
    id: "ants-title",
    x: PAD + 250, y: Y + 90,
    text: "DYNAMIC DASH OFFSET",
    fontSize: 12,
    fontColor: "#ffffff",
    fontWeight: 700
});

ui.addText({
    id: "ants-text",
    x: PAD + 250, y: Y + 115,
    text: "This border creates a 'marching ants' effect by continuously shifting the strokeDashOffset in real-time.",
    fontSize: 10.5,
    fontColor: COLOR_TXT_BODY,
    width: 220
});

label("lbl-marching-ants-desc", PAD + 230, Y + 245, "Demonstrates how dash offset shift creates fluid animations without re-creating geometry.", COLOR_TXT_SUB);
ui.setElementProperties("lbl-marching-ants-desc", { width: 260 });


// RIGHT CARD: CSG Boolean Combinations
createCard("r3-right", PAD + CARD_W + CARD_GAP, Y, CARD_W, r3h, "6 · CSG Constructive Solid Geometry Combinations");

var rx2 = PAD + CARD_W + CARD_GAP + 25;

// Crescent Moon (Exclude operation)
ui.addShape({
    id: "moon-base",
    type: "ellipse",
    x: rx2 + 40, y: Y + 65,
    width: 130, height: 130,
    fillColor: "#fff700",
    strokeColor: "rgba(0,0,0,0)"
});

ui.addShape({
    id: "moon-cut",
    type: "ellipse",
    x: rx2 + 75, y: Y + 45,
    width: 130, height: 130,
    fillColor: "#000000",
    strokeColor: "rgba(0,0,0,0)"
});

ui.addShape({
    id: "moon-combo",
    type: "combine",
    base: "moon-base",
    consume: true,
    ops: [
        { id: "moon-cut", mode: "exclude", consume: true }
    ],
    x: 0, y: 0,
    fillColor: "linearGradient(135, #ffe600, #ff5500)",
    strokeColor: "#ffffff",
    strokeWidth: 1.5
});
label("lbl-moon-combo", rx2 + 30, Y + 215, "Moon Crescent\n(ellipse exclude ellipse)\nAnimates rotate parameter", COLOR_TXT_SUB);

// Hollow Cog (Union / Intersect / Exclude operations)
ui.addShape({
    id: "cog-outer",
    type: "ellipse",
    x: rx2 + 280, y: Y + 65,
    width: 130, height: 130,
    fillColor: "#7f8c8d"
});

ui.addShape({
    id: "cog-hole",
    type: "ellipse",
    x: rx2 + 325, y: Y + 110,
    width: 40, height: 40,
    fillColor: "#000000"
});

ui.addShape({
    id: "cog-combo",
    type: "combine",
    base: "cog-outer",
    consume: true,
    ops: [
        { id: "cog-hole", mode: "exclude", consume: true }
    ],
    x: 0, y: 0,
    fillColor: "linearGradient(0, #576574, #222f3e)",
    strokeColor: COLOR_ACCENT_1,
    strokeWidth: 2
});
label("lbl-cog-combo", rx2 + 270, Y + 215, "Hollow Wheel Ring\n(ellipse exclude ellipse)\nRotates in reverse direction", COLOR_TXT_SUB);

label("lbl-combine-desc", rx2, Y + 285, "CSG operations (union, intersect, xor, exclude) are calculated on-the-fly and output as hardware-accelerated path elements.", COLOR_TXT_SUB);
ui.setElementProperties("lbl-combine-desc", { width: 480 });


Y += r3h + CARD_GAP;
var ROW3_Y = Y;

// ═══════════════════════════════════════════════════════════
// ROW 4: Vector Shape Playground (Interactive)
// ═══════════════════════════════════════════════════════════
var r4h = 190;
createCard("r4-panel", PAD, Y, W - PAD * 2, r4h, "7 · Interactive Vector Shape Playground");

// The Interactive Target Shape
ui.addShape({
    id: "play-target",
    type: "rectangle",
    x: PAD + 30, y: Y + 55,
    width: 160, height: 100,
    radius: 12,
    fillColor: "#ff0055",
    strokeColor: "#ffffff",
    strokeWidth: 3,
    tooltipTitle: "Interactive Shape",
    tooltipText: "Scroll Up/Down: Change Stroke Width\nClick below colors: Change Fill Color",
    mouseEventCursor: true,
    mouseEventCursorName: "hand",
    onScrollUp: function () {
        var w = ui.getElementProperty("play-target", "strokeWidth");
        var nextW = Math.min(25, w + 1);
        ui.setElementProperties("play-target", { strokeWidth: nextW });
        ui.setElementProperties("play-status", { text: "Adjusted stroke width to " + nextW + "px (via mouse scroll Up)" });
    },
    onScrollDown: function () {
        var w = ui.getElementProperty("play-target", "strokeWidth");
        var nextW = Math.max(0, w - 1);
        ui.setElementProperties("play-target", { strokeWidth: nextW });
        ui.setElementProperties("play-status", { text: "Adjusted stroke width to " + nextW + "px (via mouse scroll Down)" });
    }
});

// Color options setup
var colors = ["#ff0055", "#00b4ff", "#00ff88", "#ffaa00", "linearGradient(45, #7700ff, #00ffff)", "rgba(255, 255, 255, 0.08)"];
var labels = ["Pink", "Cyan", "Green", "Gold", "Neon", "Glass"];

function selectColor(index) {
    ui.beginUpdate();
    var c = colors[index];
    ui.setElementProperties("play-target", { fillColor: c });
    
    // Highlight active border
    for (var i = 0; i < 6; i++) {
        var isSel = (i === index);
        ui.setElementProperties("btn-c-" + i, { 
            strokeWidth: isSel ? 3 : 1.5,
            strokeColor: isSel ? "#ffffff" : "rgba(255,255,255,0.2)"
        });
    }
    ui.setElementProperties("play-status", { text: "Changed fill style to: " + labels[index] });
    ui.endUpdate();
}

// Add interactive color pickers
var bx = PAD + 230;
var by = Y + 55;
var bs = 45;
var bGap = 15;

ui.addText({
    id: "color-label",
    x: bx, y: by - 5,
    text: "CHOOSE FILL COLOR OR STYLE:",
    fontSize: 10.5,
    fontColor: COLOR_TXT_HEAD,
    fontWeight: 700
});

// Helper builder for color buttons
function makeColorBtn(i) {
    ui.addShape({
        id: "btn-c-" + i,
        type: "rectangle",
        x: bx + i * (bs + bGap), y: by + 18,
        width: bs, height: bs,
        radius: 8,
        fillColor: colors[i],
        strokeColor: (i === 0) ? "#ffffff" : "rgba(255,255,255,0.2)",
        strokeWidth: (i === 0) ? 3 : 1.5,
        mouseEventCursor: true,
        mouseEventCursorName: "hand",
        onLeftMouseUp: function () {
            selectColor(i);
        }
    });
}

for (var i = 0; i < 6; i++) {
    makeColorBtn(i);
}

// Dash Toggle Button
ui.addShape({
    id: "btn-dash-toggle",
    type: "rectangle",
    x: bx + 6 * (bs + bGap) + 15, y: by + 18,
    width: 130, height: bs,
    radius: 8,
    fillColor: "rgba(255, 255, 255, 0.04)",
    strokeColor: "rgba(255, 255, 255, 0.15)",
    strokeWidth: 1.5,
    mouseEventCursor: true,
    mouseEventCursorName: "hand",
    onLeftMouseUp: function () {
        var dashes = ui.getElementProperty("play-target", "strokeDashes");
        var active = (dashes && dashes.length > 0);
        ui.beginUpdate();
        if (active) {
            ui.setElementProperties("play-target", { strokeDashes: [] });
            ui.setElementProperties("btn-dash-toggle", { fillColor: "rgba(255, 255, 255, 0.04)", strokeColor: "rgba(255, 255, 255, 0.15)" });
            ui.setElementProperties("play-status", { text: "Disabled shape stroke dash pattern." });
        } else {
            ui.setElementProperties("play-target", { strokeDashes: [12, 6] });
            ui.setElementProperties("btn-dash-toggle", { fillColor: "rgba(0, 255, 136, 0.1)", strokeColor: "#00ff88" });
            ui.setElementProperties("play-status", { text: "Enabled shape stroke dash pattern [12, 6]." });
        }
        ui.endUpdate();
    }
});

ui.addText({
    id: "btn-dash-lbl",
    x: bx + 6 * (bs + bGap) + 36, y: by + 33,
    text: "Toggle Dashes",
    fontSize: 11,
    fontColor: "#ffffff",
    fontWeight: 700
});

// Interactive Status Text
ui.addText({
    id: "play-status",
    x: bx, y: by + 80,
    text: "Try interacting with the shapes: click on color pickers, toggle dashes, or scroll on the target card!",
    fontSize: 11.5,
    fontColor: COLOR_TXT_SUB,
    width: 600
});


ui.endUpdate();

// ═══════════════════════════════════════════════════════════
// LIVE DATA AND ANIMATION LOOP (100ms Ticks)
// ═══════════════════════════════════════════════════════════
ipcRenderer.on("data:tick", function (event, payloadArg) {
    var raw = (payloadArg === undefined) ? event : payloadArg;
    var d;
    try {
        d = JSON.parse(raw);
    } catch (e) {
        return;
    }

    var cpu = d.cpu;
    var mem = d.mem;
    var wave = d.wave; // sin wave between -1 and 1
    var tick = d.tick;

    // Convert metrics to angles for our vector Arc gauges (135° to 405°)
    var cpuAngle = 135 + (cpu / 100) * 270;
    var memAngle = 135 + (mem / 100) * 270;

    // Calculate dynamic bezier coordinates based on our slow wave
    // Quadratic Control Y oscillates between ROW2_Y+60 and ROW2_Y+180
    var qcy = ROW2_Y + 120 + wave * 60;
    var qcx = (PAD + CARD_W + CARD_GAP + 25) + 110 + Math.cos(tick * 0.05) * 40;

    // Cubic Controls twist in opposite directions
    var cbx_start = PAD + CARD_W + CARD_GAP + 25 + 250;
    var ccy1 = ROW2_Y + 120 + wave * 70;
    var ccy2 = ROW2_Y + 280 - wave * 70;
    var ccx1 = cbx_start + 50 + Math.sin(tick * 0.03) * 30;
    var ccx2 = cbx_start + 170 - Math.sin(tick * 0.03) * 30;

    // Marching ants dash offset
    var antsOffset = (tick * 1.2) % 16;

    // Update everything inside a single batched pass
    ui.beginUpdate();

    // Gauges
    ui.setElementProperties("cpu-arc-fg", { endAngle: cpuAngle });
    ui.setElementProperties("cpu-val", { text: cpu.toFixed(1) + "%" });
    ui.setElementProperties("mem-arc-fg", { endAngle: memAngle });
    ui.setElementProperties("mem-val", { text: mem.toFixed(1) + "%" });

    // Quadratic curve morphing
    ui.setElementProperties("curve-quad", { controlX: qcx, controlY: qcy });
    ui.setElementProperties("quad-line1", { endX: qcx, endY: qcy });
    ui.setElementProperties("quad-line2", { endX: qcx, endY: qcy });
    ui.setElementProperties("quad-handle", { x: qcx - 5, y: qcy - 5 });

    // Cubic curve morphing
    ui.setElementProperties("curve-cubic", { 
        controlX: ccx1, controlY: ccy1,
        control2X: ccx2, control2Y: ccy2 
    });
    ui.setElementProperties("cubic-line1", { endX: ccx1, endY: ccy1 });
    ui.setElementProperties("cubic-line2", { endX: ccx2, endY: ccy2 });
    ui.setElementProperties("cubic-handle1", { x: ccx1 - 5, y: ccy1 - 5 });
    ui.setElementProperties("cubic-handle2", { x: ccx2 - 5, y: ccy2 - 5 });

    // Marching Ants
    ui.setElementProperties("marching-ants-border", { strokeDashOffset: antsOffset });

    // Rotating CSG shapes
    ui.setElementProperties("moon-combo", { rotate: tick * 1.5 });
    ui.setElementProperties("cog-combo", { rotate: -tick * 2.0 });

    ui.endUpdate();
});
