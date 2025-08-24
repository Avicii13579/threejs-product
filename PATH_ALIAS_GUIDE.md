# 路径别名使用指南

## 概述

本项目已配置了完整的路径别名系统，让你可以更方便地引入 `@features/` 和其他目录中的文件。

## 已配置的路径别名

| 别名            | 对应路径           | 说明               |
| --------------- | ------------------ | ------------------ |
| `@/*`           | `src/*`            | 源码根目录         |
| `@features/*`   | `src/features/*`   | 功能模块目录       |
| `@components/*` | `src/components/*` | 通用组件目录       |
| `@utils/*`      | `src/utils/*`      | 工具函数目录       |
| `@hooks/*`      | `src/hooks/*`      | 自定义 Hook 目录   |
| `@context/*`    | `src/context/*`    | React Context 目录 |
| `@store/*`      | `src/store/*`      | 状态管理目录       |
| `@styles/*`     | `src/styles/*`     | 样式文件目录       |

## 引入 @features/ 文件的方法

### 方法一：直接引入特定功能模块

```typescript
// 引入特定功能模块的导出
import { FirstExample } from "@features/step1_simple_example";
import { AdvancedExample } from "@features/step2_advanced_example";

// 直接引入组件文件
import FirstExample from "@features/step1_simple_example/components/FirstExample";
```

### 方法二：通过功能模块的 index.ts 引入

```typescript
// 每个功能模块都有自己的 index.ts 文件统一导出
import { FirstExample } from "@features/step1_simple_example";
```

### 方法三：通过主入口引入（推荐）

```typescript
// 通过 features 主入口引入所有功能模块
import { FirstExample, AdvancedExample } from "@features";
```

## 目录结构示例

```
src/features/
├── index.ts                    # 主入口文件，导出所有功能模块
├── step1_simple_example/       # 第一个功能模块
│   ├── index.ts               # 模块入口，导出该模块的所有内容
│   ├── components/            # 组件目录
│   │   └── FirstExample.tsx   # 具体组件
│   └── api/                   # API 相关文件
├── step2_advanced_example/    # 第二个功能模块
│   ├── index.ts               # 模块入口
│   └── components/            # 组件目录
│       └── AdvancedExample.tsx
└── README.md                  # 使用说明
```

## 实际使用示例

### 在 App.tsx 中使用

```typescript
import { useState } from "react";
import { FirstExample } from "@features/step1_simple_example";
import { AdvancedExample } from "@features/step2_advanced_example";

function App() {
  const [currentExample, setCurrentExample] = useState<"simple" | "advanced">(
    "simple"
  );

  return (
    <div className="App">
      {currentExample === "simple" ? <FirstExample /> : <AdvancedExample />}
    </div>
  );
}
```

### 在其他组件中使用

```typescript
// 引入工具函数
import { someUtil } from "@utils/someUtil";

// 引入自定义 Hook
import { useSomeHook } from "@hooks/useSomeHook";

// 引入通用组件
import SomeComponent from "@components/SomeComponent";
```

## 配置说明

### TypeScript 配置 (tsconfig.app.json)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@features/*": ["src/features/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"],
      "@hooks/*": ["src/hooks/*"],
      "@context/*": ["src/context/*"],
      "@store/*": ["src/store/*"],
      "@styles/*": ["src/styles/*"]
    }
  }
}
```

### Vite 配置 (vite.config.ts)

```typescript
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
      "@features": "/src/features",
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@context": "/src/context",
      "@store": "/src/store",
      "@styles": "/src/styles",
    },
  },
});
```

## 最佳实践

1. **模块化组织**：每个功能模块都应该有自己的目录
2. **统一导出**：每个功能模块都应该有 `index.ts` 文件统一导出
3. **清晰命名**：使用描述性的目录和文件名称
4. **JSDoc 注释**：为所有导出的函数和组件添加 JSDoc 注释
5. **避免深层嵌套**：尽量保持目录结构扁平化

## 注意事项

- 路径别名在开发和生产环境都有效
- 确保在添加新的路径别名时，同时更新 TypeScript 和 Vite 配置
- 使用路径别名可以提高代码的可读性和维护性
- 建议在团队中统一使用路径别名的命名规范
