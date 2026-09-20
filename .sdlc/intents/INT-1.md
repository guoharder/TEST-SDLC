---
id: INT-1
kind: intent
title: 为 add 模块增加 subtract 函数
author: admin@corp.example
created: 2026-09-20
status: accepted
risk_tags: []
change_type: feature
links:
  task: test-sdlc-add-subtract
---

## 问题

`src/add.js` 目前提供 `add(a, b)` 与 `multiply(a, b)`。调用方需要减法时只能内联 `a - b`，重复且无测试覆盖。

## 期望结果

- `src/add.js` 新增并导出 `subtract(a, b)`，对任意有限数字返回 `a - b`。
- 新增 `test/subtract.test.js`，至少覆盖：正数相减、结果为负、含 0 三种情况；`node test/add.test.js`、`node test/multiply.test.js`、`node test/subtract.test.js` 均通过。

## 涉及的人和系统

- 仓库 `TEST-SDLC`（Node.js ESM，无外部依赖）。
- 提出人 / 验收人：admin@corp.example；计划审批：tech-lead（demo@corp.example）。

## 约束

- 不引入第三方依赖；不改动 `add` / `multiply` 的现有行为与签名。
- 构建阶段只改动 `src/` 与 `test/`；文档由文档阶段单独处理。不要修改 `package.json`（验证命令已在 `.sdlc/policy.yaml` 固定）。

## 待定问题

无
