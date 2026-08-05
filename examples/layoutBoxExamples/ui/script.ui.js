// ─────────────────────────────────────────────────────────────
// LayoutBox Examples — UI Script
//
// Comprehensive showcase of all Novadesk LayoutBox Element features:
//   1.  Flex Row Layout
//   2.  Flex Column Layout
//   3.  Align & Justify
//   4.  Padding Variants
//   5.  Background Colors & Gradients
//   6.  Border Styles
//   7.  Border Radius
//   8–11. Box Shadows (Single, Multi, Inset, Neon Glow)
//   12. Display: None
//   13. Display: List-Item (All 9 listStyleType markers)
//   14. Nested LayoutBoxes
//   15. Interactive Live Playground
// ─────────────────────────────────────────────────────────────

const W   = 840;
const PAD = 28;
const CW  = W - PAD * 2; // 784px usable width

// Palette
const C_HEAD = "#f8fafc";
const C_SUB  = "#94a3b8";
const C_BLUE = "#00f0ff";
const C_PURP = "#a855f7";
const C_PINK = "#ec4899";
const C_GREEN= "#10b981";
const C_AMBER= "#f59e0b";

ui.beginUpdate();

// ── Card container helper ────────────────────────────────────
function sectionCard(id, x, y, w, h, titleText, descText) {
    ui.addShape({
        id: id + "-card-bg",
        type: "rectangle",
        x: x, y: y, width: w, height: h,
        radius: 14,
        fillColor: "rgba(18, 24, 38, 0.95)",
        strokeColor: "rgba(255, 255, 255, 0.08)",
        strokeWidth: 1.5
    });
    ui.addShape({
        id: id + "-bar",
        type: "rectangle",
        x: x + 16, y: y + 16, width: 4, height: 18,
        radius: 2,
        fillColor: C_BLUE
    });
    ui.addText({
        id: id + "-title",
        x: x + 28, y: y + 15,
        text: titleText,
        fontSize: 13,
        fontColor: C_HEAD,
        fontWeight: 700
    });
    if (descText) {
        ui.addText({
            id: id + "-desc",
            x: x + 28, y: y + 36,
            text: descText,
            fontSize: 11,
            fontColor: C_SUB,
            width: w - 48
        });
    }
}

// ── Caption text helper ──────────────────────────────────────
function caption(id, x, y, text, color) {
    ui.addText({
        id: id,
        x: x, y: y,
        text: text,
        fontSize: 10.5,
        fontColor: color || "#64748b",
        width: 250
    });
}

// ─────────────────────────────────────────────────────────────
// HEADER ZONE
// ─────────────────────────────────────────────────────────────
ui.addText({
    id: "app-title",
    x: PAD, y: 26,
    text: "NOVADESK LAYOUTBOX ELEMENT — FEATURE SHOWCASE",
    fontSize: 20, fontColor: C_HEAD, fontWeight: 800
});
ui.addText({
    id: "app-sub",
    x: PAD, y: 58,
    text: "Flex layout engine, CSS-style borders & shadows, list-item markers, display:none, and nested boxes.",
    fontSize: 11.5, fontColor: C_SUB
});
ui.addShape({
    id: "app-hline",
    type: "line",
    startX: PAD, startY: 84, endX: W - PAD, endY: 84,
    strokeColor: "linearGradient(90, #00f0ff, #a855f7, rgba(0,0,0,0))",
    strokeWidth: 2
});

var Y = 102;

// ═══════════════════════════════════════════════════════════
// 1 · FLEX ROW LAYOUT
// ═══════════════════════════════════════════════════════════
var H1 = 150;
sectionCard("s1", PAD, Y, CW, H1, "1 · FLEX ROW LAYOUT (direction: 'row')", "Children automatically align horizontally left-to-right with flex gap spacing.");

ui.addLayoutBox({
    id: "row-box",
    x: PAD + 20, y: Y + 58,
    width: CW - 40, height: 48,
    display: "flex",
    flexDirection: "row",
    gap: 14,
    padding: 8,
    backgroundColor: "rgba(30, 41, 59, 0.7)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    children: [
        { elementType: "shape", id: "r1", type: "rectangle", width: 110, height: 32, fillColor: "rgba(0, 240, 255, 0.85)", borderRadius: 6 },
        { elementType: "shape", id: "r2", type: "rectangle", width: 140, height: 32, fillColor: "rgba(168, 85, 247, 0.85)", borderRadius: 6 },
        { elementType: "shape", id: "r3", type: "rectangle", width: 90,  height: 32, fillColor: "rgba(236, 72, 153, 0.85)", borderRadius: 6 },
        { elementType: "shape", id: "r4", type: "rectangle", width: 160, height: 32, fillColor: "rgba(16, 185, 129, 0.85)", borderRadius: 6 },
        { elementType: "shape", id: "r5", type: "rectangle", width: 100, height: 32, fillColor: "rgba(245, 158, 11, 0.85)", borderRadius: 6 }
    ]
});
caption("lbl-s1", PAD + 20, Y + 118, "flexDirection: 'row'  ·  gap: 14  ·  padding: 8  ·  children auto-positioned horizontally", C_SUB);
Y += H1 + 18;

// ═══════════════════════════════════════════════════════════
// 2 · FLEX COLUMN LAYOUT
// ═══════════════════════════════════════════════════════════
var H2 = 220;
sectionCard("s2", PAD, Y, CW, H2, "2 · FLEX COLUMN LAYOUT (direction: 'column')", "Children automatically stack vertically top-to-bottom with flex gap spacing.");

ui.addLayoutBox({
    id: "col-box",
    x: PAD + 20, y: Y + 58,
    width: 320, height: 140,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 10,
    backgroundColor: "rgba(30, 41, 59, 0.7)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    children: [
        { elementType: "shape", id: "c1", type: "rectangle", width: 280, height: 24, fillColor: "rgba(0, 240, 255, 0.85)", borderRadius: 5 },
        { elementType: "shape", id: "c2", type: "rectangle", width: 220, height: 24, fillColor: "rgba(168, 85, 247, 0.85)", borderRadius: 5 },
        { elementType: "shape", id: "c3", type: "rectangle", width: 160, height: 24, fillColor: "rgba(236, 72, 153, 0.85)", borderRadius: 5 },
        { elementType: "shape", id: "c4", type: "rectangle", width: 100, height: 24, fillColor: "rgba(16, 185, 129, 0.85)", borderRadius: 5 }
    ]
});

ui.addText({
    id: "s2-details",
    x: PAD + 365, y: Y + 65,
    text: "Flex Column Properties:\n• flexDirection: 'column'\n• gap: 8px vertical spacing\n• padding: 10px internal inset\n• children width & order preserved",
    fontSize: 11.5,
    fontColor: C_SUB,
    width: 380
});
Y += H2 + 18;

// ═══════════════════════════════════════════════════════════
// 3 · ALIGNMENT & JUSTIFICATION
// ═══════════════════════════════════════════════════════════
var H3 = 180;
sectionCard("s3", PAD, Y, CW, H3, "3 · ALIGNMENT & JUSTIFICATION (alignItems & justifyContent)", "Demonstrates flex alignment combinations for layout positioning.");

var alignCases = [
    { id: "aj1", align: "flex-start", justify: "flex-start",   lbl: "align: flex-start\njustify: flex-start" },
    { id: "aj2", align: "center",     justify: "center",       lbl: "align: center\njustify: center" },
    { id: "aj3", align: "flex-end",   justify: "flex-end",     lbl: "align: flex-end\njustify: flex-end" },
    { id: "aj4", align: "center",     justify: "space-between",lbl: "align: center\njustify: space-between" }
];
var boxW3 = Math.floor((CW - 40 - 36) / 4); // 175px

for (var i3 = 0; i3 < alignCases.length; i3++) {
    var ac = alignCases[i3];
    var bx3 = PAD + 20 + i3 * (boxW3 + 12);
    ui.addLayoutBox({
        id: ac.id,
        x: bx3, y: Y + 58,
        width: boxW3, height: 74,
        display: "flex",
        flexDirection: "row",
        alignItems: ac.align,
        justifyContent: ac.justify,
        gap: 6, padding: 6,
        backgroundColor: "rgba(30, 41, 59, 0.7)",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
        children: [
            { elementType: "shape", id: ac.id + "a", type: "rectangle", width: 18, height: 46, fillColor: "rgba(0, 240, 255, 0.85)", borderRadius: 4 },
            { elementType: "shape", id: ac.id + "b", type: "rectangle", width: 18, height: 28, fillColor: "rgba(168, 85, 247, 0.85)", borderRadius: 4 },
            { elementType: "shape", id: ac.id + "c", type: "rectangle", width: 18, height: 38, fillColor: "rgba(236, 72, 153, 0.85)", borderRadius: 4 }
        ]
    });
    caption("lbl-s3-" + i3, bx3, Y + 138, ac.lbl, C_SUB);
}
Y += H3 + 18;

// ═══════════════════════════════════════════════════════════
// 4 · PADDING VARIANTS
// ═══════════════════════════════════════════════════════════
var H4 = 175;
sectionCard("s4", PAD, Y, CW, H4, "4 · PADDING VARIANTS (Uniform, [H,V], [L,T,R,B])", "Flexible CSS-like padding syntax for internal content offset.");

var padCases = [
    { id: "p1", padding: 20,             lbl: "padding: 20\n(20px uniform all sides)" },
    { id: "p2", padding: [10, 24],        lbl: "padding: [10, 24]\n(H=10px, V=24px)" },
    { id: "p3", padding: [6, 18, 32, 10], lbl: "padding: [6, 18, 32, 10]\n(L=6 T=18 R=32 B=10)" }
];
var boxW4 = Math.floor((CW - 40 - 28) / 3); // 238px

for (var i4 = 0; i4 < padCases.length; i4++) {
    var pc = padCases[i4];
    var bx4 = PAD + 20 + i4 * (boxW4 + 14);
    ui.addLayoutBox({
        id: pc.id,
        x: bx4, y: Y + 58,
        width: boxW4, height: 72,
        display: "flex",
        flexDirection: "row",
        padding: pc.padding,
        backgroundColor: "rgba(30, 41, 59, 0.7)",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(0, 240, 255, 0.35)",
        children: [
            { elementType: "shape", id: pc.id + "in", type: "rectangle", width: 44, height: 36, fillColor: "rgba(0, 240, 255, 0.85)", borderRadius: 5 }
        ]
    });
    caption("lbl-s4-" + i4, bx4, Y + 136, pc.lbl, C_SUB);
}
Y += H4 + 18;

// ═══════════════════════════════════════════════════════════
// 5 · BACKGROUND COLORS & GRADIENTS
// ═══════════════════════════════════════════════════════════
var H5 = 160;
sectionCard("s5", PAD, Y, CW, H5, "5 · BACKGROUND COLORS & GRADIENTS", "Supports solid hex colors, RGBA opacity, linear gradients, and radial gradients.");

var bgCases = [
    { id: "bg1", bg: "#1e293b",                                              lbl: "backgroundColor: '#1e293b'\nSolid Hex" },
    { id: "bg2", bg: "rgba(168, 85, 247, 0.35)",                             lbl: "backgroundColor: 'rgba(...)'\nRGBA Opacity" },
    { id: "bg3", bg: "linearGradient(135, #0f172a, #1e40af)",               lbl: "backgroundColor: 'linearGradient'\nLinear Gradient" },
    { id: "bg4", bg: "radialGradient(circle, rgba(6,182,212,0.4), #0f172a)", lbl: "backgroundColor: 'radialGradient'\nRadial Circle" }
];
var boxW5 = Math.floor((CW - 40 - 36) / 4);

for (var i5 = 0; i5 < bgCases.length; i5++) {
    var bc = bgCases[i5];
    var bx5 = PAD + 20 + i5 * (boxW5 + 12);
    ui.addLayoutBox({
        id: bc.id,
        x: bx5, y: Y + 58,
        width: boxW5, height: 54,
        display: "flex",
        backgroundColor: bc.bg,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.12)",
        children: []
    });
    caption("lbl-s5-" + i5, bx5, Y + 118, bc.lbl, C_SUB);
}
Y += H5 + 18;

// ═══════════════════════════════════════════════════════════
// 6 · BORDER STYLES
// ═══════════════════════════════════════════════════════════
var H6 = 155;
sectionCard("s6", PAD, Y, CW, H6, "6 · BORDER STYLES (borderStyle, borderWidth, borderColor)", "Supports solid, dashed, dotted, double, groove, and ridge border styles.");

var borderStyles = ["solid", "dashed", "dotted", "double", "groove", "ridge"];
var boxW6 = Math.floor((CW - 40 - 50) / 6); // 115px

for (var i6 = 0; i6 < borderStyles.length; i6++) {
    var bs = borderStyles[i6];
    var bx6 = PAD + 20 + i6 * (boxW6 + 10);
    ui.addLayoutBox({
        id: "bdr-" + bs,
        x: bx6, y: Y + 58,
        width: boxW6, height: 52,
        backgroundColor: "rgba(30, 41, 59, 0.7)",
        borderRadius: 8,
        borderWidth: 3,
        borderColor: "#00f0ff",
        borderStyle: bs,
        children: [
            { elementType: "text", id: "bdr-lbl-" + i6,
              text: bs, fontSize: 11, fontColor: C_HEAD, fontWeight: 700,
              x: 10, y: 16 }
        ]
    });
}
caption("lbl-s6-hint", PAD + 20, Y + 120, "borderStyle accepts: 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'none' | 'inset' | 'outset'", C_SUB);
Y += H6 + 18;

// ═══════════════════════════════════════════════════════════
// 7 · BORDER RADIUS
// ═══════════════════════════════════════════════════════════
var H7 = 150;
sectionCard("s7", PAD, Y, CW, H7, "7 · BORDER RADIUS (borderRadius)", "Rounded corner radii from sharp 0px to smooth 36px pill curves.");

var radii = [0, 8, 14, 22, 36];
var boxW7 = Math.floor((CW - 40 - 40) / 5);

for (var i7 = 0; i7 < radii.length; i7++) {
    var r = radii[i7];
    var bx7 = PAD + 20 + i7 * (boxW7 + 10);
    ui.addLayoutBox({
        id: "rad-" + i7,
        x: bx7, y: Y + 58,
        width: boxW7, height: 50,
        backgroundColor: "rgba(168, 85, 247, 0.25)",
        borderRadius: r,
        borderWidth: 2,
        borderColor: "rgba(168, 85, 247, 0.8)",
        children: [
            { elementType: "text", id: "rad-lbl-" + i7,
              text: r + "px", fontSize: 11, fontColor: "#c084fc", fontWeight: 700,
              x: 12, y: 15 }
        ]
    });
    caption("lbl-s7-" + i7, bx7, Y + 116, "borderRadius: " + r, C_SUB);
}
Y += H7 + 18;

// ═══════════════════════════════════════════════════════════
// 8–11 · BOX SHADOW EFFECTS
// ═══════════════════════════════════════════════════════════
var H8 = 190;
sectionCard("s8", PAD, Y, CW, H8, "8–11 · BOX SHADOW EFFECTS (Outer, Multi-Layer, Inset & Neon Glow)", "Direct2D box shadow rendering with blur, spread, offset, inset, and multi-layer glow arrays.");

var boxW8 = Math.floor((CW - 40 - 36) / 4);

// 1. Single outer drop shadow
ui.addLayoutBox({
    id: "sh-outer",
    x: PAD + 20, y: Y + 60,
    width: boxW8, height: 74,
    backgroundColor: "#1e293b",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    boxShadow: { x: 0, y: 10, blur: 24, spread: -4, color: "rgba(0,0,0,0.65)", inset: false },
    children: [
        { elementType: "text", id: "sh-out-t", text: "Soft Drop\nShadow", fontSize: 11, fontColor: C_HEAD, fontWeight: 700, x: 10, y: 18 }
    ]
});
caption("lbl-sh1", PAD + 20, Y + 144, "Single Drop Shadow\n{ x:0 y:10 blur:24 }", C_SUB);

// 2. Multi-layer shadow
var bx8_2 = PAD + 20 + (boxW8 + 12);
ui.addLayoutBox({
    id: "sh-multi",
    x: bx8_2, y: Y + 60,
    width: boxW8, height: 74,
    backgroundColor: "#1e293b",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    boxShadow: [
        { x: 0, y: 1,  blur: 2,  spread: 0,  color: "rgba(0,0,0,0.15)", inset: false },
        { x: 0, y: 12, blur: 32, spread: -6, color: "rgba(0,0,0,0.55)", inset: false }
    ],
    children: [
        { elementType: "text", id: "sh-mul-t", text: "Multi-Layer\nShadow", fontSize: 11, fontColor: C_HEAD, fontWeight: 700, x: 10, y: 18 }
    ]
});
caption("lbl-sh2", bx8_2, Y + 144, "Multi-Layer Array\n[ {...}, {...} ]", C_SUB);

// 3. Inset shadow
var bx8_3 = PAD + 20 + (boxW8 + 12) * 2;
ui.addLayoutBox({
    id: "sh-inset",
    x: bx8_3, y: Y + 60,
    width: boxW8, height: 74,
    backgroundColor: "#1e293b",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    boxShadow: { x: 0, y: 4, blur: 10, spread: 0, color: "rgba(0,0,0,0.6)", inset: true },
    children: [
        { elementType: "text", id: "sh-ins-t", text: "Inner Inset\nShadow", fontSize: 11, fontColor: C_HEAD, fontWeight: 700, x: 10, y: 18 }
    ]
});
caption("lbl-sh3", bx8_3, Y + 144, "Inner Inset Shadow\n{ inset: true }", C_SUB);

// 4. Neon glow
var bx8_4 = PAD + 20 + (boxW8 + 12) * 3;
ui.addLayoutBox({
    id: "sh-glow",
    x: bx8_4, y: Y + 60,
    width: boxW8, height: 74,
    backgroundColor: "#0f172a",
    borderRadius: 10,
    borderWidth: 0,
    boxShadow: [
        { x: 0, y: 0, blur: 6,  spread: 1, color: "rgba(0,240,255,0.95)", inset: false },
        { x: 0, y: 0, blur: 16, spread: 4, color: "rgba(0,240,255,0.65)", inset: false },
        { x: 0, y: 0, blur: 32, spread: 8, color: "rgba(0,240,255,0.35)", inset: false }
    ],
    children: [
        { elementType: "text", id: "sh-glo-t", text: "Multi-Layer\nNeon Glow", fontSize: 11, fontColor: C_BLUE, fontWeight: 700, x: 10, y: 18 }
    ]
});
caption("lbl-sh4", bx8_4, Y + 144, "Neon Cyan Glow\n3 Zero-Offset Layers", C_SUB);

Y += H8 + 18;

// ═══════════════════════════════════════════════════════════
// 12 · DISPLAY: NONE
// ═══════════════════════════════════════════════════════════
var H12 = 110;
sectionCard("s12", PAD, Y, CW, H12, "12 · DISPLAY: NONE (HIDDEN ELEMENTS)", "Elements set to display: 'none' are skipped during render and layout pass.");

// Hidden LayoutBox (never rendered)
ui.addLayoutBox({
    id: "hidden-box",
    display: "none",
    x: PAD + 20, y: Y + 58,
    width: CW - 40, height: 40,
    backgroundColor: "rgba(239, 68, 68, 0.5)",
    children: []
});

ui.addText({
    id: "none-proof",
    x: PAD + 20, y: Y + 62,
    text: "✓ The hidden LayoutBox (display: 'none') is completely skipped and takes 0px visual space.",
    fontSize: 12,
    fontColor: C_GREEN,
    fontWeight: 600,
    width: CW - 40
});
Y += H12 + 18;

// ═══════════════════════════════════════════════════════════
// 13 · DISPLAY: LIST-ITEM
// ═══════════════════════════════════════════════════════════
var H13 = 430;
sectionCard("s13", PAD, Y, CW, H13, "13 · DISPLAY: LIST-ITEM (BULLETED & NUMBERED LISTS)", "Renders custom list markers using listStyleType property.");

var listTypes = [
    { type: "disc",        lbl: "Filled circle bullet (listStyleType: 'disc')" },
    { type: "circle",      lbl: "Hollow circle bullet (listStyleType: 'circle')" },
    { type: "square",      lbl: "Filled square bullet (listStyleType: 'square')" },
    { type: "decimal",     lbl: "Numeric counter — 1. 2. 3. (listStyleType: 'decimal')" },
    { type: "lower-alpha", lbl: "Lowercase letters — a. b. c. (listStyleType: 'lower-alpha')" },
    { type: "upper-alpha", lbl: "Uppercase letters — A. B. C. (listStyleType: 'upper-alpha')" },
    { type: "lower-roman", lbl: "Lowercase Roman numerals — i. ii. iii. (listStyleType: 'lower-roman')" },
    { type: "upper-roman", lbl: "Uppercase Roman numerals — I. II. III. (listStyleType: 'upper-roman')" },
    { type: "none",        lbl: "No marker (listStyleType: 'none')" }
];

var listY = Y + 58;
for (var i13 = 0; i13 < listTypes.length; i13++) {
    var lt = listTypes[i13];
    ui.addLayoutBox({
        id: "list-item-" + i13,
        x: PAD + 25, y: listY,
        width: CW - 50, height: 34,
        display: "list-item",
        listStyleType: lt.type,
        flexDirection: "column",
        padding: [0, 0, 0, 10],
        backgroundColor: (i13 % 2 === 0) ? "rgba(30, 41, 59, 0.6)" : "rgba(15, 23, 42, 0.6)",
        borderRadius: 6,
        children: [
            {
                elementType: "text",
                id: "list-txt-" + i13,
                text: lt.lbl,
                fontSize: 12,
                fontColor: C_HEAD,
                x: 10, y: 8
            }
        ]
    });
    listY += 38;
}
Y += H13 + 18;

// ═══════════════════════════════════════════════════════════
// 14 · NESTED LAYOUTBOXES
// ═══════════════════════════════════════════════════════════
var H14 = 220;
sectionCard("s14", PAD, Y, CW, H14, "14 · NESTED LAYOUTBOXES (COMPLEX LAYOUT TREES)", "LayoutBoxes nested recursively inside parent LayoutBoxes to build modern complex dashboard components.");

ui.addLayoutBox({
    id: "nest-outer",
    x: PAD + 20, y: Y + 58,
    width: CW - 40, height: 140,
    display: "flex",
    flexDirection: "row",
    gap: 16,
    padding: 14,
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    boxShadow: { x: 0, y: 6, blur: 20, spread: -4, color: "rgba(0,0,0,0.5)", inset: false },
    children: [
        {
            elementType: "layoutbox",
            id: "nest-card-1",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 10,
            width: 220,
            height: 112,
            backgroundColor: "rgba(0, 240, 255, 0.1)",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "rgba(0, 240, 255, 0.35)",
            children: [
                { elementType: "shape", id: "nc1-a", type: "rectangle", width: 180, height: 24, fillColor: "rgba(0, 240, 255, 0.85)", borderRadius: 4 },
                { elementType: "shape", id: "nc1-b", type: "rectangle", width: 140, height: 24, fillColor: "rgba(0, 240, 255, 0.55)", borderRadius: 4 },
                { elementType: "shape", id: "nc1-c", type: "rectangle", width: 100, height: 24, fillColor: "rgba(0, 240, 255, 0.3)",  borderRadius: 4 }
            ]
        },
        {
            elementType: "layoutbox",
            id: "nest-card-2",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 10,
            width: 220,
            height: 112,
            backgroundColor: "rgba(168, 85, 247, 0.1)",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "rgba(168, 85, 247, 0.35)",
            children: [
                { elementType: "shape", id: "nc2-a", type: "rectangle", width: 180, height: 32, fillColor: "rgba(168, 85, 247, 0.85)", borderRadius: 4 },
                { elementType: "shape", id: "nc2-b", type: "rectangle", width: 120, height: 32, fillColor: "rgba(168, 85, 247, 0.55)", borderRadius: 4 }
            ]
        },
        {
            elementType: "layoutbox",
            id: "nest-card-3",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            padding: 10,
            width: 240,
            height: 112,
            backgroundColor: "rgba(236, 72, 153, 0.1)",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "rgba(236, 72, 153, 0.35)",
            children: [
                { elementType: "shape", id: "nc3-a", type: "ellipse", width: 40, height: 40, fillColor: "rgba(236, 72, 153, 0.9)" },
                { elementType: "shape", id: "nc3-b", type: "ellipse", width: 30, height: 30, fillColor: "rgba(236, 72, 153, 0.65)" },
                { elementType: "shape", id: "nc3-c", type: "ellipse", width: 20, height: 20, fillColor: "rgba(236, 72, 153, 0.4)" }
            ]
        }
    ]
});
Y += H14 + 18;

// ═══════════════════════════════════════════════════════════
// 15 · LIVE PLAYGROUND
// ═══════════════════════════════════════════════════════════
var H15 = 190;
sectionCard("s15", PAD, Y, CW, H15, "15 · LIVE PLAYGROUND (DYNAMIC PROPERTY UPDATES)", "Click buttons to dynamically modify background color, border style, and box shadows at runtime.");

// Target LayoutBox
ui.addLayoutBox({
    id: "live-target",
    x: PAD + 20, y: Y + 58,
    width: 240, height: 96,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 14,
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(0, 240, 255, 0.4)",
    children: [
        { elementType: "shape", id: "live-c1", type: "rectangle", width: 44, height: 60, fillColor: "rgba(0, 240, 255, 0.85)", borderRadius: 6 },
        { elementType: "shape", id: "live-c2", type: "rectangle", width: 44, height: 60, fillColor: "rgba(168, 85, 247, 0.85)", borderRadius: 6 },
        { elementType: "shape", id: "live-c3", type: "rectangle", width: 44, height: 60, fillColor: "rgba(236, 72, 153, 0.85)", borderRadius: 6 }
    ]
});

// Control buttons
var ctrlX15 = PAD + 280;
var ctrlY15 = Y + 58;

function makeCtrlBtn(id, x, y, w, labelText, actionFn) {
    ui.addShape({
        id: id + "-bg",
        type: "rectangle",
        x: x, y: y, width: w, height: 30,
        radius: 6,
        fillColor: "rgba(255, 255, 255, 0.05)",
        strokeColor: "rgba(255, 255, 255, 0.16)",
        strokeWidth: 1,
        mouseEventCursor: true,
        mouseEventCursorName: "hand",
        onLeftMouseUp: actionFn
    });
    ui.addText({
        id: id + "-lbl",
        x: x + w / 2, y: y + 8,
        text: labelText,
        fontSize: 10.5,
        fontColor: "#cbd5e1",
        fontWeight: 600,
        width: w,
        align: "center"
    });
}

makeCtrlBtn("ctrl-bg-pink", ctrlX15, ctrlY15, 140, "BG → Pink Tint", function () {
    ui.setElementProperties("live-target", { backgroundColor: "rgba(236, 72, 153, 0.35)" });
    ui.setElementProperties("live-status", { text: "backgroundColor → Pink rgba applied", fontColor: C_PINK });
});

makeCtrlBtn("ctrl-bg-grad", ctrlX15 + 150, ctrlY15, 140, "BG → Linear Gradient", function () {
    ui.setElementProperties("live-target", { backgroundColor: "linearGradient(135, #0f172a, #1e40af)" });
    ui.setElementProperties("live-status", { text: "backgroundColor → linearGradient applied", fontColor: C_BLUE });
});

makeCtrlBtn("ctrl-bdr-dash", ctrlX15, ctrlY15 + 38, 140, "Border → Dashed", function () {
    ui.setElementProperties("live-target", { borderStyle: "dashed", borderColor: "rgba(168, 85, 247, 0.9)", borderWidth: 3 });
    ui.setElementProperties("live-status", { text: "borderStyle → dashed applied", fontColor: C_PURP });
});

makeCtrlBtn("ctrl-shadow-glow", ctrlX15 + 150, ctrlY15 + 38, 140, "Add Neon Glow", function () {
    ui.setElementProperties("live-target", {
        boxShadow: [
            { x: 0, y: 0, blur: 8,  spread: 1, color: "rgba(0,240,255,0.9)", inset: false },
            { x: 0, y: 0, blur: 24, spread: 6, color: "rgba(0,240,255,0.5)", inset: false }
        ]
    });
    ui.setElementProperties("live-status", { text: "boxShadow → neon cyan glow added", fontColor: C_BLUE });
});

makeCtrlBtn("ctrl-reset-all", ctrlX15, ctrlY15 + 76, 290, "Reset Live Target Defaults", function () {
    ui.beginUpdate();
    ui.setElementProperties("live-target", {
        backgroundColor: "rgba(30, 41, 59, 0.8)",
        borderStyle: "solid",
        borderColor: "rgba(0, 240, 255, 0.4)",
        borderWidth: 2,
        boxShadow: {}
    });
    ui.setElementProperties("live-status", { text: "All live target properties reset to default", fontColor: C_SUB });
    ui.endUpdate();
});

// Status Text
ui.addText({
    id: "live-status",
    x: PAD + 20, y: Y + 160,
    text: "Click a button above to test runtime property updates on the target LayoutBox...",
    fontSize: 11,
    fontColor: C_SUB,
    width: CW - 40
});

Y += H15 + 18;

ui.endUpdate();
console.log("=== layoutBoxExamples UI script loaded successfully ===");
