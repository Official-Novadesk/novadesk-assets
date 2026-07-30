// ─────────────────────────────────────────────────────────────
// InputBox Examples — UI Script
//
// Window: 780×2200px, single column, left margin 30px
//
//  Row 1  – text & placeholder                    y: 20
//  Row 2  – fontFace, fontSize, fontWeight, italic y: 200
//  Row 3  – fontColor, textColor alias            y: 420
//  Row 4  – fillColor: solid, rgba, gradient, none y: 600
//  Row 5  – borderWidth, borderRadius, borderColor y: 800
//  Row 6  – borderFocusColor                      y: 1020
//  Row 7  – password & maxLength                  y: 1200
//  Row 8  – multiline                             y: 1380
//  Row 9  – inputType & allowedChars              y: 1600
//  Row 10 – Callbacks: onChange, onEnter, onFocus,
//            onBlur, onInvalidInput               y: 1860
// ─────────────────────────────────────────────────────────────

const PAD    = 30;
const IW     = 720;    // input box width
const IH     = 44;     // standard input height
const GAP    = 14;     // heading → first input
const RSEP   = 50;     // gap between rows

const LBL  = "#888888";
const HEAD = "#ffffff";

function heading(id, x, y, text) {
    ui.addText({ id: id, x: x, y: y, text: text,
        fontSize: 13, fontColor: HEAD, fontWeight: 600 });
}
function caption(id, x, y, text) {
    ui.addText({ id: id, x: x, y: y, text: text,
        fontSize: 11, fontColor: LBL });
}
function rowLabel(id, x, y, text) {
    ui.addText({ id: id, x: x, y: y, text: text,
        fontSize: 12, fontColor: "#cccccc" });
}

// ── Shared input style (used as a base for most examples) ────
function baseInput(extra) {
    return Object.assign({
        x: PAD, width: IW, height: IH,
        fillColor:    "rgba(255,255,255,0.07)",
        borderWidth:  1,
        borderRadius: 8,
        borderColor:  "rgba(255,255,255,0.18)",
        fontFace:     "Segoe UI",
        fontSize:     14,
        fontColor:    "rgb(235,235,235)",
        placeholderColor: "rgba(255,255,255,0.35)",
        caretColor:       "#00b4ff",
        selectionColor:   "rgba(0,180,255,0.35)",
    }, extra);
}

var Y = 20;
ui.beginUpdate();

// ═══════════════════════════════════════════════════════════
// ROW 1 — text & placeholder
// ═══════════════════════════════════════════════════════════
heading("h1", PAD, Y, "1 · text & placeholder — pre-filled vs empty with hint");
Y += GAP;

// Pre-filled text
ui.addInputBox(baseInput({
    id: "r1-prefilled", y: Y,
    text: "Hello, Novadesk!",
    placeholder: "This placeholder won't show (text is set)",
}));
caption("c1a", PAD, Y + IH + 4,
    "text: \"Hello, Novadesk!\" — pre-loaded content. Caret visible on click.");
Y += IH + 26;

// Empty with placeholder
ui.addInputBox(baseInput({
    id: "r1-empty", y: Y,
    text: "",
    placeholder: "Click here and start typing…",
}));
caption("c1b", PAD, Y + IH + 4,
    "text: \"\" — empty. Placeholder shown in placeholderColor until user types.");
Y += IH + RSEP;

// ═══════════════════════════════════════════════════════════
// ROW 2 — typography: fontFace, fontSize, fontWeight, italic
// ═══════════════════════════════════════════════════════════
heading("h2", PAD, Y, "2 · typography — fontFace, fontSize, fontWeight, italic");
Y += GAP;

var typo = [
    { id: "r2-0", fontFace: "Segoe UI",  fontSize: 14, fontWeight: 400, italic: false, lbl: "fontFace:\"Segoe UI\"  size:14  weight:400  italic:false" },
    { id: "r2-1", fontFace: "Consolas",  fontSize: 14, fontWeight: 400, italic: false, lbl: "fontFace:\"Consolas\"  — monospace font" },
    { id: "r2-2", fontFace: "Segoe UI",  fontSize: 18, fontWeight: 700, italic: false, lbl: "fontSize:18  fontWeight:700  — large bold" },
    { id: "r2-3", fontFace: "Segoe UI",  fontSize: 14, fontWeight: 300, italic: true,  lbl: "fontWeight:300  italic:true  — light italic" },
];

for (var t = 0; t < typo.length; t++) {
    var th = 40;
    ui.addInputBox(baseInput({
        id: typo[t].id, y: Y,
        height: th,
        text: "The quick brown fox",
        fontFace:   typo[t].fontFace,
        fontSize:   typo[t].fontSize,
        fontWeight: typo[t].fontWeight,
        italic:     typo[t].italic,
    }));
    caption("c2-" + t, PAD, Y + th + 3, typo[t].lbl);
    Y += th + 26;
}
Y += RSEP - 26;

// ═══════════════════════════════════════════════════════════
// ROW 3 — fontColor / textColor alias / align
// ═══════════════════════════════════════════════════════════
heading("h3", PAD, Y, "3 · fontColor / textColor / align — text colour and alignment");
Y += GAP;

var colors = [
    { id: "r3-0", color: "rgb(235,235,235)",      align: "left",   lbl: "fontColor: rgb(235,235,235) — default light  align:\"left\"" },
    { id: "r3-1", color: "#00b4ff",               align: "left",   lbl: "fontColor: \"#00b4ff\" — hex blue" },
    { id: "r3-2", color: "rgba(255,170,0,0.90)",  align: "center", lbl: "fontColor: rgba orange  align:\"center\"" },
    { id: "r3-3", color: "linearGradient(0,#ff0080,#9966ff)", align:"right", lbl: "fontColor: linearGradient  align:\"right\"" },
];

for (var c3 = 0; c3 < colors.length; c3++) {
    var c3h = 40;
    ui.addInputBox(baseInput({
        id: colors[c3].id, y: Y,
        height: c3h,
        text: "Sample text",
        fontColor: colors[c3].color,
        align:     colors[c3].align,
    }));
    caption("c3-" + c3, PAD, Y + c3h + 3, colors[c3].lbl);
    Y += c3h + 26;
}
Y += RSEP - 26;

// ═══════════════════════════════════════════════════════════
// ROW 4 — fillColor: solid, rgba, gradient, none
// ═══════════════════════════════════════════════════════════
heading("h4", PAD, Y, "4 · fillColor — background: solid, rgba, gradient, transparent");
Y += GAP;

var fills = [
    { id: "r4-0", fill: "rgb(30,30,34)",                                     lbl: "fillColor: \"rgb(30,30,34)\" — default dark" },
    { id: "r4-1", fill: "rgba(0,100,180,0.40)",                              lbl: "fillColor: semi-transparent blue" },
    { id: "r4-2", fill: "linearGradient(0,rgba(40,10,60,1),rgba(10,40,60,1))",lbl: "fillColor: linearGradient dark purple→blue" },
    { id: "r4-3", fill: "transparent",                                        lbl: "fillColor: \"transparent\" — no background, widget shows through" },
];

for (var f = 0; f < fills.length; f++) {
    ui.addInputBox(baseInput({
        id: fills[f].id, y: Y,
        text: "Sample text",
        fillColor: fills[f].fill,
        borderColor: "rgba(255,255,255,0.22)",
    }));
    caption("c4-" + f, PAD, Y + IH + 3, fills[f].lbl);
    Y += IH + 26;
}
Y += RSEP - 26;

// ═══════════════════════════════════════════════════════════
// ROW 5 — borderWidth, borderRadius, borderColor
// ═══════════════════════════════════════════════════════════
heading("h5", PAD, Y, "5 · border — borderWidth, borderRadius, borderColor");
Y += GAP;

var borders = [
    { id: "r5-0", bw: 0,  br: 0,  bc: "rgba(255,255,255,0.20)", lbl: "borderWidth: 0 — no border (default)" },
    { id: "r5-1", bw: 1,  br: 0,  bc: "rgba(255,255,255,0.30)", lbl: "borderWidth: 1  borderRadius: 0 — sharp rectangle" },
    { id: "r5-2", bw: 1,  br: 8,  bc: "rgba(255,255,255,0.30)", lbl: "borderWidth: 1  borderRadius: 8 — modern rounded" },
    { id: "r5-3", bw: 2,  br: 22, bc: "#00b4ff",                 lbl: "borderWidth: 2  borderRadius: 22 — pill shape + colored border" },
    { id: "r5-4", bw: 1,  br: 6,  bc: "linearGradient(0,#9966ff,#00b4ff)", lbl: "borderColor: linearGradient" },
];

for (var b5 = 0; b5 < borders.length; b5++) {
    ui.addInputBox(baseInput({
        id: borders[b5].id, y: Y,
        text: "Sample text",
        borderWidth:  borders[b5].bw,
        borderRadius: borders[b5].br,
        borderColor:  borders[b5].bc,
    }));
    caption("c5-" + b5, PAD, Y + IH + 3, borders[b5].lbl);
    Y += IH + 26;
}
Y += RSEP - 26;

// ═══════════════════════════════════════════════════════════
// ROW 6 — borderFocusColor: different border on focus
// ═══════════════════════════════════════════════════════════
heading("h6", PAD, Y, "6 · borderFocusColor — border changes when the field is focused");
Y += GAP;

caption("c6note", PAD, Y,
    "Click each input — the border should change to the focus colour:");
Y += 18;

var focusInputs = [
    { id: "r6-0", bc: "rgba(255,255,255,0.20)", bfc: "#00b4ff",  lbl: "borderFocusColor: \"#00b4ff\"  (blue on focus)" },
    { id: "r6-1", bc: "rgba(255,255,255,0.20)", bfc: "#00ff88",  lbl: "borderFocusColor: \"#00ff88\"  (green on focus)" },
    { id: "r6-2", bc: "rgba(255,255,255,0.20)", bfc: "#ff3333",  lbl: "borderFocusColor: \"#ff3333\"  (red on focus)" },
    { id: "r6-3", bc: "rgba(255,255,255,0.20)", bfc: "none",     lbl: "borderFocusColor: \"none\"  — no focus indicator" },
];

for (var b6 = 0; b6 < focusInputs.length; b6++) {
    ui.addInputBox(baseInput({
        id: focusInputs[b6].id, y: Y,
        placeholder: "Click to focus…",
        borderWidth:      1,
        borderRadius:     8,
        borderColor:      focusInputs[b6].bc,
        borderFocusColor: focusInputs[b6].bfc,
    }));
    caption("c6-" + b6, PAD, Y + IH + 3, focusInputs[b6].lbl);
    Y += IH + 26;
}
Y += RSEP - 26;

// ═══════════════════════════════════════════════════════════
// ROW 7 — password & maxLength
// ═══════════════════════════════════════════════════════════
heading("h7", PAD, Y, "7 · password & maxLength — masking and character limits");
Y += GAP;

// Password mode
ui.addInputBox(baseInput({
    id: "r7-pass", y: Y,
    placeholder: "Enter password…",
    // password: true — all characters displayed as bullet •
    password: true,
    borderWidth: 1, borderRadius: 8,
    borderFocusColor: "#9966ff",
}));
caption("c7a", PAD, Y + IH + 3,
    "password: true — typed characters shown as • · getElementProperty(\"text\") returns real value");
Y += IH + 26;

// maxLength: 8 (PIN field)
ui.addInputBox(baseInput({
    id: "r7-pin", y: Y,
    placeholder: "Enter 4-digit PIN…",
    password: true,
    // maxLength: 4 — blocks input beyond 4 chars
    maxLength: 4,
    align: "center",
    fontSize: 20,
    letterSpacing: 8,
    borderWidth: 2, borderRadius: 10,
    borderFocusColor: "#ffaa00",
}));
caption("c7b", PAD, Y + IH + 3,
    "password: true  maxLength: 4 — PIN field, typing stops at 4 characters");
Y += IH + 26;

// maxLength: 140 (Twitter-style)
ui.addInputBox(baseInput({
    id: "r7-tweet", y: Y,
    placeholder: "What's on your mind? (140 chars max)",
    // maxLength: 140 — no more than 140 characters
    maxLength: 140,
    borderWidth: 1, borderRadius: 8,
    borderFocusColor: "#1d9bf0",
}));
caption("c7c", PAD, Y + IH + 3,
    "maxLength: 140 — additional keystrokes silently ignored after limit");
Y += IH + RSEP;

// ═══════════════════════════════════════════════════════════
// ROW 8 — multiline
// ═══════════════════════════════════════════════════════════
heading("h8", PAD, Y, "8 · multiline — textarea mode (Enter inserts newline, vertical scroll)");
Y += GAP;

// Small multiline
ui.addInputBox(baseInput({
    id: "r8-multi-sm", y: Y,
    height: 90,
    text: "Line 1\nLine 2\nLine 3",
    placeholder: "Type multiple lines…",
    // multiline: true — Enter inserts newline, content scrolls vertically
    multiline: true,
    borderWidth: 1, borderRadius: 8,
    borderFocusColor: "#00ff88",
}));
caption("c8a", PAD, Y + 90 + 3,
    "multiline: true  height:90 — 3 lines pre-loaded. Enter adds lines. Scrolls when overflowing.");
Y += 90 + 26;

// Large multiline (notes area)
ui.addInputBox(baseInput({
    id: "r8-multi-lg", y: Y,
    height: 140,
    placeholder: "Notes area — multiline: true, height: 140\nCtrl+Z / Ctrl+Y for undo/redo…",
    multiline: true,
    borderWidth: 1, borderRadius: 8,
    borderFocusColor: "#00ff88",
    fontFace: "Consolas",
    fontSize: 13,
}));
caption("c8b", PAD, Y + 140 + 3,
    "multiline: true  height:140  fontFace:Consolas — Undo/redo with Ctrl+Z / Ctrl+Y");
Y += 140 + RSEP;

// ═══════════════════════════════════════════════════════════
// ROW 9 — inputType & allowedChars
// ═══════════════════════════════════════════════════════════
heading("h9", PAD, Y, "9 · inputType & allowedChars — character filters");
Y += GAP;
caption("c9note", PAD, Y,
    "Try typing letters into the integer/hex fields — they will be rejected.");
Y += 18;

var inputTypes = [
    { id: "r9-any",   type: "any",         allowed: "",             ph: "inputType: \"any\" — all characters allowed (default)",    lbl: "inputType: \"any\"" },
    { id: "r9-int",   type: "integer",     allowed: "",             ph: "inputType: \"integer\" — digits + optional leading -",      lbl: "inputType: \"integer\"  (also accepts \"int\")" },
    { id: "r9-float", type: "float",       allowed: "",             ph: "inputType: \"float\" — digits + - + one decimal point",     lbl: "inputType: \"float\"  (also accepts \"number\", \"decimal\")" },
    { id: "r9-hex",   type: "hex",         allowed: "",             ph: "inputType: \"hex\" — 0-9 and a-f only",                     lbl: "inputType: \"hex\"" },
    { id: "r9-email", type: "email",       allowed: "",             ph: "inputType: \"email\" — alphanumeric + @ . - _ +",           lbl: "inputType: \"email\"" },
    { id: "r9-alpha", type: "letters",     allowed: "",             ph: "inputType: \"letters\" — alphabetic characters only",       lbl: "inputType: \"letters\"  (also accepts \"alpha\")" },
    { id: "r9-alnum", type: "alphanumeric",allowed: "",             ph: "inputType: \"alphanumeric\" — letters and digits",          lbl: "inputType: \"alphanumeric\"  (also accepts \"alnum\")" },
    { id: "r9-cust",  type: "custom",      allowed: "YyNnTtFf01",  ph: "inputType: \"custom\"  allowedChars: \"YyNnTtFf01\"",       lbl: "inputType: \"custom\"  allowedChars: \"YyNnTtFf01\"" },
];

for (var r9 = 0; r9 < inputTypes.length; r9++) {
    var r9h = 38;
    var r9opts = baseInput({
        id: inputTypes[r9].id, y: Y,
        height: r9h,
        placeholder: inputTypes[r9].ph,
        inputType:   inputTypes[r9].type,
        borderWidth: 1, borderRadius: 6,
        borderFocusColor: "#ffaa00",
    });
    if (inputTypes[r9].allowed) {
        r9opts.allowedChars = inputTypes[r9].allowed;
    }
    ui.addInputBox(r9opts);
    caption("c9-" + r9, PAD, Y + r9h + 3, inputTypes[r9].lbl);
    Y += r9h + 24;
}
Y += RSEP - 24;

// ═══════════════════════════════════════════════════════════
// ROW 10 — Callbacks: onChange, onEnter, onFocus, onBlur,
//          onInvalidInput, caretColor, selectionColor
// ═══════════════════════════════════════════════════════════
heading("h10", PAD, Y, "10 · Callbacks — onChange, onEnter, onFocus, onBlur, onInvalidInput");
Y += GAP;

// Shared event log label
ui.addText({
    id: "event-log",
    x: PAD, y: Y,
    text: "Type, focus, blur, press Enter, or type an invalid char — events appear here",
    fontSize: 12, fontColor: "#ffdd44",
    width: IW,
});
Y += 22;

// ── onChange: fires on every keystroke ───────────────────
ui.addText({ id: "lbl-change", x: PAD, y: Y,
    text: "onChange + live character count:", fontSize: 12, fontColor: "#cccccc" });
Y += 20;

ui.addInputBox(baseInput({
    id: "r10-change", y: Y,
    placeholder: "Type here — char count updates live",
    borderWidth: 1, borderRadius: 8,
    borderFocusColor: "#00b4ff",
    // onChange fires every time the text content changes
    onChange: function () {
        var val  = ui.getElementProperty("r10-change", "text");
        var len  = val.length;
        ui.setElementProperties("event-log", {
            text: "onChange → length: " + len + "  value: \"" + val.substring(0, 40) +
                  (val.length > 40 ? "…" : "") + "\"",
        });
        ui.setElementProperties("char-count", { text: len + " chars" });
    },
}));
ui.addText({ id: "char-count",
    x: PAD + IW + 6, y: Y + IH / 2 - 8,
    text: "0 chars", fontSize: 12, fontColor: "#888888" });
caption("c10a", PAD, Y + IH + 3,
    "onChange — fires on every keystroke, paste, delete. Read value with getElementProperty.");
Y += IH + 26;

// ── onEnter: fires when Enter is pressed (single-line) ───
ui.addText({ id: "lbl-enter", x: PAD, y: Y,
    text: "onEnter (single-line):", fontSize: 12, fontColor: "#cccccc" });
Y += 20;

ui.addInputBox(baseInput({
    id: "r10-enter", y: Y,
    placeholder: "Type something and press Enter…",
    borderWidth: 1, borderRadius: 8,
    borderFocusColor: "#00ff88",
    // onEnter fires when Enter is pressed in single-line mode
    onEnter: function () {
        var val = ui.getElementProperty("r10-enter", "text");
        ui.setElementProperties("event-log", {
            text: "onEnter → submitted: \"" + val + "\"",
        });
        // Clear the field after submission
        ui.setElementProperties("r10-enter", { text: "" });
    },
}));
caption("c10b", PAD, Y + IH + 3,
    "onEnter — fires on Enter key in single-line mode. In multiline mode Enter inserts a newline.");
Y += IH + 26;

// ── onFocus / onBlur ─────────────────────────────────────
ui.addText({ id: "lbl-focus", x: PAD, y: Y,
    text: "onFocus & onBlur:", fontSize: 12, fontColor: "#cccccc" });
Y += 20;

ui.addInputBox(baseInput({
    id: "r10-focus", y: Y,
    placeholder: "Click to focus, click away to blur…",
    borderWidth: 1, borderRadius: 8,
    borderColor:      "rgba(255,255,255,0.18)",
    borderFocusColor: "#9966ff",
    // onFocus fires once when field gains keyboard focus
    onFocus: function () {
        ui.setElementProperties("event-log", {
            text: "onFocus → r10-focus gained focus (border turned purple)",
        });
    },
    // onBlur fires once when field loses focus
    onBlur: function () {
        var val = ui.getElementProperty("r10-focus", "text");
        ui.setElementProperties("event-log", {
            text: "onBlur → r10-focus lost focus. Final value: \"" + val + "\"",
        });
    },
}));
caption("c10c", PAD, Y + IH + 3,
    "onFocus / onBlur — fired once per focus/blur transition, not on every keystroke.");
Y += IH + 26;

// ── onInvalidInput: fires on rejected character ──────────
ui.addText({ id: "lbl-invalid", x: PAD, y: Y,
    text: "onInvalidInput (inputType: \"integer\" — try typing letters):", fontSize: 12, fontColor: "#cccccc" });
Y += 20;

ui.addInputBox(baseInput({
    id: "r10-invalid", y: Y,
    placeholder: "Only digits allowed — type a letter to trigger onInvalidInput",
    inputType: "integer",
    borderWidth: 1, borderRadius: 8,
    borderColor:      "rgba(255,255,255,0.18)",
    borderFocusColor: "#00b4ff",
    // onInvalidInput fires when a character is REJECTED by the inputType filter
    // It does NOT fire for silently ignored control characters
    onInvalidInput: function () {
        ui.setElementProperties("event-log", {
            text: "onInvalidInput → rejected char! (inputType: \"integer\" only allows digits)",
        });
        // Flash border red briefly as visual feedback
        ui.setElementProperties("r10-invalid", { borderFocusColor: "#ff3333" });

    },
}));
caption("c10d", PAD, Y + IH + 3,
    "onInvalidInput — fires when inputType rejects a character. Great for shake/flash animations.");
Y += IH + 26;

// ── caretColor & selectionColor showcase ─────────────────
ui.addText({ id: "lbl-caret", x: PAD, y: Y,
    text: "caretColor & selectionColor — select some text to see the highlight:", fontSize: 12, fontColor: "#cccccc" });
Y += 20;

ui.addInputBox(baseInput({
    id: "r10-caret", y: Y,
    text: "Select this text with Ctrl+A or drag to see the selection highlight",
    borderWidth: 1, borderRadius: 8,
    borderFocusColor: "#ff6600",
    // caretColor: blinking cursor colour
    caretColor:     "#ff6600",
    // selectionColor: background colour of selected text
    selectionColor: "rgba(255,102,0,0.40)",
}));
caption("c10e", PAD, Y + IH + 3,
    "caretColor: \"#ff6600\" (orange cursor) · selectionColor: rgba(255,102,0,0.40) (orange highlight)");
Y += IH + 26;

// ── Complete form example ─────────────────────────────────
heading("h10b", PAD, Y, "  · Complete mini-form — all pieces together");
Y += GAP;

ui.addText({ id: "form-name-lbl",  x: PAD, y: Y, text: "Name",     fontSize: 12, fontColor: "#888888" });
Y += 18;
ui.addInputBox(baseInput({
    id: "form-name", y: Y,
    placeholder: "Your name",
    borderWidth: 1, borderRadius: 8,
    borderFocusColor: "#00b4ff",
    inputType: "letters",
    maxLength: 50,
    onChange: function () {
        var v = ui.getElementProperty("form-name", "text");
        ui.setElementProperties("form-submit", {
            text: v.length > 0 ? "Submit (" + v + ")" : "Submit",
        });
    },
}));
Y += IH + 12;

ui.addText({ id: "form-email-lbl", x: PAD, y: Y, text: "Email",    fontSize: 12, fontColor: "#888888" });
Y += 18;
ui.addInputBox(baseInput({
    id: "form-email", y: Y,
    placeholder: "you@example.com",
    borderWidth: 1, borderRadius: 8,
    borderFocusColor: "#00b4ff",
    inputType: "email",
    onBlur: function () {
        var v = ui.getElementProperty("form-email", "text");
        var ok = v === "" || v.indexOf("@") > 0;
        ui.setElementProperties("form-email", {
            borderFocusColor: ok ? "#00b4ff" : "#ff3333",
        });
        ui.setElementProperties("form-err", {
            show: !ok,
        });
    },
}));
Y += IH + 4;

ui.addText({ id: "form-err", x: PAD, y: Y,
    text: "⚠ Must contain @", fontSize: 11, fontColor: "#ff3333", show: false });
Y += 18;

// Submit button (as a text element with click handler)
ui.addText({
    id: "form-submit",
    x: PAD, y: Y,
    text: "Submit",
    fontSize: 14, fontColor: "#ffffff",
    backgroundColor: "rgba(0,130,200,0.85)",
    backgroundColorRadius: 8,
    padding: [18, 10, 18, 10],
    mouseEventCursor: true, mouseEventCursorName: "hand",
    onLeftMouseUp: function () {
        var name  = ui.getElementProperty("form-name",  "text");
        var email = ui.getElementProperty("form-email", "text");
        ui.setElementProperties("event-log", {
            text: "Form submitted — Name: \"" + name + "\"  Email: \"" + email + "\"",
        });
    },
});

// ═══════════════════════════════════════════════════════════
// End batch
// ═══════════════════════════════════════════════════════════
ui.endUpdate();
