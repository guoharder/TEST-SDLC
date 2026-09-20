import { subtract } from "../src/add.js";
if (subtract(5, 3) !== 2) throw new Error("subtract broken: 5-3");
if (subtract(3, 5) !== -2) throw new Error("subtract broken: 3-5");
if (subtract(0, 4) !== -4) throw new Error("subtract broken: 0-4");
if (subtract(4, 0) !== 4) throw new Error("subtract broken: 4-0");
console.log("ok");
