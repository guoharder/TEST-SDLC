---
id: SPEC-1
kind: spec
title: 为 add 模块增加 subtract 函数
author: executor:claude
created: 2026-09-20
status: approved
intent: INT-1
risk_tags: []
links: {}
---

## 方案

在 `src/add.js` 中新增并导出 `subtract(a, b)`，对任意有限数字返回 `a - b`，保持 `add` / `multiply` 的行为与签名不变。新增 `test/subtract.test.js`，沿用仓库既有测试风格（无第三方断言库，条件不满足则抛错、成功打印 `ok`），覆盖正数相减、结果为负、含 0 三种情况。**不要修改 `package.json`**，验证命令由 `.sdlc/policy.yaml#verify.commands` 固定。构建阶段不改 `README.md`——文档由随后的文档阶段处理。

## 验收标准

- `src/add.js` 必须新增并导出 `subtract(a, b)`，`subtract(5, 3)` 返回 2、`subtract(3, 5)` 返回 -2、`subtract(0, 4)` 返回 -4、`subtract(4, 0)` 返回 4。
- `test/subtract.test.js` 必须新增并覆盖上述三类情况；三条验证命令全部通过。
- `add(1, 2)` 仍返回 3，`multiply(2, 3)` 仍返回 6。
- 不得引入任何第三方依赖；构建阶段除 `src/`、`test/` 外不得改动其他文件。

## 非功能约束

- 仅使用 Node.js 内置能力与仓库既有 ESM 约定。
- `subtract(a, b)` 的语义限定为对任意有限数字返回 `a - b`；非有限输入、参数缺失、浮点精度不在本次范围内。

## 风险与冲突

- 无已知风险：不触及既有函数行为，不新增依赖面。

## 待定问题

无
