import { multiply } from "../src/add.js";
if (multiply(2, 3) !== 6) throw new Error("multiply broken: 2*3");
if (multiply(0, 5) !== 0) throw new Error("multiply broken: 0*5");
console.log("ok");
