import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth/2, window.innerHeight/2);
    containerRef.current?.appendChild(renderer.domElement);

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x005599 });
    const cube = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(cube);

    const dodecahedronGeometry = new THREE.DodecahedronGeometry(1, 0);
    const dodecahedronMaterial = new THREE.MeshBasicMaterial({ color: 0xff0044 });
    const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
    scene.add(dodecahedron);
    dodecahedron.position.x = 2;

    camera.position.z = 3;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;

      dodecahedron.rotation.x += 0.01;
      dodecahedron.rotation.y += 0.01;

      dodecahedron.position.x = Math.sin(Date.now() * 0.001) * 2;
      dodecahedron.position.y = Math.cos(Date.now() * 0.001) * 2;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
        renderer.dispose();
        if (containerRef.current) {
            containerRef.current.removeChild(renderer.domElement);
          }
    };
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeComponent;