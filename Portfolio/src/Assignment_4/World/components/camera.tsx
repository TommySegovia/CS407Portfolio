import { PerspectiveCamera } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';

function createCamera() {
    interface PerspectiveCameraWithTick extends PerspectiveCamera {
        tick?: () => void;
        rotateUp?: boolean;
        rotateDown?: boolean;
        rotateRight?: boolean;
        rotateLeft?: boolean;
        originalHeight?: number;
        originalSweep?: number;
        targetHeight?: number;
        targetSweep?: number;
        cameraSpeed?: number;
    }

    const camera: PerspectiveCameraWithTick = new PerspectiveCamera(
        35, // fov = Field Of View
        1, // aspect ratio (dummy value)
        0.1, // near clipping plane
        100, // far clipping plane
    );

    camera.originalHeight = camera.position.y;
    camera.originalSweep = camera.position.x;

    camera.position.set(0, 0, 10);
    camera.cameraSpeed = 0.05;

    camera.targetHeight = 0;
    camera.targetSweep = 0;

    camera.tick = () => {
        if (camera.rotateUp) {
            camera.targetHeight = 1;
            camera.lookAt(0, 0, 0);
        }
        if (camera.rotateDown) {
            camera.targetHeight = -1;
            camera.lookAt(0, 0, 0);
        }
        if (camera.rotateLeft) {
            camera.targetSweep = 1;
            camera.lookAt(0, 0, 0);
        }
        if (camera.rotateRight) {
            camera.targetSweep = -1;
            camera.lookAt(0, 0, 0);
        }
        
        camera.position.y += ((camera.targetHeight ?? 0) - camera.position.y) * (camera.cameraSpeed ?? 1);
        camera.position.x += ((camera.targetSweep ?? 0) - camera.position.x) * (camera.cameraSpeed ?? 1);
        
        if (!camera.rotateUp && !camera.rotateDown && !camera.rotateLeft && !camera.rotateRight) {
            camera.position.y += ((camera.originalHeight ?? 0) - camera.position.y) * (camera.cameraSpeed ?? 0.05 * 2);
            camera.position.x += ((camera.originalSweep ?? 0) - camera.position.x) * (camera.cameraSpeed ?? 0.05 * 2);
            camera.lookAt(0, 0, 0);
        }
    };

return camera;
}

export { createCamera }