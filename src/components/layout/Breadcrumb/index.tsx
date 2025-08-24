import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./index.scss";

/**
 * 面包屑导航组件
 * 显示当前页面的层级路径
 */
const Breadcrumb: React.FC = () => {
  const location = useLocation();

  // 路径映射
  const pathMap: Record<string, { title: string; parent?: string }> = {
    "/": { title: "首页" },
    "/overview": { title: "组件总览" },
    "/changelog": { title: "更新日志" },
    "/simple-example": { title: "简单示例", parent: "Three.js 示例" },
    "/advanced-example": { title: "高级示例", parent: "Three.js 示例" },
  };

  const currentPath = location.pathname;
  const currentItem = pathMap[currentPath];

  if (!currentItem) return null;

  const breadcrumbItems = [];

  // 添加首页
  if (currentPath !== "/") {
    breadcrumbItems.push({
      title: "首页",
      path: "/",
    });
  }

  // 添加父级
  if (currentItem.parent) {
    breadcrumbItems.push({
      title: currentItem.parent,
      path: null, // 父级分类不可点击
    });
  }

  // 添加当前页面
  breadcrumbItems.push({
    title: currentItem.title,
    path: null, // 当前页面不可点击
  });

  return (
    <div className="breadcrumb">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="breadcrumb-separator">/</span>}
          {item.path ? (
            <Link to={item.path} className="breadcrumb-link">
              {item.title}
            </Link>
          ) : (
            <span className="breadcrumb-current">{item.title}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
