# 左侧导航菜单 + 路由系统使用指南

## 概述

项目已成功优化为左侧导航菜单，并集成了完整的 React Router 路由系统，提供了以下功能：

- 🎯 **左侧导航菜单** - 从右侧移动到左侧，符合常见的 UI 设计习惯
- 🚀 **React Router 集成** - 完整的路由系统，支持 URL 导航
- 🔍 **搜索功能** - 快速搜索菜单项
- 🍞 **面包屑导航** - 显示当前页面层级
- ⚡ **懒加载** - 组件按需加载，提升性能
- 📱 **响应式设计** - 支持移动端和桌面端

## 系统架构

### 路由配置

```typescript
// src/router/index.ts
export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: FirstExample },
      { path: "overview", Component: OverviewPage },
      { path: "changelog", Component: ChangelogPage },
      { path: "simple-example", Component: FirstExample },
      { path: "advanced-example", Component: AdvancedExample },
    ],
  },
]);
```

### 路由常量

```typescript
export const ROUTES = {
  HOME: "/",
  OVERVIEW: "/overview",
  CHANGELOG: "/changelog",
  SIMPLE_EXAMPLE: "/simple-example",
  ADVANCED_EXAMPLE: "/advanced-example",
} as const;
```

## 主要功能

### 1. 左侧导航菜单

- **位置**：固定在页面左侧
- **宽度**：展开时 280px，折叠时 80px
- **功能**：
  - 可折叠/展开
  - 层级菜单结构
  - 版本徽章显示
  - 当前页面高亮

### 2. 路由跳转

- **自动跳转**：点击菜单项自动跳转到对应页面
- **URL 同步**：浏览器地址栏实时更新
- **历史记录**：支持浏览器前进/后退
- **直接访问**：支持通过 URL 直接访问页面

### 3. 搜索功能

- **实时搜索**：输入关键词实时过滤菜单项
- **智能匹配**：支持标题和子菜单项搜索
- **无结果提示**：搜索无结果时显示提示信息

### 4. 面包屑导航

- **层级显示**：显示当前页面的完整路径
- **快速导航**：点击面包屑项目快速跳转
- **自动更新**：根据当前路由自动更新

### 5. 懒加载优化

- **按需加载**：组件只在需要时才加载
- **加载提示**：显示友好的加载中提示
- **性能优化**：减少初始包大小

## 使用方法

### 基本导航

1. **菜单导航**：点击左侧菜单项进行页面跳转
2. **URL 导航**：直接在地址栏输入路径访问
3. **面包屑导航**：点击面包屑项目快速跳转

### 搜索菜单

1. 在搜索框中输入关键词
2. 菜单会实时过滤显示匹配项
3. 点击搜索结果进行跳转

### 折叠菜单

1. 点击右上角的折叠按钮
2. 菜单会收缩为图标模式
3. 再次点击可展开菜单

## 页面结构

### 现有页面

1. **首页** (`/`) - 默认显示简单示例
2. **组件总览** (`/overview`) - 项目组件概览
3. **更新日志** (`/changelog`) - 版本更新历史
4. **简单示例** (`/simple-example`) - 基础 Three.js 立方体
5. **高级示例** (`/advanced-example`) - 多几何体和光照效果

### 添加新页面

1. **创建页面组件**：

```typescript
// src/pages/NewPage.tsx
const NewPage: React.FC = () => {
  return <div>新页面内容</div>;
};
export default NewPage;
```

2. **添加路由配置**：

```typescript
// src/router/index.ts
{
  path: "new-page",
  Component: lazy(() => import("../pages/NewPage")),
}
```

3. **添加路由常量**：

```typescript
// src/router/index.ts
export const ROUTES = {
  // ... 其他路由
  NEW_PAGE: "/new-page",
} as const;
```

4. **更新菜单数据**：

```typescript
// src/components/layout/NavigationMenu.tsx
{
  key: "new-page",
  title: "新页面",
  icon: "🆕",
  path: ROUTES.NEW_PAGE,
}
```

5. **更新面包屑映射**：

```typescript
// src/components/layout/Breadcrumb.tsx
const pathMap = {
  // ... 其他映射
  "/new-page": { title: "新页面" },
};
```

## 样式定制

### 主题色彩

```css
/* 主色调 */
--primary-color: #1890ff;
--primary-hover: #40a9ff;

/* 背景色 */
--sidebar-bg: #fff;
--content-bg: #fafafa;

/* 边框色 */
--border-color: #f0f0f0;
```

### 尺寸调整

```css
/* 侧边栏宽度 */
.sidebar {
  width: 280px; /* 展开时 */
}

.sidebar.collapsed {
  width: 80px; /* 折叠时 */
}

/* 主内容区域 */
.main-content {
  margin-left: 280px; /* 展开时 */
}

.main-content.collapsed {
  margin-left: 80px; /* 折叠时 */
}
```

## 性能优化

### 1. 代码分割

- 使用 `React.lazy()` 实现组件懒加载
- 路由级别的代码分割
- 减少初始包大小

### 2. 缓存策略

- 路由组件缓存
- 菜单状态持久化
- 搜索结果缓存

### 3. 渲染优化

- 使用 `React.memo` 优化组件渲染
- 避免不必要的重新渲染
- 合理使用 `useCallback` 和 `useMemo`

## 最佳实践

### 1. 路由设计

- 使用语义化的路径名称
- 保持路径结构简洁
- 避免过深的嵌套层级

### 2. 菜单组织

- 按功能模块分组
- 使用清晰的图标和标题
- 合理设置菜单层级

### 3. 状态管理

- 路由状态由 React Router 管理
- 菜单状态使用本地 state
- 避免不必要的全局状态

### 4. 用户体验

- 提供加载状态提示
- 保持导航的一致性
- 支持键盘导航

## 故障排除

### 常见问题

1. **路由不匹配**

   - 检查路由配置是否正确
   - 确认路径拼写无误
   - 验证组件导入路径

2. **菜单不高亮**

   - 检查当前路径映射
   - 确认菜单项 key 值
   - 验证选中逻辑

3. **懒加载失败**

   - 检查组件导出方式
   - 确认 Suspense 包装
   - 验证导入路径

4. **搜索不工作**
   - 检查搜索过滤逻辑
   - 确认菜单数据结构
   - 验证搜索状态更新

### 调试技巧

1. 使用 React DevTools 查看组件状态
2. 检查浏览器控制台错误信息
3. 使用 React Router DevTools
4. 验证网络请求和资源加载

## 扩展功能

### 1. 权限控制

```typescript
// 路由守卫
const ProtectedRoute = ({ children, requiredRole }) => {
  const userRole = useUserRole();
  return userRole === requiredRole ? children : <Navigate to="/login" />;
};
```

### 2. 动态菜单

```typescript
// 根据用户权限动态生成菜单
const useMenuData = () => {
  const userPermissions = useUserPermissions();
  return useMemo(
    () => filterMenuByPermissions(menuData, userPermissions),
    [userPermissions]
  );
};
```

### 3. 主题切换

```typescript
// 主题上下文
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);
```

### 4. 国际化

```typescript
// 多语言支持
const useTranslation = () => {
  const locale = useLocale();
  return (key: string) => translations[locale][key];
};
```

## 总结

优化后的导航系统提供了完整的路由功能和良好的用户体验：

- ✅ 左侧导航菜单，符合用户习惯
- ✅ 完整的 React Router 集成
- ✅ 搜索和面包屑导航功能
- ✅ 懒加载和性能优化
- ✅ 响应式设计和移动端支持
- ✅ 易于扩展和定制

这个系统为项目提供了坚实的导航基础，支持未来的功能扩展和用户体验优化。
