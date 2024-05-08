import { CapsuleGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'three';

function createShipBody() {
  // create a geometry
class CustomMesh extends Mesh {
    tick?: (delta: number) => void;
}

const geometry = new CapsuleGeometry(1, 3, 1, 6);
const material = new MeshStandardMaterial({ color: 'gray' });
const capsule = new CustomMesh(geometry, material);

capsule.tick = (delta: number) => {
    capsule.rotation.x += 2 * delta;
    capsule.rotation.y += 2 * delta;
};

  return capsule;
}

export { createShipBody };