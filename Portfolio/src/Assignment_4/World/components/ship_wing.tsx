import {
  ConeGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Shape,
} from "three";
import { degToRad, radToDeg } from "three/src/math/MathUtils.js";

class CustomMesh extends Mesh {
    tick?: (delta: number) => void;
    rotateUp: boolean = false;
    rotateDown: boolean = false;
    originalRotation: number = 0;
    targetRotation: number = 0;
}

function createShipWing() {
    const geometry = new ConeGeometry(2, 1, 3, 1);
    const material = new MeshStandardMaterial({ color: 'gray' });
    const wing = new CustomMesh(geometry, material);
    wing.originalRotation = degToRad(-90);

    const wingAngleSpread = 30;
    const wingSpeed = 3;

    wing.tick = (delta: number) => {
        const rotationSpeed = wingSpeed * delta;
        if (wing.rotateUp) {
            wing.targetRotation = degToRad(radToDeg(wing.originalRotation) - wingAngleSpread);
        }
        if (wing.rotateDown) {
            wing.targetRotation = degToRad(radToDeg(wing.originalRotation) + wingAngleSpread);
        }
        if (!wing.rotateUp && !wing.rotateDown) {
            wing.targetRotation = wing.originalRotation;
        }
        wing.rotation.x += (wing.targetRotation - wing.rotation.x) * rotationSpeed;
    };
    return wing;
}

export { createShipWing };
