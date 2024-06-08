import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, ShaderMaterial } from 'three';

class Cube extends Mesh {
  tick?: (delta : number) => void;
}

function createCube() {
  // create a geometry
  const geometry = new BoxGeometry(1.5,1.5,1.5);

  // Define your vertex shader
  const vertexShader = `
  varying vec3 vUv; 

  void main() {
    vUv = position; 

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
  `;

  // Define your fragment shader
  const fragmentShader = `
  varying vec3 vUv;

  void main() {
    gl_FragColor = vec4(vUv, 1.0); 
  }
  `;

  // Create a ShaderMaterial with your custom shaders
  const material = new ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
  });

  const cube = new Cube(geometry, material);

  //add tick function to cube
  cube.tick = (delta: number) => {
    cube.rotation.x += 2 * delta;
    cube.rotation.y += 2 * delta;
  };

  return cube;
}

export { createCube };