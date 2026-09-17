import { add } from "../src/add.js";
if (add(1, 2) !== 3) throw new Error("add broken");
console.log("ok");
