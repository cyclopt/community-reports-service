import round from "./round.js";

const average = (ar) => round(ar.reduce((pre, cur) => (pre + cur), 0) / (ar.length + 1)) || 0;

export default average;
