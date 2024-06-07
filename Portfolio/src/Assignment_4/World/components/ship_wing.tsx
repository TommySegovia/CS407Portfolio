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
    rotateLeft: boolean = false;
    rotateRight: boolean = false;
    originalVerticalRotation: number = 0;
    originalHorizontalRotation: number = 0;
    targetVerticalRotation: number = 0;
    targetHorizontalRotation: number = 0;
}

function createShipWing() {
    const geometry = new ConeGeometry(2, 1, 3, 1);
    const material = new MeshStandardMaterial({ color: 'gray' });
    const wing = new CustomMesh(geometry, material);
    wing.originalVerticalRotation = degToRad(-90);
    wing.originalHorizontalRotation = degToRad(0);

    const wingAngleSpread = 30;
    const wingSpeed = 3;

    wing.tick = (delta: number) => {
        const rotationSpeed = wingSpeed * delta;
        if (wing.rotateUp) {
            wing.targetVerticalRotation = degToRad(radToDeg(wing.originalVerticalRotation) - wingAngleSpread);
        }
        if (wing.rotateDown) {
            wing.targetVerticalRotation = degToRad(radToDeg(wing.originalVerticalRotation) + wingAngleSpread);
        }
        if (wing.rotateLeft) {
            wing.targetHorizontalRotation = degToRad(radToDeg(wing.originalHorizontalRotation) - wingAngleSpread);
        }
        if (wing.rotateRight) {
            wing.targetHorizontalRotation = degToRad(radToDeg(wing.originalHorizontalRotation) + wingAngleSpread);
        }
        if (!wing.rotateUp && !wing.rotateDown) {
            wing.targetVerticalRotation = wing.originalVerticalRotation;
        }
        if (!wing.rotateLeft && !wing.rotateRight) {
            wing.targetHorizontalRotation = wing.originalHorizontalRotation;
        }
        wing.rotation.x += (wing.targetVerticalRotation - wing.rotation.x) * rotationSpeed;
        wing.rotation.y += (wing.targetHorizontalRotation - wing.rotation.y) * rotationSpeed;

    };
    return wing;
}

export { createShipWing };
