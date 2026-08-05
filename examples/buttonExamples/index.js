import { widgetWindow } from "novadesk";

// ─────────────────────────────────────────────────────────────
// Button Examples — Main Process
// ─────────────────────────────────────────────────────────────

const myWindow = new widgetWindow({
    id:              "buttonExamples",
    width:           680,
    height:          1200,
    script:          "ui/script.ui.js",
    backgroundColor: "rgba(10, 13, 20, 0.97)",
});
