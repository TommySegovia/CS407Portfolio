import { useEffect, useRef } from "react";
import { World } from "./World/World";
import styles from "./Final.module.css";

function Final() {
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
      <div id="summaryDiv" className={styles.summaryDiv}>
    <p>
      The goal of this assignment is to use what we've learned to make something new that's interesting and fun
    </p>
  </div>
  <div id="listDiv" className={styles.listDiv}>
    <ul>
    <li>
        Click on the window to lock the mouse
      </li>
      <li>
        Use WASD to move
      </li>
      <li>
        Use C to crouch
      </li>
      <li>
        Use Space to jump
      </li>
      <li>
        Move the mouse to look around
      </li>
      <li>
        Use M to toggle ambient sounds (Off by default)
      </li>
    </ul>
  </div>
      <div className={styles.container} ref={containerRef}>
        <h1 className={styles.h1}>Final</h1>
      </div>
      
    </div>
  );
}

export default Final;
