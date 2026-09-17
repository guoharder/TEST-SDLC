# 工作项：TEST-SDLC：为 add 模块增加 multiply 函数

- 工作项 id：626db74f-2080-44f9-8579-0c4358152332（test-sdlc-add-multiply）
- 阶段：build
- run_id：a456393d-5e76-4f55-add1-70bd53ff4973

## 目标

按 spec / plan 实现这项工作：修改代码、补测试、更新必要文档。保持改动范围与 plan 一致；plan 之外的发现写进 summary，不要顺手做。

## Intent

---
id: INT-1
kind: intent
title: 为 add 模块增加 multiply 函数
author: admin@corp.example
created: 2026-09-17
status: accepted
risk_tags: []
change_type: feature
links:
  task: test-sdlc-add-multiply
---

## 问题

`src/add.js` 目前只提供 `add(a, b)`。调用方需要乘法时只能自己写循环或内联 `a * b`，重复且无测试覆盖。

## 期望结果

- `src/add.js` 新增并导出 `multiply(a, b)`，对任意有限数字返回 `a * b`。
- 新增 `test/multiply.test.js`，至少覆盖：正数相乘、含 0、含负数 三种情况；`npm test` 同时跑 add 与 multiply 的测试并全部通过。
- `README.md` 增加一行 `multiply` 用法示例。

## 涉及的人和系统

- 仓库 `TEST-SDLC`（Node.js ESM，无外部依赖）。
- 提出人 / 验收人：admin@corp.example；计划审批：tech-lead（demo@corp.example）。

## 约束

- 不引入第三方依赖；不改动 `add` 的现有行为与签名。
- 只允许改动 `src/`、`test/`、`README.md` 与 `package.json` 的 `scripts.test`。
- 变更走 lean 工作流：规格通过 DoR 后由执行器构建，计划仍需人批。

## 待定问题

无

## Spec

---
id: SPEC-1
kind: spec
title: 为 add 模块增加 multiply 函数
author: executor:claude
created: 2026-09-16
status: approved
intent: INT-1
risk_tags: []
links: {}
---

## 方案

在 `src/add.js` 中新增并导出 `multiply(a, b)`，对任意有限数字返回 `a * b`，保持现有 `add(a, b)` 的行为与签名不变。新增 `test/multiply.test.js`，至少覆盖正数相乘、含 0、含负数三种情况；将 `package.json` 的 `scripts.test` 改为同时运行 add 与 multiply 两个测试文件。在 `README.md` 增加一行 `multiply` 用法示例。全程不引入任何第三方依赖。

## 验收标准

- `src/add.js` 必须新增并导出 `multiply(a, b)`，对任意有限数字 `a`、`b`，`multiply(a, b)` 等于 `a * b`。
- `multiply` 测试必须至少覆盖三种情况：正数相乘（`multiply(2, 3)` 应返回 6）、含 0（`multiply(5, 0)` 应返回 0）、含负数（`multiply(-2, 4)` 应返回 -8 且 `multiply(-2, -3)` 应返回 6）。
- `test/multiply.test.js` 必须新增，`npm test` 必须同时运行 add 与 multiply 的测试且全部通过。
- `src/add.js` 中现有 `add` 的导出与行为不得改变，`add(1, 2)` 必须仍返回 3。
- `README.md` 必须新增一行 `multiply` 用法示例。
- 不得引入任何第三方依赖；除 `src/`、`test/`、`README.md` 与 `package.json` 的 `scripts.test` 外不得改动其他文件。

## 非功能约束

- 无第三方依赖，仅使用 Node.js 内置能力与仓库既有 ESM 约定（`"type": "module"`）。
- 改动范围仅限 `src/`、`test/`、`README.md` 与 `package.json` 的 `scripts.test`。
- `multiply(a, b)` 的语义限定为对任意有限数字返回 `a * b`；非有限输入（`NaN`、`Infinity`）、参数缺失、浮点精度等不在本次范围内。

## 风险与冲突

- 无已知风险：本变更不触及 `add` 的既有行为，测试沿用仓库现有 Node 内置测试方式，不新增依赖面。
- 与 INT-1 的约束（不引第三方依赖、不改 `add`、只允许改指定文件）无冲突。

## 待定问题

无

## Plan

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

- **任务 3：更新 `package.json` 的 `scripts.test`，同时运行两个测试文件**
  - 内容：`"scripts"` 的 `"test"` 由 `"node test/add.test.js"` 改为 `"node test/add.test.js && node test/multiply.test.js"`；不新增任何依赖字段。
  - 验证：`npm test`
  - 完成判据：`npm test` 依次运行 add 与 multiply 两个测试，均打印 `ok`，退出码为 0。

- **任务 4：在 `README.md` 增加一行 multiply 用法示例**
  - 内容：在 `# TEST-SDLC` 简介段之后新增一行：
    ```md
    `multiply(a, b)`：返回 `a * b`。示例：`import { multiply } from './src/add.js'; multiply(3, 4) // 12`
    ```
  - 验证：`grep -n "multiply" README.md`
  - 完成判据：README.md 包含上述 multiply 用法示例行，其余内容保持不变。

- **任务 5：全量验证改动范围**
  - 内容：运行 `npm test` 与 `git status --short`，确认所有测试通过且改动仅限允许范围。
  - 完成判据：`npm test` 全绿（两个 `ok`）；`git status --short` 仅显示 `src/add.js`、`test/multiply.test.js`、`package.json`、`README.md` 被改动，无 `package-lock.json` 等新增依赖文件。

## 文件变更清单

- `src/add.js`（修改：新增并导出 `multiply(a, b)`，`add` 保持不变）
- `test/multiply.test.js`（新增：multiply 测试，覆盖正数 / 含 0 / 含负数）
- `package.json`（修改：仅 `scripts.test`）
- `README.md`（修改：新增一行 multiply 用法示例）

## 风险

- 低风险。本变更不触及 `add` 的既有行为与签名，`add(1, 2)` 仍返回 3。
- 测试沿用仓库既有 Node 内置方式（throw + console.log），不引入任何第三方依赖；`package.json` 仅动 `scripts.test`。
- `npm test` 使用 `&&` 串联，任一测试文件失败会立即短路并以非 0 退出码退出，便于定位失败文件。
- 非有限输入（`NaN`、`Infinity`）、参数缺失、浮点精度不在本次范围，不做处理、不写测试，符合 SPEC-1 非目标。
- 若改动范围超出 `src/`、`test/`、`README.md` 与 `package.json` 的 `scripts.test`，任务 5 将显式失败，阻止越界合并。

## 验证方式

- `node test/multiply.test.js`：任务 1 阶段预期失败（红，`TypeError: multiply is not a function`）；任务 2 完成后预期打印 `ok`、退出码 0。
- `node test/add.test.js`：预期打印 `ok`、退出码 0（证明 `add` 行为未变）。
- `npm test`：预期依次打印两个 `ok`、退出码 0。
- `git status --short`：预期仅 `src/add.js`、`test/multiply.test.js`、`package.json`、`README.md` 出现改动。
- 不新增依赖：预期无 `package-lock.json` 或 `node_modules` 相关改动。

## 无人值守约定（必须遵守）

1. 现在没有人在终端前。不要提问、不要等待确认；需要决策时按 spec / plan 的字面意思和仓库既有约定选择最保守的做法，并在 summary 里写明。
2. 结束前必须写 `.sdlc/runs/a456393d-5e76-4f55-add1-70bd53ff4973/summary.md`：做了什么、改了哪些文件、跑了哪些验证及结果、未完成 / 需人决定的事项。
3. 如果被策略拦截、缺少必要信息或无法安全继续：在 summary 首行写 `BLOCKED: <原因>`，不要绕过限制，然后以非 0 退出码结束。
4. 不要修改 `.sdlc/policy.yaml`、`.sdlc/evidence/`、CI 配置、密钥或部署脚本。不要 push、不要创建 PR、不要合并——提交与推送由执行器完成。
5. 不要读取或输出任何密钥 / token / 密码；遇到 `.env` 之类文件不要打印内容。
