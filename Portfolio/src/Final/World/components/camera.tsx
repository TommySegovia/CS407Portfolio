import { PerspectiveCamera } from 'three';
import { PointerLockControls } from 'three-stdlib';

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

    camera.position.set(0, 1, 0);

    camera.tick = () => {
        // console.log(camera.position);
    };

    return camera;
}

export { createCamera }