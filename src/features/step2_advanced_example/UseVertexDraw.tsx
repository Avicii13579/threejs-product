import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/**
 * Three.js 3D 场景组件
 * 为场景增加坐标轴和轨道控制器
 *
 */
export default function UseVertexDraw() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 保存 DOM 引用，避免清理函数中 ref 值已改变
    const container = mountRef.current;

    // 创建一个场景
    const scene = new THREE.Scene();

    // 创建一个相机
    /**
     * 透视相机 PerspectiveCamera：当物体某些部分比摄像机的远截面远或者比近截面近的时候，该部分将不会被渲染到场景中
     * 参数1: 视野角度
     * 参数2: 宽高比
     * 参数3: 近截面
     * 参数4: 远截面
     */
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // 设置相机位置
    camera.position.set(0, 0, 10);

    // 渲染器实例
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // 设置渲染器大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置背景色
    renderer.setClearColor(0x000000);
    // 将 canvas 添加到指定的容器中，而不是 body
    container.appendChild(renderer.domElement);

    // 创建一个几何体 BoxGeometry（立方体）对象. 这个对象包含了一个立方体中所有的顶点（vertices）和面（faces）。
    const geometry = new THREE.BufferGeometry();
    // 顶点有顺序 你时针为正面
    const vertices = new Float32Array([
      -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0,
    ]);
    // 设置顶点属性，第二个参数表示每个顶点有3个分量（x, y, z）
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    // 创建索引，利用索引可以减少顶点数量，提高渲染性能
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    console.log(geometry);

    // 创建一个材质让他有颜色：MeshBasicMaterial 基础材质
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      // side: THREE.DoubleSide,
      wireframe: true,
    });
    // 创建一个网格 网格是几何体和材质的组合
    const cube = new THREE.Mesh(geometry, material);

    // 将网格添加到场景中
    scene.add(cube);

    // 创建辅助坐标系 红色 X 轴 绿色 Y 轴 蓝色 Z 轴
    // 参数：5 表示坐标轴的长度
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // 创建轨道控制器
    // 参数1：相机 参数二：事件监听的 HTML 元素
    const controls = new OrbitControls(camera, renderer.domElement);
    // 设置控制器阻尼
    controls.enableDamping = true;
    // 设置控制器阻尼系数 系数越大，阻尼越大，动画越慢
    controls.dampingFactor = 0.05;
    // 设置控制器是否自动旋转（如果不需要自动旋转，设置为 false）
    controls.autoRotate = false;
    // 设置控制器自动旋转速度（仅在 autoRotate 为 true 时生效）
    controls.autoRotateSpeed = 1.0;

    // 动画循环 ID
    let animationId: number;

    /**
     * 动画循环函数
     * 即使不需要旋转动画，也需要 requestAnimationFrame 因为：
     * 1. Three.js 需要渲染循环来显示场景
     * 2. 如果启用了阻尼（enableDamping），需要在每一帧调用 controls.update()
     * 3. 用户交互（拖拽、缩放等）需要持续渲染
     */
    const animate = () => {
      // 更新轨道控制器（如果启用了阻尼，必须在每一帧调用）
      controls.update();

      // 渲染场景
      renderer.render(scene, camera);

      // 请求下一帧
      animationId = requestAnimationFrame(animate);
    };

    // 启动动画循环
    animate();

    // 处理窗口大小变化
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 清理函数
    return () => {
      // 取消动画循环
      cancelAnimationFrame(animationId);

      // 移除事件监听
      window.removeEventListener("resize", handleResize);

      // 移除 canvas 元素
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // 清理轨道控制器
      controls.dispose();

      // 释放 Three.js 资源
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
}
