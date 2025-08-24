import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// 懒加载组件
const App = lazy(() => import("../App"));
const FirstExample = lazy(
  () => import("@features/step1_simple_example/components/FirstExample")
);
const FirstExample2 = lazy(
  () => import("@features/step1_simple_example/components/FirstExample2")
);
const FirstExample3 = lazy(
  () => import("@features/step1_simple_example/components/FirstExample3")
);
const AdvancedExample = lazy(
  () => import("@features/step1_simple_example/components/AdvancedExample")
);
/**
 * 路由配置
 * 定义应用的所有路由
 */
export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: FirstExample,
      },
      {
        path: "simple-example",
        Component: FirstExample,
      },
      {
        path: "simple-example-2",
        Component: FirstExample2,
      },
      {
        path: "simple-example-3",
        Component: FirstExample3,
      },
      {
        path: "advanced-example",
        Component: AdvancedExample,
      },
    ],
  },
]);

/**
 * 路由路径常量
 */
export const ROUTES = {
  HOME: "/",
  OVERVIEW: "/overview",
  CHANGELOG: "/changelog",
  SIMPLE_EXAMPLE: "/simple-example",
  SIMPLE_EXAMPLE_2: "/simple-example-2",
  SIMPLE_EXAMPLE_3: "/simple-example-3",
  ADVANCED_EXAMPLE: "/advanced-example",
} as const;
