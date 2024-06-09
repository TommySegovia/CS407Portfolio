import { useEffect, useRef } from 'react';
import { World } from './World/World';
import styles from './Final.module.css';

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
    <div className={styles.container} ref={containerRef}>
      <h1 className={styles.h1}>Final</h1>
    </div>
  );
}

export default Final;