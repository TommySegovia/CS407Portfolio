import { useEffect, useRef } from "react";
import { World } from "./World/World";
import styles from "./Assignment_4.module.css";

function Assignment_4() {
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
        <h1 className={styles.h1}>Assignment 4</h1>
      </div>
      <div id="summaryDiv" className={styles.summaryDiv}>
        <p>
          The goal of this assignment is to build a hierarchical scene graph which requires
        </p>
      </div>
      <div id="listDiv" className={styles.listDiv}>
        <ul>
          <li>Constructing a composite model containing multiple child objects</li>
          <li>Relative placement of child objects with at least one being manually done using vector or matrix algebra</li>
          <li>Parent and child object interactivity</li>
        </ul>
      </div>
    </div>
  );
}

export default Assignment_4;
