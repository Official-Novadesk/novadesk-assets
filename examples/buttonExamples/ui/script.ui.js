// ─────────────────────────────────────────────────────────────
// Button Examples — UI Script
//
// The Button Element uses a 3-frame horizontal sprite strip:
//   Frame 0 (left third)   → normal state
//   Frame 1 (middle third) → clicked / pressed state
//   Frame 2 (right third)  → hovered state
//
// Key properties:
//   buttonImageName  — path to the 3-frame sprite strip PNG
//   buttonAction     — callback fired on left-mouse-up (click)
//   imageTint        — tint color (RGBA) applied to the strip
//   imageAlpha       — global opacity 0–255
//   grayscale        — true/false desaturation
//   imageFlip        — "horizontal" | "vertical" | "both"
//   onMouseOver      — hover-enter callback
//   onMouseLeave     — hover-leave callback
//   tooltipTitle     — tooltip title string
//   tooltipText      — tooltip body string
//   mouseEventCursor — if true, cursor changes on hover
//   mouseEventCursorName — cursor name e.g. "hand"
// ─────────────────────────────────────────────────────────────

var W = 680;
var PAD = 28;

// ── Helpers ─────────────────────────────────────────────────

function sectionTitle(id, x, y, text) {
    ui.addText({
        id: id + "-title",
        x: x, y: y,
        text: text,
        fontSize: 12,
        fontColor: "#4a90d9",
        fontWeight: 700,
        case: "upper",
        letterSpacing: 2
    });
    ui.addShape({
        id: id + "-hline",
        type: "line",
        startX: x, startY: y + 18,
        endX: W - PAD, endY: y + 18,
        strokeColor: "rgba(74,144,217,0.25)",
        strokeWidth: 1
    });
}

function cardBg(id, x, y, w, h) {
    ui.addShape({
        id: id + "-card",
        type: "rectangle",
        x: x, y: y, width: w, height: h,
        radius: 14,
        fillColor: "rgba(20, 26, 40, 0.8)",
        strokeColor: "rgba(255,255,255,0.06)",
        strokeWidth: 1.5
    });
}

function label(id, x, y, text) {
    ui.addText({
        id: id,
        x: x, y: y,
        text: text,
        fontSize: 10.5,
        fontColor: "#556070",
        width: 280
    });
}

ui.beginUpdate();
// ── Status feedback bar ──────────────────────────────────────
ui.addShape({
    id: "status-bar",
    type: "rectangle",
    x: PAD, y: 6, width: W - PAD * 2, height: 22,
    radius: 6,
    fillColor: "rgba(0, 0, 0, 0.69)"
});
ui.addText({
    id: "status-text",
    x: PAD + 10, y: 10,
    text: "Hover or click any button below to see feedback here...",
    fontSize: 11,
    fontColor: "#3a4a5a",
    width: W - PAD * 2
});

function setStatus(msg, color) {
    ui.beginUpdate();
    ui.setElementProperties("status-text", { text: msg, fontColor: color || "#00d0ff" });
    ui.endUpdate();
}

var Y = 36;

// ─────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────
ui.addText({
    id: "header-title",
    x: PAD, y: Y,
    text: "NOVADESK BUTTON ELEMENT",
    fontSize: 22, fontWeight: 800, fontColor: "#ffffff"
});
ui.addText({
    id: "header-sub",
    x: PAD, y: Y + 32,
    text: "3-frame horizontal sprite strip — normal · clicked · hovered states with pixel-perfect transparent hit-testing.",
    fontSize: 11.5, fontColor: "#4a5568", width: W - PAD * 2
});
ui.addShape({
    id: "header-line",
    type: "line",
    startX: PAD, startY: Y + 54,
    endX: W - PAD, endY: Y + 54,
    strokeColor: "linearGradient(90, #00d0ff, #8855ff, rgba(0,0,0,0))",
    strokeWidth: 2
});
Y += 68;

// ─────────────────────────────────────────────────────────────
// SECTION 1 — Button Variants / Styles
// ─────────────────────────────────────────────────────────────
sectionTitle("s1", PAD, Y, "1 · Button Variants");
Y += 28;
cardBg("s1", PAD, Y, W - PAD * 2, 270);
Y += 16;

var BX = PAD + 20;

// — Primary button ——————————————————————————————————————————
ui.addText({ id: "lbl-primary", x: BX, y: Y + 4, text: "Primary", fontSize: 13, fontColor: "#ffffff", fontWeight: 700 });
ui.addButton({
    id: "btn-primary",
    x: BX + 90, y: Y,
    width: 160, height: 48,
    buttonImageName: "./assets/btn-primary.png",
    mouseEventCursor: true,
    mouseEventCursorName: "hand",
    tooltipTitle: "Primary Button",
    tooltipText: "buttonImageName: 'btn-primary.png'\nFrame 0 normal · Frame 1 clicked · Frame 2 hovered",
    onMouseOver: function () { setStatus("Primary button — hovered (frame 2 shown)"); },
    onMouseLeave: function () { setStatus("Left primary button (frame 0 restored)"); },
    buttonAction: function () { setStatus("✓ Primary button clicked! (frame 1 shown during press)", "#00ffaa"); }
});
label("lbl-primary-hint", BX + 265, Y + 14, "buttonImageName: 'btn-primary.png'");
Y += 56;

// — Secondary button ——————————————————————————————————————————
ui.addText({ id: "lbl-secondary", x: BX, y: Y + 4, text: "Secondary", fontSize: 13, fontColor: "#ffffff", fontWeight: 700 });
ui.addButton({
    id: "btn-secondary",
    x: BX + 90, y: Y,
    width: 160, height: 48,
    buttonImageName: "./assets/btn-secondary.png",
    mouseEventCursor: true,
    mouseEventCursorName: "hand",
    onMouseOver: function () { setStatus("Secondary button — hovered (outline intensifies)"); },
    onMouseLeave: function () { setStatus("Left secondary button"); },
    buttonAction: function () { setStatus("✓ Secondary button clicked!", "#aaddff"); }
});
label("lbl-secondary-hint", BX + 265, Y + 14, "Outline/glass style sprite");
Y += 56;

// — Danger button ——————————————————————————————————————————
ui.addText({ id: "lbl-danger", x: BX, y: Y + 4, text: "Danger", fontSize: 13, fontColor: "#ff4060", fontWeight: 700 });
ui.addButton({
    id: "btn-danger",
    x: BX + 90, y: Y,
    width: 160, height: 48,
    buttonImageName: "./assets/btn-danger.png",
    mouseEventCursor: true,
    mouseEventCursorName: "hand",
    onMouseOver: function () { setStatus("Danger button — hovered", "#ff6070"); },
    onMouseLeave: function () { setStatus("Left danger button"); },
    buttonAction: function () { setStatus("⚠ Danger action triggered!", "#ff4060"); }
});
label("lbl-danger-hint", BX + 265, Y + 14, "Red destructive action style");
Y += 56;

// — Success button ——————————————————————————————————————————
ui.addText({ id: "lbl-success", x: BX, y: Y + 4, text: "Success", fontSize: 13, fontColor: "#00cc70", fontWeight: 700 });
ui.addButton({
    id: "btn-success",
    x: BX + 90, y: Y,
    width: 160, height: 48,
    buttonImageName: "./assets/btn-success.png",
    mouseEventCursor: true,
    mouseEventCursorName: "hand",
    onMouseOver: function () { setStatus("Success button — hovered", "#00cc70"); },
    onMouseLeave: function () { setStatus("Left success button"); },
    buttonAction: function () { setStatus("✓ Success — confirm action!", "#00ff88"); }
});
label("lbl-success-hint", BX + 265, Y + 14, "Green confirmation style");
Y += 56;

Y += 10; // card padding

// ─────────────────────────────────────────────────────────────
// SECTION 2 — Shape Variants (Pill, Icon, Toggle)
// ─────────────────────────────────────────────────────────────
sectionTitle("s2", PAD, Y, "2 · Shape Variants — Pill, Icon & Tag");
Y += 28;
cardBg("s2", PAD, Y, W - PAD * 2, 130);
Y += 16;

// Pill button
ui.addText({ id: "lbl-pill", x: BX, y: Y + 4, text: "Pill", fontSize: 13, fontColor: "#aa88ff", fontWeight: 700 });
ui.addButton({
    id: "btn-pill",
    x: BX + 90, y: Y,
    width: 180, height: 48,
    buttonImageName: "./assets/btn-pill.png",
    mouseEventCursor: true,
    mouseEventCursorName: "hand",
    onMouseOver: function () { setStatus("Pill button — fully rounded corners"); },
    onMouseLeave: function () { setStatus("Left pill button"); },
    buttonAction: function () { setStatus("✓ Pill button clicked!", "#aa88ff"); }
});
label("lbl-pill-hint", BX + 285, Y + 14, "radius: 24 (fully rounded)");
Y += 58;

// Icon button
ui.addText({ id: "lbl-icon", x: BX, y: Y + 4, text: "Icon", fontSize: 13, fontColor: "#7090cc", fontWeight: 700 });
ui.addButton({
    id: "btn-icon-sq",
    x: BX + 90, y: Y,
    width: 52, height: 52,
    buttonImageName: "./assets/btn-icon.png",
    mouseEventCursor: true,
    mouseEventCursorName: "hand",
    tooltipTitle: "Icon / Square Button",
    tooltipText: "Square 52×52 button with rounded corners.\nTransparent hit test ignores corners.",
    onMouseOver: function () { setStatus("Icon button — square 52×52 with auto frame detection"); },
    onMouseLeave: function () { setStatus("Left icon button"); },
    buttonAction: function () { setStatus("✓ Square icon button clicked!", "#7090cc"); }
});
label("lbl-icon-hint", BX + 160, Y + 16, "52×52 square — strip is 156×52");

Y += 76;

// ─────────────────────────────────────────────────────────────
// SECTION 3 — Image Effects (tint, grayscale, alpha, flip)
// ─────────────────────────────────────────────────────────────
sectionTitle("s3", PAD, Y, "3 · Image Effects — tint · grayscale · alpha · flip");
Y += 28;
cardBg("s3", PAD, Y, W - PAD * 2, 190);
Y += 16;

// NOTE: Effects section uses btn-neutral.png (white/light base) so tints show correct hue.
// Applying imageTint to a saturated color (cyan) multiplies channels and produces dark results.

// Normal (reference)
ui.addText({ id: "lbl-eff-ref", x: BX, y: Y, text: "Normal (neutral)", fontSize: 11, fontColor: "#556070" });
ui.addButton({
    id: "btn-eff-ref",
    x: BX, y: Y + 18,
    width: 120, height: 40,
    buttonImageName: "./assets/btn-neutral.png",
    mouseEventCursor: true, mouseEventCursorName: "hand",
    buttonAction: function () { setStatus("Reference — white/neutral base, no effects applied"); }
});

// Tinted red
ui.addText({ id: "lbl-eff-tint", x: BX + 140, y: Y, text: "imageTint: red", fontSize: 11, fontColor: "#556070" });
ui.addButton({
    id: "btn-eff-tint",
    x: BX + 140, y: Y + 18,
    width: 120, height: 40,
    buttonImageName: "./assets/btn-neutral.png",
    imageTint: "rgba(255,80,80,0.85)",
    mouseEventCursor: true, mouseEventCursorName: "hand",
    buttonAction: function () { setStatus("imageTint: 'rgba(255,80,80,0.85)' on white base — shows clean red", "#ff5050"); }
});

// Grayscale
ui.addText({ id: "lbl-eff-gs", x: BX + 280, y: Y, text: "grayscale: true", fontSize: 11, fontColor: "#556070" });
ui.addButton({
    id: "btn-eff-gs",
    x: BX + 280, y: Y + 18,
    width: 120, height: 40,
    buttonImageName: "./assets/btn-neutral.png",
    grayscale: true,
    mouseEventCursor: true, mouseEventCursorName: "hand",
    buttonAction: function () { setStatus("grayscale: true — full desaturation applied"); }
});

// Semi-transparent
ui.addText({ id: "lbl-eff-alpha", x: BX + 420, y: Y, text: "imageAlpha: 120", fontSize: 11, fontColor: "#556070" });
ui.addButton({
    id: "btn-eff-alpha",
    x: BX + 420, y: Y + 18,
    width: 120, height: 40,
    buttonImageName: "./assets/btn-neutral.png",
    imageAlpha: 120,
    mouseEventCursor: true, mouseEventCursorName: "hand",
    buttonAction: function () { setStatus("imageAlpha: 120 — 47% opacity (semi-transparent)"); }
});
Y += 68;

// Flip H
ui.addText({ id: "lbl-eff-fh", x: BX, y: Y, text: "imageFlip: horizontal", fontSize: 11, fontColor: "#556070" });
ui.addButton({
    id: "btn-eff-fh",
    x: BX, y: Y + 18,
    width: 120, height: 40,
    buttonImageName: "./assets/btn-neutral.png",
    imageFlip: "horizontal",
    mouseEventCursor: true, mouseEventCursorName: "hand",
    buttonAction: function () { setStatus("imageFlip: 'horizontal' — sprite mirrored left-right"); }
});

// Flip V
ui.addText({ id: "lbl-eff-fv", x: BX + 140, y: Y, text: "imageFlip: vertical", fontSize: 11, fontColor: "#556070" });
ui.addButton({
    id: "btn-eff-fv",
    x: BX + 140, y: Y + 18,
    width: 120, height: 40,
    buttonImageName: "./assets/btn-neutral.png",
    imageFlip: "vertical",
    mouseEventCursor: true, mouseEventCursorName: "hand",
    buttonAction: function () { setStatus("imageFlip: 'vertical' — sprite flipped top-bottom"); }
});

// Gold tint on white base
ui.addText({ id: "lbl-eff-gold", x: BX + 280, y: Y, text: "imageTint: gold", fontSize: 11, fontColor: "#556070" });
ui.addButton({
    id: "btn-eff-gold",
    x: BX + 280, y: Y + 18,
    width: 120, height: 40,
    buttonImageName: "./assets/btn-neutral.png",
    imageTint: "rgba(255,190,30,0.85)",
    mouseEventCursor: true, mouseEventCursorName: "hand",
    buttonAction: function () { setStatus("imageTint: gold rgba(255,190,30,0.85) on white base", "#ffbe1e"); }
});

Y += 68;

// ─────────────────────────────────────────────────────────────
// SECTION 4 — Dynamic / Live Control Playground
// ─────────────────────────────────────────────────────────────
sectionTitle("s4", PAD, Y, "4 · Live Playground — Runtime setElementProperties");
Y += 28;
cardBg("s4", PAD, Y, W - PAD * 2, 150);
var playY = Y + 20;

// TARGET: Live playground uses neutral base so all tint/grayscale/alpha effects are clearly visible
ui.addButton({
    id: "btn-live-target",
    x: BX, y: playY,
    width: 160, height: 48,
    buttonImageName: "./assets/btn-neutral.png",
    mouseEventCursor: true, mouseEventCursorName: "hand",
    onMouseOver: function () { setStatus("Live target button — hovered"); },
    onMouseLeave: function () { setStatus("Live target button — idle"); },
    buttonAction: function () { setStatus("✓ Live target button clicked!", "#00d0ff"); }
});

ui.addText({
    id: "lbl-live-target",
    x: BX, y: playY + 54,
    text: "← Target button",
    fontSize: 11, fontColor: "#4a5568"
});

// Control buttons
var ctrlX = BX + 190;
var ctrlY = playY;

function makeCtrlBtn(id, x, y, label_text, action) {
    ui.addShape({
        id: id + "-bg",
        type: "rectangle",
        x: x, y: y, width: 130, height: 32,
        radius: 8,
        fillColor: "rgba(255,255,255,0.04)",
        strokeColor: "rgba(255,255,255,0.15)",
        strokeWidth: 1,
        mouseEventCursor: true,
        mouseEventCursorName: "hand",
        onLeftMouseUp: action
    });
    ui.addText({
        id: id + "-lbl",
        x: x + 65, y: y + 9,
        text: label_text,
        fontSize: 11, fontColor: "#a0b0c0", fontWeight: 600,
        width: 130, align: "center"
    });
}

makeCtrlBtn("ctrl-tint-r", ctrlX, ctrlY, "Tint Red", function () {
    ui.setElementProperties("btn-live-target", { imageTint: "rgba(255,80,80,0.7)" });
    setStatus("setElementProperties — imageTint red applied", "#ff5050");
});

makeCtrlBtn("ctrl-tint-g", ctrlX + 145, ctrlY, "Tint Gold", function () {
    ui.setElementProperties("btn-live-target", { imageTint: "rgba(255,190,30,0.8)" });
    setStatus("setElementProperties — imageTint gold applied", "#ffbe1e");
});

makeCtrlBtn("ctrl-gs", ctrlX, ctrlY + 40, "Toggle Grayscale", function () {
    var curr = ui.getElementProperty("btn-live-target", "grayscale");
    ui.setElementProperties("btn-live-target", { grayscale: !curr });
    setStatus("grayscale toggled → " + !curr);
});

makeCtrlBtn("ctrl-reset", ctrlX + 145, ctrlY + 40, "Reset Effects", function () {
    ui.beginUpdate();
    ui.setElementProperties("btn-live-target", {
        imageTint: "rgba(255,255,255,0)",
        grayscale: false,
        imageAlpha: 255
    });
    ui.endUpdate();
    setStatus("All effects reset to default");
});

makeCtrlBtn("ctrl-alpha-lo", ctrlX, ctrlY + 80, "Alpha → 80", function () {
    ui.setElementProperties("btn-live-target", { imageAlpha: 80 });
    setStatus("imageAlpha set to 80 (~31% opacity)");
});

makeCtrlBtn("ctrl-alpha-hi", ctrlX + 145, ctrlY + 80, "Alpha → 255", function () {
    ui.setElementProperties("btn-live-target", { imageAlpha: 255 });
    setStatus("imageAlpha set to 255 (fully opaque)");
});

Y += 160;

// ─────────────────────────────────────────────────────────────
// SECTION 5 — Tooltip & Cursor
// ─────────────────────────────────────────────────────────────
sectionTitle("s5", PAD, Y, "5 · Tooltip & Hand Cursor");
Y += 28;
cardBg("s5", PAD, Y, W - PAD * 2, 80);
var ttY = Y + 16;

ui.addButton({
    id: "btn-tooltip",
    x: BX, y: ttY,
    width: 160, height: 48,
    buttonImageName: "./assets/btn-secondary.png",
    mouseEventCursor: true,
    mouseEventCursorName: "hand",
    tooltipTitle: "Button Tooltip",
    tooltipText: "This button demonstrates tooltipTitle and tooltipText properties.\nHover for 500ms to see this tooltip.",
    onMouseOver: function () { setStatus("Hover this button for 500ms to see the tooltip"); },
    onMouseLeave: function () { setStatus("Left tooltip button"); },
    buttonAction: function () { setStatus("Tooltip button clicked — cursor was 'hand' during hover", "#aaddff"); }
});

label("lbl-tt-hint", BX + 180, ttY + 10, "tooltipTitle + tooltipText + mouseEventCursorName: 'hand'");

console.log("=== buttonExamples UI script loaded successfully ===");

ui.endUpdate();