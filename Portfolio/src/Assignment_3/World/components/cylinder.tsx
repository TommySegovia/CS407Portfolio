import { CylinderGeometry, Mesh, MeshBasicMaterial, MeshPhongMaterial, MeshStandardMaterial } from 'three';

function createCylinder() {
  // create a geometry
  const geometry = new CylinderGeometry(2,2,1);

  // create a default (white) Basic material
  const material = new MeshPhongMaterial({ color: 'gold'});

  // create a Mesh containing the geometry and material
  const cylinder = new Mesh(geometry, material);

  cylinder.rotation.set(0, 0.5, 0.2);
  cylinder.position.set(0, -2, 0);

  return cylinder;
}

export { createCylinder };