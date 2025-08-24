import React, { useState } from "react";
import Sidebar from "../Sidebar";
import "./index.scss";

/**
 * 主布局组件
 * 包含右侧导航菜单和主内容区域
 */
interface MainLayoutProps {
  children: React.ReactNode;
  selectedKey?: string;
  onMenuSelect?: (key: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  selectedKey,
  onMenuSelect,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="main-layout">
      {/* 左侧导航菜单 */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        selectedKey={selectedKey}
        onMenuSelect={onMenuSelect}
      />
      {/* 主内容区域 */}
      <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
