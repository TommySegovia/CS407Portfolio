import { useEffect, useRef } from "react";
import { World } from "./World/World";
import styles from "./Assignment_3.module.css";

function Assignment_3() {
  const containerRef = useRef(null);
  const worldRef = useRef<World | null>(null);

  useEffect(() => {
    if (containerRef.current && !worldRef.current) {
      worldRef.current = new World(containerRef.current);
      worldRef.current.startAnimationLoop();
    }
  }, []);

  return (
    <div>
      <div className={styles.container} ref={containerRef}>
        <h1 className={styles.h1}>Assignment 3</h1>
      </div>
      <div id="summaryDiv" className={styles.summaryDiv}>
        <p>
          The goal of this assignment is to improve on our structure when
          working with three.js which includes
        </p>
      </div>
      <div id="listDiv" className={styles.listDiv}>
        <ul>
          <li>Use of the world class</li>
          <li>Organize and abstracting components into modules</li>
          <li>As well as the use of physically based lighting</li>
        </ul>
      </div>
    </div>
  );
}

export default Assignment_3;
