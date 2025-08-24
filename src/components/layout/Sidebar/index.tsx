import React from "react";
import NavigationMenu from "../NavigationMenu";
import "./index.scss";

/**
 * 左侧侧边栏组件
 * 包含导航菜单和折叠按钮
 */
interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  selectedKey?: string;
  onMenuSelect?: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggle,
  selectedKey,
  onMenuSelect,
}) => {
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* 侧边栏头部 */}
      <div className="sidebar-header">
        <div className="logo">
          {!collapsed && (
            <div className="logo-content">
              <div className="logo-icon">🎨</div>
              <span className="logo-text">Three.js</span>
            </div>
          )}
        </div>
        <button className="collapse-btn" onClick={onToggle}>
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* 导航菜单 */}
      <div className="sidebar-content">
        <NavigationMenu
          collapsed={collapsed}
          selectedKey={selectedKey}
          onMenuSelect={onMenuSelect}
        />
      </div>

      {/* 侧边栏底部 */}
      <div className="sidebar-footer">
        {!collapsed && (
          <div className="version-info">
            <span>v1.0.0</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
