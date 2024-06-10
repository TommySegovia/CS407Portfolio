import { useEffect, useRef } from "react";
import { World } from "./World/World";
import styles from "./Assignment_5.module.css";

function Assignment_5() {
  const containerRef = useRef(null);
  const worldRef = useRef<World | null>(null);

  useEffect(() => {
    if (containerRef.current && !worldRef.current) {
      worldRef.current = new World(containerRef.current);
      worldRef.current.start();
    }
  }, []);

  return (
    <div>
      <div className={styles.container} ref={containerRef}>
        <h1 className={styles.h1}>Assignment 5</h1>
      </div>
      <div id="summaryDiv" className={styles.summaryDiv}>
        <p>
          The goal of this assignment is to build a custom object using an indexed buffer geometry with custom colors and camera controls
        </p>
      </div>
      <div id="listDiv" className={styles.listDiv}>
        <ul>
        <li>
          Orbit controls allow the mouse to orbit, pan, and zoom in and out in the scene.
        </li>
        <li>
          Pressing r will pulse the custom geometry.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Assignment_5;
