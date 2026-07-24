ui.addAreaGraph({
    id: "cpu-graph",
    x: 20,
    y: 20,
    width: 200,
    height: 100,
    data: [10, 25, 45, 30, 60, 75, 50, 40],
    minValue: 0,
    maxValue: 100,
    lineColor: "#050606ff",
    fillColor: "#00b3ff47",
    gridColor:"white",
    backgroundColor:"rgba(29, 249, 0, 0.5)"
});

ui.addAreaGraph({
    id: "memory-graph",
    x: ui.getElementProperty("cpu-graph","x") + ui.getElementProperty("cpu-graph", "width") +20,
    y: 20,
    width: 200,
    height: 100,
    data: [10, 25, 45, 30, 60, 75, 50, 40],
    minValue: 0,
    maxValue: 100,
    lineColor: "#050606ff",
    fillColor: "#00b3ff47",
    gridColor:"white",
    backgroundColor:"linearGradient(0, #ff8c00, #ff0080)",
    backgroundColorRadius:8,
});

ui.addAreaGraph({
    id: "graph-example1",
    x: ui.getElementProperty("memory-graph","x") + ui.getElementProperty("memory-graph", "width") +20,
    y: 20,
    width: 200,
    height: 100,
    data: [10, 25, 45, 30, 60, 75, 50, 40],
    minValue: 0,
    maxValue: 100,
    lineColor: "#050606ff",
    fillColor: "radialGradient(ellipse, red, rgba(0,0,0,0))",
    gridColor:"purple",
    backgroundColor:"blue"
});

ui.addAreaGraph({
    id: "graph-example1",
    x: ui.getElementProperty("memory-graph","x") + ui.getElementProperty("memory-graph", "width") +20,
    y: 20,
    width: 200,
    height: 100,
    data: [10, 25, 45, 30, 60, 75, 50, 40],
    minValue: 0,
    maxValue: 100,
    lineColor: "#050606ff",
    fillColor: "radialGradient(ellipse, red, rgba(0,0,0,0))",
    gridColor:"purple",
    backgroundColor:"blue"
});

ui.addAreaGraph({
    id: "graph-example2",
    x: ui.getElementProperty("graph-example1","x") + ui.getElementProperty("graph-example1", "width") +20,
    y: 20,
    width: 200,
    height: 100,
    data: [10, 25, 45, 30, 60, 75, 50, 40],
    minValue: 0,
    maxValue: 100,
    lineColor: "#050606ff",
    fillColor: "#00b3ff47",
    gridColor:"white",
    padding:[10,10,10,10],
    backgroundColor:"rgba(29, 249, 0, 0.5)"
});
