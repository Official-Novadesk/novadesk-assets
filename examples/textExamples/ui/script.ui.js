// ─────────────────────────────────────────────────────────────
// Text Examples — UI Script
//
// Demonstrates all Novadesk Text Element features:
//   1. Typography & Font Weights (thin 100 to black 900, italic, underline, cases, spacing)
//   2. Colors & Gradients (solid colors, multi-stop linear gradients, radial gradients)
//   3. Font Shadows, Glows & 3D Extrusion (single shadow, multi-layer neon glow, 3D, outline)
//   4. Inline Rich Text BBCode/Markup (<b>, <i>, <u>, <s>, <color>, <size>, <font>, <case>)
//   5. Alignment, Clipping & Wrapping (align, textClip: wrap / ellipsis, 9-way alignment)
//   6. Interactive Text Selection & Live Controls (textSelection, selection colors, scroll font size)
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
    ui.addText({
        id: id, x: x, y: y, text: text,
        fontSize: 10.5, fontColor: color || C_SUB, width: 130
    });
}

ui.beginUpdate();

// ─────────────────────────────────────────────────────────────
// HEADER ZONE
// ─────────────────────────────────────────────────────────────
ui.addText({
    id: "app-title",
    x: PAD, y: 28,
    text: "NOVADESK TEXT ELEMENT — FEATURE SHOWCASE",
    fontSize: 21, fontColor: C_HEAD, fontWeight: 800
});
ui.addText({
    id: "app-sub",
    x: PAD, y: 60,
    text: "Hardware-accelerated DirectWrite typography, font gradients, neon glows, 9-way alignment & inline BBCode markup.",
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
// ROW 1 — Typography, Font Weights & Text Cases
// ═══════════════════════════════════════════════════════════
var R1H = 240;

// ── LEFT: Font Weights & Styles ─────────────────────────────
card("r1-left", PAD, Y, CARD_W, R1H, "1 · Font Weights & Text Styles");

var x1 = PAD + 20;
var y1 = Y + 48;

ui.addText({
    id: "t1-thin",
    x: x1, y: y1,
    text: "Thin (100) — Elegant Light Typography",
    fontSize: 16, fontWeight: 100, fontColor: C_HEAD
});

ui.addText({
    id: "t1-regular",
    x: x1, y: y1 + 32,
    text: "Regular (400) — Standard Body Weight",
    fontSize: 16, fontWeight: 400, fontColor: C_HEAD
});

ui.addText({
    id: "t1-bold",
    x: x1, y: y1 + 64,
    text: "Bold (700) — Heavy Contrast Emphasis",
    fontSize: 16, fontWeight: 700, fontColor: C_HEAD
});

ui.addText({
    id: "t1-black",
    x: x1, y: y1 + 96,
    text: "Black (900) — Maximum Impact Weight",
    fontSize: 16, fontWeight: 900, fontColor: C_HEAD
});

ui.addText({
    id: "t1-styles",
    x: x1, y: y1 + 132,
    text: "Styles: Italic, Underline & Strikethrough",
    fontSize: 15, fontWeight: 600, fontColor: C_CYAN,
    fontStyle: "italic", underLine: true, strikeThrough: true
});


// ── RIGHT: Text Cases & Letter Spacing ────────────────────────
card("r1-right", PAD + CARD_W + CARD_GAP, Y, CARD_W, R1H, "2 · Text Cases & Letter Spacing (Tracking)");

var x2 = PAD + CARD_W + CARD_GAP + 20;

ui.addText({
    id: "t2-upper",
    x: x2, y: y1,
    text: "automatic uppercase transformation",
    fontSize: 15, fontWeight: 700, fontColor: C_GOLD,
    case: "upper"
});
label("lbl-upper", x2, y1 + 20, "case: 'upper'");

ui.addText({
    id: "t2-cap",
    x: x2, y: y1 + 45,
    text: "capitalize every first letter of word",
    fontSize: 15, fontWeight: 700, fontColor: C_GREEN,
    case: "capitalize"
});
label("lbl-cap", x2, y1 + 65, "case: 'capitalize'");

ui.addText({
    id: "t2-sp-wide",
    x: x2, y: y1 + 92,
    text: "WIDE TRACKING (+10px)",
    fontSize: 14, fontWeight: 700, fontColor: C_CYAN,
    letterSpacing: 10
});
label("lbl-sp-wide", x2, y1 + 112, "letterSpacing: 10");

ui.addText({
    id: "t2-sp-tight",
    x: x2, y: y1 + 138,
    text: "TIGHT TRACKING (-2px SPACING)",
    fontSize: 15, fontWeight: 700, fontColor: C_PINK,
    letterSpacing: -2
});
label("lbl-sp-tight", x2, y1 + 158, "letterSpacing: -2");

Y += R1H + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 2 — Font Colors & Linear/Radial Gradients
// ═══════════════════════════════════════════════════════════
var R2H = 220;

// ── LEFT: Linear Gradients ──────────────────────────────────
card("r2-left-grad", PAD, Y, CARD_W, R2H, "3 · Linear Font Gradients");

var y2 = Y + 48;

ui.addText({
    id: "t3-lin-horiz",
    x: x1, y: y2,
    text: "Horizontal Gradient (Pink → Gold → Mint)",
    fontSize: 19, fontWeight: 800,
    fontColor: "linearGradient(0, #ff0055, #ffaa00, #00ff88)"
});
label("lbl-lin-h", x1, y2 + 24, "fontColor: 'linearGradient(0, #ff0055, #ffaa00, #00ff88)'");

ui.addText({
    id: "t3-lin-vert",
    x: x1, y: y2 + 54,
    text: "Vertical Gradient (Cyan → White → Magenta)",
    fontSize: 19, fontWeight: 800,
    fontColor: "linearGradient(90, #00ffff, #ffffff, #ff00ff)"
});
label("lbl-lin-v", x1, y2 + 78, "fontColor: 'linearGradient(90, #00ffff, #ffffff, #ff00ff)'");

// Animated angle gradient
ui.addText({
    id: "t3-lin-anim",
    x: x1, y: y2 + 110,
    text: "Rotating Angle Gradient (Live Streamed)",
    fontSize: 20, fontWeight: 900,
    fontColor: "linearGradient(0, #00ffff, #ff0055)"
});
label("lbl-lin-anim", x1, y2 + 136, "angle shifts live via ipcRenderer tick");


// ── RIGHT: Radial Gradients & Solid Colors ───────────────────
card("r2-right-radial", PAD + CARD_W + CARD_GAP, Y, CARD_W, R2H, "4 · Radial Font Gradients & Solid Neon");

ui.addText({
    id: "t4-rad-circle",
    x: x2, y: y2,
    text: "Radial Circle Gradient (Gold → Pink)",
    fontSize: 20, fontWeight: 900,
    fontColor: "radialGradient(circle, #ffff00, #ff0055)"
});
label("lbl-rad-c", x2, y2 + 26, "fontColor: 'radialGradient(circle, #ffff00, #ff0055)'");

ui.addText({
    id: "t4-rad-ellipse",
    x: x2, y: y2 + 56,
    text: "Radial Ellipse Center Glow (Cyan → Deep Navy)",
    fontSize: 19, fontWeight: 800,
    fontColor: "radialGradient(ellipse, #00ffff, #0a1128)"
});
label("lbl-rad-e", x2, y2 + 82, "fontColor: 'radialGradient(ellipse, #00ffff, #0a1128)'");

ui.addText({
    id: "t4-solid-neon",
    x: x2, y: y2 + 115,
    text: "Solid Neon Colors & Alpha Opacity",
    fontSize: 17, fontWeight: 700,
    fontColor: "rgba(0, 255, 136, 0.75)"
});
label("lbl-solid-n", x2, y2 + 138, "fontColor: 'rgba(0, 255, 136, 0.75)'");

Y += R2H + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 3 — Font Shadows, Neon Glows & 3D Extrusion
// ═══════════════════════════════════════════════════════════
var R3H = 220;

// ── LEFT: Drop Shadow & Multi-Layer Glow ────────────────────
card("r3-left-glow", PAD, Y, CARD_W, R3H, "5 · Font Shadows & Multi-Layer Neon Glow");

var y3 = Y + 48;

ui.addText({
    id: "t5-single-shadow",
    x: x1, y: y3,
    text: "Soft Single Drop Shadow",
    fontSize: 22, fontWeight: 800, fontColor: C_HEAD,
    fontShadow: { x: 3, y: 3, blur: 6, color: "rgba(0,0,0,0.9)" }
});
label("lbl-sh-single", x1, y3 + 26, "fontShadow: { x: 3, y: 3, blur: 6, color: 'rgba(0,0,0,0.9)' }");

ui.addText({
    id: "t5-neon-glow",
    x: x1, y: y3 + 60,
    text: "Multi-Layer Neon Cyan Glow",
    fontSize: 22, fontWeight: 900, fontColor: C_CYAN,
    fontShadow: [
        { blur: 4, color: "#00ffff" },
        { blur: 12, color: "#00ffff" },
        { blur: 24, color: "#00ffff" }
    ]
});
label("lbl-sh-glow", x1, y3 + 88, "fontShadow: array of multiple blur radii for neon glow");


// ── RIGHT: 3D Extrusion & Text Outline ───────────────────────
card("r3-right-3d", PAD + CARD_W + CARD_GAP, Y, CARD_W, R3H, "6 · 3D Extruded Text & High-Contrast Outline");

ui.addText({
    id: "t6-3d-text",
    x: x2, y: y3,
    text: "3D Extruded Depth Text",
    fontSize: 24, fontWeight: 900, fontColor: C_HEAD,
    fontShadow: [
        { x: 1, y: 1, color: "#aaaaaa" },
        { x: 2, y: 2, color: "#888888" },
        { x: 3, y: 3, color: "#666666" },
        { x: 4, y: 4, color: "#444444" },
        { x: 5, y: 5, color: "#222222" }
    ]
});
label("lbl-sh-3d", x2, y3 + 28, "fontShadow: 5 offset shadow layers creating 3D depth");

ui.addText({
    id: "t6-outline-text",
    x: x2, y: y3 + 62,
    text: "Colored Stroke Text Outline",
    fontSize: 22, fontWeight: 900, fontColor: C_HEAD,
    fontShadow: [
        { x: -2, y: -2, color: "#ff0055" },
        { x:  2, y: -2, color: "#ff0055" },
        { x: -2, y:  2, color: "#ff0055" },
        { x:  2, y:  2, color: "#ff0055" }
    ]
});
label("lbl-sh-outline", x2, y3 + 90, "fontShadow: 4 cardinal offset points for crisp outline");

Y += R3H + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 4 — Inline Rich Text BBCode/Markup Tags
// ═══════════════════════════════════════════════════════════
var R4H = 240;
card("r4-markup", PAD, Y, W - PAD * 2, R4H, "7 · Inline Rich Text BBCode / Markup Tags (Parsed inside text string)");

var y4 = Y + 48;

ui.addText({
    id: "t7-inline-basic",
    x: x1, y: y4,
    text: "Basic Tags: <b>Bold</b>, <i>Italic</i>, <u>Underline</u>, <s>Strikethrough</s>",
    fontSize: 16, fontColor: C_HEAD
});

ui.addText({
    id: "t7-inline-colors",
    x: x1, y: y4 + 32,
    text: "Inline Colors: <color=#00ffff>Cyan</color>, <color=#ff0055>Magenta</color>, <color=#00ff88>Mint</color>, <color=#ffaa00>Gold</color>",
    fontSize: 16, fontColor: C_HEAD
});

ui.addText({
    id: "t7-inline-gradient",
    x: x1, y: y4 + 64,
    text: "Inline Gradient: <color=linearGradient(0, #00ffff, #ff0055)>Multi-Color Gradient Inside String</color>",
    fontSize: 17, fontWeight: 700, fontColor: C_HEAD
});

ui.addText({
    id: "t7-inline-fonts",
    x: x1, y: y4 + 96,
    text: "Size & Fonts: <size=24>Big 24px</size> <size=12>Small 12px</size> <font=Consolas>Consolas Monospace</font>",
    fontSize: 16, fontColor: C_HEAD
});

ui.addText({
    id: "t7-inline-cases",
    x: x1, y: y4 + 130,
    text: "Inline Cases & Segoe Icons: <case=upper>upper tag</case>  ·  <font=Segoe MDL2 Assets>\uE700</font> Gear  <font=Segoe MDL2 Assets>\uE706</font> Star",
    fontSize: 16, fontColor: C_HEAD
});

Y += R4H + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 5 — Alignment, Clipping & Word Wrapping
// ═══════════════════════════════════════════════════════════
var R5H = 250;

// ── LEFT: Word Wrap & Ellipsis ───────────────────────────────
card("r5-left-clip", PAD, Y, CARD_W, R5H, "8 · Word Wrapping & Ellipsis Truncation (textClip)");

var y5 = Y + 48;

ui.addText({
    id: "t8-wrap",
    x: x1, y: y5,
    width: 480,
    text: "Automatic Word Wrap: This paragraph demonstrates textClip set to 'wrap'. Long sentences automatically break at word boundaries to fit cleanly inside the designated container width.",
    fontSize: 13.5, fontColor: C_HEAD,
    textClip: "wrap"
});
label("lbl-wrap", x1, y5 + 68, "textClip: 'wrap'");

ui.addText({
    id: "t8-ellipsis",
    x: x1, y: y5 + 105,
    width: 440,
    text: "Ellipsis Truncation: This long line of text will be cut off with trailing dots if it exceeds container width.",
    fontSize: 14, fontWeight: 700, fontColor: C_GOLD,
    textClip: "ellipsis"
});
label("lbl-ellipsis", x1, y5 + 128, "textClip: 'ellipsis'");


// ── RIGHT: 9-Way Center-Center Box Alignment ─────────────────
card("r5-right-align", PAD + CARD_W + CARD_GAP, Y, CARD_W, R5H, "9 · 9-Way Alignment in Bounding Container");

var boxX = x2;
var boxY = y5;
var boxW = 480;
var boxH = 140;

// Background box for alignment demo
ui.addShape({
    id: "align-box-bg",
    type: "rectangle",
    x: boxX, y: boxY, width: boxW, height: boxH,
    radius: 10,
    fillColor: "rgba(0, 212, 255, 0.05)",
    strokeColor: C_CYAN,
    strokeWidth: 1
});

// Center-Center Aligned Text inside box
var boxCenterX = boxX + boxW / 2; // Exact center X
var boxCenterY = boxY + boxH / 2; // Exact center Y

ui.addText({
    id: "t9-align-center",
    x: boxCenterX, y: boxCenterY - 12,
    width: boxW, height: boxH,
    text: "CENTER-CENTER ALIGNED TEXT\nExact 9-way container centering",
    fontSize: 15, fontWeight: 800, fontColor: C_CYAN,
    align: "centercenter"
});

label("lbl-align-cc", boxX + 10, boxY + boxH + 10, "align: 'centercenter' (x = boxCenter)");

Y += R5H + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 6 — Interactive Selection & Live Text Controller
// ═══════════════════════════════════════════════════════════
var R6H = 260;
card("r6-playground", PAD, Y, W - PAD * 2, R6H, "10 · Interactive Text Selection & Live Typography Playground");

var pY = Y + 48;

// Selectable Text Block
var selX = PAD + 25;
ui.addText({
    id: "play-selectable",
    x: selX, y: pY,
    width: 480,
    text: "Drag your mouse over this text to test interactive text selection!\nCustom sky-blue selection background and white text highlights.",
    fontSize: 14, fontColor: C_HEAD,
    textSelection: true,
    selectionBackgroundColor: "rgba(0, 212, 255, 0.4)",
    selectionTextColor: "#ffffff",
    textClip: "wrap"
});
label("lbl-selectable", selX, pY + 52, "textSelection: true with custom selection colors");

// Dynamic Target Text
var tgtX = PAD + 540;
ui.addText({
    id: "play-target",
    x: tgtX + 100, y: pY + 10,
    text: "DYNAMIC TEXT",
    fontSize: 22, fontWeight: 700, fontColor: C_CYAN,
    align: "center",
    tooltipTitle: "Interactive Text Element",
    tooltipText: "Scroll Up/Down: Adjust fontSize\nClick buttons to toggle weight, underline & color",
    mouseEventCursor: true,
    mouseEventCursorName: "hand",
    onScrollUp: function () {
        var s = ui.getElementProperty("play-target", "fontSize");
        var next = Math.min(48, s + 2);
        ui.setElementProperties("play-target", { fontSize: next });
        ui.setElementProperties("play-status", { text: "fontSize raised to " + next + "px (via mouse scroll Up)" });
    },
    onScrollDown: function () {
        var s = ui.getElementProperty("play-target", "fontSize");
        var next = Math.max(12, s - 2);
        ui.setElementProperties("play-target", { fontSize: next });
        ui.setElementProperties("play-status", { text: "fontSize lowered to " + next + "px (via mouse scroll Down)" });
    }
});

// Controls for Interactive Text
var btnX = selX;
var btnY = pY + 90;

ui.addText({
    id: "lbl-ctrl-title",
    x: btnX, y: btnY - 5,
    text: "LIVE CONTROLS FOR DYNAMIC TEXT:",
    fontSize: 10.5, fontColor: C_HEAD, fontWeight: 700
});

// Weight Buttons
var weights = [400, 700, 900];
var wLbls = ["Regular", "Bold", "Black"];
function makeWeightBtn(i) {
    var bW = 65;
    var bC = btnX + i * 72 + bW / 2;
    ui.addShape({
        id: "btn-w-" + i,
        type: "rectangle",
        x: btnX + i * 72, y: btnY + 18,
        width: bW, height: 28,
        radius: 6,
        fillColor: (i === 1) ? "rgba(0,255,255,0.2)" : "rgba(255,255,255,0.04)",
        strokeColor: (i === 1) ? C_CYAN : "rgba(255,255,255,0.15)",
        strokeWidth: (i === 1) ? 2 : 1,
        mouseEventCursor: true,
        mouseEventCursorName: "hand",
        onLeftMouseUp: function () {
            ui.beginUpdate();
            ui.setElementProperties("play-target", { fontWeight: weights[i] });
            for (var k = 0; k < weights.length; k++) {
                var sel = (k === i);
                ui.setElementProperties("btn-w-" + k, {
                    fillColor: sel ? "rgba(0,255,255,0.2)" : "rgba(255,255,255,0.04)",
                    strokeColor: sel ? C_CYAN : "rgba(255,255,255,0.15)",
                    strokeWidth: sel ? 2 : 1
                });
            }
            ui.setElementProperties("play-status", { text: "fontWeight set to " + wLbls[i] + " (" + weights[i] + ")" });
            ui.endUpdate();
        }
    });
    ui.addText({
        id: "lbl-btn-w-" + i,
        x: bC, y: btnY + 25,
        text: wLbls[i], fontSize: 10, fontColor: C_HEAD, width: bW, align: "center", fontWeight: 600
    });
}
for (var wi = 0; wi < weights.length; wi++) { makeWeightBtn(wi); }

// Toggle Underline Button
var ulBtnX = btnX + weights.length * 72 + 20;
var ulWidth = 90;
ui.addShape({
    id: "btn-ul",
    type: "rectangle",
    x: ulBtnX, y: btnY + 18,
    width: ulWidth, height: 28,
    radius: 6,
    fillColor: "rgba(255,255,255,0.04)",
    strokeColor: "rgba(255,255,255,0.15)",
    strokeWidth: 1,
    mouseEventCursor: true,
    mouseEventCursorName: "hand",
    onLeftMouseUp: function () {
        var curr = ui.getElementProperty("play-target", "underLine");
        var next = !curr;
        ui.setElementProperties("play-target", { underLine: next });
        ui.setElementProperties("play-status", { text: "underLine toggled → " + next });
    }
});
ui.addText({
    id: "lbl-btn-ul",
    x: ulBtnX + ulWidth / 2, y: btnY + 25,
    text: "Underline", fontSize: 10, fontColor: C_HEAD, width: ulWidth, align: "center", fontWeight: 600
});

// Color Swatch Buttons
var clrX = ulBtnX + ulWidth + 30;
var colors = [C_CYAN, C_PINK, C_GREEN, C_GOLD, "#ffffff"];
var clrNames = ["Cyan", "Pink", "Mint", "Gold", "White"];
function makeColorBtn(i) {
    ui.addShape({
        id: "swatch-c-" + i,
        type: "ellipse",
        x: clrX + i * 36, y: btnY + 14,
        width: 26, height: 26,
        fillColor: colors[i],
        strokeColor: "rgba(255,255,255,0.3)",
        strokeWidth: 1.5,
        mouseEventCursor: true,
        mouseEventCursorName: "hand",
        onLeftMouseUp: function () {
            ui.setElementProperties("play-target", { fontColor: colors[i] });
            ui.setElementProperties("play-status", { text: "fontColor set to " + clrNames[i] });
        }
    });
}
for (var ci = 0; ci < colors.length; ci++) { makeColorBtn(ci); }

// Status Bar
ui.addText({
    id: "play-status",
    x: btnX, y: btnY + 62,
    text: "Interact with the controls above or scroll over 'DYNAMIC TEXT' to change font size live!",
    fontSize: 11.5, fontColor: C_SUB, width: 700
});

ui.endUpdate();

// ═══════════════════════════════════════════════════════════
// LIVE DATA AND ANIMATION LOOP (100ms Ticks)
// ───────────────────────────────────────────────────────────
ipcRenderer.on("data:tick", function (event, payloadArg) {
    var raw = (payloadArg === undefined) ? event : payloadArg;
    var d;
    try { d = JSON.parse(raw); } catch (e) { return; }

    var angle = d.angle;

    ui.beginUpdate();

    // Rotate linear gradient angle on text 3
    ui.setElementProperties("t3-lin-anim", {
        fontColor: "linearGradient(" + angle + ", #00ffff, #ff0055)"
    });

    ui.endUpdate();
});
