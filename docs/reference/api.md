# 参考：src/add.js API

模块文件：`src/add.js`。ESM 模块（`package.json` 中 `"type": "module"`），无第三方依赖。

## 导出函数

### `add(a, b)`

返回 `a + b`。

- 依据：`src/add.js`；`test/add.test.js`（`add(1, 2) === 3`）。

### `multiply(a, b)`

返回 `a * b`。

- 依据：`src/add.js`；`test/multiply.test.js`（`multiply(2, 3) === 6`、`multiply(0, 5) === 0`）。

### `subtract(a, b)`

返回 `a - b`。

- 依据：`src/add.js`；`test/subtract.test.js`（`subtract(5, 3) === 2`、`subtract(3, 5) === -2`、`subtract(0, 4) === -4`、`subtract(4, 0) === 4`）。

## 用法

```js
import { add, multiply, subtract } from "./src/add.js";

add(1, 2);       // 3
multiply(2, 3);  // 6
subtract(5, 3);  // 2
```

## 范围说明

- 按 SPEC-1 的定义，本模块语义限定为对任意有限数字运算；非有限输入（如 `NaN`、`Infinity`）、参数缺失、浮点精度的行为不在测试覆盖范围内，具体行为待确认。
