import { useEffect, useRef } from "react";
import * as THREE from "three";

// 目标：使用 requestAnimationFrame 实现动画
export default function UseRequestAnimationFrame() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    init();
  }, []);

  const init = () => {
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
    mountRef.current?.appendChild(renderer.domElement);

    // 添加坐标辅助
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // 动画循环函数
    const animate = (time: number) => {
      const t = (time / 1000) % 5;
      cube.position.x = t * 1;
      renderer.render(scene, camera);
      requestAnimationFrame((time) => animate(time));
    };

    animate(0);
  };

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
}
