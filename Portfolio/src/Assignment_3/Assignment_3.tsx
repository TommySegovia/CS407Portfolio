import { useEffect, useRef } from 'react';
import { World } from './World/World';
import styles from './Assignment_3.module.css';

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
    <div className={styles.container} ref={containerRef}>
      <h1 className={styles.h1}>Assignment 3</h1>
    </div>
  );
}

export default Assignment_3;