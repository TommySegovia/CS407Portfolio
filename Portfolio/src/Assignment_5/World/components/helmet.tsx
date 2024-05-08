import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, SphereGeometry } from 'three';

class Sphere extends Mesh {
  tick?: (delta : number) => void;
}

function createHelmet() {
  // create a geometry
  const geometry = new SphereGeometry(1, 6, 6);

  // create a default (white) Basic material
  const material = new MeshStandardMaterial({ color: 'gold'});

  // create a Mesh containing the geometry and material
  const sphere = new Sphere(geometry, material);

  sphere.position.set(0, 0, 5.6);

  //add tick function to sphere
  sphere.tick = (delta: number) => {
  };

  return sphere;
}

export { createHelmet };