---
id: PLAN-1
kind: plan
title: 为 add 模块增加 subtract 函数
author: executor:claude
created: 2026-09-20
status: approved
spec: SPEC-1
intent: INT-1
risk_tags: []
links: {}
---

## 任务

- **任务 1：新增失败测试 `test/subtract.test.js`（红）**
  - 内容：
    ```js
    import { subtract } from "../src/add.js";
    if (subtract(5, 3) !== 2) throw new Error("subtract broken: 5-3");
    if (subtract(3, 5) !== -2) throw new Error("subtract broken: 3-5");
    if (subtract(0, 4) !== -4) throw new Error("subtract broken: 0-4");
    if (subtract(4, 0) !== 4) throw new Error("subtract broken: 4-0");
    console.log("ok");
    ```
  - 验证：`node test/subtract.test.js`
  - 完成判据：文件存在；当前运行报错（`subtract` 未导出）——先红后绿。

- **任务 2：在 `src/add.js` 中实现并导出 `subtract(a, b)`（绿）**
  - 内容：在 `multiply` 之后追加 `export function subtract(a, b) { return a - b; }`。
  - 验证：`node test/subtract.test.js`
  - 完成判据：输出 `ok` 且退出码为 0。

- **任务 3：全量验证改动范围**
  - 内容：运行三条验证命令与 `git status --short`。
  - 完成判据：三个 `ok`；`git status --short` 仅显示 `src/add.js`、`test/subtract.test.js`。

## 文件变更清单

- `src/add.js`（修改：新增并导出 `subtract(a, b)`）
- `test/subtract.test.js`（新增）
- `package.json` / `README.md`：构建阶段不改动

## 风险

- 低风险。不触及既有函数；不引入依赖；不修改验证定义文件。

## 验证方式

- `node test/add.test.js && node test/multiply.test.js && node test/subtract.test.js`：三个 `ok`、退出码 0。
- `git status --short`：仅 `src/add.js`、`test/subtract.test.js`。
