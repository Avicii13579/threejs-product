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
const UseRequestAnimationFrame = lazy(
  () => import("@features/step1_simple_example/components/UseRequestAnimationFrame")
);
const UseRequestAnimationFrame2 = lazy(
  () => import("@features/step1_simple_example/components/UseRequestAnimationFrame2")
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
      {
        path: "use-request-animation-frame",
        Component: UseRequestAnimationFrame,
      },
      {
        path: "use-request-animation-frame-2",
        Component: UseRequestAnimationFrame2,
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
  USE_REQUEST_ANIMATION_FRAME: "/use-request-animation-frame",
  USE_REQUEST_ANIMATION_FRAME_2: "/use-request-animation-frame-2",
} as const;
