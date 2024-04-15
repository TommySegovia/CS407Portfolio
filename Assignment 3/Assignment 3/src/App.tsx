import { useEffect, useRef } from 'react';
import { World } from './World/World';

function App() {
  const containerRef = useRef(null);
  const worldRef = useRef<World | null>(null);

  useEffect(() => {
    if (containerRef.current && !worldRef.current) {
      worldRef.current = new World(containerRef.current);
      worldRef.current.render();
    }
  }, []);

  return <div ref={containerRef} />;
}

export default App;