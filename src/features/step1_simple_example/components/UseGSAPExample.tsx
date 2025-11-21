import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 使用 GSAP 实现 Three.js 动画
 * 双击暂停/恢复动画
 */
export default function UseGSAPExample() {
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

    // 保存 requestAnimationFrame ID
    let animationId: number;

    // 设置 GSAP 动画 - 位置动画
    const animate1 = gsap.to(cube.position, {
      x: 5,
      duration: 5,
      ease: "power1.inOut",
      // 设置重复的次数，无限次循环-1
      repeat: -1,
      // 往返运动
      yoyo: true,
      // delay，延迟2秒运动
      delay: 2,
      onComplete: () => {
        console.log("动画完成");
      },
      onStart: () => {
        console.log("动画开始");
      },
    });

    // 设置 GSAP 动画 - 旋转动画
    const animate2 = gsap.to(cube.rotation, {
      x: 2 * Math.PI,
      duration: 5,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    // 双击事件处理器：暂停/恢复动画
    const handleDoubleClick = () => {
      if (animate1.isActive()) {
        // 暂停两个动画
        animate1.pause();
        animate2.pause();
        console.log("动画已暂停");
      } else {
        // 恢复两个动画
        animate1.resume();
        animate2.resume();
        console.log("动画已恢复");
      }
    };

    window.addEventListener("dblclick", handleDoubleClick);

    // 渲染函数
    function render() {
      renderer.render(scene, camera);
      // 渲染下一帧的时候就会调用render函数
      animationId = requestAnimationFrame(render);
    }

    render();

    // 清理函数：防止内存泄漏和双重渲染
    return () => {
      // 取消动画循环
      cancelAnimationFrame(animationId);

      // 移除事件监听器
      window.removeEventListener("dblclick", handleDoubleClick);

      // 杀死 GSAP 动画
      animate1.kill();
      animate2.kill();

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
