import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, ShaderMaterial, TorusGeometry } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';

class Torus extends Mesh {
  tick?: (delta : number) => void;
}

function createTorus() {
  // create a geometry
  const geometry = new TorusGeometry( 3, 0.2, 16, 5 );

  const material = new MeshStandardMaterial({color: 0xffffff});

  const torus = new Torus(geometry, material);

  torus.rotateX(Math.PI / 2);
  torus.rotateZ(degToRad(45));


  //add tick function to torus
  torus.tick = (delta: number) => {
   
    torus.rotation.z += 1 * delta;
  };

  return torus;
}

export { createTorus };