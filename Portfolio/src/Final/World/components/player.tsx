import {
    AxesHelper,
    CapsuleGeometry,
  ConeGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Shape,
} from "three";
import { Capsule } from "three-stdlib";
import { degToRad, radToDeg } from "three/src/math/MathUtils.js";

class CustomMesh extends Mesh {
    tick?: (delta: number) => void;
}

function createPlayer(camera: PerspectiveCamera) {
    const geometry = new CapsuleGeometry(0.5, 0.5, 32);
    const material = new MeshStandardMaterial({ color: 'gray' });
    const player = new CustomMesh(geometry, material);

    //axis helper
    const axesHelper = new AxesHelper(5);
    player.add(axesHelper);

    const movementSpeed = 1;

    player.tick = (delta: number) => {

        player.rotation.copy(camera.rotation);

    };
    return player;
}

export { createPlayer };
