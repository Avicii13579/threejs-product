import React from "react";
import { FirstExample, AdvancedExample } from "@features/step1_simple_example";

/**
 * 内容渲染组件
 * 根据选中的菜单项显示不同的内容
 */
interface ContentRendererProps {
  selectedKey: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ selectedKey }) => {
  const renderContent = () => {
    switch (selectedKey) {
      case "simple-example":
        return <FirstExample />;
      case "advanced-example":
        return <AdvancedExample />;
      case "overview":
        return (
          <div style={{ padding: "40px", textAlign: "center" }}>
            <h1>组件总览</h1>
            <p>这里是 Three.js 项目的组件总览页面</p>
            <div style={{ marginTop: "20px" }}>
              <h3>可用组件：</h3>
              <ul
                style={{
                  textAlign: "left",
                  maxWidth: "400px",
                  margin: "0 auto",
                }}
              >
                <li>简单示例 - 基础的 Three.js 立方体</li>
                <li>高级示例 - 多几何体和光照效果</li>
              </ul>
            </div>
          </div>
        );
      case "changelog":
        return (
          <div style={{ padding: "40px", textAlign: "center" }}>
            <h1>更新日志</h1>
            <div
              style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}
            >
              <h3>v1.0.0 (2024-01-01)</h3>
              <ul>
                <li>✨ 新增右侧导航菜单</li>
                <li>🎨 优化 UI 设计，类似 Ant Design</li>
                <li>📱 添加响应式支持</li>
                <li>🔧 配置路径别名系统</li>
              </ul>
            </div>
          </div>
        );
      default:
        return <FirstExample />;
    }
  };

  return <div className="content-renderer">{renderContent()}</div>;
};

export default ContentRenderer;
