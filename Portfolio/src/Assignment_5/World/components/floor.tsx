import { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three/src/Three.js';
import { MathUtils } from 'three/src/math/MathUtils.js';

function createFloor() {
  // create a geometry
  const geometry = new PlaneGeometry(100,100);

  // create a default (white) Basic material
  const material = new MeshStandardMaterial({ color: '#0a0932'});

  // create a Mesh containing the geometry and material
  const plane = new Mesh(geometry, material);

    plane.rotation.x = - MathUtils.degToRad(90);
    plane.position.set(0, 0, 0);


  return plane;
}

export { createFloor };