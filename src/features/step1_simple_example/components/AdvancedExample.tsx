import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 高级 Three.js 3D 场景组件
 * 展示多个几何体和光照效果
 */
function AdvancedExample() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 保存 DOM 引用，避免清理函数中 ref 值已改变
    const container = mountRef.current;

    // 创建场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 创建多个几何体
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.ConeGeometry(0.5, 1, 32),
    ];

    const materials = [
      new THREE.MeshPhongMaterial({ color: 0xff6b6b }),
      new THREE.MeshPhongMaterial({ color: 0x4ecdc4 }),
      new THREE.MeshPhongMaterial({ color: 0x45b7d1 }),
    ];

    const meshes = geometries.map((geometry, index) => {
      const mesh = new THREE.Mesh(geometry, materials[index]);
      mesh.position.x = (index - 1) * 2;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      return mesh;
    });

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    let animationId: number;

    // 动画循环
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.01 * (index + 1);
        mesh.rotation.y += 0.01 * (index + 1);
      });

      renderer.render(scene, camera);
    };

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

      // 释放 Three.js 资源
      renderer.dispose();
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
}

export default AdvancedExample;
