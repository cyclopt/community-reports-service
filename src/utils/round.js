import numberFormatter from "./number-formatter.js";

const round = (x, d = 2) => numberFormatter(Number.parseFloat(x).toFixed(d)) || "0";

export default round;
