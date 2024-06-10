import { useEffect, useRef } from "react";
import { World } from "./World/World";
import styles from "./Assignment_6.module.css";

function Assignment_6() {
  const containerRef = useRef(null);
  const worldRef = useRef<World | null>(null);

  useEffect(() => {
    if (containerRef.current && !worldRef.current) {
      worldRef.current = new World(containerRef.current);
      worldRef.current.start();
      worldRef.current.init();
    }
  }, []);

  return (
    <div>
      <div className={styles.container} ref={containerRef}>
        <h1 className={styles.h1}>Assignment 6</h1>
      </div>
      <div id="summaryDiv" className={styles.summaryDiv}>
        <p>
          The goal of this assignment is to utilize a pre-made GLTF 3D model and animation
        </p>
      </div>
      <div id="listDiv" className={styles.listDiv}>
        <ul>
          <li>
            Use WASD to move the manta ray around the scene
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Assignment_6;
