import { widgetWindow } from "novadesk";

// ─────────────────────────────────────────────────────────────
// InputBox Examples — Main Process
//
// InputBox is a UI-only element. No periodic IPC data is needed.
// The widget is tall enough to show all 10 example rows.
// ─────────────────────────────────────────────────────────────

const myWindow = new widgetWindow({
    id:              "inputBoxExamples",
    width:           780,
    height:          3800,
    script:          "ui/script.ui.js",
    backgroundColor: "rgba(18, 18, 24, 0.97)",
});
