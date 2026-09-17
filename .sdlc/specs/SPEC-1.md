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

在 `src/add.js` 中新增并导出 `multiply(a, b)`，对任意有限数字返回 `a * b`，保持现有 `add(a, b)` 的行为与签名不变。新增 `test/multiply.test.js`，至少覆盖正数相乘、含 0、含负数三种情况。**不要修改 `package.json`**（验证命令由 `.sdlc/policy.yaml` 的 `verify.commands` 固定为逐个运行两个测试文件）。在 `README.md` 增加一行 `multiply` 用法示例。全程不引入任何第三方依赖。

## 验收标准

- `src/add.js` 必须新增并导出 `multiply(a, b)`，对任意有限数字 `a`、`b`，`multiply(a, b)` 等于 `a * b`。
- `multiply` 测试必须至少覆盖三种情况：正数相乘（`multiply(2, 3)` 应返回 6）、含 0（`multiply(5, 0)` 应返回 0）、含负数（`multiply(-2, 4)` 应返回 -8 且 `multiply(-2, -3)` 应返回 6）。
- `test/multiply.test.js` 必须新增，`node test/add.test.js && node test/multiply.test.js` 必须同时运行 add 与 multiply 的测试且全部通过。
- `src/add.js` 中现有 `add` 的导出与行为不得改变，`add(1, 2)` 必须仍返回 3。
- `README.md` 必须新增一行 `multiply` 用法示例。
- 不得引入任何第三方依赖；除 `src/`、`test/`、`README.md` 外不得改动其他文件（包括 `package.json`）。

## 非功能约束

- 无第三方依赖，仅使用 Node.js 内置能力与仓库既有 ESM 约定（`"type": "module"`）。
- 改动范围仅限 `src/`、`test/`、`README.md`；不得修改 `package.json`。
- `multiply(a, b)` 的语义限定为对任意有限数字返回 `a * b`；非有限输入（`NaN`、`Infinity`）、参数缺失、浮点精度等不在本次范围内。

## 风险与冲突

- 无已知风险：本变更不触及 `add` 的既有行为，测试沿用仓库现有 Node 内置测试方式，不新增依赖面。
- 与 INT-1 的约束（不引第三方依赖、不改 `add`、只允许改指定文件）无冲突。

## 待定问题

无
