import { multiply } from "../src/add.js";
if (multiply(2, 3) !== 6) throw new Error("multiply broken: 2*3");
if (multiply(5, 0) !== 0) throw new Error("multiply broken: 5*0");
if (multiply(-2, 4) !== -8) throw new Error("multiply broken: -2*4");
if (multiply(-2, -3) !== 6) throw new Error("multiply broken: -2*-3");
console.log("ok");
