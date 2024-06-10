import { useState, useEffect, useRef } from "react";
import { World } from "./World/World";
import styles from "./Assignment_7.module.css";

function Assignment_7() {
  const containerRef = useRef(null);
  const worldRef = useRef<World | null>(null);

  const [vertexShader, setVertexShader] = useState(`varying vec3 vUv; 

  void main() {
    vUv = position; 

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }`);
  const [fragmentShader, setFragmentShader] = useState(`varying vec3 vUv;

  void main() {
    gl_FragColor = vec4(vUv, 1.0); 
  }`);

  const handleCompileShaders = () => {
    if (worldRef.current) {
      worldRef.current.updateShaders(vertexShader, fragmentShader);
    }
  };

  useEffect(() => {
    if (containerRef.current && !worldRef.current) {
      worldRef.current = new World(containerRef.current);
      worldRef.current.start();
    }
  }, []);

  return (
    <div id="mainPage">
      <h1 className={styles.h1}>Assignment 7</h1>
      <div>
        <h3>Vertex Shader</h3>
        <textarea 
          name="vertexShaderInput" 
          id="vertexShaderInput" style={{width: "1000px", height: "150px"}}
          value={vertexShader}
          onChange={e => setVertexShader(e.target.value)}
        />
      </div>
      <div>
        <h3>Fragment Shader</h3>
        <textarea 
          name="fragmentShaderInput" 
          id="fragmentShaderInput" style={{width: "1000px", height: "150px"}}
          value={fragmentShader}
          onChange={e => setFragmentShader(e.target.value)}
        />
      </div>

      <button id="compileShadersButton" style={{margin: "20px"}} onClick={handleCompileShaders}>Compile Shaders</button>
      <div className={styles.container} ref={containerRef} />
      <div id="summaryDiv" className={styles.summaryDiv}>
        <p>
          The goal of this assignment is to create and use custom vertex and fragment shaders
        </p>
      </div>
      <div id="listDiv" className={styles.listDiv}>
        <ul>
          <li>
            Edit the vertex and fragment shaders in the text areas above and compile shaders to see how the cube changes
          </li>
          <li>
            Use the orbit controls with the mouse to orbit, pan, and zoom in and out in the scene
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Assignment_7;