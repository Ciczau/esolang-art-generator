import React, { useEffect, useRef } from "react";
import * as THREE from "three";

import * as S from "./Visualizer.styled";

interface BrainfuckVisualizerProps {
  coordinates: number[];
  color: string;
}

const Visualizer: React.FC<BrainfuckVisualizerProps> = ({
  coordinates,
  color,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      100,
      mount.clientWidth / mount.clientHeight,
      0.1,
      10000
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const vertices = [];
    for (let i = 0; i < coordinates.length; i += 3) {
      vertices.push(
        new THREE.Vector3(
          coordinates[i] || 0,
          coordinates[i + 1] || 0,
          coordinates[i + 2] || 0
        )
      );
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
    const material = new THREE.LineBasicMaterial({ color });
    const line = new THREE.Line(geometry, material);
    scene.add(line);

    camera.position.z = 100;

    const animate = () => {
      requestAnimationFrame(animate);
      line.rotation.x += 0.01;
      line.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, [coordinates, color]);

  return <S.Visualizer ref={mountRef} />;
};

export default Visualizer;
