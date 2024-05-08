import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'three';

class Cube extends Mesh {
  tick?: (delta : number) => void;
}

function createCube() {
  // create a geometry
  const geometry = new BoxGeometry(1.5,1.5,1.5);

  // create a default (white) Basic material
  const material = new MeshStandardMaterial({ color: 'purple'});

  // create a Mesh containing the geometry and material
  const cube = new Cube(geometry, material);

  //add tick function to cube
  cube.tick = (delta: number) => {
    cube.rotation.x += 2 * delta;
    cube.rotation.y += 2 * delta;
  };

  return cube;
}

export { createCube };