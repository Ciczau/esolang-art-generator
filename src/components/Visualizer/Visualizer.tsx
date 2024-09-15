import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as S from "./Visualizer.styled";
import { IShapeData } from "../../types/IShapeData";

interface Props {
  shapes: IShapeData[];
}

const Visualizer = ({ shapes }: Props) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#c5c5c5");
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 10000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(ambientLight, pointLight);

    const addShapesToScene = (shapes: IShapeData[]) => {
      shapes.forEach((shape) => {
        let geometry: THREE.BufferGeometry;
        const material = new THREE.MeshStandardMaterial({
          color: shape.color,
        });

        switch (shape.type) {
          case "box":
            geometry = new THREE.BoxGeometry(shape.size, shape.size, shape.size);
            break;
          case "sphere":
            geometry = new THREE.SphereGeometry(shape.size, 32, 32);
            break;
          case "cone":
            geometry = new THREE.ConeGeometry(shape.size, shape.size * 2, 32);
            break;
          default:
            geometry = new THREE.BoxGeometry(1, 1, 1);
        }

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(shape.position.x, shape.position.y, shape.position.z);
        mesh.rotation.set(shape.rotation?.x || 0, shape.rotation?.y || 0, shape.rotation?.z || 0);
        scene.add(mesh);

        const edgesGeometry = new THREE.EdgesGeometry(geometry); // Geometria krawędzi
        const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // Materiał krawędzi (czarne krawędzie)
        const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
        edges.position.copy(mesh.position); // Ustawienie tej samej pozycji co siatka
        edges.rotation.copy(mesh.rotation); // Ustawienie tej samej rotacji co siatka

        scene.add(edges);
      });
    };

    addShapesToScene(shapes);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      controls.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [shapes]);

  return <S.Visualizer ref={mountRef} />;
};

export default Visualizer;
