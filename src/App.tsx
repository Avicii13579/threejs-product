import { Outlet } from "react-router-dom";
import { MainLayout } from "@components/layout";
import Breadcrumb from "@/components/layout/Breadcrumb";
import "./App.css";

/**
 * 主应用组件
 * 使用新的布局系统，包含左侧导航菜单和路由系统
 */
function App() {
  return (
    <MainLayout>
      <div className="App">
        {/* 面包屑导航 */}
        <Breadcrumb />
        {/* 路由出口，渲染匹配的路由组件 */}
        <Outlet />
      </div>
    </MainLayout>
  );
}

export default App;
