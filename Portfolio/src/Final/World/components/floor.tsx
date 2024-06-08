import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry } from 'three';

function createFloor() {
  // create a geometry
    const geometry = new PlaneGeometry(10, 10);

  // create a default (white) Basic material
  const material = new MeshStandardMaterial({ color: 'purple'});

  // create a Mesh containing the geometry and material
  const floor = new Mesh(geometry, material);

  floor.rotation.x = -Math.PI / 2;

  return floor;
}

export { createFloor };