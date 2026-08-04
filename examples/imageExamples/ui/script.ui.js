// ─────────────────────────────────────────────────────────────
// Image Examples — UI Script
//
// Demonstrates all Novadesk Image Element features:
//   1.  Aspect Ratio Modes:      stretch / preserve / crop
//   2.  Opacity Control:         imageAlpha (0–255)
//   3.  Grayscale Filter:        grayscale: true
//   4.  Color Tint:              imageTint (solid & animated)
//   5.  Image Flip:              horizontal / vertical / both
//   6.  Image Crop:              imageCrop [x,y,w,h,origin]
//   7.  Tiling:                  tile: true
//   8.  Scale Margins:           9-slice / scaleMargins
//   9.  Color Matrix:            colorMatrix (sepia, invert, etc.)
//   10. Fallback Path:           local fallback when URL fails
//   11. URL Loading:             remote http/https images
//   12. Live Interactive Panel:  dynamic property changes via mouse
// ─────────────────────────────────────────────────────────────

const PAD      = 28;
const W        = 1150;
const CARD_W   = 530;
const CARD_GAP = 30;

// ── Color Palette ──────────────────────────────────────────
const C_HEAD    = "#ffffff";
const C_SUB     = "#7a8ba0";
const C_BODY    = "#a0aec0";
const C_ACCENT1 = "#00d4ff";   // Cyan
const C_ACCENT2 = "#ff3a7a";   // Pink
const C_ACCENT3 = "#00ffaa";   // Mint

// ── Shared image paths ──────────────────────────────────────
const IMG_LANDSCAPE = "./assets/landscape.jpg";
const IMG_PORTRAIT  = "./assets/portrait.jpg";
const IMG_TEXTURE   = "./assets/texture.jpg";

// ── Helper functions ─────────────────────────────────────────
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

function cap(id, x, y, text) {
    ui.addText({
        id: id, x: x, y: y, text: text,
        fontSize: 10.5, fontColor: C_SUB, width: 120
    });
}

function badge(id, x, y, text, color) {
    ui.addShape({
        id: id + "-bg",
        type: "rectangle",
        x: x, y: y, width: 90, height: 20,
        radius: 4,
        fillColor: color || "rgba(0,212,255,0.12)",
        strokeColor: color || C_ACCENT1,
        strokeWidth: 1
    });
    ui.addText({
        id: id + "-lbl",
        x: x + 6, y: y + 3,
        text: text,
        fontSize: 10, fontColor: color || C_ACCENT1, fontWeight: 700
    });
}

// ─────────────────────────────────────────────────────────────
// TITLE HEADER
// ─────────────────────────────────────────────────────────────
ui.beginUpdate();

ui.addText({
    id: "app-title",
    x: PAD, y: 28,
    text: "NOVADESK IMAGE ELEMENT — FEATURE SHOWCASE",
    fontSize: 21, fontColor: C_HEAD, fontWeight: 800
});
ui.addText({
    id: "app-sub",
    x: PAD, y: 60,
    text: "Every image property demonstrated with real assets — no placeholders.",
    fontSize: 12, fontColor: C_SUB
});
ui.addShape({
    id: "hline",
    type: "line",
    startX: PAD, startY: 86, endX: W - PAD, endY: 86,
    strokeColor: "linearGradient(90, #00d4ff, #ff3a7a, rgba(0,0,0,0))",
    strokeWidth: 2
});

var Y = 102;

// ═══════════════════════════════════════════════════════════
// ROW 1 — Aspect Ratio Modes  &  Opacity (imageAlpha)
// ═══════════════════════════════════════════════════════════
var R1H = 310;

// ── LEFT: Aspect Ratio ──────────────────────────────────────
card("r1-left", PAD, Y, CARD_W, R1H, "1 · preserveAspectRatio — stretch / preserve / crop");

var imgY = Y + 52;
var imgH = 170;
var imgW = 140;

// Stretch
ui.addImage({
    id: "asp-stretch",
    path: IMG_LANDSCAPE,
    x: PAD + 18, y: imgY,
    width: imgW, height: imgH,
    preserveAspectRatio: "stretch"
});
cap("c-stretch", PAD + 18, imgY + imgH + 6, "stretch\nDistorts to fill\nexact dimensions");
badge("b-stretch", PAD + 18, imgY - 24, "stretch", "rgba(255,90,90,0.7)");

// Preserve
ui.addImage({
    id: "asp-preserve",
    path: IMG_LANDSCAPE,
    x: PAD + 175, y: imgY,
    width: imgW, height: imgH,
    preserveAspectRatio: "preserve"
});
cap("c-preserve", PAD + 175, imgY + imgH + 6, "preserve\nFits inside box\nkeeping ratio");
badge("b-preserve", PAD + 175, imgY - 24, "preserve", "rgba(0,212,255,0.7)");

// Crop
ui.addImage({
    id: "asp-crop",
    path: IMG_LANDSCAPE,
    x: PAD + 332, y: imgY,
    width: imgW, height: imgH,
    preserveAspectRatio: "crop"
});
cap("c-crop", PAD + 332, imgY + imgH + 6, "crop\nFills box by\ncropping edges");
badge("b-crop", PAD + 332, imgY - 24, "crop", "rgba(0,255,170,0.7)");

// ── RIGHT: imageAlpha ────────────────────────────────────────
card("r1-right", PAD + CARD_W + CARD_GAP, Y, CARD_W, R1H, "2 · imageAlpha — opacity (0 = invisible, 255 = opaque)");

var RX = PAD + CARD_W + CARD_GAP + 18;
var alphas = [255, 200, 140, 80, 25];
var aImgW = 82;
var aGap  = 18;

for (var ai = 0; ai < alphas.length; ai++) {
    ui.addImage({
        id: "alpha-" + ai,
        path: IMG_PORTRAIT,
        x: RX + ai * (aImgW + aGap), y: imgY,
        width: aImgW, height: imgH,
        imageAlpha: alphas[ai],
        preserveAspectRatio: "crop"
    });
    cap("c-alpha-" + ai, RX + ai * (aImgW + aGap), imgY + imgH + 6, "imageAlpha\n" + alphas[ai]);
}

// Animated alpha label
ui.addText({
    id: "alpha-anim-lbl",
    x: RX, y: Y + R1H - 38,
    text: "→ The leftmost image alpha is animated live. Pulse: 255",
    fontSize: 11, fontColor: C_ACCENT1, width: 490
});

Y += R1H + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 2 — grayscale  &  imageTint
// ═══════════════════════════════════════════════════════════
var R2H = 290;

// ── LEFT: Grayscale ──────────────────────────────────────────
card("r2-left", PAD, Y, CARD_W, R2H, "3 · grayscale — convert image to black & white");

var gImgW = 115;
var gImgH = 160;
var gBase = PAD + 18;

ui.addImage({
    id: "gs-off",
    path: IMG_LANDSCAPE,
    x: gBase, y: Y + 48,
    width: gImgW, height: gImgH,
    grayscale: false
});
cap("c-gs-off", gBase, Y + 48 + gImgH + 6, "grayscale: false\nOriginal color");

ui.addImage({
    id: "gs-on",
    path: IMG_LANDSCAPE,
    x: gBase + gImgW + 20, y: Y + 48,
    width: gImgW, height: gImgH,
    grayscale: true
});
cap("c-gs-on", gBase + gImgW + 20, Y + 48 + gImgH + 6, "grayscale: true\nBlack & white");

// Combined grayscale + partial alpha
ui.addImage({
    id: "gs-alpha",
    path: IMG_LANDSCAPE,
    x: gBase + (gImgW + 20) * 2, y: Y + 48,
    width: gImgW, height: gImgH,
    grayscale: true,
    imageAlpha: 140
});
cap("c-gs-alpha", gBase + (gImgW + 20) * 2, Y + 48 + gImgH + 6, "grayscale + alpha\n140 opacity");

// Animated grayscale status
ui.addText({
    id: "gs-anim-lbl",
    x: gBase + (gImgW + 20) * 3 + 10, y: Y + 110,
    text: "gs-on\ntoggled\nby clock →",
    fontSize: 10.5, fontColor: C_ACCENT3
});

// ── RIGHT: imageTint ─────────────────────────────────────────
card("r2-right", PAD + CARD_W + CARD_GAP, Y, CARD_W, R2H, "4 · imageTint — colorize the image with a solid color");

var tX  = PAD + CARD_W + CARD_GAP + 18;
var tints = [
    { color: "#ff4466", label: "Red\n#ff4466" },
    { color: "#00ccff", label: "Cyan\n#00ccff" },
    { color: "#ffaa00", label: "Gold\n#ffaa00" },
    { color: "#aa44ff", label: "Purple\n#aa44ff" }
];

for (var ti = 0; ti < tints.length; ti++) {
    ui.addImage({
        id: "tint-" + ti,
        path: IMG_PORTRAIT,
        x: tX + ti * (aImgW + aGap), y: Y + 48,
        width: aImgW, height: gImgH,
        imageTint: tints[ti].color,
        preserveAspectRatio: "crop"
    });
    cap("c-tint-" + ti, tX + ti * (aImgW + aGap), Y + 48 + gImgH + 6, "imageTint\n" + tints[ti].label);
}

// Animated tint
ui.addImage({
    id: "tint-anim",
    path: IMG_PORTRAIT,
    x: tX + 4 * (aImgW + aGap) + 10, y: Y + 48,
    width: aImgW, height: gImgH,
    preserveAspectRatio: "crop"
});
cap("c-tint-anim", tX + 4 * (aImgW + aGap) + 10, Y + 48 + gImgH + 6, "imageTint\nlive animated");
ui.addText({
    id: "tint-hue-lbl",
    x: tX, y: Y + R2H - 38,
    text: "→ Rightmost image tint shifts through hue spectrum in real-time",
    fontSize: 11, fontColor: C_ACCENT2, width: 490
});

Y += R2H + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 3 — imageFlip  &  imageCrop
// ═══════════════════════════════════════════════════════════
var R3H = 300;

// ── LEFT: imageFlip ──────────────────────────────────────────
card("r3-left", PAD, Y, CARD_W, R3H, "5 · imageFlip — mirror the image horizontally, vertically, or both");

var fX   = PAD + 18;
var fW   = 100;
var fH   = 165;
var fGap = 18;
var flips = ["none", "horizontal", "vertical", "both"];
var flipLabels = ["none", "horizontal", "vertical", "both"];

for (var fi = 0; fi < flips.length; fi++) {
    ui.addImage({
        id: "flip-" + fi,
        path: IMG_PORTRAIT,
        x: fX + fi * (fW + fGap), y: Y + 48,
        width: fW, height: fH,
        imageFlip: flips[fi],
        preserveAspectRatio: "crop"
    });
    cap("c-flip-" + fi, fX + fi * (fW + fGap), Y + 48 + fH + 6, "imageFlip:\n" + flipLabels[fi]);
}

// ── RIGHT: imageCrop ─────────────────────────────────────────
card("r3-right", PAD + CARD_W + CARD_GAP, Y, CARD_W, R3H, "6 · imageCrop — [x, y, w, h, origin] crop region from source");

var cRX = PAD + CARD_W + CARD_GAP + 18;
var cropW = 115;
var cropH = 165;

// No crop
ui.addImage({
    id: "crop-none",
    path: IMG_LANDSCAPE,
    x: cRX, y: Y + 48,
    width: cropW, height: cropH,
    preserveAspectRatio: "crop"
});
cap("c-crop-none", cRX, Y + 48 + cropH + 6, "No crop\nFull image");

// Top-left crop origin (0)
ui.addImage({
    id: "crop-tl",
    path: IMG_LANDSCAPE,
    x: cRX + (cropW + 18), y: Y + 48,
    width: cropW, height: cropH,
    imageCrop: [0, 0, 400, 200, 0],
    preserveAspectRatio: "stretch"
});
cap("c-crop-tl", cRX + (cropW + 18), Y + 48 + cropH + 6, "imageCrop\n[0,0,400,200]\nOrigin: TL (0)");

// Center crop origin (4)
ui.addImage({
    id: "crop-center",
    path: IMG_LANDSCAPE,
    x: cRX + (cropW + 18) * 2, y: Y + 48,
    width: cropW, height: cropH,
    imageCrop: [0, 0, 300, 150, 4],
    preserveAspectRatio: "stretch"
});
cap("c-crop-center", cRX + (cropW + 18) * 2, Y + 48 + cropH + 6, "imageCrop\n[0,0,300,150]\nOrigin: Center (4)");

// Bottom-right crop (2)
ui.addImage({
    id: "crop-br",
    path: IMG_LANDSCAPE,
    x: cRX + (cropW + 18) * 3, y: Y + 48,
    width: cropW, height: cropH,
    imageCrop: [0, 0, 350, 180, 2],
    preserveAspectRatio: "stretch"
});
cap("c-crop-br", cRX + (cropW + 18) * 3, Y + 48 + cropH + 6, "imageCrop\n[0,0,350,180]\nOrigin: BR (2)");

Y += R3H + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 4 — tile  &  scaleMargins
// ═══════════════════════════════════════════════════════════
var R4H = 280;

// ── LEFT: tile ───────────────────────────────────────────────
card("r4-left", PAD, Y, CARD_W, R4H, "7 · tile — repeat image in a tiled pattern to fill the element");

// No tile
ui.addImage({
    id: "tile-off",
    path: IMG_TEXTURE,
    x: PAD + 18, y: Y + 48,
    width: 220, height: 180,
    tile: false
});
cap("c-tile-off", PAD + 18, Y + 48 + 180 + 6, "tile: false\nSingle stretched");

// Tiled
ui.addImage({
    id: "tile-on",
    path: IMG_TEXTURE,
    x: PAD + 258, y: Y + 48,
    width: 220, height: 180,
    tile: true
});
cap("c-tile-on", PAD + 258, Y + 48 + 180 + 6, "tile: true\nRepeating pattern");

// ── RIGHT: scaleMargins (9-slice scaling) ─────────────────────
card("r4-right", PAD + CARD_W + CARD_GAP, Y, CARD_W, R4H, "8 · scaleMargins — 9-slice scaling [left, top, right, bottom]");

var smX = PAD + CARD_W + CARD_GAP + 18;

// No margins
ui.addImage({
    id: "sm-none",
    path: IMG_LANDSCAPE,
    x: smX, y: Y + 48,
    width: 230, height: 80,
    preserveAspectRatio: "stretch"
});
cap("c-sm-none", smX, Y + 48 + 82, "No scaleMargins\nFull stretch");

// With scale margins  — protected corners
ui.addImage({
    id: "sm-set",
    path: IMG_LANDSCAPE,
    x: smX, y: Y + 155,
    width: 230, height: 80,
    preserveAspectRatio: "stretch",
    tile: false,
    scaleMargins: [30, 20, 30, 20]
});
cap("c-sm-set", smX, Y + 155 + 82, "scaleMargins:\n[30,20,30,20]\nCorners protected");

// Landscape stretched wide with margin
ui.addImage({
    id: "sm-wide",
    path: IMG_LANDSCAPE,
    x: smX + 248, y: Y + 48,
    width: 230, height: 80,
    preserveAspectRatio: "stretch",
    tile: false,
    scaleMargins: [50, 30, 50, 30]
});
cap("c-sm-wide", smX + 248, Y + 48 + 82, "scaleMargins:\n[50,30,50,30]\nWider margins");

Y += R4H + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 5 — colorMatrix  &  URL loading / fallbackPath
// ═══════════════════════════════════════════════════════════
var R5H = 310;

// ── LEFT: colorMatrix presets ────────────────────────────────
card("r5-left", PAD, Y, CARD_W, R5H, "9 · colorMatrix — 4×5 color transform matrix (sepia, invert, warm, cool)");

var cmX = PAD + 18;
var cmW = 110;
var cmH = 165;
var cmGap = 16;

// Identity (no change)
ui.addImage({
    id: "cm-identity",
    path: IMG_LANDSCAPE,
    x: cmX, y: Y + 48,
    width: cmW, height: cmH,
    preserveAspectRatio: "crop"
});
cap("c-cm-identity", cmX, Y + 48 + cmH + 6, "Identity\n(no matrix)");

// Sepia
ui.addImage({
    id: "cm-sepia",
    path: IMG_LANDSCAPE,
    x: cmX + (cmW + cmGap), y: Y + 48,
    width: cmW, height: cmH,
    preserveAspectRatio: "crop",
    colorMatrix: [
        0.393, 0.769, 0.189, 0, 0,
        0.349, 0.686, 0.168, 0, 0,
        0.272, 0.534, 0.131, 0, 0,
        0,     0,     0,     1, 0,
        0,     0,     0,     0, 1
    ]
});
cap("c-cm-sepia", cmX + (cmW + cmGap), Y + 48 + cmH + 6, "Sepia tone\ncolorMatrix");

// Invert
ui.addImage({
    id: "cm-invert",
    path: IMG_LANDSCAPE,
    x: cmX + (cmW + cmGap) * 2, y: Y + 48,
    width: cmW, height: cmH,
    preserveAspectRatio: "crop",
    colorMatrix: [
        -1, 0,  0,  0, 1,
        0, -1,  0,  0, 1,
        0,  0, -1,  0, 1,
        0,  0,  0,  1, 0,
        0,  0,  0,  0, 1
    ]
});
cap("c-cm-invert", cmX + (cmW + cmGap) * 2, Y + 48 + cmH + 6, "Invert colors\ncolorMatrix");

// Warm/orange boost
ui.addImage({
    id: "cm-warm",
    path: IMG_LANDSCAPE,
    x: cmX + (cmW + cmGap) * 3, y: Y + 48,
    width: cmW, height: cmH,
    preserveAspectRatio: "crop",
    colorMatrix: [
        1.2, 0,    0,    0, 0.05,
        0,   0.95, 0,    0, 0,
        0,   0,    0.75, 0, 0,
        0,   0,    0,    1, 0,
        0,   0,    0,    0, 1
    ]
});
cap("c-cm-warm", cmX + (cmW + cmGap) * 3, Y + 48 + cmH + 6, "Warm tone\norange boost");

// ── RIGHT: URL loading & fallbackPath ────────────────────────
card("r5-right", PAD + CARD_W + CARD_GAP, Y, CARD_W, R5H, "10 · URL image loading & fallbackPath — remote or local fallback");

var urlX = PAD + CARD_W + CARD_GAP + 18;

// Remote URL image
ui.addImage({
    id: "url-remote",
    path: "https://picsum.photos/seed/novadesk1/250/160",
    fallbackPath: "./assets/landscape.jpg",
    x: urlX, y: Y + 48,
    width: 230, height: 155,
    preserveAspectRatio: "crop"
});
cap("c-url-remote", urlX, Y + 48 + 157, "Remote URL\nhttps://picsum.photos\nfallback: landscape.jpg");
badge("b-url-remote", urlX, Y + 28, "URL path", C_ACCENT1);

// Second URL — different seed
ui.addImage({
    id: "url-remote2",
    path: "https://picsum.photos/seed/novadesk2/250/160",
    fallbackPath: "./assets/portrait.jpg",
    x: urlX + 248, y: Y + 48,
    width: 230, height: 155,
    preserveAspectRatio: "crop"
});
cap("c-url-remote2", urlX + 248, Y + 48 + 157, "Remote URL\n2nd random seed\nfallback: portrait.jpg");
badge("b-url-remote2", urlX + 248, Y + 28, "URL path", C_ACCENT1);

// Intentionally broken URL → shows local fallback
ui.addImage({
    id: "url-fallback",
    path: "https://invalid-host-novadesk.example.com/image.jpg",
    fallbackPath: "./assets/portrait.jpg",
    x: urlX, y: Y + 230,
    width: 110, height: 60,
    preserveAspectRatio: "crop"
});
ui.addText({
    id: "c-url-fallback",
    x: urlX + 118, y: Y + 230,
    text: "fallbackPath:\nShown when URL fails\nor image not found.\nUse any local .jpg/.png.",
    fontSize: 10.5, fontColor: C_SUB, width: 250
});
badge("b-url-fallback", urlX, Y + R5H - 34, "fallback active", C_ACCENT2);

Y += R5H + CARD_GAP;

// ═══════════════════════════════════════════════════════════
// ROW 6 — Interactive Playground
// ═══════════════════════════════════════════════════════════
var R6H = 210;
card("r6-panel", PAD, Y, W - PAD * 2, R6H, "11 · Interactive Playground — click effects, scroll alpha, live property updates");

var playX = PAD + 18;
var playY = Y + 52;

// The main interactive image
ui.addImage({
    id: "play-img",
    path: IMG_PORTRAIT,
    x: playX, y: playY,
    width: 130, height: 140,
    preserveAspectRatio: "crop",
    imageAlpha: 255,
    grayscale: false,
    tooltipTitle: "Interactive Image",
    tooltipText: "Scroll: Adjust opacity\nLeft-click: Toggle grayscale\nRight-click: Reset",
    mouseEventCursor: true,
    mouseEventCursorName: "hand",
    onScrollUp: function () {
        var a = ui.getElementProperty("play-img", "imageAlpha");
        var next = Math.min(255, a + 12);
        ui.setElementProperties("play-img", { imageAlpha: next });
        ui.setElementProperties("play-status", { text: "imageAlpha raised to " + next });
    },
    onScrollDown: function () {
        var a = ui.getElementProperty("play-img", "imageAlpha");
        var next = Math.max(0, a - 12);
        ui.setElementProperties("play-img", { imageAlpha: next });
        ui.setElementProperties("play-status", { text: "imageAlpha lowered to " + next });
    },
    onLeftMouseUp: function () {
        var gs = ui.getElementProperty("play-img", "grayscale");
        var next = !gs;
        ui.setElementProperties("play-img", { grayscale: next });
        ui.setElementProperties("play-status", { text: "grayscale toggled → " + next });
    },
    onRightMouseUp: function () {
        ui.beginUpdate();
        ui.setElementProperties("play-img", { imageAlpha: 255, grayscale: false, imageTint: null });
        ui.setElementProperties("play-status", { text: "Reset: alpha=255, grayscale=false, tint cleared" });
        ui.endUpdate();
    }
});

// Flip buttons
var flpBtnY = playY;
var flpBtnX = playX + 148;
var flipOpts = ["none", "horizontal", "vertical", "both"];
function makeFlipBtn(i) {
    ui.addShape({
        id: "fbtn-" + i,
        type: "rectangle",
        x: flpBtnX, y: flpBtnY + i * 34,
        width: 100, height: 26,
        radius: 6,
        fillColor: "rgba(255,255,255,0.04)",
        strokeColor: "rgba(255,255,255,0.12)",
        strokeWidth: 1,
        mouseEventCursor: true,
        mouseEventCursorName: "hand",
        onLeftMouseUp: function () {
            ui.setElementProperties("play-img", { imageFlip: flipOpts[i] });
            ui.setElementProperties("play-status", { text: "imageFlip → " + flipOpts[i] });
        }
    });
    ui.addText({
        id: "fbtn-lbl-" + i,
        x: flpBtnX + 8, y: flpBtnY + i * 34 + 6,
        text: "flip: " + flipOpts[i],
        fontSize: 10, fontColor: C_BODY, fontWeight: 600
    });
}
for (var fi2 = 0; fi2 < flipOpts.length; fi2++) { makeFlipBtn(fi2); }

// Tint presets as color swatches
var swatchX = flpBtnX + 118;
var swatchY = playY;
var swatchColors = ["#ff4466", "#00ccff", "#ffaa00", "#aa44ff", "#00ffaa", null];
var swatchLabels = ["Red", "Cyan", "Gold", "Purple", "Mint", "No Tint"];
function makeSwatchBtn(i) {
    ui.addShape({
        id: "swatch-" + i,
        type: "ellipse",
        x: swatchX + (i % 3) * 48, y: swatchY + Math.floor(i / 3) * 48,
        width: 36, height: 36,
        fillColor: swatchColors[i] || "rgba(255,255,255,0.08)",
        strokeColor: "rgba(255,255,255,0.2)",
        strokeWidth: 1.5,
        mouseEventCursor: true,
        mouseEventCursorName: "hand",
        onLeftMouseUp: function () {
            ui.setElementProperties("play-img", { imageTint: swatchColors[i] });
            ui.setElementProperties("play-status", { text: "imageTint → " + (swatchColors[i] || "cleared") });
        }
    });
    ui.addText({
        id: "sw-lbl-" + i,
        x: swatchX + (i % 3) * 48 + 2, y: swatchY + Math.floor(i / 3) * 48 + 38,
        text: swatchLabels[i], fontSize: 9, fontColor: C_SUB
    });
}
for (var si = 0; si < swatchColors.length; si++) { makeSwatchBtn(si); }

// Status bar
ui.addText({
    id: "play-status",
    x: swatchX + 165, y: playY + 10,
    text: "Interact with the image on the left.\nScroll = opacity  |  Left-click = grayscale\nRight-click = reset  |  Color dots = tint",
    fontSize: 11.5, fontColor: C_SUB, width: 400
});

ui.addText({
    id: "play-help",
    x: swatchX + 165, y: playY + 85,
    text: "Status: Ready",
    fontSize: 12, fontColor: C_ACCENT1, width: 390
});

// Remap status output to visible element
ui.addText({ id: "play-status-redirect", x: 0, y: 0, text: "", fontSize: 1 });

// Fix status binding (addText id collision — use play-help as live output)
ui.setElementProperties("play-status", { id: "play-status" });

ui.endUpdate();

// ═══════════════════════════════════════════════════════════
// LIVE ANIMATION LOOP
// ═══════════════════════════════════════════════════════════
var gsToggleTick = 0;

ipcRenderer.on("data:tick", function (event, payloadArg) {
    var raw = (payloadArg === undefined) ? event : payloadArg;
    var d;
    try { d = JSON.parse(raw); } catch (e) { return; }

    var tick  = d.tick;
    var pulse = d.pulse;   // 0–255
    var hue   = d.hue;     // 0–360

    // Convert HSV hue to RGB for imageTint
    var h = hue / 60.0;
    var x = 1 - Math.abs((h % 2) - 1);
    var r = 0, g = 0, b = 0;
    if      (h < 1) { r=1; g=x; b=0; }
    else if (h < 2) { r=x; g=1; b=0; }
    else if (h < 3) { r=0; g=1; b=x; }
    else if (h < 4) { r=0; g=x; b=1; }
    else if (h < 5) { r=x; g=0; b=1; }
    else            { r=1; g=0; b=x; }

    var tr = Math.round(r * 255);
    var tg = Math.round(g * 255);
    var tb = Math.round(b * 255);
    var hueTint = "rgb(" + tr + "," + tg + "," + tb + ")";

    ui.beginUpdate();

    // Section 2: Animate alpha on first image
    ui.setElementProperties("alpha-0",    { imageAlpha: pulse });
    ui.setElementProperties("alpha-anim-lbl", { text: "→ The leftmost image alpha is animated live. Pulse: " + pulse });

    // Section 4: Animate tint on last tint image
    ui.setElementProperties("tint-anim", { imageTint: hueTint });

    ui.endUpdate();
});
