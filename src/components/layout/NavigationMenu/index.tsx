import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../../router";
import "./index.scss";

/**
 * 导航菜单项接口
 */
interface MenuItem {
  key: string;
  title: string;
  icon?: string;
  badge?: string;
  path?: string;
  children?: MenuItem[];
}

/**
 * 导航菜单组件
 * 类似 Ant Design 的菜单结构
 */
interface NavigationMenuProps {
  collapsed: boolean;
  selectedKey?: string;
  onMenuSelect?: (key: string) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  collapsed,
  selectedKey,
  onMenuSelect,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([
    "general",
    "layout",
    "threejs-examples",
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  // 根据当前路径确定选中的菜单项
  const getCurrentSelectedKey = () => {
    if (selectedKey) return selectedKey;

    switch (location.pathname) {
      case ROUTES.HOME:
      case ROUTES.SIMPLE_EXAMPLE:
        return "simple-example";
      case ROUTES.SIMPLE_EXAMPLE_2:
        return "first-example-2";
      case ROUTES.SIMPLE_EXAMPLE_3:
        return "first-example-3";
      case ROUTES.ADVANCED_EXAMPLE:
        return "advanced-example";
      case ROUTES.USE_REQUEST_ANIMATION_FRAME:
        return "use-request-animation-frame";
      case ROUTES.USE_REQUEST_ANIMATION_FRAME_2:
        return "use-request-animation-frame-2";
      case ROUTES.USE_GSAP_EXAMPLE:
        return "use-gsap-example";
      case ROUTES.OVERVIEW:
        return "overview";
      case ROUTES.CHANGELOG:
        return "changelog";
      case ROUTES.USE_GUI_CONTROL:
        return "use-gui-control";
      case ROUTES.USE_VERTEX_DRAW:
        return "use-vertex-draw";
      default:
        return "simple-example";
    }
  };

  const currentSelectedKey = getCurrentSelectedKey();

  // 搜索过滤函数
  const filterMenuItems = (items: MenuItem[], term: string): MenuItem[] => {
    if (!term) return items;

    return items.reduce((filtered: MenuItem[], item) => {
      const matchesTitle = item.title
        .toLowerCase()
        .includes(term.toLowerCase());
      const hasMatchingChildren =
        item.children &&
        item.children.some((child) =>
          child.title.toLowerCase().includes(term.toLowerCase())
        );

      if (matchesTitle || hasMatchingChildren) {
        const filteredItem = { ...item };
        if (item.children) {
          filteredItem.children = item.children.filter((child) =>
            child.title.toLowerCase().includes(term.toLowerCase())
          );
        }
        filtered.push(filteredItem);
      }

      return filtered;
    }, []);
  };

  // 菜单数据
  const menuData: MenuItem[] = [
    {
      key: "threejs-examples",
      title: "Three.js 示例",
      icon: "🎨",
      children: [
        {
          key: "simple-example",
          title: "简单示例",
          icon: "🔲",
          path: ROUTES.SIMPLE_EXAMPLE,
        },
        {
          key: "first-example-2",
          title: "简单示例2",
          icon: "🔲",
          path: ROUTES.SIMPLE_EXAMPLE_2,
        },
        {
          key: "first-example-3",
          title: "简单示例3",
          icon: "🔲",
          path: ROUTES.SIMPLE_EXAMPLE_3,
        },
        {
          key: "advanced-example",
          title: "高级示例",
          icon: "🌟",
          path: ROUTES.ADVANCED_EXAMPLE,
        },
        {
          key: "use-request-animation-frame",
          title: "使用 requestAnimationFrame 实现动画",
          icon: "🔲",
          path: ROUTES.USE_REQUEST_ANIMATION_FRAME,
        },
        {
          key: "use-request-animation-frame-2",
          title: "使用 requestAnimationFrame 实现动画2",
          icon: "🔲",
          path: ROUTES.USE_REQUEST_ANIMATION_FRAME_2,
        },
        {
          key: "use-gsap-example",
          title: "使用 GSAP 实现动画",
          icon: "🔲",
          path: ROUTES.USE_GSAP_EXAMPLE,
        },
        {
          key: "use-gui-control",
          title: "使用 GUI 控制动画",
          icon: "🔲",
          path: ROUTES.USE_GUI_CONTROL,
        },
        {
          key: "use-vertex-draw",
          title: "使用 Vertex Draw 实现动画",
          icon: "🔲",
          path: ROUTES.USE_VERTEX_DRAW,
        },
      ],
    },
  ];

  /**
   * 切换展开/折叠状态
   */
  const toggleExpanded = (key: string) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  /**
   * 处理菜单项点击
   */
  const handleMenuClick = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      toggleExpanded(item.key);
    } else {
      // 如果有路径，则进行路由跳转
      if (item.path) {
        navigate(item.path);
      }
      // 调用外部回调
      onMenuSelect?.(item.key);
    }
  };

  /**
   * 渲染菜单项
   */
  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isExpanded = expandedKeys.includes(item.key);
    const isSelected = currentSelectedKey === item.key;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.key} className="menu-item-wrapper">
        <div
          className={`menu-item ${isSelected ? "selected" : ""} level-${level}`}
          onClick={() => handleMenuClick(item)}
        >
          {/* 图标 */}
          {item.icon && <span className="menu-icon">{item.icon}</span>}

          {/* 标题 */}
          {!collapsed && <span className="menu-title">{item.title}</span>}

          {/* 徽章 */}
          {!collapsed && item.badge && (
            <span className="menu-badge">{item.badge}</span>
          )}

          {/* 展开箭头 */}
          {!collapsed && hasChildren && (
            <span className={`expand-arrow ${isExpanded ? "expanded" : ""}`}>
              ▼
            </span>
          )}
        </div>

        {/* 子菜单 */}
        {hasChildren && isExpanded && !collapsed && (
          <div className="submenu">
            {item.children!.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // 过滤后的菜单数据
  const filteredMenuData = filterMenuItems(menuData, searchTerm);

  return (
    <div className="navigation-menu">
      {/* 搜索框 */}
      {!collapsed && (
        <div className="menu-search">
          <input
            type="text"
            placeholder="搜索菜单..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      )}

      {/* 菜单项 */}
      {filteredMenuData.map((item) => renderMenuItem(item))}

      {/* 无搜索结果 */}
      {searchTerm && filteredMenuData.length === 0 && !collapsed && (
        <div className="no-results">
          <span>未找到匹配项</span>
        </div>
      )}
    </div>
  );
};

export default NavigationMenu;
