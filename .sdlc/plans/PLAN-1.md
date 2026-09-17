---
id: PLAN-1
kind: plan
title: 为 add 模块增加 multiply 函数
author: executor:claude
created: 2026-09-16
status: approved
spec: SPEC-1
intent: INT-1
risk_tags: []
links: {}
---

## 任务

- **任务 1：新增失败测试 `test/multiply.test.js`（红）**
  - 内容：沿用既有测试风格（无第三方断言库，条件不满足则抛错、成功打印 `ok`），创建 `test/multiply.test.js`，覆盖正数相乘、含 0、含负数三种情况：
    ```js
    import { multiply } from "../src/add.js";
    if (multiply(2, 3) !== 6) throw new Error("multiply broken: 2*3");
    if (multiply(5, 0) !== 0) throw new Error("multiply broken: 5*0");
    if (multiply(-2, 4) !== -8) throw new Error("multiply broken: -2*4");
    if (multiply(-2, -3) !== 6) throw new Error("multiply broken: -2*-3");
    console.log("ok");
    ```
  - 验证：`node test/multiply.test.js`
  - 完成判据：文件存在；当前运行该文件报错失败（`src/add.js` 未导出 `multiply`，调用 `undefined` 抛 `TypeError`）——先红后绿。

- **任务 2：在 `src/add.js` 中实现并导出 `multiply(a, b)`（绿）**
  - 内容：在现有 `add` 之后追加 `multiply`，不改动 `add` 的签名与行为：
    ```js
    export function multiply(a, b) {
      return a * b;
    }
    ```
  - 验证：`node test/multiply.test.js`
  - 完成判据：`node test/multiply.test.js` 输出 `ok` 且退出码为 0。

- **任务 3：（已取消）不修改 `package.json`**
  - 内容：验证命令由 `.sdlc/policy.yaml#verify.commands` 固定为 `node test/add.test.js` 与 `node test/multiply.test.js`，无需改 `scripts.test`。

- **任务 4：在 `README.md` 增加一行 multiply 用法示例**
  - 内容：在 `# TEST-SDLC` 简介段之后新增一行：
    ```md
    `multiply(a, b)`：返回 `a * b`。示例：`import { multiply } from './src/add.js'; multiply(3, 4) // 12`
    ```
  - 验证：`grep -n "multiply" README.md`
  - 完成判据：README.md 包含上述 multiply 用法示例行，其余内容保持不变。

- **任务 5：全量验证改动范围**
  - 内容：运行 `node test/add.test.js && node test/multiply.test.js` 与 `git status --short`，确认所有测试通过且改动仅限允许范围。
  - 完成判据：`node test/add.test.js && node test/multiply.test.js` 全绿（两个 `ok`）；`git status --short` 仅显示 `src/add.js`、`test/multiply.test.js`、`README.md` 被改动，无 `package-lock.json` 等新增依赖文件。

## 文件变更清单

- `src/add.js`（修改：新增并导出 `multiply(a, b)`，`add` 保持不变）
- `test/multiply.test.js`（新增：multiply 测试，覆盖正数 / 含 0 / 含负数）
- `package.json`：不改动
- `README.md`（修改：新增一行 multiply 用法示例）

## 风险

- 低风险。本变更不触及 `add` 的既有行为与签名，`add(1, 2)` 仍返回 3。
- 测试沿用仓库既有 Node 内置方式（throw + console.log），不引入任何第三方依赖；不修改 `package.json`。
- `node test/add.test.js && node test/multiply.test.js` 使用 `&&` 串联，任一测试文件失败会立即短路并以非 0 退出码退出，便于定位失败文件。
- 非有限输入（`NaN`、`Infinity`）、参数缺失、浮点精度不在本次范围，不做处理、不写测试，符合 SPEC-1 非目标。
- 若改动范围超出 `src/`、`test/`、`README.md`，任务 5 将显式失败，阻止越界合并。

## 验证方式

- `node test/multiply.test.js`：任务 1 阶段预期失败（红，`TypeError: multiply is not a function`）；任务 2 完成后预期打印 `ok`、退出码 0。
- `node test/add.test.js`：预期打印 `ok`、退出码 0（证明 `add` 行为未变）。
- `node test/add.test.js && node test/multiply.test.js`：预期依次打印两个 `ok`、退出码 0。
- `git status --short`：预期仅 `src/add.js`、`test/multiply.test.js`、`README.md` 出现改动。
- 不新增依赖：预期无 `package-lock.json` 或 `node_modules` 相关改动。
