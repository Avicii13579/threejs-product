import { useEffect, useRef } from "react";
import * as THREE from "three";

// 目标：使用 requestAnimationFrame 实现动画：使用 THREE.Clock 跟踪时间
export default function UseRequestAnimationFrame() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 保存 DOM 引用，避免清理函数中 ref 值已改变
    const container = mountRef.current;

    // 创建场景
    const scene = new THREE.Scene();
    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);
    scene.add(camera);

    // 创建物体几何体 BoxGeometry(x, y, z)
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    // MeshBasicMaterial 简单着色材质，不受光的影响
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // 根据几何体和材质创建物体
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // 修改物体的位置
    // cube.position.set(5, 0, 0);
    // cube.position.x = 3;
    // 缩放
    // cube.scale.set(3, 2, 1);
    // cube.scale.x = 5;
    // 旋转 参数按照 XZY 进行配置
    cube.rotation.set(Math.PI / 4, 0, 0, "XZY");
    scene.add(cube);

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 添加坐标辅助
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    const clock = new THREE.Clock();
    let animationId: number;

    // 动画循环函数
    const animate = () => {
      // 方案一：获取时钟运行总时长，计算物体位置
      // const time = clock.getElapsedTime();
      // console.log("时钟运行总时长：", time);
      // // 计算物体位置
      // const t = time % 5;
      // cube.position.x = t * 1;

      // 方案二：获取两次获取时间的间隔时间，计算物体位置
      const deltaTime = clock.getDelta();
      console.log("两次获取时间的间隔时间：", deltaTime);
      // 计算物体位置
      // 以 1 单位/秒的速度移动
      cube.position.x += 1 * deltaTime;

      // 超过 5 就回到 0（循环效果）
      if (cube.position.x > 5) {
        cube.position.x = 0;
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate); // 注意：触发回调 animate 默认会传入 tempstamp 表示上一帧渲染的结束时间（从起始时间开始的毫秒数）
    };

    animate();

    // 清理函数：防止内存泄漏和双重渲染
    return () => {
      // 取消动画循环
      cancelAnimationFrame(animationId);

      // 移除 canvas 元素
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // 释放 Three.js 资源
      renderer.dispose();
      cubeGeometry.dispose();
      cubeMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
}
