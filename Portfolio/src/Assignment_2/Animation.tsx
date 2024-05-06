import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface AnimationProps {
  animationRunState: boolean;
  wireFrameState: boolean;
}

function Animation({ animationRunState, wireFrameState }: AnimationProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const octahedronRef = useRef<THREE.Mesh | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const isAnimatingRef = useRef<boolean>(true);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    rendererRef.current = renderer;

    const octahedronGeometry = new THREE.OctahedronGeometry(1, 2);
    const octahedronMaterial = new THREE.MeshBasicMaterial({ color: 0x993513, wireframe: wireFrameState });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    scene.add(octahedron);
    octahedronRef.current = octahedron;

    camera.position.z = 3;

    if (mountRef.current && rendererRef.current) {
      mountRef.current.appendChild(rendererRef.current.domElement);
    }

    sceneRef.current = scene;
    cameraRef.current = camera;

    animate();

    // Clean up on unmount
    return () => {
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (octahedronRef.current) {
      const material = octahedronRef.current.material as THREE.MeshBasicMaterial;
      material.wireframe = wireFrameState;
      material.needsUpdate = true;
    }
  }, [wireFrameState]);

  function animate() {
    requestAnimationFrame(animate);
    if (octahedronRef.current && sceneRef.current && cameraRef.current && rendererRef.current) {
      if (isAnimatingRef.current && animationRunState) {
        octahedronRef.current.rotation.x += 0.003;
        octahedronRef.current.rotation.y += 0.003;
      }
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  }

  useEffect(() => {
    isAnimatingRef.current = animationRunState;
  }, [animationRunState]);

  return <div ref={mountRef} />;
}

export default Animation;
