import { PerspectiveCamera } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';

function createCamera() {
    interface PerspectiveCameraWithTick extends PerspectiveCamera {
        tick?: () => void;
    }

    const camera: PerspectiveCameraWithTick = new PerspectiveCamera(
        35, // fov = Field Of View
        1, // aspect ratio (dummy value)
        0.1, // near clipping plane
        100, // far clipping plane
    );

    camera.position.set(5, 5, 10);

    camera.tick = () => {
    };

return camera;
}

export { createCamera }