import { PerspectiveCamera } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';

function createCamera() {
    interface PerspectiveCameraWithTick extends PerspectiveCamera {
        tick?: () => void;
        rotateUp?: boolean;
        rotateDown?: boolean;
        originalHeight?: number;
        targetHeight?: number;
        cameraSpeed?: number;
    }

    const camera: PerspectiveCameraWithTick = new PerspectiveCamera(
        35, // fov = Field Of View
        1, // aspect ratio (dummy value)
        0.1, // near clipping plane
        100, // far clipping plane
    );

    camera.originalHeight = camera.position.y;

    camera.position.set(20, 7, -10);
    camera.cameraSpeed = 0.05;

    camera.targetHeight = 0;

    camera.tick = () => {
        if (camera.rotateUp) {
            camera.targetHeight = 1;
            camera.lookAt(0, 0, 0);
        }
        if (camera.rotateDown) {
            camera.targetHeight = -1;
            camera.lookAt(0, 0, 0);
        }
        
        camera.position.y += ((camera.targetHeight ?? 0) - camera.position.y) * (camera.cameraSpeed ?? 1);
        
        if (!camera.rotateUp && !camera.rotateDown) {
            camera.position.y += ((camera.originalHeight ?? 0) - camera.position.y) * (camera.cameraSpeed ?? 0.05 * 2);
            camera.lookAt(0, 0, 0);
        }
    };

return camera;
}

export { createCamera }