import { widgetWindow } from "novadesk";

// ─────────────────────────────────────────────────────────────
// LayoutBox Examples — Main Process
// ─────────────────────────────────────────────────────────────

const myWindow = new widgetWindow({
    id:              "layoutBoxExamples",
    width:           840,
    height:          2700,
    script:          "ui/script.ui.js",
    backgroundColor: "#0c1017",
});
