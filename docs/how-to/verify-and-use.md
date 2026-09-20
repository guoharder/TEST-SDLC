# 操作指南：运行验证与使用 subtract

## 目标

- 运行仓库固定的验证测试，确认 `src/add.js` 的三个函数行为正确。
- 在代码中使用 `subtract(a, b)` 做减法。

## 运行验证测试

验证命令固定于 `.sdlc/policy.yaml#verify.commands`。依次运行以下三条命令，每条都应打印 `ok` 且退出码为 0：

```sh
node test/add.test.js
node test/multiply.test.js
node test/subtract.test.js
```

测试文件沿用仓库既有风格：导入被测函数、条件不满足则抛错、全部通过后打印 `ok`。

## 使用 subtract

1. 在 ESM 模块中导入 `subtract`：

   ```js
   import { subtract } from "./src/add.js";
   ```

2. 调用 `subtract(a, b)`，得到 `a - b`：

   ```js
   subtract(5, 3); // 2
   subtract(3, 5); // -2
   subtract(0, 4); // -4
   subtract(4, 0); // 4
   ```

注意：`subtract` 的语义限定为对任意有限数字返回 `a - b`；非有限输入与参数缺失的行为待确认（见[参考：src/add.js API](../reference/api.md)）。
