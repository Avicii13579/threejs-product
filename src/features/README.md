# Features 模块使用指南

## 路径别名配置

项目已配置以下路径别名：

- `@features/*` → `src/features/*`
- `@components/*` → `src/components/*`
- `@utils/*` → `src/utils/*`
- `@hooks/*` → `src/hooks/*`
- `@context/*` → `src/context/*`
- `@store/*` → `src/store/*`
- `@styles/*` → `src/styles/*`

## 引入方式

### 1. 直接引入特定功能模块

```typescript
// 引入特定功能模块
import { FirstExample } from "@features/step1_simple_example";

// 或者直接引入组件
import FirstExample from "@features/step1_simple_example/components/FirstExample";
```

### 2. 通过主入口引入

```typescript
// 通过 features 主入口引入
import { FirstExample } from "@features";
```

### 3. 引入其他目录的文件

```typescript
// 引入组件
import SomeComponent from "@components/SomeComponent";

// 引入工具函数
import { someUtil } from "@utils/someUtil";

// 引入自定义 Hook
import { useSomeHook } from "@hooks/useSomeHook";
```

## 目录结构

```
src/features/
├── index.ts                    # 主入口文件
├── step1_simple_example/       # 第一个示例功能
│   ├── index.ts               # 功能模块入口
│   ├── components/            # 组件目录
│   │   └── FirstExample.tsx   # 第一个示例组件
│   └── api/                   # API 相关
└── README.md                  # 使用说明
```

## 最佳实践

1. **模块化组织**：每个功能模块都应该有自己的目录
2. **统一导出**：每个功能模块都应该有 `index.ts` 文件统一导出
3. **清晰命名**：使用描述性的目录和文件名称
4. **JSDoc 注释**：为所有导出的函数和组件添加 JSDoc 注释
