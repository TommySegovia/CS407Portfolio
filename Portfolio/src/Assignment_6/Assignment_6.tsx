import { useEffect, useRef } from 'react';
import { World } from './World/World';
import styles from './Assignment_6.module.css';

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
    <div className={styles.container} ref={containerRef}>
      <h1 className={styles.h1}>Assignment 6</h1>
    </div>
  );
}

export default Assignment_6;