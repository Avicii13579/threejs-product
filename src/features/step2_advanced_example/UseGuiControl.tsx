// 使用 lil-gui
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

/**
 * Three.js 使用 GUI 控制物体
 */
function UseGuiControl() {
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
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // 创建一个材质让他有颜色：MeshBasicMaterial 基础材质
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    // TODO 实例三重点：创建一个父元素，并设置位置
    material2.wireframe = true;
    const parentCube = new THREE.Mesh(geometry, material2);
    parentCube.position.set(-3, 0, 0);
    // parentCube.scale.set(2, 2, 2); // 父元素放大会影响子元素
    parentCube.rotation.x = Math.PI / 4; // 绕 X轴旋转 45度

    // 创建一个子元素
    // 创建一个网格 网格是几何体和材质的组合
    const cube = new THREE.Mesh(geometry, material);
    // TODO 实例三重点：设置子元素相对于父元素的位置，并加入到父元素中
    // 子元素相对于父元素的位置
    cube.position.set(2, 0, 0);
    cube.scale.set(1, 1, 1); // 子元素放大不会影响父元素
    cube.rotation.x = Math.PI / 4; // 绕 X轴旋转 45度（会叠加父元素旋转角度，故回旋转 90度）
    parentCube.add(cube);
    // 将网格添加到场景中
    scene.add(parentCube);

    // 创建辅助坐标系 红色 X 轴 绿色 Y 轴 蓝色 Z 轴
    // 参数：5 表示坐标轴的长度
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // ========== ArrowHelper 箭头辅助器示例 ==========

    // 示例1：基础箭头 - 指向右上方
    // TODO 做教学指示
    const dir1 = new THREE.Vector3(1, 2, 0);
    dir1.normalize(); // 归一化方向向量
    const origin1 = new THREE.Vector3(0, 0, 0);
    const length1 = 2;
    const color1 = 0xffff00; // 黄色
    const arrowHelper1 = new THREE.ArrowHelper(dir1, origin1, length1, color1);
    scene.add(arrowHelper1);

    // 创建轨道控制器
    // 参数1：相机 参数二：事件监听的 HTML 元素
    const controls = new OrbitControls(camera, renderer.domElement);
    // 设置控制器阻尼
    controls.enableDamping = true;
    // 设置控制器阻尼系数 系数越大，阻尼越大，动画越慢
    controls.dampingFactor = 0.05;
    // 设置控制器是否自动旋转
    // controls.autoRotate = true;
    // 设置控制器自动旋转速度
    // controls.autoRotateSpeed = 1.0;

    let animationId: number;

    // 动画循环函数
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // 旋转立方体
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // 控制器阻尼需要搭配动画的 update；更新控制器（必须调用才能让阻尼效果生效）
      controls.update();

      // 使用渲染器渲染场景和相机
      renderer.render(scene, camera);
    };

    // 开始动画循环
    animate();

    // 处理窗口大小变化
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const eventObj = {
      fullScreen: () => {
        renderer.domElement.requestFullscreen();
      },
      exitFullScreen: () => {
        document.exitFullscreen();
      },
    };
    // 创建 GUI 控制器
    const gui = new GUI();
    gui.add(eventObj, "fullScreen").name("全屏");
    gui.add(eventObj, "exitFullScreen").name("退出全屏");
    gui.add(parentCube.material, "wireframe").name("线框模式");
    // 添加分组
    const folder = gui.addFolder("Event");
    folder
      .add(cube.position, "x", -5, 5)
      .name("X 轴位置")
      .max(5)
      .min(-5)
      .step(0.01);
    folder
      .add(cube.position, "y", -5, 5)
      .name("Y 轴位置")
      .max(5)
      .min(-5)
      .step(0.01);
    folder
      .add(cube.position, "z", -5, 5)
      .name("Z 轴位置")
      .max(5)
      .min(-5)
      .step(0.01);

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

      // webgl 资源需要手动释放：GC 无法自动回收 WebGL 资源
      // 清理轨道控制器
      controls.dispose();

      // 释放 Three.js 资源：注意先释放子元素，再释放父元素
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      material2.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
}

export default UseGuiControl;
