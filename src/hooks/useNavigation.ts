import { useState, useCallback } from "react";

/**
 * 导航状态管理 Hook
 * 管理当前选中的菜单项和内容切换
 */
export const useNavigation = () => {
  const [selectedKey, setSelectedKey] = useState<string>("simple-example");

  /**
   * 切换选中的菜单项
   */
  const handleMenuSelect = useCallback((key: string) => {
    setSelectedKey(key);
  }, []);

  /**
   * 获取当前选中的内容组件
   */
  const getCurrentContent = useCallback(() => {
    switch (selectedKey) {
      case "simple-example":
        return "simple";
      case "advanced-example":
        return "advanced";
      case "overview":
        return "overview";
      case "changelog":
        return "changelog";
      default:
        return "simple";
    }
  }, [selectedKey]);

  return {
    selectedKey,
    handleMenuSelect,
    getCurrentContent,
  };
};
