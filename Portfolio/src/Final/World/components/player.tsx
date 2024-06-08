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
    movingForward: boolean = false;
    movingBackward: boolean = false;
    movingLeft: boolean = false;
    movingRight: boolean = false;
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
        
        if (player.movingForward) {
            player.position.z -= movementSpeed * delta;
        }
        if (player.movingBackward) {
            player.position.z += movementSpeed * delta;
        }
        if (player.movingLeft) {
            player.position.x -= movementSpeed * delta;
        }
        if (player.movingRight) {
            player.position.x += movementSpeed * delta;
        }

    };
    return player;
}

export { createPlayer };
