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
- 新增 `test/multiply.test.js`，至少覆盖：正数相乘、含 0、含负数 三种情况；`node test/add.test.js` 与 `node test/multiply.test.js` 均通过（不要修改 package.json）。
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
