
import { PerspectiveCamera, WebGLRenderer } from "three";

class Resizer {
  constructor(container: HTMLElement, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    // Set size initially
    this.setSize(camera, renderer);

    // Update size when the window is resized
    window.addEventListener('resize', () => {
      this.setSize(camera, renderer);
    });
  }

  setSize(camera: PerspectiveCamera, renderer: WebGLRenderer) {
    // update the size of the renderer AND the canvas
    renderer.setSize(window.innerWidth, window.innerHeight);
  
    // Update the camera's aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    // Update the camera's frustum
    camera.updateProjectionMatrix();
  
    // set the pixel ratio (for mobile devices)
    renderer.setPixelRatio(window.devicePixelRatio);
  }
}
  
export { Resizer };
